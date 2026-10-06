<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Services\AuditService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\View\View;

class BlogController extends Controller
{
    public function index(): View
    {
        $blogs = Blog::with(['category', 'author'])->latest()->paginate(15);
        return view('admin.blogs.index', compact('blogs'));
    }

    public function create(): View
    {
        $categories = BlogCategory::all();
        return view('admin.blogs.create', compact('categories'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:blog_categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blogs,slug',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
        ]);

        $validated['slug'] = $validated['slug'] ? Str::slug($validated['slug']) : Str::slug($validated['title']);
        $validated['author_id'] = Auth::id();
        $validated['is_published'] = $request->boolean('is_published', true);
        if ($validated['is_published'] && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $blog = Blog::create($validated);

        AuditService::log('created', 'Blog', $blog->id, "Created blog post {$blog->title}");

        return redirect()->route('admin.blogs.index')->with('success', "Blog post '{$blog->title}' created.");
    }

    public function edit(Blog $blog): View
    {
        $categories = BlogCategory::all();
        return view('admin.blogs.edit', compact('blog', 'categories'));
    }

    public function update(Request $request, Blog $blog): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:blog_categories,id',
            'title' => 'required|string|max:255',
            'slug' => "nullable|string|max:255|unique:blogs,slug,{$blog->id}",
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
        ]);

        $validated['slug'] = $validated['slug'] ? Str::slug($validated['slug']) : Str::slug($validated['title']);
        $validated['is_published'] = $request->boolean('is_published');

        $blog->update($validated);

        AuditService::log('updated', 'Blog', $blog->id, "Updated blog post {$blog->title}");

        return redirect()->route('admin.blogs.index')->with('success', "Blog post '{$blog->title}' updated.");
    }

    public function destroy(Blog $blog): RedirectResponse
    {
        $title = $blog->title;
        $blog->delete();

        AuditService::log('deleted', 'Blog', null, "Deleted blog {$title}");

        return redirect()->route('admin.blogs.index')->with('success', "Blog '{$title}' deleted.");
    }
}
