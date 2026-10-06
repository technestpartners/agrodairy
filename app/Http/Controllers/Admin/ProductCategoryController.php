<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use App\Services\AuditService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class ProductCategoryController extends Controller
{
    public function index(): View
    {
        $categories = ProductCategory::withCount('products')
            ->orderBy('sort_order')
            ->paginate(15);

        return view('admin.categories.index', compact('categories'));
    }

    public function create(): View
    {
        $parentCategories = ProductCategory::whereNull('parent_id')->get();
        return view('admin.categories.create', compact('parentCategories'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'slug' => 'nullable|string|max:150|unique:product_categories,slug',
            'parent_id' => 'nullable|exists:product_categories,id',
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'hs_code_prefix' => 'nullable|string|max:10',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = $validated['slug'] ? Str::slug($validated['slug']) : Str::slug($validated['name']);
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['is_active'] = $request->boolean('is_active', true);

        $category = ProductCategory::create($validated);

        AuditService::log('created', 'ProductCategory', $category->id, "Created category {$category->name}");

        return redirect()->route('admin.categories.index')->with('success', "Category '{$category->name}' created successfully.");
    }

    public function edit(ProductCategory $category): View
    {
        $parentCategories = ProductCategory::whereNull('parent_id')
            ->where('id', '!=', $category->id)
            ->get();

        return view('admin.categories.edit', compact('category', 'parentCategories'));
    }

    public function update(Request $request, ProductCategory $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'slug' => "nullable|string|max:150|unique:product_categories,slug,{$category->id}",
            'parent_id' => 'nullable|exists:product_categories,id',
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'hs_code_prefix' => 'nullable|string|max:10',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = $validated['slug'] ? Str::slug($validated['slug']) : Str::slug($validated['name']);
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['is_active'] = $request->boolean('is_active');

        $category->update($validated);

        AuditService::log('updated', 'ProductCategory', $category->id, "Updated category {$category->name}");

        return redirect()->route('admin.categories.index')->with('success', "Category '{$category->name}' updated successfully.");
    }

    public function destroy(ProductCategory $category): RedirectResponse
    {
        $name = $category->name;
        $category->delete();

        AuditService::log('deleted', 'ProductCategory', null, "Deleted category {$name}");

        return redirect()->route('admin.categories.index')->with('success', "Category '{$name}' deleted.");
    }
}
