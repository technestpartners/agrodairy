import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Layers, ChevronRight, Calculator, Scale, AlertCircle, 
  CheckCircle2, ArrowRight, Anchor, Package, Sparkles, ShieldCheck
} from 'lucide-react';
import { toolsService } from '../services/api';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

export default function ContainerCalculator() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    container_type: '20ft',
    commodity_category: searchParams.get('category') || 'peanuts',
    bag_weight_kg: '50',
    bag_count: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    setLoading(true);
    try {
      const res = await toolsService.calculateContainer(formData);
      if (res.success) {
        setResult(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculate();
  }, [formData.container_type, formData.commodity_category, formData.bag_weight_kg]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    calculate();
  };

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      <RealProductSectionFlanks leftType="shelled-peanuts" rightType="yellow-corn" opacity="opacity-20 lg:opacity-25" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: CONTAINER LOAD CALCULATOR (Clean, Minimal Home Palette)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType="shelled-peanuts" 
          bottomLeftType="yellow-corn"
          ticker="20FT & 40FT OCEAN STUFFING • SOLAS VGM CERTIFICATION • NET PAYLOAD TOLERANCES • MUNDRA & HAZIRA DISPATCH"
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
            <span className="text-brand-primary font-bold">Container Calculator</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <Calculator className="w-3.5 h-3.5 text-brand-primary" />
                <span className="tracking-wide">OCEAN LOGISTICS &amp; STUFFING ENGINE</span>
                <span className="text-[#4D6765]/40">•</span>
                <span className="text-[#4D6765] font-normal">SOLAS VGM Compliant</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Marine Container <span className="text-brand-primary">Load &amp; VGM Calculator</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                Estimate full container load (FCL) stuffing capacity, total bag count, gross cargo weight, and certified marine VGM across 20ft and 40ft ocean containers from Mundra and Hazira ports.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/rfq"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-[#008A82] text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <span>Request FCL Quote</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                to="/tools/landed-cost-calculator"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#E6F7F5] text-[#0C2422] font-ui font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-[#D4ECE9] transition-all shadow-xs"
              >
                <span>Landed Cost Estimator</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          CALCULATOR INTERFACE & RESULTS (Clean Home-Page Cards)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Parameters */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#D4ECE9] shadow-xl space-y-6 text-[#0C2422]">
            <div className="border-b border-slate-100 pb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-[10px] font-ui font-bold mb-2 shadow-xs">
                <Layers className="w-3 h-3 text-brand-primary" />
                <span>CONTAINER SPECIFICATIONS</span>
              </div>
              <h2 className="text-xl font-display font-extrabold text-[#0C2422]">
                Shipment &amp; Bag Parameters
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase">
                  Container Type *
                </label>
                <select
                  name="container_type"
                  value={formData.container_type}
                  onChange={handleChange}
                  className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] font-bold text-[#0C2422] focus:bg-white transition"
                >
                  <option value="20ft">20ft Standard Dry Container (Max ~28 MT)</option>
                  <option value="40ft">40ft Standard Dry Container (Max ~28.5 MT)</option>
                  <option value="40ft_hc">40ft High Cube Container (Max ~28.6 MT)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase">
                  Commodity Category *
                </label>
                <select
                  name="commodity_category"
                  value={formData.commodity_category}
                  onChange={handleChange}
                  className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition text-[#0C2422]"
                >
                  <option value="peanuts">Peanuts &amp; Groundnut Kernels</option>
                  <option value="dairy">Pure Indian Cow &amp; Buffalo Ghee</option>
                  <option value="spices">Whole Spices (Cumin, Coriander, Fennel)</option>
                  <option value="pulses">Chickpeas &amp; Pulses</option>
                  <option value="grains">Grains &amp; Basmati Rice</option>
                  <option value="dehydrated">Dehydrated Onion &amp; Garlic</option>
                  <option value="feed">Animal Feed Meals (Soybean, Rapeseed)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase">
                  Bag Unit Weight (KG) *
                </label>
                <select
                  name="bag_weight_kg"
                  value={formData.bag_weight_kg}
                  onChange={handleChange}
                  className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition text-[#0C2422]"
                >
                  <option value="25">25 Kg Bags</option>
                  <option value="50">50 Kg Bags (Standard Export PP)</option>
                  <option value="1000">1000 Kg Jumbo Big Bags (FIBC)</option>
                </select>
              </div>

              <form onSubmit={handleCustomSubmit} className="pt-3 border-t border-slate-100">
                <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase">
                  Custom Bag Count (Optional Override)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="bag_count"
                    value={formData.bag_count}
                    onChange={handleChange}
                    placeholder="Auto-calculated payload"
                    className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition text-[#0C2422]"
                  />
                  <button
                    type="submit"
                    className="bg-brand-primary hover:bg-brand-primary-dark text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shrink-0 shadow-sm"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Calculation Results */}
          <div className="lg:col-span-7 space-y-6">
            {result && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D4ECE9] shadow-xl space-y-6 text-[#0C2422]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-[10px] font-ui font-bold mb-1 shadow-xs">
                      <span>OPTIMAL CALCULATED PAYLOAD</span>
                    </div>
                    <h3 className="text-2xl font-display font-extrabold text-[#0C2422]">
                      {result.container_name}
                    </h3>
                  </div>
                  <div className="text-left sm:text-right bg-[#E6F7F5] px-4 py-2 rounded-2xl border border-[#BBE5E1]">
                    <span className="text-2xl font-black text-brand-primary font-mono block leading-none">{result.total_bags}</span>
                    <span className="text-[11px] text-[#4D6765] font-mono">Total Bags Loaded</span>
                  </div>
                </div>

                {/* 3 Large KPI Bento Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#D4ECE9] space-y-1">
                    <span className="text-xs text-[#4D6765] font-mono uppercase font-bold">Net Cargo Weight</span>
                    <div className="text-2xl font-black font-mono text-[#0C2422]">
                      {result.net_cargo_mt} <span className="text-xs text-slate-500 font-normal">MT</span>
                    </div>
                    <span className="text-[11px] text-[#4D6765] block">{result.net_cargo_kg?.toLocaleString()} KG</span>
                  </div>

                  <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#D4ECE9] space-y-1">
                    <span className="text-xs text-[#4D6765] font-mono uppercase font-bold">Gross Verified VGM</span>
                    <div className="text-2xl font-black font-mono text-emerald-700">
                      {result.vgm_mt} <span className="text-xs text-emerald-600 font-normal">MT</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block">Includes Tare &amp; Dunnage</span>
                  </div>

                  <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#D4ECE9] space-y-1">
                    <span className="text-xs text-[#4D6765] font-mono uppercase font-bold">Volume Filled</span>
                    <div className="text-2xl font-black font-mono text-brand-primary">
                      {result.volume_utilization_pct || 94}%
                    </div>
                    <span className="text-[11px] text-slate-500 block">Of Total CBM Space</span>
                  </div>
                </div>

                {/* Visual Payload Meter */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-[#0C2422]">Safe Weight Utilization</span>
                    <span className="text-emerald-700">{result.weight_utilization_pct || 96}% of Max Payload</span>
                  </div>
                  <div className="h-3 w-full bg-[#E6F7F5]/50 rounded-full overflow-hidden border border-[#D4ECE9]">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-[#00A79D] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, result.weight_utilization_pct || 96)}%` }}
                    />
                  </div>
                </div>

                {/* Dunnage & Marine Packing Recommendations */}
                <div className="bg-[#F4F9F8] rounded-2xl p-5 border border-[#D4ECE9] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0C2422]">
                    <ShieldCheck className="w-4 h-4 text-brand-primary" />
                    <span>Recommended Maritime Protection:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#4D6765]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{result.desiccant_poles || '8x 1kg'} Calcium Chloride Poles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Multi-Ply Virgin Kraft Paper Lining</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Certified Methyl Bromide Fumigation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>High-Security Customs Bolt Seal</span>
                    </div>
                  </div>
                </div>

                {/* Commercial Action Links */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <span className="text-xs text-[#4D6765]">
                    Ready to book this container stuffing configuration?
                  </span>
                  <Link
                    to={`/rfq?container_type=${formData.container_type}&commodity=${formData.commodity_category}`}
                    className="bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs px-6 py-3 rounded-full transition shadow-sm w-full sm:w-auto text-center"
                  >
                    Inquire on this Configuration
                  </Link>
                </div>
              </div>
            )}
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
              <Anchor className="w-4 h-4 text-[#5EEAD4]" />
              <span>Mixed Commodity FCL Stuffed on Request</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Need Mixed Containers or Palletized Stuffing?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/75 mt-2 font-sans leading-relaxed">
              Agro Dairy accommodates mixed container loads (e.g. 10 MT Peanuts + 9 MT Chickpeas) with heat-treated ISPM-15 wooden pallets and shrink wrapping.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/rfq"
              className="bg-brand-gold hover:bg-amber-400 text-[#002B26] font-ui font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Request Custom Load RFQ
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/15 text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-white/20 transition-all"
            >
              Speak with Port Logistics Lead
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
