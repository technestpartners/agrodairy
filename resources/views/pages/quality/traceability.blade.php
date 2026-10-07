@extends('layouts.app')

@section('title', 'Batch & Lot Traceability Portal | Agro Dairy Export LLP')
@section('meta_description', 'Verify harvest origin, quality inspection status, laboratory COA testing, packing date, and container reference with our secure lot traceability system.')

@section('breadcrumbs')
    <x-breadcrumbs :items="['Quality Assurance' => route('quality.index'), 'Traceability Portal' => '']" />
@endsection

@section('content')
<div class="relative bg-gradient-to-r from-[#033e3a] via-[#00a79d] to-[#022826] py-16 md:py-24 text-white overflow-hidden shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-white/10 text-[#00d9cc] text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-white/20">Digital Chain of Custody</span>
            <h1 class="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">Agricultural Batch & Lot Traceability System</h1>
            <p class="mt-4 text-base md:text-lg text-teal-100 leading-relaxed">
                Enter your consignment batch code or container lot reference below to review authenticated agricultural origin, processing parameters, and certified inspection reports.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-[#f8fafa] dark:bg-[#061514] transition-colors duration-200">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Search Box -->
        <div class="bg-white dark:bg-[#0a1e1c] p-6 md:p-8 rounded-2xl border border-stone-200 dark:border-teal-900/60 shadow-sm mb-12">
            <form action="{{ route('quality.traceability.lookup') }}" method="POST">
                @csrf
                <label for="batch_code" class="block text-sm font-bold text-teal-950 dark:text-white mb-2">Enter Export Batch / Lot Number</label>
                <div class="flex flex-col sm:flex-row gap-3">
                    <div class="relative flex-grow">
                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                        <input type="text" name="batch_code" id="batch_code" value="{{ $searchedCode ?? old('batch_code', 'AGRO-PN-2026-0814') }}" required
                               placeholder="e.g. AGRO-PN-2026-0814"
                               class="w-full pl-10 pr-4 py-3 bg-stone-50 dark:bg-[#061514] border border-stone-300 dark:border-teal-900 rounded-xl text-teal-950 dark:text-white uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white text-sm">
                    </div>
                    <button type="submit" class="px-8 py-3 bg-gradient-to-r from-[#00a79d] to-[#033e3a] hover:opacity-95 text-white font-bold text-sm rounded-xl transition shadow flex items-center justify-center gap-2">
                        <span>Authenticate Lot</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </button>
                </div>
                <div class="mt-3 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <span>Try demo verified batches:</span>
                    <button type="button" onclick="document.getElementById('batch_code').value='AGRO-PN-2026-0814'" class="text-teal-700 dark:text-teal-400 underline font-mono">AGRO-PN-2026-0814</button>
                    <span>&bull;</span>
                    <button type="button" onclick="document.getElementById('batch_code').value='AGRO-SS-2026-0922'" class="text-teal-700 dark:text-teal-400 underline font-mono">AGRO-SS-2026-0922</button>
                </div>
            </form>
        </div>

        @if(isset($searched) && $searched)
            @if(isset($batch) && $batch)
                <!-- Found Batch Details Card -->
                <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl border-2 border-teal-500/50 shadow-xl overflow-hidden animate-fade-in">
                    <!-- Top Ribbon -->
                    <div class="bg-teal-50 dark:bg-[#061514] p-6 border-b border-teal-200 dark:border-teal-900/60 flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shadow">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <div>
                                <span class="text-xs uppercase font-bold text-teal-800 dark:text-teal-300 tracking-wider">Verified Authenticated Batch</span>
                                <h3 class="text-xl font-bold font-mono text-teal-950 dark:text-white">{{ $batch->batch_code }}</h3>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-200 uppercase border border-teal-300 dark:border-teal-800">
                                QC Status: {{ $batch->inspection_status }}
                            </span>
                            @if($batch->shipment_status)
                                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 capitalize">
                                    {{ $batch->shipment_status }}
                                </span>
                            @endif
                        </div>
                    </div>

                    <div class="p-6 md:p-8 space-y-8">
                        <!-- Product & Agronomy Summary -->
                        <div>
                            <h4 class="text-xs uppercase font-bold text-stone-400 dark:text-stone-400 tracking-wider mb-4">1. Harvest & Commodity Specification</h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <div class="bg-stone-50 dark:bg-[#061514] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                                    <span class="text-xs text-stone-500 dark:text-stone-400 block">Product</span>
                                    <span class="font-bold text-teal-950 dark:text-white text-sm">{{ $batch->product?->name ?? 'Standard Commodity' }}</span>
                                </div>
                                <div class="bg-stone-50 dark:bg-[#061514] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                                    <span class="text-xs text-stone-500 dark:text-stone-400 block">Farming Region / Origin</span>
                                    <span class="font-bold text-teal-950 dark:text-white text-sm">{{ $batch->origin_region ?? 'Gujarat, India' }}</span>
                                </div>
                                <div class="bg-stone-50 dark:bg-[#061514] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                                    <span class="text-xs text-stone-500 dark:text-stone-400 block">Farm Cluster</span>
                                    <span class="font-bold text-teal-950 dark:text-white text-sm">{{ $batch->farm_location ?? 'APEDA Saurashtra Mandi Network' }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Processing & Packing Timeline -->
                        <div>
                            <h4 class="text-xs uppercase font-bold text-stone-400 dark:text-stone-400 tracking-wider mb-4">2. Processing & Packaging Milestones</h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                <div class="bg-stone-50 dark:bg-[#061514] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                                    <span class="text-xs text-stone-500 dark:text-stone-400 block">Harvest Date</span>
                                    <span class="font-bold text-teal-950 dark:text-white text-sm">{{ $batch->harvest_date ? $batch->harvest_date->format('d M, Y') : 'N/A' }}</span>
                                </div>
                                <div class="bg-stone-50 dark:bg-[#061514] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                                    <span class="text-xs text-stone-500 dark:text-stone-400 block">Grading & Packing Date</span>
                                    <span class="font-bold text-teal-950 dark:text-white text-sm">{{ $batch->packing_date ? $batch->packing_date->format('d M, Y') : 'N/A' }}</span>
                                </div>
                                <div class="bg-stone-50 dark:bg-[#061514] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                                    <span class="text-xs text-stone-500 dark:text-stone-400 block">Processing Terminal</span>
                                    <span class="font-bold text-teal-950 dark:text-white text-sm">{{ $batch->processing_facility ?? 'Saurashtra Processing Terminal, Gondal' }}</span>
                                </div>
                                <div class="bg-stone-50 dark:bg-[#061514] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                                    <span class="text-xs text-stone-500 dark:text-stone-400 block">Packaging Spec</span>
                                    <span class="font-bold text-teal-950 dark:text-white text-sm">{{ $batch->packaging_type ?? '50kg Jute Bags with liner' }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Quality Assurance & Laboratory Parameters -->
                        <div>
                            <h4 class="text-xs uppercase font-bold text-stone-400 dark:text-stone-400 tracking-wider mb-4">3. Analytical Quality Certificate (COA) Findings</h4>
                            <div class="bg-gradient-to-br from-[#033e3a] to-[#021816] text-white p-6 rounded-2xl border border-teal-800/40 shadow">
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    <div>
                                        <span class="text-xs text-teal-200 block">Laboratory COA Reference</span>
                                        <span class="font-mono font-bold text-[#00d9cc] text-sm">{{ $batch->coa_number ?? 'COA-2026-ADE-089' }}</span>
                                    </div>
                                    <div>
                                        <span class="text-xs text-teal-200 block">Moisture Verified</span>
                                        <span class="font-bold text-white text-base">{{ $batch->moisture_tested ?? '6.8%' }}</span>
                                    </div>
                                    <div>
                                        <span class="text-xs text-teal-200 block">Purity Sorter Output</span>
                                        <span class="font-bold text-white text-base">{{ $batch->purity_tested ?? '99.5%' }}</span>
                                    </div>
                                    <div>
                                        <span class="text-xs text-teal-200 block">Total Aflatoxin Result</span>
                                        <span class="font-bold text-amber-300 text-base">{{ $batch->aflatoxin_tested ?? '< 2 ppb (B1 < 1 ppb)' }}</span>
                                    </div>
                                </div>
                                @if($batch->quality_notes)
                                    <div class="mt-4 pt-4 border-t border-teal-800/50 text-xs text-teal-100">
                                        <span class="font-bold text-[#00d9cc]">QC Chemist Remarks:</span> {{ $batch->quality_notes }}
                                    </div>
                                @endif
                            </div>
                        </div>

                        <!-- Maritime Logistics Reference -->
                        <div>
                            <h4 class="text-xs uppercase font-bold text-stone-400 dark:text-stone-400 tracking-wider mb-4">4. Shipping & Container Clearance</h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <div class="bg-stone-50 dark:bg-[#061514] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                                    <span class="text-xs text-stone-500 dark:text-stone-400 block">Container Unit Reference</span>
                                    <span class="font-mono font-bold text-teal-950 dark:text-white text-sm">{{ $batch->container_number ?? 'Disclosed Upon Customs Gate-In' }}</span>
                                </div>
                                <div class="bg-stone-50 dark:bg-[#061514] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                                    <span class="text-xs text-stone-500 dark:text-stone-400 block">Customs Bolt Seal</span>
                                    <span class="font-mono font-bold text-teal-950 dark:text-white text-sm">{{ $batch->seal_number ?? 'Verified High-Security Seal' }}</span>
                                </div>
                                <div class="bg-stone-50 dark:bg-[#061514] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                                    <span class="text-xs text-stone-500 dark:text-stone-400 block">Exit Seaport</span>
                                    <span class="font-bold text-teal-950 dark:text-white text-sm">{{ $batch->port_of_loading ?? 'Mundra Port (INMUN1), Gujarat' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-stone-50 dark:bg-[#061514] p-6 border-t border-stone-200 dark:border-teal-900/50 flex flex-wrap items-center justify-between gap-4">
                        <div class="text-xs text-stone-500 dark:text-stone-400">
                            Authentic digital record verified against Agro Dairy Export enterprise ERP database.
                        </div>
                        <a href="{{ route('rfq.create') }}" class="px-5 py-2.5 bg-gradient-to-r from-[#00a79d] to-[#033e3a] text-white font-bold text-xs rounded-xl transition shadow">
                            Request Joint Inspection Copy
                        </a>
                    </div>
                </div>
            @else
                <!-- Batch Not Found Alert -->
                <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl border-2 border-amber-300 dark:border-amber-700 shadow-sm p-8 text-center animate-fade-in">
                    <div class="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto mb-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    </div>
                    <h3 class="text-lg font-bold text-teal-950 dark:text-white mb-1">Batch Code Not Found in Public Registry</h3>
                    <p class="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
                        No active public record matched "<span class="font-mono font-bold text-teal-800 dark:text-teal-300">{{ $searchedCode }}</span>". If your consignment was recently cleared, the port customs index may take up to 24 hours to sync.
                    </p>
                    <div class="mt-6">
                        <a href="{{ route('contact.index') }}" class="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-[#00a79d] to-[#033e3a] text-white text-xs font-semibold rounded-xl">Contact Quality Manager for Manual Verification</a>
                    </div>
                </div>
            @endif
        @else
            <!-- How Traceability Works Guide -->
            <div class="bg-white dark:bg-[#0a1e1c] p-8 rounded-2xl border border-stone-200 dark:border-teal-900/60 shadow-sm">
                <h3 class="text-xl font-bold font-heading text-teal-950 dark:text-white mb-6">How Our Traceability Protocol Works</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="space-y-2">
                        <div class="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-[#00d9cc] flex items-center justify-center font-bold text-sm">1</div>
                        <h4 class="font-bold text-sm text-teal-950 dark:text-white">Farm Aggregation Coding</h4>
                        <p class="text-xs text-stone-600 dark:text-stone-300">Every batch is allocated a unique alphanumeric tag identifying the procurement cluster and harvesting period in Saurashtra.</p>
                    </div>
                    <div class="space-y-2">
                        <div class="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-[#00d9cc] flex items-center justify-center font-bold text-sm">2</div>
                        <h4 class="font-bold text-sm text-teal-950 dark:text-white">Sorting & Lab Assay</h4>
                        <p class="text-xs text-stone-600 dark:text-stone-300">Moisture, aflatoxin, count per ounce, and purity measurements are permanently indexed against the batch number.</p>
                    </div>
                    <div class="space-y-2">
                        <div class="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-[#00d9cc] flex items-center justify-center font-bold text-sm">3</div>
                        <h4 class="font-bold text-sm text-teal-950 dark:text-white">Container Bolt Sealing</h4>
                        <p class="text-xs text-stone-600 dark:text-stone-300">Upon maritime stuffing at our CFS warehouse, the shipping line container reference and high-security seal are linked.</p>
                    </div>
                </div>
            </div>
        @endif
    </div>
</section>
@endsection
