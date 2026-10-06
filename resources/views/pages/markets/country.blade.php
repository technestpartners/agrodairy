@extends('layouts.app', ['title' => 'Agricultural Commodity Exports to ' . $country->name . ' - Agro Dairy Export LLP', 'metaDescription' => 'Direct agricultural export solutions to ' . $country->name . '. Compliant packaging, Port of ' . ($country->primary_discharge_port ?? 'Discharge') . ' logistics, and regulatory import documents.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Export Markets', 'url' => route('markets.index')], ['label' => $country->name]]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Dedicated Trade Corridor</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Agricultural Commodity Exports to {{ $country->name }}</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Streamlined export logistics, phytosanitary clearance, and compliant packaging for food manufacturers, wholesalers, and roasters in {{ $country->name }}.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-brand-beige-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Main Content Area -->
            <div class="lg:col-span-2 space-y-10">
                <!-- Country Profile Details -->
                <div class="bg-white p-8 rounded-2xl border border-brand-beige-200 shadow-sm">
                    <h2 class="text-2xl font-bold font-display text-brand-forest-900 mb-4">Destination Trade Profile: {{ $country->name }}</h2>
                    <p class="text-sm text-neutral-600 leading-relaxed">
                        Agro Dairy Export LLP maintains continuous supply chains to {{ $country->name }}, ensuring cargo arrives in optimal condition with all customs clearances pre-arranged.
                    </p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-brand-beige-100">
                        <div class="bg-brand-beige-50 p-4 rounded-xl">
                            <span class="text-xs text-neutral-400 block">Region</span>
                            <span class="font-bold text-brand-forest-900 text-sm">{{ $country->exportMarket?->name ?? 'International' }}</span>
                        </div>
                        <div class="bg-brand-beige-50 p-4 rounded-xl">
                            <span class="text-xs text-neutral-400 block">Primary Discharge Port</span>
                            <span class="font-bold text-brand-forest-900 text-sm">{{ $country->primary_discharge_port ?? 'Major Commercial Seaport' }}</span>
                        </div>
                        <div class="bg-brand-beige-50 p-4 rounded-xl">
                            <span class="text-xs text-neutral-400 block">Standard Incoterms Offered</span>
                            <span class="font-bold text-brand-forest-900 text-sm">CIF {{ $country->primary_discharge_port ?? 'Port' }} / CFR / FOB Mundra</span>
                        </div>
                        <div class="bg-brand-beige-50 p-4 rounded-xl">
                            <span class="text-xs text-neutral-400 block">Average Ocean Transit Time</span>
                            <span class="font-bold text-emerald-700 text-sm">7 - 24 Days (Route Dependent)</span>
                        </div>
                    </div>
                </div>

                <!-- Import Regulations & Customs Requirements -->
                <div class="bg-white p-8 rounded-2xl border border-brand-beige-200 shadow-sm">
                    <h3 class="text-xl font-bold font-display text-brand-forest-900 mb-4">Import Requirements & Quality Directives</h3>
                    @if($country->import_requirements_summary)
                        <div class="p-4 bg-brand-forest-50 border border-brand-forest-200 rounded-xl text-xs md:text-sm text-brand-forest-950 leading-relaxed mb-6">
                            {{ $country->import_requirements_summary }}
                        </div>
                    @endif

                    <h4 class="font-bold text-sm text-brand-forest-900 mb-3">Customary Documentation for {{ $country->name }} Imports:</h4>
                    <ul class="space-y-2 text-xs text-neutral-600">
                        <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Commercial Invoice & Packing List (Attested where required)</li>
                        <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Original Clean On-Board Ocean Bill of Lading</li>
                        <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Phytosanitary Certificate issued by Government of India Quarantine</li>
                        <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Chamber of Commerce Certificate of Origin (COO)</li>
                        <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Aluminum Phosphide Fumigation Certificate</li>
                        <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Certificate of Analysis (COA) / SGS Inspection Report</li>
                    </ul>
                </div>

                <!-- Top Commodities Exported to this Country -->
                <div>
                    <h3 class="text-xl font-bold font-display text-brand-forest-900 mb-6">Popular Commodities Supplied to {{ $country->name }}</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        @foreach($popularProducts as $prod)
                            <x-product-card :product="$prod" />
                        @endforeach
                    </div>
                </div>
            </div>

            <!-- Sidebar Inquiry CTA -->
            <div class="space-y-8">
                <div class="bg-brand-forest-900 text-white p-6 md:p-8 rounded-3xl border border-brand-forest-700 shadow-lg">
                    <span class="text-xs uppercase font-bold text-brand-gold-400 tracking-wider">Direct RFQ</span>
                    <h3 class="text-xl font-bold font-display text-white mt-1 mb-3">Request CIF Quote for {{ $country->name }}</h3>
                    <p class="text-xs text-brand-beige-200 leading-relaxed mb-6">
                        Contact our export desk for current CIF price per metric ton delivered to {{ $country->primary_discharge_port ?? $country->name }}.
                    </p>

                    <a href="{{ route('rfq.create') }}?country={{ urlencode($country->name) }}&port={{ urlencode($country->primary_discharge_port ?? '') }}" class="w-full inline-flex items-center justify-center px-5 py-3.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-forest-950 font-bold text-xs rounded-xl transition shadow">
                        Request Quote to {{ $country->name }}
                    </a>
                </div>

                <!-- Other Export Markets -->
                <div class="bg-white p-6 rounded-2xl border border-brand-beige-200 shadow-sm">
                    <h4 class="font-bold text-sm text-brand-forest-900 mb-4">Other Export Destinations</h4>
                    <div class="space-y-2">
                        @foreach($otherCountries as $other)
                            <a href="{{ route('markets.country', $other->slug) }}" class="flex items-center justify-between p-2.5 rounded-lg hover:bg-brand-beige-50 text-xs text-neutral-700 font-medium transition">
                                <span>{{ $other->name }}</span>
                                <span class="text-neutral-400 font-mono text-[11px]">{{ $other->code }}</span>
                            </a>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
