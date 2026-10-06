<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Certification;
use App\Models\Country;
use App\Models\ExportMarket;
use App\Models\Faq;
use App\Models\InfrastructureItem;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Setting;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\View\View;

class HomeController extends Controller
{
    public function index(): View
    {
        $featuredCategories = ProductCategory::active()
            ->featured()
            ->orderBy('sort_order')
            ->take(6)
            ->get();

        $featuredProducts = Product::active()
            ->featured()
            ->with(['category', 'specifications'])
            ->orderBy('sort_order')
            ->take(8)
            ->get();

        $exportMarkets = ExportMarket::with(['countries' => function ($q) {
            $q->active()->orderBy('sort_order');
        }])->orderBy('sort_order')->get();

        $certifications = Certification::active()
            ->orderBy('sort_order')
            ->take(8)
            ->get();

        $infrastructure = InfrastructureItem::orderBy('sort_order')->take(4)->get();

        $testimonials = Testimonial::active()->orderBy('sort_order')->take(4)->get();

        $faqs = Faq::active()->orderBy('sort_order')->take(6)->get();

        $latestBlogs = Blog::published()->with(['category', 'author'])->take(3)->get();

        return view('pages.home', compact(
            'featuredCategories',
            'featuredProducts',
            'exportMarkets',
            'certifications',
            'infrastructure',
            'testimonials',
            'faqs',
            'latestBlogs'
        ));
    }
}
