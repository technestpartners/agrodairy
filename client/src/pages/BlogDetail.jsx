import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, ChevronRight, User, Eye, ArrowLeft, ArrowRight, 
  Share2, Bookmark, Check, ShieldCheck, Sparkles, Building2, Anchor
} from 'lucide-react';
import { blogsService } from '../services/api';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFCFB] py-32 text-center">
        <div className="inline-block w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-mono text-slate-500">Retrieving article dossier...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#FAFCFB] py-28 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-extrabold font-display text-[#0C2422]">Article not found</h2>
          <p className="text-xs text-[#4D6765]">The requested trade analysis may have been archived or moved.</p>
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 bg-brand-primary text-white font-ui font-bold text-xs px-6 py-3 rounded-full shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Market Insights
          </Link>
        </div>
      </div>
    );
  }

  const wordCount = (blog.content || '').split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      <RealProductSectionFlanks leftType="chickpeas" rightType="shelled-peanuts" opacity="opacity-20 lg:opacity-25" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO HEADER: ARTICLE OVERVIEW (Clean, Minimal Home Palette)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-16 lg:pb-20 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType="chickpeas" 
          bottomLeftType="shelled-peanuts"
          ticker={`TRADE ANALYSIS • ${blog.category_name?.toUpperCase() || 'EDITORIAL'} • GUJARAT AGRI DESK • APEDA & FSSAI GUIDELINES`}
          coordinates={{ lat: 'N 21.17° SURAT', lng: 'E 72.83°' }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] font-mono flex-wrap">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <Link to="/blogs" className="hover:text-brand-primary transition-colors">
              Trade Insights
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <span className="text-brand-primary font-bold truncate max-w-[200px]">{blog.title}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
            <span>{blog.category_name || 'Market Intelligence'}</span>
            <span className="text-[#4D6765]/40">•</span>
            <span className="text-[#4D6765] font-normal">{readTime} Min Read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold font-display tracking-tight leading-[1.14] text-[#0C2422]">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D4ECE9] text-xs text-[#4D6765] font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#0C2422] font-sans font-bold">
                <User className="w-4 h-4 text-brand-primary" />
                {blog.author_name || 'Agro Dairy Editorial Desk'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#4D6765]" />
                {blog.views_count || 1} Views
              </span>
            </div>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#E6F7F5] border border-[#D4ECE9] text-[#0C2422] transition text-xs font-sans font-bold shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Share Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          ARTICLE BODY & CONTENT SECTION (Clean White & Mint)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-[#D4ECE9] aspect-16/9 bg-slate-100 relative">
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

          {/* Executive Summary Callout */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4ECE9] shadow-sm space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
              <span>EXECUTIVE TRADE SUMMARY</span>
            </div>
            <p className="text-base text-[#0C2422] font-serif leading-relaxed italic border-l-4 border-brand-primary pl-4">
              "{blog.excerpt || blog.content?.substring(0, 180)}..."
            </p>
          </div>

          {/* Body Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D4ECE9] shadow-sm space-y-6 text-[#0C2422] text-base sm:text-lg leading-relaxed font-sans">
            {blog.content ? (
              blog.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed text-[#4D6765]">
                  {paragraph}
                </p>
              ))
            ) : (
              <p>Detailed analysis content loading...</p>
            )}
          </div>

          {/* Commodity Trade Desk Connection Card */}
          <div className="bg-[#F4F9F8] rounded-3xl p-6 sm:p-8 border border-[#D4ECE9] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-wider block">
                Agro Dairy Commercial Desk
              </span>
              <h3 className="text-xl font-bold text-[#0C2422] font-display">
                Direct Inquiries for This Commodity
              </h3>
              <p className="text-xs text-[#4D6765]">
                Explore specifications, FOB Mundra allocations, and lab clearance parameters.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/products"
                className="bg-white hover:bg-slate-50 text-[#0C2422] font-ui font-bold text-xs px-5 py-3 rounded-full border border-[#D4ECE9] transition shadow-xs"
              >
                View Catalog
              </Link>
              <Link
                to="/rfq"
                className="bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs px-6 py-3 rounded-full shadow-sm transition"
              >
                Submit RFQ
              </Link>
            </div>
          </div>

          {/* Author Signature & Return to Articles */}
          <div className="pt-6 flex items-center justify-between border-t border-[#D4ECE9]">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0C2422] hover:text-brand-primary transition"
            >
              <ArrowLeft className="w-4 h-4 text-brand-gold" />
              <span>Back to All Market Reports</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#4D6765] hover:text-[#0C2422]"
            >
              Contact Editorial Author <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
