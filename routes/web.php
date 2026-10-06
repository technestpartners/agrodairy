<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AuditLogController;
use App\Http\Controllers\Admin\BlogController as AdminBlogController;
use App\Http\Controllers\Admin\CertificationController as AdminCertificationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\InquiryController as AdminInquiryController;
use App\Http\Controllers\Admin\ProductCategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\QuotationController as AdminQuotationController;
use App\Http\Controllers\Admin\SettingController as AdminSettingController;
use App\Http\Controllers\Admin\TraceabilityBatchController as AdminTraceabilityController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ExportMarketController;
use App\Http\Controllers\ExportToolsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\LogisticsController;
use App\Http\Controllers\PackagingController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\QualityController;
use App\Models\Blog;
use App\Models\Country;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Web Routes
|--------------------------------------------------------------------------
*/

// Homepage
Route::get('/', [HomeController::class, 'index'])->name('home');

// Company Pages
Route::prefix('company')->name('company.')->group(function () {
    Route::get('/about-us', [CompanyController::class, 'about'])->name('about');
    Route::get('/infrastructure', [CompanyController::class, 'infrastructure'])->name('infrastructure');
    Route::get('/farmer-network', [CompanyController::class, 'farmerNetwork'])->name('farmer_network');
    Route::get('/trade-shows-exhibitions', [CompanyController::class, 'tradeShows'])->name('trade_shows');
    Route::get('/gallery', [CompanyController::class, 'gallery'])->name('gallery');
    Route::get('/careers', [CompanyController::class, 'careers'])->name('careers');
});
Route::get('/about-us', [CompanyController::class, 'about'])->name('about');

// Product Catalogue
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/category/{category:slug}', [ProductController::class, 'category'])->name('products.category');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/products/{product:slug}/spec-sheet-pdf', [ProductController::class, 'downloadPdf'])->name('products.pdf');

// Quality, Certifications & Traceability
Route::get('/quality-assurance', [QualityController::class, 'index'])->name('quality.index');
Route::get('/certifications', [QualityController::class, 'certifications'])->name('certifications.index');
Route::get('/quality/certifications', [QualityController::class, 'certifications'])->name('quality.certifications');
Route::get('/traceability', [QualityController::class, 'traceability'])->name('traceability.index');
Route::get('/quality/traceability', [QualityController::class, 'traceability'])->name('quality.traceability');
Route::post('/traceability/lookup', [QualityController::class, 'traceabilityLookup'])->name('traceability.lookup');
Route::post('/quality/traceability/lookup', [QualityController::class, 'traceabilityLookup'])->name('quality.traceability.lookup');

// Packaging & Logistics
Route::get('/packaging-solutions', [PackagingController::class, 'index'])->name('packaging.index');
Route::get('/shipping-logistics', [LogisticsController::class, 'index'])->name('logistics.index');

// Export Destinations & Country Landing Pages
Route::get('/export-markets', [ExportMarketController::class, 'index'])->name('markets.index');
Route::get('/export-markets/{country:slug}', [ExportMarketController::class, 'show'])->name('markets.country');

// Export Calculators & Trade Tools
Route::prefix('export-tools')->name('tools.')->group(function () {
    Route::get('/', [ExportToolsController::class, 'index'])->name('index');
    Route::match(['get', 'post'], '/container-load-calculator', [ExportToolsController::class, 'containerCalculator'])->name('container_calculator');
    Route::match(['get', 'post'], '/container-calculator', [ExportToolsController::class, 'containerCalculator'])->name('container');
    Route::match(['get', 'post'], '/landed-cost-calculator', [ExportToolsController::class, 'landedCostCalculator'])->name('landed_cost');
    Route::get('/hs-code-finder', [ExportToolsController::class, 'hsCodeFinder'])->name('hs_codes');
    Route::get('/hs-codes', [ExportToolsController::class, 'hsCodeFinder'])->name('hs_code');
    Route::get('/crop-calendar', [ExportToolsController::class, 'cropCalendar'])->name('crop_calendar');
    Route::match(['get', 'post'], '/unit-converter', [ExportToolsController::class, 'unitConverter'])->name('unit_converter');
});

// Blog & Knowledge Hub
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
Route::get('/blogs/{blog:slug}', [BlogController::class, 'show'])->name('blogs.show');

