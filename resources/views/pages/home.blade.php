@extends('layouts.app')

@section('title', 'Agro Dairy Export LLP | Premier Agricultural Commodities Exporter from India')
@section('meta_description', 'Government of India recognized exporter of premium Indian Peanuts, Sesame Seeds, Whole Spices, Pulses, Kabuli Chickpeas, and Dehydrated Vegetables. Sourced from Gujarat with Buhler Sortex cleaning and full batch traceability.')

@section('content')
<!-- Hero Section -->
<section class="relative min-h-[90vh] flex items-center justify-center bg-stone-950 overflow-hidden">
    <!-- Background Image with Gradient Overlay -->
    <div class="absolute inset-0 z-0">
        <img src="/images/hero-bg.jpg" alt="Agricultural Export from India to Global Ports" class="w-full h-full object-cover opacity-35 scale-105 animate-pulse duration-1000">
        <div class="absolute inset-0 bg-gradient-to-r from-stone-950 via-emerald-950/90 to-stone-950/80"></div>
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/10 via-transparent to-transparent"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div class="max-w-3xl">
            <!-- Badge -->
            <div class="inline-flex items-center space-x-2 bg-emerald-900/60 border border-emerald-500/40 rounded-full px-4 py-1.5 text-xs text-emerald-200 mb-6 backdrop-blur-md">
                <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span class="font-semibold text-amber-400">APEDA & FSSAI Certified Government Recognized Export House</span>
            </div>

            <!-- Headline -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight leading-[1.15]">
                Exporting India's <span class="gold-gradient-text">Finest Agricultural Commodities</span> to Global Markets
            </h1>

            <p class="mt-6 text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl font-normal">
                Direct farm-gate sourcing from the fertile belts of Saurashtra, Gujarat. State-of-the-art optical color sorting, HPLC aflatoxin-tested lots, and certified container shipments dispatched via Mundra & Kandla ports to 40+ countries.
            </p>

            <!-- CTA Buttons -->
            <div class="mt-10 flex flex-wrap items-center gap-4">
                <button type="button" 
                    @click="$dispatch('open-rfq-modal', {})"
                    class="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-7 py-4 rounded-xl shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-sm flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    <span>Request Quotation (RFQ)</span>
                </button>

                <a href="{{ route('products.index') }}" class="bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-4 rounded-xl border border-white/20 backdrop-blur-md transition-all duration-300 text-sm flex items-center space-x-2">
                    <span>Explore Product Catalogue</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </a>

                <a href="{{ route('traceability.index') }}" class="bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 font-semibold px-5 py-4 rounded-xl border border-emerald-700/50 backdrop-blur-md transition text-sm flex items-center space-x-2">
                    <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <span>Trace Batch Lot</span>
                </a>
            </div>

            <!-- Trust Bar Metrics -->
            <div class="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-white">
                <div>
                    <span class="block text-2xl lg:text-3xl font-extrabold text-amber-400 font-heading">45,000+</span>
                    <span class="text-xs text-stone-400 font-medium">Metric Tons Exported / Year</span>
                </div>
                <div>
                    <span class="block text-2xl lg:text-3xl font-extrabold text-amber-400 font-heading">42+</span>
                    <span class="text-xs text-stone-400 font-medium">Global Destination Countries</span>
                </div>
                <div>
                    <span class="block text-2xl lg:text-3xl font-extrabold text-amber-400 font-heading">12,500+</span>
                    <span class="text-xs text-stone-400 font-medium">Contracted Farmer Network</span>
                </div>
                <div>
                    <span class="block text-2xl lg:text-3xl font-extrabold text-amber-400 font-heading">100%</span>
                    <span class="text-xs text-stone-400 font-medium">Batch Traceability & QA Tested</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Company Value Proposition & Trust Pillars -->
