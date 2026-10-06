@extends('layouts.admin', ['title' => 'Security Audit Logs'])

@section('content')
<div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Security & Operational Audit Logs</h1>
            <p class="text-xs text-stone-500">Immutable ledger of administrative changes across products, quotations, and staff accounts</p>
        </div>
    </div>

    <!-- Filter -->
    <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
        <form action="{{ route('admin.audit.index') }}" method="GET" class="flex gap-3">
            <select name="action" onchange="this.form.submit()" class="px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-800">
                <option value="">-- All Action Types --</option>
                <option value="login" {{ request('action') == 'login' ? 'selected' : '' }}>Login</option>
                <option value="created" {{ request('action') == 'created' ? 'selected' : '' }}>Created</option>
                <option value="updated" {{ request('action') == 'updated' ? 'selected' : '' }}>Updated</option>
                <option value="deleted" {{ request('action') == 'deleted' ? 'selected' : '' }}>Deleted</option>
                <option value="status_change" {{ request('action') == 'status_change' ? 'selected' : '' }}>Status Change</option>
                <option value="assigned" {{ request('action') == 'assigned' ? 'selected' : '' }}>Assigned</option>
            </select>
            @if(request('action'))
                <a href="{{ route('admin.audit.index') }}" class="px-3 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl hover:bg-stone-200 transition flex items-center">Clear Filter</a>
            @endif
        </form>
    </div>

    <!-- Audit Logs Table -->
    <div class="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-semibold">
                        <th class="p-4">Timestamp</th>
                        <th class="p-4">User</th>
                        <th class="p-4">Action</th>
                        <th class="p-4">Module / Entity</th>
                        <th class="p-4">Description</th>
                        <th class="p-4">IP Address</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-stone-100 text-stone-700">
                    @forelse($logs as $log)
                        <tr class="hover:bg-stone-50/60 transition-colors">
                            <td class="p-4 font-mono text-[11px] text-stone-500 whitespace-nowrap">
                                {{ $log->created_at->format('Y-m-d H:i:s') }}
                            </td>
                            <td class="p-4">
                                <span class="font-bold text-stone-900">{{ $log->user?->name ?? 'System' }}</span>
                                <span class="text-[10px] text-stone-400 block">{{ $log->user?->email }}</span>
                            </td>
                            <td class="p-4 font-mono">
                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase
                                    {{ $log->action == 'created' ? 'bg-emerald-100 text-emerald-800' :
                                       ($log->action == 'deleted' ? 'bg-red-100 text-red-800' :
                                       ($log->action == 'updated' ? 'bg-blue-100 text-blue-800' : 'bg-stone-100 text-stone-800')) }}">
                                    {{ $log->action }}
                                </span>
                            </td>
                            <td class="p-4 font-mono text-stone-600">
                                {{ $log->auditable_type ?? 'N/A' }}
                                @if($log->auditable_id)
                                    <span class="text-stone-400">#{{ $log->auditable_id }}</span>
                                @endif
                            </td>
                            <td class="p-4 font-medium text-stone-800 max-w-md">{{ $log->description }}</td>
                            <td class="p-4 font-mono text-stone-400 text-[11px]">{{ $log->ip_address ?? '127.0.0.1' }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="p-8 text-center text-stone-400">No audit logs recorded yet.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($logs->hasPages())
            <div class="p-4 border-t border-stone-200 bg-stone-50">
                {{ $logs->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
