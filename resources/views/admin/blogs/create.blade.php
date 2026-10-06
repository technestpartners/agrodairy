@extends('layouts.admin', ['title' => 'Write Blog Post'])

@section('content')
<div class="max-w-4xl space-y-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Write Market Insight Article</h1>
            <p class="text-xs text-stone-500">Publish industry reports, price trends, and agronomy advice</p>
        </div>
        <a href="{{ route('admin.blogs.index') }}" class="text-xs font-bold text-stone-600 hover:text-stone-900">&larr; Back to Posts</a>
    </div>

    <div class="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
        <form action="{{ route('admin.blogs.store') }}" method="POST" class="space-y-6">
            @csrf

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div class="sm:col-span-2">
                    <label for="title" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Post Title *</label>
                    <input type="text" name="title" id="title" value="{{ old('title') }}" required placeholder="e.g. Indian Peanut Export Forecast 2026: Sowing Trends & Global Demand" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                    @error('title') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                </div>

                <div>
                    <label for="category_id" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Topic Category *</label>
                    <select name="category_id" id="category_id" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                        @foreach($categories as $cat)
                            <option value="{{ $cat->id }}" {{ old('category_id') == $cat->id ? 'selected' : '' }}>
                                {{ $cat->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div>
                <label for="slug" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">URL Slug (Auto-generated if empty)</label>
                <input type="text" name="slug" id="slug" value="{{ old('slug') }}" placeholder="indian-peanut-export-forecast-2026" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-800">
            </div>

            <div>
                <label for="excerpt" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Short Summary / Excerpt</label>
                <textarea name="excerpt" id="excerpt" rows="2" placeholder="Brief summary displayed on social shares and card previews..." class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">{{ old('excerpt') }}</textarea>
            </div>

            <div>
                <label for="content" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Article Body Content *</label>
                <textarea name="content" id="content" rows="12" required placeholder="Write full article body text, market statistics, export regulations..." class="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 leading-relaxed">{{ old('content') }}</textarea>
                @error('content') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
                <div>
                    <label for="meta_title" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">SEO Meta Title</label>
                    <input type="text" name="meta_title" id="meta_title" value="{{ old('meta_title') }}" placeholder="Optional custom SERP title" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                </div>

                <div>
                    <label for="meta_description" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">SEO Meta Description</label>
                    <input type="text" name="meta_description" id="meta_description" value="{{ old('meta_description') }}" placeholder="Optional custom SERP description" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                </div>
            </div>

            <div class="flex items-center gap-6 pt-2">
                <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                    <input type="checkbox" name="is_published" value="1" {{ old('is_published', true) ? 'checked' : '' }} class="rounded border-stone-300 text-emerald-800 focus:ring-emerald-800">
                    <span>Publish Immediately</span>
                </label>
            </div>

            <div class="pt-6 border-t border-stone-200 flex justify-end gap-3">
                <a href="{{ route('admin.blogs.index') }}" class="px-5 py-2.5 bg-stone-100 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-200 transition">Cancel</a>
                <button type="submit" class="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow">Save & Publish Post</button>
            </div>
        </form>
    </div>
</div>
@endsection
