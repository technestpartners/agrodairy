@extends('layouts.app')

@section('title', 'Farmer Network & Ethical Procurement | Agro Dairy Export LLP')
@section('meta_description', 'Direct contract farming partnerships across 12,500+ Indian farmers in Saurashtra and Gujarat, supporting sustainable agriculture and high-purity harvests.')

@section('breadcrumbs')
    <x-breadcrumbs :items="['Company' => route('company.about'), 'Farmer Sourcing Network' => '']" />
@endsection

@section('content')
<div class="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white py-16 border-b border-emerald-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
            <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Ethical Direct Sourcing</span>
            <h1 class="text-3xl sm:text-5xl font-extrabold font-heading text-white mt-2 leading-tight">
                Empowering Over 12,500+ Contracted Indian Farmers
            </h1>
            <p class="text-sm sm:text-base text-stone-300 mt-4 leading-relaxed">
                By purchasing directly from growers in Gujarat without intermediaries, Agro Dairy Export LLP ensures fair crop pricing, timely payments, and complete traceability from the field soil to the container.
            </p>
        </div>
    </div>
</div>

<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div class="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                <span class="text-3xl font-extrabold text-emerald-900 font-heading">12,500+</span>
                <h3 class="text-base font-bold text-stone-900 mt-1">Growers Enrolled</h3>
                <p class="text-xs text-stone-600 mt-2">Active contract farmers spread across Rajkot, Junagadh, Amreli, Jamnagar, and Bhavnagar districts.</p>
            </div>
            <div class="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                <span class="text-3xl font-extrabold text-emerald-900 font-heading">45,000+ Ha</span>
                <h3 class="text-base font-bold text-stone-900 mt-1">Cultivated Farmland</h3>
                <p class="text-xs text-stone-600 mt-2">Certified acreage under integrated pest management (IPM) and regulated pesticide protocols.</p>
            </div>
            <div class="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                <span class="text-3xl font-extrabold text-emerald-900 font-heading">0% Middlemen</span>
                <h3 class="text-base font-bold text-stone-900 mt-1">Direct Procurement</h3>
                <p class="text-xs text-stone-600 mt-2">Transparent digital mandi weighing scales and direct bank settlement guaranteeing integrity.</p>
            </div>
        </div>

        <div class="bg-stone-50 rounded-3xl p-8 sm:p-12 border border-stone-200">
            <h2 class="text-2xl font-bold font-heading text-emerald-950 mb-4">Agronomic Training & Sustainable Harvest Practices</h2>
            <p class="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                Our in-house agronomy field staff conducts pre-sowing workshops on certified seed selection, non-chemical pest management, and post-harvest drying techniques. Crucially, farmers are trained in moisture management and proper pod harvesting to prevent mold and mycotoxin formation at the root level.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
                <div class="bg-white p-4 rounded-xl border border-stone-200">
                    <strong class="text-emerald-900 block mb-1">Aflatoxin Prevention at Source:</strong>
                    Harvesting under dry conditions with rapid sun-curing on clean tarpaulins to restrict pod moisture below 8%.
                </div>
                <div class="bg-white p-4 rounded-xl border border-stone-200">
                    <strong class="text-emerald-900 block mb-1">Pesticide Residue Management:</strong>
                    Strict adherence to EU / Codex Maximum Residue Limits (MRL) through bio-fertilizer and organic compost advisories.
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
