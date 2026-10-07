@extends('layouts.app')

@section('title', 'Agro Dairy Export LLP | Premier Agricultural Commodities Exporter from India')
@section('meta_description', 'Government of India recognized exporter of premium Indian Peanuts, Sesame Seeds, Whole Spices, Pulses, Kabuli Chickpeas, and Dehydrated Vegetables. Sourced from Gujarat with Buhler Sortex cleaning and full batch traceability.')

@section('content')
<!-- Hero Section -->
<section class="relative bg-stone-950 dark:bg-[#02100f] overflow-hidden pt-10 pb-28 sm:pt-14 sm:pb-32 lg:pt-16 lg:pb-36">
    <!-- Background Image with Gradient Overlay -->
    <div class="absolute inset-0 z-0">
        <img src="/images/hero-bg.jpg" alt="Agricultural Export from India to Global Ports" class="w-full h-full object-cover opacity-25 select-none pointer-events-none">
        <div class="absolute inset-0 bg-gradient-to-r from-stone-950 via-[#032e2b]/90 to-stone-950/80"></div>
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/15 via-transparent to-transparent"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div class="max-w-3xl">
            <!-- Badge -->
            <div class="inline-flex items-center space-x-2 bg-teal-900/60 border border-teal-500/40 rounded-full px-4 py-1.5 text-xs text-teal-200 mb-6 backdrop-blur-md">
                <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span class="font-semibold text-amber-400">APEDA & FSSAI Certified Government Recognized Export House</span>
            </div>

            <!-- Headline -->
            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight leading-[1.15]">
                Exporting India's <span class="teal-gradient-text">Finest Agricultural Commodities</span> to Global Markets
            </h1>

            <p class="mt-5 text-sm sm:text-base lg:text-lg text-stone-300 leading-relaxed max-w-2xl font-normal">
                Direct farm-gate sourcing from the fertile belts of Saurashtra, Gujarat. State-of-the-art optical color sorting, HPLC aflatoxin-tested lots, and certified container shipments dispatched via Mundra & Kandla ports to 40+ countries.
            </p>

            <!-- CTA Buttons -->
            <!-- CTA Buttons -->
            <div class="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button type="button" 
                    @click="$dispatch('open-rfq-modal', {})"
                    class="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 text-xs sm:text-sm flex items-center justify-center space-x-2 border border-amber-400 w-full sm:w-auto">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 text-stone-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    <span>Request Quotation (RFQ)</span>
                </button>

                <a href="{{ route('products.index') }}" class="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl border border-white/20 backdrop-blur-md transition-all duration-300 active:scale-95 text-xs sm:text-sm flex items-center justify-center space-x-2 w-full sm:w-auto">
                    <span>Explore Product Catalogue</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </a>

                <a href="{{ route('traceability.index') }}" class="bg-[#032e2b]/80 hover:bg-[#033e3a] text-teal-300 font-semibold px-5 py-3.5 sm:py-4 rounded-xl border border-teal-600/50 backdrop-blur-md transition active:scale-95 text-xs sm:text-sm flex items-center justify-center space-x-2 w-full sm:w-auto">
                    <svg class="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <span>Trace Batch Lot</span>
                </a>
            </div>

            <!-- Trust Bar Metrics -->
            <div class="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-stone-800/80 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-white">
                <div class="bg-stone-900/60 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none border border-stone-800/60 sm:border-none">
                    <span class="block text-2xl lg:text-3xl font-extrabold text-amber-400 font-heading">45,000+</span>
                    <span class="text-[11px] sm:text-xs text-stone-300 font-medium">Metric Tons Exported / Year</span>
                </div>
                <div class="bg-stone-900/60 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none border border-stone-800/60 sm:border-none">
                    <span class="block text-2xl lg:text-3xl font-extrabold text-amber-400 font-heading">42+</span>
                    <span class="text-[11px] sm:text-xs text-stone-300 font-medium">Global Destination Countries</span>
                </div>
                <div class="bg-stone-900/60 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none border border-stone-800/60 sm:border-none">
                    <span class="block text-2xl lg:text-3xl font-extrabold text-amber-400 font-heading">12,500+</span>
                    <span class="text-[11px] sm:text-xs text-stone-300 font-medium">Contracted Farmer Network</span>
                </div>
                <div class="bg-stone-900/60 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none border border-stone-800/60 sm:border-none">
                    <span class="block text-2xl lg:text-3xl font-extrabold text-amber-400 font-heading">100%</span>
                    <span class="text-[11px] sm:text-xs text-stone-300 font-medium">Batch Traceability & QA Tested</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Hero Floating Trust Strip (Negative Margin Overlap inspired by Elysium Agrico) -->
