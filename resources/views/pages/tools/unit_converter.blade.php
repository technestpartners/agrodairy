@extends('layouts.app', ['title' => 'Agricultural Commodity Unit Converter - Agro Dairy Export LLP', 'metaDescription' => 'Convert Metric Tons, Kilograms, Pounds, Quintals, and Bags for international agricultural commodity contracts.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Export Tools', 'url' => route('tools.index')], ['label' => 'Unit Converter']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Contract Calculations</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Agricultural Trade Unit Converter</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Standardize measurements across metric and imperial conventions for international food commodity contracts.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-brand-beige-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white p-8 md:p-10 rounded-2xl border border-brand-beige-200 shadow-sm">
            <form action="{{ route('tools.unit_converter') }}" method="GET" class="space-y-6">
                <div>
                    <label for="value" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">Quantity Value to Convert</label>
                    <input type="number" step="0.001" name="value" id="value" value="{{ $value }}" required class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-lg font-bold text-brand-forest-900 focus:ring-2 focus:ring-brand-forest-800">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label for="from_unit" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">From Measurement Unit</label>
                        <select name="from_unit" id="from_unit" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                            <option value="mt" {{ $fromUnit == 'mt' ? 'selected' : '' }}>Metric Tons (MT)</option>
                            <option value="kg" {{ $fromUnit == 'kg' ? 'selected' : '' }}>Kilograms (Kg)</option>
                            <option value="lbs" {{ $fromUnit == 'lbs' ? 'selected' : '' }}>Pounds (Lbs)</option>
                            <option value="quintal" {{ $fromUnit == 'quintal' ? 'selected' : '' }}>Quintals (Qtl - 100 kg)</option>
                            <option value="bag_50kg" {{ $fromUnit == 'bag_50kg' ? 'selected' : '' }}>Standard 50kg Bags</option>
                            <option value="bag_25kg" {{ $fromUnit == 'bag_25kg' ? 'selected' : '' }}>Standard 25kg Bags</option>
                        </select>
                    </div>

                    <div>
                        <label for="to_unit" class="block text-xs font-bold text-brand-forest-900 uppercase tracking-wider mb-2">To Target Unit</label>
                        <select name="to_unit" id="to_unit" class="w-full px-4 py-3 bg-brand-beige-50 border border-brand-beige-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-forest-800">
                            <option value="kg" {{ $toUnit == 'kg' ? 'selected' : '' }}>Kilograms (Kg)</option>
                            <option value="mt" {{ $toUnit == 'mt' ? 'selected' : '' }}>Metric Tons (MT)</option>
                            <option value="lbs" {{ $toUnit == 'lbs' ? 'selected' : '' }}>Pounds (Lbs)</option>
                            <option value="quintal" {{ $toUnit == 'quintal' ? 'selected' : '' }}>Quintals (Qtl)</option>
                            <option value="bag_50kg" {{ $toUnit == 'bag_50kg' ? 'selected' : '' }}>Standard 50kg Bags</option>
                            <option value="bag_25kg" {{ $toUnit == 'bag_25kg' ? 'selected' : '' }}>Standard 25kg Bags</option>
                        </select>
                    </div>
                </div>

                <button type="submit" class="w-full py-3.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-sm rounded-xl transition shadow">
                    Convert Commodity Quantity
                </button>
            </form>

            <!-- Conversion Result Display -->
            <div class="mt-8 pt-8 border-t border-brand-beige-200 text-center">
                <span class="text-xs uppercase font-bold text-neutral-400 tracking-wider">Converted Equivalent</span>
                <div class="text-4xl md:text-5xl font-display font-bold text-brand-forest-900 mt-2">
                    {{ number_format($converted, 4) }}
                    <span class="text-xl md:text-2xl font-normal text-neutral-500 uppercase">{{ $toUnit }}</span>
                </div>
                <p class="text-xs text-neutral-500 mt-2">
                    {{ $value }} {{ strtoupper($fromUnit) }} = {{ number_format($converted, 4) }} {{ strtoupper($toUnit) }}
                </p>
            </div>
        </div>
    </div>
</section>
@endsection
