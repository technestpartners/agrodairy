<?php

namespace App\Http\Controllers;

use App\Models\PackagingType;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Services\PdfExportService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\View\View;

class ProductController extends Controller
{
    public function index(Request $request): View
    {
        $categories = ProductCategory::active()->withCount('products')->orderBy('sort_order')->get();

        $query = Product::active()->with(['category', 'specifications']);

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('short_description', 'like', "%{$search}%")
                  ->orWhere('grade_variety', 'like', "%{$search}%")
                  ->orWhere('hs_code', 'like', "%{$search}%");
            });
        }

        if ($request->filled('sort')) {
            switch ($request->sort) {
                case 'name_asc':
                    $query->orderBy('name', 'asc');
                    break;
                case 'name_desc':
                    $query->orderBy('name', 'desc');
                    break;
                case 'newest':
                    $query->latest();
                    break;
                default:
                    $query->orderBy('sort_order')->orderBy('name');
            }
        } else {
            $query->orderBy('sort_order')->orderBy('name');
        }

        $products = $query->paginate(12)->withQueryString();

        return view('pages.products.index', compact('products', 'categories'));
    }

    public function category(ProductCategory $category): View
    {
        $category->load(['children.products', 'products.specifications']);
        $products = $category->products()->active()->paginate(12);
        $otherCategories = ProductCategory::active()->where('id', '!=', $category->id)->orderBy('sort_order')->take(6)->get();

        return view('pages.products.category', compact('category', 'products', 'otherCategories'));
    }

    public function show(Product $product): View
    {
        $product->load(['category', 'images', 'specifications', 'traceabilityBatches']);

        $relatedProducts = Product::active()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();

        $packagingTypes = PackagingType::active()->orderBy('sort_order')->get();

        // Build WhatsApp text with product details
        $companyWa = \App\Models\Setting::get('whatsapp_number', '+919825012345');
        $waMessage = urlencode("Hello Agro Dairy Export team, I am interested in sourcing {$product->name} (HS: {$product->hs_code}). Please provide product availability, current FOB/CIF rates, and spec sheet.");
        $whatsAppUrl = "https://wa.me/" . preg_replace('/[^0-9]/', '', $companyWa) . "?text=" . $waMessage;

        return view('pages.products.show', compact('product', 'relatedProducts', 'packagingTypes', 'whatsAppUrl'));
    }

    public function downloadPdf(Product $product, PdfExportService $pdfService): Response
    {
        return $pdfService->generateProductSpecPdf($product, true);
    }
}
