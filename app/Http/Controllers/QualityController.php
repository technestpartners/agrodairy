<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\QualityDocument;
use App\Models\TraceabilityBatch;
use Illuminate\Http\Request;
use Illuminate\View\View;

class QualityController extends Controller
{
    public function index(): View
    {
        $certifications = Certification::active()->orderBy('sort_order')->get();
        $qualityDocs = QualityDocument::public()->orderBy('sort_order')->get();
        return view('pages.quality.index', compact('certifications', 'qualityDocs'));
    }

    public function certifications(): View
    {
        $certifications = Certification::active()->orderBy('sort_order')->get();
        return view('pages.quality.certifications', compact('certifications'));
    }

    public function traceability(): View
    {
        return view('pages.quality.traceability');
    }

    public function traceabilityLookup(Request $request): View
    {
        $request->validate([
            'batch_code' => 'required|string|max:50',
        ]);

        $batchCode = trim(strtoupper($request->batch_code));

        $batch = TraceabilityBatch::active()
            ->with('product.category')
            ->where('batch_code', $batchCode)
            ->first();

        return view('pages.quality.traceability', [
            'batch' => $batch,
            'searchedCode' => $batchCode,
            'searched' => true,
        ]);
    }
}
