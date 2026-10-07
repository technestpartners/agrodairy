<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Admin Dashboard') | Agro Dairy Export LLP</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-stone-100 font-sans text-stone-900 antialiased flex h-screen overflow-hidden">
    <!-- Flash Notifications -->
    <x-alert />

    <!-- Sidebar -->
    <aside class="w-64 bg-gradient-to-b from-stone-950 via-emerald-950 to-stone-900 text-stone-300 flex flex-col shrink-0 border-r border-stone-800">
        <!-- Logo & Header -->
        <div class="p-5 border-b border-stone-800/80 flex items-center space-x-3">
            <img src="/images/logo-dark.png" alt="Logo" class="h-10 w-auto">
            <div>
                <span class="block text-xs font-bold text-white uppercase tracking-wider font-heading">Agro Dairy ERP</span>
                <span class="block text-[10px] text-amber-400 font-medium">Export Management Portal</span>
            </div>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 overflow-y-auto p-4 space-y-1.5 text-xs font-medium">
            <a href="{{ route('admin.dashboard') }}" class="flex items-center space-x-3 px-3 py-2.5 rounded-xl transition {{ request()->routeIs('admin.dashboard') ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800/80 hover:text-white' }}">
                <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                <span>Dashboard</span>
            </a>

            <!-- Sales & CRM Section -->
            @if(auth()->user()->isSales())
                <div class="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500">Sales & Inquiries</div>
                
                <a href="{{ route('admin.inquiries.index') }}" class="flex items-center justify-between px-3 py-2.5 rounded-xl transition {{ request()->routeIs('admin.inquiries.*') ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800/80 hover:text-white' }}">
                    <div class="flex items-center space-x-3">
                        <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                        <span>RFQ Inquiries</span>
                    </div>
                    @php $newCount = \App\Models\Inquiry::where('status', 'new')->count(); @endphp
                    @if($newCount > 0)
                        <span class="px-1.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px]">{{ $newCount }}</span>
                    @endif
                </a>

                <a href="{{ route('admin.quotations.index') }}" class="flex items-center space-x-3 px-3 py-2.5 rounded-xl transition {{ request()->routeIs('admin.quotations.*') ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800/80 hover:text-white' }}">
                    <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    <span>Quotations CRM</span>
                </a>
            @endif

            <!-- Catalogue Management -->
            @if(auth()->user()->canManageProducts())
                <div class="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500">Catalogue & CMS</div>

                <a href="{{ route('admin.categories.index') }}" class="flex items-center space-x-3 px-3 py-2.5 rounded-xl transition {{ request()->routeIs('admin.categories.*') ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800/80 hover:text-white' }}">
                    <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                    <span>Categories</span>
                </a>

                <a href="{{ route('admin.products.index') }}" class="flex items-center space-x-3 px-3 py-2.5 rounded-xl transition {{ request()->routeIs('admin.products.*') ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800/80 hover:text-white' }}">
                    <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    <span>Products & Specs</span>
                </a>

                <a href="{{ route('admin.blogs.index') }}" class="flex items-center space-x-3 px-3 py-2.5 rounded-xl transition {{ request()->routeIs('admin.blogs.*') ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800/80 hover:text-white' }}">
                    <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"/></svg>
                    <span>Market Blog Posts</span>
                </a>
            @endif

            <!-- Quality & Traceability -->
            @if(auth()->user()->isQuality() || auth()->user()->isAdmin())
                <div class="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500">Quality & Lots</div>

                <a href="{{ route('admin.certifications.index') }}" class="flex items-center space-x-3 px-3 py-2.5 rounded-xl transition {{ request()->routeIs('admin.certifications.*') ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800/80 hover:text-white' }}">
                    <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    <span>Certifications</span>
                </a>

                <a href="{{ route('admin.traceability.index') }}" class="flex items-center space-x-3 px-3 py-2.5 rounded-xl transition {{ request()->routeIs('admin.traceability.*') ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800/80 hover:text-white' }}">
                    <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <span>Batch Traceability</span>
                </a>
            @endif

            <!-- System Settings & Audit Logs -->
            @if(auth()->user()->isAdmin())
                <div class="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500">Administration</div>

                <a href="{{ route('admin.settings.index') }}" class="flex items-center space-x-3 px-3 py-2.5 rounded-xl transition {{ request()->routeIs('admin.settings.*') ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800/80 hover:text-white' }}">
                    <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span>Website & Export Config</span>
                </a>

                <a href="{{ route('admin.audit.index') }}" class="flex items-center space-x-3 px-3 py-2.5 rounded-xl transition {{ request()->routeIs('admin.audit.*') ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-stone-800/80 hover:text-white' }}">
                    <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                    <span>Audit Trail Log</span>
                </a>
            @endif

            <div class="pt-4 mt-4 border-t border-stone-800">
                <a href="{{ route('home') }}" target="_blank" class="flex items-center space-x-3 px-3 py-2 rounded-xl text-stone-400 hover:text-emerald-400 hover:bg-stone-800/50 transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    <span>View Public Website ↗</span>
                </a>
            </div>
        </nav>

        <!-- User Profile & Logout -->
        <div class="p-4 border-t border-stone-800 bg-stone-950/70 flex items-center justify-between">
            <div class="truncate mr-2">
                <p class="text-xs font-semibold text-white truncate">{{ auth()->user()->name }}</p>
                <span class="inline-block px-1.5 py-0.2 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-900 text-emerald-300">
                    {{ str_replace('_', ' ', auth()->user()->role) }}
                </span>
            </div>
            <form action="{{ route('admin.logout') }}" method="POST">
                @csrf
                <button type="submit" title="Logout" class="p-1.5 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                </button>
            </form>
        </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Top Navigation -->
        <header class="bg-white border-b border-stone-200 h-16 flex items-center justify-between px-6 shrink-0">
            <div class="flex items-center space-x-3">
                <h2 class="text-lg font-bold font-heading text-stone-900">@yield('title', 'Admin Dashboard')</h2>
            </div>
            <div class="flex items-center space-x-4 text-xs">
                <span class="text-stone-500">Department: <strong class="text-stone-800">{{ auth()->user()->department ?? 'Administration' }}</strong></span>
                <span class="text-stone-300">|</span>
                <span class="text-stone-500">{{ now()->format('l, d M Y') }}</span>
            </div>
        </header>

        <!-- Dynamic View Body -->
        <main class="flex-1 overflow-y-auto p-6 bg-stone-50">
            @yield('content')
        </main>
    </div>
</body>
</html>
