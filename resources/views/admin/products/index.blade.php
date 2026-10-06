@extends('layouts.admin', ['title' => 'Products Catalogue'])

@section('content')
<div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Commodity Catalogue</h1>
            <p class="text-xs text-stone-500">Manage products, laboratory specifications, packaging options, and MOQ</p>
        </div>
        <a href="{{ route('admin.products.create') }}" class="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow flex items-center gap-2 self-start">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Add New Commodity</span>
        </a>
    </div>

    <!-- Filters Bar -->
    <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <form action="{{ route('admin.products.index') }}" method="GET" class="w-full flex flex-col sm:flex-row gap-3">
            <div class="relative flex-grow">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search by name, SKU or HS code..." class="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-800">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
            </div>

            <select name="category_id" onchange="this.form.submit()" class="px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-800">
                <option value="">-- All Categories --</option>
                @foreach($categories as $cat)
                    <option value="{{ $cat->id }}" {{ request('category_id') == $cat->id ? 'selected' : '' }}>
                        {{ $cat->name }}
                    </option>
                @endforeach
            </select>

            <button type="submit" class="px-4 py-2 bg-stone-800 text-white text-xs font-bold rounded-xl hover:bg-stone-900 transition">Filter</button>
            @if(request('search') || request('category_id'))
                <a href="{{ route('admin.products.index') }}" class="px-3 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl hover:bg-stone-200 transition text-center">Reset</a>
            @endif
        </form>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-semibold">
                        <th class="p-4">Product Details</th>
                        <th class="p-4">Category</th>
                        <th class="p-4">Origin & Variety</th>
                        <th class="p-4">HS Code</th>
                        <th class="p-4">MOQ</th>
                        <th class="p-4">Specs</th>
                        <th class="p-4">Status</th>
                        <th class="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-stone-100 text-stone-700">
                    @forelse($products as $prod)
                        <tr class="hover:bg-stone-50/60 transition-colors">
                            <td class="p-4">
                                <div class="flex items-center gap-3">
                                    <img src="{{ $prod->main_image ? asset($prod->main_image) : asset('images/about-commodities.jpg') }}" alt="{{ $prod->name }}" class="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0">
                                    <div>
                                        <div class="font-bold text-stone-900 text-sm">
                                            <a href="{{ route('products.show', $prod->slug) }}" target="_blank" class="hover:text-emerald-800">{{ $prod->name }}</a>
                                        </div>
                                        <div class="text-[11px] font-mono text-stone-400">SKU: {{ $prod->sku ?? 'ADE-'.strtoupper(substr($prod->slug, 0, 8)) }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="p-4">
                                <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-800">
                                    {{ $prod->category?->name ?? 'Unassigned' }}
                                </span>
                            </td>
                            <td class="p-4">
                                <div class="font-medium text-stone-900">{{ $prod->origin }}</div>
                                <div class="text-[11px] text-stone-500">{{ $prod->grade_variety ?? 'Standard Grade' }}</div>
                            </td>
                            <td class="p-4 font-mono font-bold text-amber-700">{{ $prod->hs_code ?? '—' }}</td>
                            <td class="p-4 font-medium">{{ $prod->moq }} {{ $prod->moq_unit }}</td>
                            <td class="p-4">
                                <span class="px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-50 text-emerald-800 font-bold">
                                    {{ $prod->specifications->count() }} params
                                </span>
                            </td>
                            <td class="p-4">
                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase {{ $prod->is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800' }}">
                                    {{ $prod->is_active ? 'Live' : 'Draft' }}
                                </span>
                            </td>
                            <td class="p-4 text-right space-x-2 whitespace-nowrap">
                                <a href="{{ route('products.pdf', $prod->slug) }}" target="_blank" class="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[11px] rounded-lg transition" title="Preview TDS PDF">PDF</a>
                                <a href="{{ route('admin.products.edit', $prod->id) }}" class="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px] rounded-lg transition">Edit</a>
                                <form action="{{ route('admin.products.destroy', $prod->id) }}" method="POST" class="inline" onsubmit="return confirm('Delete this commodity SKU?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[11px] rounded-lg transition">Delete</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="p-8 text-center text-stone-400">No products match your criteria.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($products->hasPages())
            <div class="p-4 border-t border-stone-200 bg-stone-50">
                {{ $products->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
