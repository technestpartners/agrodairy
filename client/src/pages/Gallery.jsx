import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Eye, ArrowRight, ShieldCheck, Ship, Factory, Leaf, 
  Package, MapPin, CheckCircle2, X, ChevronRight, Sparkles
} from 'lucide-react';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Gujarat Groundnut & Bold Peanut Harvest',
    category: 'Farm & Harvest',
    image: '/images/farm-sourcing.jpg',
    location: 'Saurashtra Farming Belt, Gujarat',
    desc: 'Primary procurement directly from farmer clusters across Saurashtra. Sun-dried pods graded for count and size.'
  },
  {
    id: 2,
    title: 'Export Container Vessel at Mundra Port',
    category: 'Port & Shipping',
    image: '/images/cargo-ship.jpg',
    location: 'Mundra Port Container Terminal, Gujarat',
    desc: 'FCL export container vessel loading Agro Dairy commodities destined for Middle East (Jebel Ali) and European ports.'
  },
  {
    id: 3,
    title: 'Multi-Commodity Export Line Showcase',
    category: 'Processing & Products',
    image: '/images/hero-commodities.jpg',
    location: 'Surat Processing & Quality Lab',
    desc: 'Sorted bold peanuts, green moong beans, golden cow ghee, white maize, and chickpeas ready for container consolidation.'
  },
  {
    id: 4,
    title: 'Hazira Container Port Aerial Terminal Dispatch',
    category: 'Port & Shipping',
    image: '/images/port-aerial.jpg',
    location: 'Hazira Port, Surat, Gujarat',
    desc: 'Direct coastal loading point for quick transit times across the Arabian Sea, Persian Gulf, and African ports.'
  },
  {
    id: 5,
    title: 'Automated Buhler Optical Sortex Cleaning',
    category: 'Processing & Products',
    image: '/images/infrastructure.jpg',
    location: 'Sortex Cleaning Facility, Gujarat',
    desc: 'High-speed optical camera sorting ensuring 99%+ Sortex purity, removing discolored seeds, stones, and foreign matter.'
  },
  {
    id: 6,
    title: 'State-of-the-Art Processing Facility',
    category: 'Processing & Products',
    image: '/images/facility-bg.jpg',
    location: 'Processing Hub, Gujarat',
    desc: 'Climate-controlled warehouse and automated packaging facility complying with FSSAI, APEDA, and ISO 22000 standards.'
  },
  {
    id: 7,
    title: 'Export Packaging & Certified Palletization',
    category: 'Packaging & Warehouse',
    image: '/images/about-commodities.jpg',
    location: 'Agro Dairy Logistics Warehouse',
    desc: '25 kg and 50 kg PP / Jute bags and vacuum packaging labeled with customized buyer export marks and barcodes.'
  },
  {
    id: 8,
    title: 'International Agro & Dairy Trade Expo',
    category: 'Farm & Harvest',
    image: '/images/trade-show.jpg',
    location: 'Gulfood Dubai / World Food India',
    desc: 'Agro Dairy Export LLP team connecting with global commodity importers, food processors, and supermarket distributors.'
  }
];

const CATEGORIES = ['All', 'Farm & Harvest', 'Processing & Products', 'Packaging & Warehouse', 'Port & Shipping'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      <RealProductSectionFlanks leftType="shelled-peanuts" rightType="pearl-millet" opacity="opacity-20 lg:opacity-25" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: INFRASTRUCTURE & DISPATCH GALLERY (Clean, Minimal Home Palette)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType="shelled-peanuts" 
          bottomLeftType="pearl-millet"
          ticker="FACILITIES & SORTING • 99.5%+ SORTEX CLEANING • CLIMATE-CONTROLLED WAREHOUSING • MUNDRA & HAZIRA STUFFING"
          coordinates={{ lat: 'N 21.17° SURAT', lng: 'E 72.83°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-5 font-mono">
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

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Operational &amp; <span className="text-brand-primary">Infrastructure Gallery</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                Explore our Saurashtra contract farming hubs, Buhler optical color sorting machinery, climate-controlled warehouses, and ocean container vessel stuffing at Mundra and Hazira ports.
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
                to="/certifications"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#E6F7F5] text-[#0C2422] font-ui font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-[#D4ECE9] transition-all shadow-xs"
              >
                <span>View Certifications</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          GALLERY CATEGORY TABS & IMAGE GRID (Clean Home-Page Cards)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Category Pills Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-[#D4ECE9]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {CATEGORIES.map(category => (
              <button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-ui font-bold transition-all shrink-0 ${
                  activeCategory === category
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-[#F4F9F8] hover:bg-[#E6F7F5] text-slate-700 border border-[#D4ECE9]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#D4ECE9] shadow-sm hover:shadow-md hover:border-brand-primary/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/hero-commodities.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-mono font-bold flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Full Photograph</span>
                  </span>
                </div>
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-[#0C2422] font-mono text-[10px] font-bold px-3 py-1 rounded-full border border-[#D4ECE9] shadow-xs">
                  {item.category}
                </div>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-sm text-[#0C2422] group-hover:text-brand-primary transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4D6765] mt-1 leading-relaxed line-clamp-2 font-sans">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <MapPin className="w-3 h-3 text-brand-primary shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          IMAGE PREVIEW MODAL
          ══════════════════════════════════════════════════════════════════════════ */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-white/20 space-y-0"
          >
            <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-3 bg-white">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-primary font-bold">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1]">
                  {selectedImage.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#4D6765] font-sans">
                  <MapPin className="w-3 h-3 text-brand-primary" />
                  {selectedImage.location}
                </span>
              </div>

              <h2 className="font-display font-extrabold text-2xl text-[#0C2422]">
                {selectedImage.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#4D6765] leading-relaxed font-sans">
                {selectedImage.desc}
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <Link
                  to="/rfq"
                  onClick={() => setSelectedImage(null)}
                  className="bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs px-5 py-3 rounded-full transition flex items-center gap-2 shadow-sm"
                >
                  <span>Inquire for Related Export Consignment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="text-slate-400 hover:text-slate-700 text-xs font-mono"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════
          BOTTOM CTA (Signature Clean Dark Pine Section)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#021814] via-[#052822] to-[#011310] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[#00A79D]/30 shadow-2xl mt-12">
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
