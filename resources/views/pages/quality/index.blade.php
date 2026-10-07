@extends('layouts.app', ['title' => 'Quality Assurance & Food Safety Standards - Agro Dairy Export LLP', 'metaDescription' => 'Comprehensive farm-to-container quality assurance, Buhler optical sorting, ISO/IEC testing protocols, and pre-shipment SGS/Bureau Veritas inspections.'])

@section('content')
<!-- Header -->
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Quality Assurance']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Zero-Defect Commitment</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Rigorous Quality Assurance from Soil to Port</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Every container exported by Agro Dairy Export LLP undergoes systematic analytical testing, Buhler optical grading, and independent third-party verification to meet exacting international food safety regulations.
            </p>
        </div>
    </div>
</div>

<!-- 5-Stage QC Architecture -->
<section class="py-16 md:py-20 bg-white dark:bg-[#061514] transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl font-display font-bold text-brand-forest-900 dark:text-white">Our 5-Stage Quality Control Protocol</h2>
            <p class="text-neutral-600 dark:text-neutral-300 mt-3 text-base">From the moment pods and seeds enter our primary procurement yards to final maritime container sealing, zero compromises are made.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
            <!-- Stage 1 -->
            <div class="p-6 rounded-2xl bg-brand-beige-50 dark:bg-[#0a1e1c] border border-brand-beige-200 dark:border-teal-900/40 relative group hover:border-teal-500 transition-all shadow-sm">
                <div class="w-12 h-12 rounded-xl bg-teal-800 text-teal-200 flex items-center justify-center font-bold text-xl mb-4">01</div>
                <h3 class="text-base font-bold text-brand-forest-900 dark:text-white mb-2">Raw Harvest Inward</h3>
                <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">Moisture determination, count per ounce sampling, pod maturity inspection, and preliminary foreign matter assessment.</p>
            </div>
            <!-- Stage 2 -->
            <div class="p-6 rounded-2xl bg-brand-beige-50 dark:bg-[#0a1e1c] border border-brand-beige-200 dark:border-teal-900/40 relative group hover:border-teal-500 transition-all shadow-sm">
                <div class="w-12 h-12 rounded-xl bg-teal-800 text-teal-200 flex items-center justify-center font-bold text-xl mb-4">02</div>
                <h3 class="text-base font-bold text-brand-forest-900 dark:text-white mb-2">Multi-Deck Grading</h3>
                <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">Destoning, magnetic separation of tramp metal, air aspiration, and precision vibration sifting for calibrated sizing.</p>
            </div>
            <!-- Stage 3 -->
            <div class="p-6 rounded-2xl bg-brand-beige-50 dark:bg-[#0a1e1c] border border-brand-beige-200 dark:border-teal-900/40 relative group hover:border-teal-500 transition-all shadow-sm">
                <div class="w-12 h-12 rounded-xl bg-teal-800 text-teal-200 flex items-center justify-center font-bold text-xl mb-4">03</div>
                <h3 class="text-base font-bold text-brand-forest-900 dark:text-white mb-2">Optical Sorting</h3>
                <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">Trichromatic Buhler Sortex infrared cameras detect discolored kernels, immature seeds, and microscopic defects at 99.8% purity.</p>
            </div>
            <!-- Stage 4 -->
            <div class="p-6 rounded-2xl bg-brand-beige-50 dark:bg-[#0a1e1c] border border-brand-beige-200 dark:border-teal-900/40 relative group hover:border-teal-500 transition-all shadow-sm">
                <div class="w-12 h-12 rounded-xl bg-teal-800 text-teal-200 flex items-center justify-center font-bold text-xl mb-4">04</div>
                <h3 class="text-base font-bold text-brand-forest-900 dark:text-white mb-2">In-House Lab Testing</h3>
                <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">Quantitative Aflatoxin (B1, B2, G1, G2 via HPLC), FFA, peroxide value, Salmonella, E. Coli, and heavy metal residue screening.</p>
            </div>
            <!-- Stage 5 -->
            <div class="p-6 rounded-2xl bg-brand-beige-50 dark:bg-[#0a1e1c] border border-brand-beige-200 dark:border-teal-900/40 relative group hover:border-teal-500 transition-all shadow-sm">
                <div class="w-12 h-12 rounded-xl bg-teal-800 text-teal-200 flex items-center justify-center font-bold text-xl mb-4">05</div>
                <h3 class="text-base font-bold text-brand-forest-900 dark:text-white mb-2">Pre-Shipment Audit</h3>
                <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">Final pallet inspection, moisture check, container fumigation, desiccant placement, and tamper-evident customs bolt seal locking.</p>
            </div>
        </div>
    </div>
