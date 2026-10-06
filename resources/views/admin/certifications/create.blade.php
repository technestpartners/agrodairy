@extends('layouts.admin', ['title' => 'Add Certification'])

@section('content')
<div class="max-w-3xl space-y-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Add Export Certification</h1>
            <p class="text-xs text-stone-500">Record accredited statutory food safety license</p>
        </div>
        <a href="{{ route('admin.certifications.index') }}" class="text-xs font-bold text-stone-600 hover:text-stone-900">&larr; Back to Certifications</a>
    </div>

    <div class="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
        <form action="{{ route('admin.certifications.store') }}" method="POST" class="space-y-6">
            @csrf

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label for="title" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Certification Title *</label>
                    <input type="text" name="title" id="title" value="{{ old('title') }}" required placeholder="e.g. APEDA Export Registration (RCMC)" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                    @error('title') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                </div>

                <div>
                    <label for="certificate_no" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Certificate / License No</label>
                    <input type="text" name="certificate_no" id="certificate_no" value="{{ old('certificate_no') }}" placeholder="e.g. APEDA/RCMC/2026/0892" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-800">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label for="issuing_body" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Issuing Authority / Agency *</label>
                    <input type="text" name="issuing_body" id="issuing_body" value="{{ old('issuing_body') }}" required placeholder="e.g. Ministry of Commerce, Govt of India" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                </div>

                <div>
                    <label for="status" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Status *</label>
                    <select name="status" id="status" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                        <option value="active">Active & Verified</option>
                        <option value="under_renewal">Under Renewal</option>
                        <option value="pending">Pending Audit</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label for="issue_date" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Issue / Registration Date</label>
                    <input type="date" name="issue_date" id="issue_date" value="{{ old('issue_date') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                </div>

                <div>
                    <label for="expiry_date" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Validity Expiry Date</label>
                    <input type="date" name="expiry_date" id="expiry_date" value="{{ old('expiry_date') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
                </div>
            </div>

            <div>
                <label for="verification_url" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Official Online Verification Link (Optional)</label>
                <input type="url" name="verification_url" id="verification_url" value="{{ old('verification_url') }}" placeholder="https://apeda.gov.in/..." class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">
            </div>

            <div>
                <label for="description" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Audit Scope & Description</label>
                <textarea name="description" id="description" rows="3" placeholder="Scope of accredited manufacturing, hygiene standards, processing facilities..." class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm">{{ old('description') }}</textarea>
            </div>

            <div class="flex items-center gap-6 pt-2">
                <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                    <input type="checkbox" name="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }} class="rounded border-stone-300 text-emerald-800 focus:ring-emerald-800">
                    <span>Display on Public Website Certifications Registry</span>
                </label>
            </div>

            <div class="pt-6 border-t border-stone-200 flex justify-end gap-3">
                <a href="{{ route('admin.certifications.index') }}" class="px-5 py-2.5 bg-stone-100 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-200 transition">Cancel</a>
                <button type="submit" class="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow">Save Accreditation</button>
            </div>
        </form>
    </div>
</div>
@endsection
