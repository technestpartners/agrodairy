<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\InfrastructureItem;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\View\View;

class CompanyController extends Controller
{
    public function about(): View
    {
        $team = TeamMember::active()->orderBy('sort_order')->get();
        $certifications = Certification::active()->orderBy('sort_order')->get();
        return view('pages.company.about', compact('team', 'certifications'));
    }

    public function infrastructure(): View
    {
        $items = InfrastructureItem::orderBy('sort_order')->get();
        return view('pages.company.infrastructure', compact('items'));
    }

    public function farmerNetwork(): View
    {
        return view('pages.company.farmer_network');
    }

    public function tradeShows(): View
    {
        return view('pages.company.trade_shows');
    }

    public function gallery(): View
    {
        $infrastructure = InfrastructureItem::orderBy('sort_order')->get();
        return view('pages.company.gallery', compact('infrastructure'));
    }

    public function careers(): View
    {
        return view('pages.company.careers');
    }

    public function verify(): View
    {
        $certifications = Certification::active()->orderBy('sort_order')->get();
        return view('pages.company.verify', compact('certifications'));
    }
}
