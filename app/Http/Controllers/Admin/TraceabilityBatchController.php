<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\TraceabilityBatch;
use App\Services\AuditService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class TraceabilityBatchController extends Controller
{
    public function index(Request $request): View
    {
        $query = TraceabilityBatch::with('product');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('batch_code', 'like', "%{$search}%")
                  ->orWhere('certificate_of_analysis_no', 'like', "%{$search}%")
                  ->orWhere('container_number', 'like', "%{$search}%");
            });
        }

        $batches = $query->latest()->paginate(15)->withQueryString();

        return view('admin.traceability.index', compact('batches'));
    }

    public function create(): View
    {
        $products = Product::active()->orderBy('name')->get();
        return view('admin.traceability.create', compact('products'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'batch_code' => 'required|string|max:50|unique:traceability_batches,batch_code',
            'product_id' => 'required|exists:products,id',
            'origin_region' => 'required|string|max:150',
            'harvest_date' => 'nullable|date',
            'processing_date' => 'nullable|date',
            'packing_date' => 'nullable|date',
            'inspection_status' => 'required|string|max:100',
            'certificate_of_analysis_no' => 'nullable|string|max:100',
            'packing_type' => 'nullable|string|max:150',
            'purity_percentage' => 'nullable|string|max:30',
            'moisture_percentage' => 'nullable|string|max:30',
            'container_number' => 'nullable|string|max:50',
            'port_of_loading' => 'required|string|max:150',
            'shipment_status' => 'required|in:Processing,Quality Approved,Packed & Sealed,Dispatched to Port,Shipped,Delivered',
            'public_notes' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['batch_code'] = strtoupper(trim($validated['batch_code']));
        $validated['is_active'] = $request->boolean('is_active', true);

        $batch = TraceabilityBatch::create($validated);

        AuditService::log('created', 'TraceabilityBatch', $batch->id, "Created lot batch {$batch->batch_code}");

        return redirect()->route('admin.traceability.index')->with('success', "Batch lot '{$batch->batch_code}' registered successfully.");
    }

    public function edit(TraceabilityBatch $traceability): View
    {
        $products = Product::active()->orderBy('name')->get();
        return view('admin.traceability.edit', [
            'batch' => $traceability,
            'products' => $products,
        ]);
    }

    public function update(Request $request, TraceabilityBatch $traceability): RedirectResponse
    {
        $validated = $request->validate([
            'batch_code' => "required|string|max:50|unique:traceability_batches,batch_code,{$traceability->id}",
            'product_id' => 'required|exists:products,id',
            'origin_region' => 'required|string|max:150',
            'harvest_date' => 'nullable|date',
            'processing_date' => 'nullable|date',
            'packing_date' => 'nullable|date',
            'inspection_status' => 'required|string|max:100',
            'certificate_of_analysis_no' => 'nullable|string|max:100',
            'packing_type' => 'nullable|string|max:150',
            'purity_percentage' => 'nullable|string|max:30',
            'moisture_percentage' => 'nullable|string|max:30',
            'container_number' => 'nullable|string|max:50',
            'port_of_loading' => 'required|string|max:150',
            'shipment_status' => 'required|in:Processing,Quality Approved,Packed & Sealed,Dispatched to Port,Shipped,Delivered',
            'public_notes' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['batch_code'] = strtoupper(trim($validated['batch_code']));
        $validated['is_active'] = $request->boolean('is_active');

        $traceability->update($validated);

        AuditService::log('updated', 'TraceabilityBatch', $traceability->id, "Updated lot batch {$traceability->batch_code}");

        return redirect()->route('admin.traceability.index')->with('success', "Batch lot '{$traceability->batch_code}' updated successfully.");
    }

    public function destroy(TraceabilityBatch $traceability): RedirectResponse
    {
        $code = $traceability->batch_code;
        $traceability->delete();

        AuditService::log('deleted', 'TraceabilityBatch', null, "Deleted lot batch {$code}");

        return redirect()->route('admin.traceability.index')->with('success', "Batch lot '{$code}' deleted.");
    }
}
