@extends('layouts.app', ['title' => 'Export Packaging & Warehouse Solutions - Agro Dairy Export LLP', 'metaDescription' => 'High-barrier export packaging: Jute bags, PP woven sacks, food-grade vacuum pouches, and FIBC jumbo bulk bags with private label OEM branding.'])

@section('content')
<!-- Header -->
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Packaging & Infrastructure']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Transit Protection Engineering</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Export Packaging & Warehouse Capabilities</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Preserving organoleptic freshness, preventing maritime moisture ingress, and offering flexible OEM retail branding solutions for international commercial importers.
            </p>
        </div>
    </div>
</div>

<!-- Packaging Types Grid -->
<section class="py-16 md:py-20 bg-brand-beige-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl font-display font-bold text-brand-forest-900">Standard & Customized Packaging Options</h2>
            <p class="text-neutral-600 mt-3 text-base">Select from traditional breathable natural fibers to multi-layer high barrier vacuum packaging tailored to your regional customs requirements.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            @forelse($packagingTypes as $pkg)
                <div class="bg-white rounded-2xl border border-brand-beige-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-brand-forest-400 hover:shadow-md transition-all">
                    <div class="p-6">
                        <div class="w-12 h-12 rounded-xl bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center font-bold text-lg mb-4">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                        </div>
                        <h3 class="text-lg font-bold text-brand-forest-900 mb-2">{{ $pkg->name }}</h3>
                        @if($pkg->description)
                            <p class="text-xs text-neutral-600 leading-relaxed mb-4">{{ $pkg->description }}</p>
                        @endif

                        <div class="space-y-2 text-xs border-t border-brand-beige-100 pt-4">
                            @if($pkg->available_weights)
                                <div>
                                    <span class="text-neutral-400 block">Available Weights:</span>
                                    <span class="font-bold text-brand-forest-900">{{ $pkg->available_weights }}</span>
                                </div>
                            @endif
                            @if($pkg->material)
                                <div>
                                    <span class="text-neutral-400 block">Material Composition:</span>
                                    <span class="font-medium text-neutral-800">{{ $pkg->material }}</span>
                                </div>
                            @endif
                        </div>
                    </div>

                    <div class="bg-brand-beige-100/60 p-4 border-t border-brand-beige-200 flex items-center justify-between">
                        <span class="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Export Grade</span>
                        <a href="{{ route('rfq.create') }}?packaging={{ urlencode($pkg->name) }}" class="text-xs font-bold text-brand-forest-800 hover:text-brand-gold-600">Request Specs &rarr;</a>
                    </div>
                </div>
            @empty
                <!-- Fallback defaults if table empty -->
                <div class="bg-white p-6 rounded-2xl border border-brand-beige-200 shadow-sm">
                    <h3 class="text-lg font-bold text-brand-forest-900 mb-2">Natural Jute / Burlap Bags</h3>
                    <p class="text-xs text-neutral-600 mb-3">Traditional breathable natural hydro-carbon free (VOT) jute bags ideal for raw in-shell and kernel peanuts in transit.</p>
                    <span class="text-xs font-bold text-brand-forest-800">Weights: 25 Kg, 50 Kg</span>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-brand-beige-200 shadow-sm">
                    <h3 class="text-lg font-bold text-brand-forest-900 mb-2">PP Woven Sacks with Liner</h3>
                    <p class="text-xs text-neutral-600 mb-3">Durable poly woven bags equipped with internal food-safe polyethylene (PE) liner for moisture prevention.</p>
                    <span class="text-xs font-bold text-brand-forest-800">Weights: 25 Kg, 50 Kg</span>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-brand-beige-200 shadow-sm">
                    <h3 class="text-lg font-bold text-brand-forest-900 mb-2">Multi-Layer Vacuum Pouches</h3>
                    <p class="text-xs text-neutral-600 mb-3">Nitrogen flushed airtight EVOH barrier vacuum bricks maintaining fresh aroma and blocking oxidation.</p>
                    <span class="text-xs font-bold text-brand-forest-800">Weights: 10 Kg, 25 Kg</span>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-brand-beige-200 shadow-sm">
                    <h3 class="text-lg font-bold text-brand-forest-900 mb-2">FIBC Jumbo Bulk Bags</h3>
                    <p class="text-xs text-neutral-600 mb-3">Heavy-duty 1-Ton big bags with top duffle and bottom discharge spout optimized for mechanized unloading.</p>
                    <span class="text-xs font-bold text-brand-forest-800">Weights: 500 Kg, 1000 Kg</span>
                </div>
            @endforelse
        </div>
    </div>
