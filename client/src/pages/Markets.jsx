import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe2, ChevronRight, Anchor, FileText, ArrowRight, 
  Search, ShieldCheck, CheckCircle2, MapPin, Sparkles, SlidersHorizontal
} from 'lucide-react';
import { marketsService } from '../services/api';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

export default function Markets() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    marketsService.getMarkets()
      .then(res => {
        if (res.success) setMarkets(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Filter logic
  const filteredMarkets = markets.map(market => {
    if (selectedRegion !== 'ALL' && market.name !== selectedRegion) {
      return null;
    }

    if (!searchQuery.trim()) {
      return market;
    }

    const q = searchQuery.toLowerCase();
    const matchedCountries = (market.countries || []).filter(c => 
      c.name.toLowerCase().includes(q) ||
      (c.code && c.code.toLowerCase().includes(q)) ||
      (c.primary_ports && c.primary_ports.toLowerCase().includes(q)) ||
      (c.popular_products_summary && c.popular_products_summary.toLowerCase().includes(q))
    );

    if (matchedCountries.length > 0 || market.name.toLowerCase().includes(q)) {
      return {
        ...market,
        countries: matchedCountries.length > 0 ? matchedCountries : market.countries
      };
    }

    return null;
  }).filter(Boolean);

  const allRegions = ['ALL', ...markets.map(m => m.name)];

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      <RealProductSectionFlanks leftType="pearl-millet" rightType="green-moong" opacity="opacity-20 lg:opacity-25" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: GLOBAL MARKETS (Clean, Minimal Home Palette)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType="pearl-millet" 
          bottomLeftType="green-moong"
          ticker="40+ DESTINATIONS • GCC SFDA COMPLIANT • EU MRL LOW RESIDUE GUARANTEE • ASEAN & EAST AFRICA CORRIDORS"
          coordinates={{ lat: 'N 25.27° DUBAI', lng: 'E 55.29°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-5 font-mono">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <span className="text-brand-primary font-bold">Global Export Markets</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <Globe2 className="w-3.5 h-3.5 text-brand-primary" />
                <span className="tracking-wide">SERVING 40+ SOVEREIGN JURISDICTIONS</span>
                <span className="text-[#4D6765]/40">•</span>
                <span className="text-[#4D6765] font-normal">GCC • EU • SEA • Africa</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Global Destination Gateways &amp; <span className="text-brand-primary">Regulatory Profiles</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                From the Gulf Cooperation Council (GCC) to the European Union and ASEAN economies, Agro Dairy structures every shipment with destination-compliant phytosanitary declarations, customs documentation, and preferred Incoterms (CIF, CFR, FOB).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/rfq"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-[#008A82] text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <span>Request Market Quote</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                to="/logistics"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#E6F7F5] text-[#0C2422] font-ui font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-[#D4ECE9] transition-all shadow-xs"
              >
                <Anchor className="w-4 h-4 text-brand-primary" />
                <span>Port Terminals</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#D4ECE9] max-w-4xl">
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-primary">40+</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Countries Served</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-gold">100% SFDA</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">GCC Food Safety Compliant</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-primary">EU MRL</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Low Residue Guarantee</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-gold">Zero Delay</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Pre-Clearance Customs Tally</div>
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
                <Globe2 className="w-3.5 h-3.5 text-brand-primary" />
                <span>GLOBAL TRADE CORRIDORS</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0C2422] tracking-tight">
                Select Destination Region or Search Port
              </h2>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or discharge port..."
                className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-[#0C2422] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {allRegions.map(region => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-xl text-xs font-ui font-bold transition-all ${
                  selectedRegion === region
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-[#F4F9F8] hover:bg-[#E6F7F5] text-slate-700 border border-[#D4ECE9]'
                }`}
              >
                {region === 'ALL' ? 'All International Corridors' : region}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            REGIONAL MARKETS & COUNTRIES LISTING (Clean White & Mint Cards)
            ══════════════════════════════════════════════════════════════════════════ */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="inline-block w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-mono text-slate-500">Retrieving certified market destinations...</p>
          </div>
        ) : filteredMarkets.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#D4ECE9] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0C2422]">No destination countries matched your query</h3>
            <p className="text-xs text-[#4D6765] max-w-md mx-auto">
              Try searching for a different port name (e.g. Jebel Ali, Rotterdam, Haiphong) or clear the filter.
            </p>
            <button
              type="button"
              onClick={() => { setSelectedRegion('ALL'); setSearchQuery(''); }}
              className="bg-brand-primary text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredMarkets.map(market => (
              <div key={market.id} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D4ECE9] shadow-sm space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center font-extrabold border border-[#BBE5E1]">
                      <Globe2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C2422] font-display">
                        {market.name}
                      </h2>
                      <p className="text-xs text-[#4D6765] mt-0.5 font-sans">
                        {market.description || 'Core international destination corridor with regular liner connectivity.'}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#F4F9F8] text-[#0C2422] border border-[#D4ECE9]">
                    <span>{market.countries?.length || 0} Destination Hubs</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {market.countries && market.countries.map(c => (
                    <div 
                      key={c.id} 
                      className="border border-[#D4ECE9] rounded-3xl p-6 hover:border-brand-primary/40 hover:shadow-md transition-all bg-[#F8FAF9] hover:bg-white flex flex-col justify-between group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl filter drop-shadow-sm">{c.flag_emoji || '🌐'}</span>
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-white text-slate-700 border border-[#D4ECE9]">
                            {c.code || 'ISO'}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-extrabold text-lg text-[#0C2422] group-hover:text-brand-primary transition-colors font-display">
                            {c.name}
                          </h3>
                        </div>

                        {c.primary_ports && (
                          <div className="text-xs bg-white p-3.5 rounded-2xl border border-[#D4ECE9] space-y-1">
                            <span className="font-bold text-[#0C2422] flex items-center gap-1">
                              <Anchor className="w-3.5 h-3.5 text-brand-primary" /> Primary Discharge Ports:
                            </span>
                            <span className="text-[#4D6765] font-mono block leading-relaxed">{c.primary_ports}</span>
                          </div>
                        )}

                        {c.popular_products_summary && (
                          <div className="text-xs space-y-1">
                            <span className="font-semibold text-slate-700 block">High-Demand Commodities:</span>
                            <p className="text-[#4D6765] leading-relaxed line-clamp-2">
                              {c.popular_products_summary}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="pt-5 border-t border-[#D4ECE9] mt-5">
                        <Link
                          to={`/rfq?destination_port=${encodeURIComponent(c.primary_ports?.split(',')[0]?.trim() || c.name)}`}
                          className="inline-flex items-center justify-between w-full text-xs font-ui font-bold text-[#0C2422] bg-white hover:bg-brand-primary hover:text-white px-4 py-2.5 rounded-xl transition-all border border-[#D4ECE9]"
                        >
                          <span>Request CIF {c.name} Quote</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-gold group-hover:text-white" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════════
            BOTTOM REGULATORY ASSURANCE BANNER (Signature Clean Dark Pine Section)
            ══════════════════════════════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-br from-[#021814] via-[#052822] to-[#011310] rounded-3xl p-8 sm:p-12 text-white border border-[#00A79D]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A79D]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <span className="text-xs font-mono font-bold text-[#5EEAD4] uppercase tracking-wider block">
                Customs &amp; Sovereign Compliance
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
                Need Import Clearance Assistance for Your Country?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Our commercial trade team structures certified documentation: Certificate of Origin (Chamber of Commerce / GSP Form A), Phytosanitary, Halal / Kosher certificates, and Embassy legalizations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Link
                to="/rfq"
                className="bg-brand-gold hover:bg-[#e5ab00] text-[#002B26] font-ui font-black text-sm px-8 py-4 rounded-full transition-all shadow-lg shadow-brand-gold/20 hover:scale-[1.02]"
              >
                Create International RFQ
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 text-white font-ui font-bold text-sm px-7 py-4 rounded-full transition-all border border-white/20"
              >
                Inquire with Export Desk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
