import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, ArrowRight, User } from 'lucide-react';
import { blogsService } from '../services/api';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsService.getAll()
      .then(res => {
        if (res.success) setBlogs(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-agro-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Trade Insights</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Global Agro Commodity Insights & Market Reports
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Market analysis, Indian monsoon crop forecasts, export policy revisions, and ocean freight logistics intelligence from our trade team.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-4 border-agro-800 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-slate-500">Loading articles...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <p className="text-slate-500 text-sm">No articles published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <article key={blog.id} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden hover:shadow-lg transition flex flex-col justify-between">
              <div>
                <div className="h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={blog.featured_image ? (blog.featured_image.startsWith('http') ? blog.featured_image : `/images/${blog.featured_image}`) : '/images/about-commodities.jpg'}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/about-commodities.jpg';
                    }}
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="px-2 py-0.5 rounded bg-agro-50 text-agro-800 font-semibold">
                      {blog.category_name}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 hover:text-agro-800 transition line-clamp-2">
                    <Link to={`/blogs/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {blog.excerpt || blog.content?.substring(0, 150)}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">By {blog.author_name || 'Agro Dairy Desk'}</span>
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-agro-800 hover:text-agro-950"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
