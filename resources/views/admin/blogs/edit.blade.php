@extends('layouts.admin', ['title' => 'Edit Post: ' . $blog->title])

@section('content')
<div class="max-w-4xl space-y-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Edit Article: {{ Str::limit($blog->title, 40) }}</h1>
            <p class="text-xs text-stone-500">Update content and SEO metadata</p>
        </div>
        <div class="flex items-center gap-3">
            <a href="{{ route('blogs.show', $blog->slug) }}" target="_blank" class="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition">View Live &nearr;</a>
            <a href="{{ route('admin.blogs.index') }}" class="text-xs font-bold text-stone-600 hover:text-stone-900">&larr; Back to Posts</a>
        </div>
    </div>

    <div class="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
        <form action="{{ route('admin.blogs.update', $blog->id) }}" method="POST" class="space-y-6">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div class="sm:col-span-2">
                    <label for="title" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Post Title *</label>
                    <input type="text" name="title" id="title" value="{{ old('title', $blog->title) }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                    @error('title') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                </div>

                <div>
                    <label for="category_id" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Topic Category *</label>
                    <select name="category_id" id="category_id" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                        @foreach($categories as $cat)
                            <option value="{{ $cat->id }}" {{ old('category_id', $blog->category_id) == $cat->id ? 'selected' : '' }}>
                                {{ $cat->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div>
                <label for="slug" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">URL Slug</label>
                <input type="text" name="slug" id="slug" value="{{ old('slug', $blog->slug) }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-800">
            </div>

            <div>
                <label for="excerpt" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Short Summary / Excerpt</label>
                <textarea name="excerpt" id="excerpt" rows="2" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">{{ old('excerpt', $blog->excerpt) }}</textarea>
            </div>

            <div>
                <label for="content" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Article Body Content *</label>
                <textarea name="content" id="content" rows="12" required class="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 leading-relaxed">{{ old('content', $blog->content) }}</textarea>
                @error('content') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
                <div>
                    <label for="meta_title" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">SEO Meta Title</label>
                    <input type="text" name="meta_title" id="meta_title" value="{{ old('meta_title', $blog->meta_title) }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                </div>

                <div>
                    <label for="meta_description" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">SEO Meta Description</label>
                    <input type="text" name="meta_description" id="meta_description" value="{{ old('meta_description', $blog->meta_description) }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                </div>
            </div>

            <div class="flex items-center gap-6 pt-2">
                <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                    <input type="checkbox" name="is_published" value="1" {{ old('is_published', $blog->is_published) ? 'checked' : '' }} class="rounded border-stone-300 text-emerald-800 focus:ring-emerald-800">
                    <span>Published Live on Website</span>
                </label>
            </div>

            <div class="pt-6 border-t border-stone-200 flex justify-end gap-3">
                <a href="{{ route('admin.blogs.index') }}" class="px-5 py-2.5 bg-stone-100 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-200 transition">Cancel</a>
                <button type="submit" class="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow">Update Article</button>
            </div>
        </form>
    </div>
</div>
@endsection
