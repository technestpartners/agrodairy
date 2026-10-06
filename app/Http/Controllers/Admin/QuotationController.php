<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\Product;
use App\Models\Quotation;
use App\Models\QuotationItem;
use App\Services\AuditService;
use App\Services\PdfExportService;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class QuotationController extends Controller
{
    public function index(Request $request): View
    {
        $query = Quotation::with(['inquiry', 'createdBy']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('quotation_number', 'like', "%{$search}%")
                  ->orWhere('destination_port', 'like', "%{$search}%")
                  ->orWhereHas('inquiry', function ($iq) use ($search) {
                      $iq->where('name', 'like', "%{$search}%")
                         ->orWhere('company', 'like', "%{$search}%");
                  });
            });
        }

        $quotations = $query->latest()->paginate(15)->withQueryString();

        return view('admin.quotations.index', compact('quotations'));
    }

    public function create(Request $request): View
    {
        $inquiry = null;
        if ($request->filled('inquiry_id')) {
            $inquiry = Inquiry::with('product')->findOrFail($request->inquiry_id);
        }

        $products = Product::active()->orderBy('name')->get();

        $quotationNumber = 'QUO-' . date('Y') . '-' . str_pad((string) (Quotation::count() + 1), 4, '0', STR_PAD_LEFT);

        return view('admin.quotations.create', compact('inquiry', 'products', 'quotationNumber'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'quotation_number' => 'required|string|unique:quotations,quotation_number',
            'inquiry_id' => 'nullable|exists:inquiries,id',
            'currency' => 'required|string|max:10',
            'incoterm' => 'required|string|max:10',
            'origin_port' => 'required|string|max:150',
            'destination_port' => 'required|string|max:150',
            'payment_terms' => 'required|string|max:255',
            'valid_until' => 'required|date|after_or_equal:today',
            'freight' => 'nullable|numeric|min:0',
            'insurance' => 'nullable|numeric|min:0',
            'other_charges' => 'nullable|numeric|min:0',
            'terms_and_conditions' => 'nullable|string',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'nullable|exists:products,id',
            'items.*.item_name' => 'required|string|max:200',
            'items.*.grade_spec' => 'nullable|string|max:200',
            'items.*.packaging' => 'nullable|string|max:200',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'items.*.unit' => 'required|string|max:30',
            'items.*.unit_price' => 'required|numeric|min:0.01',
        ]);

        $subtotal = 0;
        foreach ($validated['items'] as $item) {
            $subtotal += ($item['quantity'] * $item['unit_price']);
        }

        $freight = (float) ($validated['freight'] ?? 0);
        $insurance = (float) ($validated['insurance'] ?? 0);
        $otherCharges = (float) ($validated['other_charges'] ?? 0);
        $grandTotal = $subtotal + $freight + $insurance + $otherCharges;

        $quotation = Quotation::create([
            'quotation_number' => $validated['quotation_number'],
            'inquiry_id' => $validated['inquiry_id'] ?? null,
            'created_by' => Auth::id(),
            'currency' => $validated['currency'],
            'incoterm' => $validated['incoterm'],
            'origin_port' => $validated['origin_port'],
            'destination_port' => $validated['destination_port'],
            'payment_terms' => $validated['payment_terms'],
            'valid_until' => $validated['valid_until'],
            'subtotal' => $subtotal,
            'freight' => $freight,
            'insurance' => $insurance,
            'other_charges' => $otherCharges,
            'grand_total' => $grandTotal,
            'status' => 'draft',
            'terms_and_conditions' => $validated['terms_and_conditions'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        foreach ($validated['items'] as $item) {
            QuotationItem::create([
                'quotation_id' => $quotation->id,
                'product_id' => $item['product_id'] ?? null,
                'item_name' => $item['item_name'],
                'grade_spec' => $item['grade_spec'] ?? null,
                'packaging' => $item['packaging'] ?? null,
                'quantity' => $item['quantity'],
                'unit' => $item['unit'],
                'unit_price' => $item['unit_price'],
                'total_price' => $item['quantity'] * $item['unit_price'],
            ]);
        }

        if ($quotation->inquiry_id) {
            $inquiry = Inquiry::find($quotation->inquiry_id);
            if ($inquiry) {
                $inquiry->update(['status' => 'quotation_prepared']);
            }
        }

        AuditService::log('created', 'Quotation', $quotation->id, "Created quotation {$quotation->quotation_number}");

        return redirect()->route('admin.quotations.show', $quotation)->with('success', "Quotation {$quotation->quotation_number} generated successfully.");
    }

    public function show(Quotation $quotation): View
    {
        $quotation->load(['inquiry', 'createdBy', 'items.product']);
        return view('admin.quotations.show', compact('quotation'));
    }

    public function updateStatus(Request $request, Quotation $quotation): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:draft,sent,revised,accepted,rejected,expired',
        ]);

        $quotation->update(['status' => $validated['status']]);

        if ($quotation->inquiry_id) {
            if ($validated['status'] === 'sent') {
                $quotation->inquiry->update(['status' => 'quotation_sent']);
            } elseif ($validated['status'] === 'accepted') {
                $quotation->inquiry->update(['status' => 'accepted']);
            } elseif ($validated['status'] === 'rejected') {
                $quotation->inquiry->update(['status' => 'rejected']);
            }
        }

        AuditService::log('status_change', 'Quotation', $quotation->id, "Changed quotation {$quotation->quotation_number} status to {$validated['status']}");

        return back()->with('success', "Quotation status updated to " . ucfirst($validated['status']));
    }

    public function downloadPdf(Quotation $quotation, PdfExportService $pdfService): Response
    {
        return $pdfService->generateQuotationPdf($quotation, true);
    }

    public function previewPdf(Quotation $quotation, PdfExportService $pdfService): Response
    {
        return $pdfService->generateQuotationPdf($quotation, false);
    }
}
