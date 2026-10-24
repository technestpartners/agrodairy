import React from 'react';

/**
 * Refined, Proper & Minimal Background Compositions for Agro Dairy Export LLP
 * Engineered with tasteful watermark opacity (18% - 28%), feathered radial fading,
 * ambient luminous halos, and subtle architectural trade line geometry.
 * 
 * Eliminates harsh cutout stickers; creates a cohesive, high-end luxury export ambiance.
 */

export function getCommodityImage(type) {
  if (!type) return '/images/bg/shelled-peanuts.jpg';
  if (type.startsWith('/')) return type;

  switch (type.toLowerCase()) {
    case 'shelled-peanuts':
    case 'shelled_peanuts':
    case 'peanut-sack':
      return '/images/bg/shelled-peanuts.jpg';
    case 'pearl-millet':
    case 'pearl_millet':
    case 'bajra':
    case 'millet':
      return '/images/bg/pearl-millet.jpg';
    case 'corn':
    case 'maize':
    case 'yellow-corn':
    case 'yellow_corn':
      return '/images/bg/yellow-corn.jpg';
    case 'green-moong':
    case 'green_moong':
    case 'moong':
      return '/images/bg/green-moong.jpg';
    case 'kabuli':
    case 'kabuli-chickpeas':
      return '/images/products/kabuli-chickpeas.jpg';
    case 'chickpea':
    case 'chickpeas':
    case 'desi-chana':
    case 'desi-chickpeas':
    case 'chana':
      return '/images/products/desi-chickpeas.jpg';
    case 'ghee':
    case 'dairy':
    case 'cow-ghee':
      return '/images/bg/real-ghee.jpg';
    case 'wheat':
    case 'grain':
    case 'grains':
      return '/images/bg/real-grains.jpg';
    case 'pulse':
    case 'pulses':
      return '/images/bg/real-pulses.jpg';
    case 'peanut':
    case 'peanuts':
    default:
      return '/images/bg/real-peanuts.jpg';
  }
}

/* ==========================================================================
   1. HERO SECTION BACKGROUND (Subtle Harvest Atmosphere & Trade Grid)
   ========================================================================== */
export function HeroBgDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Precision Geometric Micro-Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00A79D_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.12]" />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-gradient-to-br from-[#00A79D]/12 via-[#5EEAD4]/08 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[460px] h-[460px] bg-gradient-to-tr from-[#F5B800]/12 via-amber-200/08 to-transparent rounded-full blur-3xl" />

      {/* Top-Right: Golden Wheat Botanical Vignette (Subtle, feathered watermark) */}
      <div className="absolute top-0 right-0 lg:right-6 w-64 sm:w-80 lg:w-92 h-64 sm:h-80 lg:h-92 pointer-events-none">
        {/* Soft Golden Ambient Halo */}
        <div className="absolute inset-8 bg-amber-100/30 rounded-full blur-3xl" />
        {/* Subtle Architectural Orbit Ring */}
        <div className="absolute inset-12 rounded-full border border-amber-300/20" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-24 sm:opacity-28 lg:opacity-32 transform rotate-6"
          style={{ 
            maskImage: 'radial-gradient(circle at 55% 45%, black 28%, rgba(0,0,0,0.5) 55%, transparent 76%)',
            WebkitMaskImage: 'radial-gradient(circle at 55% 45%, black 28%, rgba(0,0,0,0.5) 55%, transparent 76%)'
          }}
        >
          <img src="/images/bg/real-grains.jpg" alt="Indian Wheat Grains" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>

      {/* Bottom-Left: Shelled Peanuts Watermark (Tucked comfortably in margin) */}
      <div className="absolute -bottom-8 -left-8 sm:left-2 lg:left-6 w-56 sm:w-68 lg:w-80 h-56 sm:h-68 lg:h-80 pointer-events-none">
        <div className="absolute inset-8 bg-amber-100/25 rounded-full blur-3xl" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-20 sm:opacity-24 lg:opacity-28 transform -rotate-6"
          style={{ 
            maskImage: 'radial-gradient(circle at 45% 55%, black 28%, rgba(0,0,0,0.5) 55%, transparent 76%)',
            WebkitMaskImage: 'radial-gradient(circle at 45% 55%, black 28%, rgba(0,0,0,0.5) 55%, transparent 76%)'
          }}
        >
          <img src="/images/bg/shelled-peanuts.jpg" alt="Shelled Peanuts" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. ABOUT SECTION BACKGROUND (Maritime Compass & Bold Peanuts Watermark)
   ========================================================================== */
