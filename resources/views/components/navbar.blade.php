@php
    $categories = \App\Models\ProductCategory::active()->orderBy('sort_order')->take(8)->get();
    $companyPhone = \App\Models\Setting::get('primary_phone', '+91 98250 12345');
    $companyEmail = \App\Models\Setting::get('primary_email', 'exports@agrodairy.com');
    $whatsAppNumber = \App\Models\Setting::get('whatsapp_number', '+919825012345');
    $cleanWa = preg_replace('/[^0-9]/', '', $whatsAppNumber);
@endphp

<header x-data="{ mobileOpen: false, productsOpen: false, companyOpen: false, toolsOpen: false }" class="sticky top-0 z-40 w-full shadow-sm">
    <!-- Top Authority Bar -->
    <div class="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-950 text-stone-300 text-xs py-2 px-4 border-b border-emerald-800/40">
        <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <div class="flex items-center space-x-4">
                <span class="inline-flex items-center space-x-1 text-amber-400 font-medium">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    <span>Govt. of India Recognized • APEDA Reg: 2026/0892</span>
                </span>
                <span class="hidden md:inline-block text-stone-500">|</span>
                <span class="hidden md:inline-flex items-center space-x-1">
                    <span>Loading Ports: Mundra (INMUN) & Kandla (INIXY)</span>
                </span>
            </div>

            <div class="flex items-center space-x-4">
                <a href="mailto:{{ $companyEmail }}" class="hover:text-amber-400 transition flex items-center space-x-1">
                    <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <span>{{ $companyEmail }}</span>
                </a>
                <a href="https://wa.me/{{ $cleanWa }}?text={{ urlencode('Hello Agro Dairy Export team, I am interested in sourcing agricultural commodities.') }}" target="_blank" class="hover:text-amber-400 text-emerald-400 font-semibold transition flex items-center space-x-1">
                    <span>WhatsApp Trade Desk: {{ $companyPhone }}</span>
                </a>
                <a href="{{ route('admin.login') }}" class="text-stone-400 hover:text-white transition text-[11px] bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/50">
                    Admin
                </a>
            </div>
        </div>
    </div>

    <!-- Main Navigation Bar -->
    <nav class="glass-nav border-b border-stone-200/80 transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Logo -->
                <a href="{{ route('home') }}" class="flex items-center space-x-3 shrink-0">
                    <img src="/images/logo.png" alt="Agro Dairy Export LLP" class="h-14 w-auto object-contain">
                    <div class="hidden sm:block">
                        <span class="block text-xs uppercase tracking-widest text-emerald-800 font-semibold">Agricultural Commodities</span>
                        <span class="block text-[11px] text-stone-500 font-medium">Global Export Excellence • India</span>
                    </div>
                </a>

                <!-- Desktop Navigation Links -->
                <div class="hidden xl:flex items-center space-x-6 text-sm font-semibold text-stone-700">
                    <a href="{{ route('home') }}" class="hover:text-emerald-800 transition {{ request()->routeIs('home') ? 'text-emerald-800' : '' }}">
                        Home
                    </a>

                    <!-- Commodities Dropdown / Mega Menu Trigger -->
                    <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <a href="{{ route('products.index') }}" class="flex items-center space-x-1 hover:text-emerald-800 transition py-6 {{ request()->routeIs('products.*') ? 'text-emerald-800' : '' }}">
                            <span>Commodities</span>
                            <svg class="w-4 h-4 text-stone-400 transition transform" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </a>

                        <div x-show="open" 
                            x-transition:enter="transition ease-out duration-200"
                            x-transition:enter-start="opacity-0 translate-y-2"
                            x-transition:enter-end="opacity-100 translate-y-0"
                            x-transition:leave="transition ease-in duration-150"
                            x-transition:leave-start="opacity-100 translate-y-0"
                            x-transition:leave-end="opacity-0 translate-y-2"
                            x-cloak
                            class="absolute top-full -left-20 w-[640px] bg-white rounded-2xl shadow-2xl border border-stone-200/90 p-6 z-50">
                            
                            <div class="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
                                <div>
                                    <h4 class="font-heading font-bold text-emerald-950 text-base">Export Commodities Catalogue</h4>
                                    <p class="text-xs text-stone-500">Mechanically cleaned, Sortex sorted & lab certified</p>
                                </div>
                                <a href="{{ route('products.index') }}" class="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center">
                                    All Products →
                                </a>
                            </div>

                            <div class="grid grid-cols-2 gap-3">
                                @foreach($categories as $cat)
                                    <a href="{{ route('products.category', $cat->slug) }}" class="flex items-start p-2.5 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-200/80 transition group">
                                        <div class="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mr-3 group-hover:bg-emerald-800 group-hover:text-white transition">
                                            {{ substr($cat->name, 0, 1) }}
                                        </div>
                                        <div>
                                            <p class="text-xs font-bold text-stone-900 group-hover:text-emerald-800 transition">{{ $cat->name }}</p>
                                            <p class="text-[11px] text-stone-500 line-clamp-1">{{ $cat->short_description }}</p>
                                        </div>
                                    </a>
                                @endforeach
                            </div>
                        </div>
                    </div>

                    <!-- Company Dropdown -->
                    <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button class="flex items-center space-x-1 hover:text-emerald-800 transition py-6">
                            <span>Company</span>
                            <svg class="w-4 h-4 text-stone-400 transition transform" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        <div x-show="open" x-cloak class="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-stone-200/90 py-2 z-50">
                            <a href="{{ route('company.about') }}" class="block px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-900">About Us & Mission</a>
                            <a href="{{ route('company.infrastructure') }}" class="block px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-900">Processing & Warehouse</a>
                            <a href="{{ route('company.farmer_network') }}" class="block px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-900">Farmer Sourcing Network</a>
                            <a href="{{ route('company.trade_shows') }}" class="block px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-900">Global Trade Shows</a>
                            <a href="{{ route('company.gallery') }}" class="block px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-900">Facilities Gallery</a>
                            <a href="{{ route('company.careers') }}" class="block px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-900">Careers</a>
                        </div>
                    </div>

                    <!-- Quality & Traceability -->
                    <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button class="flex items-center space-x-1 hover:text-emerald-800 transition py-6">
                            <span>Quality & Traceability</span>
                            <svg class="w-4 h-4 text-stone-400 transition transform" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        <div x-show="open" x-cloak class="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-stone-200/90 py-2 z-50">
                            <a href="{{ route('quality.index') }}" class="block px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-900">Quality Assurance Policy</a>
                            <a href="{{ route('certifications.index') }}" class="block px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-900">Certifications Gallery (APEDA/FSSAI)</a>
                            <a href="{{ route('traceability.index') }}" class="block px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100/70 font-bold">
                                🔍 Lot Traceability Lookup
                            </a>
                        </div>
                    </div>

                    <a href="{{ route('packaging.index') }}" class="hover:text-emerald-800 transition">Packaging</a>
                    <a href="{{ route('markets.index') }}" class="hover:text-emerald-800 transition">Markets</a>
                    <a href="{{ route('logistics.index') }}" class="hover:text-emerald-800 transition">Logistics</a>

                    <!-- Tools Dropdown -->
                    <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button class="flex items-center space-x-1 hover:text-emerald-800 transition py-6">
                            <span>Export Tools</span>
                            <svg class="w-4 h-4 text-stone-400 transition transform" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        <div x-show="open" x-cloak class="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-stone-200/90 py-2 z-50">
                            <a href="{{ route('tools.container_calculator') }}" class="block px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-900">Container Load Calculator</a>
                            <a href="{{ route('tools.landed_cost') }}" class="block px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-900">Landed Cost Calculator</a>
                            <a href="{{ route('tools.hs_codes') }}" class="block px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-900">HS Code Finder</a>
                            <a href="{{ route('tools.crop_calendar') }}" class="block px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-900">Indian Crop Calendar</a>
                            <a href="{{ route('tools.unit_converter') }}" class="block px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-900">Agricultural Unit Converter</a>
                        </div>
                    </div>

                    <a href="{{ route('blogs.index') }}" class="hover:text-emerald-800 transition">Market Blog</a>
                    <a href="{{ route('contact') }}" class="hover:text-emerald-800 transition">Contact</a>
                </div>

                <!-- Action CTA & Mobile Trigger -->
                <div class="flex items-center space-x-3">
                    <button type="button" 
                        @click="$dispatch('open-rfq-modal', {})"
                        class="hidden sm:inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-900 to-emerald-800 hover:from-emerald-950 hover:to-emerald-900 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-md transition duration-200 border border-emerald-700/60">
                        <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        <span>Request Quote</span>
                    </button>

                    <!-- Mobile Hamburger -->
                    <button type="button" @click="mobileOpen = !mobileOpen" class="xl:hidden p-2 rounded-lg text-stone-600 hover:text-emerald-900 hover:bg-stone-100 transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Drawer -->
        <div x-show="mobileOpen" x-cloak class="xl:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-2">
            <a href="{{ route('home') }}" class="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-800">Home</a>
            <a href="{{ route('products.index') }}" class="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-800">Commodities Catalogue</a>
            <a href="{{ route('company.about') }}" class="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-800">About Us & Team</a>
            <a href="{{ route('quality.index') }}" class="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-800">Quality Assurance</a>
            <a href="{{ route('certifications.index') }}" class="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-800">Certifications (APEDA/FSSAI)</a>
            <a href="{{ route('traceability.index') }}" class="block py-2 text-sm font-bold text-emerald-800">🔍 Batch Traceability</a>
            <a href="{{ route('tools.index') }}" class="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-800">Export Calculators</a>
            <a href="{{ route('packaging.index') }}" class="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-800">Packaging Solutions</a>
            <a href="{{ route('markets.index') }}" class="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-800">Export Markets</a>
            <a href="{{ route('logistics.index') }}" class="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-800">Shipping & Logistics</a>
            <a href="{{ route('blogs.index') }}" class="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-800">Market Blog</a>
            <a href="{{ route('contact') }}" class="block py-2 text-sm font-semibold text-stone-800 hover:text-emerald-800">Contact Us</a>

            <div class="pt-4 border-t border-stone-200">
                <button type="button" @click="$dispatch('open-rfq-modal', {}); mobileOpen = false;" class="w-full text-center py-3 bg-emerald-900 text-white font-bold rounded-xl text-sm shadow">
                    Request Quotation (RFQ)
                </button>
            </div>
        </div>
    </nav>
</header>
