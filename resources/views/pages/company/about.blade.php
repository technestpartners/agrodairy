@extends('layouts.app')

@section('title', 'About Us & Company Profile | Agro Dairy Export LLP')
@section('meta_description', 'Discover Agro Dairy Export LLP: our heritage in Gujarat agriculture, processing infrastructure, global export compliance, and executive leadership team.')

@section('breadcrumbs')
    <x-breadcrumbs :items="['Company Profile' => '']" />
@endsection

@section('content')
<!-- Hero Header -->
<div class="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white py-16 border-b border-emerald-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
            <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Our Heritage & Corporate Profile</span>
            <h1 class="text-3xl sm:text-5xl font-extrabold font-heading text-white mt-2 leading-tight">
                Pioneering Agricultural Commodity Exports from India
            </h1>
            <p class="text-sm sm:text-base text-stone-300 mt-4 leading-relaxed">
                Headquartered in Rajkot, Gujarat—the epicentre of India's groundnut, sesame, and spice production—Agro Dairy Export LLP is an integrated agro-processing enterprise delivering certified, lab-tested commodities across 4 continents.
            </p>
        </div>
    </div>
</div>

<!-- Mission, Vision & Core Values -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-stone-50 p-8 rounded-2xl border border-stone-200">
                <div class="w-12 h-12 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center font-bold text-lg mb-6 shadow">
                    01
                </div>
                <h3 class="text-xl font-bold font-heading text-emerald-950 mb-3">Our Mission</h3>
                <p class="text-xs text-stone-600 leading-relaxed">
                    To reliably connect discerning international food manufacturers and distributors with pure, hygienic, Sortex-cleaned Indian agricultural commodities while fostering sustainable livelihood improvements for our regional farmer network.
                </p>
            </div>

            <div class="bg-stone-50 p-8 rounded-2xl border border-stone-200">
                <div class="w-12 h-12 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center font-bold text-lg mb-6 shadow">
                    02
                </div>
                <h3 class="text-xl font-bold font-heading text-emerald-950 mb-3">Our Vision</h3>
                <p class="text-xs text-stone-600 leading-relaxed">
                    To be recognized globally as India's most dependable agricultural export partner, benchmarked by zero-defect shipments, complete supply chain traceability, and uncompromising ethical conduct.
                </p>
            </div>

            <div class="bg-stone-50 p-8 rounded-2xl border border-stone-200">
                <div class="w-12 h-12 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center font-bold text-lg mb-6 shadow">
                    03
                </div>
                <h3 class="text-xl font-bold font-heading text-emerald-950 mb-3">Core Values</h3>
                <p class="text-xs text-stone-600 leading-relaxed">
                    Zero Adulteration • Rigorous Laboratory Quality Assurance • Contract Honor & Prompt Shipment • Total Traceability • Fair Partnership with Indian Growers.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Company History & Facilities Showcase -->
<section class="py-20 bg-stone-50 border-y border-stone-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-6 space-y-4">
                <span class="text-xs font-bold uppercase tracking-widest text-emerald-800">Our Strategic Advantage</span>
                <h2 class="text-3xl font-extrabold font-heading text-emerald-950">
                    Why Global Importers Partner with Agro Dairy Export
                </h2>
                <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Our processing facility located in Gondal (Dist. Rajkot) lies at the geographical crossroad of Gujarat's highest yielding peanut and sesame producing mandis. This allows us to inspect and acquire fresh arrivals within hours of farmer harvesting.
                </p>
                <div class="pt-2 space-y-3 text-xs text-stone-700">
                    <div class="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
                        <span class="font-bold text-emerald-950">Proximity to Ports</span>
                        <span class="text-stone-500">220 km to Kandla Port • 270 km to Mundra Port</span>
                    </div>
                    <div class="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
                        <span class="font-bold text-emerald-950">Sorting Technology</span>
                        <span class="text-stone-500">Dual Buhler Sortex Optical Color Sorters</span>
                    </div>
                    <div class="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
                        <span class="font-bold text-emerald-950">Storage Facilities</span>
                        <span class="text-stone-500">15,000 MT Temperature-Controlled Cold Storage</span>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-6">
                <img src="/images/infrastructure.jpg" alt="Agro Dairy Export Processing Plant" class="rounded-3xl shadow-2xl border border-stone-200 w-full h-[400px] object-cover">
            </div>
        </div>
    </div>
</section>

<!-- Executive Leadership Team -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-800">Leadership</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 mt-2">
                Executive Leadership & Management
            </h2>
            <p class="text-xs sm:text-sm text-stone-500 mt-2">
                Decades of combined expertise in commodity trade, food chemistry, and international maritime logistics.
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            @foreach($team as $member)
                <div class="bg-stone-50 rounded-2xl p-6 border border-stone-200 text-center flex flex-col justify-between">
                    <div>
                        <div class="w-20 h-20 rounded-full bg-emerald-900 text-amber-400 font-heading font-extrabold text-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                            {{ substr($member->name, 0, 1) }}
                        </div>
                        <h3 class="text-base font-bold text-emerald-950 font-heading">{{ $member->name }}</h3>
                        <p class="text-xs text-amber-700 font-semibold mt-0.5">{{ $member->position }}</p>
                        <p class="text-xs text-stone-600 mt-3 leading-relaxed">{{ $member->bio }}</p>
                    </div>

                    @if($member->email)
                        <div class="mt-4 pt-3 border-t border-stone-200/80">
                            <a href="mailto:{{ $member->email }}" class="text-xs text-emerald-800 hover:underline font-medium">
                                {{ $member->email }}
                            </a>
                        </div>
                    @endif
                </div>
            @endforeach
        </div>
    </div>
</section>
@endsection