export function AboutBgDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Top-Right: Maritime Compass & Navigation Lines */}
      <div className="absolute -top-12 -right-12 w-88 h-88 opacity-15 hidden lg:block">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-brand-primary">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <text x="100" y="24" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="monospace" fontWeight="bold">N 22.75°</text>
          <text x="180" y="103" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="monospace" fontWeight="bold">E 69.72°</text>
        </svg>
      </div>

      {/* Right Flank: Bold Peanuts Luxury Watermark */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-8 sm:right-2 lg:right-6 w-64 sm:w-76 lg:w-88 h-64 sm:h-76 lg:h-88">
        <div className="absolute inset-8 bg-amber-100/30 rounded-full blur-3xl" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-22 sm:opacity-26 lg:opacity-30"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)'
          }}
        >
          <img src="/images/bg/real-peanuts.jpg" alt="Bold Peanuts" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. CATALOG SECTION BACKGROUND (Diagonal Corn & Chickpeas Watermarks)
   ========================================================================== */
export function CatalogBgDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Top-Left: Yellow Corn Watermark */}
      <div className="absolute -top-12 -left-8 sm:left-2 lg:left-6 w-60 sm:w-72 lg:w-84 h-60 sm:h-72 lg:h-84">
        <div className="absolute inset-8 bg-amber-100/30 rounded-full blur-3xl" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-20 sm:opacity-24 lg:opacity-28 transform -rotate-12"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)'
          }}
        >
          <img src="/images/bg/yellow-corn.jpg" alt="Yellow Corn" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>

      {/* Bottom-Right: Kabuli Chickpeas Watermark */}
      <div className="absolute -bottom-12 -right-8 sm:right-2 lg:right-6 w-60 sm:w-72 lg:w-84 h-60 sm:h-72 lg:h-84">
        <div className="absolute inset-8 bg-amber-100/25 rounded-full blur-3xl" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-20 sm:opacity-24 lg:opacity-28 transform rotate-6"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)'
          }}
        >
          <img src="/images/products/kabuli-chickpeas.jpg" alt="Kabuli Chickpeas" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. WHY CHOOSE US BACKGROUND (Pure Dairy Ghee Aura & Green Moong)
   ========================================================================== */
export function WhyUsBgDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Top-Right: Green Moong Botanical Watermark */}
      <div className="absolute top-2 right-2 sm:right-6 lg:right-10 w-56 sm:w-68 lg:w-80 h-56 sm:h-68 lg:h-80">
        <div className="absolute inset-8 bg-emerald-100/30 rounded-full blur-3xl" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-22 sm:opacity-26 lg:opacity-30"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)'
          }}
        >
          <img src="/images/bg/green-moong.jpg" alt="Green Moong" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>

      {/* Bottom-Left: Golden Pure Cow Ghee with Amber Luminous Aura */}
      <div className="absolute bottom-2 left-2 sm:left-6 lg:left-10 w-60 sm:w-72 lg:w-84 h-60 sm:h-72 lg:h-84">
        <div className="absolute inset-8 bg-gradient-to-tr from-[#F5B800]/18 to-amber-200/30 rounded-full blur-3xl" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-22 sm:opacity-26 lg:opacity-30"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)'
          }}
        >
          <img src="/images/bg/real-ghee.jpg" alt="Pure Cow Ghee" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   5. RFQ & SHIPPING SECTION BACKGROUND (Maritime Trajectory & Chickpeas Watermark)
   ========================================================================== */
export function RfqBgDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Top Left: Subtle Container Route Line */}
      <div className="absolute top-8 left-8 text-xs font-mono tracking-widest text-[#00A79D]/18 hidden lg:block">
        MUNDRA GATEWAY ➔ JEBEL ALI ➔ ROTTERDAM ➔ GLOBAL DISCHARGE
      </div>

      {/* Right Flank: Soft Chickpeas Watermark */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-8 sm:right-2 lg:right-6 w-60 sm:w-72 lg:w-84 h-60 sm:h-72 lg:h-84">
        <div className="absolute inset-8 bg-amber-100/25 rounded-full blur-3xl" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-22 sm:opacity-26 lg:opacity-30"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)'
          }}
        >
          <img src="/images/products/desi-chickpeas.jpg" alt="Desi Chickpeas" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   6. CERTIFICATIONS BACKGROUND (Clean, Architectural & Subtle)
   ========================================================================== */
