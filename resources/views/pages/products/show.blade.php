@extends('layouts.app')

@section('title', ($product->meta_title ?? $product->name . ' Exporter from India') . ' | Agro Dairy Export LLP')
@section('meta_description', $product->meta_description ?? $product->short_description)

@section('breadcrumbs')
    <x-breadcrumbs :items="[
        'Export Commodities' => route('products.index'),
        $product->category->name => route('products.category', $product->category->slug),
        $product->name => ''
    ]" />
@endsection

@section('content')
<div class="bg-[#edf5f4]/50 dark:bg-[#061514] py-12 border-b border-stone-200 dark:border-teal-900/40 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <!-- Product Gallery & Visual Column -->
            <div class="lg:col-span-5">
                <div class="bg-white dark:bg-[#0a1e1c] rounded-3xl p-4 border border-stone-200 dark:border-teal-900/60 shadow-sm sticky top-28">
                    <div class="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-stone-100 dark:bg-[#061514]">
                        @if($product->main_image && file_exists(public_path(ltrim($product->main_image, '/'))))
                            <img src="{{ $product->main_image }}" alt="{{ $product->name }}" class="w-full h-full object-cover">
                        @else
                            <div class="w-full h-full bg-gradient-to-br from-[#033e3a] to-[#061514] flex flex-col items-center justify-center p-8 text-center text-white">
                                <span class="text-6xl font-extrabold text-[#00d9cc] font-heading mb-2">{{ substr($product->name, 0, 1) }}</span>
                                <span class="text-sm uppercase tracking-widest text-teal-200 font-semibold">{{ $product->category->name }}</span>
                            </div>
                        @endif

                        <div class="absolute top-4 left-4 flex gap-2">
                            <span class="px-3 py-1 bg-[#033e3a]/90 text-white text-xs font-semibold rounded-full border border-teal-500/40 backdrop-blur-md">
                                {{ $product->category->name }}
                            </span>
                            @if($product->is_featured)
                                <span class="px-3 py-1 bg-amber-400 text-stone-950 text-xs font-bold rounded-full backdrop-blur-md">
                                    Export Standard
                                </span>
                            @endif
                        </div>

                        <div class="absolute bottom-4 right-4">
                            <span class="px-3 py-1 bg-black/75 text-white text-xs font-medium rounded-lg backdrop-blur-sm">
                                HS Code: {{ $product->hs_code }}
                            </span>
                        </div>
                    </div>

                    <!-- Quick Specification Action Badges -->
                    <div class="mt-4 pt-4 border-t border-stone-100 dark:border-teal-900/40 flex flex-wrap gap-2 text-xs">
                        <span class="px-3 py-1 rounded-lg bg-stone-100 dark:bg-[#061514] text-stone-700 dark:text-stone-300">Origin: <strong class="text-teal-900 dark:text-teal-200">{{ $product->origin }}</strong></span>
                        <span class="px-3 py-1 rounded-lg bg-stone-100 dark:bg-[#061514] text-stone-700 dark:text-stone-300">MOQ: <strong class="text-teal-900 dark:text-teal-200">{{ $product->formatted_moq }}</strong></span>
                        <span class="px-3 py-1 rounded-lg bg-stone-100 dark:bg-[#061514] text-stone-700 dark:text-stone-300">Shelf Life: <strong class="text-teal-900 dark:text-teal-200">{{ $product->shelf_life ?? '12-24 Mos' }}</strong></span>
                    </div>

                    <!-- Action Buttons -->
                    <div class="mt-6 space-y-3">
                        <button type="button" 
                            @click="$dispatch('open-rfq-modal', { productId: '{{ $product->id }}', productName: '{{ addslashes($product->name) }}' })"
                            class="w-full bg-gradient-to-r from-[#00a79d] to-[#033e3a] hover:opacity-95 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 text-sm border border-teal-500/40">
                            <svg class="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            <span>Request Official Quotation (RFQ)</span>
                        </button>

                        <div class="grid grid-cols-2 gap-3">
                            <a href="{{ $whatsAppUrl }}" target="_blank" class="w-full bg-teal-700 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-xl shadow transition text-xs flex items-center justify-center space-x-1.5">
                                <span>WhatsApp Trade Desk</span>
                            </a>

                            <a href="{{ route('products.pdf', $product->slug) }}" class="w-full bg-stone-100 dark:bg-[#061514] hover:bg-stone-200 dark:hover:bg-[#0d2724] text-stone-800 dark:text-stone-200 font-semibold py-3 px-4 rounded-xl border border-stone-300 dark:border-teal-900/60 transition text-xs flex items-center justify-center space-x-1.5">
                                <svg class="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                <span>Download PDF TDS</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Product Data & Technical Details Column -->
            <div class="lg:col-span-7 space-y-8">
                <!-- Header Info -->
                <div>
                    <div class="flex items-center space-x-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                        <span>SKU: {{ $product->sku ?? 'AGRO-EXP' }}</span>
                        <span>•</span>
                        <span>Category: {{ $product->category->name }}</span>
                    </div>

                    <h1 class="text-3xl sm:text-4xl font-extrabold font-heading text-teal-950 dark:text-white">
                        {{ $product->name }}
                    </h1>

                    @if($product->grade_variety)
                        <div class="mt-2 text-sm font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 inline-block px-3 py-1 rounded-md border border-amber-200 dark:border-amber-800">
                            Available Grade / Variety: {{ $product->grade_variety }}
                        </div>
                    @endif

                    <div class="mt-4 text-sm text-stone-600 dark:text-stone-300 leading-relaxed space-y-3">
                        <p class="font-medium text-stone-800 dark:text-stone-100">{{ $product->short_description }}</p>
                        <p>{{ $product->description }}</p>
                    </div>
                </div>

                <!-- Technical Specifications Table (Grouped dynamically) -->
                <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl border border-stone-200 dark:border-teal-900/60 p-6 shadow-sm">
                    <div class="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-teal-900/40 mb-6">
                        <div>
                            <h2 class="text-lg font-bold font-heading text-teal-950 dark:text-white">Technical Specifications Sheet</h2>
                            <p class="text-xs text-stone-500 dark:text-stone-400">Laboratory validated parameters compliant with international trade standards</p>
                        </div>
                        <span class="text-xs font-semibold px-2.5 py-1 bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 rounded border border-teal-200 dark:border-teal-800">
                            Pre-Shipment Tested
                        </span>
                    </div>

                    @if($product->specifications->isEmpty())
                        <p class="text-xs text-stone-500 py-4">Standard export specifications apply. Inquire with our trade desk for exact custom parameters.</p>
                    @else
                        @foreach($product->grouped_specifications as $groupName => $specs)
                            <div class="mb-6 last:mb-0">
                                <h3 class="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider bg-stone-50 dark:bg-[#061514] px-3 py-1.5 rounded-lg mb-2">
                                    {{ $groupName }}
                                </h3>
                                <div class="overflow-x-auto table-responsive-container -mx-2 sm:mx-0">
                                    <table class="w-full min-w-[340px] text-left text-xs">
                                        <thead>
                                            <tr class="border-b border-stone-200 dark:border-teal-900/40 text-stone-400 dark:text-stone-400">
                                                <th class="py-2 px-3 font-semibold w-1/3">Parameter</th>
                                                <th class="py-2 px-3 font-semibold">Standard Value / Limit</th>
                                                <th class="py-2 px-3 font-semibold text-right">Testing Method</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-stone-100 dark:divide-teal-900/40 text-stone-700 dark:text-stone-300">
                                            @foreach($specs as $spec)
                                                <tr class="hover:bg-stone-50/70 dark:hover:bg-[#061514] transition">
                                                    <td class="py-2.5 px-3 font-medium text-stone-900 dark:text-white">{{ $spec['parameter'] }}</td>
                                                    <td class="py-2.5 px-3 font-semibold text-teal-800 dark:text-teal-300">{{ $spec['value'] }}</td>
                                                    <td class="py-2.5 px-3 text-stone-500 dark:text-stone-400 text-right">{{ $spec['test_method'] ?? 'Standard' }}</td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        @endforeach
                    @endif
                </div>

                <!-- Packaging & Loading Specifications -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl border border-stone-200 dark:border-teal-900/60 p-6 shadow-sm">
                        <h3 class="text-sm font-bold font-heading text-teal-950 dark:text-white uppercase tracking-wider mb-3">Packaging Options</h3>
                        <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
                            {{ $product->packaging_summary ?? 'Supplied in 25kg / 50kg PP Woven Bags, New Jute Bags, or 25kg Vacuum Bags with inner food-grade liner. Custom Private Label printing available.' }}
                        </p>
                        <div class="space-y-1.5 text-xs text-stone-500 dark:text-stone-400">
                            <div>• <strong class="text-stone-800 dark:text-stone-200">Primary Options:</strong> 25kg / 50kg Bags, 1 MT Jumbo Bags</div>
                            <div>• <strong class="text-stone-800 dark:text-stone-200">Private Label:</strong> Custom OEM client artwork printing</div>
                            <div>• <strong class="text-stone-800 dark:text-stone-200">Vacuum Seal:</strong> Oxygen-barrier packing for extended freshness</div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl border border-stone-200 dark:border-teal-900/60 p-6 shadow-sm">
                        <h3 class="text-sm font-bold font-heading text-teal-950 dark:text-white uppercase tracking-wider mb-3">Container Loading & Port</h3>
                        <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
                            {{ $product->loading_summary ?? 'Standard loading: 19 Metric Tons in 20ft FCL container, 26 Metric Tons in 40ft FCL. Lined with Kraft paper and moisture absorbent desiccants.' }}
                        </p>
                        <div class="space-y-1.5 text-xs text-stone-500 dark:text-stone-400">
                            <div>• <strong class="text-stone-800 dark:text-stone-200">Loading Ports:</strong> Mundra Port (INMUN), Kandla (INIXY), Pipavav (INPAV), Hazira (INHAZ)</div>
                            <div>• <strong class="text-stone-800 dark:text-stone-200">Consolidation:</strong> Available for Mixed Container Loads (Multi-Commodity 20ft/40ft FCL)</div>
                            <div>• <strong class="text-stone-800 dark:text-stone-200">Fumigation & Protection:</strong> Phosphine / Methyl Bromide treated with container desiccants</div>
                        </div>
                    </div>
                </div>

                <!-- Traceability Integration Callout -->
                <div class="bg-gradient-to-r from-[#033e3a] via-[#052b27] to-[#021816] text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-teal-800/40">
                    <div>
                        <span class="text-xs text-[#00d9cc] font-bold uppercase tracking-wider">Lot Transparency</span>
                        <h4 class="text-base font-bold font-heading mt-0.5">Have an existing shipment batch code?</h4>
                        <p class="text-xs text-teal-100/70 mt-1">Verify processing origin, harvest date, and COA test report via our public registry.</p>
                    </div>
                    <a href="{{ route('traceability.index') }}" class="px-5 py-2.5 bg-[#00a79d] hover:bg-[#008f86] text-white text-xs font-bold rounded-xl transition shrink-0 shadow">
                        Check Batch Lot →
                    </a>
                </div>
            </div>
        </div>

        <!-- Related Products Section -->
        @if($relatedProducts->isNotEmpty())
            <div class="mt-20 pt-12 border-t border-stone-200 dark:border-teal-900/40">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Similar Commodities</span>
                        <h2 class="text-2xl font-extrabold font-heading text-teal-950 dark:text-white">Related Export Varieties</h2>
                    </div>
                    <a href="{{ route('products.category', $product->category->slug) }}" class="text-xs font-bold text-teal-800 dark:text-teal-300 hover:text-teal-600 dark:hover:text-white">
                        View All {{ $product->category->name }} →
                    </a>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    @foreach($relatedProducts as $rel)
                        <x-product-card :product="$rel" />
                    @endforeach
                </div>
            </div>
        @endif
    </div>
</div>
@endsection

@push('schema')
<script type="application/ld+json">
{!! json_encode([
    "\x40context" => 'https://schema.org',
    '@type' => 'Product',
    'name' => $product->name,
    'description' => $product->meta_description ?? $product->short_description,
    'image' => $product->main_image ? [url($product->main_image)] : [url('/images/logo.png')],
    'sku' => $product->sku ?? ('AGRO-' . $product->id),
    'mpn' => $product->hs_code ?? 'AGRO-HS',
    'brand' => [
        '@type' => 'Brand',
        'name' => 'Agro Dairy Export LLP'
    ],
    'category' => $product->category->name,
    'countryOfOrigin' => [
        '@type' => 'Country',
        'name' => 'India'
    ]
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
</script>
@endpush