<div class="relative z-20 -mt-12 sm:-mt-16 lg:-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
    <div class="bg-white dark:bg-[#091f1c] rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200/90 dark:border-teal-800/60 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-colors duration-200">
        <!-- 1. Full & Mixed Containers -->
        <div class="flex items-start space-x-3.5">
            <div class="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 flex items-center justify-center shrink-0 border border-teal-200/60 dark:border-teal-800/60 font-bold text-xl">
                📦
            </div>
            <div>
                <b class="text-sm font-bold text-teal-950 dark:text-teal-100 font-heading block">Full & Mixed Containers</b>
                <span class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed block mt-0.5">Combine Peanuts, Sesame, Cumin, and Pulses in one 20ft/40ft container with separate marking.</span>
            </div>
        </div>

        <!-- 2. Sortex Precision -->
        <div class="flex items-start space-x-3.5">
            <div class="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 flex items-center justify-center shrink-0 border border-teal-200/60 dark:border-teal-800/60 font-bold text-xl">
                🔬
            </div>
            <div>
                <b class="text-sm font-bold text-teal-950 dark:text-teal-100 font-heading block">Buhler Sortex Precision</b>
                <span class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed block mt-0.5">Up to 99.95% purity grading with triple laser optical cameras and zero foreign admixture.</span>
            </div>
        </div>

        <!-- 3. Port Proximity -->
        <div class="flex items-start space-x-3.5">
            <div class="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 flex items-center justify-center shrink-0 border border-teal-200/60 dark:border-teal-800/60 font-bold text-xl">
                ⚓
            </div>
            <div>
                <b class="text-sm font-bold text-teal-950 dark:text-teal-100 font-heading block">Mundra & Pipavav Ports</b>
                <span class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed block mt-0.5">Direct highway access within 4-6 hours to India's premier deep-water container gateways.</span>
            </div>
        </div>

        <!-- 4. Batch Traceability -->
        <div class="flex items-start space-x-3.5">
            <div class="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 flex items-center justify-center shrink-0 border border-teal-200/60 dark:border-teal-800/60 font-bold text-xl">
                🔍
            </div>
            <div>
                <b class="text-sm font-bold text-teal-950 dark:text-teal-100 font-heading block">Batch Traceability</b>
                <span class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed block mt-0.5">Digital tracking from Saurashtra farm-gate cluster to vessel container seal & Phytosanitary COA.</span>
            </div>
        </div>
    </div>
</div>

<!-- Quick Batch Traceability Search Widget on Homepage -->
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
    <div class="bg-gradient-to-r from-teal-900 via-[#022825] to-[#011413] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-teal-700/50 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div class="max-w-xl">
            <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Live Consignment Verification</span>
            <h3 class="text-xl sm:text-2xl font-bold font-heading text-white mt-1">Verify Harvest Origin & Lab Assay by Lot Number</h3>
            <p class="text-xs text-teal-200 mt-2 leading-relaxed">
                Enter your issued Agro Dairy export batch code to inspect cleaning date, moisture, aflatoxin ppm, container bolt seal, and phytosanitary certificate.
            </p>
        </div>
        <div class="w-full lg:w-auto shrink-0">
            <form action="{{ route('quality.traceability.lookup') }}" method="POST" class="flex flex-col sm:flex-row gap-2.5">
                @csrf
                <div class="relative">
                    <input type="text" name="batch_code" id="home_batch_code" value="AGRO-PN-2026-0814" required
                           placeholder="e.g. AGRO-PN-2026-0814"
                           class="w-full sm:w-72 px-4 py-3 bg-white dark:bg-[#061716] text-stone-900 dark:text-stone-100 font-mono text-xs uppercase font-bold rounded-xl border border-stone-300 dark:border-teal-800 focus:outline-none focus:ring-2 focus:ring-amber-400">
                </div>
                <button type="submit" class="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs rounded-xl transition shadow flex items-center justify-center space-x-1.5 border border-amber-400">
                    <span>Authenticate Lot</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
            </form>
            <div class="mt-2 text-[11px] text-teal-300 flex items-center space-x-2">
                <span>Demo verified codes:</span>
                <button type="button" onclick="document.getElementById('home_batch_code').value='AGRO-PN-2026-0814'" class="underline text-amber-300 font-mono">AGRO-PN-2026-0814</button>
                <span>•</span>
                <button type="button" onclick="document.getElementById('home_batch_code').value='AGRO-SS-2026-0922'" class="underline text-amber-300 font-mono">AGRO-SS-2026-0922</button>
            </div>
        </div>
    </div>
</section>