</section>

<!-- Analytical Capabilities -->
<section class="py-16 bg-brand-forest-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <span class="text-brand-gold-400 text-xs font-bold uppercase tracking-widest">Laboratory Specifications</span>
                <h2 class="text-3xl md:text-4xl font-display font-bold mt-2">Certified Analytical Tolerances & International Testing</h2>
                <p class="mt-4 text-brand-beige-200 text-sm md:text-base leading-relaxed">
                    Our quality manual strictly enforces compliance with the EU Rapid Alert System for Food and Feed (RASFF), US FDA FSMA, Saudi SFDA, and Japanese MHLW import hygiene limits.
                </p>

                <div class="mt-8 space-y-4">
                    <div class="bg-brand-forest-800/80 p-4 rounded-xl border border-brand-forest-700 flex items-start gap-4">
                        <div class="w-8 h-8 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <div>
                            <h4 class="font-bold text-white text-sm">Aflatoxin Control Under Strict EU Thresholds</h4>
                            <p class="text-xs text-brand-beige-300 mt-0.5">Total Aflatoxin < 4 ppb (B1 < 2 ppb) achievable via dedicated sorting lots for premium European and UK snack roasters.</p>
                        </div>
                    </div>

                    <div class="bg-brand-forest-800/80 p-4 rounded-xl border border-brand-forest-700 flex items-start gap-4">
                        <div class="w-8 h-8 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <div>
                            <h4 class="font-bold text-white text-sm">Purity & Foreign Matter Guarantee</h4>
                            <p class="text-xs text-brand-beige-300 mt-0.5">Natural sesame seed up to 99.95% purity and Bold Peanuts foreign matter controlled strictly under 0.2% max.</p>
                        </div>
                    </div>

                    <div class="bg-brand-forest-800/80 p-4 rounded-xl border border-brand-forest-700 flex items-start gap-4">
                        <div class="w-8 h-8 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <div>
                            <h4 class="font-bold text-white text-sm">Independent Third-Party Verification</h4>
                            <p class="text-xs text-brand-beige-300 mt-0.5">Buyers can designate SGS, Bureau Veritas, Intertek, or Cotecna for independent joint sampling and loading supervision.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-brand-forest-800 p-8 rounded-2xl border border-brand-forest-700">
                <h3 class="text-xl font-bold font-display text-white mb-6">Standard Analytical Parameter Matrix</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs">
                        <thead>
                            <tr class="border-b border-brand-forest-700 text-brand-gold-400 uppercase tracking-wider">
                                <th class="pb-3 font-semibold">Test Parameter</th>
                                <th class="pb-3 font-semibold">Testing Standard</th>
                                <th class="pb-3 font-semibold">Export Tolerance</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-brand-forest-700/60 text-brand-beige-200">
                            <tr>
                                <td class="py-3 font-medium text-white">Moisture Content</td>
                                <td class="py-3">ISO 665 / Halogen IR</td>
                                <td class="py-3 text-emerald-400">Max 7.0% - 8.0%</td>
                            </tr>
                            <tr>
                                <td class="py-3 font-medium text-white">Admixture / FM</td>
                                <td class="py-3">Manual Sieve / Gravimetric</td>
                                <td class="py-3 text-emerald-400">Max 0.20% - 0.50%</td>
                            </tr>
                            <tr>
                                <td class="py-3 font-medium text-white">Total Aflatoxin</td>
                                <td class="py-3">HPLC AOAC 991.31</td>
                                <td class="py-3 text-emerald-400">< 4 ppb / < 10 ppb (Market Spec)</td>
                            </tr>
                            <tr>
                                <td class="py-3 font-medium text-white">Free Fatty Acids (FFA)</td>
                                <td class="py-3">Titration (ISO 660)</td>
                                <td class="py-3 text-emerald-400">Max 1.0%</td>
                            </tr>
                            <tr>
                                <td class="py-3 font-medium text-white">Salmonella</td>
                                <td class="py-3">ISO 6579 / PCR</td>
                                <td class="py-3 text-emerald-400">Absent in 25g (Zero)</td>
                            </tr>
                            <tr>
                                <td class="py-3 font-medium text-white">E. Coli</td>
                                <td class="py-3">ISO 16649-2</td>
                                <td class="py-3 text-emerald-400">< 10 cfu/g</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-8 pt-6 border-t border-brand-forest-700 flex items-center justify-between">
                    <div>
                        <div class="text-xs text-brand-beige-400">Have specific COA parameters?</div>
                        <div class="text-sm font-bold text-white">Custom target specs available on request.</div>
                    </div>
                    <a href="{{ route('rfq.create') }}" class="px-4 py-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-forest-950 font-bold text-xs rounded-lg transition">Request Spec Review</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Certifications Overview Grid -->
