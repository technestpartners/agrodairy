import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, MapPin, Package, ShieldCheck, Scale, FileText, 
  ArrowRight, CheckCircle2, AlertCircle, Share2, Printer,
  Sparkles, Anchor, Award, Clock, Truck, MessageSquare
} from 'lucide-react';
import { productsService } from '../services/api';
import CommodityCard, { getProductFallback, getProductImage } from '../components/CommodityCard';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

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
      <div className="py-32 text-center bg-[#FAFCFB] min-h-screen">
        <div className="inline-block w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-[#4D6765]">Retrieving commodity technical dossier...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-28 text-center px-4 bg-[#FAFCFB]">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-[#0C2422]">Commodity not found</h2>
        <p className="text-xs text-[#4D6765] mt-1 mb-6">The requested product could not be located in our active export catalog.</p>
        <Link to="/products" className="bg-brand-primary hover:bg-brand-primary-dark text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition">
          Return to Commodity Catalog
        </Link>
      </div>
    );
  }

  const mainImageUrl = activeImage
    ? (activeImage.startsWith('http') || activeImage.startsWith('/') ? activeImage : `/${activeImage}`)
    : getProductFallback(product);

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      <RealProductSectionFlanks leftType="shelled-peanuts" rightType="yellow-corn" opacity="opacity-20 lg:opacity-25" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: COMMODITY DOSSIER (Clean, Minimal Home Palette)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType={product.slug || 'shelled-peanuts'} 
          bottomLeftType="yellow-corn"
          ticker={`TECHNICAL EXPORT DOSSIER • ${product.name?.toUpperCase()} • ORIGIN: ${product.origin?.toUpperCase() || 'GUJARAT, INDIA'} • APEDA & FSSAI COMPLIANT`}
          coordinates={{ lat: 'N 21.17° SURAT', lng: 'E 72.83°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-5 font-mono flex-wrap">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <Link to="/products" className="hover:text-brand-primary transition-colors">
              Commodities
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            {product.category_name && (
              <>
                <Link to={`/products?category=${product.category_slug}`} className="hover:text-brand-primary transition-colors">
                  {product.category_name}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
              </>
            )}
            <span className="text-brand-primary font-bold truncate">{product.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                <span className="font-bold tracking-wide uppercase">{product.category_name || 'AGRO EXPORT LINE'}</span>
                <span className="text-[#4D6765]/40">•</span>
                <span className="text-[#4D6765] font-normal">Origin: {product.origin || 'Gujarat, India'}</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                {product.name}
              </h1>

              {product.grade_variety && (
                <p className="text-sm font-mono text-brand-primary font-bold tracking-wide">
                  Export Grade: {product.grade_variety}
                </p>
              )}

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                {product.short_description || product.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to={`/rfq?product_id=${product.id}`}
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-[#008A82] text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <span>Request Container Quote</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <a
                href={`https://wa.me/919023363680?text=Hello%20Agro%20Dairy,%20I%20am%20inquiring%20about%20${encodeURIComponent(product.name)}%20pricing%20and%20container%20stuffing.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb857] text-white font-ui font-bold text-xs sm:text-sm px-5 py-3.5 rounded-full transition-all duration-200 shadow-md shadow-[#25D366]/20"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          MAIN PRODUCT SHOWCASE & SPECIFICATIONS (Clean Home-Page Cards)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Image Showcase & Assurance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="aspect-4/3 rounded-3xl bg-white overflow-hidden border border-[#D4ECE9] shadow-xl relative group">
              <img
                src={mainImageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getProductFallback(product);
                }}
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#0C2422] font-mono font-bold text-[11px] px-3 py-1 rounded-full border border-[#D4ECE9] shadow-sm">
                Sortex 99.5%+ Machine Cleaned
              </div>
            </div>

            {/* Thumbnails if any */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
                {product.images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(img.image_path)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition ${
                      activeImage === img.image_path ? 'border-brand-primary shadow-sm ring-2 ring-brand-primary/20' : 'border-[#D4ECE9] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.image_path.startsWith('http') ? img.image_path : `/images/${img.image_path}`} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Assurance Card */}
            <div className="bg-[#F8FAF9] text-[#0C2422] rounded-3xl p-6 border border-[#D4ECE9] shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-sm text-[#0C2422]">
                <ShieldCheck className="w-5 h-5 text-brand-primary" />
                <span>Pre-Shipment Quality Guarantee</span>
              </div>
              <p className="text-xs text-[#4D6765] leading-relaxed font-sans">
                Every container undergoes comprehensive optical destoning, laboratory chromatography for aflatoxins, and is sealed with silica gel desiccant bags to prevent transit sweat.
              </p>
              <div className="pt-2 border-t border-[#D4ECE9] flex items-center justify-between text-[11px] font-mono text-brand-primary font-bold">
                <span>APEDA • FSSAI • ISO 22000</span>
                <span>Phytosanitary Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Parameters & Description */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 6 Key Trade Parameters Bento */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white rounded-3xl p-6 border border-[#D4ECE9] shadow-xl text-[#0C2422]">
              <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#D4ECE9]">
                <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">HS Code</span>
                <span className="font-bold text-[#0C2422] font-mono text-sm">{product.hs_code || '1202.42.10'}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#D4ECE9]">
                <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Min Order (MOQ)</span>
                <span className="font-bold text-[#0C2422] text-sm">{product.moq} {product.moq_unit || 'MT'} (1x20ft FCL)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#D4ECE9]">
                <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Shelf Life</span>
                <span className="font-bold text-[#0C2422] text-sm">{product.shelf_life || '12 - 24 Months'}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#D4ECE9]">
                <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Storage Temp</span>
                <span className="font-bold text-[#0C2422] text-sm truncate block">{product.storage_conditions || '15°C - 18°C Cool Dry'}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#D4ECE9]">
                <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Loading Sea Ports</span>
                <span className="font-bold text-[#0C2422] text-sm">Hazira / Mundra</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#D4ECE9]">
                <span className="text-[10px] text-slate-400 block font-mono uppercase font-bold">Incoterms</span>
                <span className="font-bold text-[#0C2422] text-sm">FOB / CIF / CFR</span>
              </div>
            </div>

            {/* Comprehensive Commercial Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4ECE9] shadow-xl space-y-4">
              <h2 className="font-display font-bold text-xl text-[#0C2422] border-b border-slate-100 pb-3">
                Commercial Specification &amp; Application Dossier
              </h2>
              <div className="prose prose-sm max-w-none text-[#4D6765] leading-relaxed font-sans space-y-3">
                <p>
                  {product.description || product.short_description || 'Certified export quality Indian commodity sourced from dedicated agricultural contract-growing zones in Gujarat. Processed in state-of-the-art facilities with automatic destoners, magnetic separators, and high-resolution optical color sorting.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  to={`/rfq?product_id=${product.id}`}
                  className="w-full sm:w-auto flex-1 bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-sm py-4 px-6 rounded-2xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>Request Binding FOB/CIF Quote</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold" />
                </Link>

                <Link
                  to={`/tools/container-calculator?category=${product.category_slug || 'peanuts'}`}
                  className="w-full sm:w-auto bg-[#F4F9F8] hover:bg-[#E6F7F5] text-[#0C2422] font-bold text-xs py-4 px-5 rounded-2xl transition text-center border border-[#D4ECE9]"
                >
                  Calculate Container FCL
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Technical Specifications Parameters Table */}
        {product.groupedSpecifications && Object.keys(product.groupedSpecifications).length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D4ECE9] shadow-xl space-y-6 text-[#0C2422]">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-2 shadow-xs">
                <span>LABORATORY CERTIFIED PARAMETERS</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0C2422] tracking-tight">
                Physical, Chemical &amp; Microbiological Limits
              </h2>
            </div>

            <div className="space-y-6">
              {Object.entries(product.groupedSpecifications).map(([group, specs]) => (
                <div key={group} className="border border-[#D4ECE9] rounded-2xl overflow-hidden">
                  <div className="bg-[#F4F9F8] text-[#0C2422] border-b border-[#D4ECE9] px-5 py-3.5 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-between">
                    <span>{group}</span>
                    <span className="text-[10px] font-mono text-brand-primary font-bold">AOAC / ISO Standards</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {specs.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 px-5 py-3.5 text-xs hover:bg-[#F8FAF9] transition-colors">
                        <div className="font-semibold text-[#0C2422]">{item.parameter}</div>
                        <div className="font-mono text-brand-primary font-bold">{item.value} {item.unit || ''}</div>
                        <div className="text-slate-400 sm:text-right font-mono text-[11px]">{item.test_method || 'Standard Lab Analysis'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Packaging & Stuffing Bento */}
        {(product.packaging_summary || product.loading_summary) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.packaging_summary && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4ECE9] shadow-sm space-y-3">
                <div className="flex items-center gap-2.5 font-display font-bold text-base text-[#0C2422]">
                  <Package className="w-5 h-5 text-brand-primary" />
                  <span>Packaging Configurations</span>
                </div>
                <p className="text-xs sm:text-sm text-[#4D6765] leading-relaxed font-sans">
                  {product.packaging_summary}
                </p>
              </div>
            )}

            {product.loading_summary && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4ECE9] shadow-sm space-y-3">
                <div className="flex items-center gap-2.5 font-display font-bold text-base text-[#0C2422]">
                  <Scale className="w-5 h-5 text-brand-gold" />
                  <span>Container Payload &amp; Ocean Stuffing</span>
                </div>
                <p className="text-xs sm:text-sm text-[#4D6765] leading-relaxed font-sans">
                  {product.loading_summary}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Related Commodities */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-[#D4ECE9]">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-2 shadow-xs">
                <span>SAME HARVEST CATEGORY</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#0C2422] tracking-tight">
                Related Commodities in {product.category_name}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.relatedProducts.map(rel => (
                <CommodityCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          BOTTOM FAST RFQ CALLOUT (Signature Clean Dark Pine Section)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#021814] via-[#052822] to-[#011310] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[#00A79D]/30 shadow-2xl mt-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5EEAD4] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-[#5EEAD4]" />
              <span>Full Container Load (FCL) &amp; Mixed Consignments</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Inquiring for {product.name} with Destination Discharge Freight?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/75 mt-2 font-sans leading-relaxed">
              Our trade merchandising team provides formal CIF quotes to Jebel Ali, Rotterdam, Haiphong, Chittagong, Dammam, and 40+ destinations within 6 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to={`/rfq?product_id=${product.id}`}
              className="bg-brand-gold hover:bg-amber-400 text-[#002B26] font-ui font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Request Formal RFQ
            </Link>
            <a
              href={`https://wa.me/919023363680?text=Hello%20Agro%20Dairy,%20I%20am%20inquiring%20about%20${encodeURIComponent(product.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/15 text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-white/20 transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
