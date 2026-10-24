import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Send, ShieldCheck, CheckCircle2, ChevronRight, FileText, 
  Building2, Globe2, Phone, Mail, Clock, Anchor, Package,
  ArrowRight, Sparkles, AlertCircle, MessageSquare, Truck
} from 'lucide-react';
import { productsService, inquiriesService } from '../services/api';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

export default function Rfq() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryNumber, setInquiryNumber] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    product_id: searchParams.get('product_id') || '',
    product_variant: '',
    quantity: '19',
    unit: 'Metric Ton (MT)',
    packaging_preference: '50 Kg PP Bags (Standard)',
    destination_port: searchParams.get('destination') || '',
    incoterm: 'CIF',
    target_price: '',
    target_currency: 'USD',
    preferred_delivery_date: '',
    message: '',
    subscribe_newsletter: true,
  });

  useEffect(() => {
    productsService.getAll({ limit: 100 })
      .then(res => {
        if (res.success) setProducts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await inquiriesService.submitRfq(formData);
      if (res.success) {
        setSubmitted(true);
        setInquiryNumber(res.inquiry_number);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(res.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error submitting inquiry. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative bg-[#FAFCFB] min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <RealProductSectionFlanks leftType="shelled-peanuts" rightType="pearl-millet" opacity="opacity-20" />
        <div className="max-w-2xl mx-auto text-center space-y-6 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#D4ECE9] relative z-10">
          <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-[#00A79D] text-xs font-mono font-bold mb-3 shadow-xs">
              OFFICIAL QUOTATION SUBMISSION RECORDED
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#0C2422]">
              Request for Quotation Submitted
            </h1>
            <p className="text-[#4D6765] text-xs sm:text-sm max-w-lg mx-auto mt-2 leading-relaxed">
              Your formal commercial inquiry has been registered with our International Trade Desk. Our export merchandising team will calculate current vessel freight and issue a binding proforma quotation within 12 business hours.
            </p>
          </div>

          <div className="bg-[#021814] text-white rounded-2xl p-6 text-center max-w-md mx-auto border border-[#00A79D]/40 shadow-inner">
            <span className="text-[10px] uppercase text-[#F5B800] font-mono font-bold block mb-1">
              Official Reference Number
            </span>
            <span className="text-2xl font-black font-mono text-[#5EEAD4] block tracking-wider">
              {inquiryNumber}
            </span>
            <span className="text-[11px] text-emerald-100/70 mt-2 block font-sans">
              Please quote this reference in WhatsApp and email correspondence.
            </span>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/919023363680?text=Hello%20J.P.%20Vora,%20I%20have%20submitted%20RFQ%20${inquiryNumber}.%20Please%20provide%20spot%20freight%20and%20container%20quote.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1fb857] text-white font-ui font-bold text-xs px-6 py-3.5 rounded-full shadow-lg transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Follow up on WhatsApp</span>
            </a>
            <Link
              to="/products"
              className="bg-[#002B26] hover:bg-[#003732] text-white font-ui font-bold text-xs px-6 py-3.5 rounded-full shadow-md transition"
            >
              Explore Commodity Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      <RealProductSectionFlanks leftType="shelled-peanuts" rightType="yellow-corn" opacity="opacity-20 lg:opacity-25" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: RFQ DESK (Clean & Minimal Home Standard)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-[#D4ECE9]">
        {/* Rich Background Elements: Trade Grid, Compass, Watermarks & Ambient Glows */}
        <PageHeroDecorations 
          topRightType="yellow-corn" 
          bottomLeftType="shelled-peanuts"
          ticker="COMMERCIAL PROFORMA SERVICE ➔ FOB &amp; CIF SPOT CONTAINER RATES"
          coordinates={{ lat: 'N 21.17° SURAT', lng: 'E 72.83°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-5 font-mono">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <span className="text-brand-primary font-bold">Commercial Request for Quotation</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="tracking-wide">COMMERCIAL PROFORMA SERVICE</span>
                <span className="text-[#00A79D]/40">•</span>
                <span className="text-[#4D6765] font-normal">FOB &amp; CIF Spot Container Rates</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Request a <span className="text-brand-primary">Formal Container Export Quote</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                Complete the shipment parameters below to receive binding FOB Mundra/Hazira or CIF discharge port quotes, optical sortex grade specifications, and confirmed vessel booking schedules.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://wa.me/919023363680?text=Hello%20J.P.%20Vora,%20I%20would%20like%20to%20request%20an%20urgent%20container%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 font-ui font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 shadow-sm group"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] fill-current group-hover:scale-110 transition-transform" />
                <span>Instant WhatsApp Trade Desk</span>
              </a>
              <Link
                to="/tools/container-calculator"
                className="px-7 py-3.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs sm:text-sm shadow-md shadow-brand-primary/25 hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Package className="w-4 h-4 text-brand-gold" />
                <span>Payload Calculator</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          CORE INTERACTIVE FORM & LOGISTICS GUIDANCE
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: 3-STAGE COMMERCIAL RFQ FORM
              ===================================================================== */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-[#D4ECE9] shadow-sm space-y-8">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Stage 1: Commodity & Volume */}
              <div>
                <div className="flex items-center gap-3 border-b border-[#D4ECE9] pb-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-[#E6F7F5] border border-[#BBE5E1] text-[#00A79D] font-mono font-bold text-xs flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h2 className="font-display font-extrabold text-base text-[#0C2422]">
                      Commodity &amp; Shipment Volume
                    </h2>
                    <span className="text-[11px] text-[#4D6765] font-sans">Select target agricultural or dairy export line</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                      Selected Commodity *
                    </label>
                    <select
                      name="product_id"
                      value={formData.product_id}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white focus:border-[#00A79D] transition"
                    >
                      <option value="">-- Choose Commodity --</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.origin || 'Gujarat'})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                      Grade / Variety / Caliber Count
                    </label>
                    <input
                      type="text"
                      name="product_variant"
                      value={formData.product_variant}
                      onChange={handleChange}
                      placeholder="e.g. 40/50 count, 99.5% Sortex, Bold 50/60"
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm text-[#0C2422] placeholder:text-[#4D6765]/50 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white focus:border-[#00A79D] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                      Order Quantity *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.5"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        placeholder="e.g. 19"
                        className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm text-[#0C2422] placeholder:text-[#4D6765]/50 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white focus:border-[#00A79D] transition"
                      />
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        className="bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-3 py-3 text-xs font-bold text-[#0C2422] shrink-0"
                      >
                        <option value="Metric Ton (MT)">MT</option>
                        <option value="20ft Container (FCL)">20ft FCL</option>
                        <option value="40ft Container (FCL)">40ft FCL</option>
                        <option value="Bags">Bags</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                      Packaging Preference
                    </label>
                    <select
                      name="packaging_preference"
                      value={formData.packaging_preference}
                      onChange={handleChange}
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white focus:border-[#00A79D] transition"
                    >
                      <option value="25 Kg PP Bags">25 Kg PP Bags (Virgin Polypropylene)</option>
                      <option value="50 Kg PP Bags (Standard)">50 Kg PP Bags (Standard)</option>
                      <option value="50 Kg Jute Bags">50 Kg Natural Jute / Burlap Bags</option>
                      <option value="25 Kg Vacuum Packed (High Barrier)">25 Kg Multi-Layer Vacuum Packs in Cartons</option>
                      <option value="1000 Kg Jumbo Bags">1000 Kg FIBC Jumbo Bags</option>
                      <option value="Custom Buyer Private Label">Custom Buyer Private Labeling</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Stage 2: Logistics & Incoterms */}
              <div>
                <div className="flex items-center gap-3 border-b border-[#D4ECE9] pb-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-[#E6F7F5] border border-[#BBE5E1] text-[#00A79D] font-mono font-bold text-xs flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h2 className="font-display font-extrabold text-base text-[#0C2422]">
                      Incoterms &amp; Discharge Seaport
                    </h2>
                    <span className="text-[11px] text-[#4D6765] font-sans">Pricing structure and destination coordinates</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                      Incoterm *
                    </label>
                    <select
                      name="incoterm"
                      value={formData.incoterm}
                      onChange={handleChange}
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] font-bold text-[#002B26]"
                    >
                      <option value="FOB">FOB (Mundra / Hazira)</option>
                      <option value="CIF">CIF (Cost, Insurance &amp; Freight)</option>
                      <option value="CFR">CFR (Cost &amp; Freight)</option>
                      <option value="EXW">EXW (Factory Rajkot/Surat)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                      Discharge Seaport
                    </label>
                    <input
                      type="text"
                      name="destination_port"
                      value={formData.destination_port}
                      onChange={handleChange}
                      placeholder="e.g. Jebel Ali, Rotterdam, Haiphong"
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm text-[#0C2422] placeholder:text-[#4D6765]/50 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white focus:border-[#00A79D] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                      Target Price (USD / MT)
                    </label>
                    <input
                      type="number"
                      step="1"
                      name="target_price"
                      value={formData.target_price}
                      onChange={handleChange}
                      placeholder="Optional target budget"
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm text-[#0C2422] placeholder:text-[#4D6765]/50 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white focus:border-[#00A79D] transition"
                    />
                  </div>
                </div>
              </div>

              {/* Stage 3: Buyer Details */}
              <div>
                <div className="flex items-center gap-3 border-b border-[#D4ECE9] pb-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-[#E6F7F5] border border-[#BBE5E1] text-[#00A79D] font-mono font-bold text-xs flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <h2 className="font-display font-extrabold text-base text-[#0C2422]">
                      Buyer Credentials &amp; Delivery Requirements
                    </h2>
                    <span className="text-[11px] text-[#4D6765] font-sans">Official communication and trade documentation contact</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Full Name"
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm text-[#0C2422] placeholder:text-[#4D6765]/50 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white focus:border-[#00A79D] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                      Company Legal Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      placeholder="Importer / Food Processing Co."
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm text-[#0C2422] placeholder:text-[#4D6765]/50 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white focus:border-[#00A79D] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="trade@yourcompany.com"
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm text-[#0C2422] placeholder:text-[#4D6765]/50 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white focus:border-[#00A79D] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 555 1234567"
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm text-[#0C2422] placeholder:text-[#4D6765]/50 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white focus:border-[#00A79D] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                      Destination Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      placeholder="e.g. UAE, Saudi Arabia, Netherlands"
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm text-[#0C2422] placeholder:text-[#4D6765]/50 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white focus:border-[#00A79D] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                      WhatsApp Number (For Instant Quoting)
                    </label>
                    <input
                      type="text"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="+971 50 1234567"
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm text-[#0C2422] placeholder:text-[#4D6765]/50 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white focus:border-[#00A79D] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C2422] mb-1.5 font-mono uppercase tracking-wide">
                    Quality, Moisture, Aflatoxin or Third-Party Inspection Specifications *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe required aflatoxin limits (e.g. < 4ppb total), maximum moisture (e.g. < 7%), independent inspection (SGS/Bureau Veritas), or target shipping window..."
                    className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm text-[#0C2422] placeholder:text-[#4D6765]/50 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white focus:border-[#00A79D] transition resize-none"
                  />
                </div>

                <div className="pt-4 flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="subscribe_newsletter"
                    name="subscribe_newsletter"
                    checked={formData.subscribe_newsletter}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-[#00A79D] focus:ring-[#00A79D]"
                  />
                  <label htmlFor="subscribe_newsletter" className="text-xs text-[#4D6765] font-sans cursor-pointer">
                    Receive weekly Indian mandi arrivals, FOB Mundra price indications, and export policy notifications.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#002B26] via-[#003732] to-[#00A79D] hover:from-[#041D18] hover:to-[#008f86] text-white font-ui font-black text-sm py-4 rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-60"
              >
                {loading ? (
                  <span>Formulating Container RFQ...</span>
                ) : (
                  <>
                    <span>Submit Commercial Export RFQ</span>
                    <Send className="w-4 h-4 text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* =====================================================================
              RIGHT COLUMN: LOGISTICS GUIDANCE & TRADE SAFEGUARDS
              ===================================================================== */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Guidance Card: Container Stuffing Parameters */}
            <div className="bg-gradient-to-br from-[#021814] via-[#041F1A] to-[#010D0B] text-white rounded-3xl p-6 space-y-5 shadow-sm border border-[#00A79D]/30 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#F5B800] uppercase tracking-wider">
                    EXPORT PARAMETERS
                  </span>
                  <h3 className="font-display font-extrabold text-base text-white mt-0.5">
                    Container Capacity Guide
                  </h3>
                </div>
                <Package className="w-5 h-5 text-[#5EEAD4]" />
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[#5EEAD4] font-bold block mb-0.5">20ft Heavy Container (FCL)</span>
                  <span className="text-slate-300">Peanuts / Grains: ~19 to 20 Metric Tons</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">380 to 400 Bags (50 Kg PP)</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[#5EEAD4] font-bold block mb-0.5">40ft High Cube Container (FCL)</span>
                  <span className="text-slate-300">Pulses / Chickpeas: ~26 to 27 Metric Tons</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">520 to 540 Bags (50 Kg PP)</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[#F5B800] font-bold block mb-0.5">Desiccant &amp; Ventilation Protocol</span>
                  <span className="text-slate-300">12x Dry-Bags (Calcium Chloride) hung per container for ocean moisture protection.</span>
                </div>
              </div>

              <Link
                to="/tools/container-calculator"
                className="block text-center text-xs font-bold text-brand-gold hover:text-amber-300 py-2 border-t border-white/10 transition-colors"
              >
                Open Full Container Calculator &rarr;
              </Link>
            </div>

            {/* Incoterms Cheat Sheet */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#D4ECE9] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D4ECE9]">
                <h4 className="font-display font-extrabold text-sm text-[#0C2422]">
                  Incoterms Supported
                </h4>
                <Anchor className="w-4 h-4 text-[#00A79D]" />
              </div>

              <div className="space-y-2.5 text-xs font-sans">
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-[#00A79D] px-1.5 py-0.5 bg-[#E6F7F5] border border-[#BBE5E1] rounded shrink-0">FOB</span>
                  <span className="text-[#4D6765]">Free On Board (Mundra / Hazira) — Seller covers all origin inland transport, custom clearance &amp; port loading.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-[#00A79D] px-1.5 py-0.5 bg-[#E6F7F5] border border-[#BBE5E1] rounded shrink-0">CIF</span>
                  <span className="text-[#4D6765]">Cost, Insurance &amp; Freight — Seller pays ocean vessel freight and marine insurance to buyer's discharge port.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-[#00A79D] px-1.5 py-0.5 bg-[#E6F7F5] border border-[#BBE5E1] rounded shrink-0">CFR</span>
                  <span className="text-[#4D6765]">Cost &amp; Freight — Seller arranges and pays ocean freight to destination seaport; insurance by buyer.</span>
                </div>
              </div>
            </div>

            {/* Statutory Registrations */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#D4ECE9] space-y-3 font-mono text-xs">
              <span className="text-[10px] uppercase font-bold text-[#00A79D] block tracking-wider">
                COMMERCIAL REGISTRATION
              </span>
              <div className="flex justify-between py-1 border-b border-[#D4ECE9]">
                <span className="text-[#4D6765]">DGFT IEC:</span>
                <span className="font-bold text-[#0C2422]">0817029381</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#D4ECE9]">
                <span className="text-[#4D6765]">GSTIN:</span>
                <span className="font-bold text-[#0C2422]">24AAHFA3928L1Z9</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#D4ECE9]">
                <span className="text-[#4D6765]">FSSAI License:</span>
                <span className="font-bold text-[#0C2422]">10722026000148</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#4D6765]">APEDA RCMC:</span>
                <span className="font-bold text-[#0C2422]">RCMC/AGRO/2026/0892</span>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

