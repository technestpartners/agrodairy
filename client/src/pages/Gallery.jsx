import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Eye, ArrowRight, ShieldCheck, Ship, Factory, Leaf, 
  Package, MapPin, CheckCircle2, X
} from 'lucide-react';
import { 
  WheatStalkSvg, 
  PeanutPodSvg, 
  DairyGheeDropletSvg,
  RealProductSectionFlanks 
} from '../components/ProductBackgroundDecorations';

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
    category: 'Global Trade',
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
    <div className="bg-[#F4F9F8] min-h-screen">
      {/* Header Banner */}
      <section className="bg-brand-deep text-white py-16 relative overflow-hidden bg-agro-decor-deep border-b border-brand-primary/20">
        <div className="absolute -left-10 top-0 pointer-events-none transform -rotate-12">
          <WheatStalkSvg className="w-56 h-56 text-brand-primary" opacity="0.08" />
        </div>
        <div className="absolute -right-8 bottom-0 pointer-events-none transform rotate-12">
          <PeanutPodSvg className="w-48 h-48 text-brand-gold" opacity="0.10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-brand-gold font-ui font-bold text-xs uppercase tracking-widest block mb-2">
            Visual Export Showcase
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Our Export Operations Gallery
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-sans">
            Explore our end-to-end export chain — from primary farm sourcing across Gujarat and Buhler Sortex grading to port container stuffing at Mundra and Hazira.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Real photographic commodity background flanks */}
        <RealProductSectionFlanks leftType="yellow-corn" rightType="green-moong" opacity="opacity-25 lg:opacity-35" />
        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-ui font-bold transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-white text-brand-muted hover:bg-brand-accent hover:text-brand-text border border-brand-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-border shadow-sm hover:shadow-card-premium transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white font-ui font-semibold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Eye className="w-3.5 h-3.5" /> Click to view
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-brand-deep/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                  {item.category}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-brand-primary font-ui font-medium">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <h3 className="font-display font-bold text-sm text-brand-text group-hover:text-brand-primary transition-colors line-clamp-1 mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-muted line-clamp-2 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-brand-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block font-ui">
              Direct Trade Desk
            </span>
            <h3 className="font-display font-bold text-2xl text-brand-text">
              Require specific container stuffing photos or live lot COA?
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted max-w-xl">
              We provide pre-dispatch video calls, loading inspections, and SGS test certificates for every commercial container order.
            </p>
          </div>
          <Link
            to="/rfq"
            className="btn-primary shrink-0"
          >
            <span>Request Container Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-white/20 relative animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative max-h-[60vh] overflow-hidden bg-slate-900">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-brand-accent text-brand-primary text-xs font-bold px-3 py-1 rounded-full">
                  {selectedImage.category}
                </span>
                <span className="text-xs text-brand-muted flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-primary" /> {selectedImage.location}
                </span>
              </div>
              <h2 className="font-display font-bold text-xl text-brand-text">
                {selectedImage.title}
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                {selectedImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
