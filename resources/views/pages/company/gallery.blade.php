@extends('layouts.app')

@section('title', 'Processing Facilities & Infrastructure Gallery | Agro Dairy Export LLP')
@section('meta_description', 'High resolution visual gallery of Agro Dairy Export LLP: optical color sorting lines, automated packaging cleanrooms, warehouse logistics, and port containerization.')

@section('breadcrumbs')
    <x-breadcrumbs :items="['Company' => route('company.about'), 'Photo Gallery' => '']" />
@endsection

@section('content')
<div class="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white py-16 border-b border-emerald-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
            <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Visual Operations</span>
            <h1 class="text-3xl sm:text-5xl font-extrabold font-heading text-white mt-2 leading-tight">
                Processing Facilities & Operational Gallery
            </h1>
            <p class="text-sm sm:text-base text-stone-300 mt-4 leading-relaxed">
                Take an inside look at our state-of-the-art sorting lines, analytical testing lab, vacuum packaging cleanrooms, and container loading at Mundra port.
            </p>
        </div>
    </div>
</div>

<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="rounded-2xl overflow-hidden border border-stone-200 shadow-sm group">
                <div class="h-64 overflow-hidden bg-stone-100">
                    <img src="/images/facility-bg.jpg" alt="Sortex Optical Color Sorter" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                </div>
                <div class="p-4 bg-stone-50">
                    <h4 class="font-bold text-xs text-stone-900">Buhler Optical Color Sorting Lines</h4>
                    <p class="text-[11px] text-stone-500 mt-0.5">High definition InGaAs cameras detecting discoloration and broken kernels.</p>
                </div>
            </div>

            <div class="rounded-2xl overflow-hidden border border-stone-200 shadow-sm group">
                <div class="h-64 overflow-hidden bg-stone-100">
                    <img src="/images/infrastructure.jpg" alt="Climate Controlled Warehouse" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                </div>
                <div class="p-4 bg-stone-50">
                    <h4 class="font-bold text-xs text-stone-900">Palletized Cold Storage Warehouse</h4>
                    <p class="text-[11px] text-stone-500 mt-0.5">15,000 MT climate-controlled silos preserving commodity freshness.</p>
                </div>
            </div>

            <div class="rounded-2xl overflow-hidden border border-stone-200 shadow-sm group">
                <div class="h-64 overflow-hidden bg-stone-100">
                    <img src="/images/hero-bg.jpg" alt="Port Container Stacking and Ship Loading" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                </div>
                <div class="p-4 bg-stone-50">
                    <h4 class="font-bold text-xs text-stone-900">Mundra Port Containerization</h4>
                    <p class="text-[11px] text-stone-500 mt-0.5">Kraft-lined ocean containers with silica desiccants and phytosanitary seals.</p>
                </div>
            </div>

            <div class="rounded-2xl overflow-hidden border border-stone-200 shadow-sm group">
                <div class="h-64 overflow-hidden bg-stone-100">
                    <img src="/images/about-commodities.jpg" alt="Commodity Quality Inspection" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                </div>
                <div class="p-4 bg-stone-50">
                    <h4 class="font-bold text-xs text-stone-900">Agricultural Trade Exhibition</h4>
                    <p class="text-[11px] text-stone-500 mt-0.5">Showcase of Gujarat export commodities for international buyers.</p>
                </div>
            </div>

            <div class="rounded-2xl overflow-hidden border border-stone-200 shadow-sm group">
                <div class="h-64 overflow-hidden bg-stone-100">
                    <img src="/images/products/bold-peanuts.jpg" alt="Peanut Kernel Inspection" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                </div>
                <div class="p-4 bg-stone-50">
                    <h4 class="font-bold text-xs text-stone-900">Bold Peanut Grading & Screen Caliber</h4>
                    <p class="text-[11px] text-stone-500 mt-0.5">Uniform kernel sizes verified through mechanical vibrating sieves.</p>
                </div>
            </div>

            <div class="rounded-2xl overflow-hidden border border-stone-200 shadow-sm group flex flex-col justify-center items-center p-8 bg-stone-50 text-center">
                <span class="text-3xl text-teal-800 dark:text-teal-400 font-bold mb-2 font-heading">Schedule a Visit</span>
                <p class="text-xs text-stone-600 dark:text-stone-300 mb-4 max-w-xs">We welcome international buyers to inspect our processing, optical sorting, and warehousing facilities in Gondal & Surat, Gujarat.</p>
                <a href="{{ route('contact') }}" class="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs rounded-xl shadow">Book Plant Audit</a>
            </div>
        </div>
    </div>
</section>
@endsection
