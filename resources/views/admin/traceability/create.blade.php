@extends('layouts.admin', ['title' => 'Register Batch Lot'])

@section('content')
<div class="max-w-4xl space-y-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Register Traceability Batch Lot</h1>
            <p class="text-xs text-stone-500">Record farm aggregation, analytical test data, and customs seal references</p>
        </div>
        <a href="{{ route('admin.traceability.index') }}" class="text-xs font-bold text-stone-600 hover:text-stone-900">&larr; Back to Lots</a>
    </div>

    <div class="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
        <form action="{{ route('admin.traceability.store') }}" method="POST" class="space-y-6">
            @csrf

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label for="batch_code" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Unique Batch / Lot Code *</label>
                    <input type="text" name="batch_code" id="batch_code" value="{{ old('batch_code', 'AGRO-'.date('Y').'-'.strtoupper(Str::random(4))) }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono font-bold focus:ring-2 focus:ring-emerald-800">
                    @error('batch_code') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                </div>

                <div>
                    <label for="product_id" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Commodity Product *</label>
                    <select name="product_id" id="product_id" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                        @foreach($products as $prod)
                            <option value="{{ $prod->id }}" {{ old('product_id') == $prod->id ? 'selected' : '' }}>
                                {{ $prod->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                    <label for="origin_region" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Farming Origin *</label>
                    <input type="text" name="origin_region" id="origin_region" value="{{ old('origin_region', 'Saurashtra, Gujarat, India') }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                </div>

                <div>
                    <label for="harvest_date" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Harvest Date</label>
                    <input type="date" name="harvest_date" id="harvest_date" value="{{ old('harvest_date') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                </div>

                <div>
                    <label for="packing_date" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Grading & Packing Date</label>
                    <input type="date" name="packing_date" id="packing_date" value="{{ old('packing_date', date('Y-m-d')) }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                </div>
            </div>

            <!-- Lab Quality Data -->
            <div class="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                <h3 class="text-xs font-bold uppercase tracking-wider text-emerald-950">Laboratory Analysis & COA Parameters</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <label for="certificate_of_analysis_no" class="block text-[11px] font-bold text-stone-700 uppercase mb-1">COA Certificate Number</label>
                        <input type="text" name="certificate_of_analysis_no" id="certificate_of_analysis_no" value="{{ old('certificate_of_analysis_no', 'COA-'.date('Y').'-ADE-'.rand(100,999)) }}" class="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-mono">
                    </div>

                    <div>
                        <label for="moisture_percentage" class="block text-[11px] font-bold text-stone-700 uppercase mb-1">Moisture Result</label>
                        <input type="text" name="moisture_percentage" id="moisture_percentage" value="{{ old('moisture_percentage', '6.8%') }}" placeholder="e.g. 6.8%" class="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs">
                    </div>

                    <div>
                        <label for="purity_percentage" class="block text-[11px] font-bold text-stone-700 uppercase mb-1">Optical Sorter Purity</label>
                        <input type="text" name="purity_percentage" id="purity_percentage" value="{{ old('purity_percentage', '99.5%') }}" placeholder="e.g. 99.5%" class="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div>
                        <label for="inspection_status" class="block text-[11px] font-bold text-stone-700 uppercase mb-1">QA Inspection Clearance</label>
                        <input type="text" name="inspection_status" id="inspection_status" value="{{ old('inspection_status', 'Passed QA Clearance (SGS Verified)') }}" class="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs">
                    </div>

                    <div>
                        <label for="packing_type" class="block text-[11px] font-bold text-stone-700 uppercase mb-1">Packaging Specification</label>
                        <input type="text" name="packing_type" id="packing_type" value="{{ old('packing_type', '50kg Jute Bags with inner liner') }}" class="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs">
                    </div>
                </div>
            </div>

            <!-- Maritime Tracking -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                    <label for="container_number" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Container Number (Optional)</label>
                    <input type="text" name="container_number" id="container_number" value="{{ old('container_number') }}" placeholder="e.g. MSKU1234567" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono">
                </div>

                <div>
                    <label for="port_of_loading" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Exit Seaport *</label>
                    <input type="text" name="port_of_loading" id="port_of_loading" value="{{ old('port_of_loading', 'Mundra Port (INMUN1), Gujarat') }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                </div>

                <div>
                    <label for="shipment_status" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Shipment Milestone *</label>
                    <select name="shipment_status" id="shipment_status" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                        <option value="Processing">Processing & Sorting</option>
                        <option value="Quality Approved" selected>Quality Approved</option>
                        <option value="Packed & Sealed">Packed & Sealed</option>
                        <option value="Dispatched to Port">Dispatched to Port</option>
                        <option value="Shipped">Shipped on Board</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
            </div>

            <div>
                <label for="public_notes" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Public Quality / COA Remarks</label>
                <textarea name="public_notes" id="public_notes" rows="2" placeholder="Public remarks visible on the traceability lookup portal..." class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">{{ old('public_notes') }}</textarea>
            </div>

            <div class="flex items-center gap-6 pt-2">
                <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                    <input type="checkbox" name="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }} class="rounded border-stone-300 text-emerald-800 focus:ring-emerald-800">
                    <span>Active in Public Traceability Portal</span>
                </label>
            </div>

            <div class="pt-6 border-t border-stone-200 flex justify-end gap-3">
                <a href="{{ route('admin.traceability.index') }}" class="px-5 py-2.5 bg-stone-100 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-200 transition">Cancel</a>
                <button type="submit" class="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow">Register Batch Lot</button>
            </div>
        </form>
    </div>
</div>
@endsection