export function CertificationsBgDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Precision Geometric Micro-Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00A79D_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05]" />

      {/* Soft Ambient Radial Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00A79D]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#F5B800]/5 rounded-full blur-3xl" />
    </div>
  );
}

/* ==========================================================================
   7. FAQ BACKGROUND (Amber Ghee & Shelled Peanuts Vignette)
   ========================================================================== */
export function FaqBgDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Right Flank: Subtle Shelled Peanuts Watermark */}
      <div className="absolute top-1/3 -right-8 sm:right-2 lg:right-6 w-60 sm:w-72 lg:w-84 h-60 sm:h-72 lg:h-84">
        <div className="absolute inset-8 bg-amber-100/25 rounded-full blur-3xl" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-20 sm:opacity-24 lg:opacity-28"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)'
          }}
        >
          <img src="/images/bg/shelled-peanuts.jpg" alt="Shelled Peanuts" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>
    </div>
  );
}

// Botanical Vector SVG Motifs
export function WheatStalkSvg({ className = "w-24 h-24 text-brand-primary", opacity = "0.08" }) {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ opacity }} aria-hidden="true">
      <path d="M50 115 C50 80 49 40 50 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 10 C46 5 48 0 50 0 C52 0 54 5 50 10" fill="currentColor" />
      <path d="M50 0 L50 -8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M49 25 C40 22 36 14 42 12 C48 10 50 18 49 25 Z" fill="currentColor" />
      <path d="M51 25 C60 22 64 14 58 12 C52 10 50 18 51 25 Z" fill="currentColor" />
      <path d="M49 42 C38 39 34 31 40 29 C46 27 49 35 49 42 Z" fill="currentColor" />
      <path d="M51 42 C62 39 66 31 60 29 C54 27 51 35 51 42 Z" fill="currentColor" />
      <path d="M49 59 C38 56 34 48 40 46 C46 44 49 52 49 59 Z" fill="currentColor" />
      <path d="M51 59 C62 56 66 48 60 46 C54 44 51 52 51 59 Z" fill="currentColor" />
    </svg>
  );
}

export function PeanutPodSvg({ className = "w-24 h-24 text-brand-primary", opacity = "0.08" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ opacity }} aria-hidden="true">
      <path d="M28 20 C16 28 12 45 18 58 C22 66 28 69 35 68 C42 67 46 61 50 58 C54 61 58 67 65 68 C72 69 78 66 82 58 C88 45 84 28 72 20 C65 15 58 17 50 24 C42 17 35 15 28 20 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.08" />
    </svg>
  );
}

export function DairyGheeDropletSvg({ className = "w-20 h-20 text-brand-gold", opacity = "0.1" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ opacity }} aria-hidden="true">
      <path d="M50 10 C50 10 24 45 24 64 C24 78 35 90 50 90 C65 90 76 78 76 64 C76 45 50 10 50 10 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

export function PulseChickpeaPodSvg({ className = "w-24 h-24 text-brand-primary", opacity = "0.08" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ opacity }} aria-hidden="true">
      <path d="M15 45 C25 30 50 25 80 32 C86 33 90 38 88 43 C85 48 80 50 75 52 C50 62 25 58 15 45 Z" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.08" />
    </svg>
  );
}

// Backward-compat aliases
export const HeroProductDecorations = HeroBgDecorations;
export const RealHeroProductElements = HeroBgDecorations;
export const RealProductSectionFlanks = ({ leftType, rightType, position = 'both' }) => {
  return <AboutBgDecorations />;
};
export const SectionProductWatermark = RealProductSectionFlanks;

/* ==========================================================================
   8. DEDICATED ABOUT PAGE SECTION-SPECIFIC BACKGROUND DECORATIONS (Architectural & Refined)
   ========================================================================== */

