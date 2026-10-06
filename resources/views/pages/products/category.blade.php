@extends('layouts.app')

@section('title', $category->name . ' Exporter from India | Agro Dairy Export LLP')
@section('meta_description', $category->short_description)

@section('breadcrumbs')
    <x-breadcrumbs :items="['Export Commodities' => route('products.index'), $category->name => '']" />
@endsection

@section('content')
<div class="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white py-14 border-b border-emerald-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
            <span class="text-xs font-bold uppercase tracking-widest text-amber-400">Commodity Category</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-1">
                Indian {{ $category->name }}
            </h1>
            <p class="text-xs sm:text-sm text-stone-200 mt-3 leading-relaxed">
                {{ $category->description ?? $category->short_description }}
            </p>
            @if($category->hs_code_prefix)
                <div class="mt-4 inline-block bg-white/10 px-3 py-1 rounded-lg border border-white/20 text-xs text-amber-300">
                    Standard Harmonized Tariff Prefix: <strong>{{ $category->hs_code_prefix }}</strong>
                </div>
            @endif
        </div>
    </div>
</div>

<section class="py-16 bg-white min-h-[500px]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
            <h2 class="text-lg font-bold text-emerald-950 font-heading">
                Available {{ $category->name }} Grades & Varieties ({{ $products->total() }})
            </h2>
            <button type="button" 
                @click="$dispatch('open-rfq-modal', { productName: '{{ addslashes($category->name) }}' })"
                class="text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-lg transition shadow-sm">
                Request Category Price List
            </button>
        </div>

        @if($products->isEmpty())
            <div class="text-center py-12 bg-stone-50 rounded-xl">
                <p class="text-xs text-stone-500">No products currently listed in this category.</p>
            </div>
        @else
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                @foreach($products as $product)
                    <x-product-card :product="$product" />
                @endforeach
            </div>

            <div class="mt-12">
                {{ $products->links() }}
            </div>
        @endif

        @if($otherCategories->isNotEmpty())
            <div class="mt-20 pt-12 border-t border-stone-200">
                <h3 class="text-sm font-bold uppercase tracking-wider text-stone-500 mb-6">Other Export Commodity Categories</h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    @foreach($otherCategories as $oc)
                        <a href="{{ route('products.category', $oc->slug) }}" class="p-3 bg-stone-50 hover:bg-emerald-50 rounded-xl border border-stone-200 text-center transition group">
                            <span class="block text-xs font-bold text-stone-800 group-hover:text-emerald-900 truncate">{{ $oc->name }}</span>
                        </a>
                    @endforeach
                </div>
            </div>
        @endif
    </div>
</section>
@endsection
