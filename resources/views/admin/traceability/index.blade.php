@extends('layouts.admin', ['title' => 'Batch Traceability Lots'])

@section('content')
<div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Consignment Traceability & Lots</h1>
            <p class="text-xs text-stone-500">Manage digital chain of custody, harvest origins, and container tracking</p>
        </div>
        <a href="{{ route('admin.traceability.create') }}" class="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow flex items-center gap-2 self-start">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Register New Batch Lot</span>
        </a>
    </div>

    <!-- Search Box -->
    <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <form action="{{ route('admin.traceability.index') }}" method="GET" class="flex gap-3">
            <div class="relative flex-grow">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search by batch code (e.g. AGRO-PN-2026-0814), COA number, container reference..." class="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-800">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
            </div>
            <button type="submit" class="px-5 py-2 bg-stone-800 text-white text-xs font-bold rounded-xl hover:bg-stone-900 transition">Search</button>
            @if(request('search'))
                <a href="{{ route('admin.traceability.index') }}" class="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl hover:bg-stone-200 transition flex items-center">Clear</a>
            @endif
        </form>
    </div>

    <!-- Batches Table -->
    <div class="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-semibold">
                        <th class="p-4">Batch Lot Code</th>
                        <th class="p-4">Commodity SKU</th>
                        <th class="p-4">Origin Region</th>
                        <th class="p-4">Harvest & Packing</th>
                        <th class="p-4">COA / Moisture</th>
                        <th class="p-4">Maritime Status</th>
                        <th class="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-stone-100 text-stone-700">
                    @forelse($batches as $batch)
                        <tr class="hover:bg-stone-50/60 transition-colors">
                            <td class="p-4 font-mono font-bold text-stone-900">
                                <span class="bg-stone-100 px-2 py-0.5 rounded text-emerald-950 font-bold">
                                    {{ $batch->batch_code }}
                                </span>
                            </td>
                            <td class="p-4">
                                <div class="font-bold text-stone-900 text-sm">{{ $batch->product?->name ?? 'Standard Commodity' }}</div>
                                <div class="text-[11px] text-stone-500">{{ $batch->packing_type }}</div>
                            </td>
                            <td class="p-4 text-stone-600">{{ $batch->origin_region }}</td>
                            <td class="p-4 text-[11px]">
                                <div>Harvest: <strong>{{ $batch->harvest_date ? $batch->harvest_date->format('M Y') : 'N/A' }}</strong></div>
                                <div>Packed: <strong>{{ $batch->packing_date ? $batch->packing_date->format('d M, Y') : 'N/A' }}</strong></div>
                            </td>
                            <td class="p-4 text-[11px] font-mono">
                                <div class="font-bold text-emerald-800">{{ $batch->certificate_of_analysis_no ?? 'COA-Pending' }}</div>
                                <div class="text-stone-500">Moisture: {{ $batch->moisture_percentage ?? 'N/A' }} | Purity: {{ $batch->purity_percentage ?? 'N/A' }}</div>
                            </td>
                            <td class="p-4">
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase
                                    {{ $batch->shipment_status == 'Delivered' || $batch->shipment_status == 'Shipped' ? 'bg-emerald-100 text-emerald-800' :
                                       ($batch->shipment_status == 'Quality Approved' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800') }}">
                                    {{ $batch->shipment_status }}
                                </span>
                                @if($batch->container_number)
                                    <div class="text-[10px] font-mono text-stone-400 mt-0.5">CTR: {{ $batch->container_number }}</div>
                                @endif
                            </td>
                            <td class="p-4 text-right space-x-2 whitespace-nowrap">
                                <a href="{{ route('admin.traceability.edit', $batch->id) }}" class="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px] rounded-lg transition">Edit</a>
                                <form action="{{ route('admin.traceability.destroy', $batch->id) }}" method="POST" class="inline" onsubmit="return confirm('Delete this traceability lot record?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[11px] rounded-lg transition">Delete</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="p-8 text-center text-stone-400">No batch traceability records found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($batches->hasPages())
            <div class="p-4 border-t border-stone-200 bg-stone-50">
                {{ $batches->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
