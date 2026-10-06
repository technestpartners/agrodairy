@extends('layouts.app', ['title' => 'Agri Export Insights & Market Reports - Agro Dairy Export LLP', 'metaDescription' => 'Industry insights, crop production estimates, export regulatory updates, and global market trends for Indian agricultural commodities.'])

@section('content')
<div class="relative bg-brand-forest-900 py-16 md:py-24 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-15 bg-radial from-brand-gold-500 via-transparent to-black pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <x-breadcrumbs :items="[['label' => 'Market Insights']]" />
        <div class="max-w-3xl mt-4">
            <span class="inline-block px-3 py-1 bg-brand-forest-800 text-brand-gold-400 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-forest-700">Market Intelligence</span>
            <h1 class="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Agricultural Trade Reports & Price Trends</h1>
            <p class="mt-4 text-base md:text-lg text-brand-beige-200 leading-relaxed">
                Stay informed with harvest production estimates, port logistics updates, and international food safety regulatory developments.
            </p>
        </div>
    </div>
</div>

<section class="py-16 md:py-20 bg-brand-beige-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Search and Categories -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div class="flex flex-wrap gap-2">
                <a href="{{ route('blogs.index') }}" class="px-4 py-2 rounded-xl text-xs font-bold transition {{ !request('category') ? 'bg-brand-forest-800 text-white' : 'bg-white text-neutral-700 border border-brand-beige-200 hover:bg-brand-beige-100' }}">
                    All Articles
                </a>
                @foreach($categories as $cat)
                    <a href="{{ route('blogs.index', ['category' => $cat->slug]) }}" class="px-4 py-2 rounded-xl text-xs font-bold transition {{ request('category') == $cat->slug ? 'bg-brand-forest-800 text-white' : 'bg-white text-neutral-700 border border-brand-beige-200 hover:bg-brand-beige-100' }}">
                        {{ $cat->name }} ({{ $cat->blogs_count }})
                    </a>
                @endforeach
            </div>

            <form action="{{ route('blogs.index') }}" method="GET" class="w-full md:w-72">
                <div class="relative">
                    <input type="text" name="search" value="{{ request('search') }}" placeholder="Search articles..." class="w-full pl-9 pr-4 py-2 bg-white border border-brand-beige-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-forest-800">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                </div>
            </form>
        </div>

        <!-- Articles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @forelse($blogs as $blog)
                <article class="bg-white rounded-2xl border border-brand-beige-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-brand-forest-400 hover:shadow-md transition-all group">
                    <div>
                        <div class="relative aspect-video overflow-hidden bg-brand-forest-900">
                            <img src="{{ $blog->featured_image ? asset($blog->featured_image) : asset('images/about-commodities.jpg') }}" alt="{{ $blog->title }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            @if($blog->category)
                                <span class="absolute top-3 left-3 px-2.5 py-1 bg-brand-forest-900/90 backdrop-blur-sm text-brand-gold-400 text-[11px] font-bold rounded-lg">
                                    {{ $blog->category->name }}
                                </span>
                            @endif
                        </div>

                        <div class="p-6">
                            <div class="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                                <span>{{ $blog->published_at ? $blog->published_at->format('M d, Y') : $blog->created_at->format('M d, Y') }}</span>
                                <span>&bull;</span>
                                <span>{{ $blog->views_count }} views</span>
                            </div>

                            <h3 class="text-lg font-bold font-display text-brand-forest-900 group-hover:text-brand-gold-600 transition-colors line-clamp-2 mb-2">
                                <a href="{{ route('blogs.show', $blog->slug) }}">{{ $blog->title }}</a>
                            </h3>

                            <p class="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                                {{ $blog->excerpt ?? Str::limit(strip_tags($blog->content), 120) }}
                            </p>
                        </div>
                    </div>

                    <div class="p-6 pt-0 border-t border-brand-beige-100 flex items-center justify-between mt-4">
                        <span class="text-xs text-neutral-500 font-medium">By {{ $blog->author?->name ?? 'Agro Trade Desk' }}</span>
                        <a href="{{ route('blogs.show', $blog->slug) }}" class="text-xs font-bold text-brand-forest-800 hover:text-brand-gold-600">Read Article &rarr;</a>
                    </div>
                </article>
            @empty
                <div class="col-span-full py-16 text-center text-neutral-500">
                    No articles found matching your criteria.
                </div>
            @endforelse
        </div>

        @if($blogs->hasPages())
            <div class="mt-12">
                {{ $blogs->links() }}
            </div>
        @endif
    </div>
</section>
@endsection