</section>

<!-- Private Label & OEM Packaging -->
<section class="py-16 md:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <span class="text-brand-forest-800 text-xs font-bold uppercase tracking-widest">Private Label OEM Services</span>
                <h2 class="text-3xl md:text-4xl font-display font-bold text-brand-forest-900 mt-2">Custom Brand Printing & Retail Pouches</h2>
                <p class="mt-4 text-neutral-600 leading-relaxed text-sm md:text-base">
                    Looking to distribute under your proprietary supermarket or wholesale brand? Agro Dairy Export LLP delivers complete end-to-end OEM packaging solutions with custom multi-color gravure printing, multilingual labeling, and barcode integration.
                </p>

                <div class="mt-8 space-y-4">
                    <div class="flex items-start gap-4">
                        <div class="w-6 h-6 rounded-full bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                        <div>
                            <h4 class="text-sm font-bold text-brand-forest-900">High-Resolution Flexo & Rotogravure Printing</h4>
                            <p class="text-xs text-neutral-600">Direct branded artwork reproduction on both sides of bags with buyer logo, legal entity, and contact specifics.</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4">
                        <div class="w-6 h-6 rounded-full bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                        <div>
                            <h4 class="text-sm font-bold text-brand-forest-900">Destination Language Compliance</h4>
                            <p class="text-xs text-neutral-600">Arabic, Russian, Spanish, French, and English nutritional panels compliant with target customs authorities.</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4">
                        <div class="w-6 h-6 rounded-full bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                        <div>
                            <h4 class="text-sm font-bold text-brand-forest-900">Batch Code & Expiry Inkjet Coding</h4>
                            <p class="text-xs text-neutral-600">High-speed automated continuous inkjet batch coding stamped directly on each export bag.</p>
                        </div>
                    </div>
                </div>

                <div class="mt-8">
                    <a href="{{ route('rfq.create') }}" class="inline-flex items-center px-6 py-3.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-sm rounded-xl transition shadow">
                        Discuss OEM Private Label Project
                    </a>
                </div>
            </div>

            <div class="bg-brand-beige-50 p-8 rounded-3xl border border-brand-beige-200">
                <h3 class="text-xl font-bold font-display text-brand-forest-900 mb-6">Maritime Transit Protection Measures</h3>
                <div class="space-y-4">
                    <div class="bg-white p-4 rounded-xl border border-brand-beige-200">
                        <h4 class="text-sm font-bold text-brand-forest-900">Silica Gel Desiccant Poles</h4>
                        <p class="text-xs text-neutral-600 mt-1">Every container is fitted with 4 to 8 industrial calcium chloride / silica dry poles absorbing up to 200% moisture to eliminate container rain.</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-brand-beige-200">
                        <h4 class="text-sm font-bold text-brand-forest-900">Kraft Paper & Corrugated Lining</h4>
                        <p class="text-xs text-neutral-600 mt-1">Full container wall and floor lining with multi-ply virgin Kraft paper preventing rust friction and condensation transfer.</p>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-brand-beige-200">
                        <h4 class="text-sm font-bold text-brand-forest-900">Phosphine Fumigation Gas</h4>
                        <p class="text-xs text-neutral-600 mt-1">Standard aluminum phosphide fumigation by government-licensed agencies with certified quarantine clearance sheets.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