<section class="py-20 bg-stone-50 border-b border-stone-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-5">
                <span class="text-xs font-bold uppercase tracking-widest text-emerald-800">Who We Are</span>
                <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 mt-2 leading-tight">
                    Reliable Agricultural Supply Chain Connecting Gujarat to the World
                </h2>
                <p class="mt-4 text-sm text-stone-600 leading-relaxed">
                    Headquartered near the agricultural marketing hub of Rajkot, <strong>Agro Dairy Export LLP</strong> is an integrated commodity processor and exporter. We bridge the gap between Indian farmers and global institutional buyers, delivering certified clean, aflatoxin-controlled peanuts, high-purity sesame seeds, authentic whole spices, pulses, and value-added agro commodities.
                </p>
                <div class="mt-6 space-y-3">
                    <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                        <p class="text-xs text-stone-700 leading-normal"><strong>Dual Buhler Sortex Optical Sorters:</strong> Elimination of discolored grains, foreign matter, and shriveled seeds.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                        <p class="text-xs text-stone-700 leading-normal"><strong>EU / US MRL Compliance:</strong> Stringent mycotoxin and pesticide residue screening with accredited test certificates.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                        <p class="text-xs text-stone-700 leading-normal"><strong>Logistical Advantage:</strong> Factory located within 250 km of Mundra Port and Kandla Port for fast container turnaround.</p>
                    </div>
                </div>

                <div class="mt-8">
                    <a href="{{ route('company.about') }}" class="inline-flex items-center text-sm font-bold text-emerald-900 hover:text-emerald-700 transition">
                        <span>Read Our Full Corporate Profile & Mission</span>
                        <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </a>
                </div>
            </div>

            <div class="lg:col-span-7">
                <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
                    <img src="/images/about-commodities.jpg" alt="Agricultural Commodities Exhibition" class="w-full h-[450px] object-cover">
                    <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent p-6 text-white">
                        <div class="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <span class="text-xs text-amber-400 uppercase font-semibold">Quality Assured Origin</span>
                                <h4 class="text-lg font-bold font-heading">Saurashtra Agricultural Belt, Gujarat</h4>
                            </div>
                            <span class="px-3 py-1 bg-emerald-800/90 text-xs font-semibold rounded-full border border-emerald-500/50">
                                100% Export Grade
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Product Categories Grid -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-800">Our Commodities</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 mt-2">
                Export Product Categories
            </h2>
            <p class="text-xs sm:text-sm text-stone-500 mt-3 leading-relaxed">
                Precision-graded agricultural commodities packaged in food-grade PP, Jute, Paper, and Vacuum containers tailored for global distributors and food processors.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @foreach($featuredCategories as $cat)
                <div class="group relative rounded-2xl border border-stone-200 bg-stone-50 hover:bg-white p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="w-12 h-12 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center font-bold text-lg font-heading shadow-md">
                                {{ substr($cat->name, 0, 1) }}
                            </span>
                            <span class="text-[11px] font-semibold text-stone-500 bg-white px-2.5 py-1 rounded-full border border-stone-200">
                                HS Code: {{ $cat->hs_code_prefix }}*
                            </span>
                        </div>

                        <h3 class="text-xl font-bold font-heading text-emerald-950 group-hover:text-emerald-700 transition">
                            <a href="{{ route('products.category', $cat->slug) }}">
                                {{ $cat->name }}
                            </a>
                        </h3>

                        <p class="text-xs text-stone-600 mt-2.5 leading-relaxed">
                            {{ $cat->short_description }}
                        </p>

                        <!-- Sub-varieties preview -->
                        @if($cat->products->isNotEmpty())
                            <div class="mt-4 pt-4 border-t border-stone-200/60">
                                <span class="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">Popular Varieties:</span>
                                <div class="flex flex-wrap gap-1.5">
                                    @foreach($cat->products->take(3) as $prod)
                                        <span class="text-[11px] bg-white text-emerald-900 px-2 py-0.5 rounded border border-stone-200 font-medium">
                                            {{ $prod->name }}
                                        </span>
                                    @endforeach
                                </div>
                            </div>
                        @endif
                    </div>

                    <div class="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-between">
                        <a href="{{ route('products.category', $cat->slug) }}" class="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center transition">
                            <span>Explore Category</span>
                            <span class="ml-1 text-base group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                        <button type="button" 
                            @click="$dispatch('open-rfq-modal', { productName: '{{ addslashes($cat->name) }}' })"
                            class="text-xs font-semibold text-amber-700 hover:text-amber-800">
                            Get Quote
                        </button>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="text-center mt-12">
            <a href="{{ route('products.index') }}" class="inline-flex items-center px-6 py-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-xs shadow-md transition space-x-2">
                <span>View Complete Product Catalogue (All Commodities)</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
        </div>
    </div>
