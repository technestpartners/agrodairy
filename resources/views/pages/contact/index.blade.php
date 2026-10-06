@extends('layouts.app', ['title' => 'Contact Trade Desk & Global Offices - Agro Dairy Export LLP', 'metaDescription' => 'Get in touch with Agro Dairy Export LLP trade desk in Rajkot, Gujarat. Direct telephone, WhatsApp inquiry line, export email, and headquarters location.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Contact Us']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">24/7 International Desk</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Connect with Our International Export Desk</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Connect directly with our regional trade representatives for prompt FOB/CIF price indications, physical samples, and facility visit arrangements.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-brand-beige-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <!-- Contact Details & Office Addresses -->
            <div class="lg:col-span-5 space-y-8">
                <div class="bg-white p-8 rounded-2xl border border-brand-beige-200 shadow-sm space-y-6">
                    <h2 class="text-2xl font-bold font-display text-brand-forest-900">Corporate Headquarters</h2>

                    <div class="space-y-6 text-sm">
                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 rounded-xl bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            </div>
                            <div>
                                <span class="text-xs text-neutral-400 uppercase font-semibold block">Registered Office</span>
                                <p class="text-brand-forest-950 font-medium mt-0.5 leading-relaxed">{{ $headOffice }}</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 rounded-xl bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                            </div>
                            <div>
                                <span class="text-xs text-neutral-400 uppercase font-semibold block">Processing & Sorting Facility</span>
                                <p class="text-brand-forest-950 font-medium mt-0.5 leading-relaxed">{{ $plantAddress }}</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 rounded-xl bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            </div>
                            <div>
                                <span class="text-xs text-neutral-400 uppercase font-semibold block">Official Trade Email</span>
                                <a href="mailto:{{ $primaryEmail }}" class="text-brand-forest-900 font-bold hover:text-brand-gold-600 transition">{{ $primaryEmail }}</a>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 rounded-xl bg-brand-forest-50 text-brand-forest-800 flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                            </div>
                            <div>
                                <span class="text-xs text-neutral-400 uppercase font-semibold block">Telephone & WhatsApp Line</span>
                                <a href="tel:{{ $primaryPhone }}" class="text-brand-forest-900 font-bold hover:text-brand-gold-600 transition block">{{ $primaryPhone }}</a>
                                <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $whatsApp) }}" target="_blank" class="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold mt-1">
                                    <span>Chat on Official WhatsApp</span> &rarr;
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Operating Hours -->
                <div class="bg-brand-forest-900 text-white p-6 rounded-2xl border border-brand-forest-700">
                    <h3 class="text-lg font-bold font-display text-white mb-2">Trade Desk Hours</h3>
                    <p class="text-xs text-brand-beige-200 leading-relaxed mb-4">
                        Monday – Saturday: 09:00 to 19:30 (IST / UTC+5:30)<br>
                        Export WhatsApp hotline active 24/7 for maritime container dispatch emergencies.
                    </p>
                    <div class="text-[11px] text-brand-gold-400 font-mono">
                        Timezone: Indian Standard Time (IST) &bull; GMT +05:30
                    </div>
                </div>
            </div>

            <!-- General Inquiry Form -->
            <div class="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl border border-brand-beige-200 shadow-sm">
                <h2 class="text-2xl font-bold font-display text-brand-forest-900 mb-2">Send Message to Export Desk</h2>
                <p class="text-xs md:text-sm text-neutral-600 mb-8">
                    Looking for product catalog sheets, FOB quotations, or physical sample couriers? Fill out the form below.
                </p>

                <form action="{{ route('contact.submit') }}" method="POST" class="space-y-6">
                    @csrf

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="name" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Full Name *</label>
                            <input type="text" name="name" id="name" value="{{ old('name') }}" required placeholder="e.g. John Doe" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                            @error('name') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                        </div>

                        <div>
                            <label for="company" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Company / Enterprise</label>
                            <input type="text" name="company" id="company" value="{{ old('company') }}" placeholder="e.g. Al-Mansoor Food Trading LLC" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                            @error('company') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="email" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Business Email *</label>
                            <input type="email" name="email" id="email" value="{{ old('email') }}" required placeholder="buyer@company.com" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                            @error('email') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                        </div>

                        <div>
                            <label for="phone" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Phone / WhatsApp Number *</label>
                            <input type="text" name="phone" id="phone" value="{{ old('phone') }}" required placeholder="+971 50 123 4567" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                            @error('phone') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                        </div>
                    </div>

                    <div>
                        <label for="country" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Destination Country *</label>
                        <input type="text" name="country" id="country" value="{{ old('country') }}" required placeholder="e.g. United Arab Emirates, Germany, Vietnam..." class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                        @error('country') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                    </div>

                    <div>
                        <label for="message" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Message / Requirement Details *</label>
                        <textarea name="message" id="message" rows="5" required placeholder="Specify target commodities, grade sizes (e.g. Bold Peanuts 40/50), required quantities in MT, packaging preference, and target discharge port..." class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">{{ old('message') }}</textarea>
                        @error('message') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                    </div>

                    <button type="submit" class="w-full py-4 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-sm rounded-xl transition shadow flex items-center justify-center gap-2">
                        <span>Send Message to Export Desk</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>
@endsection
