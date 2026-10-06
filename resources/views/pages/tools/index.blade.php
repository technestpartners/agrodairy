@extends('layouts.app', ['title' => 'International Export Tools & Calculators - Agro Dairy Export LLP', 'metaDescription' => 'Practical export utilities for global commodity traders: Container payload estimator, landed cost calculator, agricultural HS code finder, Saurashtra crop calendar, and unit converter.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Export Tools']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Commercial Intelligence</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Agricultural Export Decision Calculators & Utilities</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Streamline container logistics planning, landed cost estimations, customs HS tariff identification, and harvesting cycles with our specialized trade calculators.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-brand-beige-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- 1. Container Calculator -->
            <div class="bg-white p-8 rounded-2xl border border-brand-beige-200 shadow-sm hover:border-brand-forest-400 transition-all flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center font-bold text-xl mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    </div>
                    <h3 class="text-xl font-bold font-display text-brand-forest-900 mb-2">Container Load Calculator</h3>
                    <p class="text-xs text-neutral-600 leading-relaxed mb-6">
                        Calculate exact bag counts, gross weight limits, and payload distribution for 20ft and 40ft containers across various packaging options.
                    </p>
                </div>
                <a href="{{ route('tools.container') }}" class="inline-flex items-center justify-between w-full px-5 py-3 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-xs rounded-xl transition shadow">
                    <span>Open Load Calculator</span>
                    <span>&rarr;</span>
                </a>
            </div>

            <!-- 2. Landed Cost Calculator -->
            <div class="bg-white p-8 rounded-2xl border border-brand-beige-200 shadow-sm hover:border-brand-forest-400 transition-all flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-brand-gold-50 text-brand-gold-700 flex items-center justify-center font-bold text-xl mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <h3 class="text-xl font-bold font-display text-brand-forest-900 mb-2">Landed Cost Calculator</h3>
                    <p class="text-xs text-neutral-600 leading-relaxed mb-6">
                        Model complete FOB/CIF economics including ocean freight, marine insurance, port handling, and import customs tariff duties.
                    </p>
                </div>
                <a href="{{ route('tools.landed_cost') }}" class="inline-flex items-center justify-between w-full px-5 py-3 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-xs rounded-xl transition shadow">
                    <span>Open Cost Calculator</span>
                    <span>&rarr;</span>
                </a>
            </div>

            <!-- 3. HS Code Finder -->
            <div class="bg-white p-8 rounded-2xl border border-brand-beige-200 shadow-sm hover:border-brand-forest-400 transition-all flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center font-bold text-xl mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                    <h3 class="text-xl font-bold font-display text-brand-forest-900 mb-2">Agri HS Code Tariff Finder</h3>
                    <p class="text-xs text-neutral-600 leading-relaxed mb-6">
                        Search verified 6-digit and 8-digit Harmonized System customs tariff codes for peanuts, sesame, pulses, spices, and dehydrated crops.
                    </p>
                </div>
                <a href="{{ route('tools.hs_code') }}" class="inline-flex items-center justify-between w-full px-5 py-3 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-xs rounded-xl transition shadow">
                    <span>Search HS Codes</span>
                    <span>&rarr;</span>
                </a>
            </div>

            <!-- 4. Crop Harvesting Calendar -->
            <div class="bg-white p-8 rounded-2xl border border-brand-beige-200 shadow-sm hover:border-brand-forest-400 transition-all flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center font-bold text-xl mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <h3 class="text-xl font-bold font-display text-brand-forest-900 mb-2">Saurashtra Crop Calendar</h3>
                    <p class="text-xs text-neutral-600 leading-relaxed mb-6">
                        Review seasonal sowing periods, peak arrival months, and year-round export availability windows for Gujarat agricultural harvests.
                    </p>
                </div>
                <a href="{{ route('tools.crop_calendar') }}" class="inline-flex items-center justify-between w-full px-5 py-3 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-xs rounded-xl transition shadow">
                    <span>View Crop Calendar</span>
                    <span>&rarr;</span>
                </a>
            </div>

            <!-- 5. Unit Converter -->
            <div class="bg-white p-8 rounded-2xl border border-brand-beige-200 shadow-sm hover:border-brand-forest-400 transition-all flex flex-col justify-between">
                <div>
                    <div class="w-12 h-12 rounded-xl bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center font-bold text-xl mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                    </div>
                    <h3 class="text-xl font-bold font-display text-brand-forest-900 mb-2">Commodity Unit Converter</h3>
                    <p class="text-xs text-neutral-600 leading-relaxed mb-6">
                        Convert seamlessly between Metric Tons (MT), Kilograms (Kg), Pounds (Lbs), Quintals, Bags, and Bushels for trade contracts.
                    </p>
                </div>
                <a href="{{ route('tools.unit_converter') }}" class="inline-flex items-center justify-between w-full px-5 py-3 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-xs rounded-xl transition shadow">
                    <span>Launch Unit Converter</span>
                    <span>&rarr;</span>
                </a>
            </div>

            <!-- Forex Reference Card -->
            <div class="bg-brand-forest-900 text-white p-8 rounded-2xl border border-brand-forest-700 flex flex-col justify-between">
                <div>
                    <span class="text-xs font-bold uppercase text-brand-gold-400 tracking-wider">Financial Benchmark</span>
                    <h3 class="text-xl font-bold font-display text-white mt-1 mb-2">Indicative FX Benchmark</h3>
                    <p class="text-xs text-brand-beige-200 mb-6">
                        Base Currency: <strong>USD</strong> &bull; Verified benchmark indicative rates for commercial quotation modeling.
                    </p>

                    <div class="space-y-2 text-xs">
                        @if(isset($forexData['rates']))
                            <div class="flex justify-between py-1 border-b border-brand-forest-800">
                                <span>USD / INR</span>
                                <span class="font-mono font-bold text-brand-gold-400">₹{{ number_format($forexData['rates']['INR'] ?? 86.5, 2) }}</span>
                            </div>
                            <div class="flex justify-between py-1 border-b border-brand-forest-800">
                                <span>USD / EUR</span>
                                <span class="font-mono font-bold text-brand-gold-400">€{{ number_format($forexData['rates']['EUR'] ?? 0.92, 4) }}</span>
                            </div>
                            <div class="flex justify-between py-1 border-b border-brand-forest-800">
                                <span>USD / AED</span>
                                <span class="font-mono font-bold text-brand-gold-400">د.إ {{ number_format($forexData['rates']['AED'] ?? 3.67, 2) }}</span>
                            </div>
                        @endif
                    </div>
                </div>

                <div class="mt-6 text-[11px] text-brand-beige-400">
                    Source: {{ $forexData['source'] ?? 'RBI / Central Exchange Reference' }}
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