</section>

<!-- Featured Products Showcase -->
<section class="py-20 bg-stone-100/70 border-y border-stone-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
                <span class="text-xs font-bold uppercase tracking-widest text-emerald-800">Ready for Shipment</span>
                <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 mt-2">
                    Featured Export Commodities
                </h2>
                <p class="text-xs sm:text-sm text-stone-500 mt-2 max-w-xl">
                    Laboratory verified export lots ready for immediate FCL container loading at Mundra and Kandla ports.
                </p>
            </div>
            <a href="{{ route('products.index') }}" class="mt-4 md:mt-0 text-xs font-bold text-emerald-900 hover:text-emerald-700 flex items-center">
                <span>Browse All Products</span>
                <span class="ml-1 text-base">→</span>
            </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @foreach($featuredProducts as $product)
                <x-product-card :product="$product" />
            @endforeach
        </div>
    </div>
</section>

<!-- Farm to Port 6-Stage Process Timeline -->
<section class="py-24 bg-gradient-to-b from-stone-900 to-stone-950 text-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Quality Assurance Workflow</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-2">
                Our Farm-to-Port Export Process
            </h2>
            <p class="text-xs sm:text-sm text-stone-400 mt-3 leading-relaxed">
                From contract farming in Saurashtra to container sealing at Mundra Port, every stage is audited for food safety, moisture control, and cargo integrity.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Stage 1 -->
            <div class="bg-stone-800/60 rounded-2xl p-6 border border-stone-700/70 hover:border-amber-400/50 transition">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">Stage 01</span>
                <h3 class="text-lg font-bold font-heading text-white mt-2">Direct Farm Procurement</h3>
                <p class="text-xs text-stone-400 mt-2 leading-relaxed">
                    Sourced directly from our network of 12,500+ contracted farmers across Saurashtra. Regulated moisture harvesting prevents field aflatoxin development.
                </p>
            </div>

            <!-- Stage 2 -->
            <div class="bg-stone-800/60 rounded-2xl p-6 border border-stone-700/70 hover:border-amber-400/50 transition">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">Stage 02</span>
                <h3 class="text-lg font-bold font-heading text-white mt-2">Cleaning & Destoning</h3>
                <p class="text-xs text-stone-400 mt-2 leading-relaxed">
                    Vibrating pre-cleaners, heavy-gravity destoners, and multi-stage aspirators remove soil, dust, stones, sticks, and lightweight immature pods.
                </p>
            </div>

            <!-- Stage 3 -->
            <div class="bg-stone-800/60 rounded-2xl p-6 border border-stone-700/70 hover:border-amber-400/50 transition">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">Stage 03</span>
                <h3 class="text-lg font-bold font-heading text-white mt-2">Buhler Optical Color Sorting</h3>
                <p class="text-xs text-stone-400 mt-2 leading-relaxed">
                    Dual optical laser sorting cameras inspect every individual kernel. Off-color seeds, discolored kernels, and defects are ejected automatically.
                </p>
            </div>

            <!-- Stage 4 -->
            <div class="bg-stone-800/60 rounded-2xl p-6 border border-stone-700/70 hover:border-amber-400/50 transition">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">Stage 04</span>
                <h3 class="text-lg font-bold font-heading text-white mt-2">HPLC Lab Testing & COA</h3>
                <p class="text-xs text-stone-400 mt-2 leading-relaxed">
                    In-house and third-party laboratory analysis (SGS / Eurofins) validates moisture, purity, FFA, and certifies aflatoxin below 4.0 ppb for EU clearance.
                </p>
            </div>

            <!-- Stage 5 -->
            <div class="bg-stone-800/60 rounded-2xl p-6 border border-stone-700/70 hover:border-amber-400/50 transition">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">Stage 05</span>
                <h3 class="text-lg font-bold font-heading text-white mt-2">Food-Grade Packaging</h3>
                <p class="text-xs text-stone-400 mt-2 leading-relaxed">
                    Automated bagging into new Jute, PP woven with inner liners, multi-wall Kraft paper, or oxygen-barrier vacuum packs with unique lot barcode labels.
                </p>
            </div>

            <!-- Stage 6 -->
            <div class="bg-stone-800/60 rounded-2xl p-6 border border-stone-700/70 hover:border-amber-400/50 transition">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">Stage 06</span>
                <h3 class="text-lg font-bold font-heading text-white mt-2">Mundra Port Containerization</h3>
                <p class="text-xs text-stone-400 mt-2 leading-relaxed">
                    Containers lined with Kraft paper and moisture desiccants. Pre-shipment fumigation and phytosanitary clearance before ocean vessel dispatch.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Processing Facility & Infrastructure Showcase -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-6">
                <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
                    <img src="/images/facility-bg.jpg" alt="Sortex Processing Facility Interior" class="w-full h-[450px] object-cover">
                    <div class="absolute top-4 left-4">
                        <span class="bg-emerald-900/90 text-amber-400 font-bold text-xs px-3 py-1.5 rounded-full border border-emerald-500/30 backdrop-blur-md">
                            Gondal Processing Division, Rajkot
                        </span>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-6 space-y-6">
                <div>
                    <span class="text-xs font-bold uppercase tracking-widest text-emerald-800">Manufacturing Infrastructure</span>
                    <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 mt-2 leading-tight">
                        State-of-the-Art Processing Plants & Warehousing
                    </h2>
                    <p class="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                        Operating from an expansive processing complex in Gondal, Gujarat, our facility is engineered specifically for export grade oilseed, peanut, and spice cleaning.
                    </p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
                        <span class="text-xl font-extrabold text-emerald-900 font-heading">80 MT / Day</span>
                        <p class="text-xs text-stone-600 mt-0.5">Optical Sortex Cleaning Capacity</p>
                    </div>
                    <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
                        <span class="text-xl font-extrabold text-emerald-900 font-heading">25,000 MT</span>
                        <p class="text-xs text-stone-600 mt-0.5">Humidity-Controlled Storage</p>
                    </div>
                    <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
                        <span class="text-xl font-extrabold text-emerald-900 font-heading">HPLC-FLD</span>
                        <p class="text-xs text-stone-600 mt-0.5">In-House Analytical Chromatography</p>
                    </div>
                    <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
                        <span class="text-xl font-extrabold text-emerald-900 font-heading">ISO 22000</span>
                        <p class="text-xs text-stone-600 mt-0.5">FSMS & HACCP Food Safety Certified</p>
                    </div>
                </div>

                <div>
                    <a href="{{ route('company.infrastructure') }}" class="inline-flex items-center text-xs font-bold text-emerald-800 hover:text-emerald-950 transition">
                        <span>Explore Our Processing Machinery & Lab Facilities</span>
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Export Destinations & Markets -->
<section class="py-20 bg-stone-50 border-t border-stone-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-800">Global Reach</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 mt-2">
                Export Destinations Across 40+ Countries
            </h2>
            <p class="text-xs sm:text-sm text-stone-500 mt-2">
                Providing reliable Incoterm delivery to major container discharge hubs worldwide.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @foreach($exportMarkets as $market)
                <div class="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="text-lg font-bold font-heading text-emerald-950">{{ $market->name }}</h3>
                            <span class="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                {{ $market->countries->count() }} Key Destinations
                            </span>
                        </div>
                        <p class="text-xs text-stone-600 leading-relaxed mb-4">
                            {{ $market->description }}
                        </p>
                        <div class="space-y-2">
                            @foreach($market->countries as $cntry)
                                <a href="{{ route('markets.country', $cntry->slug) }}" class="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 transition border border-stone-100 group">
                                    <span class="text-xs font-semibold text-stone-800 group-hover:text-emerald-800 flex items-center">
                                        <span class="mr-2 text-base">{{ $cntry->flag_emoji }}</span>
                                        {{ $cntry->name }}
                                    </span>
                                    <span class="text-[11px] text-stone-400 group-hover:text-emerald-700">View Ports →</span>
                                </a>
                            @endforeach
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>

