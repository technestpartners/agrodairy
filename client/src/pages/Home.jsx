import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, ArrowRight, CheckCircle2, Globe2, Anchor, Layers, 
  Calculator, Search, Sparkles, TrendingUp, Award, Clock, FileCheck2,
  ChevronRight, Building2, Truck, Package, Phone, Mail, MapPin, Check
} from 'lucide-react';
import { productsService, qualityService, companyService } from '../services/api';
import CommodityCard from '../components/CommodityCard';

const FAQS = [
  {
    q: "Where is Agro Dairy Export LLP located?",
    a: "Agro Dairy Export LLP is headquartered at Office no. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India. Our agricultural procurement and processing centers are located in the Saurashtra and Gujarat farming belts, with direct export loading through Mundra, Kandla (Deendayal), Pipavav, and Hazira ports on India's west coast."
  },
  {
    q: "What agricultural and dairy products does Agro Dairy export?",
    a: "We export pure Indian Cow Ghee and Buffalo Ghee, Bold Peanut Kernels (in size counts 38/42 to 70/80), Grains & Millets (Green Pearl/Foxtail Millet, Sorghum/Jowar, Yellow & White Maize), Pulses (Green Moong Beans, Moong Mogar split mung, Desi Chickpeas, Kabuli Chickpeas), and Sesame Seeds."
  },
  {
    q: "Can one supplier ship grains, pulses, peanuts, and dairy ghee in a single container from India?",
    a: "Yes. Agro Dairy Export LLP specializes in loading mixed containers. You can combine peanuts, green millet, chickpeas, pulses, and ghee within a single 20 ft or 40 ft HC container. Each product is packed, labeled with your buyer marks, and covered under standard comprehensive export documentation."
  },
  {
    q: "What is the minimum order quantity (MOQ) for export?",
    a: "For full container loads (FCL), typical MOQs are 19 MT for Bold Peanuts, 24-25 MT for Green Millet, Sorghum, and Pulses (20ft FCL), and 1-5 MT for Dairy Ghee. For first-time trial orders or mixed container consolidations, contact our Managing Partner J.P. Vora (+91 90233 63680) to formulate the most practical load."
  },
  {
    q: "Which Incoterms, ports, and payment terms do you work on?",
    a: "We work on FOB (Mundra, Kandla, Hazira), CIF (Cost, Insurance & Freight), and CFR terms to all major global discharge ports (Jebel Ali, Rotterdam, Haiphong, Mersin, Chittagong, etc.). Payment terms typically include Letter of Credit (L/C at sight) and Advance T/T with balance against B/L copy."
  },
  {
    q: "Which certifications and registrations does Agro Dairy hold?",
    a: "Agro Dairy Export LLP holds an Import Export Code (IEC 0817029381), GST Registration (24AAHFA3928L1Z9), APEDA Registration (APEDA/RCMC/2026/0892), and an FSSAI Central License (10722026000148). Every export shipment includes phytosanitary, fumigation, and independent laboratory Certificate of Analysis (COA)."
  },
  {
    q: "Which documents accompany every export shipment?",
    a: "Every shipment includes a Commercial Invoice, Packing List, Clean On-Board Bill of Lading (B/L), Certificate of Origin (COO), Phytosanitary Certificate (Plant Quarantine), Certified Methyl Bromide Fumigation Certificate, and Independent Laboratory Certificate of Analysis (COA)."
  },
  {
    q: "Do you offer private labeling and custom packaging?",
    a: "Yes. We offer 25 kg and 50 kg PP bags, Jute bags, 25 kg vacuum bags for peanuts and pulses, and consumer tins/jars for Cow & Buffalo Ghee printed with your brand logo, barcode, nutrition facts, and shipping marks on request."
  }
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [batchCode, setBatchCode] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      productsService.getCategories(),
      productsService.getAll({ limit: 50 })
    ]).then(([catRes, prodRes]) => {
      if (catRes.success) setCategories(catRes.data);
      if (prodRes.success) setProducts(prodRes.data);
    }).catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleBatchLookup = (e) => {
    e.preventDefault();
    if (!batchCode.trim()) return;
    navigate(`/quality/traceability?batch=${encodeURIComponent(batchCode.trim())}`);
  };

  const filteredProducts = activeCategory === 'all' 
    ? products.slice(0, 8) 
    : products.filter(p => p.category_slug === activeCategory);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Section - Elysium Agrico Style with Animated Glow & Luxury Typography */}
      <section className="relative mesh-agro-pattern text-white pt-16 pb-28 lg:pt-24 lg:pb-36 overflow-hidden">
        {/* Animated Radial Glow Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-elysium-lime/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-elysium-yellow/15 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-elysium-lime text-xs font-bold uppercase tracking-wider backdrop-blur-md font-ui shadow-sm animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-elysium-lime animate-ping" />
                <ShieldCheck className="w-4 h-4 text-elysium-lime" />
                <span>Govt. Registered Exporter • Surat, Gujarat</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.15] text-white animate-fade-in-up">
                Origin-Direct <span className="text-elysium-yellow drop-shadow-sm">Peanuts</span>, Grains, Pulses & <span className="text-elysium-lime drop-shadow-sm">Pure Dairy Ghee</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans max-w-2xl animate-fade-in-up delay-100">
                <strong>Agro Dairy Export LLP:</strong> Processor and international merchant exporter of Bold Peanuts, Green Millet, Sorghum, Yellow Maize, Green Moong, Desi Chickpeas, and Pure Cow & Buffalo Ghee. Direct container loading from Hazira, Mundra, and Kandla ports.
              </p>

              {/* Elysium Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 animate-fade-in-up delay-200">
                <Link
                  to="/rfq"
                  className="bg-elysium-yellow hover:bg-elysium-yellowhover text-slate-900 font-display font-bold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-glow-yellow transition-all duration-300 flex items-center gap-2 border border-amber-300 active:scale-95 group"
                >
                  <span>Get a Quote</span>
                  <span className="font-sans text-base group-hover:translate-x-1 transition-transform">→</span>
                </Link>

                <Link
                  to="/products"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-ui font-semibold text-sm px-7 py-4 rounded-full backdrop-blur-md transition-all duration-300 flex items-center gap-2 hover:border-white active:scale-95"
                >
                  <span>Browse Catalog</span>
                </Link>

                <a
                  href="https://wa.me/919023363680?text=Hello%20J.P.%20Vora,%20I%20am%20interested%20in%20Agro%20Dairy%20export%20commodities."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-ui font-bold text-xs sm:text-sm px-6 py-4 rounded-full transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-emerald-500/30 active:scale-95"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>WhatsApp Trade Desk</span>
                </a>
              </div>

              {/* Quick Trust Credentials Ticker */}
              <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 font-ui">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-elysium-lime" />
                  <span>IEC: 0817029381</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-elysium-lime" />
                  <span>FSSAI: 10722026000148</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-elysium-lime" />
                  <span>APEDA RCMC Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-elysium-lime" />
                  <span>Port Direct: Hazira & Mundra</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Highlights Card */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white space-y-4 shadow-2xl relative overflow-hidden animate-float">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-elysium-lime/20 rounded-full blur-2xl" />
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-ui font-bold text-xs uppercase tracking-wider text-elysium-yellow">Containerized Ocean FCL</span>
                  <span className="text-[10px] bg-elysium-lime/20 text-elysium-lime px-2 py-0.5 rounded-full font-bold">20ft / 40ft HC</span>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="font-bold text-slate-200">Green Millet / Sorghum:</span>
                    <span className="font-mono text-elysium-yellow font-bold">24–25 MT (20ft)</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="font-bold text-slate-200">Bold Peanuts (Counts):</span>
                    <span className="font-mono text-elysium-yellow font-bold">19 MT (20ft) / 27 MT (40ft)</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="font-bold text-slate-200">Pure Dairy Ghee:</span>
                    <span className="font-mono text-elysium-yellow font-bold">16–18 MT (Food Grade)</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="font-bold text-slate-200">Moong & Chickpeas:</span>
                    <span className="font-mono text-elysium-yellow font-bold">25 MT (20ft) / 27 MT (40ft)</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-300 leading-snug">
                  ✨ Custom mixed containers available with individual lot quarantine certificates.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Negative Margin Floating Strip (The signature Elysium feature!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 lg:-mt-24 relative z-20">
        <div className="bg-white rounded-3xl shadow-soft-xl border border-slate-200/90 p-6 sm:p-8 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Strip Item 1 */}
            <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-elysium-tint/50 transition-colors duration-200">
              <div className="w-12 h-12 rounded-2xl bg-elysium-tint text-elysium-green flex items-center justify-center shrink-0 font-bold shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-elysium-green">Direct Mandi Sourcing</h3>
                <p className="font-sans text-xs text-slate-600 mt-1 leading-relaxed">
                  Primary procurement from farmer networks in Gujarat & Saurashtra mandis.
                </p>
              </div>
            </div>

            {/* Strip Item 2 */}
            <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-elysium-tint/50 transition-colors duration-200">
              <div className="w-12 h-12 rounded-2xl bg-elysium-tint text-elysium-green flex items-center justify-center shrink-0 font-bold shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-elysium-green">Buhler Optical Sortex</h3>
                <p className="font-sans text-xs text-slate-600 mt-1 leading-relaxed">
                  98-99% Machine & 99% Sortex purity across millets, maize & peanuts.
                </p>
              </div>
            </div>

            {/* Strip Item 3 */}
            <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-elysium-tint/50 transition-colors duration-200">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 font-bold shadow-sm">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-amber-900">Mixed Containers</h3>
                <p className="font-sans text-xs text-slate-600 mt-1 leading-relaxed">
                  Consolidate grains, pulses, peanuts & dairy ghee in a single 20ft container.
                </p>
              </div>
            </div>

            {/* Strip Item 4 */}
            <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-elysium-tint/50 transition-colors duration-200">
              <div className="w-12 h-12 rounded-2xl bg-elysium-tint text-elysium-green flex items-center justify-center shrink-0 font-bold shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-elysium-green">APEDA & FSSAI Certified</h3>
                <p className="font-sans text-xs text-slate-600 mt-1 leading-relaxed">
                  IEC: 0817029381 • Full Phytosanitary, Fumigation & COA with every B/L.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Mixed Containers Section (Elysium Replication) */}
      <section id="mixed-containers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-elysium-cream rounded-3xl p-8 sm:p-12 border border-amber-200/60 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <span className="font-ui text-xs font-bold uppercase tracking-wider text-elysium-orange block">
              Flexible Shipping Solutions
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
              Can one supplier ship Grains, Pulses, Peanuts and Dairy Ghee in a single container from India?
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              <strong>Yes. Agro Dairy Export LLP loads mixed containers.</strong> For example, you can order 5 MT of Bold Peanuts, 8 MT of Green Millet, 6 MT of Green Moong, and 2 MT of Desi Cow Ghee in a single 20 ft container. 
              Each commodity is packaged separately in 25 kg or 50 kg bags (or food-grade tins for ghee), marked with your brand name, and covered under standard export documentation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="bg-white p-4 rounded-xl border border-amber-200 text-xs">
                <span className="font-bold text-slate-900 block mb-1">Separate Palletization</span>
                <span className="text-slate-600">Individual product lots clearly segregated & moisture-protected.</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-amber-200 text-xs">
                <span className="font-bold text-slate-900 block mb-1">Buyer Private Label</span>
                <span className="text-slate-600">Custom bags, marks & retail packing available on request.</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-amber-200 text-xs">
                <span className="font-bold text-slate-900 block mb-1">Single Bill of Lading</span>
                <span className="text-slate-600">One comprehensive Phyto, Fumigation & COA covering all lines.</span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                to="/rfq?mixed_container=true"
                className="inline-flex items-center gap-2 bg-elysium-green hover:bg-elysium-dark text-white font-ui font-bold text-xs px-6 py-3 rounded-full transition shadow-md"
              >
                <span>Request a Mixed Container Quotation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Commodities Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-ui text-xs font-bold text-elysium-green uppercase tracking-wider block mb-1">
              Direct From Gujarat Mandis
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Export Commodities Catalog
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Cleaned, graded, and packed at source facilities in Gujarat for direct containerized ocean export through Mundra & Kandla.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-elysium-green hover:text-elysium-dark font-display font-bold text-sm"
          >
            <span>View All Products</span>
            <span className="font-sans">→</span>
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-ui font-bold transition shrink-0 ${
              activeCategory === 'all'
                ? 'bg-elysium-green text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-xs font-ui font-bold transition shrink-0 ${
                activeCategory === cat.slug
                  ? 'bg-elysium-green text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <CommodityCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Detailed Technical Specifications Table (Showcasing user's document specs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="font-ui text-xs font-bold text-elysium-green uppercase tracking-wider block mb-1">
              Exact Export Specifications
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
              Technical Parameters & Container Load Capacities
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Direct specifications from our processing plant for Grains, Peanuts, Pulses, and Dairy Ghee.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-elysium-tint text-elysium-green font-ui font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Commodity</th>
                  <th className="py-3 px-4">Type / Variety</th>
                  <th className="py-3 px-4">Purity</th>
                  <th className="py-3 px-4">Moisture</th>
                  <th className="py-3 px-4">Foreign Matter</th>
                  <th className="py-3 px-4">Packing</th>
                  <th className="py-3 px-4">20ft FCL Load</th>
                  <th className="py-3 px-4">40ft HC Load</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Green Millet (Bajra)</td>
                  <td className="py-3.5 px-4 text-slate-600">Pearl Millet, Foxtail Millet</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">98-99% Machine, 99% Sortex</td>
                  <td className="py-3.5 px-4 text-slate-700">11% Max</td>
                  <td className="py-3.5 px-4 text-slate-700">0.25% Max</td>
                  <td className="py-3.5 px-4 text-slate-600">25kg / 50kg PP/Jute</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">24 - 25 MT</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">26 MT</td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Sorghum (Jowar)</td>
                  <td className="py-3.5 px-4 text-slate-600">White Sorghum</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">98-99% Machine, 99% Sortex</td>
                  <td className="py-3.5 px-4 text-slate-700">11% Max</td>
                  <td className="py-3.5 px-4 text-slate-700">0.25% Max</td>
                  <td className="py-3.5 px-4 text-slate-600">25kg / 50kg PP/Jute</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">24 - 25 MT</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">26 MT</td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Maize (Corn)</td>
                  <td className="py-3.5 px-4 text-slate-600">Yellow Maize, White Maize</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">98-99% Machine, 99% Sortex</td>
                  <td className="py-3.5 px-4 text-slate-700">11% Max</td>
                  <td className="py-3.5 px-4 text-slate-700">0.25% Max</td>
                  <td className="py-3.5 px-4 text-slate-600">25kg / 50kg PP bags</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">24 MT</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">26 MT</td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Bold Peanut Kernels</td>
                  <td className="py-3.5 px-4 text-slate-600">Counts: 38/42, 40/50, 50/60, 60/70, 70/80</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">Sortex Clean</td>
                  <td className="py-3.5 px-4 text-slate-700">7% to 8% Max</td>
                  <td className="py-3.5 px-4 text-slate-700">0.5% Max</td>
                  <td className="py-3.5 px-4 text-slate-600">25kg/50kg PP/Jute, 25kg vacuum</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">19 MT</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">27 MT</td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Green Moong Beans</td>
                  <td className="py-3.5 px-4 text-slate-600">180-200 to 260-270 counts</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">98 - 99.9%</td>
                  <td className="py-3.5 px-4 text-slate-700">12% Max</td>
                  <td className="py-3.5 px-4 text-slate-700">0.5% Max</td>
                  <td className="py-3.5 px-4 text-slate-600">25kg / 50kg PP/Jute</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">25 MT</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">27 MT</td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Moong Mogar (Split Mung)</td>
                  <td className="py-3.5 px-4 text-slate-600">Huskless Split (Yellow)</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">98 - 98.99%</td>
                  <td className="py-3.5 px-4 text-slate-700">12% Max</td>
                  <td className="py-3.5 px-4 text-slate-700">0.5% Max</td>
                  <td className="py-3.5 px-4 text-slate-600">25kg / 50kg PP/Jute</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">25 MT</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">27 MT</td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Desi Chickpeas</td>
                  <td className="py-3.5 px-4 text-slate-600">5-7mm / 6-8mm (Brown)</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">98 - 99%</td>
                  <td className="py-3.5 px-4 text-slate-700">12% Max</td>
                  <td className="py-3.5 px-4 text-slate-700">0.5% Max</td>
                  <td className="py-3.5 px-4 text-slate-600">25kg / 50kg PP/Jute</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">25 MT</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">27 MT</td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Kabuli Chickpea</td>
                  <td className="py-3.5 px-4 text-slate-600">Count 38/40 to 75/80 (Cream)</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">99% Sortex Clean</td>
                  <td className="py-3.5 px-4 text-slate-700">12% Max</td>
                  <td className="py-3.5 px-4 text-slate-700">0.5% Max</td>
                  <td className="py-3.5 px-4 text-slate-600">25kg / 50kg PP/Jute</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">25 MT</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">27 MT</td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Pure Cow & Buffalo Ghee</td>
                  <td className="py-3.5 px-4 text-slate-600">Granular Milk Fat</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">99.7% - 99.8% Milk Fat</td>
                  <td className="py-3.5 px-4 text-slate-700">0.3% Max</td>
                  <td className="py-3.5 px-4 text-slate-700">Nil / Zero Starch</td>
                  <td className="py-3.5 px-4 text-slate-600">15kg Tins / Jars / Drums</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">16 - 18 MT</td>
                  <td className="py-3.5 px-4 font-bold text-elysium-dark">24 - 26 MT</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Why Importers Choose Agro Dairy */}
      <section className="bg-[#edf2f7]/60 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-serif text-xs font-bold uppercase tracking-wider text-elysium-green block mb-1">
              Why Choose Us
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Why Importers Choose Agro Dairy Export LLP
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              When you compare agricultural products exporters from India, you are checking quality, reliability and paperwork. Here is what you get with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-elysium-tint flex items-center justify-center text-elysium-green mb-6">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-xl text-slate-900 mb-3">Strict Quality Control</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Each lot is cleaned, machine sorted, and Buhler optical Sortex graded. Every bag is checked for moisture, seed count, and foreign matter before stuffing, with third-party SGS or Geo-Chem lab reports on request.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-bold text-elysium-green">
                <Check className="w-4 h-4" /> Purity 98-99.9% Sortex Clean
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 mb-6">
                  <Package className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-xl text-slate-900 mb-3">One Container, Many Products</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Order a mixed container with peanuts, millets, moong beans, and dairy ghee to match your exact sales volume, keep stocks fresh and test new product lines without committing to multiple full container loads.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-bold text-amber-700">
                <Check className="w-4 h-4" /> Customized FCL Allocations
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-elysium-tint flex items-center justify-center text-elysium-green mb-6">
                  <FileCheck2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-xl text-slate-900 mb-3">Export Documents Handled</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every consignment ships with clean B/L, Commercial Invoice, Packing List, Phytosanitary Certificate, Fumigation Certificate, and Certificate of Origin (COO) prepared to your destination port’s customs rules.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-bold text-elysium-green">
                <Check className="w-4 h-4" /> 100% Customs Clearance Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Export Track Record in Numbers (Green Band) */}
      <section className="bg-[#13612e] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#b5e08a] text-xs font-serif font-bold uppercase tracking-wider block mb-1">
              Our Track Record
            </span>
            <h2 className="text-3xl font-serif font-bold text-white">Our Export Record in Numbers</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <span className="font-sans text-4xl sm:text-5xl font-extrabold text-white block">10+</span>
              <span className="text-xs text-[#cfe3d2] mt-2 block font-ui">Years Agronomic Experience</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <span className="font-sans text-4xl sm:text-5xl font-extrabold text-white block">40+</span>
              <span className="text-xs text-[#cfe3d2] mt-2 block font-ui">Countries Served</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <span className="font-sans text-4xl sm:text-5xl font-extrabold text-white block">150+</span>
              <span className="text-xs text-[#cfe3d2] mt-2 block font-ui">Institutional Buyers</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <span className="font-sans text-4xl sm:text-5xl font-extrabold text-white block">1,800+</span>
              <span className="text-xs text-[#cfe3d2] mt-2 block font-ui">Container FCL Dispatches</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm col-span-2 lg:col-span-1">
              <span className="font-sans text-4xl sm:text-5xl font-extrabold text-white block">50,000+</span>
              <span className="text-xs text-[#cfe3d2] mt-2 block font-ui">Metric Tonnes Shipped</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: How We Work - Four Steps */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="font-serif text-xs font-bold uppercase tracking-wider text-elysium-green block mb-1">
              How We Work
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900">
              From Farm to Your Port in Four Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="text-center space-y-4">
              <span className="font-serif font-black text-3xl text-elysium-green block">01</span>
              <div className="w-16 h-16 mx-auto rounded-full border-2 border-elysium-green flex items-center justify-center text-elysium-green font-bold text-xl bg-white shadow-sm">
                🌱
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Sourcing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We agree your grade, count and quantity, then buy matching lots from trusted farmer networks and mandis across Gujarat.
              </p>
            </div>

            <div className="text-center space-y-4">
              <span className="font-serif font-black text-3xl text-elysium-green block">02</span>
              <div className="w-16 h-16 mx-auto rounded-full border-2 border-elysium-green flex items-center justify-center text-elysium-green font-bold text-xl bg-white shadow-sm">
                ⚙️
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Processing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lots are de-stoned, cleaned, Sortex sorted, and lab-tested for moisture, aflatoxin, and foreign matter to your market’s limits.
              </p>
            </div>

            <div className="text-center space-y-4">
              <span className="font-serif font-black text-3xl text-elysium-green block">03</span>
              <div className="w-16 h-16 mx-auto rounded-full border-2 border-elysium-green flex items-center justify-center text-elysium-green font-bold text-xl bg-white shadow-sm">
                📦
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Packaging</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Packed in 25 kg/50 kg PP or jute bags, vacuum packs, or food tins, then containerized and professionally fumigated.
              </p>
            </div>

            <div className="text-center space-y-4">
              <span className="font-serif font-black text-3xl text-elysium-green block">04</span>
              <div className="w-16 h-16 mx-auto rounded-full border-2 border-elysium-green flex items-center justify-center text-elysium-green font-bold text-xl bg-white shadow-sm">
                🚢
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We book the container vessel, issue the original B/L and export documents, and share live maritime tracking until destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Shipping from Gujarat's Ports to Yours & Tools */}
      <section className="bg-elysium-cream py-20 border-y border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-serif text-xs font-bold uppercase tracking-wider text-elysium-green block mb-1">
              Shipping & Logistics
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900">
              Shipping From Gujarat's Ports to Yours
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              Surat is connected to Hazira Port, Mundra, and Kandla. We route your cargo through the terminal offering the best ocean transit time and freight economics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <Anchor className="w-6 h-6 text-elysium-green mb-3" />
              <h3 className="font-serif font-bold text-base text-slate-900 mb-1">Ports</h3>
              <p className="text-xs text-slate-600">Hazira, Mundra, Kandla (Deendayal) and Pipavav.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <FileCheck2 className="w-6 h-6 text-elysium-green mb-3" />
              <h3 className="font-serif font-bold text-base text-slate-900 mb-1">Incoterms</h3>
              <p className="text-xs text-slate-600">FOB (Gujarat Ports), CFR, and CIF (Discharge Port).</p>
            </div>

            <Link to="/tools/container-calculator" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
              <Layers className="w-6 h-6 text-elysium-green mb-3" />
              <h3 className="font-serif font-bold text-base text-slate-900 mb-1">Container Calculator</h3>
              <p className="text-xs text-slate-600 mb-2">Estimate 20ft / 40ft HC stuffing payload for grains, millets & ghee.</p>
              <span className="text-xs font-bold text-elysium-green group-hover:underline">Open Tool →</span>
            </Link>

            <Link to="/tools/landed-cost-calculator" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
              <Calculator className="w-6 h-6 text-elysium-green mb-3" />
              <h3 className="font-serif font-bold text-base text-slate-900 mb-1">Landed Cost Estimator</h3>
              <p className="text-xs text-slate-600 mb-2">FOB, ocean freight, insurance, and duty breakdown simulator.</p>
              <span className="text-xs font-bold text-elysium-green group-hover:underline">Open Tool →</span>
            </Link>

            <Link to="/tools/hs-code-finder" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
              <Search className="w-6 h-6 text-elysium-green mb-3" />
              <h3 className="font-serif font-bold text-base text-slate-900 mb-1">HS Code Finder</h3>
              <p className="text-xs text-slate-600 mb-2">Check 8-digit ITC-HS codes and export policies for Indian agri lines.</p>
              <span className="text-xs font-bold text-elysium-green group-hover:underline">Open Tool →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 11: Free Consultation / Talk to Our Export Desk Form */}
      <section id="consultation" className="bg-elysium-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-serif text-xs font-bold uppercase tracking-wider text-elysium-green block mb-1">
                  Free Consultation
                </span>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900">
                  Talk to Our Export Desk Before You Order
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Tell us the product, specification, quantity, and destination port. We will suggest the right grade and packing, check whether a mixed container suits your order, and send you a firm FOB / CIF quote. There is no cost and no obligation.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-elysium-green shrink-0 mt-0.5" />
                  <span>Grade, purity, and count advice for your target destination</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-elysium-green shrink-0 mt-0.5" />
                  <span>Container stuffing loading plan for single or mixed commodities</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-elysium-green shrink-0 mt-0.5" />
                  <span>FOB Mundra/Hazira or CIF discharge port price quote</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-elysium-green shrink-0 mt-0.5" />
                  <span>Technical laboratory specification sheet and buyer packaging options</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-amber-200 text-xs text-slate-700">
                <strong>Direct Desk Contact:</strong> J.P. Vora · Phone / WhatsApp: <a href="tel:+919023363680" className="text-elysium-green font-bold">+91 90233 63680</a>
              </div>
            </div>

            {/* Consultation Lead Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
              <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">Request Commercial Export Quote</h3>
              <p className="text-xs text-slate-500 mb-6">Our trade managers will respond with binding container rates within 12 hours.</p>

              <form onSubmit={handleBatchLookup} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-elysium-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Global Agri Foods Ltd"
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-elysium-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="buyer@company.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-elysium-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="text"
                      required
                      placeholder="+1 / +971 / +44..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-elysium-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Commodity Required *</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-elysium-green">
                      <option>Pure Cow & Buffalo Ghee</option>
                      <option>Bold Peanut Kernels (38/42 to 70/80)</option>
                      <option>Green Millet (Bajra)</option>
                      <option>Sorghum (White / Yellow Jowar)</option>
                      <option>Yellow / White Maize</option>
                      <option>Green Moong & Moong Mogar</option>
                      <option>Desi & Kabuli Chickpeas</option>
                      <option>Mixed Container Consolidation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Destination Port *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jebel Ali / Rotterdam / Mersin"
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-elysium-green"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Order Details & Specifications</label>
                  <textarea
                    rows="3"
                    placeholder="Specify tonnage (e.g. 1x20ft FCL), packing type (25kg PP / 50kg Jute / Tins), or target delivery timeline..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs focus:outline-none focus:ring-2 focus:ring-elysium-green"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-elysium-yellow hover:bg-elysium-yellowhover text-slate-900 font-serif font-bold text-sm py-4 rounded-full shadow-md transition duration-200 border border-amber-300"
                >
                  Send Commercial RFQ to Export Desk →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Official Credentials Banner ("Verify Agro Dairy") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-elysium-tint border border-elysium-tintborder rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="font-ui text-xs font-bold uppercase tracking-wider text-elysium-green block mb-1">
              Commercial Verification
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
              Verify Agro Dairy Export LLP
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Government registrations, tax identifiers, and official headquarters in Gujarat.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">IEC Registration</span>
              <span className="font-mono font-bold text-slate-900 text-sm">0817029381</span>
              <span className="text-[10px] text-slate-500 block mt-1">DGFT, Govt. of India</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">GSTIN Number</span>
              <span className="font-mono font-bold text-slate-900 text-sm">24AAHFA3928L1Z9</span>
              <span className="text-[10px] text-slate-500 block mt-1">State of Gujarat</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">APEDA RCMC No.</span>
              <span className="font-mono font-bold text-slate-900 text-sm">APEDA/RCMC/2026/0892</span>
              <span className="text-[10px] text-slate-500 block mt-1">Ministry of Commerce</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">FSSAI Central License</span>
              <span className="font-mono font-bold text-slate-900 text-sm">10722026000148</span>
              <span className="text-[10px] text-slate-500 block mt-1">Food Safety Authority</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-elysium-green shrink-0" />
              <span><strong>Head Office:</strong> Office no. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-elysium-dark">
              <Phone className="w-4 h-4 text-elysium-green shrink-0" />
              <span>Contact: J.P. Vora (+91 90233 63680)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Elysium Agrico Style FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="font-serif text-xs font-bold text-elysium-green uppercase tracking-wider block mb-1">
            Questions & Answers
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Key answers on export orders, mixed containers, packaging, and shipping terms.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-serif font-bold text-sm text-slate-900 hover:text-elysium-green transition"
                >
                  <span>{faq.q}</span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-sans font-bold text-slate-500 shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Export Banner Bottom Bar exactly like Elysium Agrico */}
      <section className="bg-gradient-to-r from-[#f4e6cc] via-[#fbf6ec] to-[#f4e6cc] py-10 px-4 text-center border-t border-amber-200/50">
        <div className="max-w-4xl mx-auto space-y-3">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
            Premium Agricultural & Dairy Exports Worldwide
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-ui">
            Pure Ghee · Green Millet · Sorghum · Yellow Maize · Bold Peanuts · Green Moong · Moong Mogar · Desi Chickpeas · Kabuli Chickpeas
          </p>
          <div className="pt-2">
            <Link
              to="/rfq"
              className="inline-flex items-center gap-2 bg-[#ffc928] hover:bg-[#f5b800] text-slate-900 font-serif font-bold text-xs px-6 py-3 rounded-full shadow-md transition"
            >
              <span>Request Container Quote (RFQ)</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
