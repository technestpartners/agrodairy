<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use App\Models\InquiryStatusHistory;
use App\Models\NewsletterSubscriber;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\View\View;

class InquiryController extends Controller
{
    public function create(Request $request): View
    {
        $products = Product::active()->orderBy('name')->get();
        $selectedProductId = $request->get('product_id');

        return view('pages.rfq.create', compact('products', 'selectedProductId'));
    }

    public function store(Request $request): RedirectResponse|JsonResponse
    {
        // Rate limiting to prevent duplicate spam submissions
        $key = 'rfq-submission:' . $request->ip();
        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            if ($request->wantsJson()) {
                return response()->json(['error' => "Too many inquiries submitted. Please retry in {$seconds} seconds."], 429);
            }
            return back()->with('error', "Too many submissions. Please wait {$seconds} seconds before sending another inquiry.")->withInput();
        }
        RateLimiter::hit($key, 120);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'company' => 'nullable|string|max:150',
            'email' => 'required|email|max:150',
            'phone' => 'required|string|max:30',
            'whatsapp' => 'nullable|string|max:30',
            'country' => 'required|string|max:100',
            'product_id' => 'nullable|exists:products,id',
            'product_variant' => 'nullable|string|max:150',
            'quantity' => 'nullable|numeric|min:0.1',
            'unit' => 'nullable|string|max:50',
            'packaging_preference' => 'nullable|string|max:150',
            'destination_port' => 'nullable|string|max:150',
            'incoterm' => 'nullable|string|in:FOB,CIF,CFR,EXW,FCA,DAP',
            'target_price' => 'nullable|numeric|min:0',
            'target_currency' => 'nullable|string|max:10',
            'preferred_delivery_date' => 'nullable|date',
            'message' => 'required|string|max:5000',
            'attachment' => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:5120',
        ]);

        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('inquiry_attachments', 'public');
        }

        $salesManager = User::where('role', 'sales_manager')->first() ?? User::where('role', 'admin')->first();

        $inquiryCount = Inquiry::count() + 1;
        $inquiryNumber = 'RFQ-' . date('Y') . '-' . str_pad((string) $inquiryCount, 4, '0', STR_PAD_LEFT);

        $inquiry = Inquiry::create([
            'inquiry_number' => $inquiryNumber,
            'name' => $validated['name'],
            'company' => $validated['company'] ?? null,
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'whatsapp' => $validated['whatsapp'] ?? null,
            'country' => $validated['country'],
            'product_id' => $validated['product_id'] ?? null,
            'product_variant' => $validated['product_variant'] ?? null,
            'quantity' => $validated['quantity'] ?? null,
            'unit' => $validated['unit'] ?? 'Metric Ton (MT)',
            'packaging_preference' => $validated['packaging_preference'] ?? null,
            'destination_port' => $validated['destination_port'] ?? null,
            'incoterm' => $validated['incoterm'] ?? 'FOB',
            'target_price' => $validated['target_price'] ?? null,
            'target_currency' => $validated['target_currency'] ?? 'USD',
            'preferred_delivery_date' => $validated['preferred_delivery_date'] ?? null,
            'message' => $validated['message'],
            'attachment_path' => $attachmentPath,
            'status' => 'new',
            'assigned_to' => $salesManager?->id,
            'ip_address' => $request->ip(),
        ]);

        // Record initial status history
        InquiryStatusHistory::create([
            'inquiry_id' => $inquiry->id,
            'user_id' => null,
            'from_status' => 'none',
            'to_status' => 'new',
            'comment' => 'Customer submitted official RFQ through website portal.',
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'inquiry_number' => $inquiryNumber,
                'message' => "Your quotation inquiry {$inquiryNumber} has been received. Our export trade desk will reply within 24 business hours.",
            ]);
        }

        return redirect()->route('rfq.success', ['ref' => $inquiryNumber]);
    }

    public function success(Request $request): View
    {
        $ref = $request->get('ref', 'RFQ-' . date('Y'));
        return view('pages.rfq.success', compact('ref'));
    }

    public function subscribeNewsletter(Request $request): RedirectResponse|JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|max:150',
        ]);

        NewsletterSubscriber::updateOrCreate(
            ['email' => strtolower(trim($validated['email']))],
            ['is_active' => true, 'ip_address' => $request->ip()]
        );

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Subscribed to export market updates successfully!']);
        }

        return back()->with('success', 'Thank you for subscribing to Agro Dairy Export trade reports and price notifications.');
    }
}
