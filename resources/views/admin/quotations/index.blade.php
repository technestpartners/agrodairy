@extends('layouts.admin', ['title' => 'Quotations CRM'])

@section('content')
<div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Commercial Proforma Quotations</h1>
            <p class="text-xs text-stone-500">Generate, track, and export binding export proformas with DomPDF</p>
        </div>
        <a href="{{ route('admin.quotations.create') }}" class="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow flex items-center gap-2 self-start">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Create New Quotation</span>
        </a>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <form action="{{ route('admin.quotations.index') }}" method="GET" class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-grow">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search by Quotation number, destination port, buyer or company..." class="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-800">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
            </div>

            <select name="status" onchange="this.form.submit()" class="px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-800">
                <option value="">-- All Statuses --</option>
                <option value="draft" {{ request('status') == 'draft' ? 'selected' : '' }}>Draft</option>
                <option value="sent" {{ request('status') == 'sent' ? 'selected' : '' }}>Sent to Buyer</option>
                <option value="revised" {{ request('status') == 'revised' ? 'selected' : '' }}>Revised</option>
                <option value="accepted" {{ request('status') == 'accepted' ? 'selected' : '' }}>Accepted / Contracted</option>
                <option value="rejected" {{ request('status') == 'rejected' ? 'selected' : '' }}>Rejected</option>
                <option value="expired" {{ request('status') == 'expired' ? 'selected' : '' }}>Expired</option>
            </select>

            <button type="submit" class="px-4 py-2 bg-stone-800 text-white text-xs font-bold rounded-xl hover:bg-stone-900 transition">Filter</button>
            @if(request('search') || request('status'))
                <a href="{{ route('admin.quotations.index') }}" class="px-3 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl hover:bg-stone-200 transition text-center">Reset</a>
            @endif
        </form>
    </div>

    <!-- Quotations Table -->
    <div class="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-semibold">
                        <th class="p-4">Quotation No</th>
                        <th class="p-4">Buyer / Consignee</th>
                        <th class="p-4">Incoterm & Port</th>
                        <th class="p-4">Grand Total</th>
                        <th class="p-4">Validity</th>
                        <th class="p-4">Status</th>
                        <th class="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-stone-100 text-stone-700">
                    @forelse($quotations as $q)
                        <tr class="hover:bg-stone-50/60 transition-colors">
                            <td class="p-4 font-mono font-bold text-stone-900">
                                <a href="{{ route('admin.quotations.show', $q->id) }}" class="text-emerald-900 hover:underline">
                                    {{ $q->quotation_number }}
                                </a>
                            </td>
                            <td class="p-4">
                                <div class="font-bold text-stone-900 text-sm">{{ $q->inquiry?->name ?? 'Commercial Buyer' }}</div>
                                <div class="text-[11px] text-stone-500">{{ $q->inquiry?->company ?? 'Direct Account' }}</div>
                            </td>
                            <td class="p-4">
                                <span class="font-bold text-stone-900">{{ $q->incoterm }}</span>
                                <div class="text-[11px] text-stone-500">{{ $q->destination_port }}</div>
                            </td>
                            <td class="p-4">
                                <div class="text-sm font-bold font-mono text-emerald-900">
                                    {{ $q->currency }} {{ number_format($q->grand_total, 2) }}
                                </div>
                            </td>
                            <td class="p-4 font-mono text-[11px] text-stone-500">
                                {{ $q->valid_until ? $q->valid_until->format('d M, Y') : 'Perpetual' }}
                            </td>
                            <td class="p-4">
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase
                                    {{ $q->status == 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                                       ($q->status == 'sent' ? 'bg-blue-100 text-blue-800' :
                                       ($q->status == 'draft' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-700')) }}">
                                    {{ $q->status }}
                                </span>
                            </td>
                            <td class="p-4 text-right space-x-2 whitespace-nowrap">
                                <a href="{{ route('admin.quotations.preview_pdf', $q->id) }}" target="_blank" class="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[11px] rounded-lg transition">PDF View</a>
                                <a href="{{ route('admin.quotations.download_pdf', $q->id) }}" class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-[11px] rounded-lg transition">Download</a>
                                <a href="{{ route('admin.quotations.show', $q->id) }}" class="px-3 py-1 bg-stone-800 hover:bg-stone-900 text-white font-bold text-[11px] rounded-lg transition">Manage</a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="p-8 text-center text-stone-400">No quotation proformas found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($quotations->hasPages())
            <div class="p-4 border-t border-stone-200 bg-stone-50">
                {{ $quotations->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
