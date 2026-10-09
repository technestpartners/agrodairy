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
      {/* Hero Section - Elysium Agrico Style */}
      <section className="relative bg-gradient-to-br from-elysium-dark via-elysium-green to-[#0b3f1d] text-white pt-16 pb-28 lg:pt-20 lg:pb-36 overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#7dc242_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-elysium-lime text-xs font-bold uppercase tracking-wider backdrop-blur-sm font-ui">
              <ShieldCheck className="w-4 h-4 text-elysium-lime" />
              <span>Agricultural Products & Dairy Exporter from India</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.18] text-white">
              Origin-Direct <span className="text-elysium-yellow">Peanuts</span>, Grains, Pulses & <span className="text-elysium-lime">Pure Dairy Ghee</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans max-w-2xl">
              Agro Dairy Export LLP, Surat: direct exporter of Bold Peanuts, Green Millet, Sorghum, Maize, Green Moong, Chickpeas, and Pure Cow & Buffalo Ghee. Machine cleaned, Sortex sorted, and shipped in full or mixed containers from Gujarat ports.
            </p>

            {/* Elysium CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/rfq"
                className="bg-elysium-yellow hover:bg-elysium-yellowhover text-slate-900 font-display font-bold text-sm px-8 py-4 rounded-full shadow-lg transition flex items-center gap-2 border border-amber-300"
              >
                <span>Get a Quote</span>
                <span className="font-sans text-base">→</span>
              </Link>

              <Link
                to="/products"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-ui font-semibold text-sm px-7 py-4 rounded-full backdrop-blur-sm transition flex items-center gap-2"
              >
                <span>Browse All Commodities</span>
              </Link>

              <a
                href="https://wa.me/919023363680?text=Hello%20J.P.%20Vora,%20I%20am%20interested%20in%20Agro%20Dairy%20export%20commodities."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-ui font-bold text-xs px-5 py-4 rounded-full transition flex items-center gap-2 shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp: +91 90233 63680</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Negative Margin Floating Strip (The signature Elysium feature!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 lg:-mt-24 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Strip Item 1 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-elysium-tint text-elysium-green flex items-center justify-center shrink-0 font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-elysium-green">Direct Mandi Sourcing</h3>
                <p className="font-display text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Primary procurement from farmer networks in Gujarat & Saurashtra mandis.
                </p>
              </div>
            </div>

            {/* Strip Item 2 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-elysium-tint text-elysium-green flex items-center justify-center shrink-0 font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-elysium-green">Buhler Optical Sortex</h3>
                <p className="font-display text-xs text-slate-600 mt-0.5 leading-relaxed">
                  98-99% Machine & 99% Sortex purity across millets, maize & peanuts.
                </p>
              </div>
            </div>

            {/* Strip Item 3 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-elysium-tint text-elysium-green flex items-center justify-center shrink-0 font-bold">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-elysium-green">Mixed Containers</h3>
                <p className="font-display text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Consolidate grains, pulses, peanuts & dairy ghee in a single 20ft container.
                </p>
              </div>
            </div>

            {/* Strip Item 4 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-elysium-tint text-elysium-green flex items-center justify-center shrink-0 font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-elysium-green">APEDA & FSSAI Certified</h3>
                <p className="font-display text-xs text-slate-600 mt-0.5 leading-relaxed">
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

      {/* Elysium Agrico Style FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="font-ui text-xs font-bold text-elysium-green uppercase tracking-wider block mb-1">
            Questions & Answers
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900">
            Frequently Asked Questions
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
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-display font-bold text-sm text-slate-900 hover:text-elysium-green transition"
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

      {/* Bottom CTA Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-elysium-dark via-elysium-green to-[#0b3f1d] text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-xl space-y-6">
          <h2 className="font-display font-bold text-3xl sm:text-4xl">
            Ready to import Indian Agricultural Commodities or Dairy Ghee?
          </h2>
          <p className="text-slate-200 text-sm max-w-xl mx-auto leading-relaxed">
            Contact J.P. Vora at our export desk today. We provide firm FOB / CIF quotations within 12 hours with complete laboratory grade specifications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/rfq"
              className="w-full sm:w-auto bg-elysium-yellow hover:bg-elysium-yellowhover text-slate-900 font-display font-bold text-sm px-8 py-4 rounded-full shadow-lg transition"
            >
              Get a Quote Now →
            </Link>
            <a
              href="tel:+919023363680"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-ui font-semibold text-sm px-8 py-4 rounded-full border border-white/30 transition flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 90233 63680</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
