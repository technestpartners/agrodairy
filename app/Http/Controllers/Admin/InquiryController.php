<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\InquiryNote;
use App\Models\InquiryStatusHistory;
use App\Models\User;
use App\Services\AuditService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\StreamedResponse;

class InquiryController extends Controller
{
    public function index(Request $request): View
    {
        $salesStaff = User::whereIn('role', ['sales_manager', 'sales_executive', 'admin'])->get();

        $query = Inquiry::with(['product', 'assignedUser']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('inquiry_number', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('country', 'like', "%{$search}%");
            });
        }

        $inquiries = $query->latest()->paginate(15)->withQueryString();

        return view('admin.inquiries.index', compact('inquiries', 'salesStaff'));
    }

    public function show(Inquiry $inquiry): View
    {
        $inquiry->load(['product.category', 'assignedUser', 'notes.user', 'statusHistories.user', 'quotations.items']);
        $salesStaff = User::whereIn('role', ['sales_manager', 'sales_executive', 'admin'])->get();

        return view('admin.inquiries.show', compact('inquiry', 'salesStaff'));
    }

    public function updateStatus(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:new,reviewed,assigned,quotation_prepared,quotation_sent,negotiation,accepted,rejected,completed',
            'comment' => 'nullable|string|max:1000',
        ]);

        $oldStatus = $inquiry->status;
        $newStatus = $validated['status'];

        if ($oldStatus !== $newStatus) {
            $inquiry->update(['status' => $newStatus]);

            InquiryStatusHistory::create([
                'inquiry_id' => $inquiry->id,
                'user_id' => Auth::id(),
                'from_status' => $oldStatus,
                'to_status' => $newStatus,
                'comment' => $validated['comment'] ?? "Status updated from {$oldStatus} to {$newStatus}",
            ]);

            AuditService::log('status_change', 'Inquiry', $inquiry->id, "Changed inquiry {$inquiry->inquiry_number} status to {$newStatus}");
        }

        return back()->with('success', "Inquiry status updated to " . ucfirst(str_replace('_', ' ', $newStatus)));
    }

    public function assign(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $validated = $request->validate([
            'assigned_to' => 'required|exists:users,id',
        ]);

        $user = User::findOrFail($validated['assigned_to']);
        $inquiry->update([
            'assigned_to' => $user->id,
            'status' => $inquiry->status === 'new' ? 'assigned' : $inquiry->status,
        ]);

        InquiryStatusHistory::create([
            'inquiry_id' => $inquiry->id,
            'user_id' => Auth::id(),
            'from_status' => $inquiry->status,
            'to_status' => $inquiry->status,
            'comment' => "Assigned to {$user->name} ({$user->department})",
        ]);

        AuditService::log('assigned', 'Inquiry', $inquiry->id, "Assigned inquiry {$inquiry->inquiry_number} to {$user->name}");

        return back()->with('success', "Inquiry assigned to {$user->name}");
    }

    public function addNote(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $validated = $request->validate([
            'note' => 'required|string|max:2000',
            'type' => 'required|in:internal,communication,system',
        ]);

        InquiryNote::create([
            'inquiry_id' => $inquiry->id,
            'user_id' => Auth::id(),
            'note' => $validated['note'],
            'type' => $validated['type'],
        ]);

        return back()->with('success', 'CRM note saved successfully.');
    }

    public function exportCsv(): StreamedResponse
    {
        $inquiries = Inquiry::with('product')->latest()->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="inquiries_export_' . date('Y-m-d') . '.csv"',
        ];

        $callback = function () use ($inquiries) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, [
                'Inquiry No',
                'Date',
                'Customer Name',
                'Company',
                'Email',
                'Phone',
                'Country',
                'Product',
                'Quantity (MT)',
                'Incoterm',
                'Destination Port',
                'Status',
                'Target Price',
            ]);

            foreach ($inquiries as $i) {
                fputcsv($handle, [
                    $i->inquiry_number,
                    $i->created_at->format('Y-m-d H:i'),
                    $i->name,
                    $i->company,
                    $i->email,
                    $i->phone,
                    $i->country,
                    $i->product?->name ?? 'Custom Sourcing',
                    $i->quantity,
                    $i->incoterm,
                    $i->destination_port,
                    $i->status,
                    $i->target_price ? "{$i->target_currency} {$i->target_price}" : '',
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }
}
