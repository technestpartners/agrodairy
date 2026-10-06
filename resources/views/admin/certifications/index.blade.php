@extends('layouts.admin', ['title' => 'Certifications & Accreditations'])

@section('content')
<div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Food Safety & Export Accreditations</h1>
            <p class="text-xs text-stone-500">Manage statutory licenses, international food standards, and expiration renewals</p>
        </div>
        <a href="{{ route('admin.certifications.create') }}" class="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow flex items-center gap-2 self-start">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Add Accreditation</span>
        </a>
    </div>

    <!-- Certifications Table -->
    <div class="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-semibold">
                        <th class="p-4">Certificate Name</th>
                        <th class="p-4">Registration No</th>
                        <th class="p-4">Issuing Authority</th>
                        <th class="p-4">Validity Expiry</th>
                        <th class="p-4">Status</th>
                        <th class="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-stone-100 text-stone-700">
                    @forelse($certifications as $cert)
                        <tr class="hover:bg-stone-50/60 transition-colors">
                            <td class="p-4">
                                <div class="font-bold text-stone-900 text-sm">{{ $cert->title }}</div>
                                @if($cert->description)
                                    <div class="text-[11px] text-stone-500 line-clamp-1">{{ $cert->description }}</div>
                                @endif
                            </td>
                            <td class="p-4 font-mono font-bold text-stone-800">{{ $cert->certificate_no ?? '—' }}</td>
                            <td class="p-4 font-medium">{{ $cert->issuing_body }}</td>
                            <td class="p-4 font-mono text-[11px]">
                                @if($cert->expiry_date)
                                    <span class="{{ $cert->is_expired ? 'text-red-600 font-bold' : ($cert->days_until_expiry < 90 ? 'text-amber-600 font-bold' : 'text-stone-600') }}">
                                        {{ $cert->expiry_date->format('d M, Y') }}
                                        @if($cert->days_until_expiry !== null && !$cert->is_expired)
                                            <span class="block text-[10px] text-stone-400">({{ $cert->days_until_expiry }} days left)</span>
                                        @endif
                                    </span>
                                @else
                                    <span class="text-stone-400">Perpetual</span>
                                @endif
                            </td>
                            <td class="p-4">
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase
                                    {{ $cert->status == 'active' ? 'bg-emerald-100 text-emerald-800' :
                                       ($cert->status == 'under_renewal' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800') }}">
                                    {{ str_replace('_', ' ', $cert->status) }}
                                </span>
                            </td>
                            <td class="p-4 text-right space-x-2 whitespace-nowrap">
                                <a href="{{ route('admin.certifications.edit', $cert->id) }}" class="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px] rounded-lg transition">Edit</a>
                                <form action="{{ route('admin.certifications.destroy', $cert->id) }}" method="POST" class="inline" onsubmit="return confirm('Delete this certification record?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[11px] rounded-lg transition">Delete</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="p-8 text-center text-stone-400">No certification records found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($certifications->hasPages())
            <div class="p-4 border-t border-stone-200 bg-stone-50">
                {{ $certifications->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
