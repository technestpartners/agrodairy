<div x-data="{ 
        open: false,
        productId: '',
        productName: '',
        submitting: false,
        submitted: false,
        inquiryNumber: ''
    }" 
    @open-rfq-modal.window="
        productId = $event.detail.productId || '';
        productName = $event.detail.productName || '';
        open = true;
    "
    x-show="open" 
    x-cloak
    class="relative z-50"
    role="dialog" 
    aria-modal="true">

    <!-- Backdrop -->
    <div x-show="open" 
        x-transition:enter="ease-out duration-300"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="ease-in duration-200"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        class="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"></div>

    <!-- Modal Dialog -->
    <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div x-show="open" 
                x-transition:enter="ease-out duration-300"
                x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
                x-transition:leave="ease-in duration-200"
                x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
                x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                @click.outside="open = false"
                class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-stone-200">

                <!-- Header -->
                <div class="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 px-6 py-5 text-white flex items-center justify-between">
                    <div>
                        <span class="text-xs uppercase tracking-widest text-amber-400 font-semibold">Instant Export Inquiry</span>
                        <h3 class="text-xl font-bold font-heading text-white">Request Official Quotation (RFQ)</h3>
                    </div>
                    <button @click="open = false" class="text-stone-300 hover:text-white rounded-lg p-1.5 transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                <!-- Form -->
                <form action="{{ route('rfq.store') }}" method="POST" class="p-6 space-y-4">
                    @csrf
                    <input type="hidden" name="product_id" :value="productId">

                    <template x-if="productName">
                        <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs">
                            <span class="text-emerald-800">Inquiring for Product:</span>
                            <strong class="text-emerald-950 font-semibold" x-text="productName"></strong>
                        </div>
                    </template>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Your Full Name *</label>
                            <input type="text" name="name" required placeholder="e.g. John Doe" class="w-full text-sm rounded-lg border-stone-300 focus:border-emerald-700 focus:ring-emerald-700">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Company / Importer Name *</label>
                            <input type="text" name="company" required placeholder="e.g. Al-Mansoor Trading LLC" class="w-full text-sm rounded-lg border-stone-300 focus:border-emerald-700 focus:ring-emerald-700">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Corporate Email Address *</label>
                            <input type="email" name="email" required placeholder="imports@company.com" class="w-full text-sm rounded-lg border-stone-300 focus:border-emerald-700 focus:ring-emerald-700">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">WhatsApp / Phone with Country Code *</label>
                            <input type="text" name="phone" required placeholder="+971 50 123 4567" class="w-full text-sm rounded-lg border-stone-300 focus:border-emerald-700 focus:ring-emerald-700">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Destination Country *</label>
                            <input type="text" name="country" required placeholder="e.g. UAE, Netherlands, Vietnam" class="w-full text-sm rounded-lg border-stone-300 focus:border-emerald-700 focus:ring-emerald-700">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Required Quantity (MT)</label>
                            <input type="number" step="0.1" min="1" name="quantity" placeholder="e.g. 19 or 38 MT" class="w-full text-sm rounded-lg border-stone-300 focus:border-emerald-700 focus:ring-emerald-700">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Incoterm Preferred</label>
                            <select name="incoterm" class="w-full text-sm rounded-lg border-stone-300 focus:border-emerald-700 focus:ring-emerald-700">
                                <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                                <option value="CFR">CFR (Cost & Freight)</option>
                                <option value="FOB">FOB (Free on Board - Mundra)</option>
                                <option value="EXW">EXW (Ex-Works Gondal)</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Destination Discharge Port</label>
                            <input type="text" name="destination_port" placeholder="e.g. Jebel Ali, Rotterdam, Haiphong" class="w-full text-sm rounded-lg border-stone-300 focus:border-emerald-700 focus:ring-emerald-700">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 mb-1">Packaging Preference</label>
                            <input type="text" name="packaging_preference" placeholder="e.g. 50kg Jute Bags / 25kg PP / Vacuum" class="w-full text-sm rounded-lg border-stone-300 focus:border-emerald-700 focus:ring-emerald-700">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-stone-700 mb-1">Specific Quality Requirements / Message *</label>
                        <textarea name="message" rows="3" required placeholder="Please state required grade, count caliber, maximum moisture/aflatoxin limits, target delivery date..." class="w-full text-sm rounded-lg border-stone-300 focus:border-emerald-700 focus:ring-emerald-700"></textarea>
                    </div>

                    <div class="pt-3 border-t border-stone-200 flex items-center justify-between">
                        <span class="text-xs text-stone-500">🔒 100% confidential trade inquiry. No spam.</span>
                        <div class="flex space-x-2">
                            <button type="button" @click="open = false" class="px-4 py-2 text-xs font-semibold rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 transition">Cancel</button>
                            <button type="submit" class="px-5 py-2 text-xs font-semibold rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 transition shadow">Submit RFQ</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
