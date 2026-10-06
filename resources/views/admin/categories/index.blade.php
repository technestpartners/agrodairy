@extends('layouts.admin', ['title' => 'Product Categories'])

@section('content')
<div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Commodity Categories</h1>
            <p class="text-xs text-stone-500">Manage export agricultural sectors, HS prefixes, and hierarchy</p>
        </div>
        <a href="{{ route('admin.categories.create') }}" class="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow flex items-center gap-2 self-start">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Add New Category</span>
        </a>
    </div>

    <div class="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-semibold">
                        <th class="p-4">Sort</th>
                        <th class="p-4">Category Name</th>
                        <th class="p-4">Slug</th>
                        <th class="p-4">HS Prefix</th>
                        <th class="p-4">Products</th>
                        <th class="p-4">Status</th>
                        <th class="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-stone-100 text-stone-700">
                    @forelse($categories as $cat)
                        <tr class="hover:bg-stone-50/60 transition-colors">
                            <td class="p-4 font-mono text-stone-400">{{ $cat->sort_order }}</td>
                            <td class="p-4">
                                <div class="font-bold text-stone-900 text-sm">{{ $cat->name }}</div>
                                @if($cat->short_description)
                                    <div class="text-[11px] text-stone-500 line-clamp-1">{{ $cat->short_description }}</div>
                                @endif
                            </td>
                            <td class="p-4 font-mono text-stone-500">{{ $cat->slug }}</td>
                            <td class="p-4 font-mono font-bold text-amber-700">{{ $cat->hs_code_prefix ?? '—' }}</td>
                            <td class="p-4">
                                <span class="px-2.5 py-0.5 rounded-full font-bold text-[11px] bg-stone-100 text-stone-700">
                                    {{ $cat->products_count }} SKUs
                                </span>
                            </td>
                            <td class="p-4">
                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase {{ $cat->is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800' }}">
                                    {{ $cat->is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="p-4 text-right space-x-2">
                                <a href="{{ route('admin.categories.edit', $cat->id) }}" class="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px] rounded-lg transition">Edit</a>
                                <form action="{{ route('admin.categories.destroy', $cat->id) }}" method="POST" class="inline" onsubmit="return confirm('Are you sure you want to delete this category?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[11px] rounded-lg transition">Delete</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="p-8 text-center text-stone-400">No categories found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($categories->hasPages())
            <div class="p-4 border-t border-stone-200 bg-stone-50">
                {{ $categories->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
