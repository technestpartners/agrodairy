@php
    $categories = \App\Models\ProductCategory::active()->orderBy('sort_order')->take(8)->get();
    $companyEmail = \App\Models\Setting::get('primary_email', 'agrodairyexportllp@gmail.com');
    $companyPhone = \App\Models\Setting::get('primary_phone', '+91 90233 63680');
    $headOffice = \App\Models\Setting::get('head_office_address', 'Office No. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India');
    $plantOffice = \App\Models\Setting::get('processing_plant_address', 'Saurashtra Processing Terminal, GIDC Industrial Estate, Gondal - 360311, Dist. Rajkot, Gujarat, India');
    $iecCode = \App\Models\Setting::get('iec_code', '0817029381');
    $apedaReg = \App\Models\Setting::get('apeda_rcmc', 'APEDA/RCMC/2026/0892');
    $fssaiLic = \App\Models\Setting::get('fssai_licence', '10722026000148');
    $gstin = \App\Models\Setting::get('gstin', '24AAHFA3928L1Z9');
    $whatsAppNumber = \App\Models\Setting::get('whatsapp_number', '+919023363680');
    $contactPerson = \App\Models\Setting::get('contact_person', 'J.P. Vora');
    $cleanWa = preg_replace('/[^0-9]/', '', $whatsAppNumber);
@endphp

<footer class="bg-gradient-to-b from-[#061716] via-[#041211] to-[#020b0a] text-stone-300 pt-16 pb-12 border-t border-teal-900/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Top Authority & Newsletter Row -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-teal-950/80 items-center">
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
                    <input type="email" name="email" required placeholder="Enter corporate email..." class="bg-[#0b2421] border border-teal-900/80 text-sm text-white rounded-xl px-4 py-3 focus:border-amber-400 focus:ring-amber-400 flex-1 placeholder-stone-400">
                    <button type="submit" class="bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition duration-200 border border-teal-500 shrink-0">
                        Subscribe Bulletin
                    </button>
                </form>
            </div>
        </div>

        <!-- Main Links Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-teal-950/80">
            <!-- Col 1: Corporate Profile -->
            <div class="lg:col-span-2 space-y-4">
                <div class="flex items-center space-x-3">
                    <img src="/images/logo-dark.png" alt="Agro Dairy Export LLP" class="h-16 w-auto object-contain">
                    <div>
                        <span class="block text-sm font-bold text-white uppercase tracking-wider font-heading">Agro Dairy Export LLP</span>
                        <span class="block text-xs text-teal-300/80">Government of India Recognized Export House</span>
                    </div>
                </div>

                <p class="text-xs text-stone-400 leading-relaxed max-w-md">
                    Premier processor and merchant exporter of Indian agricultural commodities including Peanuts, Sesame Seeds, Whole Spices, Herbs & Specialty Seeds, Pulses, Kabuli Chickpeas, and Dehydrated Vegetables. Direct farm procurement across Gujarat with Buhler Sortex optical sorting.
                </p>

                <!-- Statutory Credentials Badge Box -->
                <div class="bg-[#0b2421]/80 rounded-xl p-3 border border-teal-900/80 text-[11px] space-y-1 text-stone-300">
                    <div class="flex justify-between">
                        <span class="text-stone-400">IEC Registration:</span>
                        <strong class="text-white">{{ $iecCode }}</strong>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-stone-400">APEDA RCMC No.:</span>
                        <strong class="text-teal-400">{{ $apedaReg }}</strong>
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
                <ul class="space-y-2 text-xs text-stone-400">
                    @foreach($categories as $cat)
                        <li>
                            <a href="{{ route('products.category', $cat->slug) }}" class="hover:text-white transition flex items-center">
                                <span class="mr-1 text-teal-400">›</span> {{ $cat->name }}
                            </a>
                        </li>
                    @endforeach
                    <li>
                        <a href="{{ route('products.index') }}" class="text-amber-400 hover:text-amber-300 font-semibold mt-2 inline-block">
                            Browse All 40+ Commodities →
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Col 3: Quality, Compliance & Tools -->
            <div>
                <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4 font-heading">Quality & Tools</h4>
                <ul class="space-y-2.5 text-xs text-stone-400">
                    <li><a href="{{ route('quality.index') }}" class="hover:text-white transition">Quality Policy & Lab Standards</a></li>
                    <li><a href="{{ route('certifications.index') }}" class="hover:text-white transition">Certifications Gallery</a></li>
                    <li><a href="{{ route('company.verify') }}" class="text-[#00d9cc] hover:text-white font-bold transition flex items-center"><span class="mr-1">✓</span> Verify Export Credentials (IEC/APEDA)</a></li>
                    <li><a href="{{ route('traceability.index') }}" class="text-teal-400 hover:text-teal-300 font-bold transition flex items-center"><span class="mr-1">🔍</span> Lot Traceability Lookup</a></li>
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
                        <span class="block text-teal-300 font-bold text-sm">{{ $contactPerson }}</span>
                        <span class="text-[11px] text-stone-400">Managing Partner / Export Director</span>
                    </div>
                    <div>
                        <span class="block text-stone-500 text-[11px] font-semibold">Corporate Head Office:</span>
                        <p class="text-stone-300 leading-snug">{{ $headOffice }}</p>
                    </div>
                    <div>
                        <span class="block text-stone-500 text-[11px] font-semibold">Processing Terminal:</span>
                        <p class="text-stone-300 leading-snug">{{ $plantOffice }}</p>
                    </div>
                    <div>
                        <span class="block text-stone-500 text-[11px] font-semibold">Official Email:</span>
                        <a href="mailto:{{ $companyEmail }}" class="text-teal-300 hover:underline">{{ $companyEmail }}</a>
                    </div>
                    <div>
                        <span class="block text-stone-500 text-[11px] font-semibold">Direct Call / WhatsApp:</span>
                        <a href="https://wa.me/{{ $cleanWa }}" target="_blank" class="text-amber-400 hover:underline font-bold text-sm">{{ $companyPhone }}</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Copyright & Port Notice -->
        <div class="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 gap-4 text-center md:text-left">
            <p>© {{ date('Y') }} Agro Dairy Export LLP. All Rights Reserved. Surat, Gujarat, India.</p>
            <div class="flex items-center space-x-3 text-[11px]">
                <span>Gateway Ports: Mundra, Kandla, Pipavav & Hazira</span>
                <span>•</span>
                <a href="{{ route('sitemap') }}" class="hover:text-stone-300 transition">XML Sitemap</a>
                <span>•</span>
                <a href="{{ route('admin.login') }}" class="hover:text-stone-300 transition">Staff Portal</a>
            </div>
        </div>
    </div>
</footer>
