@extends('layouts.admin', ['title' => 'RFQ Inquiries CRM'])

@section('content')
<div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">RFQ Inquiries & Lead CRM</h1>
            <p class="text-xs text-stone-500">Track and respond to international commercial buyer procurement requests</p>
        </div>
        <div class="flex items-center gap-3">
            <a href="{{ route('admin.inquiries.export_csv') }}" class="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition flex items-center gap-2 border border-stone-200">
                <svg class="w-4 h-4 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Export CSV</span>
            </a>
            <a href="{{ route('admin.quotations.create') }}" class="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow flex items-center gap-2">
                <span>+ Create Quotation</span>
            </a>
        </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <form action="{{ route('admin.inquiries.index') }}" method="GET" class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-grow">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search by RFQ number, buyer name, company, email, country..." class="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-800">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
            </div>

            <select name="status" onchange="this.form.submit()" class="px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-800">
                <option value="">-- All Statuses --</option>
                <option value="new" {{ request('status') == 'new' ? 'selected' : '' }}>New</option>
                <option value="reviewed" {{ request('status') == 'reviewed' ? 'selected' : '' }}>Reviewed</option>
                <option value="assigned" {{ request('status') == 'assigned' ? 'selected' : '' }}>Assigned</option>
                <option value="quotation_prepared" {{ request('status') == 'quotation_prepared' ? 'selected' : '' }}>Quotation Prepared</option>
                <option value="quotation_sent" {{ request('status') == 'quotation_sent' ? 'selected' : '' }}>Quotation Sent</option>
                <option value="negotiation" {{ request('status') == 'negotiation' ? 'selected' : '' }}>Under Negotiation</option>
                <option value="accepted" {{ request('status') == 'accepted' ? 'selected' : '' }}>Accepted</option>
                <option value="rejected" {{ request('status') == 'rejected' ? 'selected' : '' }}>Rejected</option>
                <option value="completed" {{ request('status') == 'completed' ? 'selected' : '' }}>Completed</option>
            </select>

            <select name="assigned_to" onchange="this.form.submit()" class="px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-800">
                <option value="">-- Assigned Staff --</option>
                @foreach($salesStaff as $staff)
                    <option value="{{ $staff->id }}" {{ request('assigned_to') == $staff->id ? 'selected' : '' }}>
                        {{ $staff->name }}
                    </option>
                @endforeach
            </select>

            <button type="submit" class="px-4 py-2 bg-stone-800 text-white text-xs font-bold rounded-xl hover:bg-stone-900 transition">Filter</button>
            @if(request('search') || request('status') || request('assigned_to'))
                <a href="{{ route('admin.inquiries.index') }}" class="px-3 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl hover:bg-stone-200 transition text-center">Reset</a>
            @endif
        </form>
    </div>

    <!-- Inquiries Table -->
    <div class="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-semibold">
                        <th class="p-4">RFQ Number</th>
                        <th class="p-4">Buyer Details</th>
                        <th class="p-4">Commodity Requested</th>
                        <th class="p-4">Volume & Terms</th>
                        <th class="p-4">Assigned To</th>
                        <th class="p-4">Status</th>
                        <th class="p-4">Date</th>
                        <th class="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-stone-100 text-stone-700">
                    @forelse($inquiries as $inq)
                        <tr class="hover:bg-stone-50/60 transition-colors">
                            <td class="p-4 font-mono font-bold text-stone-900">
                                <a href="{{ route('admin.inquiries.show', $inq->id) }}" class="text-emerald-900 hover:underline">
                                    {{ $inq->inquiry_number }}
                                </a>
                            </td>
                            <td class="p-4">
                                <div class="font-bold text-stone-900 text-sm">{{ $inq->name }}</div>
                                <div class="text-[11px] text-stone-500">{{ $inq->company ?? 'Direct Buyer' }} &bull; {{ $inq->country }}</div>
                                <div class="text-[11px] text-stone-400 font-mono">{{ $inq->email }}</div>
                            </td>
                            <td class="p-4">
                                <div class="font-bold text-stone-900">{{ $inq->product?->name ?? 'Custom Sourcing' }}</div>
                                @if($inq->product_variant)
                                    <div class="text-[11px] text-stone-500">{{ $inq->product_variant }}</div>
                                @endif
                            </td>
                            <td class="p-4">
                                <div class="font-bold text-stone-900">{{ $inq->quantity ? $inq->quantity . ' ' . $inq->unit : 'Flexible MT' }}</div>
                                <div class="text-[11px] text-stone-500">{{ $inq->incoterm ?? 'FOB' }} &bull; {{ $inq->destination_port ?? 'Port TBA' }}</div>
                            </td>
                            <td class="p-4">
                                @if($inq->assignedUser)
                                    <span class="font-medium text-stone-900">{{ $inq->assignedUser->name }}</span>
                                @else
                                    <span class="text-amber-600 font-bold text-[11px]">Unassigned</span>
                                @endif
                            </td>
                            <td class="p-4">
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase
                                    {{ $inq->status == 'new' ? 'bg-amber-100 text-amber-800' :
                                       ($inq->status == 'quotation_sent' ? 'bg-blue-100 text-blue-800' :
                                       ($inq->status == 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700')) }}">
                                    {{ str_replace('_', ' ', $inq->status) }}
                                </span>
                            </td>
                            <td class="p-4 text-stone-400 font-mono text-[11px]">
                                {{ $inq->created_at->format('d M, Y') }}
                            </td>
                            <td class="p-4 text-right">
                                <a href="{{ route('admin.inquiries.show', $inq->id) }}" class="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-[11px] rounded-lg transition shadow">
                                    Manage Lead
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="p-8 text-center text-stone-400">No inquiry submissions found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($inquiries->hasPages())
            <div class="p-4 border-t border-stone-200 bg-stone-50">
                {{ $inquiries->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
