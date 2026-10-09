import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, MapPin, Package, ShieldCheck, Scale, FileText, 
  ArrowRight, CheckCircle2, AlertCircle, Share2, Printer
} from 'lucide-react';
import { productsService } from '../services/api';
import CommodityCard from '../components/CommodityCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    productsService.getBySlug(slug)
      .then(res => {
        if (res.success) {
          setProduct(res.data);
          setActiveImage(res.data.main_image);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center">
        <div className="inline-block w-8 h-8 border-4 border-agro-800 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-slate-500">Loading commodity specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-24 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-800">Commodity not found</h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">The requested product could not be found in our export registry.</p>
        <Link to="/products" className="bg-agro-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const mainImageUrl = activeImage
    ? (activeImage.startsWith('http') ? activeImage : `/images/${activeImage}`)
    : '/images/products/bold-peanuts.jpg';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
        <Link to="/" className="hover:text-agro-800">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/products" className="hover:text-agro-800">Commodities</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        {product.category_name && (
          <>
            <Link to={`/products?category=${product.category_slug}`} className="hover:text-agro-800">
              {product.category_name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
          </>
        )}
        <span className="text-slate-900 font-semibold truncate">{product.name}</span>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Images Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-4/3 rounded-3xl bg-slate-100 overflow-hidden border border-slate-200/90 shadow-sm relative">
            <img
              src={mainImageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/about-commodities.jpg';
              }}
            />
            {product.is_featured === 1 && (
              <span className="absolute top-4 left-4 bg-gold-500 text-agro-950 font-bold text-xs px-3 py-1 rounded-full shadow-md">
                Featured Export Grade
              </span>
            )}
          </div>

          {/* Thumbnails if any */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(img.image_path)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                    activeImage === img.image_path ? 'border-agro-700 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.image_path.startsWith('http') ? img.image_path : `/images/${img.image_path}`} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Assurance Box */}
          <div className="bg-agro-50/80 rounded-2xl p-4 border border-agro-100 text-xs text-agro-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-agro-950">
              <ShieldCheck className="w-4 h-4 text-agro-700" />
              Quality & Inspection Assurance
            </div>
            <p className="text-agro-800 leading-relaxed">
              Every shipment is inspected at origin, bagged in food-grade packaging, and issued Phytosanitary & Certificate of Analysis (COA) prior to port loading.
            </p>
          </div>
        </div>

        {/* Details Column */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
                {product.category_name}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-agro-700" />
                {product.origin || 'Gujarat, India'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {product.name}
            </h1>
            {product.grade_variety && (
              <p className="text-sm font-semibold text-agro-800 mt-1">
                Grade / Variety: {product.grade_variety}
              </p>
            )}
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {product.description || product.short_description}
          </p>

          {/* Key Trade Parameters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <div>
              <span className="text-[11px] text-slate-400 block uppercase font-medium">HS Code</span>
              <span className="font-bold text-slate-900 font-mono text-sm">{product.hs_code || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block uppercase font-medium">Min Order (MOQ)</span>
              <span className="font-bold text-slate-900 text-sm">{product.moq} {product.moq_unit || 'MT'}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block uppercase font-medium">Shelf Life</span>
              <span className="font-bold text-slate-900 text-sm">{product.shelf_life || '12 - 24 Months'}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block uppercase font-medium">Storage</span>
              <span className="font-bold text-slate-900 text-sm truncate block">{product.storage_conditions || 'Cool & Dry'}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block uppercase font-medium">Port of Loading</span>
              <span className="font-bold text-slate-900 text-sm">Mundra / Kandla</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block uppercase font-medium">Incoterms</span>
              <span className="font-bold text-slate-900 text-sm">FOB / CIF / CFR</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              to={`/rfq?product_id=${product.id}`}
              className="w-full sm:w-auto flex-1 bg-agro-800 hover:bg-agro-900 text-white font-extrabold text-sm py-4 px-6 rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Request Quote for {product.name}</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>

            <Link
              to={`/tools/container-calculator?category=${product.category_slug || 'peanuts'}`}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm py-4 px-6 rounded-xl transition text-center"
            >
              Calculate Container FCL
            </Link>
          </div>
        </div>
      </div>

      {/* Detailed Technical Specifications Table */}
      {product.groupedSpecifications && Object.keys(product.groupedSpecifications).length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-agro-700 block mb-1">
              Laboratory Certified Parameters
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Technical Specifications & Physical Parameters
            </h2>
          </div>

          <div className="space-y-6">
            {Object.entries(product.groupedSpecifications).map(([group, specs]) => (
              <div key={group} className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-700">
                  {group}
                </div>
                <div className="divide-y divide-slate-100">
                  {specs.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 px-4 py-3 text-xs hover:bg-slate-50/50">
                      <div className="font-semibold text-slate-800">{item.parameter}</div>
                      <div className="font-mono text-slate-700 font-medium">{item.value} {item.unit || ''}</div>
                      <div className="text-slate-400 sm:text-right">{item.test_method || 'Standard Laboratory Test'}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Packaging & Container Loading Summary */}
      {(product.packaging_summary || product.loading_summary) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.packaging_summary && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Package className="w-4 h-4 text-agro-700" />
                Packaging Options
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.packaging_summary}
              </p>
            </div>
          )}

          {product.loading_summary && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Scale className="w-4 h-4 text-gold-600" />
                Container Payload & Stuffing
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.loading_summary}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Related Products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <h3 className="text-2xl font-black text-slate-900">
            Similar Commodities in {product.category_name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map(rel => (
              <CommodityCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
