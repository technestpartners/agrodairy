@extends('layouts.admin', ['title' => 'Export Website Settings'])

@section('content')
<div class="max-w-4xl space-y-6">
    <div>
        <h1 class="text-2xl font-bold font-display text-stone-900">System & Enterprise Configurations</h1>
        <p class="text-xs text-stone-500">Manage statutory registrations, export emails, phone hotlines, and address records</p>
    </div>

    <div class="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
        <form action="{{ route('admin.settings.update') }}" method="POST" class="space-y-8">
            @csrf

            <!-- General Contact & Identifiers -->
            <div>
                <h3 class="text-sm font-bold font-display text-stone-900 pb-2 border-b border-stone-200 mb-4 uppercase tracking-wider text-teal-800">1. Corporate Contact & Hotlines</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label for="company_name" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Company Legal Name</label>
                        <input type="text" name="company_name" id="company_name" value="{{ \App\Models\Setting::get('company_name', 'Agro Dairy Export LLP') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                    </div>

                    <div>
                        <label for="contact_person" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Key Contact / Managing Partner</label>
                        <input type="text" name="contact_person" id="contact_person" value="{{ \App\Models\Setting::get('contact_person', 'J.P. Vora') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold">
                    </div>

                    <div>
                        <label for="primary_email" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Official Export Email</label>
                        <input type="email" name="primary_email" id="primary_email" value="{{ \App\Models\Setting::get('primary_email', 'agrodairyexportllp@gmail.com') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                    </div>

                    <div>
                        <label for="primary_phone" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Primary Telephone Hotline</label>
                        <input type="text" name="primary_phone" id="primary_phone" value="{{ \App\Models\Setting::get('primary_phone', '+91 90233 63680') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono">
                    </div>

                    <div>
                        <label for="whatsapp_number" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Official WhatsApp Number (With Country Code)</label>
                        <input type="text" name="whatsapp_number" id="whatsapp_number" value="{{ \App\Models\Setting::get('whatsapp_number', '+919023363680') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono">
                    </div>
                </div>
            </div>

            <!-- Statutory License Numbers -->
            <div>
                <h3 class="text-sm font-bold font-display text-stone-900 pb-2 border-b border-stone-200 mb-4 uppercase tracking-wider text-teal-800">2. Statutory Licenses & Export Registration Numbers</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <label for="iec_number" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">IEC Code (DGFT)</label>
                        <input type="text" name="iec_number" id="iec_number" value="{{ \App\Models\Setting::get('iec_number', '0817029381') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono font-bold">
                    </div>

                    <div>
                        <label for="gstin_number" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">GSTIN Identification</label>
                        <input type="text" name="gstin_number" id="gstin_number" value="{{ \App\Models\Setting::get('gstin_number', '24AAHFA3928L1Z9') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono font-bold">
                    </div>

                    <div>
                        <label for="fssai_number" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">FSSAI Central License</label>
                        <input type="text" name="fssai_number" id="fssai_number" value="{{ \App\Models\Setting::get('fssai_number', '10722026000148') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono font-bold">
                    </div>
                </div>
            </div>

            <!-- Physical Premises -->
            <div>
                <h3 class="text-sm font-bold font-display text-stone-900 pb-2 border-b border-stone-200 mb-4 uppercase tracking-wider text-teal-800">3. Operational Locations</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label for="head_office_address" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Registered Corporate Office (Surat)</label>
                        <textarea name="head_office_address" id="head_office_address" rows="3" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs">{{ \App\Models\Setting::get('head_office_address', 'office no. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India') }}</textarea>
                    </div>

                    <div>
                        <label for="processing_plant_address" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Processing & Sorting Facility (Gondal)</label>
                        <textarea name="processing_plant_address" id="processing_plant_address" rows="3" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs">{{ \App\Models\Setting::get('processing_plant_address', 'Saurashtra Processing Terminal, GIDC Industrial Estate, Gondal - 360311, Dist. Rajkot, Gujarat, India') }}</textarea>
                    </div>
                </div>
            </div>

            <div class="pt-6 border-t border-stone-200 flex justify-end">
                <button type="submit" class="px-8 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-xl transition shadow-lg">Save System Configuration</button>
            </div>
        </form>
    </div>
</div>
@endsection
