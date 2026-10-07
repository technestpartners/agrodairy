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
                class="relative transform overflow-hidden rounded-2xl bg-white dark:bg-[#0a1e1c] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-stone-200 dark:border-teal-900/60">

                <!-- Header -->
                <div class="bg-gradient-to-r from-[#033e3a] via-[#00a79d] to-[#022826] px-4 sm:px-6 py-4 sm:py-5 text-white flex items-center justify-between">
                    <div>
                        <span class="text-xs uppercase tracking-widest text-[#00d9cc] font-semibold">Instant Export Inquiry</span>
                        <h3 class="text-lg sm:text-xl font-bold font-heading text-white">Request Official Quotation (RFQ)</h3>
                    </div>
                    <button @click="open = false" class="text-stone-300 hover:text-white rounded-lg p-1.5 transition active:scale-95" aria-label="Close modal">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                <!-- Form -->
                <form action="{{ route('rfq.store') }}" method="POST" class="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    @csrf
                    <input type="hidden" name="product_id" :value="productId">

                    <template x-if="productName">
                        <div class="bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 rounded-xl p-3 flex items-center justify-between text-xs">
                            <span class="text-teal-800 dark:text-teal-300">Inquiring for Product:</span>
                            <strong class="text-teal-950 dark:text-teal-100 font-semibold" x-text="productName"></strong>
                        </div>
                    </template>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 dark:text-stone-200 mb-1">Your Full Name *</label>
                            <input type="text" name="name" required placeholder="e.g. John Doe" class="w-full text-sm rounded-lg bg-white dark:bg-[#061514] border-stone-300 dark:border-teal-900 text-stone-900 dark:text-white focus:border-teal-600 focus:ring-teal-600">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 dark:text-stone-200 mb-1">Company / Importer Name *</label>
                            <input type="text" name="company" required placeholder="e.g. Al-Mansoor Trading LLC" class="w-full text-sm rounded-lg bg-white dark:bg-[#061514] border-stone-300 dark:border-teal-900 text-stone-900 dark:text-white focus:border-teal-600 focus:ring-teal-600">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 dark:text-stone-200 mb-1">Corporate Email Address *</label>
                            <input type="email" name="email" required placeholder="imports@company.com" class="w-full text-sm rounded-lg bg-white dark:bg-[#061514] border-stone-300 dark:border-teal-900 text-stone-900 dark:text-white focus:border-teal-600 focus:ring-teal-600">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 dark:text-stone-200 mb-1">WhatsApp / Phone with Country Code *</label>
                            <input type="text" name="phone" required placeholder="+971 50 123 4567" class="w-full text-sm rounded-lg bg-white dark:bg-[#061514] border-stone-300 dark:border-teal-900 text-stone-900 dark:text-white focus:border-teal-600 focus:ring-teal-600">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 dark:text-stone-200 mb-1">Destination Country *</label>
                            <input type="text" name="country" required placeholder="e.g. UAE, Netherlands, Vietnam" class="w-full text-sm rounded-lg bg-white dark:bg-[#061514] border-stone-300 dark:border-teal-900 text-stone-900 dark:text-white focus:border-teal-600 focus:ring-teal-600">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 dark:text-stone-200 mb-1">Required Quantity (MT)</label>
                            <input type="number" step="0.1" min="1" name="quantity" placeholder="e.g. 19 or 38 MT" class="w-full text-sm rounded-lg bg-white dark:bg-[#061514] border-stone-300 dark:border-teal-900 text-stone-900 dark:text-white focus:border-teal-600 focus:ring-teal-600">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 dark:text-stone-200 mb-1">Incoterm Preferred</label>
                            <select name="incoterm" class="w-full text-sm rounded-lg bg-white dark:bg-[#061514] border-stone-300 dark:border-teal-900 text-stone-900 dark:text-white focus:border-teal-600 focus:ring-teal-600">
                                <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                                <option value="CFR">CFR (Cost & Freight)</option>
                                <option value="FOB">FOB (Free on Board - Mundra)</option>
                                <option value="EXW">EXW (Ex-Works Gondal)</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 dark:text-stone-200 mb-1">Destination Discharge Port</label>
                            <input type="text" name="destination_port" placeholder="e.g. Jebel Ali, Rotterdam, Haiphong" class="w-full text-sm rounded-lg bg-white dark:bg-[#061514] border-stone-300 dark:border-teal-900 text-stone-900 dark:text-white focus:border-teal-600 focus:ring-teal-600">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-stone-700 dark:text-stone-200 mb-1">Packaging Preference</label>
                            <input type="text" name="packaging_preference" placeholder="e.g. 50kg Jute Bags / 25kg PP / Vacuum" class="w-full text-sm rounded-lg bg-white dark:bg-[#061514] border-stone-300 dark:border-teal-900 text-stone-900 dark:text-white focus:border-teal-600 focus:ring-teal-600">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-stone-700 dark:text-stone-200 mb-1">Specific Quality Requirements / Message *</label>
                        <textarea name="message" rows="3" required placeholder="Please state required grade, count caliber, maximum moisture/aflatoxin limits, target delivery date..." class="w-full text-sm rounded-lg bg-white dark:bg-[#061514] border-stone-300 dark:border-teal-900 text-stone-900 dark:text-white focus:border-teal-600 focus:ring-teal-600"></textarea>
                    </div>

                    <div class="pt-3 border-t border-stone-200 dark:border-teal-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span class="text-xs text-stone-500 dark:text-stone-400 text-center sm:text-left">🔒 100% confidential trade inquiry. No spam.</span>
                        <div class="flex space-x-2 w-full sm:w-auto justify-end">
                            <button type="button" @click="open = false" class="flex-1 sm:flex-initial px-4 py-2.5 sm:py-2 text-xs font-semibold rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition active:scale-95">Cancel</button>
                            <button type="submit" class="flex-1 sm:flex-initial px-5 py-2.5 sm:py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-[#00a79d] to-[#033e3a] hover:opacity-95 text-white transition shadow active:scale-95">Submit RFQ</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