<!-- Certifications Bar -->
<section class="py-16 bg-white border-t border-stone-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-800">Accreditations & Compliance</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-950 mt-1">
                International Export Certifications
            </h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
            @foreach($certifications as $cert)
                <div class="bg-stone-50 hover:bg-emerald-50/50 p-4 rounded-xl border border-stone-200 text-center transition group">
                    <span class="block text-xs font-bold text-emerald-950 group-hover:text-emerald-800 leading-tight">
                        {{ $cert->title }}
                    </span>
                    <span class="block text-[10px] text-stone-500 mt-1 truncate">
                        {{ $cert->certificate_no ?? 'Authorized' }}
                    </span>
                </div>
            @endforeach
        </div>

        <div class="text-center mt-8">
            <a href="{{ route('certifications.index') }}" class="text-xs font-semibold text-emerald-800 hover:text-emerald-950">
                View Full Verification Registry & Issuing Authorities →
            </a>
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section class="py-20 bg-stone-100/70 border-t border-stone-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-800">Buyer Experiences</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 mt-2">
                What International Importers Say
            </h2>
            <p class="text-xs sm:text-sm text-stone-500 mt-2">
                Trusted by food distributors, spice grinders, and bakery manufacturers across Europe, Middle East, and Asia.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @foreach($testimonials as $testi)
                <div class="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div class="flex text-amber-400 mb-3 text-xs">
                            @for($i = 0; $i < $testi->rating; $i++) ★ @endfor
                        </div>
                        <p class="text-xs text-stone-600 leading-relaxed italic">
                            "{{ $testi->content }}"
                        </p>
                    </div>
                    <div class="mt-6 pt-4 border-t border-stone-100">
                        <p class="text-xs font-bold text-stone-900">{{ $testi->client_name }}</p>
                        <p class="text-[11px] text-emerald-800 font-medium">{{ $testi->company_name }}</p>
                        <p class="text-[10px] text-stone-400">{{ $testi->country }}</p>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>

