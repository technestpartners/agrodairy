import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Scale, Package, ShieldCheck } from 'lucide-react';

export default function CommodityCard({ product }) {
  const imageUrl = product.main_image 
    ? (product.main_image.startsWith('http') ? product.main_image : `/images/${product.main_image}`)
    : '/images/products/bold-peanuts.jpg';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-agro-400/60 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image Thumbnail */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/about-commodities.jpg';
          }}
        />
        {product.is_featured === 1 && (
          <span className="absolute top-3 left-3 bg-gold-500/95 backdrop-blur-sm text-agro-950 font-bold text-[11px] px-2.5 py-1 rounded-full shadow-md">
            Prime Export
          </span>
        )}
        <span className="absolute top-3 right-3 bg-agro-900/80 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
          {product.category_name || 'Agro Commodity'}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-agro-600 shrink-0" />
            <span className="truncate">{product.origin || 'Gujarat, India'}</span>
            {product.hs_code && (
              <>
                <span className="text-slate-300">•</span>
                <span className="font-mono text-[11px]">HS: {product.hs_code}</span>
              </>
            )}
          </div>

          <h3 className="font-bold text-lg text-slate-900 group-hover:text-agro-800 transition line-clamp-1 mb-2">
            <Link to={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {product.short_description || 'Certified export grade with certified purity, Sortex-cleaned, and moisture controlled under international standards.'}
          </p>

          {/* Quick Specs Chips */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Min Order (MOQ)</span>
              <span className="font-semibold text-slate-800">{product.moq} {product.moq_unit || 'MT'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Grade / Spec</span>
              <span className="font-semibold text-slate-800 truncate block">{product.grade_variety || 'Export Grade 99%+'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <Link
            to={`/products/${product.slug}`}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 rounded-xl text-center transition"
          >
            Specs & COA
          </Link>
          <Link
            to={`/rfq?product_id=${product.id}`}
            className="flex-1 bg-agro-800 hover:bg-agro-900 text-white font-bold text-xs py-2.5 rounded-xl text-center transition flex items-center justify-center gap-1 shadow-sm"
          >
            Get Quote
            <ArrowRight className="w-3 h-3 text-gold-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
