@extends('layouts.app', ['title' => 'Careers & Culture - Agro Dairy Export LLP', 'metaDescription' => 'Explore global commodity trade careers, QA laboratory roles, and logistics management opportunities at Agro Dairy Export LLP.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Company', 'url' => route('company.about')], ['label' => 'Careers']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Join Our Global Desk</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Grow Your Career in International Agri-Trade</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Be part of India's fast-growing agricultural export corporation connecting certified Saurashtra farm harvests with 45+ countries worldwide.
            </p>
        </div>
    </div>
</div>

<section class="py-16 bg-brand-beige-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div class="bg-white p-8 rounded-2xl border border-brand-beige-200 shadow-sm text-center">
                <div class="w-14 h-14 mx-auto rounded-xl bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center mb-5 text-2xl font-bold">01</div>
                <h3 class="text-lg font-bold text-brand-forest-900 mb-2">Global Market Exposure</h3>
                <p class="text-sm text-neutral-600">Work directly with commercial buyers, trade houses, and supply chain partners across EMEA, APAC, and the Americas.</p>
            </div>
            <div class="bg-white p-8 rounded-2xl border border-brand-beige-200 shadow-sm text-center">
                <div class="w-14 h-14 mx-auto rounded-xl bg-brand-gold-50 text-brand-gold-700 flex items-center justify-center mb-5 text-2xl font-bold">02</div>
                <h3 class="text-lg font-bold text-brand-forest-900 mb-2">World-Class Facilities</h3>
                <p class="text-sm text-neutral-600">State-of-the-art optical Buhler color sorters, ISO/IEC 17025 testing labs, and high-capacity processing terminals.</p>
            </div>
            <div class="bg-white p-8 rounded-2xl border border-brand-beige-200 shadow-sm text-center">
                <div class="w-14 h-14 mx-auto rounded-xl bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center mb-5 text-2xl font-bold">03</div>
                <h3 class="text-lg font-bold text-brand-forest-900 mb-2">Competitive Growth</h3>
                <p class="text-sm text-neutral-600">Performance-driven incentives, international food expo sponsorships (Gulfood, SIAL, Anuga), and continuous development.</p>
            </div>
        </div>

        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-10">
                <h2 class="text-2xl md:text-3xl font-display font-bold text-brand-forest-900">Current Openings</h2>
                <p class="text-neutral-600 mt-2">Explore active positions at our Surat corporate headquarters and Gondal processing plant.</p>
            </div>

            <div class="space-y-4">
                <div class="bg-white p-6 rounded-2xl border border-brand-beige-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-brand-forest-300 transition-colors">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">Full Time</span>
                            <span class="text-xs text-neutral-500">Surat HQ / Hybrid</span>
                        </div>
                        <h4 class="text-lg font-bold text-brand-forest-900">International Agri-Commodity Sales Manager</h4>
                        <p class="text-sm text-neutral-600 mt-1">Responsible for oilseeds and spices export book to Middle East and European accounts. 4+ years experience required.</p>
                    </div>
                    <a href="mailto:agrodairyexportllp@gmail.com?subject=Application: International Sales Manager" class="inline-flex items-center justify-center px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-medium text-sm rounded-xl transition shadow">Apply Now</a>
                </div>

                <div class="bg-white p-6 rounded-2xl border border-brand-beige-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-brand-forest-300 transition-colors">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">Full Time</span>
                            <span class="text-xs text-neutral-500">Processing Plant, Gondal</span>
                        </div>
                        <h4 class="text-lg font-bold text-brand-forest-900">Quality Assurance & Lab Chemist (Aflatoxin / Micro)</h4>
                        <p class="text-sm text-neutral-600 mt-1">Lead pre-shipment sampling, HPLC aflatoxin quantification, and moisture/FFA analysis for container dispatch.</p>
                    </div>
                    <a href="mailto:agrodairyexportllp@gmail.com?subject=Application: QA Lab Chemist" class="inline-flex items-center justify-center px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-medium text-sm rounded-xl transition shadow">Apply Now</a>
                </div>

                <div class="bg-white p-6 rounded-2xl border border-brand-beige-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-brand-forest-300 transition-colors">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">Full Time</span>
                            <span class="text-xs text-neutral-500">Surat / Mundra Gateway</span>
                        </div>
                        <h4 class="text-lg font-bold text-brand-forest-900">Export Documentation & Logistics Executive</h4>
                        <p class="text-sm text-neutral-600 mt-1">Preparation of BL, Phyto certificates, COO, SGS inspection handovers, and customs clearing coordination.</p>
                    </div>
                    <a href="mailto:agrodairyexportllp@gmail.com?subject=Application: Export Documentation Executive" class="inline-flex items-center justify-center px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-medium text-sm rounded-xl transition shadow">Apply Now</a>
                </div>
            </div>

            <div class="mt-12 bg-brand-forest-900 text-white p-8 rounded-2xl text-center">
                <h3 class="text-xl font-bold font-display">Don't see your profile listed?</h3>
                <p class="text-brand-beige-200 text-sm mt-2 max-w-xl mx-auto">We are always eager to meet seasoned commodity traders, agronomists, and logistics specialists. Send your CV and portfolio to our HR department.</p>
                <div class="mt-6">
                    <a href="mailto:hr@agrodairy.com" class="inline-flex items-center px-6 py-3 bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-forest-950 font-bold rounded-xl text-sm transition shadow-lg">
                        Send Resume to hr@agrodairy.com
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
