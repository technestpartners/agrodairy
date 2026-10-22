import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Eye, ArrowRight, ShieldCheck, Ship, Factory, Leaf, 
  Package, MapPin, CheckCircle2, X, ChevronLeft, ChevronRight,
  Maximize2, Grid, Layers
} from 'lucide-react';
import { 
  WheatStalkSvg, 
  PeanutPodSvg, 
  DairyGheeDropletSvg,
  RealProductSectionFlanks 
} from '../components/ProductBackgroundDecorations';
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from '../data/galleryData';

const INITIAL_PAGE_SIZE = 16;

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  // Reset pagination when category changes
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_PAGE_SIZE);
  };

  // Lightbox Navigation
  const currentIndex = selectedImage ? filteredItems.findIndex(i => i.id === selectedImage.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedImage(filteredItems[currentIndex - 1]);
    } else {
      setSelectedImage(filteredItems[filteredItems.length - 1]);
    }
  }, [currentIndex, filteredItems]);

  const handleNext = useCallback(() => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentIndex + 1]);
    } else {
      setSelectedImage(filteredItems[0]);
    }
  }, [currentIndex, filteredItems]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handlePrev, handleNext]);

  return (
    <div className="bg-[#F4F9F8] min-h-screen">
      {/* Header Banner */}
      <section className="bg-brand-deep text-white py-16 sm:py-20 relative overflow-hidden bg-agro-decor-deep border-b border-brand-primary/20">
        <div className="absolute -left-10 top-0 pointer-events-none transform -rotate-12">
          <WheatStalkSvg className="w-56 h-56 text-brand-primary" opacity="0.08" />
        </div>
        <div className="absolute -right-8 bottom-0 pointer-events-none transform rotate-12">
          <PeanutPodSvg className="w-48 h-48 text-brand-gold" opacity="0.10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-gold font-mono font-bold text-xs uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>On-Site Visual Export Operations • 60 Live Photos</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Our Export Operations Gallery
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-sans">
            Real photographic documentation from our Gujarat agricultural hubs — container stuffing, moisture-proof barrier lining, sample verification, and port dispatch across Mundra and Hazira.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Photographic commodity background flanks */}
        <RealProductSectionFlanks leftType="yellow-corn" rightType="green-moong" opacity="opacity-25 lg:opacity-35" />

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap mb-10">
          {GALLERY_CATEGORIES.map(category => {
            const count = category === 'All'
              ? GALLERY_ITEMS.length
              : GALLERY_ITEMS.filter(item => item.category === category).length;

            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-ui font-bold transition-all duration-200 flex items-center gap-2 ${
                  activeCategory === category
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-white text-brand-muted hover:bg-brand-accent hover:text-brand-text border border-brand-border'
                }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeCategory === category ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Total count indicator */}
        <div className="flex items-center justify-between text-xs text-brand-muted mb-6 px-1">
          <div className="flex items-center gap-1.5 font-medium">
            <Layers className="w-4 h-4 text-brand-primary" />
            <span>Showing {Math.min(visibleCount, filteredItems.length)} of {filteredItems.length} Photographs</span>
          </div>
          {filteredItems.length > visibleCount && (
            <button
              onClick={() => setVisibleCount(filteredItems.length)}
              className="text-brand-primary hover:underline font-bold"
            >
              Show all ({filteredItems.length})
            </button>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.slice(0, visibleCount).map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-border shadow-sm hover:shadow-card-premium transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1"
            >
              <div className="relative h-60 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white font-ui font-semibold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Eye className="w-3.5 h-3.5" /> Full Photo
                  </span>
                  <span className="text-[11px] font-mono text-white/80">#{item.id}</span>
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

        {/* Load More Button */}
        {filteredItems.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + 16, filteredItems.length))}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-primary hover:bg-brand-deep text-white font-ui font-bold text-sm shadow-md transition-all"
            >
              <span>Load More Photographs ({filteredItems.length - visibleCount} remaining)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

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

      {/* Lightbox Modal with Next / Prev */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          {/* Modal Container */}
          <div 
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl border border-white/20 relative animate-fade-in flex flex-col max-h-[92vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Controls Bar */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full">
                {currentIndex + 1} / {filteredItems.length}
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/85 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Area */}
            <div className="relative bg-black/95 flex items-center justify-center min-h-[50vh] max-h-[68vh] overflow-hidden group">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[68vh] max-w-full w-auto h-auto object-contain select-none"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-brand-primary text-white flex items-center justify-center transition shadow-lg"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-brand-primary text-white flex items-center justify-center transition shadow-lg"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Info Area */}
            <div className="p-6 bg-white space-y-2 border-t border-slate-100">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-brand-accent text-brand-primary text-xs font-bold px-3 py-1 rounded-full">
                  {selectedImage.category}
                </span>
                <span className="text-xs text-brand-muted flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary" /> {selectedImage.location}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  [Ref: {selectedImage.image.split('/').pop()}]
                </span>
              </div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-brand-text">
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
