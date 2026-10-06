<?php

namespace App\Http\Controllers;

use App\Models\Port;
use Illuminate\Http\Request;
use Illuminate\View\View;

class LogisticsController extends Controller
{
    public function index(): View
    {
        $indianPorts = Port::where('type', 'Loading')->get();
        return view('pages.logistics.index', compact('indianPorts'));
    }
}
