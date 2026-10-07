@extends('layouts.app', ['title' => 'Official Certifications & Registrations - Agro Dairy Export LLP', 'metaDescription' => 'Verify Agro Dairy Export LLP statutory and international certifications: APEDA, FSSAI, ISO 22000, Spices Board of India, Halal, Kosher, and US FDA facility registration.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Quality Assurance', 'url' => route('quality.index')], ['label' => 'Certifications']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Audit-Verified Credentials</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Statutory & International Food Safety Certifications</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Operating in strict adherence with India's export promotion authorities and global food hygiene management frameworks. No unverified claims — inspect registered certificate records below.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-brand-beige-50 dark:bg-[#061514] transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @forelse($certifications as $cert)
                <div class="bg-white dark:bg-[#0a1e1c] rounded-2xl border border-brand-beige-200 dark:border-teal-900/40 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-teal-500 transition-all">
                    <div class="p-6 md:p-8">
                        <div class="flex items-center justify-between mb-4">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold {{ $cert->status === 'active' ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300' : 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300' }}">
                                <span class="w-1.5 h-1.5 rounded-full {{ $cert->status === 'active' ? 'bg-teal-500' : 'bg-amber-500' }} mr-1.5"></span>
                                {{ ucfirst($cert->status) }}
                            </span>
                            @if($cert->certificate_number)
                                <span class="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400">{{ $cert->certificate_number }}</span>
                            @endif
                        </div>

                        <h3 class="text-xl font-bold font-display text-brand-forest-900 dark:text-white mb-2">{{ $cert->name }}</h3>
                        <p class="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-4">{{ $cert->issuing_body }}</p>

                        @if($cert->description)
                            <p class="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{{ $cert->description }}</p>
                        @endif

                        <div class="mt-6 pt-6 border-t border-brand-beige-100 dark:border-teal-900/40 space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                            @if($cert->issue_date)
                                <div class="flex justify-between">
                                    <span class="text-neutral-400 dark:text-neutral-500">Date of Registration:</span>
                                    <span class="font-medium text-neutral-800 dark:text-neutral-200">{{ $cert->issue_date->format('d M, Y') }}</span>
                                </div>
                            @endif
                            @if($cert->expiry_date)
                                <div class="flex justify-between">
                                    <span class="text-neutral-400 dark:text-neutral-500">Validity Expiry:</span>
                                    <span class="font-medium text-neutral-800 dark:text-neutral-200">{{ $cert->expiry_date->format('d M, Y') }}</span>
                                </div>
                            @endif
                        </div>
                    </div>

                    <div class="bg-brand-beige-100/60 dark:bg-[#061514] p-4 border-t border-brand-beige-200 dark:border-teal-900/40 flex items-center justify-between">
                        @if($cert->verification_url)
                            <a href="{{ $cert->verification_url }}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1">
                                <span>Verify at Authority Portal</span>
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                            </a>
                        @else
                            <span class="text-[11px] text-neutral-500 dark:text-neutral-400">Government Registry Record</span>
                        @endif

                        <a href="{{ route('rfq.create') }}" class="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline">Request Copy &rarr;</a>
                    </div>
                </div>
            @empty
                <div class="col-span-full py-12 text-center text-neutral-500 dark:text-neutral-400">
                    Certifications records are being synchronized.
                </div>
            @endforelse
        </div>

        <div class="mt-16 bg-white dark:bg-[#0a1e1c] p-8 md:p-10 rounded-2xl border border-brand-beige-200 dark:border-teal-900/40 shadow-sm">
            <h3 class="text-xl font-bold font-display text-brand-forest-900 dark:text-white mb-3">Notice on Compliance Transparency</h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                In strict compliance with statutory international trade regulations, Agro Dairy Export LLP provides full un-redacted copies of our RCMC (Registration-Cum-Membership Certificate), APEDA membership, FSSAI Central License, and GSTIN certificates to verified commercial buyers alongside contract proforma documentation. We never fabricate certifications or make unauthorized claims.
            </p>
            <div class="mt-6 flex flex-wrap gap-4 items-center">
                <a href="{{ route('rfq.create') }}" class="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs rounded-xl transition shadow">
                    Request Complete Compliance Pack
                </a>
                <a href="{{ route('contact') }}" class="px-5 py-2.5 bg-brand-beige-100 dark:bg-[#061514] hover:bg-brand-beige-200 dark:hover:bg-[#081a18] text-brand-forest-900 dark:text-white font-medium text-xs rounded-xl transition border border-brand-beige-300 dark:border-teal-900/60">
                    Contact Trade Desk
                </a>
            </div>
        </div>
    </div>
</section>
@endsection
