@extends('layouts.app', ['title' => 'Request Commercial Quotation (RFQ) - Agro Dairy Export LLP', 'metaDescription' => 'Submit formal Request for Quotation (RFQ) for bulk agricultural commodities: Peanuts, Sesame, Spices, Pulses, and Dehydrated crops. Fast proforma response within 24h.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Request Quotation (RFQ)']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Commercial Proforma Portal</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Request Formal Commercial Export Quotation</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Provide your target commodity parameters, packaging specification, and destination discharge port. Our international trade desk generates verified binding proforma offers within 24 hours.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-brand-beige-50">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white p-8 md:p-12 rounded-3xl border border-brand-beige-200 shadow-md">
            <form action="{{ route('rfq.store') }}" method="POST" enctype="multipart/form-data" class="space-y-8">
                @csrf

                <!-- Section 1: Buyer Profile -->
                <div>
                    <h3 class="text-lg font-bold font-display text-brand-forest-900 pb-3 border-b border-brand-beige-200 mb-6 flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-brand-forest-900 text-brand-gold-400 text-xs flex items-center justify-center font-mono">1</span>
                        <span>Buyer & Enterprise Identity</span>
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label for="name" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Buyer Contact Name *</label>
                            <input type="text" name="name" id="name" value="{{ old('name') }}" required placeholder="e.g. Tariq Al-Hashimi" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                            @error('name') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                        </div>

                        <div>
                            <label for="company" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Registered Company / Trade Entity</label>
                            <input type="text" name="company" id="company" value="{{ old('company') }}" placeholder="e.g. Al-Nour Agrico FZE" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                        </div>

                        <div>
                            <label for="email" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Official Business Email *</label>
                            <input type="email" name="email" id="email" value="{{ old('email') }}" required placeholder="purchasing@al-nour.com" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                            @error('email') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                        </div>

                        <div>
                            <label for="phone" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Direct Phone Number *</label>
                            <input type="text" name="phone" id="phone" value="{{ old('phone') }}" required placeholder="+971 4 234 5678" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                            @error('phone') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                        </div>

                        <div>
                            <label for="whatsapp" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">WhatsApp Number (For Direct Drafts)</label>
                            <input type="text" name="whatsapp" id="whatsapp" value="{{ old('whatsapp') }}" placeholder="+971 50 123 4567" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                        </div>

                        <div>
                            <label for="country" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Destination Country *</label>
                            <input type="text" name="country" id="country" value="{{ old('country', request('country')) }}" required placeholder="e.g. United Arab Emirates" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                            @error('country') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                        </div>
                    </div>
                </div>

                <!-- Section 2: Commodity & Technical Specifications -->
                <div>
                    <h3 class="text-lg font-bold font-display text-brand-forest-900 pb-3 border-b border-brand-beige-200 mb-6 flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-brand-forest-900 text-brand-gold-400 text-xs flex items-center justify-center font-mono">2</span>
                        <span>Commodity & Volume Specification</span>
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label for="product_id" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Select Commodity Product</label>
                            <select name="product_id" id="product_id" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                                <option value="">-- Choose Commodity or General Inquiry --</option>
                                @foreach($products as $prod)
                                    <option value="{{ $prod->id }}" {{ (old('product_id', $selectedProductId) == $prod->id) ? 'selected' : '' }}>
                                        {{ $prod->name }} ({{ $prod->category?->name }})
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div>
                            <label for="product_variant" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Grade Size / Counts (Optional)</label>
                            <input type="text" name="product_variant" id="product_variant" value="{{ old('product_variant') }}" placeholder="e.g. 40/50 Count, 99.95% Purity, Machine Cleaned" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="quantity" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Order Quantity</label>
                                <input type="number" step="0.1" name="quantity" id="quantity" value="{{ old('quantity', request('quantity', 19)) }}" placeholder="e.g. 19.0" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                            </div>
                            <div>
                                <label for="unit" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Measurement Unit</label>
                                <select name="unit" id="unit" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                                    <option value="Metric Ton (MT)">Metric Ton (MT)</option>
                                    <option value="20ft FCL Container">20ft FCL Container</option>
                                    <option value="40ft FCL Container">40ft FCL Container</option>
                                    <option value="Kilograms (Kg)">Kilograms (Kg)</option>
                                    <option value="Pounds (Lbs)">Pounds (Lbs)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label for="packaging_preference" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Packaging Requirement</label>
                            <input type="text" name="packaging_preference" id="packaging_preference" value="{{ old('packaging_preference', request('packaging')) }}" placeholder="e.g. 50kg New Jute Bags / 25kg PP Vacuum" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                        </div>
                    </div>
                </div>

                <!-- Section 3: Maritime Delivery & Commercial Terms -->
                <div>
                    <h3 class="text-lg font-bold font-display text-brand-forest-900 pb-3 border-b border-brand-beige-200 mb-6 flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-brand-forest-900 text-brand-gold-400 text-xs flex items-center justify-center font-mono">3</span>
                        <span>Maritime Shipping & Commercial Terms</span>
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label for="incoterm" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Preferred Incoterm *</label>
                            <select name="incoterm" id="incoterm" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                                <option value="FOB" {{ old('incoterm') == 'FOB' ? 'selected' : '' }}>FOB Mundra / Kandla Port</option>
                                <option value="CIF" {{ old('incoterm', 'CIF') == 'CIF' ? 'selected' : '' }}>CIF Discharge Port (Cost, Ins, Freight)</option>
                                <option value="CFR" {{ old('incoterm') == 'CFR' ? 'selected' : '' }}>CFR Discharge Port (Cost & Freight)</option>
                                <option value="EXW" {{ old('incoterm') == 'EXW' ? 'selected' : '' }}>EXW Factory (Rajkot, Gujarat)</option>
                            </select>
                        </div>

                        <div>
                            <label for="destination_port" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Destination Seaport</label>
                            <input type="text" name="destination_port" id="destination_port" value="{{ old('destination_port', request('port')) }}" placeholder="e.g. Jebel Ali / Rotterdam / Port Klang" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                        </div>

                        <div>
                            <label for="preferred_delivery_date" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Required Shipment Window</label>
                            <input type="date" name="preferred_delivery_date" id="preferred_delivery_date" value="{{ old('preferred_delivery_date') }}" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                        </div>

                        <div>
                            <label for="target_price" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Target Price / MT (Optional)</label>
                            <input type="number" step="0.01" name="target_price" id="target_price" value="{{ old('target_price') }}" placeholder="e.g. 1250.00" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                        </div>

                        <div>
                            <label for="target_currency" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Target Currency</label>
                            <select name="target_currency" id="target_currency" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="AED">AED (د.إ)</option>
                            </select>
                        </div>

                        <div>
                            <label for="attachment" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Purchase Order / Spec Sheet (PDF/JPG)</label>
                            <input type="file" name="attachment" id="attachment" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" class="w-full px-3 py-2 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-xs text-neutral-600 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-brand-forest-800 file:text-white hover:file:bg-brand-forest-900">
                        </div>
                    </div>
                </div>

                <!-- Section 4: Specifications & Instructions -->
                <div>
                    <h3 class="text-lg font-bold font-display text-brand-forest-900 pb-3 border-b border-brand-beige-200 mb-6 flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-brand-forest-900 text-brand-gold-400 text-xs flex items-center justify-center font-mono">4</span>
                        <span>Detailed Commercial Instructions & Tolerances</span>
                    </h3>

                    <div>
                        <label for="message" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Specific Quality Tolerances, Payment Terms, or Special Demands *</label>
                        <textarea name="message" id="message" rows="4" required placeholder="Specify any strict laboratory limits (e.g. Aflatoxin < 4 ppb, Max Moisture 7%), preferred payment instrument (e.g. 100% Irrevocable LC at Sight or TT 20/80), or private label printing specifications..." class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">{{ old('message') }}</textarea>
                        @error('message') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- Submission CTA -->
                <div class="pt-6 border-t border-brand-beige-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="text-xs text-neutral-500">
                        Your RFQ will be encrypted and transmitted directly to our international trade desk. No brokerage intermediary.
                    </div>
                    <button type="submit" class="w-full sm:w-auto px-10 py-4 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2">
                        <span>Submit Formal RFQ for Proforma</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>
@endsection
