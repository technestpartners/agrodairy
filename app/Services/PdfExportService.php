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
                'name' => config('app.name', 'Agro Dairy Export LLP'),
                'address' => 'Near Marketing Yard, Highway Industrial Zone, Rajkot - 360003, Gujarat, India',
                'iec' => '0817029381',
                'gstin' => '24AAHFA3928L1Z9',
                'apeda_reg' => 'APEDA/RCMC/2026/0892',
                'email' => 'exports@agrodairy.com',
                'phone' => '+91 98250 12345 / +91 98250 67890',
                'website' => 'www.agrodairy.com',
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
                'name' => config('app.name', 'Agro Dairy Export LLP'),
                'email' => 'exports@agrodairy.com',
                'website' => 'www.agrodairy.com',
            ],
        ])->setPaper('a4', 'portrait');

        $fileName = "SpecSheet-{$product->slug}.pdf";

        return $download ? $pdf->download($fileName) : $pdf->stream($fileName);
    }
}
