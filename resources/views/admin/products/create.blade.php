@extends('layouts.admin', ['title' => 'Add New Commodity'])

@section('content')
<div class="max-w-4xl space-y-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Add New Agricultural Commodity</h1>
            <p class="text-xs text-stone-500">Create export SKU with certified laboratory tolerances</p>
        </div>
        <a href="{{ route('admin.products.index') }}" class="text-xs font-bold text-stone-600 hover:text-stone-900">&larr; Back to Catalogue</a>
    </div>

    <div class="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
        <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data" class="space-y-8" x-data="{
            specs: [
                { spec_group: 'Physical Parameters', parameter: 'Moisture', value: 'Max 7.0%', unit: '%', test_method: 'ISO 665' },
                { spec_group: 'Physical Parameters', parameter: 'Purity', value: 'Min 99.0%', unit: '%', test_method: 'Optical Inspection' },
                { spec_group: 'Physical Parameters', parameter: 'Foreign Matter', value: 'Max 0.5%', unit: '%', test_method: 'Gravimetric' },
                { spec_group: 'Chemical & Microbiological', parameter: 'Total Aflatoxin', value: '< 4 ppb', unit: 'ppb', test_method: 'HPLC AOAC 991.31' }
            ],
            addSpec() {
                this.specs.push({ spec_group: 'Physical Parameters', parameter: '', value: '', unit: '', test_method: '' });
            },
            removeSpec(index) {
                this.specs.splice(index, 1);
            }
        }">
            @csrf

            <!-- Section 1: Basic Commodity Profile -->
            <div>
                <h3 class="text-sm font-bold font-display text-stone-900 pb-2 border-b border-stone-200 mb-4 uppercase tracking-wider text-emerald-950">1. Basic Commodity Information</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label for="name" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Product Name *</label>
                        <input type="text" name="name" id="name" value="{{ old('name') }}" required placeholder="e.g. Bold Peanuts 40/50" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                        @error('name') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                    </div>

                    <div>
                        <label for="category_id" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Commodity Category *</label>
                        <select name="category_id" id="category_id" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                            <option value="">-- Choose Category --</option>
                            @foreach($categories as $cat)
                                <option value="{{ $cat->id }}" {{ old('category_id') == $cat->id ? 'selected' : '' }}>
                                    {{ $cat->name }}
                                </option>
                            @endforeach
                        </select>
                        @error('category_id') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                    </div>

                    <div>
                        <label for="origin" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Origin / Region *</label>
                        <input type="text" name="origin" id="origin" value="{{ old('origin', 'Saurashtra, Gujarat, India') }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                        @error('origin') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                    </div>

                    <div>
                        <label for="grade_variety" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Grade & Variety</label>
                        <input type="text" name="grade_variety" id="grade_variety" value="{{ old('grade_variety') }}" placeholder="e.g. Bold Kernel (Runner Type), Counts 38/42" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                    </div>

                    <div>
                        <label for="hs_code" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">ITC-HS Code</label>
                        <input type="text" name="hs_code" id="hs_code" value="{{ old('hs_code') }}" placeholder="e.g. 1202.42.10" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 font-mono">
                    </div>

                    <div>
                        <label for="sku" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Internal SKU Code</label>
                        <input type="text" name="sku" id="sku" value="{{ old('sku') }}" placeholder="e.g. ADE-PN-BOLD" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 font-mono">
                    </div>
                </div>

                <div class="mt-6">
                    <label for="short_description" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Short Overview</label>
                    <textarea name="short_description" id="short_description" rows="2" placeholder="Brief commercial overview for catalog cards..." class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">{{ old('short_description') }}</textarea>
                </div>

                <div class="mt-4">
                    <label for="description" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Full Agronomy & Processing Details</label>
                    <textarea name="description" id="description" rows="4" placeholder="Detailed agronomy, sorting process, applications and commercial attributes..." class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">{{ old('description') }}</textarea>
                </div>
            </div>

            <!-- Section 2: Logistics & Commercial Terms -->
            <div>
                <h3 class="text-sm font-bold font-display text-stone-900 pb-2 border-b border-stone-200 mb-4 uppercase tracking-wider text-emerald-950">2. Commercial & Maritime Parameters</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="moq" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">MOQ *</label>
                            <input type="number" step="0.1" name="moq" id="moq" value="{{ old('moq', 19.0) }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                        </div>
                        <div>
                            <label for="moq_unit" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Unit *</label>
                            <input type="text" name="moq_unit" id="moq_unit" value="{{ old('moq_unit', 'Metric Ton (1 x 20ft FCL)') }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                        </div>
                    </div>

                    <div>
                        <label for="shelf_life" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Shelf Life & Storage</label>
                        <input type="text" name="shelf_life" id="shelf_life" value="{{ old('shelf_life', '12 Months in cool, dry ventilated area') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                    </div>

                    <div>
                        <label for="packaging_summary" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Available Packaging</label>
                        <input type="text" name="packaging_summary" id="packaging_summary" value="{{ old('packaging_summary', '25kg / 50kg Jute, PP woven with PE liner, Vacuum, 1-Ton Jumbo') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                    </div>

                    <div>
                        <label for="loading_summary" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Container Loading Summary</label>
                        <input type="text" name="loading_summary" id="loading_summary" value="{{ old('loading_summary', '19.0 MT in 20ft FCL (380 x 50kg Bags)') }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                    </div>
                </div>

                <div class="mt-6">
                    <label for="main_image" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Primary Product Photography (JPG/PNG)</label>
                    <input type="file" name="main_image" id="main_image" accept="image/*" class="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-600 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-800 file:text-white hover:file:bg-emerald-900">
                </div>
            </div>

            <!-- Section 3: Technical Specifications Matrix -->
            <div>
                <div class="flex items-center justify-between pb-2 border-b border-stone-200 mb-4">
                    <h3 class="text-sm font-bold font-display text-stone-900 uppercase tracking-wider text-emerald-950">3. Certified Laboratory Specifications</h3>
                    <button type="button" @click="addSpec()" class="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-lg transition">
                        + Add Specification Parameter
                    </button>
                </div>

                <div class="space-y-3">
                    <template x-for="(spec, idx) in specs" :key="idx">
                        <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 items-center">
                            <div class="sm:col-span-3">
                                <input type="text" :name="'specs['+idx+'][parameter]'" x-model="spec.parameter" placeholder="Parameter (e.g. Moisture)" required class="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold">
                            </div>
                            <div class="sm:col-span-3">
                                <input type="text" :name="'specs['+idx+'][value]'" x-model="spec.value" placeholder="Export Limit (e.g. Max 7%)" required class="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs">
                            </div>
                            <div class="sm:col-span-3">
                                <input type="text" :name="'specs['+idx+'][test_method]'" x-model="spec.test_method" placeholder="Test Standard (e.g. ISO 665)" class="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-500">
                            </div>
                            <div class="sm:col-span-2">
                                <select :name="'specs['+idx+'][spec_group]'" x-model="spec.spec_group" class="w-full px-2 py-1.5 bg-white border border-stone-300 rounded-lg text-xs">
                                    <option value="Physical Parameters">Physical</option>
                                    <option value="Chemical & Microbiological">Chemical/Micro</option>
                                    <option value="Purity & Grading">Grading</option>
                                </select>
                            </div>
                            <div class="sm:col-span-1 text-right">
                                <button type="button" @click="removeSpec(idx)" class="text-red-500 hover:text-red-700 text-sm font-bold">&times;</button>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <!-- Publishing Toggles -->
            <div class="flex items-center gap-6 pt-2">
                <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                    <input type="checkbox" name="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }} class="rounded border-stone-300 text-emerald-800 focus:ring-emerald-800">
                    <span>Publish Immediately to Public Website</span>
                </label>

                <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                    <input type="checkbox" name="is_featured" value="1" {{ old('is_featured') ? 'checked' : '' }} class="rounded border-stone-300 text-emerald-800 focus:ring-emerald-800">
                    <span>Mark as Featured Flagship Export</span>
                </label>
            </div>

            <div class="pt-6 border-t border-stone-200 flex justify-end gap-3">
                <a href="{{ route('admin.products.index') }}" class="px-5 py-2.5 bg-stone-100 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-200 transition">Cancel</a>
                <button type="submit" class="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow">Save Commodity SKU</button>
            </div>
        </form>
    </div>
</div>
@endsection
