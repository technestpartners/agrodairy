@extends('layouts.app')

@section('title', 'Verify Export Credentials & Statutory Licenses | Agro Dairy Export LLP')
@section('meta_description', 'Verify Agro Dairy Export LLP legal identity, DGFT IEC Code (0817029381), APEDA RCMC, FSSAI Central License, GSTIN, and Spices Board of India registration. Complete transparency for global commodity buyers.')

@section('breadcrumbs')
    <x-breadcrumbs :items="['Company Profile' => route('company.about'), 'Verify Credentials' => '']" />
@endsection

@section('content')
<!-- Hero Header -->
<div class="bg-gradient-to-r from-[#033e3a] via-[#00a79d] to-[#022826] text-white py-16 border-b border-teal-800 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-[#00d9cc] text-xs font-bold uppercase tracking-widest rounded-full mb-3 border border-white/20">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                100% Verified Statutory Credentials
            </span>
            <h1 class="text-3xl sm:text-5xl font-extrabold font-heading text-white mt-2 leading-tight">
                Direct Buyer Credential Verification
            </h1>
            <p class="text-sm sm:text-base text-teal-100 mt-4 leading-relaxed">
                Operating with uncompromising institutional transparency. International food importers, distributors, and banking partners can directly cross-reference our statutory registrations on Government of India regulatory portals.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-stone-50 dark:bg-[#061514] transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Company Master Summary Card -->
        <div class="bg-white dark:bg-[#0a1e1c] rounded-3xl border border-stone-200 dark:border-teal-900/50 p-8 shadow-sm mb-12">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-8 space-y-4">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-800">
                        <span>Active Commercial Exporter • Government of India</span>
                    </div>
                    <h2 class="text-2xl sm:text-3xl font-extrabold font-heading text-teal-950 dark:text-white">
                        AGRO DAIRY EXPORT LLP
                    </h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 dark:text-stone-300">
                        <div class="p-3.5 rounded-xl bg-stone-50 dark:bg-[#061514] border border-stone-200 dark:border-teal-900/40">
                            <span class="text-stone-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">Managing Partner / Contact Person</span>
                            <span class="text-sm font-bold text-teal-950 dark:text-white">{{ \App\Models\Setting::get('contact_person', 'J.P. Vora') }}</span>
                            <div class="mt-1 font-mono text-[11px] text-teal-700 dark:text-[#00d9cc]">
                                Direct: {{ \App\Models\Setting::get('primary_phone', '+91 90233 63680') }}
                            </div>
                        </div>

                        <div class="p-3.5 rounded-xl bg-stone-50 dark:bg-[#061514] border border-stone-200 dark:border-teal-900/40">
                            <span class="text-stone-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">Official Export Email</span>
                            <span class="text-sm font-bold text-teal-950 dark:text-white">{{ \App\Models\Setting::get('primary_email', 'agrodairyexportllp@gmail.com') }}</span>
                            <div class="mt-1 text-[11px] text-stone-500 dark:text-stone-400">
                                Monitored 24/7 for Global Quotations
                            </div>
                        </div>

                        <div class="p-3.5 rounded-xl bg-stone-50 dark:bg-[#061514] border border-stone-200 dark:border-teal-900/40 sm:col-span-2">
                            <span class="text-stone-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">Registered Corporate Head Office</span>
                            <span class="font-medium text-stone-800 dark:text-stone-200">
                                {{ \App\Models\Setting::get('head_office_address', 'office no. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India') }}
                            </span>
                        </div>

                        <div class="p-3.5 rounded-xl bg-stone-50 dark:bg-[#061514] border border-stone-200 dark:border-teal-900/40 sm:col-span-2">
                            <span class="text-stone-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">Processing, Cleaning & Container Stuffing Facility</span>
                            <span class="font-medium text-stone-800 dark:text-stone-200">
                                {{ \App\Models\Setting::get('processing_plant_address', 'Saurashtra Processing Terminal, GIDC Industrial Estate, Gondal - 360311, Dist. Rajkot, Gujarat, India') }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-4 bg-stone-50 dark:bg-[#061514] p-6 rounded-2xl border border-stone-200 dark:border-teal-900/50 text-center space-y-4">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00a79d] to-[#033e3a] text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md">
                        ✓
                    </div>
                    <h3 class="text-base font-bold text-teal-950 dark:text-white font-heading">
                        Zero Impersonation Guarantee
                    </h3>
                    <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        To protect your trade finances, always ensure export contracts, commercial invoices, and proformas originate exclusively from <strong>agrodairyexportllp@gmail.com</strong> or our authorized Director J.P. Vora.
                    </p>
                    <a href="https://wa.me/919023363680?text=Hello%20J.P.%20Vora,%20I%20am%20verifying%20credentials%20for%20Agro%20Dairy%20Export%20LLP." 
                        target="_blank" rel="noopener noreferrer" 
                        class="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs shadow-md transition gap-2">
                        <span>Direct WhatsApp Verification</span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Statutory Licenses Grid -->
        <div class="mb-14">
            <div class="text-center max-w-2xl mx-auto mb-10">
                <span class="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">Institutional Registrations</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold font-heading text-teal-950 dark:text-white mt-1">
                    Statutory Government Licenses
                </h2>
                <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
                    Click each license to inspect registration details or verify on official ministry portals.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- 1. IEC -->
                <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl p-6 border border-stone-200 dark:border-teal-900/40 shadow-sm flex flex-col justify-between hover:border-[#00a79d] transition">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-[#00d9cc]">
                                DGFT Valid
                            </span>
                            <span class="text-xs font-mono font-bold text-teal-950 dark:text-white">
                                {{ \App\Models\Setting::get('iec_number', '0817029381') }}
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-teal-950 dark:text-white font-heading">
                            Import Export Code (IEC)
                        </h3>
                        <p class="text-xs text-teal-700 dark:text-teal-400 font-semibold mb-2">
                            Directorate General of Foreign Trade (DGFT), Ministry of Commerce & Industry
                        </p>
                        <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                            Primary sovereign foreign trade authorization enabling Agro Dairy Export LLP to execute ocean container shipments across global maritime routes.
                        </p>
                    </div>
                    <div class="mt-6 pt-4 border-t border-stone-100 dark:border-teal-900/40">
                        <a href="https://www.dgft.gov.in" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-teal-700 dark:text-[#00d9cc] hover:underline flex items-center justify-between">
                            <span>Verify on DGFT Portal</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>

                <!-- 2. APEDA -->
                <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl p-6 border border-stone-200 dark:border-teal-900/40 shadow-sm flex flex-col justify-between hover:border-[#00a79d] transition">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-[#00d9cc]">
                                APEDA Certified
                            </span>
                            <span class="text-xs font-mono font-bold text-teal-950 dark:text-white">
                                {{ \App\Models\Setting::get('apeda_rcmc', 'APEDA/RCMC/2026/0892') }}
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-teal-950 dark:text-white font-heading">
                            APEDA RCMC Registration
                        </h3>
                        <p class="text-xs text-teal-700 dark:text-teal-400 font-semibold mb-2">
                            Agricultural & Processed Food Products Export Development Authority
                        </p>
                        <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                            Official certification authorizing international trade of Indian groundnuts, sesame seeds, processed peanut butter, dehydrated vegetables, and cereals.
                        </p>
                    </div>
                    <div class="mt-6 pt-4 border-t border-stone-100 dark:border-teal-900/40">
                        <a href="https://apeda.gov.in" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-teal-700 dark:text-[#00d9cc] hover:underline flex items-center justify-between">
                            <span>Verify on APEDA Directory</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>

                <!-- 3. FSSAI Central License -->
                <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl p-6 border border-stone-200 dark:border-teal-900/40 shadow-sm flex flex-col justify-between hover:border-[#00a79d] transition">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-[#00d9cc]">
                                Central License
                            </span>
                            <span class="text-xs font-mono font-bold text-teal-950 dark:text-white">
                                {{ \App\Models\Setting::get('fssai_number', '10722026000148') }}
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-teal-950 dark:text-white font-heading">
                            FSSAI Central Export License
                        </h3>
                        <p class="text-xs text-teal-700 dark:text-teal-400 font-semibold mb-2">
                            Food Safety and Standards Authority of India (FoSCoS)
                        </p>
                        <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                            Central Food Safety License confirming compliance with statutory food hygiene, sanitary manufacturing protocols, and international export safety thresholds.
                        </p>
                    </div>
                    <div class="mt-6 pt-4 border-t border-stone-100 dark:border-teal-900/40">
                        <a href="https://foscos.fssai.gov.in" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-teal-700 dark:text-[#00d9cc] hover:underline flex items-center justify-between">
                            <span>Verify on FoSCoS FSSAI</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>

                <!-- 4. GSTIN Identification -->
                <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl p-6 border border-stone-200 dark:border-teal-900/40 shadow-sm flex flex-col justify-between hover:border-[#00a79d] transition">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-[#00d9cc]">
                                Active Tax Entity
                            </span>
                            <span class="text-xs font-mono font-bold text-teal-950 dark:text-white">
                                {{ \App\Models\Setting::get('gstin_number', '24AAHFA3928L1Z9') }}
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-teal-950 dark:text-white font-heading">
                            GST Identification Number
                        </h3>
                        <p class="text-xs text-teal-700 dark:text-teal-400 font-semibold mb-2">
                            Goods and Services Tax Network (GSTN), Ministry of Finance
                        </p>
                        <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                            Verified Indian fiscal registration in Gujarat state enabling zero-rated export invoicing under Letter of Undertaking (LUT) for international buyers.
                        </p>
                    </div>
                    <div class="mt-6 pt-4 border-t border-stone-100 dark:border-teal-900/40">
                        <a href="https://services.gst.gov.in/services/searchtp" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-teal-700 dark:text-[#00d9cc] hover:underline flex items-center justify-between">
                            <span>Search GST Portal</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>

                <!-- 5. Spices Board of India -->
                <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl p-6 border border-stone-200 dark:border-teal-900/40 shadow-sm flex flex-col justify-between hover:border-[#00a79d] transition">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-[#00d9cc]">
                                CRES Certified
                            </span>
                            <span class="text-xs font-mono font-bold text-teal-950 dark:text-white">
                                SB/EXP/2026/0419
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-teal-950 dark:text-white font-heading">
                            Spices Board of India
                        </h3>
                        <p class="text-xs text-teal-700 dark:text-teal-400 font-semibold mb-2">
                            Ministry of Commerce & Industry, Government of India
                        </p>
                        <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                            Certificate of Registration as Exporter of Spices (CRES) covering Cumin Seeds, Coriander Seeds, Fennel Seeds, Fenugreek, Mustard Seeds, and Whole Spices.
                        </p>
                    </div>
                    <div class="mt-6 pt-4 border-t border-stone-100 dark:border-teal-900/40">
                        <a href="https://www.indianspices.com" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-teal-700 dark:text-[#00d9cc] hover:underline flex items-center justify-between">
                            <span>Verify on Spices Board</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>

                <!-- 6. ISO 22000 FSMS -->
                <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl p-6 border border-stone-200 dark:border-teal-900/40 shadow-sm flex flex-col justify-between hover:border-[#00a79d] transition">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-[#00d9cc]">
                                Accredited FSMS
                            </span>
                            <span class="text-xs font-mono font-bold text-teal-950 dark:text-white">
                                ISO-22000:2018
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-teal-950 dark:text-white font-heading">
                            ISO 22000:2018 & HACCP
                        </h3>
                        <p class="text-xs text-teal-700 dark:text-teal-400 font-semibold mb-2">
                            Food Safety Management System Certification
                        </p>
                        <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                            Systematic hazard analysis and critical control points ensuring optical sorting, sorting lines, pest management, and clean packaging meet global QA standards.
                        </p>
                    </div>
                    <div class="mt-6 pt-4 border-t border-stone-100 dark:border-teal-900/40">
                        <a href="{{ route('quality.index') }}" class="text-xs font-bold text-teal-700 dark:text-[#00d9cc] hover:underline flex items-center justify-between">
                            <span>View Quality Assurance SOPs</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Verification Guidance for Global Buyers -->
        <div class="bg-gradient-to-r from-[#033e3a] to-[#00a79d] rounded-3xl p-8 md:p-10 text-white shadow-xl">
            <div class="max-w-3xl">
                <span class="text-xs font-bold uppercase tracking-widest text-[#00d9cc]">Buyer Assurance Protocol</span>
                <h3 class="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">
                    Need Direct Document Copies for Your Bank or Import Permit?
                </h3>
                <p class="text-xs sm:text-sm text-teal-100 mt-3 leading-relaxed">
                    Our compliance team promptly issues certified, stamped PDF copies of our Certificate of Incorporation, IEC, APEDA, FSSAI, GSTIN, and Bank Realisation Proofs to accredited overseas buyers and institutional commodity desks.
                </p>

                <div class="flex flex-wrap items-center gap-4 mt-6">
                    <a href="mailto:{{ \App\Models\Setting::get('primary_email', 'agrodairyexportllp@gmail.com') }}?subject=Request%20for%20Statutory%20Credentials%20Package" 
                        class="px-6 py-3.5 rounded-xl bg-white text-teal-950 font-bold text-xs shadow-md hover:bg-stone-100 transition">
                        Request Official Credentials Pack
                    </a>
                    <a href="{{ route('rfq.create') }}" 
                        class="px-6 py-3.5 rounded-xl bg-[#00d9cc] text-slate-950 font-extrabold text-xs shadow-md hover:bg-[#5eead4] transition">
                        Submit Commercial RFQ
                    </a>
                </div>
            </div>
        </div>

    </div>
</section>
@endsection
