@props(['product'])

<div class="group bg-white dark:bg-[#0a1e1c] rounded-2xl border border-stone-200/80 dark:border-teal-900/50 shadow-sm hover:shadow-xl dark:hover:shadow-teal-950/50 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
    <!-- Image & Badge Container -->
    <div class="relative h-56 bg-stone-100 dark:bg-[#061716] overflow-hidden">
        @if($product->main_image && file_exists(public_path(ltrim($product->main_image, '/'))))
            <img src="{{ $product->main_image }}" alt="{{ $product->name }}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
        @else
            <div class="w-full h-full bg-gradient-to-br from-teal-900 to-stone-900 flex flex-col items-center justify-center p-6 text-center text-white">
                <span class="text-3xl font-bold text-amber-400 font-heading tracking-wide mb-1">{{ substr($product->name, 0, 1) }}</span>
                <span class="text-xs uppercase tracking-widest text-teal-200/80 font-medium">{{ $product->category->name }}</span>
            </div>
        @endif

        <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-teal-950/80 text-teal-200 backdrop-blur-md border border-teal-500/30">
                {{ $product->category->name }}
            </span>
            @if($product->is_featured)
                <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/90 text-stone-950 backdrop-blur-md font-bold">
                    Featured
                </span>
            @endif
        </div>

        <div class="absolute bottom-3 right-3">
            <span class="px-2.5 py-0.5 text-xs font-medium bg-black/60 text-white rounded-md backdrop-blur-sm">
                HS: {{ $product->hs_code }}
            </span>
        </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
            <div class="flex items-center text-xs text-stone-500 dark:text-stone-400 space-x-1.5 mb-1.5">
                <svg class="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>Origin: {{ $product->origin }}</span>
            </div>

            <h3 class="font-heading font-bold text-lg text-teal-950 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-300 transition leading-snug">
                <a href="{{ route('products.show', $product->slug) }}">
                    {{ $product->name }}
                </a>
            </h3>

            @if($product->grade_variety)
                <p class="text-xs text-stone-600 dark:text-stone-300 font-medium mt-1">
                    <span class="text-stone-400 dark:text-stone-500">Grade:</span> {{ $product->grade_variety }}
                </p>
            @endif

            <p class="text-xs text-stone-600 dark:text-stone-300 mt-2 line-clamp-2 leading-relaxed">
                {{ $product->short_description }}
            </p>

            <!-- Key Parameters Badge Strip -->
            @if($product->specifications->isNotEmpty())
                <div class="mt-3.5 pt-3 border-t border-stone-100 dark:border-teal-950 flex flex-wrap gap-1.5">
                    @foreach($product->specifications->take(3) as $spec)
                        <span class="inline-flex items-center text-[11px] bg-stone-100 dark:bg-[#061716] text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded border border-stone-200 dark:border-teal-900/60">
                            <strong class="font-medium mr-1 text-stone-800 dark:text-stone-200">{{ $spec->parameter }}:</strong> {{ $spec->value }}
                        </span>
                    @endforeach
                </div>
            @endif
        </div>

        <div class="mt-5 pt-3 border-t border-stone-100 dark:border-teal-950">
            <div class="flex items-center justify-between text-xs mb-3">
                <span class="text-stone-500 dark:text-stone-400 font-medium">Min Order (MOQ):</span>
                <span class="font-semibold text-teal-900 dark:text-teal-200 bg-teal-50 dark:bg-teal-950/80 px-2 py-0.5 rounded border border-teal-200/60 dark:border-teal-800/60">{{ $product->formatted_moq }}</span>
            </div>

            <div class="grid grid-cols-2 gap-2">
                <a href="{{ route('products.show', $product->slug) }}" class="inline-flex items-center justify-center text-xs font-semibold py-2 px-3 rounded-lg border border-teal-800 dark:border-teal-600 text-teal-900 dark:text-teal-200 hover:bg-teal-800 dark:hover:bg-teal-700 hover:text-white active:scale-95 transition">
                    Specifications
                </a>
                <button type="button" 
                    @click="$dispatch('open-rfq-modal', { productId: '{{ $product->id }}', productName: '{{ addslashes($product->name) }}' })"
                    class="inline-flex items-center justify-center text-xs font-semibold py-2 px-3 rounded-lg bg-teal-700 hover:bg-teal-600 active:scale-95 text-white transition shadow-sm">
                    Inquire Quote
                </button>
            </div>
        </div>
    </div>
</div>
