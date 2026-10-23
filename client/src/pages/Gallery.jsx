import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Eye, ArrowRight, ShieldCheck, Ship, Factory, Leaf, 
  Package, MapPin, CheckCircle2, X, ChevronRight, Sparkles,
  FlaskConical, Container, Warehouse, Award, MessageCircle
} from 'lucide-react';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';
import { useSettings } from '../context/SettingsContext';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Contract Groundnut & Bold Peanut Harvest',
    category: 'Farm & Sourcing',
    categorySlug: 'farming',
    image: '/images/farm-sourcing.jpg',
    location: 'Saurashtra Farming Belt, Gujarat',
    badge: 'Farmgate Direct',
    specs: 'Counts 38/42 to 70/80 • Sun-Dried Pods',
    desc: 'Primary farmgate procurement directly from vetted farmer collectives across Saurashtra. Pods are pre-sampled for aflatoxin, moisture, and seed size calibration.'
  },
  {
    id: 2,
    title: 'Export Container Vessel Loading at Mundra Port',
    category: 'Port & Shipping',
    categorySlug: 'shipping',
    image: '/images/cargo-ship.jpg',
    location: 'Mundra Port Container Terminal (MICT), Gujarat',
    badge: 'Ocean Freight Dispatch',
    specs: '20ft FCL Consolidation • Direct Mother Berth',
    desc: 'Full Container Load (FCL) export containers loading Agro Dairy commodities destined for Middle East (Jebel Ali, Dammam) and European seaports.'
  },
  {
    id: 3,
    title: 'Automated Buhler Optical Color Sorting Plant',
    category: 'Processing & Sorting',
    categorySlug: 'processing',
    image: '/images/infrastructure.jpg',
    location: 'Sortex Cleaning Hub, Rajkot, Gujarat',
    badge: 'Buhler Sortex Clean',
    specs: 'Purity 99.5%+ • Multi-Camera Optical QC',
    desc: 'High-speed computerized optical color sorting and de-stoning lines removing chalky seeds, discolored grains, and foreign matter to guarantee export purity.'
  },
  {
    id: 4,
    title: 'Multi-Commodity Export Line Quality Showcase',
    category: 'Processing & Sorting',
    categorySlug: 'processing',
    image: '/images/hero-commodities.jpg',
    location: 'Surat Quality Evaluation Facility, Gujarat',
    badge: 'Pre-Shipment Inspection',
    specs: 'COA Certified • Moisture < 12%',
    desc: 'Pre-shipment verification display of bold peanuts, green moong, golden cow & buffalo ghee, white sesame seeds, and chickpeas ready for containerization.'
  },
  {
    id: 5,
    title: 'Climate-Controlled Warehousing & Pallet Staging',
    category: 'Storage & Packaging',
    categorySlug: 'packaging',
    image: '/images/warehouse-pallets.jpg',
    location: 'Central Logistics Staging Warehouse, Gujarat',
    badge: 'FSSAI & APEDA Approved',
    specs: 'Fumigated Pallets • Shrink-Wrapped 25/50kg',
    desc: 'Hygienic climate-controlled warehouse maintaining stable humidity. Shrink-wrapped PP and Jute bags stacked on heat-treated pallets with forklift staging.'
  },
  {
    id: 6,
    title: 'In-House Quality Control & Purity Testing Lab',
    category: 'Testing & Lab',
    categorySlug: 'testing',
    image: '/images/quality-lab.jpg',
    location: 'Analytical Quality Laboratory, Gujarat',
    badge: 'ISO 17025 Standard',
    specs: 'Aflatoxin ELISA • Sieve & Moisture Meters',
    desc: 'Lab technicians running analytical titrations, aflatoxin testing, sieve calibration, and microscopic seed examination with batch test certificates.'
  },
  {
    id: 7,
    title: 'Ocean Container Stuffing & Moisture Barrier Protection',
    category: 'Storage & Packaging',
    categorySlug: 'packaging',
    image: '/images/container-stuffing.jpg',
    location: 'CFS Container Freight Station, Mundra',
    badge: 'Sea-Transit Protection',
    specs: 'Kraft Paper Lined • Industrial Desiccants',
    desc: '20ft ocean container stuffing in progress with corrugated kraft liner paper, heavy cargo netting, and hanging silica dry-bags preventing maritime sweat.'
  },
  {
    id: 8,
    title: 'Hazira Deepwater Container Terminal Dispatches',
    category: 'Port & Shipping',
    categorySlug: 'shipping',
    image: '/images/port-aerial.jpg',
    location: 'Adani Hazira Container Terminal, Surat',
    badge: 'Direct Seaport Access',
    specs: 'Arabian Sea Corridor • Express Feeder Transit',
    desc: 'South Gujarat deepwater maritime container terminal offering direct coastal feeder sailings for expedited transit across the Arabian Sea and Persian Gulf.'
  },
  {
    id: 9,
    title: 'International Agro & Dairy Trade Exposition',
    category: 'Trade & Expo',
    categorySlug: 'trade',
    image: '/images/trade-show.jpg',
    location: 'Gulfood Dubai / World Food Pavilion',
    badge: 'Global Representation',
    specs: 'Direct B2B Buyer Interface • Export Samples',
    desc: 'Agro Dairy leadership showcasing premium Indian oilseeds, pulses, and authentic dairy ghee to international food processors, distributors, and buyers.'
  }
];

