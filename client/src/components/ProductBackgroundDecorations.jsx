import React from 'react';

/**
 * Real Photographic Floating Background Commodity Elements
 * High-resolution commercial photography of Agro Dairy Export LLP core commodities:
 * 1. Bold Peanuts (real-peanuts.jpg / shelled-peanuts.jpg)
 * 2. Pure Dairy Ghee (real-ghee.jpg)
 * 3. Grains & Millets (real-grains.jpg / pearl-millet.jpg)
 * 4. Pulses & Chickpeas (real-pulses.jpg / chickpeas.jpg / green-moong.jpg)
 * 5. Yellow Corn (yellow-corn.jpg)
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
    case 'chickpea':
    case 'chickpeas':
    case 'kabuli':
    case 'desi-chana':
    case 'chana':
      return '/images/bg/chickpeas.jpg';
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

/**
 * Hero Floating Commodity Elements
 * Beautiful, prominent floating commodities with ambient glowing halos and soft feathered masks.
 */
export function RealHeroProductElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* 1. Subtle Architectural Dot-Matrix Texture */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#00A79D_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.14]" 
      />

      {/* 2. Soft Atmospheric Ambient Light Blobs */}
      <div className="absolute -top-24 -right-24 w-[520px] h-[520px] bg-gradient-to-br from-[#00A79D]/15 to-emerald-100/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-[460px] h-[460px] bg-gradient-to-tr from-[#F5B800]/15 to-amber-100/30 rounded-full blur-3xl" />

      {/* 3. Floating Golden Wheat & Grains (Top Right) */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-6 lg:right-10 w-64 sm:w-76 lg:w-88 h-64 sm:h-76 lg:h-88 pointer-events-none">
        {/* Soft Golden Ambient Halo */}
        <div className="absolute inset-0 bg-amber-100/50 rounded-full blur-2xl transform scale-90" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-50 sm:opacity-60 lg:opacity-70 transition-opacity"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 45%, rgba(0,0,0,0.65) 68%, transparent 88%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 45%, rgba(0,0,0,0.65) 68%, transparent 88%)'
          }}
        >
          <img 
            src="/images/bg/real-grains.jpg" 
            alt="Golden Indian Wheat and Grains" 
            className="w-full h-full object-contain filter contrast-105"
          />
        </div>
      </div>

      {/* 4. Floating Shelled Peanuts (Bottom Left) */}
      <div className="absolute bottom-3 sm:bottom-6 left-2 sm:left-4 lg:left-8 w-56 sm:w-68 lg:w-80 h-56 sm:h-68 lg:h-80 pointer-events-none">
        {/* Soft Warm Halo */}
        <div className="absolute inset-0 bg-amber-100/40 rounded-full blur-2xl transform scale-90" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-45 sm:opacity-55 lg:opacity-65 transition-opacity"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 45%, rgba(0,0,0,0.65) 68%, transparent 88%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 45%, rgba(0,0,0,0.65) 68%, transparent 88%)'
          }}
        >
          <img 
            src="/images/bg/shelled-peanuts.jpg" 
            alt="Shelled Indian Peanuts" 
            className="w-full h-full object-contain filter contrast-105"
          />
        </div>
      </div>

      {/* 5. Floating Green Moong Beans (Bottom Right) */}
      <div className="absolute bottom-3 sm:bottom-6 right-2 sm:right-4 lg:right-8 w-52 sm:w-64 lg:w-72 h-52 sm:h-64 lg:h-72 pointer-events-none">
        {/* Soft Mint Halo */}
        <div className="absolute inset-0 bg-emerald-100/40 rounded-full blur-2xl transform scale-90" />
        <div 
          className="relative w-full h-full mix-blend-multiply opacity-45 sm:opacity-55 lg:opacity-65 transition-opacity"
          style={{ 
            maskImage: 'radial-gradient(circle at center, black 45%, rgba(0,0,0,0.65) 68%, transparent 88%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 45%, rgba(0,0,0,0.65) 68%, transparent 88%)'
          }}
        >
          <img 
            src="/images/bg/green-moong.jpg" 
            alt="Green Moong Beans" 
            className="w-full h-full object-contain filter contrast-105"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Section Floating Commodity Watermarks
 * Rendered with soft feathered radial masks so the edges fade smoothly into the background,
 * paired with ambient glowing halos and prominent visibility.
 */
