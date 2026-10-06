@extends('layouts.app')

@section('title', 'Agricultural Export Commodities Catalogue | Agro Dairy Export LLP')
@section('meta_description', 'Search and explore our export range: Bold & Java Peanuts, Hulled Sesame Seeds, Indian Spices (Cumin, Coriander, Turmeric), Pulses, Kabuli Chickpeas, and Dehydrated Vegetables.')

@section('breadcrumbs')
    <x-breadcrumbs :items="['Export Commodities' => '']" />
@endsection

@section('content')
<div class="bg-stone-50 py-12 border-b border-stone-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-800">Export Catalogue</span>
            <h1 class="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-950 mt-1">
                Indian Agricultural Commodities
            </h1>
            <p class="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                Sortex-cleaned, laboratory-analyzed, and container-shipped from Mundra and Kandla ports to 40+ destinations worldwide. Filter by commodity category or search by product grade and variety.
            </p>
        </div>

        <!-- Filter & Search Bar -->
        <div class="mt-8 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <form action="{{ route('products.index') }}" method="GET" class="w-full md:w-auto flex-1 flex flex-col sm:flex-row gap-3">
                <div class="relative flex-1">
                    <input type="text" name="search" value="{{ request('search') }}" placeholder="Search by commodity, grade variety, or HS code..." class="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border-stone-300 focus:border-emerald-700 focus:ring-emerald-700">
                    <svg class="w-4 h-4 text-stone-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>

                <select name="category" class="text-xs rounded-xl border-stone-300 focus:border-emerald-700 focus:ring-emerald-700 py-2.5">
                    <option value="">All Categories</option>
                    @foreach($categories as $cat)
                        <option value="{{ $cat->slug }}" {{ request('category') === $cat->slug ? 'selected' : '' }}>
                            {{ $cat->name }} ({{ $cat->products_count }})
                        </option>
                    @endforeach
                </select>

                <select name="sort" class="text-xs rounded-xl border-stone-300 focus:border-emerald-700 focus:ring-emerald-700 py-2.5">
                    <option value="">Default Order</option>
                    <option value="name_asc" {{ request('sort') === 'name_asc' ? 'selected' : '' }}>Name: A to Z</option>
                    <option value="name_desc" {{ request('sort') === 'name_desc' ? 'selected' : '' }}>Name: Z to A</option>
                    <option value="newest" {{ request('sort') === 'newest' ? 'selected' : '' }}>Newest First</option>
                </select>

                <button type="submit" class="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition">
                    Filter
                </button>

                @if(request()->hasAny(['search', 'category', 'sort']))
                    <a href="{{ route('products.index') }}" class="px-4 py-2.5 text-xs font-semibold rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50 flex items-center justify-center">
                        Reset
                    </a>
                @endif
            </form>
        </div>

        <!-- Category Quick Badges -->
        <div class="mt-4 flex flex-wrap gap-2 text-xs">
            <a href="{{ route('products.index') }}" class="px-3 py-1.5 rounded-full font-semibold transition {{ !request('category') ? 'bg-emerald-900 text-white' : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100' }}">
                All Products
            </a>
            @foreach($categories as $cat)
                <a href="{{ route('products.index', ['category' => $cat->slug]) }}" class="px-3 py-1.5 rounded-full font-semibold transition {{ request('category') === $cat->slug ? 'bg-emerald-900 text-white' : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100' }}">
                    {{ $cat->name }}
                </a>
            @endforeach
        </div>
    </div>
</div>

<!-- Product Grid Section -->
<section class="py-16 bg-white min-h-[500px]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        @if($products->isEmpty())
            <div class="text-center py-20 bg-stone-50 rounded-2xl border border-stone-200 max-w-lg mx-auto">
                <svg class="w-12 h-12 text-stone-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <h3 class="text-lg font-bold text-stone-800">No commodities matched your criteria</h3>
                <p class="text-xs text-stone-500 mt-1">Try clearing your search terms or view our full catalogue.</p>
                <div class="mt-5">
                    <a href="{{ route('products.index') }}" class="inline-block px-5 py-2 text-xs font-semibold bg-emerald-800 text-white rounded-lg">View All Commodities</a>
                </div>
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
    </div>
</section>
@endsection
