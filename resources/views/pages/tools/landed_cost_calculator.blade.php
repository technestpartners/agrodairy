@extends('layouts.app', ['title' => 'Landed Cost & CIF Calculator - Agro Dairy Export LLP', 'metaDescription' => 'Calculate total landed import costs, ocean freight, marine insurance, and customs tariffs for agricultural commodity consignments.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Export Tools', 'url' => route('tools.index')], ['label' => 'Landed Cost Calculator']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Commercial Proforma Modeling</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Commodity Landed Cost & CIF Estimator</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Model comprehensive import economics including FOB India base price, maritime ocean freight, Institute Cargo Clauses (A) insurance, and destination tariffs.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-brand-beige-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <!-- Cost Parameters Form -->
            <div class="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-brand-beige-200 shadow-sm">
                <h2 class="text-xl font-bold font-display text-brand-forest-900 mb-6">Trade Economics Parameters</h2>

                <form action="{{ route('tools.landed_cost') }}" method="GET" class="space-y-4">
                    <div>
                        <label for="currency" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-1">Contract Currency</label>
                        <select name="currency" id="currency" onchange="this.form.submit()" class="w-full px-4 py-2.5 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm">
                            <option value="USD" {{ $currency == 'USD' ? 'selected' : '' }}>USD ($ - US Dollar)</option>
                            <option value="EUR" {{ $currency == 'EUR' ? 'selected' : '' }}>EUR (€ - Euro)</option>
                            <option value="AED" {{ $currency == 'AED' ? 'selected' : '' }}>AED (د.إ - UAE Dirham)</option>
                            <option value="INR" {{ $currency == 'INR' ? 'selected' : '' }}>INR (₹ - Indian Rupee)</option>
                        </select>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="fob_price" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-1">FOB Price / MT ({{ $currency }})</label>
                            <input type="number" step="0.01" name="fob_price" id="fob_price" value="{{ $fobPrice }}" required class="w-full px-4 py-2.5 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm">
                        </div>
                        <div>
                            <label for="quantity_mt" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-1">Quantity (MT)</label>
                            <input type="number" step="0.1" name="quantity_mt" id="quantity_mt" value="{{ $quantity }}" required class="w-full px-4 py-2.5 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="freight_per_mt" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-1">Ocean Freight / MT</label>
                            <input type="number" step="0.01" name="freight_per_mt" id="freight_per_mt" value="{{ $freight }}" class="w-full px-4 py-2.5 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm">
                        </div>
                        <div>
                            <label for="insurance_percent" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-1">Marine Ins. (%)</label>
                            <input type="number" step="0.05" name="insurance_percent" id="insurance_percent" value="{{ $insurance }}" class="w-full px-4 py-2.5 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="customs_duty_percent" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-1">Import Duty (%)</label>
                            <input type="number" step="0.1" name="customs_duty_percent" id="customs_duty_percent" value="{{ $customsDuty }}" class="w-full px-4 py-2.5 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm">
                        </div>
                        <div>
                            <label for="port_handling_per_mt" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-1">Port THC / MT</label>
                            <input type="number" step="0.01" name="port_handling_per_mt" id="port_handling_per_mt" value="{{ $portHandling }}" class="w-full px-4 py-2.5 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm">
                        </div>
                    </div>

                    <button type="submit" class="w-full mt-2 py-3.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-sm rounded-xl transition shadow">
                        Calculate Total Landed Cost
                    </button>
                </form>
            </div>

            <!-- Cost Output -->
            <div class="lg:col-span-7 space-y-6">
                <div class="bg-white p-6 md:p-8 rounded-2xl border border-brand-beige-200 shadow-sm">
                    <div class="flex items-center justify-between pb-6 border-b border-brand-beige-100 mb-6">
                        <div>
                            <span class="text-xs uppercase font-bold text-brand-forest-800 tracking-wider">Breakdown of Expenses</span>
                            <h3 class="text-2xl font-bold font-display text-brand-forest-900 mt-0.5">Estimated Landed Cost</h3>
                        </div>
                        <span class="text-xs font-mono font-bold text-neutral-500">
                            {{ $result['quantity_mt'] }} MT Basis
                        </span>
                    </div>

                    <!-- Highlighted Totals -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div class="bg-brand-forest-900 text-white p-6 rounded-2xl">
                            <span class="text-xs text-brand-gold-400 uppercase font-semibold block">Total Estimated Consignment Cost</span>
                            <div class="text-3xl font-display font-bold text-white mt-1">
                                {{ $result['currency'] }} {{ number_format($result['total_landed_cost'], 2) }}
                            </div>
                        </div>

                        <div class="bg-brand-beige-50 p-6 rounded-2xl border border-brand-beige-200">
                            <span class="text-xs text-neutral-500 uppercase font-semibold block">Estimated Landed Cost / MT</span>
                            <div class="text-3xl font-display font-bold text-brand-forest-900 mt-1">
                                {{ $result['currency'] }} {{ number_format($result['cost_per_mt'], 2) }}
                            </div>
                        </div>
                    </div>

                    <!-- Detailed Breakup Table -->
                    <div class="space-y-3 text-xs md:text-sm border-t border-brand-beige-100 pt-6">
                        <div class="flex justify-between py-1 border-b border-neutral-100">
                            <span class="text-neutral-500">1. Total FOB Origin Cargo Value:</span>
                            <span class="font-bold text-neutral-900">{{ $result['currency'] }} {{ number_format($result['total_fob_price'], 2) }}</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-neutral-100">
                            <span class="text-neutral-500">2. Ocean Freight Charges:</span>
                            <span class="font-bold text-neutral-900">{{ $result['currency'] }} {{ number_format($result['total_freight'], 2) }}</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-neutral-100">
                            <span class="text-neutral-500">3. Marine Cargo Transit Insurance:</span>
                            <span class="font-bold text-neutral-900">{{ $result['currency'] }} {{ number_format($result['total_insurance'], 2) }}</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-neutral-100 bg-emerald-50 px-3 py-2 rounded-lg">
                            <span class="font-bold text-emerald-900">Total CIF Destination Value:</span>
                            <span class="font-bold text-emerald-900">{{ $result['currency'] }} {{ number_format($result['total_cif'], 2) }}</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-neutral-100">
                            <span class="text-neutral-500">4. Import Customs Tariffs ({{ $result['customs_duty_percent'] }}%):</span>
                            <span class="font-bold text-neutral-900">{{ $result['currency'] }} {{ number_format($result['total_duty'], 2) }}</span>
                        </div>
                        <div class="flex justify-between py-1">
                            <span class="text-neutral-500">5. Destination Port Handling & THC:</span>
                            <span class="font-bold text-neutral-900">{{ $result['currency'] }} {{ number_format($result['total_port_handling'], 2) }}</span>
                        </div>
                    </div>

                    <div class="mt-8 p-4 bg-brand-beige-100/60 rounded-xl text-[11px] text-neutral-500">
                        <strong>Commercial Disclaimer:</strong> Landed cost calculations are for economic estimation purposes only. Actual ocean freight rates fluctuate based on carrier bunker adjustment factors (BAF), peak season surcharges (PSS), and customs classification at the discharge port.
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
