@props(['items' => []])

@if(!empty($items))
<nav aria-label="Breadcrumb" class="py-3 px-4 bg-stone-100/70 border-b border-stone-200 text-xs sm:text-sm font-medium">
    <div class="max-w-7xl mx-auto flex items-center space-x-2 text-stone-600 overflow-x-auto whitespace-nowrap">
        <a href="{{ route('home') }}" class="hover:text-emerald-800 flex items-center transition">
            <svg class="w-4 h-4 mr-1 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            Home
        </a>

        @foreach($items as $key => $val)
            @php
                if (is_array($val)) {
                    $label = $val['label'] ?? $val['title'] ?? (is_string($key) ? $key : '');
                    $url = $val['url'] ?? $val['link'] ?? null;
                } else {
                    $label = is_string($key) ? $key : (string)$val;
                    $url = !empty($val) && is_string($val) ? $val : null;
                }
            @endphp
            <span class="text-stone-400">/</span>
            @if($loop->last || empty($url))
                <span class="text-emerald-900 font-semibold" aria-current="page">{{ $label }}</span>
            @else
                <a href="{{ $url }}" class="hover:text-emerald-800 transition">{{ $label }}</a>
            @endif
        @endforeach
    </div>
</nav>
@endif
