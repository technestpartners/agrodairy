@extends('layouts.admin', ['title' => 'Inquiry CRM: ' . $inquiry->inquiry_number])

@section('content')
<div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <div class="flex items-center gap-3">
                <h1 class="text-2xl font-bold font-display text-stone-900">{{ $inquiry->inquiry_number }}</h1>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase
                    {{ $inquiry->status == 'new' ? 'bg-amber-100 text-amber-800' :
                       ($inquiry->status == 'quotation_sent' ? 'bg-blue-100 text-blue-800' :
                       ($inquiry->status == 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700')) }}">
                    {{ str_replace('_', ' ', $inquiry->status) }}
                </span>
            </div>
            <p class="text-xs text-stone-500 mt-1">Logged on {{ $inquiry->created_at->format('d M, Y H:i') }} (IP: {{ $inquiry->ip_address ?? '127.0.0.1' }})</p>
        </div>

        <div class="flex items-center gap-3">
            <a href="{{ route('admin.quotations.create') }}?inquiry_id={{ $inquiry->id }}" class="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>Generate Proforma Quotation</span>
            </a>
            <a href="{{ route('admin.inquiries.index') }}" class="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition">&larr; Back to Inbox</a>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left: RFQ Details & Customer Communications -->
        <div class="lg:col-span-8 space-y-8">
            <!-- Customer & Commercial Request Card -->
            <div class="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                <h2 class="text-lg font-bold font-display text-stone-900 pb-3 border-b border-stone-100">Buyer Profile & Request Specifics</h2>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
                    <div>
                        <span class="text-stone-400 block mb-0.5">Contact Buyer</span>
                        <span class="font-bold text-stone-900 text-sm">{{ $inquiry->name }}</span>
                    </div>
                    <div>
                        <span class="text-stone-400 block mb-0.5">Enterprise Entity</span>
                        <span class="font-bold text-stone-900 text-sm">{{ $inquiry->company ?? 'Independent Importer' }}</span>
                    </div>
                    <div>
                        <span class="text-stone-400 block mb-0.5">Destination Country</span>
                        <span class="font-bold text-stone-900 text-sm">{{ $inquiry->country }}</span>
                    </div>
                    <div>
                        <span class="text-stone-400 block mb-0.5">Business Email</span>
                        <a href="mailto:{{ $inquiry->email }}" class="font-mono font-bold text-emerald-800 hover:underline">{{ $inquiry->email }}</a>
                    </div>
                    <div>
                        <span class="text-stone-400 block mb-0.5">Direct Phone / WhatsApp</span>
                        <a href="tel:{{ $inquiry->phone }}" class="font-mono font-bold text-stone-900">{{ $inquiry->phone }}</a>
                        @if($inquiry->whatsapp)
                            <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $inquiry->whatsapp) }}" target="_blank" class="text-emerald-700 font-bold block mt-0.5">Chat on WhatsApp &rarr;</a>
                        @endif
                    </div>
                    <div>
                        <span class="text-stone-400 block mb-0.5">Commodity SKU</span>
                        <span class="font-bold text-stone-900 text-sm">{{ $inquiry->product?->name ?? 'Custom Sourcing' }}</span>
                    </div>
                    <div>
                        <span class="text-stone-400 block mb-0.5">Requested Volume</span>
                        <span class="font-bold text-emerald-900 text-sm">{{ $inquiry->quantity ? $inquiry->quantity . ' ' . $inquiry->unit : 'Flexible MT' }}</span>
                    </div>
                    <div>
                        <span class="text-stone-400 block mb-0.5">Target Incoterm & Port</span>
                        <span class="font-bold text-stone-900 text-sm">{{ $inquiry->incoterm ?? 'FOB' }} &bull; {{ $inquiry->destination_port ?? 'Discharge Port TBA' }}</span>
                    </div>
                    <div>
                        <span class="text-stone-400 block mb-0.5">Target Price</span>
                        <span class="font-bold text-stone-900 text-sm">{{ $inquiry->target_price ? $inquiry->target_currency . ' ' . number_format($inquiry->target_price, 2) : 'Open to best offer' }}</span>
                    </div>
                </div>

                @if($inquiry->product_variant)
                    <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                        <span class="font-bold text-stone-700">Specific Grade / Size:</span> {{ $inquiry->product_variant }}
                    </div>
                @endif

                @if($inquiry->packaging_preference)
                    <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                        <span class="font-bold text-stone-700">Packaging Specification:</span> {{ $inquiry->packaging_preference }}
                    </div>
                @endif

                <!-- Message Content -->
                <div class="p-4 bg-brand-beige-50 rounded-xl border border-brand-beige-200 text-xs md:text-sm text-stone-800 leading-relaxed">
                    <span class="font-bold text-stone-900 block mb-1">Customer Inquiry Notes:</span>
                    {{ $inquiry->message }}
                </div>

                @if($inquiry->attachment_path)
                    <div class="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                        <span class="font-medium text-stone-700">Buyer Attachment Document</span>
                        <a href="{{ asset('storage/' . $inquiry->attachment_path) }}" target="_blank" class="font-bold text-emerald-800 hover:underline">Download Attachment &darr;</a>
                    </div>
                @endif
            </div>

            <!-- Existing Quotations for this Inquiry -->
            @if($inquiry->quotations->count() > 0)
                <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                    <h3 class="text-base font-bold font-display text-stone-900 mb-4">Generated Proforma Quotations</h3>
                    <div class="space-y-3">
                        @foreach($inquiry->quotations as $q)
                            <div class="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                                <div>
                                    <div class="font-bold font-mono text-stone-900">{{ $q->quotation_number }}</div>
                                    <div class="text-xs text-stone-500">Total: {{ $q->currency }} {{ number_format($q->grand_total, 2) }} &bull; {{ $q->incoterm }}</div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <a href="{{ route('admin.quotations.show', $q->id) }}" class="px-3 py-1 bg-white border border-stone-200 rounded-lg text-xs font-bold hover:bg-stone-100">Review</a>
                                    <a href="{{ route('admin.quotations.download_pdf', $q->id) }}" class="px-3 py-1 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-900">PDF</a>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endif

            <!-- Internal CRM Notes & Activity -->
            <div class="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                <h3 class="text-base font-bold font-display text-stone-900 pb-3 border-b border-stone-100">Internal Sales Notes & Communication Logs</h3>

                <form action="{{ route('admin.inquiries.notes', $inquiry->id) }}" method="POST" class="space-y-3">
                    @csrf
                    <div>
                        <textarea name="note" rows="3" required placeholder="Add follow-up notes, customer price counter-offer, or container stuffing notes..." class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-800"></textarea>
                    </div>
                    <div class="flex items-center justify-between">
                        <select name="type" class="px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-xl text-xs">
                            <option value="internal">Internal Team Note</option>
                            <option value="communication">Customer Communication Record</option>
                        </select>
                        <button type="submit" class="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs rounded-xl transition">
                            Save Note
                        </button>
                    </div>
                </form>

                <div class="divide-y divide-stone-100 space-y-3 text-xs">
                    @forelse($inquiry->notes as $note)
                        <div class="pt-3">
                            <div class="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                                <span class="font-bold text-stone-800">{{ $note->user?->name ?? 'Staff' }}</span>
                                <span class="font-mono">{{ $note->created_at->diffForHumans() }}</span>
                            </div>
                            <p class="text-stone-700 leading-relaxed">{{ $note->note }}</p>
                        </div>
                    @empty
                        <div class="text-stone-400 text-center py-4">No notes recorded yet.</div>
                    @endforelse
                </div>
            </div>
        </div>

        <!-- Right: Status Management & Assignment -->
        <div class="lg:col-span-4 space-y-8">
            <!-- Status Update Box -->
            <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <h3 class="text-base font-bold font-display text-stone-900 mb-4">Update Status Pipeline</h3>
                <form action="{{ route('admin.inquiries.status', $inquiry->id) }}" method="POST" class="space-y-4">
                    @csrf
                    <div>
                        <label for="status" class="block text-xs font-bold text-stone-700 mb-1">Inquiry Status</label>
                        <select name="status" id="status" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold">
                            <option value="new" {{ $inquiry->status == 'new' ? 'selected' : '' }}>New</option>
                            <option value="reviewed" {{ $inquiry->status == 'reviewed' ? 'selected' : '' }}>Reviewed</option>
                            <option value="assigned" {{ $inquiry->status == 'assigned' ? 'selected' : '' }}>Assigned to Sales</option>
                            <option value="quotation_prepared" {{ $inquiry->status == 'quotation_prepared' ? 'selected' : '' }}>Quotation Prepared</option>
                            <option value="quotation_sent" {{ $inquiry->status == 'quotation_sent' ? 'selected' : '' }}>Quotation Sent</option>
                            <option value="negotiation" {{ $inquiry->status == 'negotiation' ? 'selected' : '' }}>Under Negotiation</option>
                            <option value="accepted" {{ $inquiry->status == 'accepted' ? 'selected' : '' }}>Accepted Order</option>
                            <option value="rejected" {{ $inquiry->status == 'rejected' ? 'selected' : '' }}>Rejected / Dropped</option>
                            <option value="completed" {{ $inquiry->status == 'completed' ? 'selected' : '' }}>Completed & Shipped</option>
                        </select>
                    </div>

                    <div>
                        <label for="comment" class="block text-xs font-bold text-stone-700 mb-1">Status Reason / Comment</label>
                        <input type="text" name="comment" id="comment" placeholder="e.g. Sent proforma CIF quote via email" class="w-full px-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs">
                    </div>

                    <button type="submit" class="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow">
                        Update Pipeline Status
                    </button>
                </form>
            </div>

            <!-- Staff Assignment Box -->
            <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <h3 class="text-base font-bold font-display text-stone-900 mb-4">Assign Export Lead</h3>
                <form action="{{ route('admin.inquiries.assign', $inquiry->id) }}" method="POST" class="space-y-4">
                    @csrf
                    <div>
                        <label for="assigned_to" class="block text-xs font-bold text-stone-700 mb-1">Assignee</label>
                        <select name="assigned_to" id="assigned_to" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs">
                            @foreach($salesStaff as $staff)
                                <option value="{{ $staff->id }}" {{ $inquiry->assigned_to == $staff->id ? 'selected' : '' }}>
                                    {{ $staff->name }} ({{ $staff->role_name }})
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <button type="submit" class="w-full py-2.5 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs rounded-xl transition">
                        Reassign Lead
                    </button>
                </form>
            </div>

            <!-- Status History Timeline -->
            <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <h3 class="text-base font-bold font-display text-stone-900 mb-4">Status Audit Trail</h3>
                <div class="space-y-4 text-xs">
                    @forelse($inquiry->statusHistories as $hist)
                        <div class="relative pl-6 pb-2 border-l-2 border-emerald-800">
                            <div class="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-emerald-800"></div>
                            <div class="font-bold text-stone-900 uppercase text-[10px]">{{ str_replace('_', ' ', $hist->to_status) }}</div>
                            <div class="text-stone-500 text-[11px] mt-0.5">{{ $hist->comment }}</div>
                            <div class="text-stone-400 text-[10px] font-mono mt-1">
                                {{ $hist->user?->name ?? 'System' }} &bull; {{ $hist->created_at->format('d M, Y H:i') }}
                            </div>
                        </div>
                    @empty
                        <div class="text-stone-400 text-center py-2">No historical status records.</div>
                    @endforelse
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
