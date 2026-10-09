import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { toolsService } from '../services/api';

export default function HsCodeFinder() {
  const [codes, setCodes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCodes = (q = '') => {
    setLoading(true);
    toolsService.getHsCodes({ search: q || undefined })
      .then(res => {
        if (res.success) setCodes(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCodes(search.trim());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-agro-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/tools" className="hover:text-agro-800">Export Tools</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">HS Code Finder</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Harmonized System (HS) Export Tariff Finder
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Search standardized 6-digit & 8-digit ITC-HS tariff classifications for Indian agricultural commodities, export incentives (RoDTEP), and customs documentation requirements.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row gap-3 max-w-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by commodity or 2/4/6 digit HS code..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600 font-mono"
          />
        </div>
        <button
          type="submit"
          className="bg-agro-800 hover:bg-agro-900 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition"
        >
          Search Codes
        </button>
      </form>

      {/* Codes Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">ITC-HS Code</th>
                <th className="px-6 py-4">Commodity Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Tariff Description</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-slate-400">Loading HS code registry...</td>
                </tr>
              ) : codes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-slate-400">No matching HS codes found.</td>
                </tr>
              ) : (
                codes.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 font-mono font-bold text-agro-900 text-sm whitespace-nowrap">
                      {c.hs_code}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {c.product_name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                        {c.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                      {c.standard_description || c.notes || 'Export standard'}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Link
                        to={`/rfq`}
                        className="inline-flex items-center gap-1 text-agro-800 hover:text-agro-950 font-bold hover:underline"
                      >
                        Inquire <ArrowRight className="w-3 h-3 text-gold-500" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
