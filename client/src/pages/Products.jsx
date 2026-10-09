import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Layers, ArrowUpDown, ChevronRight } from 'lucide-react';
import { productsService } from '../services/api';
import CommodityCard from '../components/CommodityCard';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const activeCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    productsService.getCategories()
      .then(res => {
        if (res.success) setCategories(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {
      limit: 60,
      search: searchParams.get('search') || undefined,
      category: activeCategory !== 'all' ? activeCategory : undefined
    };

    productsService.getAll(params)
      .then(res => {
        if (res.success) setProducts(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [searchParams, activeCategory]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-agro-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Commodities Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Export Commodities Catalog
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Browse our certified Indian agricultural and dairy export lines. All products conform to APEDA/FSSAI export specifications and are available for containerized shipment.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by commodity name, grade, or HS code..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
          />
        </form>

        {/* Results summary */}
        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-800">{products.length}</span> commodities ready for export
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        <button
          onClick={() => handleCategorySelect('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
            activeCategory === 'all'
              ? 'bg-agro-900 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Categories
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.slug)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
              activeCategory === cat.slug
                ? 'bg-agro-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.name} ({cat.products_count || 0})
          </button>
        ))}
      </div>

      {/* Commodity Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-4 border-agro-800 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-slate-500">Loading export commodities...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No commodities matched</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try resetting your search query or choosing another export category.
          </p>
          <button
            onClick={() => {
              setSearch('');
              handleCategorySelect('all');
            }}
            className="bg-agro-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <CommodityCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