<section class="py-16 md:py-20 bg-brand-beige-50 dark:bg-[#061514] transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
                <span class="text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-widest">Compliance Credentials</span>
                <h2 class="text-3xl font-display font-bold text-brand-forest-900 dark:text-white mt-2">Active Food Safety Accreditations</h2>
            </div>
            <a href="{{ route('quality.certifications') }}" class="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline transition">
                <span>View Full Certification Registry & Audit Data</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @forelse($certifications as $cert)
                <div class="bg-white dark:bg-[#0a1e1c] p-6 rounded-2xl border border-brand-beige-200 dark:border-teal-900/40 shadow-sm hover:border-teal-500 transition-all flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="px-2.5 py-0.5 rounded text-xs font-semibold bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300">
                                {{ ucfirst($cert->status) }}
                            </span>
                            @if($cert->certificate_number)
                                <span class="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">No: {{ $cert->certificate_number }}</span>
                            @endif
                        </div>
                        <h4 class="text-base font-bold text-brand-forest-900 dark:text-white">{{ $cert->name }}</h4>
                        <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Issued by: {{ $cert->issuing_body }}</p>
                        @if($cert->description)
                            <p class="text-xs text-neutral-600 dark:text-neutral-300 mt-3 line-clamp-3">{{ $cert->description }}</p>
                        @endif
                    </div>
                    <div class="mt-6 pt-4 border-t border-neutral-100 dark:border-teal-900/40 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                        <span>Valid Thru: {{ $cert->expiry_date ? $cert->expiry_date->format('M Y') : 'Perpetual' }}</span>
                        <a href="{{ route('quality.certifications') }}" class="font-bold text-teal-600 dark:text-teal-400 hover:underline">Details &rarr;</a>
                    </div>
                </div>
            @empty
                <div class="col-span-full py-12 text-center text-neutral-500 dark:text-neutral-400">
                    Certifications directory is being synchronized with the registry.
                </div>
            @endforelse
        </div>
    </div>
</section>

<!-- Call to action: Lot Traceability -->
<section class="py-16 bg-white dark:bg-[#041211] border-t border-brand-beige-200 dark:border-teal-900/40 transition-colors duration-200">
    <div class="max-w-5xl mx-auto px-4 text-center">
        <div class="inline-flex p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 mb-4 border border-teal-200 dark:border-teal-800/60">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        </div>
        <h2 class="text-2xl md:text-3xl font-display font-bold text-brand-forest-900 dark:text-white">Have a Container or Batch Number?</h2>
        <p class="text-neutral-600 dark:text-neutral-300 mt-3 max-w-xl mx-auto text-sm md:text-base">
            Verify inspection clearance, packing dates, certified origin, and COA analysis for your dispatched consignment in our public traceability portal.
        </p>
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="{{ route('quality.traceability') }}" class="w-full sm:w-auto px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition shadow-md">
                Launch Batch Traceability Lookup
            </a>
            <a href="{{ route('rfq.create') }}" class="w-full sm:w-auto px-6 py-3.5 bg-brand-beige-100 dark:bg-[#0a1e1c] hover:bg-brand-beige-200 dark:hover:bg-[#0e2725] text-brand-forest-950 dark:text-white font-semibold text-sm rounded-xl transition border border-brand-beige-300 dark:border-teal-900/60">
                Inquire on Quality Specifications
            </a>
        </div>
    </div>
</section>
@endsection
