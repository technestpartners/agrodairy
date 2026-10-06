<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\ExportMarket;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ExportMarketController extends Controller
{
    public function index(): View
    {
        $markets = ExportMarket::with(['countries' => function ($q) {
            $q->active()->orderBy('sort_order');
        }])->orderBy('sort_order')->get();

        return view('pages.markets.index', compact('markets'));
    }

    public function show(Country $country): View
    {
        $country->load('exportMarket');
        $popularProducts = Product::active()->take(4)->get();
        $otherCountries = Country::active()->where('id', '!=', $country->id)->take(6)->get();

        return view('pages.markets.country', compact('country', 'popularProducts', 'otherCountries'));
    }
}
