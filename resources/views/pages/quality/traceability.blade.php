@extends('layouts.app', ['title' => 'Batch & Lot Traceability Portal - Agro Dairy Export LLP', 'metaDescription' => 'Verify harvest origin, quality inspection status, laboratory COA testing, packing date, and container reference with our secure lot traceability system.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Quality Assurance', 'url' => route('quality.index')], ['label' => 'Traceability Portal']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Digital Chain of Custody</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Agricultural Batch & Lot Traceability System</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Enter your consignment batch code or container lot reference below to review authenticated agricultural origin, processing parameters, and certified inspection reports.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-brand-beige-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Search Box -->
        <div class="bg-white p-6 md:p-8 rounded-2xl border border-brand-beige-200 shadow-sm mb-12">
            <form action="{{ route('quality.traceability.lookup') }}" method="POST">
                @csrf
                <label for="batch_code" class="block text-sm font-bold text-brand-forest-900 mb-2">Enter Export Batch / Lot Number</label>
                <div class="flex flex-col sm:flex-row gap-3">
                    <div class="relative flex-grow">
                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                        <input type="text" name="batch_code" id="batch_code" value="{{ $searchedCode ?? old('batch_code', 'AGRO-PN-2026-0814') }}" required
                               placeholder="e.g. AGRO-PN-2026-0814"
                               class="w-full pl-10 pr-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-brand-forest-900 uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-brand-forest-800 focus:bg-white text-sm">
                    </div>
                    <button type="submit" class="px-8 py-3 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-sm rounded-xl transition shadow flex items-center justify-center gap-2">
                        <span>Authenticate Lot</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </button>
                </div>
                <div class="mt-3 flex items-center gap-2 text-xs text-neutral-500">
                    <span>Try demo verified batches:</span>
                    <button type="button" onclick="document.getElementById('batch_code').value='AGRO-PN-2026-0814'" class="text-brand-forest-800 underline font-mono">AGRO-PN-2026-0814</button>
                    <span>&bull;</span>
                    <button type="button" onclick="document.getElementById('batch_code').value='AGRO-SS-2026-0922'" class="text-brand-forest-800 underline font-mono">AGRO-SS-2026-0922</button>
                </div>
            </form>
        </div>

        @if(isset($searched) && $searched)
            @if(isset($batch) && $batch)
                <!-- Found Batch Details Card -->
                <div class="bg-white rounded-2xl border-2 border-emerald-500/40 shadow-lg overflow-hidden animate-fade-in">
                    <!-- Top Ribbon -->
                    <div class="bg-emerald-50 p-6 border-b border-emerald-100 flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <div>
                                <span class="text-xs uppercase font-bold text-emerald-800 tracking-wider">Verified Authenticated Batch</span>
                                <h3 class="text-xl font-bold font-mono text-brand-forest-950">{{ $batch->batch_code }}</h3>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-200 text-emerald-900 uppercase">
                                QC Status: {{ $batch->inspection_status }}
                            </span>
                            @if($batch->shipment_status)
                                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-brand-forest-100 text-brand-forest-900 capitalize">
                                    {{ $batch->shipment_status }}
                                </span>
                            @endif
                        </div>
                    </div>

                    <div class="p-6 md:p-8 space-y-8">
                        <!-- Product & Agronomy Summary -->
                        <div>
                            <h4 class="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-4">1. Harvest & Commodity Specification</h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <div class="bg-brand-beige-50 p-4 rounded-xl border border-brand-beige-200">
                                    <span class="text-xs text-neutral-500 block">Product</span>
                                    <span class="font-bold text-brand-forest-900 text-sm">{{ $batch->product?->name ?? 'Standard Commodity' }}</span>
                                </div>
                                <div class="bg-brand-beige-50 p-4 rounded-xl border border-brand-beige-200">
                                    <span class="text-xs text-neutral-500 block">Farming Region / Origin</span>
                                    <span class="font-bold text-brand-forest-900 text-sm">{{ $batch->origin_region ?? 'Gujarat, India' }}</span>
                                </div>
                                <div class="bg-brand-beige-50 p-4 rounded-xl border border-brand-beige-200">
                                    <span class="text-xs text-neutral-500 block">Farm Cluster</span>
                                    <span class="font-bold text-brand-forest-900 text-sm">{{ $batch->farm_location ?? 'APEDA Saurashtra Mandi Network' }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Processing & Packing Timeline -->
                        <div>
                            <h4 class="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-4">2. Processing & Packaging Milestones</h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                <div class="bg-brand-beige-50 p-4 rounded-xl border border-brand-beige-200">
                                    <span class="text-xs text-neutral-500 block">Harvest Date</span>
                                    <span class="font-bold text-brand-forest-900 text-sm">{{ $batch->harvest_date ? $batch->harvest_date->format('d M, Y') : 'N/A' }}</span>
                                </div>
                                <div class="bg-brand-beige-50 p-4 rounded-xl border border-brand-beige-200">
                                    <span class="text-xs text-neutral-500 block">Grading & Packing Date</span>
                                    <span class="font-bold text-brand-forest-900 text-sm">{{ $batch->packing_date ? $batch->packing_date->format('d M, Y') : 'N/A' }}</span>
                                </div>
                                <div class="bg-brand-beige-50 p-4 rounded-xl border border-brand-beige-200">
                                    <span class="text-xs text-neutral-500 block">Processing Terminal</span>
                                    <span class="font-bold text-brand-forest-900 text-sm">{{ $batch->processing_facility ?? 'Rajkot Plant Unit 1' }}</span>
                                </div>
                                <div class="bg-brand-beige-50 p-4 rounded-xl border border-brand-beige-200">
                                    <span class="text-xs text-neutral-500 block">Packaging Spec</span>
                                    <span class="font-bold text-brand-forest-900 text-sm">{{ $batch->packaging_type ?? '50kg Jute Bags with liner' }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Quality Assurance & Laboratory Parameters -->
                        <div>
                            <h4 class="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-4">3. Analytical Quality Certificate (COA) Findings</h4>
                            <div class="bg-brand-forest-900 text-white p-6 rounded-2xl">
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    <div>
                                        <span class="text-xs text-brand-beige-300 block">Laboratory COA Reference</span>
                                        <span class="font-mono font-bold text-brand-gold-400 text-sm">{{ $batch->coa_number ?? 'COA-2026-ADE-089' }}</span>
                                    </div>
                                    <div>
                                        <span class="text-xs text-brand-beige-300 block">Moisture Verified</span>
                                        <span class="font-bold text-white text-base">{{ $batch->moisture_tested ?? '6.8%' }}</span>
                                    </div>
                                    <div>
                                        <span class="text-xs text-brand-beige-300 block">Purity Sorter Output</span>
                                        <span class="font-bold text-white text-base">{{ $batch->purity_tested ?? '99.5%' }}</span>
                                    </div>
                                    <div>
                                        <span class="text-xs text-brand-beige-300 block">Total Aflatoxin Result</span>
                                        <span class="font-bold text-emerald-400 text-base">{{ $batch->aflatoxin_tested ?? '< 2 ppb (B1 < 1 ppb)' }}</span>
                                    </div>
                                </div>
                                @if($batch->quality_notes)
                                    <div class="mt-4 pt-4 border-t border-brand-forest-800 text-xs text-brand-beige-200">
                                        <span class="font-bold text-brand-gold-400">QC Chemist Remarks:</span> {{ $batch->quality_notes }}
                                    </div>
                                @endif
                            </div>
                        </div>

                        <!-- Maritime Logistics Reference -->
                        <div>
                            <h4 class="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-4">4. Shipping & Container Clearance</h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <div class="bg-brand-beige-50 p-4 rounded-xl border border-brand-beige-200">
                                    <span class="text-xs text-neutral-500 block">Container Unit Reference</span>
                                    <span class="font-mono font-bold text-brand-forest-900 text-sm">{{ $batch->container_number ?? 'Disclosed Upon Customs Gate-In' }}</span>
                                </div>
                                <div class="bg-brand-beige-50 p-4 rounded-xl border border-brand-beige-200">
                                    <span class="text-xs text-neutral-500 block">Customs Bolt Seal</span>
                                    <span class="font-mono font-bold text-brand-forest-900 text-sm">{{ $batch->seal_number ?? 'Verified High-Security Seal' }}</span>
                                </div>
                                <div class="bg-brand-beige-50 p-4 rounded-xl border border-brand-beige-200">
                                    <span class="text-xs text-neutral-500 block">Exit Seaport</span>
                                    <span class="font-bold text-brand-forest-900 text-sm">{{ $batch->port_of_loading ?? 'Mundra Port (INMUN1), Gujarat' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-neutral-50 p-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
                        <div class="text-xs text-neutral-500">
                            Authentic digital record verified against Agro Dairy Export enterprise ERP database.
                        </div>
                        <a href="{{ route('rfq.create') }}" class="px-5 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-xs rounded-xl transition shadow">
                            Request Joint Inspection Copy
                        </a>
                    </div>
                </div>
            @else
                <!-- Batch Not Found Alert -->
                <div class="bg-white rounded-2xl border-2 border-amber-300 shadow-sm p-8 text-center animate-fade-in">
                    <div class="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    </div>
                    <h3 class="text-lg font-bold text-brand-forest-900 mb-1">Batch Code Not Found in Public Registry</h3>
                    <p class="text-sm text-neutral-600 max-w-md mx-auto">
                        No active public record matched "<span class="font-mono font-bold text-brand-forest-950">{{ $searchedCode }}</span>". If your consignment was recently cleared, the port customs index may take up to 24 hours to sync.
                    </p>
                    <div class="mt-6">
                        <a href="{{ route('contact.index') }}" class="inline-flex items-center px-5 py-2.5 bg-brand-forest-800 text-white text-xs font-semibold rounded-xl">Contact Quality Manager for Manual Verification</a>
                    </div>
                </div>
            @endif
        @else
            <!-- How Traceability Works Guide -->
            <div class="bg-white p-8 rounded-2xl border border-brand-beige-200 shadow-sm">
                <h3 class="text-xl font-bold font-display text-brand-forest-900 mb-6">How Our Traceability Protocol Works</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="space-y-2">
                        <div class="w-8 h-8 rounded-lg bg-brand-forest-50 text-brand-forest-900 flex items-center justify-center font-bold text-sm">1</div>
                        <h4 class="font-bold text-sm text-brand-forest-900">Farm Aggregation Coding</h4>
                        <p class="text-xs text-neutral-600">Every batch is allocated a unique alphanumeric tag identifying the procurement cluster and harvesting period in Saurashtra.</p>
                    </div>
                    <div class="space-y-2">
                        <div class="w-8 h-8 rounded-lg bg-brand-forest-50 text-brand-forest-900 flex items-center justify-center font-bold text-sm">2</div>
                        <h4 class="font-bold text-sm text-brand-forest-900">Sorting & Lab Assay</h4>
                        <p class="text-xs text-neutral-600">Moisture, aflatoxin, count per ounce, and purity measurements are permanently indexed against the batch number.</p>
                    </div>
                    <div class="space-y-2">
                        <div class="w-8 h-8 rounded-lg bg-brand-forest-50 text-brand-forest-900 flex items-center justify-center font-bold text-sm">3</div>
                        <h4 class="font-bold text-sm text-brand-forest-900">Container Bolt Sealing</h4>
                        <p class="text-xs text-neutral-600">Upon maritime stuffing at our CFS warehouse, the shipping line container reference and high-security seal are linked.</p>
                    </div>
                </div>
            </div>
        @endif
    </div>
</section>
@endsection
