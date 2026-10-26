import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Eye, ArrowRight, ShieldCheck, X, ChevronLeft, ChevronRight,
  Award, MessageCircle, Layers
} from 'lucide-react';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';
import { useSettings } from '../context/SettingsContext';
import { GALLERY_ITEMS } from '../data/galleryData';

export default function Gallery() {
  const { gallery: liveGallery } = useSettings();
  const [selectedImage, setSelectedImage] = useState(null);

  // Live gallery items synced automatically across sessions without refreshing
  const items = (liveGallery && liveGallery.length > 0) ? liveGallery : GALLERY_ITEMS;

  // Lightbox Navigation
  const currentIndex = selectedImage ? items.findIndex(i => i.id === selectedImage.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedImage(items[currentIndex - 1]);
    } else {
      setSelectedImage(items[items.length - 1]);
    }
  }, [currentIndex, items]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      setSelectedImage(items[currentIndex + 1]);
    } else {
      setSelectedImage(items[0]);
    }
  }, [currentIndex, items]);

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
          HERO BANNER: INFRASTRUCTURE & DISPATCH GALLERY
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-14 pb-16 sm:pt-18 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType="real-pulses" 
          bottomLeftType="pearl-millet"
          ticker="FACILITIES & SORTING • 99.5%+ BUHLER SORTEX • CLIMATE-CONTROLLED WAREHOUSING • MUNDRA & HAZIRA DISPATCHES"
          coordinates={{ lat: 'N 21.17° SURAT', lng: 'E 72.83°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
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
          PHOTO GALLERY GRID (Clean Pure Photos - No Names or Details)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
        
        {/* Total count indicator */}
        <div className="flex items-center justify-between text-xs text-[#4D6765] px-1 font-mono">
          <div className="flex items-center gap-2 font-medium">
            <Layers className="w-4 h-4 text-brand-primary" />
            <span>Operational Photographs ({items.length})</span>
          </div>
        </div>

        {/* Responsive Photo-First Grid (Pure Photos Only) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-[#D4ECE9] shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Pure Photo */}
              <img
                src={item.image}
                alt="Agro Dairy Operations"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/gallery/gallery-01.jpg';
                }}
              />

              {/* Clean hover indicator with preview icon */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm text-brand-primary flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

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

      {/* Lightbox Modal with Next / Prev (Pure Photo View - No Names or Details) */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
        >
          {/* Modal Container */}
          <div 
            onClick={e => e.stopPropagation()}
            className="relative max-w-5xl w-full flex flex-col items-center justify-center"
          >
            {/* Modal Controls Bar */}
            <div className="w-full flex items-center justify-between pb-3 px-1">
              <span className="text-xs sm:text-sm font-mono font-bold text-white/90 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                {currentIndex + 1} / {items.length}
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition border border-white/20 shadow-lg cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Area */}
            <div className="relative w-full bg-black/40 rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center min-h-[50vh] max-h-[75vh] border border-white/10 shadow-2xl">
              <img
                src={selectedImage.image}
                alt="Agro Dairy Operations"
                className="max-h-[75vh] max-w-full w-auto h-auto object-contain select-none rounded-xl"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/60 hover:bg-brand-primary text-white flex items-center justify-center transition shadow-lg border border-white/20 cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/60 hover:bg-brand-primary text-white flex items-center justify-center transition shadow-lg border border-white/20 cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Action Bar (Pure actions, NO name or details text) */}
            <div className="w-full pt-4 flex flex-wrap items-center justify-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <Link
                  to="/rfq"
                  onClick={() => setSelectedImage(null)}
                  className="bg-brand-primary hover:bg-[#008A82] text-white font-ui font-bold text-xs px-5 py-2.5 rounded-full transition flex items-center gap-2 shadow-sm"
                >
                  <span>Request Container Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </Link>
                <a
                  href="https://wa.me/919023363680?text=Hello%20Agro%20Dairy%20Export%20LLP,%20I%20am%20inquiring%20about%20your%20export%20facility%20and%20commodities."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-ui font-bold text-xs px-5 py-2.5 rounded-full transition flex items-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="text-white/60 hover:text-white text-xs font-mono transition cursor-pointer"
              >
                Close (Esc)
              </button>
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
