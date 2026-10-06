@extends('layouts.admin', ['title' => 'Edit Commodity - ' . $product->name])

@section('content')
<div class="max-w-4xl space-y-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold font-display text-stone-900">Edit Commodity: {{ $product->name }}</h1>
            <p class="text-xs text-stone-500">Update specifications, images, and export parameters</p>
        </div>
        <div class="flex items-center gap-3">
            <a href="{{ route('products.show', $product->slug) }}" target="_blank" class="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition">View on Website &nearr;</a>
            <a href="{{ route('admin.products.index') }}" class="text-xs font-bold text-stone-600 hover:text-stone-900">&larr; Back to Catalogue</a>
        </div>
    </div>

    <div class="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
        <form action="{{ route('admin.products.update', $product->id) }}" method="POST" enctype="multipart/form-data" class="space-y-8" x-data="{
            specs: {{ json_encode($product->specifications->map(fn($s) => [
                'spec_group' => $s->spec_group ?? 'Physical Parameters',
                'parameter' => $s->parameter,
                'value' => $s->value,
                'unit' => $s->unit ?? '',
                'test_method' => $s->test_method ?? '',
            ])->toArray() ?: [
                ['spec_group' => 'Physical Parameters', 'parameter' => 'Moisture', 'value' => 'Max 7.0%', 'unit' => '%', 'test_method' => 'ISO 665']
            ]) }},
            addSpec() {
                this.specs.push({ spec_group: 'Physical Parameters', parameter: '', value: '', unit: '', test_method: '' });
            },
            removeSpec(index) {
                this.specs.splice(index, 1);
            }
        }">
            @csrf
            @method('PUT')

            <!-- Section 1: Basic Commodity Profile -->
            <div>
                <h3 class="text-sm font-bold font-display text-stone-900 pb-2 border-b border-stone-200 mb-4 uppercase tracking-wider text-emerald-950">1. Basic Commodity Information</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label for="name" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Product Name *</label>
                        <input type="text" name="name" id="name" value="{{ old('name', $product->name) }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                        @error('name') <span class="text-xs text-red-600 mt-1 block">{{ $message }}</span> @enderror
                    </div>

                    <div>
                        <label for="category_id" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Commodity Category *</label>
                        <select name="category_id" id="category_id" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                            @foreach($categories as $cat)
                                <option value="{{ $cat->id }}" {{ old('category_id', $product->category_id) == $cat->id ? 'selected' : '' }}>
                                    {{ $cat->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div>
                        <label for="origin" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Origin / Region *</label>
                        <input type="text" name="origin" id="origin" value="{{ old('origin', $product->origin) }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                    </div>

                    <div>
                        <label for="grade_variety" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Grade & Variety</label>
                        <input type="text" name="grade_variety" id="grade_variety" value="{{ old('grade_variety', $product->grade_variety) }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                    </div>

                    <div>
                        <label for="hs_code" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">ITC-HS Code</label>
                        <input type="text" name="hs_code" id="hs_code" value="{{ old('hs_code', $product->hs_code) }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 font-mono">
                    </div>

                    <div>
                        <label for="sku" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Internal SKU Code</label>
                        <input type="text" name="sku" id="sku" value="{{ old('sku', $product->sku) }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800 font-mono">
                    </div>
                </div>

                <div class="mt-6">
                    <label for="short_description" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Short Overview</label>
                    <textarea name="short_description" id="short_description" rows="2" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">{{ old('short_description', $product->short_description) }}</textarea>
                </div>

                <div class="mt-4">
                    <label for="description" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Full Agronomy & Processing Details</label>
                    <textarea name="description" id="description" rows="4" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">{{ old('description', $product->description) }}</textarea>
                </div>
            </div>

            <!-- Section 2: Logistics & Commercial Terms -->
            <div>
                <h3 class="text-sm font-bold font-display text-stone-900 pb-2 border-b border-stone-200 mb-4 uppercase tracking-wider text-emerald-950">2. Commercial & Maritime Parameters</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="moq" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">MOQ *</label>
                            <input type="number" step="0.1" name="moq" id="moq" value="{{ old('moq', $product->moq) }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                        </div>
                        <div>
                            <label for="moq_unit" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Unit *</label>
                            <input type="text" name="moq_unit" id="moq_unit" value="{{ old('moq_unit', $product->moq_unit) }}" required class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                        </div>
                    </div>

                    <div>
                        <label for="shelf_life" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Shelf Life & Storage</label>
                        <input type="text" name="shelf_life" id="shelf_life" value="{{ old('shelf_life', $product->shelf_life) }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                    </div>

                    <div>
                        <label for="packaging_summary" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Available Packaging</label>
                        <input type="text" name="packaging_summary" id="packaging_summary" value="{{ old('packaging_summary', $product->packaging_summary) }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                    </div>

                    <div>
                        <label for="loading_summary" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Container Loading Summary</label>
                        <input type="text" name="loading_summary" id="loading_summary" value="{{ old('loading_summary', $product->loading_summary) }}" class="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-800">
                    </div>
                </div>

                <div class="mt-6">
                    <label for="main_image" class="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Update Product Photography</label>
                    @if($product->main_image)
                        <div class="mb-3 flex items-center gap-3">
                            <img src="{{ asset($product->main_image) }}" alt="Current image" class="w-16 h-16 rounded-xl object-cover border border-stone-200">
                            <span class="text-xs text-stone-500">Current active photo</span>
                        </div>
                    @endif
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
                                <input type="text" :name="'specs['+idx+'][parameter]'" x-model="spec.parameter" placeholder="Parameter" required class="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold">
                            </div>
                            <div class="sm:col-span-3">
                                <input type="text" :name="'specs['+idx+'][value]'" x-model="spec.value" placeholder="Export Limit" required class="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs">
                            </div>
                            <div class="sm:col-span-3">
                                <input type="text" :name="'specs['+idx+'][test_method]'" x-model="spec.test_method" placeholder="Test Standard" class="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-500">
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
                    <input type="checkbox" name="is_active" value="1" {{ old('is_active', $product->is_active) ? 'checked' : '' }} class="rounded border-stone-300 text-emerald-800 focus:ring-emerald-800">
                    <span>Publish on Public Website</span>
                </label>

                <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                    <input type="checkbox" name="is_featured" value="1" {{ old('is_featured', $product->is_featured) ? 'checked' : '' }} class="rounded border-stone-300 text-emerald-800 focus:ring-emerald-800">
                    <span>Featured Flagship Export</span>
                </label>
            </div>

            <div class="pt-6 border-t border-stone-200 flex justify-end gap-3">
                <a href="{{ route('admin.products.index') }}" class="px-5 py-2.5 bg-stone-100 text-stone-700 font-bold text-xs rounded-xl hover:bg-stone-200 transition">Cancel</a>
                <button type="submit" class="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow">Update Commodity SKU</button>
            </div>
        </form>
    </div>
</div>
@endsection