<!-- Company Value Proposition & Trust Pillars -->
<section class="py-20 bg-stone-50 dark:bg-[#061514] border-b border-stone-200 dark:border-teal-950 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-5">
                <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Who We Are</span>
                <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-teal-950 dark:text-white mt-2 leading-tight">
                    Reliable Agricultural Supply Chain Connecting Gujarat to the World
                </h2>
                <p class="mt-4 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    Headquartered in <strong>Surat</strong> with comprehensive optical cleaning and grading complexes in <strong>Gondal (Dist. Rajkot)</strong>, <strong>Agro Dairy Export LLP</strong> is an integrated commodity processor and exporter under the stewardship of <strong>J.P. Vora</strong>. We bridge the gap between Indian farmers and global institutional buyers, delivering certified clean, aflatoxin-controlled peanuts, high-purity sesame seeds, authentic whole spices, pulses, and value-added agro commodities.
                </p>
                <div class="mt-6 space-y-3">
                    <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                        <p class="text-xs text-stone-700 dark:text-stone-300 leading-normal"><strong>Dual Buhler Sortex Optical Sorters:</strong> Elimination of discolored grains, foreign matter, and shriveled seeds (up to 99.95% purity).</p>
                    </div>
                    <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                        <p class="text-xs text-stone-700 dark:text-stone-300 leading-normal"><strong>EU / US MRL Compliance:</strong> Stringent mycotoxin, aflatoxin (&lt;4.0 ppb), and pesticide residue screening with accredited test certificates.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                        <p class="text-xs text-stone-700 dark:text-stone-300 leading-normal"><strong>Logistical Advantage:</strong> Prompt maritime turnaround through Mundra (INMUN), Kandla (INIXY), Pipavav (INPAV), and Hazira (INHAZ) ports.</p>
                    </div>
                </div>

                <div class="mt-8">
                    <a href="{{ route('company.about') }}" class="inline-flex items-center text-sm font-bold text-teal-800 dark:text-teal-300 hover:text-teal-600 dark:hover:text-teal-200 transition">
                        <span>Read Our Full Corporate Profile & Mission</span>
                        <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </a>
                </div>
            </div>

            <div class="lg:col-span-7">
                <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-teal-900/50">
                    <img src="/images/about-commodities.jpg" alt="Agricultural Commodities Exhibition" class="w-full h-[450px] object-cover">
                    <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent p-6 text-white">
                        <div class="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <span class="text-xs text-amber-400 uppercase font-semibold">Quality Assured Origin</span>
                                <h4 class="text-lg font-bold font-heading">Saurashtra Agricultural Belt, Gujarat</h4>
                            </div>
                            <span class="px-3 py-1 bg-teal-800/90 text-xs font-semibold rounded-full border border-teal-500/50">
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
<section class="py-20 bg-white dark:bg-[#061514] transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Our Commodities</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-teal-950 dark:text-white mt-2">
                Export Product Categories
            </h2>
            <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-3 leading-relaxed">
                Precision-graded agricultural commodities packaged in food-grade PP, Jute, Paper, and Vacuum containers tailored for global distributors and food processors.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @foreach($featuredCategories as $cat)
                <div class="group relative rounded-2xl border border-stone-200 dark:border-teal-900/40 bg-stone-50 dark:bg-[#0a1e1c] hover:bg-white dark:hover:bg-[#0d2724] p-7 shadow-sm hover:shadow-xl hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00a79d] to-[#033e3a] text-white flex items-center justify-center font-bold text-lg font-heading shadow-md">
                                {{ substr($cat->name, 0, 1) }}
                            </span>
                            <span class="text-[11px] font-semibold text-stone-600 dark:text-teal-300 bg-white dark:bg-[#061514] px-2.5 py-1 rounded-full border border-stone-200 dark:border-teal-900/50">
                                HS Code: {{ $cat->hs_code_prefix }}*
                            </span>
                        </div>

                        <h3 class="text-xl font-bold font-heading text-teal-950 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
                            <a href="{{ route('products.category', $cat->slug) }}">
                                {{ $cat->name }}
                            </a>
                        </h3>

                        <p class="text-xs text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed">
                            {{ $cat->short_description }}
                        </p>

                        <!-- Sub-varieties preview -->
                        @if($cat->products->isNotEmpty())
                            <div class="mt-4 pt-4 border-t border-stone-200/60 dark:border-teal-900/40">
                                <span class="text-[11px] font-semibold text-stone-400 dark:text-stone-400 uppercase tracking-wider block mb-2">Popular Varieties:</span>
                                <div class="flex flex-wrap gap-1.5">
                                    @foreach($cat->products->take(3) as $prod)
                                        <span class="text-[11px] bg-white dark:bg-[#061514] text-teal-900 dark:text-teal-200 px-2 py-0.5 rounded border border-stone-200 dark:border-teal-900/50 font-medium">
                                            {{ $prod->name }}
                                        </span>
                                    @endforeach
                                </div>
                            </div>
                        @endif
                    </div>

                    <div class="mt-6 pt-4 border-t border-stone-200/80 dark:border-teal-900/40 flex items-center justify-between">
                        <a href="{{ route('products.category', $cat->slug) }}" class="text-xs font-bold text-teal-800 dark:text-teal-300 hover:text-teal-600 dark:hover:text-white flex items-center transition">
                            <span>Explore Category</span>
                            <span class="ml-1 text-base group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                        <button type="button" 
                            @click="$dispatch('open-rfq-modal', { productName: '{{ addslashes($cat->name) }}' })"
                            class="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700">
                            Get Quote
                        </button>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="text-center mt-12">
            <a href="{{ route('products.index') }}" class="inline-flex items-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00a79d] to-[#033e3a] hover:opacity-95 text-white font-semibold text-xs shadow-md transition space-x-2">
                <span>View Complete Product Catalogue (All Commodities)</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
        </div>
    </div>
