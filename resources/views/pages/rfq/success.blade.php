@extends('layouts.app', ['title' => 'Quotation Request Received - Agro Dairy Export LLP'])

@section('content')
<div class="py-20 md:py-32 bg-brand-beige-50">
    <div class="max-w-2xl mx-auto px-4 text-center">
        <div class="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        </div>

        <span class="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            RFQ Registered Successfully
        </span>

        <h1 class="text-3xl md:text-4xl font-display font-bold text-brand-forest-900 mt-4">
            Commercial Inquiry Transmitted
        </h1>

        <p class="mt-4 text-neutral-600 text-sm md:text-base leading-relaxed">
            Thank you for your commercial request. Our international commodity desk has logged your RFQ under reference:
        </p>

        <div class="my-6 inline-block bg-white px-6 py-3 rounded-2xl border-2 border-brand-forest-800 shadow-sm">
            <span class="text-xs text-neutral-400 uppercase tracking-wider block">RFQ Reference Tracking Code</span>
            <span class="text-2xl font-mono font-bold text-brand-forest-900">{{ $ref }}</span>
        </div>

        <p class="text-xs text-neutral-500 max-w-md mx-auto">
            Our export sales manager will review product grading, container loadings, and ocean freight rates to provide a binding proforma quotation within 24 business hours.
        </p>

        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="{{ route('home') }}" class="w-full sm:w-auto px-6 py-3 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-xs rounded-xl transition shadow">
                Return to Homepage
            </a>
            <a href="{{ route('products.index') }}" class="w-full sm:w-auto px-6 py-3 bg-white hover:bg-brand-beige-100 text-brand-forest-900 font-bold text-xs rounded-xl transition border border-brand-beige-300">
                Browse Commodity Catalogue
            </a>
        </div>
    </div>
</div>
@endsection
