<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Authentication | Agro Dairy Export LLP</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-brand-forest-950 font-sans min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full">
        <!-- Logo & Title -->
        <div class="text-center mb-8">
            <img src="/images/logo-dark.png" alt="Agro Dairy Export LLP" class="h-16 w-auto mx-auto mb-4">
            <h1 class="text-2xl font-bold font-display text-white">Enterprise Export Portal</h1>
            <p class="text-xs text-brand-beige-300 mt-1">Authorized personnel only &bull; Agro Dairy Export LLP</p>
        </div>

        <div class="bg-white rounded-3xl p-8 shadow-2xl border border-stone-800">
            @if(session('error'))
                <div class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
                    {{ session('error') }}
                </div>
            @endif

            <form action="{{ route('admin.login.submit') }}" method="POST" class="space-y-5">
                @csrf

                <div>
                    <label for="email" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Staff Email Address</label>
                    <input type="email" name="email" id="email" value="{{ old('email', 'admin@agrodairy.com') }}" required autofocus
                           placeholder="staff@agrodairy.com"
                           class="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-700 focus:bg-white text-stone-900">
                    @error('email') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                </div>

                <div>
                    <label for="password" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Security Password</label>
                    <input type="password" name="password" id="password" required value="password123"
                           placeholder="••••••••••••"
                           class="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-700 focus:bg-white text-stone-900">
                    @error('password') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                </div>

                <div class="flex items-center justify-between text-xs">
                    <label class="flex items-center gap-2 cursor-pointer text-stone-600">
                        <input type="checkbox" name="remember" class="rounded border-stone-300 text-emerald-800 focus:ring-emerald-800">
                        <span>Remember session</span>
                    </label>
                    <span class="text-stone-400">Default: password123</span>
                </div>

                <button type="submit" class="w-full py-3.5 bg-brand-forest-900 hover:bg-black text-white font-bold text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2">
                    <span>Authenticate into ERP</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
            </form>

            <div class="mt-8 pt-6 border-t border-stone-100 text-center">
                <span class="text-[11px] text-stone-400 block">Configured Demo Staff Logins:</span>
                <div class="mt-2 flex flex-wrap justify-center gap-1.5 text-[10px] font-mono text-stone-600">
                    <span class="bg-stone-100 px-2 py-0.5 rounded">admin@agrodairy.com</span>
                    <span class="bg-stone-100 px-2 py-0.5 rounded">sales@agrodairy.com</span>
                    <span class="bg-stone-100 px-2 py-0.5 rounded">quality@agrodairy.com</span>
                </div>
            </div>
        </div>

        <div class="text-center mt-6">
            <a href="{{ route('home') }}" class="text-xs text-brand-beige-400 hover:text-white transition">
                &larr; Return to Public Website
            </a>
        </div>
    </div>
</body>
</html>
