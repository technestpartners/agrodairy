@extends('layouts.app', ['title' => 'Shipping & Maritime Logistics - Agro Dairy Export LLP', 'metaDescription' => 'Strategic gateway to global ports: Mundra and Kandla port infrastructure, container specifications, Incoterms (FOB, CFR, CIF), and complete export documentation checklist.'])

@section('content')
<!-- Header -->
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Logistics & Shipping']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Port Proximity Advantage</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Direct Ocean Freight from India's Premier Maritime Gateways</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Located just 210 km from Mundra Port (INMUN1) and Kandla Port (INIXY1), Agro Dairy Export LLP guarantees lightning-fast container dispatch, predictable vessel cut-offs, and competitive ocean freight tariffs.
            </p>
        </div>
    </div>
</div>

<!-- Gateway Seaports -->
<section class="py-16 md:py-20 bg-brand-beige-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl font-display font-bold text-brand-forest-900">Primary Ports of Loading (POL)</h2>
            <p class="text-neutral-600 mt-3 text-base">State-of-the-art container terminals on the western coast of Gujarat with direct weekly line services to Jebel Ali, Rotterdam, Singapore, and Houston.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            @forelse($indianPorts as $port)
                <div class="bg-white p-8 rounded-2xl border border-brand-beige-200 shadow-sm hover:border-brand-forest-400 transition-all">
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 rounded-full text-xs font-bold bg-brand-forest-100 text-brand-forest-900">Active POL Gateway</span>
                        <span class="text-xs font-mono font-bold text-neutral-500">Port Code: {{ $port->code }}</span>
                    </div>
                    <h3 class="text-2xl font-bold font-display text-brand-forest-900 mb-1">{{ $port->name }}</h3>
                    <p class="text-xs text-neutral-500 mb-4">{{ $port->country }} &bull; Gujarat Coastline</p>
                    <p class="text-sm text-neutral-600 leading-relaxed mb-6">
                        Deep-water all-weather commercial port equipped with automated post-panamax gantry cranes, dedicated CFS facilities, and direct national highway connectivity from our Rajkot processing terminal.
                    </p>
                    <div class="pt-4 border-t border-brand-beige-100 flex items-center justify-between text-xs">
                        <span class="text-neutral-500">Transit from Plant: <strong>4.5 Hours</strong></span>
                        <a href="{{ route('tools.container') }}" class="font-bold text-brand-forest-800 hover:text-brand-gold-600">Calculate Payload &rarr;</a>
                    </div>
                </div>
            @empty
                <div class="col-span-full text-center py-8 text-neutral-500">
                    Port registry is loading.
                </div>
            @endforelse
        </div>
    </div>
</section>

