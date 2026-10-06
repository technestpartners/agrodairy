@extends('layouts.admin', ['title' => 'Edit Category - ' . $category->name])

@section('content')
<div class="max-w-3xl space-y-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Edit Category: {{ $category->name }}</h1>
            <p class="text-xs text-stone-500">Update commodity sector information</p>
        </div>
        <a href="{{ route('admin.categories.index') }}" class="text-xs font-bold text-stone-600 hover:text-stone-900">&larr; Back to Categories</a>
    </div>

    <div class="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
        <form action="{{ route('admin.categories.update', $category->id) }}" method="POST" class="space-y-6">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label for="name" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Category Name *</label>
                    <input type="text" name="name" id="name" value="{{ old('name', $category->name) }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                    @error('name') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                </div>

                <div>
                    <label for="slug" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Slug</label>
                    <input type="text" name="slug" id="slug" value="{{ old('slug', $category->slug) }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 font-mono">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label for="hs_code_prefix" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">ITC-HS Tariff Prefix</label>
                    <input type="text" name="hs_code_prefix" id="hs_code_prefix" value="{{ old('hs_code_prefix', $category->hs_code_prefix) }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 font-mono">
                </div>

                <div>
                    <label for="sort_order" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Display Sort Order</label>
                    <input type="number" name="sort_order" id="sort_order" value="{{ old('sort_order', $category->sort_order) }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                </div>
            </div>

            <div>
                <label for="short_description" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Short Description</label>
                <textarea name="short_description" id="short_description" rows="2" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">{{ old('short_description', $category->short_description) }}</textarea>
            </div>

            <div class="flex items-center gap-6 pt-2">
                <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                    <input type="checkbox" name="is_active" value="1" {{ old('is_active', $category->is_active) ? 'checked' : '' }} class="rounded border-stone-300 text-emerald-800 focus:ring-emerald-800">
                    <span>Published / Active on Website</span>
                </label>

                <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                    <input type="checkbox" name="is_featured" value="1" {{ old('is_featured', $category->is_featured) ? 'checked' : '' }} class="rounded border-stone-300 text-emerald-800 focus:ring-emerald-800">
                    <span>Feature on Homepage Section</span>
                </label>
            </div>

            <div class="pt-6 border-t border-stone-200 flex justify-end gap-3">
                <a href="{{ route('admin.categories.index') }}" class="px-5 py-2.5 bg-stone-100 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-200 transition">Cancel</a>
                <button type="submit" class="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow">Update Category</button>
            </div>
        </form>
    </div>
</div>
@endsection