export function AboutHeroDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Precision Geometric Micro-Grid (Home Standard) */}
      <div className="absolute inset-0 bg-[radial-gradient(#00A79D_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-[0.14]" />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-gradient-to-br from-[#00A79D]/14 via-[#5EEAD4]/08 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[460px] h-[460px] bg-gradient-to-tr from-[#F5B800]/14 via-amber-200/08 to-transparent rounded-full blur-3xl" />

      {/* Subtle Maritime Coordinates & Trajectory Ticker */}
      <div className="absolute top-5 left-8 text-[11px] font-mono tracking-widest text-[#00A79D]/25 hidden lg:flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00A79D] animate-ping" />
        <span>SURAT HQ ➔ MUNDRA &amp; HAZIRA SEAPORTS ➔ 30+ GLOBAL DESTINATION HUBS</span>
      </div>

      {/* Top-Right: Maritime Compass & Navigation Circles */}
      <div className="absolute -top-6 right-8 lg:right-20 w-72 sm:w-84 h-72 sm:h-84 opacity-15 hidden lg:block pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-brand-primary">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="currentColor" fontFamily="monospace" fontWeight="bold">N 21.17° SURAT</text>
          <text x="176" y="103" textAnchor="middle" fontSize="7.5" fill="currentColor" fontFamily="monospace" fontWeight="bold">E 72.83°</text>
        </svg>
      </div>

      {/* Top-Right: Golden Wheat / Grains Botanical Vignette */}
      <div className="absolute top-0 right-0 lg:right-6 w-64 sm:w-80 lg:w-92 h-64 sm:h-80 lg:h-92 pointer-events-none">
        <div className="absolute inset-8 bg-amber-100/35 rounded-full blur-3xl" />
        <div className="absolute inset-12 rounded-full border border-amber-300/25" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-24 sm:opacity-28 lg:opacity-32 transform rotate-6"
          style={{ 
            maskImage: 'radial-gradient(circle at 55% 45%, black 28%, rgba(0,0,0,0.5) 55%, transparent 76%)',
            WebkitMaskImage: 'radial-gradient(circle at 55% 45%, black 28%, rgba(0,0,0,0.5) 55%, transparent 76%)'
          }}
        >
          <img src="/images/bg/real-grains.jpg" alt="Indian Wheat Grains" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>

      {/* Bottom-Left: Shelled Saurashtra Peanuts Organic Watermark */}
      <div className="absolute -bottom-8 -left-8 sm:left-2 lg:left-6 w-56 sm:w-68 lg:w-80 h-56 sm:h-68 lg:h-80 pointer-events-none">
        <div className="absolute inset-8 bg-amber-100/25 rounded-full blur-3xl" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-20 sm:opacity-24 lg:opacity-28 transform -rotate-6"
          style={{ 
            maskImage: 'radial-gradient(circle at 45% 55%, black 28%, rgba(0,0,0,0.5) 55%, transparent 76%)',
            WebkitMaskImage: 'radial-gradient(circle at 45% 55%, black 28%, rgba(0,0,0,0.5) 55%, transparent 76%)'
          }}
        >
          <img src="/images/bg/shelled-peanuts.jpg" alt="Shelled Peanuts" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>
    </div>
  );
}

export function AboutStoryDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(#00A79D_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.08]" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#00A79D]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-amber-200/15 rounded-full blur-3xl" />

      {/* Right Flank: Green Moong Botanical Watermark */}
      <div className="absolute top-12 -right-6 sm:right-4 lg:right-10 w-56 sm:w-68 lg:w-80 h-56 sm:h-68 lg:h-80 pointer-events-none">
        <div className="absolute inset-8 bg-emerald-100/30 rounded-full blur-3xl" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-20 sm:opacity-24 lg:opacity-28"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)'
          }}
        >
          <img src="/images/bg/green-moong.jpg" alt="Green Moong" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>
    </div>
  );
}

export function AboutTeamDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(#00A79D_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.08]" />
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#00A79D]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#F5B800]/10 rounded-full blur-3xl" />

      {/* Bottom-Right: Pure Dairy Ghee Luminous Aura Watermark */}
      <div className="absolute -bottom-10 right-2 sm:right-6 lg:right-12 w-60 sm:w-72 lg:w-84 h-60 sm:h-72 lg:h-84 pointer-events-none">
        <div className="absolute inset-8 bg-gradient-to-tr from-[#F5B800]/20 to-amber-200/30 rounded-full blur-3xl" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-22 sm:opacity-26 lg:opacity-30"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)'
          }}
        >
          <img src="/images/bg/real-ghee.jpg" alt="Pure Cow Ghee" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>
    </div>
  );
}

export function AboutExpertiseDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(#003732_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.06]" />
      
      {/* Top Left: Desi Chickpeas Watermark */}
      <div className="absolute top-10 left-4 sm:left-8 lg:left-12 w-56 sm:w-68 h-56 sm:h-68 pointer-events-none">
        <div className="absolute inset-6 bg-amber-100/25 rounded-full blur-2xl" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-18 sm:opacity-22 lg:opacity-25"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)'
          }}
        >
          <img src="/images/products/desi-chickpeas.jpg" alt="Desi Chickpeas" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>
    </div>
  );
}

