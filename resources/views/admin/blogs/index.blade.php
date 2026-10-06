@extends('layouts.admin', ['title' => 'Blog Posts'])

@section('content')
<div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Market Insights & Blog CMS</h1>
            <p class="text-xs text-stone-500">Publish commodity reports, harvesting surveys, and export updates</p>
        </div>
        <a href="{{ route('admin.blogs.create') }}" class="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow flex items-center gap-2 self-start">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Write New Post</span>
        </a>
    </div>

    <!-- Blogs Table -->
    <div class="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-semibold">
                        <th class="p-4">Post Title</th>
                        <th class="p-4">Category</th>
                        <th class="p-4">Author</th>
                        <th class="p-4">Published Date</th>
                        <th class="p-4">Status</th>
                        <th class="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-stone-100 text-stone-700">
                    @forelse($blogs as $blog)
                        <tr class="hover:bg-stone-50/60 transition-colors">
                            <td class="p-4">
                                <div class="font-bold text-stone-900 text-sm">
                                    <a href="{{ route('blogs.show', $blog->slug) }}" target="_blank" class="hover:text-emerald-800">{{ $blog->title }}</a>
                                </div>
                                <div class="text-[11px] text-stone-400 font-mono">{{ $blog->slug }}</div>
                            </td>
                            <td class="p-4">
                                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-800">
                                    {{ $blog->category?->name ?? 'General' }}
                                </span>
                            </td>
                            <td class="p-4 text-stone-600 font-medium">{{ $blog->author?->name ?? 'Staff' }}</td>
                            <td class="p-4 text-[11px] text-stone-500 font-mono">
                                {{ $blog->published_at ? $blog->published_at->format('d M, Y') : 'Draft' }}
                            </td>
                            <td class="p-4">
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase {{ $blog->is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800' }}">
                                    {{ $blog->is_published ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td class="p-4 text-right space-x-2 whitespace-nowrap">
                                <a href="{{ route('admin.blogs.edit', $blog->id) }}" class="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px] rounded-lg transition">Edit</a>
                                <form action="{{ route('admin.blogs.destroy', $blog->id) }}" method="POST" class="inline" onsubmit="return confirm('Delete this blog post?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[11px] rounded-lg transition">Delete</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="p-8 text-center text-stone-400">No blog posts found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($blogs->hasPages())
            <div class="p-4 border-t border-stone-200 bg-stone-50">
                {{ $blogs->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