</section>

<!-- Featured Products Showcase -->
<section class="py-20 bg-[#edf5f4]/60 dark:bg-[#081b19] border-y border-stone-200 dark:border-teal-900/40 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
                <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Ready for Shipment</span>
                <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-teal-950 dark:text-white mt-2">
                    Featured Export Commodities
                </h2>
                <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-xl">
                    Laboratory verified export lots ready for immediate FCL container loading at Mundra and Kandla ports.
                </p>
            </div>
            <a href="{{ route('products.index') }}" class="mt-4 md:mt-0 text-xs font-bold text-teal-800 dark:text-teal-300 hover:text-teal-600 dark:hover:text-white flex items-center">
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
<section class="py-24 bg-gradient-to-b from-[#031d1b] via-[#052b27] to-[#021312] text-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-xs font-bold uppercase tracking-widest text-[#00d9cc]">Quality Assurance Workflow</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-2">
                Our Farm-to-Port Export Process
            </h2>
            <p class="text-xs sm:text-sm text-teal-200/70 mt-3 leading-relaxed">
                From contract farming in Saurashtra to container sealing at Mundra Port, every stage is audited for food safety, moisture control, and cargo integrity.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Stage 1 -->
            <div class="bg-[#08221f]/80 rounded-2xl p-6 border border-teal-800/40 hover:border-[#00a79d] transition shadow-lg">
                <span class="text-xs font-bold text-[#00d9cc] uppercase tracking-widest">Stage 01</span>
                <h3 class="text-lg font-bold font-heading text-white mt-2">Direct Farm Procurement</h3>
                <p class="text-xs text-stone-300 mt-2 leading-relaxed">
                    Sourced directly from our network of 12,500+ contracted farmers across Saurashtra. Regulated moisture harvesting prevents field aflatoxin development.
                </p>
            </div>

            <!-- Stage 2 -->
            <div class="bg-[#08221f]/80 rounded-2xl p-6 border border-teal-800/40 hover:border-[#00a79d] transition shadow-lg">
                <span class="text-xs font-bold text-[#00d9cc] uppercase tracking-widest">Stage 02</span>
                <h3 class="text-lg font-bold font-heading text-white mt-2">Cleaning & Destoning</h3>
                <p class="text-xs text-stone-300 mt-2 leading-relaxed">
                    Vibrating pre-cleaners, heavy-gravity destoners, and multi-stage aspirators remove soil, dust, stones, sticks, and lightweight immature pods.
                </p>
            </div>

            <!-- Stage 3 -->
            <div class="bg-[#08221f]/80 rounded-2xl p-6 border border-teal-800/40 hover:border-[#00a79d] transition shadow-lg">
                <span class="text-xs font-bold text-[#00d9cc] uppercase tracking-widest">Stage 03</span>
                <h3 class="text-lg font-bold font-heading text-white mt-2">Buhler Optical Color Sorting</h3>
                <p class="text-xs text-stone-300 mt-2 leading-relaxed">
                    Dual optical laser sorting cameras inspect every individual kernel. Off-color seeds, discolored kernels, and defects are ejected automatically.
                </p>
            </div>

            <!-- Stage 4 -->
            <div class="bg-[#08221f]/80 rounded-2xl p-6 border border-teal-800/40 hover:border-[#00a79d] transition shadow-lg">
                <span class="text-xs font-bold text-[#00d9cc] uppercase tracking-widest">Stage 04</span>
                <h3 class="text-lg font-bold font-heading text-white mt-2">HPLC Lab Testing & COA</h3>
                <p class="text-xs text-stone-300 mt-2 leading-relaxed">
                    In-house and third-party laboratory analysis (SGS / Eurofins) validates moisture, purity, FFA, and certifies aflatoxin below 4.0 ppb for EU clearance.
                </p>
            </div>

            <!-- Stage 5 -->
            <div class="bg-[#08221f]/80 rounded-2xl p-6 border border-teal-800/40 hover:border-[#00a79d] transition shadow-lg">
                <span class="text-xs font-bold text-[#00d9cc] uppercase tracking-widest">Stage 05</span>
                <h3 class="text-lg font-bold font-heading text-white mt-2">Food-Grade Packaging</h3>
                <p class="text-xs text-stone-300 mt-2 leading-relaxed">
                    Automated bagging into new Jute, PP woven with inner liners, multi-wall Kraft paper, or oxygen-barrier vacuum packs with unique lot barcode labels.
                </p>
            </div>

            <!-- Stage 6 -->
            <div class="bg-[#08221f]/80 rounded-2xl p-6 border border-teal-800/40 hover:border-[#00a79d] transition shadow-lg">
                <span class="text-xs font-bold text-[#00d9cc] uppercase tracking-widest">Stage 06</span>
                <h3 class="text-lg font-bold font-heading text-white mt-2">Mundra & Kandla Gateway Dispatch</h3>
                <p class="text-xs text-stone-300 mt-2 leading-relaxed">
                    Containers lined with Kraft paper and moisture desiccants. Pre-shipment fumigation and phytosanitary clearance before ocean vessel dispatch.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Processing Facility & Infrastructure Showcase -->
