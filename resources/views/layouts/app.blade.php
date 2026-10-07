<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', config('app.name', 'Agro Dairy Export LLP') . ' | Premium Agricultural Commodities Exporter from India')</title>
    <meta name="description" content="@yield('meta_description', 'Agro Dairy Export LLP is a premier processor and exporter of Indian Peanuts, Sesame Seeds, Whole Spices, Pulses, Kabuli Chickpeas, and Dehydrated Vegetables from Gujarat to over 40 countries.')">
    <meta name="keywords" content="@yield('meta_keywords', 'Indian Peanuts exporter, Bold peanuts, Java peanuts, Hulled sesame seeds, Indian cumin seeds, Kabuli chickpeas, agro export India, Mundra port export')">
    <link rel="canonical" href="{{ url()->current() }}">

    <!-- Open Graph / Social Meta -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="@yield('title', 'Agro Dairy Export LLP | Premier Agricultural Exporter')">
    <meta property="og:description" content="@yield('meta_description', 'Exporter of high quality certified Indian agricultural commodities to Middle East, Europe, Asia, and the Americas.')">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ asset('images/logo.png') }}">
    <meta property="og:site_name" content="Agro Dairy Export LLP">

    <!-- Google Fonts: Outfit & Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Immediate Theme Application (Zero Flicker) -->
    <script>
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>

    <!-- Vite Assets -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- Organization Schema JSON-LD -->
    <script type="application/ld+json">
    {
      "@@context": "https://schema.org",
      "@@type": "Corporation",
      "name": "Agro Dairy Export LLP",
      "alternateName": "Agro Dairy Export",
      "url": "{{ url('/') }}",
      "logo": "{{ asset('images/logo.png') }}",
      "contactPoint": {
        "@@type": "ContactPoint",
        "telephone": "{{ \App\Models\Setting::get('primary_phone', '+91 90233 63680') }}",
        "email": "{{ \App\Models\Setting::get('primary_email', 'agrodairyexportllp@gmail.com') }}",
        "contactType": "sales",
        "areaServed": "Worldwide",
        "availableLanguage": ["English", "Hindi", "Gujarati", "Arabic"]
      },
      "address": {
        "@@type": "PostalAddress",
        "streetAddress": "Office No. -701, THE FUTURE CORNER, Sarthana",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "postalCode": "395013",
        "addressCountry": "IN"
      }
    }
    </script>

    @stack('schema')
    @stack('styles')