<!-- Container Specifications & Capacities -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl font-display font-bold text-brand-forest-900">Standard Container Loading Specifications</h2>
            <p class="text-neutral-600 mt-3 text-base">Optimizing ocean freight per metric ton with high-density container stuffing techniques.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-brand-beige-50 p-6 md:p-8 rounded-2xl border border-brand-beige-200">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-xs font-bold uppercase tracking-wider text-brand-forest-800">Dry Van Standard</span>
                    <span class="text-xs font-mono font-bold text-neutral-500">20ft FCL</span>
                </div>
                <h3 class="text-xl font-bold font-display text-brand-forest-900 mb-3">20ft Heavy Freight Container</h3>
                <p class="text-xs text-neutral-600 mb-6">The universal standard for dense agricultural commodities including peanuts, sesame seeds, chickpeas, and spices.</p>

                <div class="space-y-3 text-xs">
                    <div class="flex justify-between pb-2 border-b border-brand-beige-200">
                        <span class="text-neutral-500">Tare Weight:</span>
                        <span class="font-bold text-brand-forest-900">2,300 kg</span>
                    </div>
                    <div class="flex justify-between pb-2 border-b border-brand-beige-200">
                        <span class="text-neutral-500">Max Permissible Cargo:</span>
                        <span class="font-bold text-brand-forest-900">21.85 Metric Tons</span>
                    </div>
                    <div class="flex justify-between pb-2 border-b border-brand-beige-200">
                        <span class="text-neutral-500">Peanut Kernel Load:</span>
                        <span class="font-bold text-emerald-700">19.0 MT (380 x 50kg Bags)</span>
                    </div>
                    <div class="flex justify-between pb-2 border-b border-brand-beige-200">
                        <span class="text-neutral-500">Sesame Seed Load:</span>
                        <span class="font-bold text-emerald-700">19.0 MT (760 x 25kg Bags)</span>
                    </div>
                </div>
            </div>

            <div class="bg-brand-beige-50 p-6 md:p-8 rounded-2xl border border-brand-beige-200">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-xs font-bold uppercase tracking-wider text-brand-forest-800">Volumetric High Cube</span>
                    <span class="text-xs font-mono font-bold text-neutral-500">40ft HC FCL</span>
                </div>
                <h3 class="text-xl font-bold font-display text-brand-forest-900 mb-3">40ft High Cube Container</h3>
                <p class="text-xs text-neutral-600 mb-6">Engineered for lightweight bulky products like dehydrated onion flakes, garlic flakes, psyllium husk, and animal fodder.</p>

                <div class="space-y-3 text-xs">
                    <div class="flex justify-between pb-2 border-b border-brand-beige-200">
                        <span class="text-neutral-500">Tare Weight:</span>
                        <span class="font-bold text-brand-forest-900">3,900 kg</span>
                    </div>
                    <div class="flex justify-between pb-2 border-b border-brand-beige-200">
                        <span class="text-neutral-500">Max Internal Volume:</span>
                        <span class="font-bold text-brand-forest-900">76.4 CBM</span>
                    </div>
                    <div class="flex justify-between pb-2 border-b border-brand-beige-200">
                        <span class="text-neutral-500">Dehydrated Onion Flakes:</span>
                        <span class="font-bold text-emerald-700">14.0 MT to 16.0 MT</span>
                    </div>
                    <div class="flex justify-between pb-2 border-b border-brand-beige-200">
                        <span class="text-neutral-500">Psyllium Husk:</span>
                        <span class="font-bold text-emerald-700">18.0 MT to 19.5 MT</span>
                    </div>
                </div>
            </div>

            <div class="bg-brand-forest-900 text-white p-6 md:p-8 rounded-2xl border border-brand-forest-700 flex flex-col justify-between">
                <div>
                    <span class="text-xs font-bold uppercase tracking-wider text-brand-gold-400">Interactive Tool</span>
                    <h3 class="text-xl font-bold font-display text-white mt-1 mb-3">Test Custom Bag Counts & Dimensions</h3>
                    <p class="text-xs text-brand-beige-200 leading-relaxed">
                        Need exact bag numbers, gross weights, and payload balance for your target shipping line and destination discharge port? Use our live container loading algorithm.
                    </p>
                </div>

                <div class="mt-8">
                    <a href="{{ route('tools.container') }}" class="w-full inline-flex items-center justify-center px-6 py-3.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-forest-950 font-bold text-sm rounded-xl transition shadow">
                        Launch Container Calculator
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Complete Export Document Checklist -->
<section class="py-16 md:py-20 bg-brand-beige-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mb-12">
            <span class="text-brand-forest-800 text-xs font-bold uppercase tracking-widest">Trade Documentation</span>
            <h2 class="text-3xl font-display font-bold text-brand-forest-900 mt-2">Standard Export Document Set Handover</h2>
            <p class="text-neutral-600 mt-3 text-sm md:text-base">
                Every consignment is accompanied by a pristine, authenticated international document package dispatched via DHL/FedEx or telex-released in compliance with your Letter of Credit (LC) instructions.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-xl border border-brand-beige-200 flex items-start gap-4">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 text-sm">✓</div>
                <div>
                    <h4 class="font-bold text-sm text-brand-forest-900">Commercial Invoice & Detailed Packing List</h4>
                    <p class="text-xs text-neutral-500 mt-1">Itemized break-up of net weights, gross weights, container marks, and HS codes.</p>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl border border-brand-beige-200 flex items-start gap-4">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 text-sm">✓</div>
                <div>
                    <h4 class="font-bold text-sm text-brand-forest-900">Clean On-Board Ocean Bill of Lading (B/L)</h4>
                    <p class="text-xs text-neutral-500 mt-1">Full set 3/3 original ocean bills issued by premier carriers (Maersk, MSC, CMA CGM, Hapag-Lloyd).</p>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl border border-brand-beige-200 flex items-start gap-4">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 text-sm">✓</div>
                <div>
                    <h4 class="font-bold text-sm text-brand-forest-900">Phytosanitary Certificate (Plant Quarantine)</h4>
                    <p class="text-xs text-neutral-500 mt-1">Official national quarantine authority inspection certificate certifying pest-free status.</p>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl border border-brand-beige-200 flex items-start gap-4">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 text-sm">✓</div>
                <div>
                    <h4 class="font-bold text-sm text-brand-forest-900">Certificate of Origin (COO)</h4>
                    <p class="text-xs text-neutral-500 mt-1">Non-Preferential or Preferential COO (AIFTA, SAFTA, CEPA) stamped by Chamber of Commerce.</p>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl border border-brand-beige-200 flex items-start gap-4">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 text-sm">✓</div>
                <div>
                    <h4 class="font-bold text-sm text-brand-forest-900">Fumigation Certificate</h4>
                    <p class="text-xs text-neutral-500 mt-1">Official aluminum phosphide dosage certificate with treatment logs and aeration confirmation.</p>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl border border-brand-beige-200 flex items-start gap-4">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0 text-sm">✓</div>
                <div>
                    <h4 class="font-bold text-sm text-brand-forest-900">Independent Quality & Weight COA</h4>
                    <p class="text-xs text-neutral-500 mt-1">SGS, Bureau Veritas, or Intertek certificate of sampling and analytical tolerance.</p>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
