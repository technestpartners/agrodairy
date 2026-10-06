@extends('layouts.app', ['title' => $blog->seo_title ?? $blog->title . ' - Agro Dairy Export LLP', 'metaDescription' => $blog->meta_description ?? $blog->excerpt])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <x-breadcrumbs :items="[['label' => 'Market Insights', 'url' => route('blogs.index')], ['label' => $blog->category?->name ?? 'Article']]" />
        <div class="mt-4">
            @if($blog->category)
                <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">
                    {{ $blog->category->name }}
                </span>
            @endif
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">{{ $blog->title }}</h1>
            <div class="mt-4 flex items-center justify-center gap-4 text-xs text-brand-beige-300">
                <span>By {{ $blog->author?->name ?? 'Agro Dairy Trade Desk' }}</span>
                <span>&bull;</span>
                <span>{{ $blog->published_at ? $blog->published_at->format('F d, Y') : $blog->created_at->format('F d, Y') }}</span>
                <span>&bull;</span>
                <span>{{ $blog->views_count }} Reads</span>
            </div>
        </div>
    </div>
</div>

<article class="py-16 md:py-20 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        @if($blog->featured_image)
            <div class="rounded-3xl overflow-hidden aspect-video shadow-md mb-12">
                <img src="{{ asset($blog->featured_image) }}" alt="{{ $blog->title }}" class="w-full h-full object-cover">
            </div>
        @endif

        <div class="prose prose-lg max-w-none text-neutral-700 leading-relaxed font-sans prose-headings:font-display prose-headings:text-brand-forest-900 prose-a:text-brand-forest-800">
            {!! nl2br(e($blog->content)) !!}
        </div>

        <!-- Share and Tags -->
        <div class="mt-12 pt-8 border-t border-brand-beige-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-xs text-neutral-500">
                Category: <strong class="text-brand-forest-900">{{ $blog->category?->name ?? 'General Export' }}</strong>
            </div>

            <div class="flex items-center gap-2">
                <span class="text-xs text-neutral-500 font-semibold">Share:</span>
                <a href="https://api.whatsapp.com/send?text={{ urlencode($blog->title . ' ' . url()->current()) }}" target="_blank" class="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition">
                    WhatsApp
                </a>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ urlencode(url()->current()) }}" target="_blank" class="px-3 py-1.5 bg-blue-700 text-white rounded-lg text-xs font-bold hover:bg-blue-800 transition">
                    LinkedIn
                </a>
            </div>
        </div>
    </div>
</article>

<!-- Related Articles -->
@if(isset($relatedBlogs) && $relatedBlogs->count() > 0)
    <section class="py-16 bg-brand-beige-50 border-t border-brand-beige-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-2xl font-bold font-display text-brand-forest-900 mb-8">Related Market Reports</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @foreach($relatedBlogs as $rel)
                    <div class="bg-white p-6 rounded-2xl border border-brand-beige-200 shadow-sm flex flex-col justify-between">
                        <div>
                            <span class="text-[11px] font-bold text-brand-gold-600 block mb-2">{{ $rel->category?->name }}</span>
                            <h3 class="text-base font-bold text-brand-forest-900 hover:text-brand-gold-600 transition-colors">
                                <a href="{{ route('blogs.show', $rel->slug) }}">{{ $rel->title }}</a>
                            </h3>
                            <p class="text-xs text-neutral-500 mt-2 line-clamp-2">{{ $rel->excerpt }}</p>
                        </div>
                        <a href="{{ route('blogs.show', $rel->slug) }}" class="mt-4 pt-4 border-t border-brand-beige-100 text-xs font-bold text-brand-forest-800">Read Article &rarr;</a>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endif
@endsection
