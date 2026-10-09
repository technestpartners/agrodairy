import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, ArrowRight, CheckCircle2, Globe2, Anchor, Layers, 
  Calculator, Search, Sparkles, TrendingUp, Award, Clock, FileCheck2,
  ChevronRight, Building2, Truck
} from 'lucide-react';
import { productsService, qualityService, companyService } from '../services/api';
import CommodityCard from '../components/CommodityCard';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [certifications, setCertifications] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [batchCode, setBatchCode] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      productsService.getCategories(),
      productsService.getAll({ featured: 1, limit: 8 }),
      qualityService.getCertifications(),
      companyService.getTestimonials()
    ]).then(([catRes, prodRes, certRes, testRes]) => {
      if (catRes.success) setCategories(catRes.data);
      if (prodRes.success) setFeaturedProducts(prodRes.data);
      if (certRes.success) setCertifications(certRes.data);
      if (testRes.success) setTestimonials(testRes.data);
    }).catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleBatchLookup = (e) => {
    e.preventDefault();
    if (!batchCode.trim()) return;
    navigate(`/quality/traceability?batch=${encodeURIComponent(batchCode.trim())}`);
  };

  const filteredProducts = activeCategory === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(p => p.category_slug === activeCategory);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-agro-950 via-agro-900 to-agro-800 text-white pt-16 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-agro-800/80 border border-agro-700/60 text-gold-300 text-xs font-semibold backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Premier Indian Agricultural & Dairy Export Corporation</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Origin-Direct <span className="text-gold-400">Agricultural</span> & <span className="text-emerald-400">Dairy</span> Commodities
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Processor and containerized exporter of Indian Peanuts, Sesame Seeds, Whole Spices, Chickpeas, Pulses, and Dairy Powders. Direct vessel sailings from Mundra and Kandla Ports with complete QR farm-to-port traceability.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/rfq"
                  className="bg-gold-500 hover:bg-gold-600 text-agro-950 font-extrabold text-sm px-7 py-4 rounded-xl shadow-lg hover:shadow-gold-500/30 transition flex items-center justify-center gap-2 text-center"
                >
                  <span>Request Export Quotation (RFQ)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/products"
                  className="bg-agro-800/80 hover:bg-agro-700/80 text-white border border-agro-700 font-bold text-sm px-6 py-4 rounded-xl backdrop-blur-sm transition flex items-center justify-center gap-2 text-center"
                >
                  <span>Browse 40+ Commodities</span>
                  <ChevronRight className="w-4 h-4 text-gold-400" />
                </Link>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-agro-800/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-gold-400">40+</div>
                  <div className="text-xs text-slate-300 font-medium">Global Markets</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">99.5%</div>
                  <div className="text-xs text-slate-300 font-medium">Sortex Purity</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
                  <div className="text-xs text-slate-300 font-medium">COA Traceable</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">2 Ports</div>
                  <div className="text-xs text-slate-300 font-medium">Mundra & Kandla</div>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Batch & Shipment Verification */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
                <div>
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block mb-1">
                    Traceability Transparency
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Track Agricultural Lot & COA
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Enter the container lot or QR code printed on export packaging to verify origin, moisture, and QA clearance.
                  </p>
                </div>

                <form onSubmit={handleBatchLookup} className="space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={batchCode}
                      onChange={(e) => setBatchCode(e.target.value)}
                      placeholder="e.g. AGRO-PN-2026-0814"
                      className="w-full bg-agro-950/80 border border-agro-700 text-white placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-agro-700 hover:bg-agro-600 text-white font-bold text-sm py-3 rounded-xl transition flex items-center justify-center gap-2 border border-agro-600"
                  >
                    <span>Verify Batch Provenance</span>
                    <ArrowRight className="w-4 h-4 text-gold-400" />
                  </button>
                  <p className="text-[11px] text-slate-400 text-center">
                    Sample batch: <button type="button" onClick={() => setBatchCode('AGRO-PN-2026-0814')} className="text-gold-300 underline font-mono">AGRO-PN-2026-0814</button>
                  </p>
                </form>

                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-time Port of Loading inspection reports</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Aflatoxin & pesticide residue lab certified</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>SGS / Geo-Chem independent surveyor compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-6 sm:p-8">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              International Food Safety & Regulatory Accreditations
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
            {['APEDA', 'FSSAI', 'ISO 22000', 'HACCP', 'HALAL', 'SPICES BOARD'].map((name) => (
              <div key={name} className="flex flex-col items-center gap-1.5 group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-agro-800 font-extrabold text-xs shadow-inner group-hover:scale-105 group-hover:border-agro-400 transition">
                  {name.substring(0, 4)}
                </div>
                <span className="text-xs font-bold text-slate-700">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Commodities Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-agro-700 uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              Direct From Source
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Featured Export Commodities
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Cleaned, graded, and packed at origin facilities in Saurashtra & Gujarat for direct ocean container export.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-agro-800 hover:text-agro-950 font-bold text-sm"
          >
            Explore Complete Catalog ({featuredProducts.length}+ commodities)
            <ArrowRight className="w-4 h-4 text-gold-600" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
              activeCategory === 'all'
                ? 'bg-agro-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Lines
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeCategory === cat.slug
                  ? 'bg-agro-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <CommodityCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Interactive Buyer Tools Teaser */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-600 block mb-1">
              Precision Trade Calculations
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Export Decision Tools for International Importers
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Optimize container payloads, estimate landed destination costs, and sync purchase orders with Indian crop harvests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tool 1 */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-agro-50 text-agro-800 flex items-center justify-center mb-5">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Container Load Calculator
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Estimate bags, tare, gross weight, and volume utilization for 20ft and 40ft FCL containerized marine shipments.
                </p>
              </div>
              <Link
                to="/tools/container-calculator"
                className="inline-flex items-center gap-1.5 text-agro-800 hover:text-agro-950 font-bold text-sm"
              >
                Calculate Container FCL <ArrowRight className="w-4 h-4 text-gold-500" />
              </Link>
            </div>

            {/* Tool 2 */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center mb-5">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Landed Cost Estimator
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Simulate FOB to CIF/CFR conversion including ocean freight from Mundra, marine insurance, and port handling.
                </p>
              </div>
              <Link
                to="/tools/landed-cost-calculator"
                className="inline-flex items-center gap-1.5 text-agro-800 hover:text-agro-950 font-bold text-sm"
              >
                Estimate Landed Cost <ArrowRight className="w-4 h-4 text-gold-500" />
              </Link>
            </div>

            {/* Tool 3 */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-5">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Crop Harvest Calendar
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Check sowing and harvesting cycles for Indian peanuts, sesame, cumin, and coriander to secure optimum export prices.
                </p>
              </div>
              <Link
                to="/tools/crop-calendar"
                className="inline-flex items-center gap-1.5 text-agro-800 hover:text-agro-950 font-bold text-sm"
              >
                View Harvest Calendar <ArrowRight className="w-4 h-4 text-gold-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Farm-to-Port Infrastructure & Quality */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-agro-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                Processing Excellence
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                State-of-the-Art Sortex & Vacuum Packing Facilities
              </h2>
              <p className="text-agro-100 text-sm leading-relaxed">
                Located right inside Gujarat's agricultural corridor, our facilities feature multi-stage pre-cleaners, gravity separators, Buhler optical color sorters, and vacuum packaging lines for sensitive kernels.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-agro-950/60 p-4 rounded-xl border border-agro-800">
                  <span className="font-bold text-white block text-sm mb-1">50 MT / Day</span>
                  <span className="text-slate-300">Color Sortex Capacity</span>
                </div>
                <div className="bg-agro-950/60 p-4 rounded-xl border border-agro-800">
                  <span className="font-bold text-white block text-sm mb-1">280 KM</span>
                  <span className="text-slate-300">Distance to Mundra Port</span>
                </div>
              </div>
              <Link
                to="/company/about"
                className="inline-flex items-center gap-2 text-gold-300 hover:text-gold-200 font-bold text-sm"
              >
                Learn More About Our Infrastructure <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-video sm:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-agro-700/60">
                <img
                  src="/images/infrastructure.jpg"
                  alt="Agro Dairy Processing Facility"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/facility-bg.jpg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buyer Reviews & Testimonials */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-600 block mb-1">
              Global Buyer Confidence
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Trusted by Trade Partners Across 4 Continents
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-gold-500 mb-3">
                    {'★'.repeat(item.rating || 5)}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                    "{item.content}"
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <div className="font-bold text-sm text-slate-900">{item.client_name}</div>
                  <div className="text-xs text-slate-500">{item.company_name} • {item.country}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom RFQ CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-agro-900 to-agro-800 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl border border-agro-700">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Ready to import premium Indian agricultural commodities?
          </h2>
          <p className="text-agro-100 text-sm max-w-xl mx-auto mb-8">
            Contact our export trade desk today. We provide firm FOB / CIF quotations within 12 hours with complete grade specifications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/rfq"
              className="w-full sm:w-auto bg-gold-500 hover:bg-gold-600 text-agro-950 font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg transition"
            >
              Submit Commercial RFQ Now
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-agro-950/60 hover:bg-agro-950 text-white font-bold text-sm px-8 py-4 rounded-xl border border-agro-700 transition"
            >
              Contact Export Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
