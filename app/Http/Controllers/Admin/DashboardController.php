<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Blog;
use App\Models\Certification;
use App\Models\Inquiry;
use App\Models\Product;
use App\Models\Quotation;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        $totalProducts = Product::count();
        $publishedProducts = Product::active()->count();

        $totalInquiries = Inquiry::count();
        $newInquiries = Inquiry::where('status', 'new')->count();

        $pendingQuotations = Quotation::whereIn('status', ['draft', 'sent'])->count();
        $acceptedQuotations = Quotation::where('status', 'accepted')->count();
        $acceptedValue = Quotation::where('status', 'accepted')->sum('grand_total');

        $recentInquiries = Inquiry::with('product')
            ->latest()
            ->take(6)
            ->get();

        $expiringCertifications = Certification::active()
            ->whereNotNull('expiry_date')
            ->where('expiry_date', '<=', now()->addDays(90))
            ->orderBy('expiry_date')
            ->take(5)
            ->get();

        $recentAuditLogs = AuditLog::with('user')->latest()->take(8)->get();

        $inquiryStatuses = Inquiry::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        return view('admin.dashboard', compact(
            'totalProducts',
            'publishedProducts',
            'totalInquiries',
            'newInquiries',
            'pendingQuotations',
            'acceptedQuotations',
            'acceptedValue',
            'recentInquiries',
            'expiringCertifications',
            'recentAuditLogs',
            'inquiryStatuses'
        ));
    }
}
