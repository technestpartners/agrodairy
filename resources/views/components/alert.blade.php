@if(session('success'))
<div x-data="{ show: true }" x-show="show" x-transition class="fixed bottom-5 right-5 z-50 max-w-md bg-emerald-900 text-white px-5 py-4 rounded-xl shadow-2xl border border-emerald-700 flex items-start space-x-3">
    <div class="text-amber-400 shrink-0 mt-0.5">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    </div>
    <div class="flex-1 text-sm">
        <p class="font-semibold text-white">Success</p>
        <p class="text-stone-200 mt-0.5 leading-relaxed">{{ session('success') }}</p>
    </div>
    <button @click="show = false" class="text-stone-300 hover:text-white transition">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
</div>
@endif

@if(session('error') || $errors->any())
<div x-data="{ show: true }" x-show="show" x-transition class="fixed bottom-5 right-5 z-50 max-w-md bg-rose-900 text-white px-5 py-4 rounded-xl shadow-2xl border border-rose-700 flex items-start space-x-3">
    <div class="text-rose-300 shrink-0 mt-0.5">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    </div>
    <div class="flex-1 text-sm">
        <p class="font-semibold text-white">Attention Required</p>
        @if(session('error'))
            <p class="text-rose-100 mt-0.5">{{ session('error') }}</p>
        @endif
        @if($errors->any())
            <ul class="list-disc list-inside mt-1 text-rose-100 space-y-0.5">
                @foreach($errors->all() as $err)
                    <li>{{ $err }}</li>
                @endforeach
            </ul>
        @endif
    </div>
    <button @click="show = false" class="text-rose-200 hover:text-white transition">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
</div>
@endif
