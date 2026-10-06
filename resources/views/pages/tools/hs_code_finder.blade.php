@extends('layouts.app', ['title' => 'Agricultural HS Code Tariff Directory - Agro Dairy Export LLP', 'metaDescription' => 'Search verified 6-digit & 8-digit Harmonized System (HS) codes for Indian export commodities: Peanuts, Sesame Seeds, Spices, Pulses, and Grains.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Export Tools', 'url' => route('tools.index')], ['label' => 'HS Code Finder']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Customs Tariff Registry</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Agricultural HS Code Directory</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Find correct World Customs Organization (WCO) and Indian ITC-HS 8-digit classification codes for agricultural produce dispatched through Mundra / Kandla ports.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-brand-beige-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Search Form -->
        <div class="bg-white p-6 md:p-8 rounded-2xl border border-brand-beige-200 shadow-sm mb-12">
            <form action="{{ route('tools.hs_code') }}" method="GET" class="flex flex-col sm:flex-row gap-4">
                <div class="relative flex-grow">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                    <input type="text" name="search" value="{{ request('search') }}" placeholder="Search by commodity name or HS code (e.g. Peanuts, 1202, Sesame, Cumin)..." class="w-full pl-10 pr-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800 focus:bg-white">
                </div>
                <button type="submit" class="px-8 py-3 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-sm rounded-xl transition shadow">
                    Search HS Tariff
                </button>
                @if(request('search'))
                    <a href="{{ route('tools.hs_code') }}" class="px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-medium rounded-xl flex items-center justify-center">
                        Clear
                    </a>
                @endif
            </form>
        </div>

        <!-- HS Codes Table -->
        <div class="bg-white rounded-2xl border border-brand-beige-200 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead>
                        <tr class="bg-brand-forest-900 text-white uppercase text-xs tracking-wider">
                            <th class="p-4 font-semibold">ITC-HS Code</th>
                            <th class="p-4 font-semibold">Product Description</th>
                            <th class="p-4 font-semibold">Category</th>
                            <th class="p-4 font-semibold">Standard Customs Specification</th>
                            <th class="p-4 font-semibold text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-brand-beige-200 text-neutral-700">
                        @forelse($hsCodes as $item)
                            <tr class="hover:bg-brand-beige-50 transition-colors">
                                <td class="p-4 font-mono font-bold text-brand-forest-900">{{ $item->hs_code }}</td>
                                <td class="p-4 font-semibold text-neutral-900">{{ $item->product_name }}</td>
                                <td class="p-4 text-xs">
                                    <span class="px-2.5 py-1 bg-brand-forest-50 text-brand-forest-800 font-semibold rounded-full">
                                        {{ $item->category }}
                                    </span>
                                </td>
                                <td class="p-4 text-xs text-neutral-600 max-w-md">{{ $item->standard_description }}</td>
                                <td class="p-4 text-right">
                                    <a href="{{ route('rfq.create') }}?product={{ urlencode($item->product_name) }}" class="text-xs font-bold text-brand-gold-600 hover:text-brand-gold-700 whitespace-nowrap">
                                        Inquire Quote &rarr;
                                    </a>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="p-8 text-center text-neutral-500">
                                    No HS tariff codes found matching "{{ request('search') }}". Please verify spellings or enter a chapter number.
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            @if($hsCodes->hasPages())
                <div class="p-4 border-t border-brand-beige-200 bg-brand-beige-50">
                    {{ $hsCodes->links() }}
                </div>
            @endif
        </div>

        <div class="mt-8 p-4 bg-brand-beige-100 rounded-xl text-xs text-neutral-600">
            <strong>Customs Disclaimer:</strong> HS classifications are provided as an indicative export reference based on Indian ITC-HS 2026 customs schedules. Importers must independently confirm final customs classifications and duty exemptions with licensed customs house agents (CHA) in the destination jurisdiction.
        </div>
    </div>
</section>
@endsection
