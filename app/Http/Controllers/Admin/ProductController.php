<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductSpecification;
use App\Services\AuditService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class ProductController extends Controller
{
    public function index(Request $request): View
    {
        $categories = ProductCategory::orderBy('name')->get();

        $query = Product::with(['category', 'specifications']);

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%")
                  ->orWhere('hs_code', 'like', "%{$search}%");
            });
        }

        $products = $query->latest()->paginate(15)->withQueryString();

        return view('admin.products.index', compact('products', 'categories'));
    }

    public function create(): View
    {
        $categories = ProductCategory::active()->orderBy('name')->get();
        return view('admin.products.create', compact('categories'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:product_categories,id',
            'name' => 'required|string|max:200',
            'slug' => 'nullable|string|max:200|unique:products,slug',
            'sku' => 'nullable|string|max:50|unique:products,sku',
            'short_description' => 'nullable|string|max:600',
            'description' => 'nullable|string',
            'origin' => 'required|string|max:150',
            'grade_variety' => 'nullable|string|max:200',
            'hs_code' => 'nullable|string|max:30',
            'moq' => 'required|numeric|min:0.1',
            'moq_unit' => 'required|string|max:100',
            'available_quantity' => 'nullable|string|max:100',
            'shelf_life' => 'nullable|string|max:100',
            'storage_conditions' => 'nullable|string|max:255',
            'packaging_summary' => 'nullable|string|max:500',
            'loading_summary' => 'nullable|string|max:500',
            'main_image' => 'nullable|image|max:4096',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = $validated['slug'] ? Str::slug($validated['slug']) : Str::slug($validated['name']);
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['is_active'] = $request->boolean('is_active', true);

        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('products', 'public');
            $validated['main_image'] = '/storage/' . $path;
        }

        $product = Product::create($validated);

        // Store dynamic specifications if provided
        if ($request->filled('specs') && is_array($request->specs)) {
            foreach ($request->specs as $index => $spec) {
                if (!empty($spec['parameter']) && !empty($spec['value'])) {
                    ProductSpecification::create([
                        'product_id' => $product->id,
                        'spec_group' => $spec['spec_group'] ?? 'Physical Parameters',
                        'parameter' => $spec['parameter'],
                        'value' => $spec['value'],
                        'unit' => $spec['unit'] ?? null,
                        'test_method' => $spec['test_method'] ?? null,
                        'sort_order' => $index + 1,
                    ]);
                }
            }
        }

        AuditService::log('created', 'Product', $product->id, "Created product {$product->name}");

        return redirect()->route('admin.products.index')->with('success', "Product '{$product->name}' added successfully.");
    }

    public function edit(Product $product): View
    {
        $categories = ProductCategory::active()->orderBy('name')->get();
        $product->load(['specifications', 'images']);

        return view('admin.products.edit', compact('product', 'categories'));
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:product_categories,id',
            'name' => 'required|string|max:200',
            'slug' => "nullable|string|max:200|unique:products,slug,{$product->id}",
            'sku' => "nullable|string|max:50|unique:products,sku,{$product->id}",
            'short_description' => 'nullable|string|max:600',
            'description' => 'nullable|string',
            'origin' => 'required|string|max:150',
            'grade_variety' => 'nullable|string|max:200',
            'hs_code' => 'nullable|string|max:30',
            'moq' => 'required|numeric|min:0.1',
            'moq_unit' => 'required|string|max:100',
            'available_quantity' => 'nullable|string|max:100',
            'shelf_life' => 'nullable|string|max:100',
            'storage_conditions' => 'nullable|string|max:255',
            'packaging_summary' => 'nullable|string|max:500',
            'loading_summary' => 'nullable|string|max:500',
            'main_image' => 'nullable|image|max:4096',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = $validated['slug'] ? Str::slug($validated['slug']) : Str::slug($validated['name']);
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('products', 'public');
            $validated['main_image'] = '/storage/' . $path;
        }

        $product->update($validated);

        // Update specifications: delete previous and recreate
        if ($request->has('specs') && is_array($request->specs)) {
            $product->specifications()->delete();
            foreach ($request->specs as $index => $spec) {
                if (!empty($spec['parameter']) && !empty($spec['value'])) {
                    ProductSpecification::create([
                        'product_id' => $product->id,
                        'spec_group' => $spec['spec_group'] ?? 'Physical Parameters',
                        'parameter' => $spec['parameter'],
                        'value' => $spec['value'],
                        'unit' => $spec['unit'] ?? null,
                        'test_method' => $spec['test_method'] ?? null,
                        'sort_order' => $index + 1,
                    ]);
                }
            }
        }

        AuditService::log('updated', 'Product', $product->id, "Updated product {$product->name}");

        return redirect()->route('admin.products.index')->with('success', "Product '{$product->name}' updated successfully.");
    }

    public function destroy(Product $product): RedirectResponse
    {
        $name = $product->name;
        $product->delete();

        AuditService::log('deleted', 'Product', null, "Deleted product {$name}");

        return redirect()->route('admin.products.index')->with('success', "Product '{$name}' deleted.");
    }
}
