@extends('layouts.app', ['title' => 'Global Export Markets & Destinations - Agro Dairy Export LLP', 'metaDescription' => 'Agro Dairy Export LLP exports agricultural commodities to 45+ countries across Middle East, Europe, Asia Pacific, Africa, and the Americas.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Export Markets']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Worldwide Trade Footprint</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Supplying Premium Indian Harvests Across 45+ Nations</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Operating dedicated ocean trade corridors with verified import regulatory compliance for Middle Eastern, European, Asian, and American commercial buyers.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-brand-beige-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        @forelse($markets as $market)
            <div>
                <div class="flex items-center gap-3 mb-6">
                    <span class="w-3 h-8 bg-brand-forest-800 rounded-sm"></span>
                    <div>
                        <h2 class="text-2xl font-bold font-display text-brand-forest-900">{{ $market->name }}</h2>
                        @if($market->description)
                            <p class="text-xs text-neutral-500 mt-0.5">{{ $market->description }}</p>
                        @endif
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    @forelse($market->countries as $country)
                        <a href="{{ route('markets.country', $country->slug) }}" class="bg-white p-6 rounded-2xl border border-brand-beige-200 shadow-sm hover:border-brand-forest-400 hover:shadow-md transition-all group block">
                            <div class="flex items-center justify-between mb-3">
                                <h3 class="text-lg font-bold text-brand-forest-900 group-hover:text-brand-gold-600 transition-colors">{{ $country->name }}</h3>
                                <span class="font-mono text-xs font-bold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">{{ $country->code }}</span>
                            </div>

                            @if($country->primary_discharge_port)
                                <div class="text-xs text-neutral-500 mb-2">
                                    <span class="text-neutral-400">Primary Port:</span>
                                    <span class="font-medium text-neutral-700">{{ $country->primary_discharge_port }}</span>
                                </div>
                            @endif

                            @if($country->import_requirements_summary)
                                <p class="text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
                                    {{ $country->import_requirements_summary }}
                                </p>
                            @endif

                            <div class="mt-4 pt-3 border-t border-brand-beige-100 flex items-center justify-between text-xs font-bold text-brand-forest-800">
                                <span>Country Trade Profile</span>
                                <span class="group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </div>
                        </a>
                    @empty
                        <div class="col-span-full py-6 text-neutral-500 text-xs">Countries for this region are being updated.</div>
                    @endforelse
                </div>
            </div>
        @empty
            <div class="py-12 text-center text-neutral-500">
                Markets directory is loading.
            </div>
        @endforelse
    </div>
</section>
@endsection
