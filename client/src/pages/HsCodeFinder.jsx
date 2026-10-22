import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, FileText, ArrowRight, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { toolsService } from '../services/api';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

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
    <div className="relative bg-[#FAFCFB] min-h-screen">
      <RealProductSectionFlanks leftType="shelled-peanuts" rightType="yellow-corn" opacity="opacity-20 lg:opacity-25" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: HS CODE FINDER (Clean, Minimal Home Palette)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType="shelled-peanuts" 
          bottomLeftType="yellow-corn"
          ticker="ITC-HS 6 & 8 DIGIT CLASSIFICATIONS • RoDTEP & DUTY DRAWBACK • CUSTOMS TARIFF REGISTRY • EXPORT DECLARATIONS"
          coordinates={{ lat: 'N 21.17° SURAT', lng: 'E 72.83°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-5 font-mono">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <Link to="/products" className="hover:text-brand-primary transition-colors">Trade Tools</Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <span className="text-brand-primary font-bold">HS Code Finder</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <BookOpen className="w-3.5 h-3.5 text-brand-primary" />
                <span className="tracking-wide">CUSTOMS TARIFF REGISTRY</span>
                <span className="text-[#4D6765]/40">•</span>
                <span className="text-[#4D6765] font-normal">ITC-HS 6 &amp; 8 Digit Classifications</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Harmonized System <span className="text-brand-primary">(HS) Tariff Directory</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                Verify official 6-digit and 8-digit ITC-HS tariff classifications, export incentive entitlements (RoDTEP / Duty Drawback), and international customs declaration specifications for Indian agro &amp; dairy lines.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/rfq"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-[#008A82] text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#E6F7F5] text-[#0C2422] font-ui font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-[#D4ECE9] transition-all shadow-xs"
              >
                <span>Commodities Catalog</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SEARCH CARD & TARIFF DIRECTORY TABLE (Clean Home-Page Card)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D4ECE9] space-y-6 text-[#0C2422]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-2 shadow-xs">
                <Search className="w-3.5 h-3.5 text-brand-primary" />
                <span>OFFICIAL ITC-HS LOOKUP</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0C2422] tracking-tight">
                Search Export Tariff Classifications
              </h2>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search commodity name, chapter, or 2/4/6/8 digit HS code..."
                className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition font-mono text-[#0C2422]"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs px-6 py-3 rounded-2xl transition shadow-md shrink-0"
            >
              Search Tariff Codes
            </button>
          </form>

          {/* Table Container */}
          <div className="rounded-2xl border border-[#D4ECE9] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F4F9F8] border-b border-[#D4ECE9] text-[11px] font-mono text-[#0C2422] uppercase tracking-wider font-bold">
                    <th className="py-4 px-4 sm:px-6">HS Code</th>
                    <th className="py-4 px-4 sm:px-6">Commodity Description</th>
                    <th className="py-4 px-4 sm:px-6">Chapter</th>
                    <th className="py-4 px-4 sm:px-6">Standard Unit</th>
                    <th className="py-4 px-4 sm:px-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-sans">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-[#4D6765] font-mono">
                        <div className="inline-block w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-2" />
                        <div>Loading customs tariff classifications...</div>
                      </td>
                    </tr>
                  ) : codes.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-[#4D6765] font-mono">
                        No tariff entries found for "{search}". Try searching for Peanuts, Sesame, Chickpeas, or Ghee.
                      </td>
                    </tr>
                  ) : (
                    codes.map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-[#F8FAF9] transition-colors">
                        <td className="py-4 px-4 sm:px-6 font-mono font-bold text-[#0C2422] text-sm">
                          <span className="bg-[#E6F7F5] text-brand-primary px-2.5 py-1 rounded-lg border border-[#BBE5E1]">
                            {item.hs_code}
                          </span>
                        </td>
                        <td className="py-4 px-4 sm:px-6 font-bold text-[#0C2422] max-w-xs">
                          {item.product_name}
                          {item.description && (
                            <span className="block text-[11px] text-[#4D6765] font-normal mt-0.5 line-clamp-1">
                              {item.description}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 sm:px-6 font-mono text-slate-500 text-xs">
                          {item.chapter || 'Ch. 12 / 07 / 04'}
                        </td>
                        <td className="py-4 px-4 sm:px-6 font-mono text-slate-600 font-semibold">
                          {item.unit || 'MT / KGS'}
                        </td>
                        <td className="py-4 px-4 sm:px-6">
                          <Link
                            to={`/rfq?commodity=${encodeURIComponent(item.product_name || '')}`}
                            className="inline-flex items-center gap-1 text-xs font-ui font-bold text-brand-primary hover:text-brand-primary-dark"
                          >
                            <span>Quote</span>
                            <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4D6765]">
            <span>All HS classifications cross-verified against DGFT ITC (HS) 2026 customs schedules.</span>
            <Link to="/contact" className="font-bold text-[#0C2422] hover:text-brand-primary underline">
              Need custom tariff documentation support?
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          BOTTOM CTA (Signature Clean Dark Pine Section)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#021814] via-[#052822] to-[#011310] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[#00A79D]/30 shadow-2xl mt-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5EEAD4] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-[#5EEAD4]" />
              <span>Duty Drawback &amp; RoDTEP Advisory</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Structuring Customs Documentation for International Port Clearance?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/75 mt-2 font-sans leading-relaxed">
              Our export documentation desk prepares clean commercial invoices, packing lists, Certificate of Origin (COO), and phytosanitary certificates formatted for your customs authority.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/rfq"
              className="bg-brand-gold hover:bg-amber-400 text-[#002B26] font-ui font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Submit Proforma RFQ
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/15 text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-white/20 transition-all"
            >
              Contact Customs Specialist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
