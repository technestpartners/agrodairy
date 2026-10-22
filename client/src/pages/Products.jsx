import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, SlidersHorizontal, ArrowRight, ShieldCheck, 
  Package, ChevronRight, Layers, Sparkles, Filter
} from 'lucide-react';
import CommodityCard from '../components/CommodityCard';
import { productsService } from '../services/api';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('featured');

  const activeCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    // Fetch categories with counts
    productsService.getCategories()
      .then(res => {
        if (res.success) setCategories(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    const categoryQuery = activeCategory === 'all' ? undefined : activeCategory;
    const searchQuery = searchParams.get('search') || undefined;

    productsService.getAll({ category: categoryQuery, search: searchQuery, limit: 100 })
      .then(res => {
        if (res.success) setProducts(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (search.trim()) {
      newParams.set('search', search.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleCategorySelect = (catSlug) => {
    const newParams = new URLSearchParams(searchParams);
    if (catSlug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catSlug);
    }
    setSearchParams(newParams);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '');
    if (sortBy === 'name-desc') return (b.name || '').localeCompare(a.name || '');
    return 0;
  });

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      <RealProductSectionFlanks leftType="pearl-millet" rightType="shelled-peanuts" opacity="opacity-20 lg:opacity-30" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: COMMODITIES CATALOG (Clean, Minimal Home Palette)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType="pearl-millet" 
          bottomLeftType="shelled-peanuts"
          ticker="SORTEX 99.5%+ OPTICAL CLEANED • APEDA & FSSAI CERTIFIED • DIRECT GUJARAT MANDI ORIGIN • FCL EXPORT PACKAGING"
          coordinates={{ lat: 'N 21.17° SURAT', lng: 'E 72.83°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-5 font-mono">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <span className="text-brand-primary font-bold">Export Commodities Catalog</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                <span className="tracking-wide">ORIGIN-DIRECT GUJARAT HARVESTS</span>
                <span className="text-[#4D6765]/40">•</span>
                <span className="text-[#4D6765] font-normal">Sortex 99.5%+ Machine Cleaned</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Export <span className="text-brand-primary">Commodities Catalog</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                Procured directly from certified Saurashtra farm mandis, processed through advanced optical color sorting, and packaged to meet strict APEDA, FSSAI, and European Union Aflatoxin specifications.
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
                to="/tools/container-calculator"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#E6F7F5] text-[#0C2422] font-ui font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-[#D4ECE9] transition-all shadow-xs"
              >
                <Package className="w-4 h-4 text-brand-primary" />
                <span>Container Calculator</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SEARCH, CATEGORY PILLS & FILTERS CARD (Clean Home-Page Style)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D4ECE9] space-y-5 text-[#0C2422]">
          
          {/* Top Bar: Search Input & Sort Selector */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-[440px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by commodity, grade (38/42), or HS Code..."
                className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-2xl pl-11 pr-24 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition text-[#0C2422]"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-bold font-ui transition"
              >
                Search
              </button>
            </form>

            {/* Sort & Results Count */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <div className="text-xs text-[#4D6765] font-mono">
                Showing <strong className="text-[#0C2422] font-bold">{sortedProducts.length}</strong> export lines
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl px-3 py-2 text-xs font-ui font-semibold text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-[#00A79D]"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="name-asc">Name (A to Z)</option>
                  <option value="name-desc">Name (Z to A)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
              <button
                type="button"
                onClick={() => handleCategorySelect('all')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-ui font-bold transition-all shrink-0 flex items-center gap-2 ${
                  activeCategory === 'all'
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-[#F4F9F8] hover:bg-[#E6F7F5] text-slate-700 border border-[#D4ECE9]'
                }`}
              >
                <span>All Commodities</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {products.length}
                </span>
              </button>

              {categories.map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-ui font-bold transition-all shrink-0 flex items-center gap-2 ${
                    activeCategory === cat.slug
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'bg-[#F4F9F8] hover:bg-[#E6F7F5] text-slate-700 border border-[#D4ECE9]'
                  }`}
                >
                  <span>{cat.name}</span>
                  {cat.products_count !== undefined && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeCategory === cat.slug ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {cat.products_count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          COMMODITY GRID SECTION (Clean Airy Layout)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-semibold text-[#4D6765]">Retrieving certified commodity catalog...</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#D4ECE9] max-w-md mx-auto shadow-sm space-y-4">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0C2422]">No commodities found</h3>
              <p className="text-xs text-[#4D6765] mt-1 max-w-xs mx-auto">
                No active export lines matched your filter criteria. Try resetting the search or selecting another category.
              </p>
            </div>
            <button
              onClick={() => {
                setSearch('');
                handleCategorySelect('all');
              }}
              className="bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {sortedProducts.map(product => (
              <CommodityCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          BOTTOM TRADE ASSURANCE & MIXED CONTAINER BANNER (Signature Clean Dark Pine)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#021814] via-[#052822] to-[#011310] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[#00A79D]/30 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5EEAD4] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-[#5EEAD4]" />
              <span>Full Container Load (FCL) &amp; Mixed Consignments</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Need Multi-Commodity Mixed Containers or Custom Packaging?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/75 mt-2 font-sans leading-relaxed">
              We consolidate multiple commodities (e.g. Peanuts + Sesame + Chickpeas + Ghee) in single 20ft / 40ft containers under one unified Bill of Lading, saving freight and import duties.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/rfq"
              className="bg-brand-gold hover:bg-amber-400 text-[#002B26] font-ui font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Request Formal RFQ
            </Link>
            <Link
              to="/tools/container-calculator"
              className="bg-white/10 hover:bg-white/15 text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-white/20 transition-all"
            >
              Calculate Container Load
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
