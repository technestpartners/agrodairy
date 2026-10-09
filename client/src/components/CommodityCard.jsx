import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Scale, Package, ShieldCheck } from 'lucide-react';

export default function CommodityCard({ product }) {
  const imageUrl = product.main_image 
    ? (product.main_image.startsWith('http') ? product.main_image : `/images/${product.main_image}`)
    : '/images/products/bold-peanuts.jpg';

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-card-hover hover:border-elysium-lime/60 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1.5 relative">
      {/* Image Thumbnail with zoom effect */}
      <div className="relative h-52 sm:h-48 overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/about-commodities.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="bg-elysium-dark/85 backdrop-blur-md text-white font-ui font-semibold text-[11px] px-3 py-1 rounded-full border border-white/10 shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-elysium-lime animate-pulse" />
            {product.category_name || 'Agro Commodity'}
          </span>

          {product.is_featured === 1 && (
            <span className="bg-elysium-yellow text-slate-900 font-display font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md border border-amber-300">
              Prime Export
            </span>
          )}
        </div>

        {/* Origin Pill Bottom of Image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
          <MapPin className="w-3 h-3 text-elysium-lime" />
          <span className="text-[11px] font-medium">{product.origin || 'Gujarat, India'}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
            <span>{product.hs_code ? `HS Code: ${product.hs_code}` : 'Verified Export Standard'}</span>
            <span className="text-elysium-green font-bold font-sans">Sortex 99%+</span>
          </div>

          <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-elysium-green transition-colors line-clamp-1 mb-2">
            <Link to={`/products/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.short_description || 'Certified export quality with purity analysis, Sortex sorting, and controlled moisture under international phytosanitary standards.'}
          </p>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-elysium-tint/60 p-3 rounded-2xl border border-elysium-tintborder/60 mt-3">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Min Order (MOQ)</span>
              <span className="font-bold text-slate-900 font-ui text-sm">{product.moq || 20} {product.moq_unit || 'MT'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Grade / Standard</span>
              <span className="font-bold text-elysium-dark truncate block font-ui text-sm">{product.grade_variety || 'Export Grade'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <Link
            to={`/products/${product.slug}`}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-ui font-semibold text-xs py-2.5 rounded-full text-center transition"
          >
            Specs & COA
          </Link>
          <Link
            to={`/rfq?product_id=${product.id}`}
            className="flex-1 bg-elysium-green hover:bg-elysium-dark text-white font-ui font-bold text-xs py-2.5 rounded-full text-center transition flex items-center justify-center gap-1.5 shadow-sm group/btn"
          >
            <span>Quote</span>
            <ArrowRight className="w-3.5 h-3.5 text-elysium-lime group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