export function RealProductSectionFlanks({ 
  type = 'peanuts', 
  leftType = null, 
  rightType = null, 
  position = 'both', 
  opacity = 'opacity-40 sm:opacity-50 lg:opacity-60' 
}) {
  const leftImg = getCommodityImage(leftType || type);
  const rightImg = getCommodityImage(rightType || type);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Left Floating Commodity */}
      {(position === 'both' || position === 'left') && (
        <div className="absolute -left-4 sm:left-2 lg:left-6 top-1/2 -translate-y-1/2 w-60 sm:w-76 lg:w-92 h-60 sm:h-76 lg:h-92 pointer-events-none">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00A79D]/15 to-emerald-100/30 rounded-full blur-2xl transform scale-80" />
          <div 
            className={`relative w-full h-full mix-blend-multiply ${opacity} transition-opacity duration-500`}
            style={{ 
              maskImage: 'radial-gradient(circle at center, black 42%, rgba(0,0,0,0.65) 68%, transparent 88%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 42%, rgba(0,0,0,0.65) 68%, transparent 88%)'
            }}
          >
            <img 
              src={leftImg} 
              alt="Indian Agricultural Export Commodity" 
              className="w-full h-full object-contain filter contrast-105"
            />
          </div>
        </div>
      )}

      {/* Right Floating Commodity */}
      {(position === 'both' || position === 'right') && (
        <div className="absolute -right-4 sm:right-2 lg:right-6 top-1/2 -translate-y-1/2 w-60 sm:w-76 lg:w-92 h-60 sm:h-76 lg:h-92 pointer-events-none">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-bl from-[#F5B800]/15 to-amber-100/30 rounded-full blur-2xl transform scale-80" />
          <div 
            className={`relative w-full h-full mix-blend-multiply ${opacity} transition-opacity duration-500`}
            style={{ 
              maskImage: 'radial-gradient(circle at center, black 42%, rgba(0,0,0,0.65) 68%, transparent 88%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 42%, rgba(0,0,0,0.65) 68%, transparent 88%)'
            }}
          >
            <img 
              src={rightImg} 
              alt="Indian Agricultural Export Commodity" 
              className="w-full h-full object-contain filter contrast-105"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Botanical Vector SVG Motifs
 */
export function WheatStalkSvg({ className = "w-24 h-24 text-brand-primary", opacity = "0.08" }) {
  return (
    <svg 
      viewBox="0 0 100 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      style={{ opacity }}
      aria-hidden="true"
    >
      <path d="M50 115 C50 80 49 40 50 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 10 C46 5 48 0 50 0 C52 0 54 5 50 10" fill="currentColor" />
      <path d="M50 0 L50 -8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M49 25 C40 22 36 14 42 12 C48 10 50 18 49 25 Z" fill="currentColor" />
      <path d="M38 12 Q30 5 22 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M49 42 C38 39 34 31 40 29 C46 27 49 35 49 42 Z" fill="currentColor" />
      <path d="M36 29 Q26 22 18 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M49 59 C38 56 34 48 40 46 C46 44 49 52 49 59 Z" fill="currentColor" />
      <path d="M36 46 Q26 39 16 38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M49 76 C39 73 35 65 41 63 C47 61 50 69 49 76 Z" fill="currentColor" />
      <path d="M37 63 Q28 57 19 55" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M51 25 C60 22 64 14 58 12 C52 10 50 18 51 25 Z" fill="currentColor" />
      <path d="M62 12 Q70 5 78 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M51 42 C62 39 66 31 60 29 C54 27 51 35 51 42 Z" fill="currentColor" />
      <path d="M64 29 Q74 22 82 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M51 59 C62 56 66 48 60 46 C54 44 51 52 51 59 Z" fill="currentColor" />
      <path d="M64 46 Q74 39 84 38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M51 76 C61 73 65 65 59 63 C53 61 50 69 51 76 Z" fill="currentColor" />
      <path d="M63 63 Q72 57 81 55" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function PeanutPodSvg({ className = "w-24 h-24 text-brand-primary", opacity = "0.08" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      style={{ opacity }}
      aria-hidden="true"
    >
      <path 
        d="M28 20 C16 28 12 45 18 58 C22 66 28 69 35 68 C42 67 46 61 50 58 C54 61 58 67 65 68 C72 69 78 66 82 58 C88 45 84 28 72 20 C65 15 58 17 50 24 C42 17 35 15 28 20 Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path d="M28 20 C25 15 20 12 15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M82 58 C86 63 90 65 93 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="32" cy="42" rx="9" ry="14" transform="rotate(-15 32 42)" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <ellipse cx="68" cy="42" rx="9" ry="14" transform="rotate(15 68 42)" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

export function DairyGheeDropletSvg({ className = "w-20 h-20 text-brand-gold", opacity = "0.1" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      style={{ opacity }}
      aria-hidden="true"
    >
      <path 
        d="M50 10 C50 10 24 45 24 64 C24 78 35 90 50 90 C65 90 76 78 76 64 C76 45 50 10 50 10 Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path d="M38 60 C38 50 46 32 50 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="38" cy="68" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function PulseChickpeaPodSvg({ className = "w-24 h-24 text-brand-primary", opacity = "0.08" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      style={{ opacity }}
      aria-hidden="true"
    >
      <path 
        d="M15 45 C25 30 50 25 80 32 C86 33 90 38 88 43 C85 48 80 50 75 52 C50 62 25 58 15 45 Z" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        fill="currentColor"
        fillOpacity="0.08"
      />
      <circle cx="36" cy="43" r="5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
      <circle cx="52" cy="43" r="5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
      <circle cx="68" cy="43" r="5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

// Backward-compat aliases
export const HeroProductDecorations = RealHeroProductElements;
export const SectionProductWatermark = RealProductSectionFlanks;
