@extends('layouts.admin', ['title' => 'Create Quotation Proforma'])

@section('content')
<div class="max-w-4xl space-y-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Generate Commercial Export Quotation</h1>
            <p class="text-xs text-stone-500">Create binding proforma invoice with maritime shipping breakdown</p>
        </div>
        <a href="{{ route('admin.quotations.index') }}" class="text-xs font-bold text-stone-600 hover:text-stone-900">&larr; Back to Quotations</a>
    </div>

    @if($inquiry)
        <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs flex items-center justify-between">
            <div>
                <span class="font-bold text-amber-900">Linked to RFQ:</span>
                <span class="font-mono text-stone-900 font-bold ml-1">{{ $inquiry->inquiry_number }}</span> &bull;
                <span>{{ $inquiry->name }} ({{ $inquiry->company ?? 'Direct Buyer' }}), {{ $inquiry->country }}</span>
            </div>
            <a href="{{ route('admin.inquiries.show', $inquiry->id) }}" class="font-bold text-amber-800 underline">View Inquiry Details</a>
        </div>
    @endif

    <div class="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
        <form action="{{ route('admin.quotations.store') }}" method="POST" class="space-y-8" x-data="{
            items: [
                {
                    product_id: '{{ $inquiry?->product_id ?? '' }}',
                    item_name: '{{ $inquiry?->product?->name ?? 'Bold Peanuts 40/50' }}',
                    grade_spec: '{{ $inquiry?->product_variant ?? 'Machine Cleaned, Max 7% Moisture' }}',
                    packaging: '{{ $inquiry?->packaging_preference ?? '50kg Jute Bags' }}',
                    quantity: {{ $inquiry?->quantity ?? 19.0 }},
                    unit: 'MT',
                    unit_price: {{ $inquiry?->target_price ?? 1250.00 }}
                }
            ],
            freight: 1200.00,
            insurance: 150.00,
            other_charges: 0.00,
            addItem() {
                this.items.push({ product_id: '', item_name: '', grade_spec: '', packaging: '50kg Jute Bags', quantity: 19, unit: 'MT', unit_price: 1000 });
            },
            removeItem(index) {
                if (this.items.length > 1) {
                    this.items.splice(index, 1);
                }
            },
            subtotal() {
                return this.items.reduce((sum, item) => sum + (item.quantity * item.unit_price || 0), 0);
            },
            grandTotal() {
                return this.subtotal() + (parseFloat(this.freight) || 0) + (parseFloat(this.insurance) || 0) + (parseFloat(this.other_charges) || 0);
            }
        }">
            @csrf

            <!-- Section 1: Header & Commercial Terms -->
            <div>
                <h3 class="text-sm font-bold font-display text-stone-900 pb-2 border-b border-stone-200 mb-4 uppercase tracking-wider text-emerald-950">1. Commercial & Shipment Terms</h3>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <label for="quotation_number" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Quotation Number *</label>
                        <input type="text" name="quotation_number" id="quotation_number" value="{{ old('quotation_number', $quotationNumber) }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono font-bold">
                    </div>

                    <div>
                        <label for="currency" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Currency *</label>
                        <select name="currency" id="currency" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="AED">AED (د.إ)</option>
                            <option value="INR">INR (₹)</option>
                        </select>
                    </div>

                    <div>
                        <label for="incoterm" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Incoterm *</label>
                        <select name="incoterm" id="incoterm" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                            <option value="FOB" {{ ($inquiry?->incoterm == 'FOB') ? 'selected' : '' }}>FOB (Free on Board)</option>
                            <option value="CIF" {{ ($inquiry?->incoterm == 'CIF' || !$inquiry) ? 'selected' : '' }}>CIF (Cost, Insurance & Freight)</option>
                            <option value="CFR" {{ ($inquiry?->incoterm == 'CFR') ? 'selected' : '' }}>CFR (Cost and Freight)</option>
                            <option value="EXW">EXW Factory</option>
                        </select>
                    </div>

                    <div>
                        <label for="origin_port" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Port of Loading (POL) *</label>
                        <input type="text" name="origin_port" id="origin_port" value="Mundra Port (INMUN1), Gujarat, India" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                    </div>

                    <div>
                        <label for="destination_port" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Port of Discharge (POD) *</label>
                        <input type="text" name="destination_port" id="destination_port" value="{{ old('destination_port', $inquiry?->destination_port ?? 'Jebel Ali, UAE') }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                    </div>

                    <div>
                        <label for="valid_until" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Offer Validity Expiry *</label>
                        <input type="date" name="valid_until" id="valid_until" value="{{ date('Y-m-d', strtotime('+14 days')) }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                    </div>
                </div>

                <div class="mt-4">
                    <label for="payment_terms" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Payment Instrument & Credit Terms *</label>
                    <input type="text" name="payment_terms" id="payment_terms" value="100% Irrevocable Letter of Credit (LC) at sight / TT 20% Advance, 80% against BL copy" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                </div>

                @if($inquiry)
                    <input type="hidden" name="inquiry_id" value="{{ $inquiry->id }}">
                @endif
            </div>

            <!-- Section 2: Line Items -->
            <div>
                <div class="flex items-center justify-between pb-2 border-b border-stone-200 mb-4">
                    <h3 class="text-sm font-bold font-display text-stone-900 uppercase tracking-wider text-emerald-950">2. Commodities & Pricing Breakdown</h3>
                    <button type="button" @click="addItem()" class="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-lg transition">
                        + Add Commodity Line
                    </button>
                </div>

                <div class="space-y-4">
                    <template x-for="(item, idx) in items" :key="idx">
                        <div class="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                            <div class="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                <div class="sm:col-span-4">
                                    <label class="block text-[10px] font-bold uppercase text-stone-500 mb-1">Commodity / SKU</label>
                                    <input type="text" :name="'items['+idx+'][item_name]'" x-model="item.item_name" required placeholder="Commodity Name" class="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold">
                                </div>
                                <div class="sm:col-span-4">
                                    <label class="block text-[10px] font-bold uppercase text-stone-500 mb-1">Grade / Technical Tolerance</label>
                                    <input type="text" :name="'items['+idx+'][grade_spec]'" x-model="item.grade_spec" placeholder="Grade & Size Specs" class="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs">
                                </div>
                                <div class="sm:col-span-4">
                                    <label class="block text-[10px] font-bold uppercase text-stone-500 mb-1">Packaging Specification</label>
                                    <input type="text" :name="'items['+idx+'][packaging]'" x-model="item.packaging" placeholder="Packaging Type" class="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs">
                                </div>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                                <div class="sm:col-span-3">
                                    <label class="block text-[10px] font-bold uppercase text-stone-500 mb-1">Quantity</label>
                                    <input type="number" step="0.01" :name="'items['+idx+'][quantity]'" x-model.number="item.quantity" required class="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold">
                                </div>
                                <div class="sm:col-span-2">
                                    <label class="block text-[10px] font-bold uppercase text-stone-500 mb-1">Unit</label>
                                    <input type="text" :name="'items['+idx+'][unit]'" x-model="item.unit" required class="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs">
                                </div>
                                <div class="sm:col-span-3">
                                    <label class="block text-[10px] font-bold uppercase text-stone-500 mb-1">Unit Rate</label>
                                    <input type="number" step="0.01" :name="'items['+idx+'][unit_price]'" x-model.number="item.unit_price" required class="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold">
                                </div>
                                <div class="sm:col-span-3">
                                    <label class="block text-[10px] font-bold uppercase text-stone-500 mb-1">Total</label>
                                    <div class="px-3 py-1.5 bg-stone-100 border border-stone-200 rounded-lg text-xs font-bold font-mono text-stone-900" x-text="(item.quantity * item.unit_price || 0).toFixed(2)"></div>
                                </div>
                                <div class="sm:col-span-1 text-right">
                                    <button type="button" @click="removeItem(idx)" class="text-red-500 hover:text-red-700 text-base font-bold pb-1">&times;</button>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <!-- Section 3: Freight, Insurance & Surcharges -->
            <div>
                <h3 class="text-sm font-bold font-display text-stone-900 pb-2 border-b border-stone-200 mb-4 uppercase tracking-wider text-emerald-950">3. Freight & Financial Summary</h3>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <label for="freight" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Ocean Freight Total</label>
                        <input type="number" step="0.01" name="freight" id="freight" x-model.number="freight" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono">
                    </div>
                    <div>
                        <label for="insurance" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Marine Transit Insurance</label>
                        <input type="number" step="0.01" name="insurance" id="insurance" x-model.number="insurance" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono">
                    </div>
                    <div>
                        <label for="other_charges" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Other Port Surcharges</label>
                        <input type="number" step="0.01" name="other_charges" id="other_charges" x-model.number="other_charges" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono">
                    </div>
                </div>

                <!-- Live Total Banner -->
                <div class="mt-6 p-6 rounded-2xl bg-stone-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span class="text-xs text-stone-400 uppercase font-semibold">Calculated Grand Total</span>
                        <div class="text-2xl md:text-3xl font-display font-bold text-amber-400 mt-0.5" x-text="grandTotal().toFixed(2)"></div>
                    </div>
                    <div class="text-right text-xs text-stone-300">
                        Subtotal: <span class="font-mono font-bold" x-text="subtotal().toFixed(2)"></span> | 
                        Freight & Ins: <span class="font-mono font-bold" x-text="((parseFloat(freight)||0) + (parseFloat(insurance)||0) + (parseFloat(other_charges)||0)).toFixed(2)"></span>
                    </div>
                </div>
            </div>

            <!-- Notes -->
            <div>
                <label for="terms_and_conditions" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Special Conditions & Quality Notes</label>
                <textarea name="terms_and_conditions" id="terms_and_conditions" rows="3" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs">Quality and weight final at loading port certified by independent surveyor (SGS/BV). Rates subject to bunker fluctuation and container equipment availability.</textarea>
            </div>

            <div class="pt-6 border-t border-stone-200 flex justify-end gap-3">
                <a href="{{ route('admin.quotations.index') }}" class="px-5 py-2.5 bg-stone-100 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-200 transition">Cancel</a>
                <button type="submit" class="px-8 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow-lg">Save & Generate Quotation</button>
            </div>
        </form>
    </div>
</div>
@endsection