<section class="py-20 bg-white dark:bg-[#061514] transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-6">
                <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-teal-900/50">
                    <img src="/images/facility-bg.jpg" alt="Sortex Processing Facility Interior" class="w-full h-[450px] object-cover">
                    <div class="absolute top-4 left-4">
                        <span class="bg-[#033e3a]/90 text-teal-200 font-bold text-xs px-3 py-1.5 rounded-full border border-teal-500/30 backdrop-blur-md">
                            Saurashtra Processing Terminal, Gondal (Dist. Rajkot)
                        </span>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-6 space-y-6">
                <div>
                    <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Manufacturing Infrastructure</span>
                    <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-teal-950 dark:text-white mt-2 leading-tight">
                        State-of-the-Art Processing Plants & Warehousing
                    </h2>
                    <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
                        Operating from an expansive processing complex in Gondal, Gujarat, our facility is engineered specifically for export grade oilseed, peanut, and spice cleaning.
                    </p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-stone-50 dark:bg-[#0a1e1c] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                        <span class="text-xl font-extrabold text-teal-800 dark:text-[#00d9cc] font-heading">80 MT / Day</span>
                        <p class="text-xs text-stone-600 dark:text-stone-300 mt-0.5">Optical Sortex Cleaning Capacity</p>
                    </div>
                    <div class="bg-stone-50 dark:bg-[#0a1e1c] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                        <span class="text-xl font-extrabold text-teal-800 dark:text-[#00d9cc] font-heading">25,000 MT</span>
                        <p class="text-xs text-stone-600 dark:text-stone-300 mt-0.5">Humidity-Controlled Storage</p>
                    </div>
                    <div class="bg-stone-50 dark:bg-[#0a1e1c] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                        <span class="text-xl font-extrabold text-teal-800 dark:text-[#00d9cc] font-heading">HPLC-FLD</span>
                        <p class="text-xs text-stone-600 dark:text-stone-300 mt-0.5">In-House Analytical Chromatography</p>
                    </div>
                    <div class="bg-stone-50 dark:bg-[#0a1e1c] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40">
                        <span class="text-xl font-extrabold text-teal-800 dark:text-[#00d9cc] font-heading">ISO 22000</span>
                        <p class="text-xs text-stone-600 dark:text-stone-300 mt-0.5">FSMS & HACCP Food Safety Certified</p>
                    </div>
                </div>

                <div>
                    <a href="{{ route('company.infrastructure') }}" class="inline-flex items-center text-xs font-bold text-teal-800 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 transition">
                        <span>Explore Our Processing Machinery & Lab Facilities</span>
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Mixed Maritime Container Consolidation Showcase (Elysium Agrico Advantage) -->
<section class="py-20 bg-gradient-to-br from-[#022826] via-[#033e3a] to-[#011c1a] text-white relative overflow-hidden border-y border-teal-800/60 shadow-2xl">
    <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-[#00a79d]/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -left-20 -top-20 w-80 h-80 bg-[#00d9cc]/15 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-7 space-y-6">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00a79d]/25 border border-[#00d9cc]/40 text-[#00d9cc] text-xs font-extrabold uppercase tracking-wider">
                    <span>⚓ Elysium-Standard Multi-Commodity Cargo</span>
                </div>
                
                <h2 class="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
                    Mixed Container Consolidation <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#00d9cc] to-[#5eead4]">
                        Under Single Bill of Lading (B/L)
                    </span>
                </h2>

                <p class="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl">
                    Don’t let full container minimums tie up your working capital. <strong class="text-white">Agro Dairy Export LLP</strong> specializes in loading <strong>multiple agricultural commodities into a single 20ft or 40ft FCL container</strong>. Combine peanuts, sesame seeds, whole spices, and pulses under one unified customs filing.
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div class="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <div class="flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-[#00a79d] text-white font-black text-sm flex items-center justify-center">1</span>
                            <h4 class="font-bold text-white text-sm font-heading">One Unified B/L</h4>
                        </div>
                        <p class="text-xs text-stone-300 mt-2">Single Phytosanitary certificate, Certificate of Origin, and unified customs clearance reduces import demurrage and agency fees.</p>
                    </div>

                    <div class="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <div class="flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-[#00a79d] text-white font-black text-sm flex items-center justify-center">2</span>
                            <h4 class="font-bold text-white text-sm font-heading">Optimized Inventory</h4>
                        </div>
                        <p class="text-xs text-stone-300 mt-2">Order 5 to 10 MT of different products without holding heavy stockpiles, keeping inventory turns fast and cash flows agile.</p>
                    </div>

                    <div class="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <div class="flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-[#00a79d] text-white font-black text-sm flex items-center justify-center">3</span>
                            <h4 class="font-bold text-white text-sm font-heading">Hygienic Physical Barrier</h4>
                        </div>
                        <p class="text-xs text-stone-300 mt-2">Corrugated Kraft separators, cargo netting, and silica desiccants ensure complete aroma and moisture segregation between spices & seeds.</p>
                    </div>

                    <div class="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <div class="flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg bg-[#00a79d] text-white font-black text-sm flex items-center justify-center">4</span>
                            <h4 class="font-bold text-white text-sm font-heading">Multiple Exit Gateways</h4>
                        </div>
                        <p class="text-xs text-stone-300 mt-2">Stuffed at our Gondal facility and cleared through Mundra Port, Kandla Port, Pipavav, or Hazira Port for shortest transit times.</p>
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-4 pt-4">
                    <a href="{{ route('tools.container_calculator') }}" class="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00a79d] to-[#00d9cc] text-slate-950 font-extrabold text-xs shadow-lg hover:shadow-[#00d9cc]/30 hover:scale-[1.02] transition">
                        Calculate Container Load
                    </a>
                    <a href="{{ route('tools.landed_cost') }}" class="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 transition">
                        Landed Cost Estimator
                    </a>
                    <button type="button" 
                        @click="$dispatch('open-rfq-modal', { productName: 'Mixed Container Consolidation (Multi-Commodity)' })"
                        class="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs shadow-md transition">
                        Request Mixed Container RFQ
                    </button>
                </div>
            </div>

            <div class="lg:col-span-5">
                <!-- Example Mixed Stuffing Manifest Card -->
                <div class="rounded-3xl bg-[#031d1b] border border-teal-500/40 p-6 shadow-2xl relative">
                    <div class="flex items-center justify-between border-b border-teal-800/60 pb-4 mb-4">
                        <div>
                            <span class="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Example 20ft FCL Stowage Manifest</span>
                            <h4 class="text-base font-bold text-white font-heading">Multi-Commodity Consolidated Load</h4>
                        </div>
                        <span class="px-2.5 py-1 rounded bg-[#00a79d]/20 text-[#00d9cc] text-xs font-mono font-bold border border-[#00d9cc]/30">19.00 MT</span>
                    </div>

                    <div class="space-y-3 font-mono text-xs">
                        <div class="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                            <div>
                                <span class="text-white font-bold block">1. Natural White Sesame Seeds (99.95%)</span>
                                <span class="text-[10px] text-stone-400">25 kg Multi-wall Paper Bags</span>
                            </div>
                            <span class="text-[#00d9cc] font-bold">8.00 MT</span>
                        </div>

                        <div class="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                            <div>
                                <span class="text-white font-bold block">2. Bold Peanuts / Groundnuts (40/50 Count)</span>
                                <span class="text-[10px] text-stone-400">25 kg Vacuum / Jute Bags</span>
                            </div>
                            <span class="text-[#00d9cc] font-bold">6.00 MT</span>
                        </div>

                        <div class="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                            <div>
                                <span class="text-white font-bold block">3. Whole Cumin Seeds (Jeera Machine Clean)</span>
                                <span class="text-[10px] text-stone-400">25 kg PP Woven Bags</span>
                            </div>
                            <span class="text-[#00d9cc] font-bold">3.00 MT</span>
                        </div>

                        <div class="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                            <div>
                                <span class="text-white font-bold block">4. Coriander Seeds (Eagle Quality)</span>
                                <span class="text-[10px] text-stone-400">20 kg PP Bags</span>
                            </div>
                            <span class="text-[#00d9cc] font-bold">2.00 MT</span>
                        </div>
                    </div>

                    <div class="mt-5 pt-4 border-t border-teal-800/60 flex items-center justify-between text-xs text-stone-300">
                        <span>Direct Stuffed at Gondal Facility</span>
                        <span class="text-teal-400 font-bold flex items-center gap-1">
                            <span>Ready for Sail</span>
                            <span>🚢</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Export Destinations & Markets -->
<section class="py-20 bg-[#f8fafa] dark:bg-[#081a18] border-t border-stone-200 dark:border-teal-900/40 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
            <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Global Reach</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-teal-950 dark:text-white mt-2">
                Export Destinations Across 40+ Countries
            </h2>
            <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
                Providing reliable Incoterm delivery to major container discharge hubs worldwide.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @foreach($exportMarkets as $market)
                <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl p-6 border border-stone-200 dark:border-teal-900/40 shadow-sm flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="text-lg font-bold font-heading text-teal-950 dark:text-white">{{ $market->name }}</h3>
                            <span class="text-xs text-teal-700 dark:text-teal-300 font-semibold bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                                {{ $market->countries->count() }} Key Destinations
                            </span>
                        </div>
                        <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                            {{ $market->description }}
                        </p>
                        <div class="space-y-2">
                            @foreach($market->countries as $cntry)
                                <a href="{{ route('markets.country', $cntry->slug) }}" class="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-[#061514] transition border border-stone-100 dark:border-teal-900/40 group">
                                    <span class="text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-teal-700 dark:group-hover:text-teal-300 flex items-center">
                                        <span class="mr-2 text-base">{{ $cntry->flag_emoji }}</span>
                                        {{ $cntry->name }}
                                    </span>
                                    <span class="text-[11px] text-stone-400 group-hover:text-teal-600 dark:group-hover:text-teal-400">View Ports →</span>
                                </a>
                            @endforeach
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>

<!-- Export Tools Spotlight (Calculators & Trade Utilities) -->
<section class="py-20 bg-stone-50 dark:bg-[#061514] border-t border-stone-200 dark:border-teal-900/40 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
            <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Operational Decision Tools</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-teal-950 dark:text-white mt-2">
                International Trade & Export Tools
            </h2>
            <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
                Instant calculations for logistics managers, procurement executives, and global trade desks.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- 1. Container Load Calculator -->
            <a href="{{ route('tools.container_calculator') }}" class="group bg-white dark:bg-[#0a1e1c] rounded-2xl p-6 border border-stone-200/90 dark:border-teal-900/40 shadow-sm hover:shadow-xl hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-[#00a79d] group-hover:text-white transition">
                        🚢
                    </div>
                    <h3 class="text-base font-bold font-heading text-teal-950 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">Container Load Calculator</h3>
                    <p class="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                        Calculate exact 20ft & 40ft stuffing capacities, bag counts (25kg / 50kg), gross weights, and payload utilization.
                    </p>
                </div>
                <div class="mt-6 pt-4 border-t border-stone-100 dark:border-teal-900/40 flex items-center justify-between text-xs font-bold text-teal-800 dark:text-teal-300 group-hover:text-teal-600">
                    <span>Calculate Payload</span>
                    <span class="group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </a>

            <!-- 2. Landed Cost Calculator -->
            <a href="{{ route('tools.landed_cost') }}" class="group bg-white dark:bg-[#0a1e1c] rounded-2xl p-6 border border-stone-200/90 dark:border-teal-900/40 shadow-sm hover:shadow-xl hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-[#00a79d] group-hover:text-white transition">
                        💰
                    </div>
                    <h3 class="text-base font-bold font-heading text-teal-950 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">Landed Cost (CIF) Estimator</h3>
                    <p class="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                        Compute FOB + Ocean Freight + Marine Insurance = CIF + Customs Duty to estimate your per-metric-ton landing price.
                    </p>
                </div>
                <div class="mt-6 pt-4 border-t border-stone-100 dark:border-teal-900/40 flex items-center justify-between text-xs font-bold text-teal-800 dark:text-teal-300 group-hover:text-teal-600">
                    <span>Estimate CIF Cost</span>
                    <span class="group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </a>

            <!-- 3. HS Code Finder -->
            <a href="{{ route('tools.hs_codes') }}" class="group bg-white dark:bg-[#0a1e1c] rounded-2xl p-6 border border-stone-200/90 dark:border-teal-900/40 shadow-sm hover:shadow-xl hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-[#00a79d] group-hover:text-white transition">
                        📑
                    </div>
                    <h3 class="text-base font-bold font-heading text-teal-950 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">HS Code Tariff Directory</h3>
                    <p class="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                        Search Indian Harmonized System commodity codes for Peanuts (1202), Sesame (1207), Cumin (0909), and Pulses.
                    </p>
                </div>
                <div class="mt-6 pt-4 border-t border-stone-100 dark:border-teal-900/40 flex items-center justify-between text-xs font-bold text-teal-800 dark:text-teal-300 group-hover:text-teal-600">
                    <span>Search Tariffs</span>
                    <span class="group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </a>

            <!-- 4. Indian Crop Calendar -->
            <a href="{{ route('tools.crop_calendar') }}" class="group bg-white dark:bg-[#0a1e1c] rounded-2xl p-6 border border-stone-200/90 dark:border-teal-900/40 shadow-sm hover:shadow-xl hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-[#00a79d] group-hover:text-white transition">
                        📅
                    </div>
                    <h3 class="text-base font-bold font-heading text-teal-950 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">Crop Harvest Calendar</h3>
                    <p class="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                        Track sowing, harvesting, and export dispatch availability for Kharif & Rabi crops across Gujarat agricultural belts.
                    </p>
                </div>
                <div class="mt-6 pt-4 border-t border-stone-100 dark:border-teal-900/40 flex items-center justify-between text-xs font-bold text-teal-800 dark:text-teal-300 group-hover:text-teal-600">
                    <span>View Calendar</span>
                    <span class="group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </a>
        </div>
    </div>
</section>

<!-- Certifications Bar -->
<section class="py-16 bg-white dark:bg-[#081b19] border-t border-stone-200 dark:border-teal-900/40 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
            <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Accreditations & Compliance</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold font-heading text-teal-950 dark:text-white mt-1">
                International Export Certifications
            </h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
            @foreach($certifications as $cert)
                <div class="bg-stone-50 dark:bg-[#0a1e1c] hover:bg-teal-50/50 dark:hover:bg-[#0d2724] p-4 rounded-xl border border-stone-200 dark:border-teal-900/40 text-center transition group">
                    <span class="block text-xs font-bold text-teal-950 dark:text-stone-200 group-hover:text-teal-700 dark:group-hover:text-teal-300 leading-tight">
                        {{ $cert->title }}
                    </span>
                    <span class="block text-[10px] text-stone-500 dark:text-stone-400 mt-1 truncate">
                        {{ $cert->certificate_no ?? 'Authorized' }}
                    </span>
                </div>
            @endforeach
        </div>

        <div class="text-center mt-8">
            <a href="{{ route('certifications.index') }}" class="text-xs font-semibold text-teal-800 dark:text-teal-300 hover:text-teal-600 dark:hover:text-white">
                View Full Verification Registry & Issuing Authorities →
            </a>
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section class="py-20 bg-[#f4f8f7] dark:bg-[#061514] border-t border-stone-200 dark:border-teal-900/40 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
            <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Buyer Experiences</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-teal-950 dark:text-white mt-2">
                What International Importers Say
            </h2>
            <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
                Trusted by food distributors, spice grinders, and bakery manufacturers across Europe, Middle East, and Asia.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @foreach($testimonials as $testi)
                <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl p-6 border border-stone-200 dark:border-teal-900/40 shadow-sm flex flex-col justify-between">
                    <div>
                        <div class="flex text-amber-400 mb-3 text-xs">
                            @for($i = 0; $i < $testi->rating; $i++) ★ @endfor
                        </div>
                        <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                            "{{ $testi->content }}"
                        </p>
                    </div>
                    <div class="mt-6 pt-4 border-t border-stone-100 dark:border-teal-900/40">
                        <p class="text-xs font-bold text-stone-900 dark:text-stone-100">{{ $testi->client_name }}</p>
                        <p class="text-[11px] text-teal-800 dark:text-teal-300 font-medium">{{ $testi->company_name }}</p>
                        <p class="text-[10px] text-stone-400">{{ $testi->country }}</p>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>

<!-- FAQs Section -->
<section class="py-20 bg-white dark:bg-[#081b19] border-t border-stone-200 dark:border-teal-900/40 transition-colors duration-200">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Clear Answers</span>
            <h2 class="text-3xl font-extrabold font-heading text-teal-950 dark:text-white mt-2">
                Frequently Asked Export Questions
            </h2>
        </div>

        <div class="space-y-4" x-data="{ activeAccordion: null }">
            @foreach($faqs as $index => $faq)
                <div class="border border-stone-200 dark:border-teal-900/40 rounded-xl overflow-hidden bg-stone-50/50 dark:bg-[#0a1e1c]">
                    <button type="button" 
                        @click="activeAccordion = (activeAccordion === {{ $index }} ? null : {{ $index }})"
                        class="w-full text-left p-5 text-sm font-bold text-teal-950 dark:text-white flex items-center justify-between hover:bg-stone-100/70 dark:hover:bg-[#0d2724] transition">
                        <span>{{ $faq->question }}</span>
                        <svg class="w-4 h-4 text-stone-500 transition transform" :class="{ 'rotate-180 text-teal-600': activeAccordion === {{ $index }} }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <div x-show="activeAccordion === {{ $index }}" x-cloak class="px-5 pb-5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-200/60 dark:border-teal-900/40 bg-white dark:bg-[#081b19]">
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
<section class="py-16 bg-gradient-to-r from-[#033e3a] via-[#00a79d] to-[#022826] text-white relative shadow-2xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Ready to Source Premium Indian Commodities?
        </h2>
        <p class="mt-3 text-sm text-teal-100 max-w-2xl mx-auto">
            Our trade directors are on standby to provide competitive FOB Mundra or CIF container quotations, product samples, and technical specification sheets.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
            <button type="button" 
                @click="$dispatch('open-rfq-modal', {})"
                class="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition text-sm">
                Request Official Quotation Now
            </button>
            <a href="{{ route('contact') }}" class="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 transition text-sm">
                Contact Export Sales Desk
            </a>
        </div>
    </div>
</section>
@endsection

@push('schema')
<script type="application/ld+json">
{!! json_encode([
    "\x40context" => 'https://schema.org',
    '@type' => 'FAQPage',
    '@id' => url('/') . '#faq',
    'mainEntity' => $faqs->map(function($faq) {
        return [
            '@type' => 'Question',
            'name' => $faq->question,
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text' => strip_tags($faq->answer),
            ]
        ];
    })->values()->all()
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
</script>
@endpush

