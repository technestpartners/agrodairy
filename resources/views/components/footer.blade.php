@php
    $categories = \App\Models\ProductCategory::active()->orderBy('sort_order')->take(6)->get();
    $companyEmail = \App\Models\Setting::get('primary_email', 'exports@agrodairy.com');
    $companyPhone = \App\Models\Setting::get('primary_phone', '+91 98250 12345');
    $headOffice = \App\Models\Setting::get('head_office_address', 'Highway Food Agro Park, Rajkot, Gujarat, India');
    $plantOffice = \App\Models\Setting::get('processing_plant_address', 'GIDC Industrial Estate, Gondal, Gujarat, India');
    $iecCode = \App\Models\Setting::get('iec_code', '0817029381');
    $apedaReg = \App\Models\Setting::get('apeda_rcmc', 'APEDA/RCMC/2026/0892');
    $fssaiLic = \App\Models\Setting::get('fssai_licence', '10722026000148');
    $gstin = \App\Models\Setting::get('gstin', '24AAHFA3928L1Z9');
    $whatsAppNumber = \App\Models\Setting::get('whatsapp_number', '+919825012345');
    $cleanWa = preg_replace('/[^0-9]/', '', $whatsAppNumber);
@endphp

<footer class="bg-gradient-to-b from-stone-900 to-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Top Authority & Newsletter Row -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-stone-800 items-center">
            <div class="lg:col-span-6">
                <span class="text-xs font-semibold uppercase tracking-widest text-amber-400">Trade Intelligence & Price Bulletins</span>
                <h3 class="text-2xl font-bold font-heading text-white mt-1">Subscribe to Indian Crop & Export Reports</h3>
                <p class="text-xs text-stone-400 mt-2 max-w-lg leading-relaxed">
                    Receive bi-weekly agricultural market updates, Saurashtra harvest arrivals, FOB Mundra benchmarks, and shipping logistics updates.
                </p>
            </div>
            <div class="lg:col-span-6">
                <form action="{{ route('newsletter.subscribe') }}" method="POST" class="flex flex-col sm:flex-row gap-2">
                    @csrf
                    <input type="email" name="email" required placeholder="Enter corporate email..." class="bg-stone-800 border-stone-700 text-sm text-white rounded-xl px-4 py-3 focus:border-amber-400 focus:ring-amber-400 flex-1 placeholder-stone-500">
                    <button type="submit" class="bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs px-6 py-3 rounded-xl transition duration-200 border border-emerald-600 shrink-0">
                        Subscribe Bulletin
                    </button>
                </form>
            </div>
        </div>

        <!-- Main Links Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-stone-800">
            <!-- Col 1: Corporate Profile -->
            <div class="lg:col-span-2 space-y-4">
                <div class="flex items-center space-x-3">
                    <img src="/images/logo.png" alt="Agro Dairy Export LLP" class="h-16 w-auto brightness-110">
                    <div>
                        <span class="block text-sm font-bold text-white uppercase tracking-wider font-heading">Agro Dairy Export LLP</span>
                        <span class="block text-xs text-stone-400">Government of India Recognized Export House</span>
                    </div>
                </div>

                <p class="text-xs text-stone-400 leading-relaxed max-w-md">
                    Premier processor and merchant exporter of Indian agricultural commodities including Peanuts, Sesame Seeds, Whole Spices, Pulses, Kabuli Chickpeas, and Dehydrated Vegetables. Direct farm procurement in Gujarat with automated Buhler Sortex optical cleaning.
                </p>

                <!-- Statutory Credentials Badge Box -->
                <div class="bg-stone-800/80 rounded-xl p-3 border border-stone-700/80 text-[11px] space-y-1 text-stone-300">
                    <div class="flex justify-between">
                        <span class="text-stone-400">IEC Registration:</span>
                        <strong class="text-white">{{ $iecCode }}</strong>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-stone-400">APEDA RCMC No.:</span>
                        <strong class="text-emerald-400">{{ $apedaReg }}</strong>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-stone-400">FSSAI Central Licence:</span>
                        <strong class="text-white">{{ $fssaiLic }}</strong>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-stone-400">GSTIN Identification:</span>
                        <strong class="text-white">{{ $gstin }}</strong>
                    </div>
                </div>
            </div>

            <!-- Col 2: Commodities -->
            <div>
                <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4 font-heading">Core Commodities</h4>
                <ul class="space-y-2.5 text-xs text-stone-400">
                    @foreach($categories as $cat)
                        <li>
                            <a href="{{ route('products.category', $cat->slug) }}" class="hover:text-white transition flex items-center">
                                <span class="mr-1 text-emerald-500">›</span> {{ $cat->name }}
                            </a>
                        </li>
                    @endforeach
                    <li>
                        <a href="{{ route('products.index') }}" class="text-emerald-400 hover:text-emerald-300 font-semibold mt-2 inline-block">
                            Browse All Products →
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Col 3: Quality, Compliance & Tools -->
            <div>
                <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4 font-heading">Quality & Tools</h4>
                <ul class="space-y-2.5 text-xs text-stone-400">
                    <li><a href="{{ route('quality.index') }}" class="hover:text-white transition">Quality Policy & Standards</a></li>
                    <li><a href="{{ route('certifications.index') }}" class="hover:text-white transition">Certifications Gallery</a></li>
                    <li><a href="{{ route('traceability.index') }}" class="text-emerald-400 hover:text-emerald-300 font-bold transition flex items-center"><span class="mr-1">🔍</span> Lot Traceability Lookup</a></li>
                    <li><a href="{{ route('tools.container_calculator') }}" class="hover:text-white transition">Container Load Calculator</a></li>
                    <li><a href="{{ route('tools.landed_cost') }}" class="hover:text-white transition">Landed Cost Calculator</a></li>
                    <li><a href="{{ route('tools.hs_codes') }}" class="hover:text-white transition">HS Code Reference Finder</a></li>
                    <li><a href="{{ route('tools.crop_calendar') }}" class="hover:text-white transition">Indian Crop Seasons Calendar</a></li>
                    <li><a href="{{ route('logistics.index') }}" class="hover:text-white transition">Port & Shipping Guidelines</a></li>
                </ul>
            </div>

            <!-- Col 4: Corporate Contact -->
            <div>
                <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4 font-heading">Contact Export Desk</h4>
                <div class="space-y-3 text-xs text-stone-400">
                    <div>
                        <span class="block text-stone-500 text-[11px] font-semibold">Head Office:</span>
                        <p class="text-stone-300 leading-snug">{{ $headOffice }}</p>
                    </div>
                    <div>
                        <span class="block text-stone-500 text-[11px] font-semibold">Processing Plant:</span>
                        <p class="text-stone-300 leading-snug">{{ $plantOffice }}</p>
                    </div>
                    <div>
                        <span class="block text-stone-500 text-[11px] font-semibold">Email:</span>
                        <a href="mailto:{{ $companyEmail }}" class="text-emerald-400 hover:underline">{{ $companyEmail }}</a>
                    </div>
                    <div>
                        <span class="block text-stone-500 text-[11px] font-semibold">WhatsApp Desk:</span>
                        <a href="https://wa.me/{{ $cleanWa }}" target="_blank" class="text-amber-400 hover:underline font-semibold">{{ $companyPhone }}</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Copyright & Port Notice -->
        <div class="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 gap-4">
            <p>© {{ date('Y') }} Agro Dairy Export LLP. All Rights Reserved. Sourcing from Gujarat, India to the World.</p>
            <div class="flex items-center space-x-4">
                <span>Primary Ports: Mundra Port (INMUN) & Kandla (INIXY)</span>
                <span>•</span>
                <a href="{{ route('sitemap') }}" class="hover:text-stone-300 transition">XML Sitemap</a>
                <span>•</span>
                <a href="{{ route('admin.login') }}" class="hover:text-stone-300 transition">Staff Login</a>
            </div>
        </div>
    </div>

    <!-- Floating WhatsApp Action Button -->
    <a href="https://wa.me/{{ $cleanWa }}?text={{ urlencode('Hello Agro Dairy Export team, I would like to inquire about agricultural commodity export rates.') }}" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Inquiry"
        class="fixed bottom-6 right-6 z-40 bg-emerald-700 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition duration-300 border-2 border-white/40">
        <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
    </a>
</footer>