// Contact & RFQ (Inquiry)
Route::get('/contact-us', [ContactController::class, 'index'])->name('contact');
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact/submit', [ContactController::class, 'submit'])->name('contact.submit');

Route::get('/request-quote', [InquiryController::class, 'create'])->name('rfq.create');
Route::post('/request-quote/submit', [InquiryController::class, 'store'])->name('rfq.store');
Route::get('/request-quote/received', [InquiryController::class, 'success'])->name('rfq.success');

Route::post('/newsletter/subscribe', [InquiryController::class, 'subscribeNewsletter'])->name('newsletter.subscribe');

// SEO XML Sitemap & Robots.txt
Route::get('/sitemap.xml', function () {
    $products = Product::active()->get();
    $categories = ProductCategory::active()->get();
    $blogs = Blog::published()->get();
    $countries = Country::active()->get();

    $content = view('seo.sitemap', compact('products', 'categories', 'blogs', 'countries'))->render();
    return Response::make($content, 200, ['Content-Type' => 'application/xml']);
})->name('sitemap');

Route::get('/robots.txt', function () {
    $text = "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /storage/inquiry_attachments/\nSitemap: " . url('/sitemap.xml') . "\n";
    return Response::make($text, 200, ['Content-Type' => 'text/plain']);
});

/*
|--------------------------------------------------------------------------
| Admin Authentication & Management Routes
|--------------------------------------------------------------------------
*/

// Top-level login alias
Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('login.submit');
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

    Route::middleware(['auth'])->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/dashboard', [DashboardController::class, 'index']);

        // Categories & Products
        Route::middleware(['role:super_admin,admin,content_editor'])->group(function () {
            Route::resource('categories', AdminCategoryController::class);
            Route::resource('products', AdminProductController::class);
            Route::resource('blogs', AdminBlogController::class);
        });

        // Inquiries & Quotations (Sales CRM)
        Route::middleware(['role:super_admin,admin,sales_manager,sales_executive'])->group(function () {
            Route::get('/inquiries', [AdminInquiryController::class, 'index'])->name('inquiries.index');
            Route::get('/inquiries/export-csv', [AdminInquiryController::class, 'exportCsv'])->name('inquiries.export_csv');
            Route::get('/inquiries/{inquiry}', [AdminInquiryController::class, 'show'])->name('inquiries.show');
            Route::post('/inquiries/{inquiry}/status', [AdminInquiryController::class, 'updateStatus'])->name('inquiries.status');
            Route::post('/inquiries/{inquiry}/assign', [AdminInquiryController::class, 'assign'])->name('inquiries.assign');
            Route::post('/inquiries/{inquiry}/notes', [AdminInquiryController::class, 'addNote'])->name('inquiries.notes');

            Route::get('/quotations', [AdminQuotationController::class, 'index'])->name('quotations.index');
            Route::get('/quotations/create', [AdminQuotationController::class, 'create'])->name('quotations.create');
            Route::post('/quotations', [AdminQuotationController::class, 'store'])->name('quotations.store');
            Route::get('/quotations/{quotation}', [AdminQuotationController::class, 'show'])->name('quotations.show');
            Route::post('/quotations/{quotation}/status', [AdminQuotationController::class, 'updateStatus'])->name('quotations.status');
            Route::get('/quotations/{quotation}/download-pdf', [AdminQuotationController::class, 'downloadPdf'])->name('quotations.download_pdf');
            Route::get('/quotations/{quotation}/preview-pdf', [AdminQuotationController::class, 'previewPdf'])->name('quotations.preview_pdf');
        });

        // Quality & Traceability
        Route::middleware(['role:super_admin,admin,quality_manager'])->group(function () {
            Route::resource('certifications', AdminCertificationController::class);
            Route::resource('traceability', AdminTraceabilityController::class);
        });

        // Settings & Audit Logs (Super Admin / Admin Only)
        Route::middleware(['role:super_admin,admin'])->group(function () {
            Route::get('/settings', [AdminSettingController::class, 'index'])->name('settings.index');
            Route::post('/settings', [AdminSettingController::class, 'update'])->name('settings.update');
            Route::get('/audit-logs', [AuditLogController::class, 'index'])->name('audit.index');
        });
    });
});
