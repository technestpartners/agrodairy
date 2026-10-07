@php
    $categories = \App\Models\ProductCategory::active()->orderBy('sort_order')->take(10)->get();
    $companyPhone = \App\Models\Setting::get('primary_phone', '+91 90233 63680');
    $companyEmail = \App\Models\Setting::get('primary_email', 'agrodairyexportllp@gmail.com');
    $whatsAppNumber = \App\Models\Setting::get('whatsapp_number', '+919023363680');
    $cleanWa = preg_replace('/[^0-9]/', '', $whatsAppNumber);
@endphp

<header x-data="{ mobileOpen: false }" class="sticky top-0 z-50 w-full shadow-sm bg-white dark:bg-[#061716] transition-colors duration-200">
    <!-- Top Authority Bar -->
    <div class="bg-gradient-to-r from-[#022825] via-[#033e3a] to-[#022825] dark:from-[#011413] dark:via-[#02201e] dark:to-[#011413] text-stone-300 text-[11px] sm:text-xs py-1.5 sm:py-2 px-4 border-b border-teal-800/40 dark:border-teal-900/60">
        <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <!-- Left Badges -->
            <div class="flex items-center space-x-3 sm:space-x-4">
                <span class="inline-flex items-center space-x-1.5 text-amber-400 font-semibold tracking-wide">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                    <span>Govt. of India Recognized • APEDA: 2026/0892</span>
                </span>
                <span class="hidden md:inline-block text-teal-700">|</span>
                <span class="hidden md:inline-flex items-center space-x-1 text-stone-300">
                    <svg class="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                    <span>Exit Ports: Mundra, Kandla, Pipavav & Hazira</span>
                </span>
            </div>

            <!-- Right Contacts & Admin -->
            <div class="flex items-center space-x-3 sm:space-x-5">
                <a href="mailto:{{ $companyEmail }}" class="hidden sm:flex items-center space-x-1 text-stone-300 hover:text-amber-400 transition">
                    <svg class="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <span>{{ $companyEmail }}</span>
                </a>
                <a href="https://wa.me/{{ $cleanWa }}?text={{ urlencode('Hello Agro Dairy Export team, I am interested in sourcing agricultural commodities.') }}" target="_blank" rel="noopener noreferrer" class="flex items-center space-x-1 text-teal-300 hover:text-amber-400 font-semibold transition">
                    <span class="text-xs">💬</span>
                    <span>WhatsApp: <strong class="text-white">{{ $companyPhone }}</strong></span>
                </a>
                <a href="{{ route('admin.login') }}" class="text-stone-400 hover:text-white transition text-[11px] bg-teal-950/70 hover:bg-teal-900 px-2 py-0.5 rounded border border-teal-700/60 font-medium">
                    Staff Portal
                </a>
            </div>
        </div>
    </div>

    <!-- Main Navigation Bar -->
    <nav class="glass-nav border-b border-stone-200/90 dark:border-teal-950/60 transition-colors duration-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Theme-Wise Authentic Logo -->
                <a href="{{ route('home') }}" class="flex items-center shrink-0 py-2 group">
                    <!-- Light Mode Logo -->
                    <img src="/images/logo-light.png" alt="Agro Dairy Export LLP" class="h-10 sm:h-12 md:h-14 w-auto object-contain transition group-hover:scale-105 block dark:hidden">
                    <!-- Dark Mode Logo -->
                    <img src="/images/logo-dark.png" alt="Agro Dairy Export LLP" class="h-10 sm:h-12 md:h-14 w-auto object-contain transition group-hover:scale-105 hidden dark:block">
                </a>

                <!-- Desktop Navigation Links (Spacious & Clean) -->
                <div class="hidden xl:flex items-center space-x-5 2xl:space-x-7 text-sm font-semibold text-stone-700 dark:text-stone-200">
                    <a href="{{ route('home') }}" class="whitespace-nowrap hover:text-teal-600 dark:hover:text-teal-300 transition py-2 {{ request()->routeIs('home') ? 'text-teal-700 dark:text-teal-400 font-bold' : '' }}">
                        Home
                    </a>

                    <!-- Commodities Dropdown / Mega Menu -->
                    <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <a href="{{ route('products.index') }}" class="whitespace-nowrap flex items-center space-x-1 hover:text-teal-600 dark:hover:text-teal-300 transition py-6 {{ request()->routeIs('products.*') ? 'text-teal-700 dark:text-teal-400 font-bold' : '' }}">
                            <span>Commodities</span>
                            <svg class="w-3.5 h-3.5 text-stone-400 transition-transform duration-200" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </a>

                        <div x-show="open" 
                            x-transition:enter="transition ease-out duration-200"
                            x-transition:enter-start="opacity-0 translate-y-2"
                            x-transition:enter-end="opacity-100 translate-y-0"
                            x-transition:leave="transition ease-in duration-150"
                            x-transition:leave-start="opacity-100 translate-y-0"
                            x-transition:leave-end="opacity-0 translate-y-2"
                            x-cloak
                            class="absolute top-full -left-20 w-[640px] bg-white dark:bg-[#091f1c] rounded-2xl shadow-2xl border border-stone-200 dark:border-teal-800/60 p-6 z-50">
                            
                            <div class="flex items-center justify-between pb-3 mb-4 border-b border-stone-100 dark:border-teal-900/50">
                                <div>
                                    <h4 class="font-heading font-bold text-teal-950 dark:text-teal-100 text-base">Export Commodities Catalogue</h4>
                                    <p class="text-xs text-stone-500 dark:text-stone-400">Optical Sortex cleaned, lab tested, & phytosanitary certified</p>
                                </div>
                                <a href="{{ route('products.index') }}" class="text-xs text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-200 font-bold flex items-center">
                                    All Products →
                                </a>
                            </div>

                            <div class="grid grid-cols-2 gap-2.5">
                                @foreach($categories as $cat)
                                    <a href="{{ route('products.category', $cat->slug) }}" class="flex items-start p-2.5 rounded-xl hover:bg-teal-50/60 dark:hover:bg-teal-950/70 border border-transparent hover:border-teal-200/60 dark:hover:border-teal-800/60 transition group">
                                        <div class="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/80 text-teal-800 dark:text-teal-200 flex items-center justify-center font-bold text-xs shrink-0 mr-3 group-hover:bg-teal-600 group-hover:text-white transition">
                                            {{ substr($cat->name, 0, 1) }}
                                        </div>
                                        <div>
                                            <p class="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition">{{ $cat->name }}</p>
                                            <p class="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">{{ $cat->short_description }}</p>
                                        </div>
                                    </a>
                                @endforeach
                            </div>
                        </div>
                    </div>

                    <!-- Quality & Traceability Dropdown -->
                    <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button type="button" class="whitespace-nowrap flex items-center space-x-1 hover:text-teal-600 dark:hover:text-teal-300 transition py-6 {{ request()->routeIs('quality.*', 'certifications.*', 'traceability.*') ? 'text-teal-700 dark:text-teal-400 font-bold' : '' }}">
                            <span>Quality & Traceability</span>
                            <svg class="w-3.5 h-3.5 text-stone-400 transition-transform duration-200" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        <div x-show="open" x-cloak class="absolute top-full left-0 w-64 bg-white dark:bg-[#091f1c] rounded-xl shadow-2xl border border-stone-200 dark:border-teal-800/60 py-2.5 z-50">
                            <a href="{{ route('quality.index') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">Quality Assurance Standards</a>
                            <a href="{{ route('certifications.index') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">APEDA & FSSAI Certifications</a>
                            <a href="{{ route('traceability.index') }}" class="block px-4 py-2.5 text-xs font-bold text-teal-900 dark:text-teal-200 bg-teal-50/80 dark:bg-teal-950/90 hover:bg-teal-100 dark:hover:bg-teal-900 border-t border-teal-100 dark:border-teal-900 mt-1">
                                🔍 Batch Traceability Lookup
                            </a>
                        </div>
                    </div>

                    <!-- Logistics & Packaging -->
                    <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button type="button" class="whitespace-nowrap flex items-center space-x-1 hover:text-teal-600 dark:hover:text-teal-300 transition py-6 {{ request()->routeIs('packaging.*', 'logistics.*') ? 'text-teal-700 dark:text-teal-400 font-bold' : '' }}">
                            <span>Logistics & Packaging</span>
                            <svg class="w-3.5 h-3.5 text-stone-400 transition-transform duration-200" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        <div x-show="open" x-cloak class="absolute top-full left-0 w-60 bg-white dark:bg-[#091f1c] rounded-xl shadow-2xl border border-stone-200 dark:border-teal-800/60 py-2.5 z-50">
                            <a href="{{ route('packaging.index') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">Packaging Types & Bulk Bags</a>
                            <a href="{{ route('logistics.index') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">Ports & Mixed Containers</a>
                        </div>
                    </div>

                    <a href="{{ route('markets.index') }}" class="whitespace-nowrap hover:text-teal-600 dark:hover:text-teal-300 transition py-2 {{ request()->routeIs('markets.*') ? 'text-teal-700 dark:text-teal-400 font-bold' : '' }}">
                        Export Markets
                    </a>

                    <!-- Export Tools Dropdown -->
                    <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button type="button" class="whitespace-nowrap flex items-center space-x-1 hover:text-teal-600 dark:hover:text-teal-300 transition py-6 {{ request()->routeIs('tools.*') ? 'text-teal-700 dark:text-teal-400 font-bold' : '' }}">
                            <span>Export Tools</span>
                            <svg class="w-3.5 h-3.5 text-stone-400 transition-transform duration-200" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        <div x-show="open" x-cloak class="absolute top-full left-0 w-64 bg-white dark:bg-[#091f1c] rounded-xl shadow-2xl border border-stone-200 dark:border-teal-800/60 py-2.5 z-50">
                            <a href="{{ route('tools.container_calculator') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">Container Load Calculator</a>
                            <a href="{{ route('tools.landed_cost') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">Landed Cost (CIF) Estimator</a>
                            <a href="{{ route('tools.hs_codes') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">HS Code Tariff Directory</a>
                            <a href="{{ route('tools.crop_calendar') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">Indian Crop Calendar</a>
                            <a href="{{ route('tools.unit_converter') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">Agricultural Unit Converter</a>
                        </div>
                    </div>

                    <!-- Company Dropdown -->
                    <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button type="button" class="whitespace-nowrap flex items-center space-x-1 hover:text-teal-600 dark:hover:text-teal-300 transition py-6 {{ request()->routeIs('company.*', 'blogs.*') ? 'text-teal-700 dark:text-teal-400 font-bold' : '' }}">
                            <span>Company</span>
                            <svg class="w-3.5 h-3.5 text-stone-400 transition-transform duration-200" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        <div x-show="open" x-cloak class="absolute top-full right-0 w-64 bg-white dark:bg-[#091f1c] rounded-xl shadow-2xl border border-stone-200 dark:border-teal-800/60 py-2.5 z-50">
                            <a href="{{ route('company.about') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">About Us & Mission</a>
                            <a href="{{ route('company.verify') }}" class="block px-4 py-2 text-xs font-bold text-teal-800 dark:text-[#00d9cc] bg-teal-50/50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/60">✓ Verify Credentials (IEC / APEDA)</a>
                            <a href="{{ route('company.infrastructure') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">Processing & Warehouse</a>
                            <a href="{{ route('company.farmer_network') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">Farmer Sourcing Network</a>
                            <a href="{{ route('company.gallery') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">Facilities Gallery</a>
                            <a href="{{ route('company.trade_shows') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">Trade Shows & Fairs</a>
                            <a href="{{ route('blogs.index') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">Market Insights Blog</a>
                            <a href="{{ route('company.careers') }}" class="block px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-teal-50 dark:hover:bg-teal-950/70 hover:text-teal-800 dark:hover:text-teal-200">Careers</a>
                        </div>
                    </div>

                    <a href="{{ route('contact') }}" class="whitespace-nowrap hover:text-teal-600 dark:hover:text-teal-300 transition py-2 {{ request()->routeIs('contact') ? 'text-teal-700 dark:text-teal-400 font-bold' : '' }}">
                        Contact
                    </a>
                </div>

                <!-- Action CTA & Theme Switcher & Mobile Trigger -->
                <div class="flex items-center space-x-2 sm:space-x-3 shrink-0">
                    <!-- Theme Toggle Button (Light / Dark) -->
                    <button type="button" 
                        @click="$store.theme.toggle()" 
                        class="p-2 sm:p-2.5 rounded-xl text-stone-600 dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-200 hover:bg-stone-100 dark:hover:bg-teal-950/80 border border-stone-200 dark:border-teal-800/60 transition focus:outline-none shrink-0"
                        :title="$store.theme.current === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
                        aria-label="Toggle Color Theme">
                        <!-- Sun icon (shown when dark mode is active) -->
                        <svg x-show="$store.theme.current === 'dark'" class="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                        <!-- Moon icon (shown when light mode is active) -->
                        <svg x-show="$store.theme.current !== 'dark'" class="w-4 h-4 sm:w-5 sm:h-5 text-teal-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                    </button>

                    <!-- RFQ CTA Button -->
                    <button type="button" 
                        @click="$dispatch('open-rfq-modal', {})"
                        class="whitespace-nowrap inline-flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-[11px] sm:text-xs py-2 sm:py-2.5 px-2.5 sm:px-5 rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 shrink-0 border border-amber-400">
                        <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        <span class="hidden sm:inline">Request Quote (RFQ)</span>
                        <span class="inline sm:hidden font-bold">RFQ</span>
                    </button>

                    <!-- Mobile Hamburger -->
                    <button type="button" @click="mobileOpen = !mobileOpen" class="xl:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:text-teal-900 dark:hover:text-teal-200 hover:bg-stone-100 dark:hover:bg-teal-950/60 transition focus:outline-none" aria-label="Toggle navigation">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" x-show="!mobileOpen"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" x-show="mobileOpen" x-cloak><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Drawer -->
        <div x-show="mobileOpen" 
             x-transition:enter="transition ease-out duration-200"
             x-transition:enter-start="opacity-0 -translate-y-2"
             x-transition:enter-end="opacity-100 translate-y-0"
             x-transition:leave="transition ease-in duration-150"
             x-transition:leave-start="opacity-100 translate-y-0"
             x-transition:leave-end="opacity-0 -translate-y-2"
             x-cloak 
             class="xl:hidden bg-white dark:bg-[#061716] border-b border-stone-200 dark:border-teal-950 px-5 pt-3 pb-8 space-y-1 shadow-xl max-h-[80vh] overflow-y-auto">
            
            <!-- Mobile Branded Header & Theme Toggle -->
            <div class="flex items-center justify-between py-2 px-1 border-b border-stone-100 dark:border-teal-950/80 mb-2">
                <a href="{{ route('home') }}" class="flex items-center">
                    <img src="/images/logo-light.png" alt="Agro Dairy Export LLP" class="h-10 w-auto object-contain block dark:hidden">
                    <img src="/images/logo-dark.png" alt="Agro Dairy Export LLP" class="h-10 w-auto object-contain hidden dark:block">
                </a>
                <button type="button" 
                    @click="$store.theme.toggle()" 
                    class="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-[#0c2220] text-xs font-bold border border-stone-200 dark:border-teal-800/80 text-stone-800 dark:text-teal-200">
                    <span x-text="$store.theme.current === 'dark' ? '🌙 Dark' : '☀️ Light'"></span>
                </button>
            </div>

            <a href="{{ route('home') }}" class="flex items-center justify-between py-2.5 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-teal-600 dark:hover:text-teal-300 border-b border-stone-100 dark:border-teal-950">
                <span>Home</span>
                <span class="text-xs text-stone-400">→</span>
            </a>
            <a href="{{ route('products.index') }}" class="flex items-center justify-between py-2.5 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-teal-600 dark:hover:text-teal-300 border-b border-stone-100 dark:border-teal-950">
                <span>Commodities Catalogue</span>
                <span class="text-xs text-stone-400">→</span>
            </a>
            <a href="{{ route('quality.index') }}" class="flex items-center justify-between py-2.5 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-teal-600 dark:hover:text-teal-300 border-b border-stone-100 dark:border-teal-950">
                <span>Quality Assurance & Standards</span>
                <span class="text-xs text-stone-400">→</span>
            </a>
            <a href="{{ route('certifications.index') }}" class="flex items-center justify-between py-2.5 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-teal-600 dark:hover:text-teal-300 border-b border-stone-100 dark:border-teal-950">
                <span>Certifications (APEDA / FSSAI)</span>
                <span class="text-xs text-stone-400">→</span>
            </a>
            <a href="{{ route('traceability.index') }}" class="flex items-center justify-between py-2.5 text-sm font-bold text-teal-900 dark:text-teal-200 bg-teal-50 dark:bg-teal-950/80 px-3 rounded-xl border border-teal-200/60 dark:border-teal-800/60 my-1">
                <span>🔍 Batch Traceability Lookup</span>
                <span class="text-xs text-teal-600 dark:text-teal-400 font-normal">Instant</span>
            </a>
            <a href="{{ route('packaging.index') }}" class="flex items-center justify-between py-2.5 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-teal-600 dark:hover:text-teal-300 border-b border-stone-100 dark:border-teal-950">
                <span>Packaging Solutions</span>
                <span class="text-xs text-stone-400">→</span>
            </a>
            <a href="{{ route('logistics.index') }}" class="flex items-center justify-between py-2.5 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-teal-600 dark:hover:text-teal-300 border-b border-stone-100 dark:border-teal-950">
                <span>Shipping & Ports</span>
                <span class="text-xs text-stone-400">→</span>
            </a>
            <a href="{{ route('markets.index') }}" class="flex items-center justify-between py-2.5 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-teal-600 dark:hover:text-teal-300 border-b border-stone-100 dark:border-teal-950">
                <span>Export Markets (40+ Countries)</span>
                <span class="text-xs text-stone-400">→</span>
            </a>
            <a href="{{ route('tools.index') }}" class="flex items-center justify-between py-2.5 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-teal-600 dark:hover:text-teal-300 border-b border-stone-100 dark:border-teal-950">
                <span>Export Tools & Calculators</span>
                <span class="text-xs text-stone-400">→</span>
            </a>
            <a href="{{ route('company.about') }}" class="flex items-center justify-between py-2.5 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-teal-600 dark:hover:text-teal-300 border-b border-stone-100 dark:border-teal-950">
                <span>About Company & Infrastructure</span>
                <span class="text-xs text-stone-400">→</span>
            </a>
            <a href="{{ route('company.verify') }}" class="flex items-center justify-between py-2.5 text-sm font-bold text-amber-600 dark:text-[#00d9cc] hover:text-teal-600 dark:hover:text-teal-300 border-b border-stone-100 dark:border-teal-950">
                <span>✓ Verify Credentials (IEC / APEDA)</span>
                <span class="text-xs text-stone-400">→</span>
            </a>
            <a href="{{ route('blogs.index') }}" class="flex items-center justify-between py-2.5 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-teal-600 dark:hover:text-teal-300 border-b border-stone-100 dark:border-teal-950">
                <span>Market Insights Blog</span>
                <span class="text-xs text-stone-400">→</span>
            </a>
            <a href="{{ route('contact') }}" class="flex items-center justify-between py-2.5 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-teal-600 dark:hover:text-teal-300">
                <span>Contact Us</span>
                <span class="text-xs text-stone-400">→</span>
            </a>

            <div class="pt-4 border-t border-stone-200 dark:border-teal-950">
                <button type="button" @click="$dispatch('open-rfq-modal', {}); mobileOpen = false;" class="w-full text-center py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-extrabold rounded-xl text-sm shadow border border-amber-400">
                    Request Quotation (RFQ)
                </button>
            </div>
        </div>
    </nav>
</header>
