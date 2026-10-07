<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Quotation;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Response;

class PdfExportService
{
    /**
     * Generate and stream/download Quotation PDF
     */
    public function generateQuotationPdf(Quotation $quotation, bool $download = false): Response
    {
        $quotation->load(['inquiry', 'createdBy', 'items.product']);

        $pdf = Pdf::loadView('pdf.quotation', [
            'quotation' => $quotation,
            'company' => [
                'name' => \App\Models\Setting::get('company_name', config('app.name', 'Agro Dairy Export LLP')),
                'contact_person' => \App\Models\Setting::get('contact_person', 'J.P. Vora'),
                'address' => \App\Models\Setting::get('head_office_address', 'Office No. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India'),
                'plant_address' => \App\Models\Setting::get('processing_plant_address', 'Saurashtra Processing Terminal, GIDC Industrial Estate, Gondal - 360311, Dist. Rajkot, Gujarat, India'),
                'iec' => \App\Models\Setting::get('iec_number', '0817029381'),
                'gstin' => \App\Models\Setting::get('gstin_number', '24AAHFA3928L1Z9'),
                'apeda_reg' => \App\Models\Setting::get('apeda_rcmc', 'APEDA/RCMC/2026/0892'),
                'email' => \App\Models\Setting::get('primary_email', 'agrodairyexportllp@gmail.com'),
                'phone' => \App\Models\Setting::get('primary_phone', '+91 90233 63680'),
                'website' => \App\Models\Setting::get('website_domain', 'www.agrodairy.com'),
            ],
        ])->setPaper('a4', 'portrait');

        $fileName = "Quotation-{$quotation->quotation_number}.pdf";

        return $download ? $pdf->download($fileName) : $pdf->stream($fileName);
    }

    /**
     * Generate Product Technical Specification Sheet PDF
     */
    public function generateProductSpecPdf(Product $product, bool $download = false): Response
    {
        $product->load(['category', 'specifications']);

        $pdf = Pdf::loadView('pdf.product_spec', [
            'product' => $product,
            'company' => [
                'name' => \App\Models\Setting::get('company_name', config('app.name', 'Agro Dairy Export LLP')),
                'contact_person' => \App\Models\Setting::get('contact_person', 'J.P. Vora'),
                'address' => \App\Models\Setting::get('head_office_address', 'Office No. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India'),
                'email' => \App\Models\Setting::get('primary_email', 'agrodairyexportllp@gmail.com'),
                'phone' => \App\Models\Setting::get('primary_phone', '+91 90233 63680'),
                'website' => \App\Models\Setting::get('website_domain', 'www.agrodairy.com'),
            ],
        ])->setPaper('a4', 'portrait');

        $fileName = "SpecSheet-{$product->slug}.pdf";

        return $download ? $pdf->download($fileName) : $pdf->stream($fileName);
    }
}
