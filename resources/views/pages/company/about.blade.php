@extends('layouts.app')

@section('title', 'About Us & Company Profile | Agro Dairy Export LLP')
@section('meta_description', 'Discover Agro Dairy Export LLP: our heritage in Gujarat agriculture, processing infrastructure, global export compliance, and executive leadership team.')

@section('breadcrumbs')
    <x-breadcrumbs :items="['Company Profile' => '']" />
@endsection

@section('content')
<!-- Hero Header -->
<div class="bg-gradient-to-r from-[#033e3a] via-[#00a79d] to-[#022826] text-white py-16 border-b border-teal-800 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
            <span class="text-xs font-bold uppercase tracking-widest text-[#00d9cc]">Our Heritage & Corporate Profile</span>
            <h1 class="text-3xl sm:text-5xl font-extrabold font-heading text-white mt-2 leading-tight">
                Pioneering Agricultural Commodity Exports from India
            </h1>
            <p class="text-sm sm:text-base text-teal-100 mt-4 leading-relaxed">
                Headquartered in Surat, Gujarat with state-of-the-art optical cleaning and processing terminals in Gondal (Dist. Rajkot)—the epicentre of India's groundnut, sesame, and spice production—Agro Dairy Export LLP is an integrated agro-processing enterprise delivering certified, lab-tested commodities across 4 continents under the leadership of J.P. Vora.
            </p>
        </div>
    </div>
</div>

<!-- Mission, Vision & Core Values -->
<section class="py-20 bg-white dark:bg-[#061514] transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-stone-50 dark:bg-[#0a1e1c] p-8 rounded-2xl border border-stone-200 dark:border-teal-900/60 shadow-sm">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00a79d] to-[#033e3a] text-white flex items-center justify-center font-bold text-lg mb-6 shadow">
                    01
                </div>
                <h3 class="text-xl font-bold font-heading text-teal-950 dark:text-white mb-3">Our Mission</h3>
                <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    To reliably connect discerning international food manufacturers and distributors with pure, hygienic, Sortex-cleaned Indian agricultural commodities while fostering sustainable livelihood improvements for our regional farmer network.
                </p>
            </div>

            <div class="bg-stone-50 dark:bg-[#0a1e1c] p-8 rounded-2xl border border-stone-200 dark:border-teal-900/60 shadow-sm">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00a79d] to-[#033e3a] text-white flex items-center justify-center font-bold text-lg mb-6 shadow">
                    02
                </div>
                <h3 class="text-xl font-bold font-heading text-teal-950 dark:text-white mb-3">Our Vision</h3>
                <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    To be recognized globally as India's most dependable agricultural export partner, benchmarked by zero-defect shipments, complete supply chain traceability, and uncompromising ethical conduct.
                </p>
            </div>

            <div class="bg-stone-50 dark:bg-[#0a1e1c] p-8 rounded-2xl border border-stone-200 dark:border-teal-900/60 shadow-sm">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00a79d] to-[#033e3a] text-white flex items-center justify-center font-bold text-lg mb-6 shadow">
                    03
                </div>
                <h3 class="text-xl font-bold font-heading text-teal-950 dark:text-white mb-3">Core Values</h3>
                <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    Zero Adulteration • Rigorous Laboratory Quality Assurance • Contract Honor & Prompt Shipment • Total Traceability • Fair Partnership with Indian Growers.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Company Strategic Advantage & Facilities Showcase -->
<section class="py-20 bg-[#edf5f4]/50 dark:bg-[#081b19] border-y border-stone-200 dark:border-teal-900/40 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-6 space-y-4">
                <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Our Strategic Advantage</span>
                <h2 class="text-3xl font-extrabold font-heading text-teal-950 dark:text-white">
                    Why Global Importers Partner with Agro Dairy Export
                </h2>
                <p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    Our processing facility located in Gondal (Dist. Rajkot) lies at the geographical crossroad of Gujarat's highest yielding peanut and sesame producing mandis. This allows us to inspect and acquire fresh arrivals within hours of farmer harvesting.
                </p>
                <div class="pt-2 space-y-3 text-xs text-stone-700 dark:text-stone-300">
                    <div class="p-3 bg-white dark:bg-[#0a1e1c] rounded-xl border border-stone-200 dark:border-teal-900/50 flex items-center justify-between">
                        <span class="font-bold text-teal-950 dark:text-white">Proximity to Ports</span>
                        <span class="text-stone-500 dark:text-stone-400">220 km to Kandla Port • 270 km to Mundra Port</span>
                    </div>
                    <div class="p-3 bg-white dark:bg-[#0a1e1c] rounded-xl border border-stone-200 dark:border-teal-900/50 flex items-center justify-between">
                        <span class="font-bold text-teal-950 dark:text-white">Sorting Technology</span>
                        <span class="text-stone-500 dark:text-stone-400">Dual Buhler Sortex Optical Color Sorters</span>
                    </div>
                    <div class="p-3 bg-white dark:bg-[#0a1e1c] rounded-xl border border-stone-200 dark:border-teal-900/50 flex items-center justify-between">
                        <span class="font-bold text-teal-950 dark:text-white">Storage Facilities</span>
                        <span class="text-stone-500 dark:text-stone-400">15,000 MT Temperature-Controlled Cold Storage</span>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-6">
                <img src="/images/facility-bg.jpg" alt="Agro Dairy Export Processing Plant" class="rounded-3xl shadow-2xl border border-stone-200 dark:border-teal-900/50 w-full h-[400px] object-cover">
            </div>
        </div>
    </div>
</section>

<!-- Executive Leadership Team -->
<section class="py-20 bg-white dark:bg-[#061514] transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Leadership</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-teal-950 dark:text-white mt-2">
                Executive Leadership & Management
            </h2>
            <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
                Decades of combined expertise in commodity trade, food chemistry, and international maritime logistics.
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            @foreach($team as $member)
                <div class="bg-stone-50 dark:bg-[#0a1e1c] rounded-2xl p-6 border border-stone-200 dark:border-teal-900/60 text-center flex flex-col justify-between shadow-sm">
                    <div>
                        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-[#00a79d] to-[#033e3a] text-white font-heading font-extrabold text-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                            {{ substr($member->name, 0, 1) }}
                        </div>
                        <h3 class="text-base font-bold text-teal-950 dark:text-white font-heading">{{ $member->name }}</h3>
                        <p class="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-0.5">{{ $member->position }}</p>
                        <p class="text-xs text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">{{ $member->bio }}</p>
                    </div>

                    @if($member->email)
                        <div class="mt-4 pt-3 border-t border-stone-200/80 dark:border-teal-900/40">
                            <a href="mailto:{{ $member->email }}" class="text-xs text-teal-800 dark:text-teal-300 hover:underline font-medium">
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
