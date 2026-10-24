import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { WheatStalkSvg, PeanutPodSvg, DairyGheeDropletSvg, PulseChickpeaPodSvg } from './ProductBackgroundDecorations';

export function getProductFallback(product) {
  const slug = (product?.slug || product?.name || '').toLowerCase();
  const category = (product?.category_name || product?.category_slug || '').toLowerCase();

  if (slug.includes('white-sesame') || slug.includes('natural-white')) {
    return '/images/products/natural-white-sesame-seeds.jpg';
  }
  if (slug.includes('hulled-sesame')) {
    return '/images/products/hulled-sesame-seeds.jpg';
  }
  if (slug.includes('black-sesame')) {
    return '/images/products/black-sesame-seeds.jpg';
  }
  if (slug.includes('sesame') || category.includes('sesame')) {
    return '/images/products/natural-white-sesame-seeds.jpg';
  }
  if (slug.includes('cumin') || slug.includes('jeera')) {
    return '/images/products/cumin-seeds.jpg';
  }
  if (slug.includes('coriander') || slug.includes('dhania')) {
    return '/images/products/coriander-seeds.jpg';
  }
  if (slug.includes('fennel') || slug.includes('variyali') || slug.includes('saunf')) {
    return '/images/products/fennel-seeds.jpg';
  }
  if (slug.includes('turmeric') || slug.includes('haldi')) {
    return '/images/products/turmeric-fingers.jpg';
  }
  if (category.includes('spice') || slug.includes('spice')) {
    return '/images/products/cumin-seeds.jpg';
  }
  if (slug.includes('onion')) {
    return '/images/products/dehydrated-white-onion-flakes.jpg';
  }
  if (slug.includes('garlic')) {
    return '/images/products/dehydrated-garlic-flakes-powder.jpg';
  }
  if (category.includes('dehydrated') || category.includes('vegetable')) {
    return '/images/products/dehydrated-white-onion-flakes.jpg';
  }
  if (slug.includes('soybean') || slug.includes('feed') || category.includes('feed')) {
    return '/images/products/soybean-meal-hi-pro.jpg';
  }
  if (slug.includes('butter')) {
    return '/images/products/natural-peanut-butter.jpg';
  }
  if (slug.includes('blanched')) {
    return '/images/products/blanched-peanuts.jpg';
  }
  if (slug.includes('java')) {
    return '/images/products/java-peanuts.jpg';
  }
  if (slug.includes('buffalo')) {
    return '/images/products/buffalo-ghee.jpg';
  }
  if (slug.includes('ghee') || category.includes('ghee') || category.includes('dairy')) {
    return '/images/bg/real-ghee.jpg';
  }
  if (slug.includes('millet') || slug.includes('bajra')) {
    return '/images/bg/pearl-millet.jpg';
  }
  if (slug.includes('maize') || slug.includes('corn')) {
    return '/images/bg/yellow-corn.jpg';
  }
  if (slug.includes('mogar') || slug.includes('split-mung') || slug.includes('dhuli') || slug.includes('huskless')) {
    return '/images/products/moong-mogar.jpg';
  }
  if (slug.includes('moong') || slug.includes('mung')) {
    return '/images/products/green-moong-beans.jpg';
  }
  const name = (product?.name || '').toLowerCase();
  if (slug.includes('desi') || name.includes('desi') || slug.includes('bengal') || slug.includes('kala-chana')) {
    return '/images/products/desi-chickpeas.jpg';
  }
  if (slug.includes('kabuli') || name.includes('kabuli') || slug.includes('chickpea') || slug.includes('chana') || category.includes('chickpea') || slug.includes('garbanzo')) {
    return '/images/products/kabuli-chickpeas.jpg';
  }
  if (slug.includes('sorghum') || slug.includes('jowar') || slug.includes('wheat') || category.includes('grain')) {
    return '/images/bg/real-grains.jpg';
  }
  if (category.includes('pulses') || category.includes('lentil')) {
    return '/images/products/green-moong-beans.jpg';
  }
  return '/images/products/bold-peanuts.jpg';
}

