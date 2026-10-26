import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Eye, ArrowRight, ShieldCheck, Ship, Factory, Leaf, 
  Package, MapPin, CheckCircle2, X, ChevronLeft, ChevronRight,
  Sparkles, FlaskConical, Container, Warehouse, Award, MessageCircle,
  Layers
} from 'lucide-react';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';
import { useSettings } from '../context/SettingsContext';
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from '../data/galleryData';

const INITIAL_PAGE_SIZE = 16;

export default function Gallery() {
  const { gallery: liveGallery } = useSettings();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);

  // Live gallery items synced automatically across sessions without refreshing
  const items = (liveGallery && liveGallery.length > 0) ? liveGallery : GALLERY_ITEMS;

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

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
            {GALLERY_CATEGORIES.map(category => {
              const count = category === 'All'
                ? items.length
                : items.filter(i => i.category === category).length;

              return (
                <button
                  type="button"
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-ui font-bold transition-all shrink-0 flex items-center gap-2 ${
                    activeCategory === category
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'bg-[#F4F9F8] hover:bg-[#E6F7F5] text-slate-700 border border-[#D4ECE9]'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    activeCategory === category
                      ? 'bg-white/20 text-white font-bold'
                      : 'bg-white text-slate-500 border border-slate-200'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Total count indicator */}
        <div className="flex items-center justify-between text-xs text-[#4D6765] px-1 font-mono">
          <div className="flex items-center gap-2 font-medium">
            <Layers className="w-4 h-4 text-brand-primary" />
            <span>Showing {Math.min(visibleCount, filteredItems.length)} of {filteredItems.length} Operational Photographs</span>
          </div>
          {filteredItems.length > visibleCount && (
            <button
              onClick={() => setVisibleCount(filteredItems.length)}
              className="text-brand-primary hover:underline font-bold font-ui"
            >
              Show all ({filteredItems.length})
            </button>
          )}
        </div>

        {/* Responsive Photo-First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-[#D4ECE9] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end"
            >
              {/* Photo */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/gallery/gallery-01.jpg';
                }}
              />

              {/* Gradient Scrim for crisp readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Top Badges */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                <span className="bg-white/95 backdrop-blur-md text-[#0C2422] font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D4ECE9] shadow-xs">
                  {item.category}
                </span>

                <span className="bg-brand-primary/90 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-xs">
                  #{item.id}
                </span>
              </div>

              {/* Bottom Photo Caption */}
              <div className="relative z-10 p-4 space-y-1">
                <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors line-clamp-1 drop-shadow-md">
                  {item.title}
                </h3>
                {item.location && (
                  <div className="flex items-center gap-1.5 text-[11px] text-white/80 font-mono">
                    <MapPin className="w-3 h-3 text-[#F5B800] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                )}
                {item.desc && (
                  <p className="text-[11px] text-slate-300 line-clamp-1 font-sans">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredItems.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + 16, filteredItems.length))}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-primary hover:bg-[#008A82] text-white font-ui font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              <span>Load More Photographs ({filteredItems.length - visibleCount} remaining)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Direct Trade Desk Card */}
        <div className="mt-12 bg-white rounded-3xl p-8 sm:p-10 border border-[#D4ECE9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block font-ui">
              Direct Trade Desk
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0C2422]">
              Require specific container stuffing photos or live lot COA?
            </h3>
            <p className="text-xs sm:text-sm text-[#4D6765] max-w-xl font-sans leading-relaxed">
              We provide pre-dispatch video calls, loading inspections, and SGS test certificates for every commercial container order.
            </p>
          </div>
          <Link
            to="/rfq"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-[#008A82] text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all shrink-0"
          >
            <span>Request Container Quote</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>
      </section>

      {/* Lightbox Modal with Next / Prev */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
        >
          {/* Modal Container */}
          <div 
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl border border-white/20 relative flex flex-col max-h-[92vh]"
          >
            {/* Modal Controls Bar */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {currentIndex + 1} / {filteredItems.length}
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition border border-white/20 shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Area */}
            <div className="relative bg-black/95 flex items-center justify-center min-h-[50vh] max-h-[65vh] overflow-hidden group">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[65vh] max-w-full w-auto h-auto object-contain select-none"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-brand-primary text-white flex items-center justify-center transition shadow-lg border border-white/10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-brand-primary text-white flex items-center justify-center transition shadow-lg border border-white/10"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Bottom Specs Bar inside Image */}
              {selectedImage.specs && (
                <div className="absolute bottom-4 left-4 right-4 hidden sm:flex items-center justify-between text-white text-xs font-mono bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                    <span>{selectedImage.specs}</span>
                  </span>
                  {selectedImage.badge && (
                    <span className="text-white/70">{selectedImage.badge}</span>
                  )}
                </div>
              )}
            </div>

            {/* Modal Info Area */}
            <div className="p-6 bg-white space-y-3 border-t border-slate-100 overflow-y-auto">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-mono font-bold">
                  {selectedImage.category}
                </span>
                {selectedImage.location && (
                  <span className="text-xs text-[#4D6765] flex items-center gap-1 font-medium font-sans">
                    <MapPin className="w-3.5 h-3.5 text-brand-primary" /> {selectedImage.location}
                  </span>
                )}
                <span className="text-xs text-slate-400 font-mono">
                  [Ref: #{selectedImage.id}]
                </span>
              </div>

              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0C2422]">
                {selectedImage.title}
              </h2>

              {selectedImage.desc && (
                <p className="text-xs sm:text-sm text-[#4D6765] leading-relaxed font-sans">
                  {selectedImage.desc}
                </p>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
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
