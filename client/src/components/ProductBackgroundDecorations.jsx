import React from 'react';

/**
 * Real Photographic & Botanical Background Elements
 * Uses high-resolution commercial photography of Agro Dairy Export LLP's core commodities:
 * 1. Bold Peanuts (real-peanuts.jpg)
 * 2. Pure Dairy Ghee (real-ghee.jpg)
 * 3. Grains & Millets (real-grains.jpg)
 * 4. Pulses & Chickpeas (real-pulses.jpg)
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

export function RealHeroProductElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* 1. Real Golden Wheat Ears & Grain Seeds (Top Right / Far Right margin — frames the visual) */}
      <div 
        className="absolute top-0 right-0 sm:right-2 lg:right-6 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 mix-blend-multiply opacity-25 lg:opacity-35 pointer-events-none transition-all duration-700"
        style={{ 
          animation: 'heroFloat 12s ease-in-out infinite',
          maskImage: 'radial-gradient(circle at 60% 40%, black 30%, rgba(0,0,0,0.4) 55%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 60% 40%, black 30%, rgba(0,0,0,0.4) 55%, transparent 75%)'
        }}
      >
        <img 
          src="/images/bg/real-grains.jpg" 
          alt="Golden Wheat Ears and Grains" 
          className="w-full h-full object-contain filter contrast-105 drop-shadow-sm"
        />
      </div>

      {/* 2. Soft Ambient Pulses & Green Gram in Bottom-Right Corner (contained above bottom border) */}
      <div 
        className="absolute bottom-2 sm:bottom-4 right-2 sm:right-6 lg:right-10 w-52 sm:w-64 lg:w-72 h-52 sm:h-64 lg:h-72 mix-blend-multiply opacity-20 sm:opacity-25 lg:opacity-30 pointer-events-none"
        style={{ 
          animation: 'heroFloat 14s ease-in-out infinite 2s',
          maskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, black 30%, rgba(0,0,0,0.4) 55%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, black 30%, rgba(0,0,0,0.4) 55%, transparent 80%)'
        }}
      >
        <img 
          src="/images/bg/green-moong.jpg" 
          alt="Green Moong Beans" 
          className="w-full h-full object-contain filter contrast-105"
        />
      </div>

      {/* 3. Subtle Shelled Peanuts in Bottom-Left Corner (contained comfortably above bottom border) */}
      <div 
        className="absolute bottom-2 sm:bottom-4 left-1 sm:left-4 lg:left-6 w-48 sm:w-60 lg:w-72 h-48 sm:h-60 lg:h-72 mix-blend-multiply opacity-15 sm:opacity-20 lg:opacity-25 pointer-events-none"
        style={{ 
          animation: 'heroFloat 16s ease-in-out infinite 1s',
          maskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, black 30%, rgba(0,0,0,0.4) 55%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, black 30%, rgba(0,0,0,0.4) 55%, transparent 80%)'
        }}
      >
        <img 
          src="/images/bg/shelled-peanuts.jpg" 
          alt="Shelled Peanuts" 
          className="w-full h-full object-contain filter contrast-105"
        />
      </div>
    </div>
  );
}

/**
 * Real Product Flanks for Section Backgrounds (Catalog, About, Why Us, etc.)
 * Rendered with subtle watermark opacity (0.10 - 0.14) and soft feathered radial mask
 * so it creates a high-end luxury watermark texture without distracting or cutting off harshly.
 */
export function RealProductSectionFlanks({ 
  type = 'all', 
  leftType = null, 
  rightType = null, 
  position = 'both', 
  opacity = 'opacity-[0.09] lg:opacity-[0.14]' 
}) {
  const leftImg = getCommodityImage(leftType || (type === 'all' ? 'pearl-millet' : type));
  const rightImg = getCommodityImage(rightType || (type === 'all' ? 'yellow-corn' : type));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {(position === 'both' || position === 'left') && (
        <div 
          className={`absolute -left-16 sm:-left-20 top-1/2 -translate-y-1/2 w-80 sm:w-[420px] h-80 sm:h-[420px] mix-blend-multiply ${opacity} pointer-events-none`}
          style={{ 
            animation: 'heroFloat 12s ease-in-out infinite',
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)'
          }}
        >
          <img 
            src={leftImg} 
            alt="Export Agricultural Commodity Watermark" 
            className="w-full h-full object-contain filter contrast-105"
          />
        </div>
      )}

      {(position === 'both' || position === 'right') && (
        <div 
          className={`absolute -right-16 sm:-right-20 top-1/2 -translate-y-1/2 w-80 sm:w-[420px] h-80 sm:h-[420px] mix-blend-multiply ${opacity} pointer-events-none`}
          style={{ 
            animation: 'heroFloat 14s ease-in-out infinite 1.5s',
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)'
          }}
        >
          <img 
            src={rightImg} 
            alt="Export Agricultural Commodity Watermark" 
            className="w-full h-full object-contain filter contrast-105"
          />
        </div>
      )}
    </div>
  );
}

/**
 * Botanical Vector SVG Motifs (Optional Complementary Accents)
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
      <path d="M50 115 C50 80 49 40 50 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
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
        strokeWidth="2.5" 
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path d="M28 20 C25 15 20 12 15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M82 58 C86 63 90 65 93 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 35 C32 30 40 38 46 32" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
      <path d="M22 48 C30 46 38 52 46 48" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
      <path d="M54 32 C60 38 68 30 76 35" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
      <path d="M54 48 C62 52 70 46 78 48" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
      <ellipse cx="32" cy="42" rx="9" ry="14" transform="rotate(-15 32 42)" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="68" cy="42" rx="9" ry="14" transform="rotate(15 68 42)" stroke="currentColor" strokeWidth="1.2" />
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
        strokeWidth="2.5" 
        fill="currentColor"
        fillOpacity="0.18"
      />
      <path d="M38 60 C38 50 46 32 50 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="38" cy="68" r="3" fill="currentColor" />
      <path d="M50 4 L50 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 30 L16 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M80 30 L84 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
        strokeWidth="2" 
        fill="currentColor"
        fillOpacity="0.12"
      />
      <circle cx="36" cy="43" r="6" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="52" cy="43" r="6" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="68" cy="43" r="6" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

// Backward-compat aliases
export const HeroProductDecorations = RealHeroProductElements;
export const SectionProductWatermark = RealProductSectionFlanks;
