@extends('layouts.admin', ['title' => 'Executive Export Dashboard'])

@section('content')
<div class="space-y-8">
    <!-- Top Welcome Banner -->
    <div class="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 rounded-3xl p-6 md:p-8 text-white shadow-lg border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
            <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 uppercase tracking-wider">
                    Role: {{ auth()->user()->role_name }}
                </span>
                <span class="text-xs text-stone-400">Terminal: Rajkot HQ / Mundra Gateway</span>
            </div>
            <h1 class="text-2xl md:text-3xl font-display font-bold text-white">Welcome back, {{ auth()->user()->name }}</h1>
            <p class="text-xs md:text-sm text-stone-300 mt-1 max-w-xl">
                Commercial export operations monitoring: Inquiries, RFQ status pipelines, proforma quotations, and compliance certificates.
            </p>
        </div>

        <div class="flex items-center gap-3">
            <a href="{{ route('admin.inquiries.index') }}" class="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl transition shadow flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                <span>View RFQ Inbox</span>
            </a>
            <a href="{{ route('admin.quotations.create') }}" class="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>New Quotation</span>
            </a>
        </div>
    </div>

    <!-- 4 Key Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- New Inquiries -->
        <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
                <span class="text-xs font-semibold text-stone-500 uppercase tracking-wider block">New RFQ Inquiries</span>
                <span class="text-3xl font-display font-bold text-stone-900 mt-1 block">{{ $newInquiries }}</span>
                <span class="text-[11px] text-amber-600 font-medium mt-1 block">{{ $totalInquiries }} Total Inquiries Logged</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
            </div>
        </div>

        <!-- Pending Quotations -->
        <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
                <span class="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Active Quotations</span>
                <span class="text-3xl font-display font-bold text-stone-900 mt-1 block">{{ $pendingQuotations }}</span>
                <span class="text-[11px] text-stone-400 mt-1 block">Awaiting Buyer Confirmation</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
        </div>

        <!-- Accepted Proformas -->
        <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
                <span class="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Accepted Orders</span>
                <span class="text-3xl font-display font-bold text-emerald-800 mt-1 block">{{ $acceptedQuotations }}</span>
                <span class="text-[11px] text-emerald-600 font-medium mt-1 block">Value: ${{ number_format($acceptedValue, 2) }}</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
        </div>

        <!-- Published Products -->
        <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
                <span class="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Live Catalogue</span>
                <span class="text-3xl font-display font-bold text-stone-900 mt-1 block">{{ $publishedProducts }}</span>
                <span class="text-[11px] text-stone-400 mt-1 block">{{ $totalProducts }} Total Commodity SKUs</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </div>
        </div>
    </div>

    <!-- Middle Split: Recent Inquiries & Status Breakdown -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Recent Inquiries Table -->
        <div class="lg:col-span-8 bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-stone-100 flex items-center justify-between">
                <div>
                    <h2 class="text-lg font-bold font-display text-stone-900">Recent Customer Inquiries & RFQs</h2>
                    <p class="text-xs text-stone-500">Live incoming commercial demand from buyers worldwide</p>
                </div>
                <a href="{{ route('admin.inquiries.index') }}" class="text-xs font-bold text-emerald-800 hover:text-emerald-900">
                    View All &rarr;
                </a>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                    <thead>
                        <tr class="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-semibold">
                            <th class="p-4">RFQ Ref</th>
                            <th class="p-4">Buyer / Company</th>
                            <th class="p-4">Country</th>
                            <th class="p-4">Product</th>
                            <th class="p-4">Volume</th>
                            <th class="p-4">Status</th>
                            <th class="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-stone-100 text-stone-700">
                        @forelse($recentInquiries as $inq)
                            <tr class="hover:bg-stone-50/60 transition-colors">
                                <td class="p-4 font-mono font-bold text-stone-900">{{ $inq->inquiry_number }}</td>
                                <td class="p-4">
                                    <div class="font-bold text-stone-900">{{ $inq->name }}</div>
                                    <div class="text-[11px] text-stone-400">{{ $inq->company ?? 'Independent Buyer' }}</div>
                                </td>
                                <td class="p-4 font-medium">{{ $inq->country }}</td>
                                <td class="p-4 font-medium text-emerald-900">{{ $inq->product?->name ?? 'General Inquiry' }}</td>
                                <td class="p-4 font-semibold">{{ $inq->quantity ? $inq->quantity . ' ' . $inq->unit : 'Flexible' }}</td>
                                <td class="p-4">
                                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase
                                        {{ $inq->status == 'new' ? 'bg-amber-100 text-amber-800' :
                                           ($inq->status == 'quotation_sent' ? 'bg-blue-100 text-blue-800' :
                                           ($inq->status == 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700')) }}">
                                        {{ str_replace('_', ' ', $inq->status) }}
                                    </span>
                                </td>
                                <td class="p-4 text-right">
                                    <a href="{{ route('admin.inquiries.show', $inq->id) }}" class="px-3 py-1 bg-stone-100 hover:bg-emerald-800 hover:text-white rounded-lg font-bold text-[11px] transition">
                                        Open CRM &rarr;
                                    </a>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="7" class="p-8 text-center text-stone-400">No inquiry submissions recorded yet.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Right Side: Pipeline Distribution & Expiry Watch -->
        <div class="lg:col-span-4 space-y-8">
            <!-- Pipeline Distribution -->
            <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <h3 class="text-base font-bold font-display text-stone-900 mb-4">Inquiry Pipeline Status</h3>
                <div class="space-y-3">
                    @php
                        $statusLabels = [
                            'new' => 'New Inquiries',
                            'reviewed' => 'Reviewed',
                            'assigned' => 'Assigned to Sales',
                            'quotation_prepared' => 'Quotation Drafted',
                            'quotation_sent' => 'Quotation Sent',
                            'negotiation' => 'Under Negotiation',
                            'accepted' => 'Accepted Orders',
                            'rejected' => 'Closed / Rejected',
                        ];
                    @endphp
                    @foreach($statusLabels as $k => $label)
                        @php $cnt = $inquiryStatuses[$k] ?? 0; @endphp
                        <div class="flex items-center justify-between text-xs py-1.5 border-b border-stone-100">
                            <span class="text-stone-600">{{ $label }}</span>
                            <span class="font-mono font-bold {{ $cnt > 0 ? 'text-stone-900' : 'text-stone-300' }}">{{ $cnt }}</span>
                        </div>
                    @endforeach
                </div>
            </div>

            <!-- Certifications Expiry Alerts -->
            <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-base font-bold font-display text-stone-900">Certificate Expiry Watch</h3>
                    <span class="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">Next 90 Days</span>
                </div>

                <div class="space-y-3 text-xs">
                    @forelse($expiringCertifications as $cert)
                        <div class="p-3 rounded-xl bg-stone-50 border border-stone-200">
                            <div class="font-bold text-stone-900">{{ $cert->name }}</div>
                            <div class="flex justify-between items-center text-[11px] text-stone-500 mt-1">
                                <span>{{ $cert->issuing_body }}</span>
                                <span class="font-mono text-amber-700 font-bold">Expires: {{ $cert->expiry_date->format('M Y') }}</span>
                            </div>
                        </div>
                    @empty
                        <div class="text-center py-4 text-xs text-stone-400">
                            All statutory certificates are currently in valid standing.
                        </div>
                    @endforelse
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom: Recent Audit Logs -->
    <div class="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
            <div>
                <h3 class="text-base font-bold font-display text-stone-900">Administrative Security & Action Audit Log</h3>
                <p class="text-xs text-stone-500">Chronological ledger of user modifications across commodities, quotations, and settings</p>
            </div>
            @if(auth()->user()->isAdmin())
                <a href="{{ route('admin.audit.index') }}" class="text-xs font-bold text-emerald-800 hover:text-emerald-900">View Complete Audit Log &rarr;</a>
            @endif
        </div>

        <div class="divide-y divide-stone-100 text-xs">
            @forelse($recentAuditLogs as $log)
                <div class="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div class="flex items-center gap-3">
                        <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
                        <span class="font-bold text-stone-900">{{ $log->user?->name ?? 'System' }}</span>
                        <span class="text-stone-400">&bull;</span>
                        <span class="font-mono text-[11px] uppercase bg-stone-100 px-2 py-0.5 rounded text-stone-600">{{ $log->action }}</span>
                        <span class="text-stone-600">{{ $log->description }}</span>
                    </div>
                    <div class="text-stone-400 font-mono text-[11px]">
                        {{ $log->created_at->diffForHumans() }} (IP: {{ $log->ip_address ?? '127.0.0.1' }})
                    </div>
                </div>
            @empty
                <div class="py-4 text-stone-400 text-center">No audit logs recorded yet.</div>
            @endforelse
        </div>
    </div>
</div>
@endsection