<!-- FAQs Section -->
<section class="py-20 bg-white border-t border-stone-200">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-800">Clear Answers</span>
            <h2 class="text-3xl font-extrabold font-heading text-emerald-950 mt-2">
                Frequently Asked Export Questions
            </h2>
        </div>

        <div class="space-y-4" x-data="{ activeAccordion: null }">
            @foreach($faqs as $index => $faq)
                <div class="border border-stone-200 rounded-xl overflow-hidden bg-stone-50/50">
                    <button type="button" 
                        @click="activeAccordion = (activeAccordion === {{ $index }} ? null : {{ $index }})"
                        class="w-full text-left p-5 text-sm font-bold text-emerald-950 flex items-center justify-between hover:bg-stone-100/70 transition">
                        <span>{{ $faq->question }}</span>
                        <svg class="w-4 h-4 text-stone-500 transition transform" :class="{ 'rotate-180 text-emerald-800': activeAccordion === {{ $index }} }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <div x-show="activeAccordion === {{ $index }}" x-cloak class="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-200/60 bg-white">
                        <div class="pt-3">
                            {{ $faq->answer }}
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>

<!-- Final CTA Banner -->
<section class="py-16 bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-950 text-white relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Ready to Source Premium Indian Commodities?
        </h2>
        <p class="mt-3 text-sm text-stone-300 max-w-2xl mx-auto">
            Our trade directors are on standby to provide competitive FOB Mundra or CIF container quotations, product samples, and technical specification sheets.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
            <button type="button" 
                @click="$dispatch('open-rfq-modal', {})"
                class="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition text-sm">
                Request Official Quotation Now
            </button>
            <a href="{{ route('contact') }}" class="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 transition text-sm">
                Contact Export Sales Desk
            </a>
        </div>
    </div>
</section>
@endsection
