@extends('layouts.app')

@section('title', 'Processing Infrastructure & Facilities | Agro Dairy Export LLP')
@section('meta_description', 'Tour our state-of-the-art optical color sorting plants, temperature-controlled warehouses, and analytical testing laboratories in Gondal and Rajkot, Gujarat.')

@section('breadcrumbs')
    <x-breadcrumbs :items="['Company' => route('company.about'), 'Infrastructure & Facilities' => '']" />
@endsection

@section('content')
<div class="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white py-16 border-b border-emerald-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
            <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Processing Facilities</span>
            <h1 class="text-3xl sm:text-5xl font-extrabold font-heading text-white mt-2 leading-tight">
                Modern Processing Infrastructure & Warehousing
            </h1>
            <p class="text-sm sm:text-base text-stone-300 mt-4 leading-relaxed">
                Clean room processing, high-definition optical sorting, and large-scale climate-controlled storage designed to preserve the agricultural purity of every export batch.
            </p>
        </div>
    </div>
</div>

<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-16">
            @foreach($items as $index => $item)
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center {{ $index % 2 === 1 ? 'lg:flex-row-reverse' : '' }}">
                    <div class="lg:col-span-6 {{ $index % 2 === 1 ? 'lg:order-2' : '' }}">
                        <span class="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                            {{ ucfirst($item->category) }} Facility
                        </span>
                        <h2 class="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-950 mt-3">
                            {{ $item->title }}
                        </h2>
                        <p class="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed">
                            {{ $item->description }}
                        </p>

                        <div class="mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                            @if($item->capacity)
                                <div class="bg-stone-50 p-3 rounded-xl border border-stone-200">
                                    <span class="block text-[11px] text-stone-400 font-semibold uppercase">Capacity:</span>
                                    <strong class="text-xs text-emerald-950">{{ $item->capacity }}</strong>
                                </div>
                            @endif
                            @if($item->location)
                                <div class="bg-stone-50 p-3 rounded-xl border border-stone-200">
                                    <span class="block text-[11px] text-stone-400 font-semibold uppercase">Location:</span>
                                    <strong class="text-xs text-emerald-950">{{ $item->location }}</strong>
                                </div>
                            @endif
                        </div>
                    </div>

                    <div class="lg:col-span-6 {{ $index % 2 === 1 ? 'lg:order-1' : '' }}">
                        <img src="/images/facility-bg.jpg" alt="{{ $item->title }}" class="rounded-3xl shadow-xl border border-stone-200 w-full h-80 object-cover">
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>
@endsection
