<?php

namespace App\Http\Controllers;

use App\Models\InfrastructureItem;
use App\Models\PackagingType;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PackagingController extends Controller
{
    public function index(): View
    {
        $packagingTypes = PackagingType::active()->orderBy('sort_order')->get();
        $warehouseFacilities = InfrastructureItem::whereIn('category', ['packaging', 'warehouse'])->get();

        return view('pages.packaging.index', compact('packagingTypes', 'warehouseFacilities'));
    }
}
