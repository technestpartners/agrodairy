<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\Inquiry;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ContactController extends Controller
{
    public function index(): View
    {
        $faqs = Faq::active()->take(5)->get();
        $headOffice = Setting::get('head_office_address', 'Office No. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India');
        $plantAddress = Setting::get('processing_plant_address', 'Saurashtra Processing Terminal, GIDC Industrial Estate, Gondal - 360311, Dist. Rajkot, Gujarat, India');
        $primaryEmail = Setting::get('primary_email', 'agrodairyexportllp@gmail.com');
        $primaryPhone = Setting::get('primary_phone', '+91 90233 63680');
        $whatsApp = Setting::get('whatsapp_number', '+919023363680');
        $contactPerson = Setting::get('contact_person', 'J.P. Vora');

        return view('pages.contact.index', compact(
            'faqs',
            'headOffice',
            'plantAddress',
            'primaryEmail',
            'primaryPhone',
            'whatsApp',
            'contactPerson'
        ));
    }

    public function submit(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'company' => 'nullable|string|max:150',
            'email' => 'required|email|max:150',
            'phone' => 'required|string|max:30',
            'country' => 'required|string|max:80',
            'message' => 'required|string|max:3000',
        ]);

        // Auto assign to sales manager
        $salesManager = User::where('role', 'sales_manager')->first() ?? User::where('role', 'admin')->first();

        $inquiryNumber = 'RFQ-' . date('Y') . '-' . str_pad((string) (Inquiry::count() + 1), 4, '0', STR_PAD_LEFT);

        Inquiry::create([
            'inquiry_number' => $inquiryNumber,
            'name' => $validated['name'],
            'company' => $validated['company'] ?? null,
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'country' => $validated['country'],
            'message' => $validated['message'],
            'status' => 'new',
            'assigned_to' => $salesManager?->id,
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', "Thank you! Your message has been received with reference {$inquiryNumber}. Our international export manager will get in touch promptly.");
    }
}