const CATEGORIES = [
  { label: 'All', count: 9 },
  { label: 'Farm & Sourcing', count: 1 },
  { label: 'Processing & Sorting', count: 2 },
  { label: 'Storage & Packaging', count: 2 },
  { label: 'Port & Shipping', count: 2 },
  { label: 'Testing & Lab', count: 1 },
  { label: 'Trade & Expo', count: 1 }
];

export default function Gallery() {
  const { gallery: liveGallery } = useSettings();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  // Live gallery items synced automatically across sessions without refreshing
  const items = (liveGallery && liveGallery.length > 0) ? liveGallery : GALLERY_ITEMS;

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      {/* Subtle, minimal background watermark decorations */}
      <RealProductSectionFlanks leftType="shelled-peanuts" rightType="pearl-millet" opacity="opacity-10 lg:opacity-15" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: INFRASTRUCTURE & DISPATCH GALLERY (Clean, Minimal Home Palette)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-14 pb-16 sm:pt-18 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType="real-pulses" 
          bottomLeftType="pearl-millet"
          ticker="FACILITIES & SORTING • 99.5%+ BUHLER SORTEX • CLIMATE-CONTROLLED WAREHOUSING • MUNDRA & HAZIRA DISPATCHES"
          coordinates={{ lat: 'N 21.17° SURAT', lng: 'E 72.83°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation with generous top clearance */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-6 font-mono">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <Link to="/about" className="hover:text-brand-primary transition-colors">Company</Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <span className="text-brand-primary font-bold">Operational Gallery</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <Camera className="w-3.5 h-3.5 text-brand-primary" />
                <span className="tracking-wide">FACILITIES, SORTING &amp; DISPATCHES</span>
                <span className="text-[#4D6765]/40">•</span>
                <span className="text-[#4D6765] font-normal">Ground Reality in Gujarat</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.15] tracking-tight text-[#0C2422]">
                Operational &amp; <span className="text-brand-primary">Infrastructure Gallery</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                Explore our Saurashtra contract farming hubs, Buhler optical color sorting machinery, analytical testing lab, climate-controlled warehousing, and ocean container vessel stuffing at Mundra and Hazira ports.
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
                to="/quality/certifications"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#E6F7F5] text-[#0C2422] font-ui font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-[#D4ECE9] transition-all shadow-xs"
              >
                <Award className="w-4 h-4 text-brand-primary" />
                <span>View Certifications</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          GALLERY CATEGORY TABS & IMAGE GRID (Clean, Minimal Home-Page Aesthetic)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-7 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
        
        {/* Floating Category Filter Dock */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-lg border border-[#D4ECE9]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                type="button"
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-ui font-bold transition-all shrink-0 flex items-center gap-2 ${
                  activeCategory === cat.label
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-[#F4F9F8] hover:bg-[#E6F7F5] text-slate-700 border border-[#D4ECE9]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.label
                    ? 'bg-white/20 text-white font-bold'
                    : 'bg-white text-slate-500 border border-slate-200'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Photo-First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-[#D4ECE9] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Photo Only */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/hero-commodities.jpg';
                }}
              />

              {/* Gradient Scrim for crisp readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="bg-white/95 backdrop-blur-md text-[#0C2422] font-mono text-[10px] font-bold px-3 py-1 rounded-full border border-[#D4ECE9] shadow-xs">
                  {item.category}
                </span>

                <span className="bg-brand-primary/90 backdrop-blur-md text-white text-[11px] font-ui font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 shadow-md">
                  <Eye className="w-3 h-3" />
                  <span>Enlarge</span>
                </span>
              </div>

              {/* Bottom Photo Caption (Title & Location only) */}
              <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-emerald-300 transition-colors line-clamp-1 drop-shadow-md">
                  {item.title}
                </h3>
                {item.location && (
                  <div className="flex items-center gap-1.5 text-xs text-white/80 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          IMAGE PREVIEW MODAL (Full Specifications & Inquire CTA)
          ══════════════════════════════════════════════════════════════════════════ */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl border border-white/20 space-y-0"
          >
            {/* Modal Image View */}
            <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition border border-white/20 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                  <span>{selectedImage.specs}</span>
                </span>
                <span className="hidden sm:inline text-white/70">{selectedImage.badge}</span>
              </div>
            </div>

            {/* Modal Text Details */}
            <div className="p-6 sm:p-8 space-y-4 bg-white">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-brand-primary font-bold">
                <span className="px-3 py-1 rounded-full bg-[#E6F7F5] border border-[#BBE5E1]">
                  {selectedImage.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-[#4D6765] font-sans">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                  {selectedImage.location}
                </span>
              </div>

              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0C2422]">
                {selectedImage.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#4D6765] leading-relaxed font-sans">
                {selectedImage.desc}
              </p>

              {/* Action Buttons */}
              <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    to="/rfq"
                    onClick={() => setSelectedImage(null)}
                    className="w-full sm:w-auto bg-brand-primary hover:bg-[#008A82] text-white font-ui font-bold text-xs px-6 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Inquire for Export Consignment</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                  <a
                    href="https://wa.me/919023363680?text=Hello%20Agro%20Dairy%20Export%20LLP,%20I%20am%20inquiring%20about%20your%20export%20facility%20and%20commodities."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 font-ui font-bold text-xs px-5 py-3.5 rounded-full transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="text-slate-400 hover:text-slate-700 text-xs font-mono"
                >
                  Close Preview (Esc)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════
          BOTTOM CTA (Signature Clean Dark Pine Section matching Home Page)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#021814] via-[#052822] to-[#011310] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[#00A79D]/30 shadow-2xl mt-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5EEAD4] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-[#5EEAD4]" />
              <span>Full Container Load (FCL) &amp; Mixed Consignments</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Visiting Our Surat Headquarters or Gujarat Sorting Plants?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/75 mt-2 font-sans leading-relaxed">
              We welcome international buying delegations, factory auditors, and food processing clients to visit our corporate office in Surat and processing hubs in Saurashtra.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="bg-brand-gold hover:bg-amber-400 text-[#002B26] font-ui font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Schedule Facility Visit
            </Link>
            <Link
              to="/rfq"
              className="bg-white/10 hover:bg-white/15 text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-white/20 transition-all"
            >
              Request Container Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
