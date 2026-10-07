@extends('layouts.app', ['title' => 'Export Container Load Calculator - Agro Dairy Export LLP', 'metaDescription' => 'Calculate 20ft & 40ft container payloads, estimated bag counts, gross cargo weights, and stuffing capacities for agricultural commodities.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Export Tools', 'url' => route('tools.index')], ['label' => 'Container Load Calculator']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Payload Estimator</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Agricultural Container Loading Calculator</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Estimate cargo net weight, tare weight, total bags, and container payload utilization for maritime shipments from Mundra & Kandla ports.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-brand-beige-50 dark:bg-[#061514] transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <!-- Calculator Inputs Form -->
            <div class="lg:col-span-5 bg-white dark:bg-[#0a1e1c] p-6 md:p-8 rounded-2xl border border-brand-beige-200 dark:border-teal-900/40 shadow-sm">
                <h2 class="text-xl font-bold font-display text-brand-forest-900 dark:text-white mb-6">Container Loading Parameters</h2>

                <form action="{{ route('tools.container') }}" method="GET" class="space-y-6">
                    <div>
                        <label for="container_type" class="block text-xs font-bold text-brand-forest-900 dark:text-teal-200 uppercase tracking-wider mb-2">Maritime Container Type</label>
                        <select name="container_type" id="container_type" onchange="this.form.submit()" class="w-full px-4 py-3 bg-brand-beige-50 dark:bg-[#061514] border border-brand-beige-300 dark:border-teal-900/60 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-teal-500">
                            <option value="20ft" {{ $containerType == '20ft' ? 'selected' : '' }}>20ft Standard Dry Container (Max 21.85 MT)</option>
                            <option value="40ft" {{ $containerType == '40ft' ? 'selected' : '' }}>40ft Standard Dry Container (Max 26.50 MT)</option>
                            <option value="40ft_hc" {{ $containerType == '40ft_hc' ? 'selected' : '' }}>40ft High Cube Container (Max 26.50 MT / 76 CBM)</option>
                        </select>
                    </div>

                    <div>
                        <label for="commodity_category" class="block text-xs font-bold text-brand-forest-900 dark:text-teal-200 uppercase tracking-wider mb-2">Commodity Category (Bulk Density)</label>
                        <select name="commodity_category" id="commodity_category" onchange="this.form.submit()" class="w-full px-4 py-3 bg-brand-beige-50 dark:bg-[#061514] border border-brand-beige-300 dark:border-teal-900/60 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-teal-500">
                            <option value="peanuts" {{ $category == 'peanuts' ? 'selected' : '' }}>Peanuts (Bold / Java Kernels)</option>
                            <option value="sesame" {{ $category == 'sesame' ? 'selected' : '' }}>Sesame Seeds (Natural / Hulled)</option>
                            <option value="chickpeas" {{ $category == 'chickpeas' ? 'selected' : '' }}>Chickpeas (Kabuli / Desi)</option>
                            <option value="spices" {{ $category == 'spices' ? 'selected' : '' }}>Whole Spices (Cumin / Coriander / Fennel)</option>
                            <option value="dehydrated" {{ $category == 'dehydrated' ? 'selected' : '' }}>Dehydrated Vegetables (Onion/Garlic Flakes)</option>
                            <option value="grains" {{ $category == 'grains' ? 'selected' : '' }}>Grains & Milling Products (Wheat / Corn)</option>
                            <option value="general" {{ $category == 'general' ? 'selected' : '' }}>General Agricultural Commodity</option>
                        </select>
                    </div>

                    <div>
                        <label for="bag_weight_kg" class="block text-xs font-bold text-brand-forest-900 dark:text-teal-200 uppercase tracking-wider mb-2">Bag Net Weight (Kilograms)</label>
                        <select name="bag_weight_kg" id="bag_weight_kg" onchange="this.form.submit()" class="w-full px-4 py-3 bg-brand-beige-50 dark:bg-[#061514] border border-brand-beige-300 dark:border-teal-900/60 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-teal-500">
                            <option value="25" {{ $bagWeightKg == 25 ? 'selected' : '' }}>25.0 Kg (Multi-Wall Paper / PP / Jute)</option>
                            <option value="50" {{ $bagWeightKg == 50 ? 'selected' : '' }}>50.0 Kg (Traditional Jute / PP Woven)</option>
                            <option value="10" {{ $bagWeightKg == 10 ? 'selected' : '' }}>10.0 Kg (Vacuum Brick Pack)</option>
                            <option value="1000" {{ $bagWeightKg == 1000 ? 'selected' : '' }}>1,000 Kg (1.0 MT FIBC Jumbo Bag)</option>
                        </select>
                    </div>

                    <div>
                        <label for="bag_count" class="block text-xs font-bold text-brand-forest-900 dark:text-teal-200 uppercase tracking-wider mb-2">Target Bag Count (Optional Override)</label>
                        <input type="number" name="bag_count" id="bag_count" value="{{ $userBagCount ?? '' }}" placeholder="Leave blank for maximum safe capacity" class="w-full px-4 py-3 bg-brand-beige-50 dark:bg-[#061514] border border-brand-beige-300 dark:border-teal-900/60 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-teal-500">
                        <span class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 block">Specify a custom bag quantity to calculate resulting gross tonnage.</span>
                    </div>

                    <button type="submit" class="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition shadow">
                        Recalculate Container Loading
                    </button>
                </form>
            </div>

            <!-- Calculation Output Dashboard -->
            <div class="lg:col-span-7 space-y-6">
                <div class="bg-white dark:bg-[#0a1e1c] p-6 md:p-8 rounded-2xl border border-brand-beige-200 dark:border-teal-900/40 shadow-sm">
                    <div class="flex items-center justify-between pb-6 border-b border-brand-beige-100 dark:border-teal-900/40 mb-6">
                        <div>
                            <span class="text-xs uppercase font-bold text-teal-600 dark:text-teal-400 tracking-wider">Calculation Results</span>
                            <h3 class="text-2xl font-bold font-display text-brand-forest-900 dark:text-white mt-0.5">{{ $result['container_name'] }}</h3>
                        </div>
                        <span class="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300">
                            Safe Highway & Ocean Payload
                        </span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div class="bg-teal-50/60 dark:bg-[#061514] p-6 rounded-2xl border border-teal-100 dark:border-teal-900/50">
                            <span class="text-xs text-neutral-500 dark:text-neutral-400 uppercase font-semibold block">Total Estimated Net Weight</span>
                            <div class="text-3xl font-display font-bold text-teal-700 dark:text-teal-300 mt-1">
                                {{ number_format($result['estimated_net_weight_mt'], 3) }} <span class="text-base font-normal">MT</span>
                            </div>
                            <span class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 block">({{ number_format($result['estimated_net_weight_kg']) }} Kilograms)</span>
                        </div>

                        <div class="bg-brand-beige-50 dark:bg-[#061514] p-6 rounded-2xl border border-brand-beige-200 dark:border-teal-900/50">
                            <span class="text-xs text-neutral-500 dark:text-neutral-400 uppercase font-semibold block">Calculated Bag Count</span>
                            <div class="text-3xl font-display font-bold text-teal-700 dark:text-teal-300 mt-1">
                                {{ number_format($result['estimated_bags']) }} <span class="text-base font-normal">Bags</span>
                            </div>
                            <span class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 block">@ {{ $result['bag_weight_kg'] }} kg per bag</span>
                        </div>
                    </div>

                    <div class="space-y-3 text-xs md:text-sm border-t border-brand-beige-100 dark:border-teal-900/40 pt-6">
                        <div class="flex justify-between py-1 border-b border-neutral-100 dark:border-teal-900/30">
                            <span class="text-neutral-500 dark:text-neutral-400">Gross Cargo Weight (Cargo + Bag Tare):</span>
                            <span class="font-bold text-neutral-900 dark:text-white">{{ number_format($result['estimated_gross_weight_mt'], 3) }} MT</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-neutral-100 dark:border-teal-900/30">
                            <span class="text-neutral-500 dark:text-neutral-400">Container Tare Weight:</span>
                            <span class="font-bold text-neutral-900 dark:text-white">{{ number_format($result['container_tare_kg'] / 1000, 3) }} MT ({{ number_format($result['container_tare_kg']) }} kg)</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-neutral-100 dark:border-teal-900/30">
                            <span class="text-neutral-500 dark:text-neutral-400">Total Verified Gross Mass (VGM):</span>
                            <span class="font-bold text-teal-600 dark:text-teal-300">{{ number_format($result['total_vgm_mt'], 3) }} MT</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-neutral-100 dark:border-teal-900/30">
                            <span class="text-neutral-500 dark:text-neutral-400">Maximum Permissible Payload Limit:</span>
                            <span class="font-bold text-neutral-900 dark:text-white">{{ number_format($result['max_payload_allowed_mt'], 3) }} MT</span>
                        </div>
                        <div class="flex justify-between py-1">
                            <span class="text-neutral-500 dark:text-neutral-400">Container Volume Capacity:</span>
                            <span class="font-bold text-neutral-900 dark:text-white">{{ $result['container_cbm'] }} Cubic Meters (CBM)</span>
                        </div>
                    </div>

                    <!-- Assumptions and Disclaimers -->
                    <div class="mt-8 p-4 bg-[#032e2b] dark:bg-[#041211] text-white rounded-xl text-xs space-y-2 border border-teal-800/40">
                        <div class="font-bold text-teal-300">Technical Assumptions:</div>
                        <ul class="list-disc list-inside space-y-1 text-teal-100/90">
                            @foreach($result['assumptions'] as $assumption)
                                <li>{{ $assumption }}</li>
                            @endforeach
                        </ul>
                    </div>
                </div>

                <div class="bg-white dark:bg-[#0a1e1c] p-6 rounded-2xl border border-brand-beige-200 dark:border-teal-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h4 class="font-bold text-brand-forest-900 dark:text-white text-sm">Need a binding commercial quotation for this load?</h4>
                        <p class="text-xs text-neutral-500 dark:text-neutral-400">Our export desk prepares proforma invoices matching exact maritime loadings.</p>
                    </div>
                    <a href="{{ route('rfq.create') }}?quantity={{ $result['estimated_net_weight_mt'] }}&unit=Metric Ton (MT)" class="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs rounded-xl transition shadow shrink-0">
                        Request Quote for this Load
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
