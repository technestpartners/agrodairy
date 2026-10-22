import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, ChevronRight, ArrowRight, User, BookOpen, 
  Search, Sparkles, TrendingUp, ShieldCheck, Clock
} from 'lucide-react';
import { blogsService } from '../services/api';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    blogsService.getAll()
      .then(res => {
        if (res.success) setBlogs(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['ALL', ...Array.from(new Set(blogs.map(b => b.category_name).filter(Boolean)))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCat = selectedCategory === 'ALL' || blog.category_name === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blog.category_name && blog.category_name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const remainingBlogs = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      <RealProductSectionFlanks leftType="chickpeas" rightType="shelled-peanuts" opacity="opacity-20 lg:opacity-25" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: TRADE INSIGHTS (Clean, Minimal Home Palette)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType="chickpeas" 
          bottomLeftType="shelled-peanuts"
          ticker="WEEKLY MANDI UPDATES • KHARIF & RABI YIELD TRACKING • FOB/CIF FREIGHT GUIDANCE • DGFT POLICY REVISIONS"
          coordinates={{ lat: 'N 21.17° SURAT', lng: 'E 72.83°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-5 font-mono">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <span className="text-brand-primary font-bold">Trade Intelligence &amp; News</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <TrendingUp className="w-3.5 h-3.5 text-brand-primary" />
                <span className="tracking-wide">COMMODITY PRICING &amp; AGRONOMY REPORTS</span>
                <span className="text-[#4D6765]/40">•</span>
                <span className="text-[#4D6765] font-normal">Gujarat Mandi Updates</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Global Agricultural <span className="text-brand-primary">Trade Intelligence</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                Essential analysis from the Agro Dairy commercial trade desk: Saurashtra peanut harvest estimates, sesame seed yield dynamics, DGFT export policy updates, and Red Sea ocean freight adjustments.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/rfq"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-[#008A82] text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <span>Request Container Quote</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                to="/crop-calendar"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#E6F7F5] text-[#0C2422] font-ui font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-[#D4ECE9] transition-all shadow-xs"
              >
                <Calendar className="w-4 h-4 text-brand-primary" />
                <span>Crop Calendar</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#D4ECE9] max-w-4xl">
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-primary">Weekly</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Mandi Price Updates</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-gold">Monsoon</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Kharif &amp; Rabi Tracking</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-primary">FOB / CIF</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Maritime Freight Guidance</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-gold">DGFT / APEDA</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Policy &amp; Tariff Revisions</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          FILTER & SEARCH CONTROL BAR (Clean Home-Page Card)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4ECE9] shadow-xl space-y-6 text-[#0C2422]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-2 shadow-xs">
                <BookOpen className="w-3.5 h-3.5 text-brand-primary" />
                <span>EDITORIAL TRADE DESK</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0C2422] tracking-tight">
                Filter by Commodity or Topic
              </h2>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles &amp; commodities..."
                className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-[#0C2422] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-ui font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-[#F4F9F8] hover:bg-[#E6F7F5] text-slate-700 border border-[#D4ECE9]'
                }`}
              >
                {cat === 'ALL' ? 'All Market Articles' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            ARTICLES LISTING (Clean White & Mint Cards)
            ══════════════════════════════════════════════════════════════════════════ */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="inline-block w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-mono text-slate-500">Loading market intelligence reports...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#D4ECE9] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0C2422]">No articles matched your criteria</h3>
            <p className="text-xs text-[#4D6765] max-w-md mx-auto">
              Try searching with other keywords or reset your category selection.
            </p>
            <button
              type="button"
              onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
              className="bg-brand-primary text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Article Card */}
            {featuredBlog && selectedCategory === 'ALL' && !searchQuery && (
              <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm overflow-hidden hover:shadow-md hover:border-brand-primary/40 transition-all group">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-7 h-72 sm:h-96 lg:h-auto overflow-hidden relative">
                    <img
                      src={featuredBlog.featured_image ? (featuredBlog.featured_image.startsWith('http') ? featuredBlog.featured_image : `/images/${featuredBlog.featured_image}`) : '/images/about-commodities.jpg'}
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/about-commodities.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#0C2422] text-[#5EEAD4] font-mono font-bold text-xs uppercase tracking-wider shadow border border-white/20">
                        Featured Analysis
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs text-[#4D6765]">
                        <span className="font-bold text-brand-primary uppercase tracking-wider font-mono">
                          {featuredBlog.category_name}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(featuredBlog.published_at || featuredBlog.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C2422] font-display leading-tight group-hover:text-brand-primary transition-colors">
                        <Link to={`/blogs/${featuredBlog.slug}`}>
                          {featuredBlog.title}
                        </Link>
                      </h2>

                      <p className="text-sm text-[#4D6765] leading-relaxed line-clamp-4 font-sans">
                        {featuredBlog.excerpt || featuredBlog.content?.substring(0, 220)}...
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-[#4D6765] font-medium">
                        By {featuredBlog.author_name || 'Agro Dairy Desk'}
                      </span>
                      <Link
                        to={`/blogs/${featuredBlog.slug}`}
                        className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm"
                      >
                        Read Report <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === 'ALL' && !searchQuery ? remainingBlogs : filteredBlogs).map(blog => (
                <article 
                  key={blog.id} 
                  className="bg-white rounded-3xl border border-[#D4ECE9] shadow-sm overflow-hidden hover:shadow-md hover:border-brand-primary/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-52 bg-slate-100 overflow-hidden relative">
                      <img
                        src={blog.featured_image ? (blog.featured_image.startsWith('http') ? blog.featured_image : `/images/${blog.featured_image}`) : '/images/about-commodities.jpg'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/about-commodities.jpg';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0C2422] font-mono font-bold text-[11px] shadow border border-[#D4ECE9]">
                          {blog.category_name}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(blog.published_at || blog.created_at).toLocaleDateString()}</span>
                      </div>

                      <h3 className="text-lg font-bold text-[#0C2422] group-hover:text-brand-primary transition font-display line-clamp-2">
                        <Link to={`/blogs/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-[#4D6765] line-clamp-3 leading-relaxed font-sans">
                        {blog.excerpt || blog.content?.substring(0, 150)}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <span className="text-xs text-[#4D6765] font-medium truncate max-w-[150px]">
                      By {blog.author_name || 'Agro Dairy Desk'}
                    </span>
                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-ui font-bold text-[#0C2422] hover:text-brand-primary transition"
                    >
                      Read Report <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════════
            BOTTOM NEWSLETTER / TRADE ALERT BOX (Signature Clean Dark Pine Section)
            ══════════════════════════════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-br from-[#021814] via-[#052822] to-[#011310] rounded-3xl p-8 sm:p-12 text-white border border-[#00A79D]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A79D]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <span className="text-xs font-mono font-bold text-[#5EEAD4] uppercase tracking-wider block">
                Commodity Market Bulletin
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
                Direct Mandi Rates &amp; Export Crop Briefings
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Subscribe to receive weekly crop harvesting bulletins, ocean freight indicators, and FOB Mundra port offers directly from our commercial export desk.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              <form 
                onSubmit={(e) => { e.preventDefault(); alert('Thank you! You are now subscribed to Agro Dairy Market Bulletins.'); }} 
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter corporate email..."
                  className="bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A79D]"
                />
                <button
                  type="submit"
                  className="bg-brand-gold hover:bg-[#e5ab00] text-[#002B26] font-ui font-black text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all shadow-lg shadow-brand-gold/20 shrink-0"
                >
                  Subscribe Alerts
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
