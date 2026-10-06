<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\View\View;

class BlogController extends Controller
{
    public function index(Request $request): View
    {
        $categories = BlogCategory::withCount('blogs')->get();

        $query = Blog::published()->with(['category', 'author']);

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $blogs = $query->paginate(9)->withQueryString();

        return view('pages.blogs.index', compact('blogs', 'categories'));
    }

    public function show(Blog $blog): View
    {
        abort_unless($blog->is_published, 404);

        $blog->increment('views_count');
        $blog->load(['category', 'author']);

        $relatedBlogs = Blog::published()
            ->where('category_id', $blog->category_id)
            ->where('id', '!=', $blog->id)
            ->take(3)
            ->get();

        return view('pages.blogs.show', compact('blog', 'relatedBlogs'));
    }
}