export function AboutReachDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(#00A79D_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.10]" />

      {/* Top-Right: Maritime Compass & Navigation Lines */}
      <div className="absolute -top-10 -right-10 w-80 h-80 opacity-15 hidden lg:block">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#00A79D]">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <text x="100" y="24" textAnchor="middle" fontSize="7" fill="currentColor" fontFamily="monospace" fontWeight="bold">N 22.75° GUJARAT</text>
        </svg>
      </div>

      {/* Left Flank: Pearl Millet Watermark */}
      <div className="absolute bottom-10 left-6 sm:left-12 w-60 sm:w-72 h-60 sm:h-72 pointer-events-none">
        <div className="absolute inset-8 bg-emerald-100/25 rounded-full blur-3xl" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-20 sm:opacity-24"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, rgba(0,0,0,0.5) 55%, transparent 75%)'
          }}
        >
          <img src="/images/bg/pearl-millet.jpg" alt="Pearl Millet" className="w-full h-full object-contain filter contrast-110" />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   9. UNIVERSAL PAGE HERO BACKGROUND DECORATIONS (Home Page Standard)
   ========================================================================== */
export function PageHeroDecorations({ 
  topRightType = 'real-grains', 
  bottomLeftType = 'shelled-peanuts',
  ticker = 'SURAT HQ ➔ MUNDRA & HAZIRA SEAPORTS ➔ 30+ GLOBAL DESTINATION HUBS',
  coordinates = { lat: 'N 21.17° SURAT', lng: 'E 72.83°' }
}) {
  const topImg = getCommodityImage(topRightType);
  const bottomImg = getCommodityImage(bottomLeftType);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Precision Geometric Micro-Grid (Home Standard) */}
      <div className="absolute inset-0 bg-[radial-gradient(#00A79D_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-[0.14]" />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-gradient-to-br from-[#00A79D]/14 via-[#5EEAD4]/08 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[460px] h-[460px] bg-gradient-to-tr from-[#F5B800]/14 via-amber-200/08 to-transparent rounded-full blur-3xl" />

      {/* Subtle Maritime Coordinates & Trajectory Ticker */}
      {ticker && (
        <div className="absolute top-5 left-8 text-[11px] font-mono tracking-widest text-[#00A79D]/25 hidden lg:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A79D] animate-ping" />
          <span>{ticker}</span>
        </div>
      )}

      {/* Top-Right: Maritime Compass & Navigation Circles */}
      <div className="absolute -top-6 right-8 lg:right-20 w-72 sm:w-84 h-72 sm:h-84 opacity-15 hidden lg:block pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-brand-primary">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="currentColor" fontFamily="monospace" fontWeight="bold">{coordinates.lat}</text>
          <text x="176" y="103" textAnchor="middle" fontSize="7.5" fill="currentColor" fontFamily="monospace" fontWeight="bold">{coordinates.lng}</text>
        </svg>
      </div>

      {/* Top-Right: Botanical Commodity Vignette */}
      {topImg && (
        <div className="absolute top-0 right-0 lg:right-6 w-64 sm:w-80 lg:w-92 h-64 sm:h-80 lg:h-92 pointer-events-none">
          <div className="absolute inset-8 bg-amber-100/35 rounded-full blur-3xl" />
          <div className="absolute inset-12 rounded-full border border-amber-300/25" />
          <div 
            className="relative w-full h-full mix-blend-multiply opacity-24 sm:opacity-28 lg:opacity-32 transform rotate-6"
            style={{ 
              maskImage: 'radial-gradient(circle at 55% 45%, black 28%, rgba(0,0,0,0.5) 55%, transparent 76%)',
              WebkitMaskImage: 'radial-gradient(circle at 55% 45%, black 28%, rgba(0,0,0,0.5) 55%, transparent 76%)'
            }}
          >
            <img src={topImg} alt="Commodity Vignette" className="w-full h-full object-contain filter contrast-110" />
          </div>
        </div>
      )}

      {/* Bottom-Left: Organic Commodity Watermark */}
      {bottomImg && (
        <div className="absolute -bottom-8 -left-8 sm:left-2 lg:left-6 w-56 sm:w-68 lg:w-80 h-56 sm:h-68 lg:h-80 pointer-events-none">
          <div className="absolute inset-8 bg-amber-100/25 rounded-full blur-3xl" />
          <div 
            className="relative w-full h-full mix-blend-multiply opacity-20 sm:opacity-24 lg:opacity-28 transform -rotate-6"
            style={{ 
              maskImage: 'radial-gradient(circle at 45% 55%, black 28%, rgba(0,0,0,0.5) 55%, transparent 76%)',
              WebkitMaskImage: 'radial-gradient(circle at 45% 55%, black 28%, rgba(0,0,0,0.5) 55%, transparent 76%)'
            }}
          >
            <img src={bottomImg} alt="Commodity Watermark" className="w-full h-full object-contain filter contrast-110" />
          </div>
        </div>
      )}
    </div>
  );
}