</head>
<body class="bg-[#f8fafa] dark:bg-[#061514] text-stone-900 dark:text-stone-100 font-sans antialiased selection:bg-teal-700 selection:text-white flex flex-col min-h-screen pb-20 md:pb-0 transition-colors duration-200" x-data="{ showBackToTop: false }" @scroll.window="showBackToTop = (window.pageYOffset > 300)">
    <!-- Reusable Navbar -->
    <x-navbar />

    <!-- Optional Breadcrumbs Slot -->
    @yield('breadcrumbs')

    <!-- Flash Notifications / Alert Dialogs -->
    <x-alert />

    <!-- Main Page Content -->
    <main class="flex-1">
        @yield('content')
    </main>

    <!-- Floating Action Hub (WhatsApp + Call on Desktop, Back-to-Top on All) -->
    <div class="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end space-y-3 pointer-events-none">
        <!-- Back to Top -->
        <button type="button" 
            x-show="showBackToTop" 
            x-transition 
            @click="window.scrollTo({top: 0, behavior: 'smooth'})"
            title="Back to Top"
            class="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 bg-white/95 dark:bg-[#0c2220]/95 hover:bg-white text-teal-950 dark:text-teal-300 rounded-full shadow-lg border border-stone-200 dark:border-teal-800/60 flex items-center justify-center transition hover:-translate-y-0.5 active:scale-95">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
        </button>

        <!-- Direct Phone Call (Desktop Floating) -->
        <a href="tel:{{ preg_replace('/[^0-9+]/', '', \App\Models\Setting::get('primary_phone', '+91 90233 63680')) }}" 
           title="Call Export Sales Desk"
           class="pointer-events-auto hidden md:flex w-12 h-12 bg-teal-800 dark:bg-teal-700 hover:bg-teal-900 dark:hover:bg-teal-600 text-white rounded-full shadow-xl border-2 border-teal-500/60 items-center justify-center transition hover:-translate-y-0.5 active:scale-95">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        </a>

        <!-- WhatsApp Chat Button with Ping Animation (Desktop Floating) -->
        <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', \App\Models\Setting::get('whatsapp_number', '+919023363680')) }}?text={{ urlencode('Hello J.P. Vora / Agro Dairy Export team, I am an international buyer looking to source commodities.') }}" 
           target="_blank" 
           rel="noopener noreferrer"
           title="Chat with J.P. Vora on WhatsApp"
           class="pointer-events-auto hidden md:flex relative w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl items-center justify-center transition hover:-translate-y-1 active:scale-95 group">
            <span class="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border border-white"></span>
            </span>
            <!-- WhatsApp SVG Icon -->
            <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.004.57 1.77.876 2.806.877h.005c3.182 0 5.77-2.587 5.77-5.766.001-3.181-2.586-5.76-5.775-5.76zm3.391 8.163c-.144.405-.837.774-1.17.822-.312.043-.634.072-1.805-.414-1.258-.522-2.062-1.802-2.125-1.886-.062-.084-.509-.678-.509-1.293 0-.615.321-.918.435-1.042.115-.125.25-.156.333-.156.083 0 .167.001.24.005.077.004.18-.029.28.213.104.249.354.862.385.925.031.062.052.135.01.218-.041.083-.062.135-.124.208-.063.073-.131.163-.188.219-.062.062-.127.13-.054.255.073.125.323.533.693.863.477.424.879.555 1.004.617.125.062.198.052.271-.031.073-.083.312-.364.396-.489.083-.125.166-.104.281-.062.115.041.729.344.854.406.125.062.208.094.24.146.031.052.031.302-.113.707zm-3.397-10.335C6.549 4 2.11 8.439 2.113 13.918c.001 1.772.464 3.504 1.343 5.029L2 24.364l5.574-1.462c1.472.803 3.13 1.226 4.825 1.227h.006c5.485 0 9.923-4.439 9.921-9.919-.002-5.48-4.441-9.918-9.922-9.918z"/>
            </svg>
        </a>
    </div>

    <!-- Mobile Sticky Conversion Bar (Bottom fixed on phones with safe-area support) -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#061514]/95 backdrop-blur-md border-t border-stone-200 dark:border-teal-900/60 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl safe-area-pb">
        <!-- Direct Phone Call -->
        <a href="tel:{{ preg_replace('/[^0-9+]/', '', \App\Models\Setting::get('primary_phone', '+91 90233 63680')) }}" 
           class="flex-1 min-w-0 bg-stone-100 dark:bg-stone-900 active:bg-stone-200 dark:active:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold py-2.5 px-2 rounded-xl border border-stone-300 dark:border-teal-900/50 flex items-center justify-center space-x-1.5 transition active:scale-95">
            <svg class="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span class="truncate">Call</span>
        </a>

        <!-- WhatsApp Direct -->
        <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', \App\Models\Setting::get('whatsapp_number', '+919023363680')) }}?text={{ urlencode('Hello J.P. Vora / Agro Dairy Export team, I am an international buyer looking to source commodities.') }}" 
           target="_blank" rel="noopener noreferrer"
           class="flex-1 min-w-0 bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white text-xs font-bold py-2.5 px-2 rounded-xl shadow flex items-center justify-center space-x-1.5 transition">
            <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.004.57 1.77.876 2.806.877h.005c3.182 0 5.77-2.587 5.77-5.766.001-3.181-2.586-5.76-5.775-5.76zm3.391 8.163c-.144.405-.837.774-1.17.822-.312.043-.634.072-1.805-.414-1.258-.522-2.062-1.802-2.125-1.886-.062-.084-.509-.678-.509-1.293 0-.615.321-.918.435-1.042.115-.125.25-.156.333-.156.083 0 .167.001.24.005.077.004.18-.029.28.213.104.249.354.862.385.925.031.062.052.135.01.218-.041.083-.062.135-.124.208-.063.073-.131.163-.188.219-.062.062-.127.13-.054.255.073.125.323.533.693.863.477.424.879.555 1.004.617.125.062.198.052.271-.031.073-.083.312-.364.396-.489.083-.125.166-.104.281-.062.115.041.729.344.854.406.125.062.208.094.24.146.031.052.031.302-.113.707zm-3.397-10.335C6.549 4 2.11 8.439 2.113 13.918c.001 1.772.464 3.504 1.343 5.029L2 24.364l5.574-1.462c1.472.803 3.13 1.226 4.825 1.227h.006c5.485 0 9.923-4.439 9.921-9.919-.002-5.48-4.441-9.918-9.922-9.918z"/></svg>
            <span class="truncate">WhatsApp</span>
        </a>

        <!-- RFQ Modal Trigger -->
        <button type="button" @click="$dispatch('open-rfq-modal', {})" 
                class="flex-1 min-w-0 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-stone-950 text-xs font-extrabold py-2.5 px-2 rounded-xl shadow flex items-center justify-center space-x-1.5 transition border border-amber-400">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span class="truncate">Get RFQ</span>
        </button>
    </div>

    <!-- Global RFQ Quick Modal -->
    <x-rfq-modal />

    <!-- Reusable Authority Footer -->
    <x-footer />

    @stack('scripts')
</body>
</html>
