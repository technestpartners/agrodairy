@extends('layouts.app')

@section('title', 'Processing Infrastructure & Facilities | Agro Dairy Export LLP')
@section('meta_description', 'Tour our state-of-the-art optical color sorting plants, temperature-controlled warehouses, and analytical testing laboratories in Gondal and Surat, Gujarat.')

@section('breadcrumbs')
    <x-breadcrumbs :items="['Company' => route('company.about'), 'Infrastructure & Facilities' => '']" />
@endsection

@section('content')
<!-- Hero Header -->
<div class="bg-gradient-to-r from-[#033e3a] via-[#00a79d] to-[#022826] text-white py-16 border-b border-teal-800 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
            <span class="inline-block px-3 py-1 bg-white/10 text-[#00d9cc] text-xs font-bold uppercase tracking-widest rounded-full mb-3 border border-white/20">Processing Facilities</span>
            <h1 class="text-3xl sm:text-5xl font-extrabold font-heading text-white mt-2 leading-tight">
                Modern Processing Infrastructure & Warehousing
            </h1>
            <p class="text-sm sm:text-base text-teal-100 mt-4 leading-relaxed">
                Clean room processing, high-definition optical sorting, and large-scale climate-controlled storage designed to preserve the agricultural purity of every export batch.
            </p>
        </div>
    </div>
</div>

<section class="py-20 bg-stone-50 dark:bg-[#061514] transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-16">
            @foreach($items as $index => $item)
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center {{ $index % 2 === 1 ? 'lg:flex-row-reverse' : '' }}">
                    <div class="lg:col-span-6 {{ $index % 2 === 1 ? 'lg:order-2' : '' }}">
                        <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-[#00d9cc] bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
                            {{ ucfirst($item->category) }} Facility
                        </span>
                        <h2 class="text-2xl sm:text-3xl font-extrabold font-heading text-teal-950 dark:text-white mt-3">
                            {{ $item->title }}
                        </h2>
                        <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-4 leading-relaxed">
                            {{ $item->description }}
                        </p>

                        <div class="mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-stone-200 dark:border-teal-900/40">
                            @if($item->capacity)
                                <div class="bg-white dark:bg-[#0a1e1c] p-3 rounded-xl border border-stone-200 dark:border-teal-900/50">
                                    <span class="block text-[11px] text-stone-400 font-semibold uppercase">Capacity:</span>
                                    <strong class="text-xs text-teal-950 dark:text-teal-200">{{ $item->capacity }}</strong>
                                </div>
                            @endif
                            @if($item->location)
                                <div class="bg-white dark:bg-[#0a1e1c] p-3 rounded-xl border border-stone-200 dark:border-teal-900/50">
                                    <span class="block text-[11px] text-stone-400 font-semibold uppercase">Location:</span>
                                    <strong class="text-xs text-teal-950 dark:text-teal-200">{{ $item->location }}</strong>
                                </div>
                            @endif
                        </div>
                    </div>

                    <div class="lg:col-span-6 {{ $index % 2 === 1 ? 'lg:order-1' : '' }}">
                        <img src="/images/facility-bg.jpg" alt="{{ $item->title }}" class="rounded-3xl shadow-xl border border-stone-200 dark:border-teal-900/50 w-full h-80 object-cover">
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>
@endsection
