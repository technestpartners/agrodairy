import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ChevronRight, User, Eye, ArrowLeft, ArrowRight } from 'lucide-react';
import { blogsService } from '../services/api';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    blogsService.getBySlug(slug)
      .then(res => {
        if (res.success) setBlog(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center">
        <div className="inline-block w-8 h-8 border-4 border-agro-800 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-slate-500">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-md mx-auto py-24 text-center">
        <h2 className="text-xl font-bold text-slate-800">Article not found</h2>
        <Link to="/blogs" className="text-agro-800 font-bold text-xs mt-4 inline-block">Back to Articles</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-agro-800">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/blogs" className="hover:text-agro-800">Insights</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 font-semibold truncate">{blog.title}</span>
      </div>

      <header className="space-y-4">
        <span className="px-3 py-1 rounded-full bg-agro-100 text-agro-800 font-bold text-xs uppercase tracking-wider">
          {blog.category_name}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-4">
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <User className="w-3.5 h-3.5" />
            {blog.author_name || 'Agro Dairy Editorial Desk'}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {blog.views_count || 1} Reads
          </span>
        </div>
      </header>

      {/* Featured Banner */}
      <div className="rounded-3xl overflow-hidden aspect-2/1 bg-slate-100 border border-slate-200">
        <img
          src={blog.featured_image ? (blog.featured_image.startsWith('http') ? blog.featured_image : `/images/${blog.featured_image}`) : '/images/about-commodities.jpg'}
          alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/about-commodities.jpg';
          }}
        />
      </div>

      {/* Article Body */}
      <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
        {blog.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
        <div>
          <h3 className="font-bold text-slate-900">Need specific market rates or FOB allocations?</h3>
          <p className="text-xs text-slate-500">Contact our commodity trading desk for prompt vessel availability.</p>
        </div>
        <Link
          to="/rfq"
          className="bg-agro-800 text-white font-bold text-xs px-5 py-3 rounded-xl shrink-0"
        >
          Submit RFQ
        </Link>
      </div>
    </div>
  );
}
