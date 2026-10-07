@extends('layouts.app', ['title' => 'Saurashtra Crop Harvesting & Sowing Calendar - Agro Dairy Export LLP', 'metaDescription' => 'Monthly harvest cycles, arrival peaks, and export shipment windows for Gujarat agricultural commodities: Peanuts, Sesame, Cumin, Coriander, and Pulses.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Export Tools', 'url' => route('tools.index')], ['label' => 'Crop Calendar']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Agronomy Timeline</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Saurashtra Crop & Harvesting Calendar</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Plan forward commercial procurement around seasonal monsoon (Kharif) and winter (Rabi) harvest arrivals across Gujarat's agricultural belts.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-brand-beige-50 dark:bg-[#061514] transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl border border-brand-beige-200 dark:border-teal-900/40 shadow-sm overflow-hidden mb-12">
            <div class="overflow-x-auto table-responsive-container">
                <table class="w-full min-w-[620px] text-left text-xs md:text-sm">
                    <thead>
                        <tr class="bg-[#032e2b] dark:bg-[#041211] text-white uppercase text-xs tracking-wider">
                            <th class="p-4 font-semibold">Commodity</th>
                            <th class="p-4 font-semibold">Farming Region</th>
                            <th class="p-4 font-semibold">Sowing Season</th>
                            <th class="p-4 font-semibold">Peak Harvest Arrivals</th>
                            <th class="p-4 font-semibold">Export Availability</th>
                            <th class="p-4 font-semibold text-right">Inquiry</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-brand-beige-200 dark:divide-teal-900/40 text-neutral-700 dark:text-neutral-300">
                        @forelse($calendar as $crop)
                            <tr class="hover:bg-brand-beige-50 dark:hover:bg-[#061514]/70 transition-colors">
                                <td class="p-4 font-bold text-brand-forest-900 dark:text-white">{{ $crop->product_name }}</td>
                                <td class="p-4 text-neutral-600 dark:text-neutral-400">{{ $crop->region }}</td>
                                <td class="p-4">
                                    <span class="px-2.5 py-1 bg-brand-beige-100 dark:bg-teal-950/60 text-neutral-800 dark:text-teal-200 rounded font-medium text-xs">
                                        {{ $crop->sowing_months }}
                                    </span>
                                </td>
                                <td class="p-4">
                                    <span class="px-2.5 py-1 bg-teal-50 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60 rounded font-bold text-xs">
                                        {{ $crop->harvest_months }}
                                    </span>
                                </td>
                                <td class="p-4 text-neutral-600 dark:text-neutral-400">{{ $crop->export_availability }}</td>
                                <td class="p-4 text-right">
                                    <a href="{{ route('rfq.create') }}?product={{ urlencode($crop->product_name) }}" class="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline">
                                        Book Forward &rarr;
                                    </a>
                                </td>
                            </tr>
                        @empty
                            <!-- Fallback standard crops -->
                            <tr class="hover:bg-brand-beige-50 dark:hover:bg-[#061514]/70">
                                <td class="p-4 font-bold text-brand-forest-900 dark:text-white">Bold & Java Peanuts (Kharif)</td>
                                <td class="p-4 dark:text-neutral-400">Saurashtra, Gujarat</td>
                                <td class="p-4 dark:text-neutral-400">Jun - Jul</td>
                                <td class="p-4 font-bold text-teal-700 dark:text-teal-300">Oct - Dec</td>
                                <td class="p-4 dark:text-neutral-400">Round the Year (Cold Storage)</td>
                                <td class="p-4 text-right"><a href="{{ route('rfq.create') }}" class="font-bold text-teal-600 dark:text-teal-400">Inquire &rarr;</a></td>
                            </tr>
                            <tr class="hover:bg-brand-beige-50 dark:hover:bg-[#061514]/70">
                                <td class="p-4 font-bold text-brand-forest-900 dark:text-white">Summer Peanuts (Zaid)</td>
                                <td class="p-4 dark:text-neutral-400">Saurashtra, Gujarat</td>
                                <td class="p-4 dark:text-neutral-400">Feb - Mar</td>
                                <td class="p-4 font-bold text-teal-700 dark:text-teal-300">May - Jun</td>
                                <td class="p-4 dark:text-neutral-400">Jun - Oct</td>
                                <td class="p-4 text-right"><a href="{{ route('rfq.create') }}" class="font-bold text-teal-600 dark:text-teal-400">Inquire &rarr;</a></td>
                            </tr>
                            <tr class="hover:bg-brand-beige-50 dark:hover:bg-[#061514]/70">
                                <td class="p-4 font-bold text-brand-forest-900 dark:text-white">Natural White Sesame</td>
                                <td class="p-4 dark:text-neutral-400">Gujarat / Rajasthan</td>
                                <td class="p-4 dark:text-neutral-400">Jul - Aug</td>
                                <td class="p-4 font-bold text-teal-700 dark:text-teal-300">Oct - Nov</td>
                                <td class="p-4 dark:text-neutral-400">Round the Year</td>
                                <td class="p-4 text-right"><a href="{{ route('rfq.create') }}" class="font-bold text-teal-600 dark:text-teal-400">Inquire &rarr;</a></td>
                            </tr>
                            <tr class="hover:bg-brand-beige-50 dark:hover:bg-[#061514]/70">
                                <td class="p-4 font-bold text-brand-forest-900 dark:text-white">Cumin Seeds (Jeera)</td>
                                <td class="p-4 dark:text-neutral-400">Unjha / Saurashtra</td>
                                <td class="p-4 dark:text-neutral-400">Oct - Nov</td>
                                <td class="p-4 font-bold text-teal-700 dark:text-teal-300">Feb - Apr</td>
                                <td class="p-4 dark:text-neutral-400">Round the Year</td>
                                <td class="p-4 text-right"><a href="{{ route('rfq.create') }}" class="font-bold text-teal-600 dark:text-teal-400">Inquire &rarr;</a></td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        <div class="bg-[#032e2b] dark:bg-[#041211] text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-teal-800/40">
            <div>
                <h3 class="text-xl font-bold font-display">Need forward crop contract booking?</h3>
                <p class="text-teal-100/80 text-xs md:text-sm mt-1 max-w-xl">
                    Agro Dairy Export offers institutional buyers advance harvest hedging and scheduled multi-container dispatch contracts during peak arrival months.
                </p>
            </div>
            <a href="{{ route('rfq.create') }}" class="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs rounded-xl transition shadow shrink-0">
                Book Advance Harvest Contract
            </a>
        </div>
    </div>
</section>
@endsection
