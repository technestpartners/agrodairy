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
        "telephone": "+91-98250-12345",
        "contactType": "sales",
        "areaServed": "Worldwide",
        "availableLanguage": ["English", "Hindi", "Gujarati", "Arabic"]
      },
      "address": {
        "@@type": "PostalAddress",
        "streetAddress": "Food Agro Park, National Highway 27, Near Marketing Yard",
        "addressLocality": "Rajkot",
        "addressRegion": "Gujarat",
        "postalCode": "360003",
        "addressCountry": "IN"
      }
    }
    </script>

    @stack('styles')
</head>
<body class="bg-[#faf8f5] text-stone-900 font-sans antialiased selection:bg-emerald-800 selection:text-white flex flex-col min-h-screen">
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

    <!-- Global RFQ Quick Modal -->
    <x-rfq-modal />

    <!-- Reusable Authority Footer -->
    <x-footer />

    @stack('scripts')
</body>
</html>
