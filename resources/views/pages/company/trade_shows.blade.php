@extends('layouts.app')

@section('title', 'International Trade Shows & Exhibitions | Agro Dairy Export LLP')
@section('meta_description', 'Meet Agro Dairy Export LLP representatives at premier global food and commodity trade exhibitions including Gulfood Dubai, SIAL Paris, and Anuga Germany.')

@section('breadcrumbs')
    <x-breadcrumbs :items="['Company' => route('company.about'), 'Trade Shows & Exhibitions' => '']" />
@endsection

@section('content')
<div class="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white py-16 border-b border-emerald-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
            <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Global Trade Engagement</span>
            <h1 class="text-3xl sm:text-5xl font-extrabold font-heading text-white mt-2 leading-tight">
                International Exhibitions & Trade Delegations
            </h1>
            <p class="text-sm sm:text-base text-stone-300 mt-4 leading-relaxed">
                Connect directly with our export directors at key international food trade shows worldwide to discuss long-term supply contracts, crop projections, and private label requirements.
            </p>
        </div>
    </div>
</div>

<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <!-- Event 1: Gulfood -->
            <div class="bg-stone-50 rounded-2xl p-8 border border-stone-200 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 bg-emerald-900 text-amber-400 text-xs font-bold rounded-full">
                            Dubai, UAE
                        </span>
                        <span class="text-xs font-semibold text-stone-500">World Trade Centre</span>
                    </div>
                    <h3 class="text-2xl font-bold font-heading text-emerald-950">Gulfood Dubai</h3>
                    <p class="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                        The world’s largest annual food and beverage sourcing event. Visit our pavilion in the Pulses, Grains & Cereals hall to sample new crop Bold Peanuts, Hulled Sesame Seeds, and Indian Spices.
                    </p>
                </div>
                <div class="mt-6 pt-4 border-t border-stone-200">
                    <button type="button" @click="$dispatch('open-rfq-modal', { productName: 'Gulfood Trade Meeting' })" class="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center">
                        Schedule Booth Meeting →
                    </button>
                </div>
            </div>

            <!-- Event 2: SIAL -->
            <div class="bg-stone-50 rounded-2xl p-8 border border-stone-200 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 bg-emerald-900 text-amber-400 text-xs font-bold rounded-full">
                            Paris, France
                        </span>
                        <span class="text-xs font-semibold text-stone-500">Paris Nord Villepinte</span>
                    </div>
                    <h3 class="text-2xl font-bold font-heading text-emerald-950">SIAL Paris</h3>
                    <p class="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                        European benchmark exhibition highlighting certified food ingredients, low-aflatoxin groundnut kernels, and organic-grade sesame seeds.
                    </p>
                </div>
                <div class="mt-6 pt-4 border-t border-stone-200">
                    <button type="button" @click="$dispatch('open-rfq-modal', { productName: 'SIAL Trade Meeting' })" class="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center">
                        Schedule Booth Meeting →
                    </button>
                </div>
            </div>
        </div>

        <div class="text-center bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
            <h3 class="text-xl font-bold text-emerald-950 font-heading">Plan Your Sourcing Discussion</h3>
            <p class="text-xs text-stone-600 mt-1 max-w-lg mx-auto">
                Will your procurement team be visiting upcoming food trade expos? Pre-book an executive conference with our management.
            </p>
            <div class="mt-5">
                <a href="{{ route('contact') }}" class="inline-block px-6 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-xs rounded-xl shadow">
                    Book Meeting with Trade Directors
                </a>
            </div>
        </div>
    </div>
</section>
@endsection