export function getProductImage(product) {
  if (product?.main_image && product.main_image.trim() && !product.main_image.includes('hero-commodities')) {
    return product.main_image.startsWith('http') || product.main_image.startsWith('/')
      ? product.main_image
      : `/images/${product.main_image}`;
  }

  return getProductFallback(product);
}

export default function CommodityCard({ product }) {
  const imageUrl = getProductImage(product);

  return (
    <div className="product-card group relative">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-brand-cream">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getProductFallback(product);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="bg-brand-deep/85 backdrop-blur-md text-white font-ui font-semibold text-[11px] px-3 py-1 rounded-full border border-white/15 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            {product.category_name || 'Agro Commodity'}
          </span>
          {product.is_featured === 1 && (
            <span className="bg-brand-gold text-brand-deep font-display font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Prime
            </span>
          )}
        </div>

        {/* Origin */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/90 bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-full">
          <MapPin className="w-3 h-3 text-brand-gold" />
          <span className="text-[11px]">{product.origin || 'Gujarat, India'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-brand-muted font-mono mb-1">
            <span>{product.hs_code ? `HS: ${product.hs_code}` : 'Export Grade'}</span>
            <span className="text-brand-primary font-bold font-sans">Sortex 99%+</span>
          </div>

          <h3 className="font-display font-bold text-base text-brand-text group-hover:text-brand-primary transition-colors line-clamp-1 mb-1.5">
            <Link to={`/products/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
            {product.short_description || 'Certified export quality with purity analysis, Sortex sorting, and controlled moisture under international phytosanitary standards.'}
          </p>

          {/* Quick Specs with Subtle Commodity Watermark */}
          <div className="relative overflow-hidden grid grid-cols-2 gap-2 text-xs bg-brand-accent/50 p-3 rounded-xl border border-brand-border/70 mt-3">
            <div className="absolute -right-2 -bottom-2 pointer-events-none">
              {(product.category_slug === 'peanuts' || product.category_name?.toLowerCase().includes('peanut')) && (
                <PeanutPodSvg className="w-14 h-14 text-brand-primary" opacity="0.15" />
              )}
              {(product.category_slug === 'dairy-ghee' || product.category_name?.toLowerCase().includes('ghee')) && (
                <DairyGheeDropletSvg className="w-14 h-14 text-brand-gold" opacity="0.22" />
              )}
              {(product.category_slug === 'grains' || product.category_name?.toLowerCase().includes('grain') || product.category_name?.toLowerCase().includes('millet')) && (
                <WheatStalkSvg className="w-14 h-14 text-brand-primary" opacity="0.15" />
              )}
              {(product.category_slug === 'pulses' || product.category_name?.toLowerCase().includes('pulse') || product.category_name?.toLowerCase().includes('chickpea')) && (
                <PulseChickpeaPodSvg className="w-14 h-14 text-brand-primary" opacity="0.15" />
              )}
            </div>
            <div className="relative z-10">
              <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider block">MOQ</span>
              <span className="font-bold text-brand-text font-ui text-sm">{product.moq || 20} {product.moq_unit || 'MT'}</span>
            </div>
            <div className="relative z-10">
              <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider block">Grade</span>
              <span className="font-bold text-brand-text truncate block font-ui text-sm">{product.grade_variety || 'Export Grade'}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-brand-border">
          <Link
            to={`/products/${product.slug}`}
            className="flex-1 bg-brand-accent hover:bg-brand-accent/80 text-brand-primary font-ui font-semibold text-xs py-2.5 rounded-full text-center transition"
          >
            Specs & COA
          </Link>
          <Link
            to={`/rfq?product_id=${product.id}`}
            className="flex-1 bg-brand-primary hover:bg-brand-deep text-white font-ui font-bold text-xs py-2.5 rounded-full text-center transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>Quote</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
