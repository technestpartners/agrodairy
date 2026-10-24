import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, ChevronRight, 
  Clock, ShieldCheck, MessageSquare, Anchor, Building2, 
  Globe2, FileText, ArrowRight, Award, Truck, Check, 
  HelpCircle, ChevronDown, ExternalLink, Sparkles
} from 'lucide-react';
import { companyService } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

export default function Contact() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiryType: 'Container Export Quote (FCL)',
    commodity: 'Bold Peanuts (Groundnut Kernels)',
    destinationPort: '',
    subject: 'Commodity Export Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState('');
  const [error, setError] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  const inquiryTypes = [
    'Container Export Quote (FCL)',
    'Pre-Shipment Sample Dispatch',
    'Lab Test / Certificate Request',
    'Mixed Container Consolidation',
    'Distributor / Agency Partnership'
  ];

  const commodities = [
    'Bold Peanuts (Groundnut Kernels 38/42 - 70/80)',
    'Pure Desi Cow Ghee & Buffalo Ghee',
    'Green Pearl Millet (Bajra) & Sorghum',
    'Desi & Large Caliber Kabuli Chickpeas',
    'Yellow Maize (Animal Feed & Food Grade)',
    'Cumin Seeds (Jeera) & Whole Spices',
    'Multiple Commodities / Mixed Consignment'
  ];

  const faqs = [
    {
      q: 'How quickly can pre-shipment commodity samples be dispatched internationally?',
      a: 'We dispatch official laboratory-certified trade samples worldwide via DHL or FedEx Express within 24 to 48 hours of request confirmation. Each sample packet includes comprehensive lot analysis data (moisture, count, purity, and aflatoxin report) in tamper-evident sealed packaging.'
    },
    {
      q: 'What are your standard accepted payment terms for container exports?',
      a: 'We accommodate verified international trade structures including 100% Irrevocable Confirmed Letter of Credit (L/C) at sight from first-class international banks, Cash Against Documents (CAD / DP), and 30% advance telegraphic transfer (T/T) with 70% balance payable against scanned original ocean Bill of Lading (B/L) and phytosanitary certificates.'
    },
    {
      q: 'Can Agro Dairy Export arrange third-party pre-shipment inspections?',
      a: 'Yes. We routinely welcome independent international inspection agencies such as SGS, Bureau Veritas, Eurofins, Intertek, or Geo-Chem at our sorting facilities and port warehouses prior to container stuffing. Inspection costs can be integrated directly into your CIF quotation.'
    },
    {
      q: 'What is your standard Minimum Order Quantity (MOQ)? Can we consolidate mixed containers?',
      a: 'Our standard MOQ is one 20ft Full Container Load (approx. 18 to 20 Metric Tons depending on product density). We also offer customized multi-commodity container consolidation—enabling buyers to combine Peanuts, Green Millet, Chickpeas, and Ghee in a single 20ft or 40ft container under one unified Bill of Lading.'
    },
    {
      q: 'Which Incoterms do you quote, and what are your primary gateway export ports?',
      a: 'We quote on FOB (Mundra, Hazira, Kandla), CFR, and CIF (any global discharge seaport). With Hazira Port located just 35 km from our Surat headquarters, we offer the fastest transit cycles to the Middle East, Gulf (Jebel Ali, Dammam, Salalah), and East Africa.'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInquiryTypeSelect = (type) => {
    setFormData(prev => ({ 
      ...prev, 
      inquiryType: type,
      subject: `${type} — ${prev.commodity || 'Agro Export'}`
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        subject: `[${formData.inquiryType}] ${formData.commodity} - Port: ${formData.destinationPort || 'Not Specified'}`,
        message: `Inquiry Type: ${formData.inquiryType}\nCommodity: ${formData.commodity}\nDestination Port / Country: ${formData.destinationPort || 'N/A'}\n\nClient Message:\n${formData.message}`
      };

      const res = await companyService.submitContact(payload);
      if (res.success) {
        setSubmitted(true);
        const refNum = `CON-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        setInquiryRef(refNum);
      } else {
        setError(res.message || 'Error transmitting your inquiry. Please try WhatsApp directly.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Connection error transmitting message. Please contact us via phone or WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      {/* Real commodity photographic background flanks */}
      <RealProductSectionFlanks leftType="shelled-peanuts" rightType="pearl-millet" opacity="opacity-20 lg:opacity-25" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: EXECUTIVE TRADE DESK COORDINATION (Clean & Minimal Home Standard)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-[#D4ECE9]">
        {/* Rich Background Elements: Trade Grid, Compass, Watermarks & Ambient Glows */}
        <PageHeroDecorations 
          topRightType="real-grains" 
          bottomLeftType="shelled-peanuts"
          ticker="COMMERCIAL INQUIRIES ➔ DIRECT ORIGIN PROCUREMENT ➔ SEAPORT HAULAGE"
          coordinates={{ lat: 'N 21.17° SURAT', lng: 'E 72.83°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-5 font-mono">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <span className="text-brand-primary font-bold">Contact &amp; Trade Desk</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              {/* Home Standard Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="tracking-wide">EXPORT DESK LIVE</span>
                <span className="text-[#00A79D]/40">•</span>
                <span className="text-[#4D6765] font-normal">Mon - Sat: 09:00 - 19:30 IST (Average Reply &lt; 2 Hrs)</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Connect Directly with our{' '}
                <span className="text-brand-primary">Global Export Merchandisers</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                Commercial and trade coordination for international buyers, food processors, supermarkets, and commodity importers. Headquartered in Surat, Gujarat with origin packing stations and immediate seaport access to Hazira and Mundra.
              </p>
            </div>

            {/* Direct Action Hub */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`https://wa.me/${(settings?.contact_whatsapp || '919023363680').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(settings?.contact_person || 'J.P. Vora')},%20I%20am%20inquiring%20about%20Agro%20Dairy%20export%20commodities%20pricing.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 font-ui font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 shadow-sm group"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] fill-current group-hover:scale-110 transition-transform" />
                <span>WhatsApp Export Desk ({settings?.contact_phone || '+91 90233 63680'})</span>
              </a>

              <Link
                to="/rfq"
                className="px-7 py-3.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs sm:text-sm shadow-md shadow-brand-primary/25 hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Request Container RFQ</span>
                <ArrowRight className="w-4 h-4 text-brand-gold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 1: 4 SPECIALIZED DEPARTMENT DESKS
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-12 sm:-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Desk 1: Commercial Sales */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#D4ECE9] hover:shadow-md hover:border-brand-primary/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center mb-4 border border-[#BBE5E1]">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-wider">
                COMMERCIAL MERCHANDISING
              </span>
              <h3 className="font-display font-bold text-base text-[#0C2422] mt-1">
                J.P. Vora (Managing Partner)
              </h3>
              <p className="text-xs text-[#4D6765] mt-1.5 leading-relaxed font-sans">
                Container contracts, CIF/FOB pricing sheets, Incoterm negotiations, and annual supply agreements.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4ECE9] space-y-1.5 text-xs font-mono">
              <a href={`tel:${(settings?.contact_phone || '+91 90233 63680').replace(/\s+/g, '')}`} className="flex items-center gap-2 text-[#0C2422] hover:text-brand-primary transition-colors font-bold">
                <Phone className="w-3.5 h-3.5 text-brand-primary" />
                <span>{settings?.contact_phone || '+91 90233 63680'}</span>
              </a>
              <a href={`mailto:${settings?.contact_email || 'agrodairyexportllp@gmail.com'}`} className="flex items-center gap-2 text-[#4D6765] hover:text-brand-primary transition-colors truncate">
                <Mail className="w-3.5 h-3.5 text-brand-primary" />
                <span className="truncate">{settings?.contact_email || 'agrodairyexportllp@gmail.com'}</span>
              </a>
            </div>
          </div>

          {/* Desk 2: Quality & Laboratory */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#D4ECE9] hover:shadow-md hover:border-brand-primary/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 border border-amber-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                QA &amp; LAB CERTIFICATIONS
              </span>
              <h3 className="font-display font-bold text-base text-[#0C2422] mt-1">
                Dr. Hiren Mehta (QA Head)
              </h3>
              <p className="text-xs text-[#4D6765] mt-1.5 leading-relaxed font-sans">
                HPLC Aflatoxin reports, moisture testing, Eurofins COA, and export phytosanitary documentation.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4ECE9] space-y-1.5 text-xs font-mono">
              <Link to="/quality/certifications" className="flex items-center gap-2 text-[#0C2422] hover:text-amber-700 transition-colors font-bold">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>APEDA • FSSAI • ISO 22000</span>
              </Link>
              <div className="flex items-center gap-2 text-[#4D6765]">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Lot Certificate with Every FCL</span>
              </div>
            </div>
          </div>

          {/* Desk 3: Ocean Logistics */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#D4ECE9] hover:shadow-md hover:border-brand-primary/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#E6F7F5] text-teal-700 flex items-center justify-center mb-4 border border-[#BBE5E1]">
                <Anchor className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-teal-700 uppercase tracking-wider">
                OCEAN FREIGHT &amp; PORTS
              </span>
              <h3 className="font-display font-bold text-base text-[#0C2422] mt-1">
                Port Operations &amp; BL Desk
              </h3>
              <p className="text-xs text-[#4D6765] mt-1.5 leading-relaxed font-sans">
                Container stuffing, silica gel desiccant placement, draft BL issuance, and vessel tracking.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4ECE9] space-y-1.5 text-xs font-mono">
              <div className="text-[#0C2422] font-bold flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-brand-primary" />
                <span>Hazira &amp; Mundra Gateways</span>
              </div>
              <div className="text-[#4D6765] flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-primary" />
                <span>Daily Stuffing Reports Sent</span>
              </div>
            </div>
          </div>

          {/* Desk 4: Trade Finance */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#D4ECE9] hover:shadow-md hover:border-brand-primary/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 border border-blue-200">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider">
                DOCUMENTATION &amp; BANKING
              </span>
              <h3 className="font-display font-bold text-base text-[#0C2422] mt-1">
                Export Accounts &amp; LC Desk
              </h3>
              <p className="text-xs text-[#4D6765] mt-1.5 leading-relaxed font-sans">
                Letter of Credit (LC) scrutiny, CAD processing via prime banks, Certificate of Origin (COO), and invoices.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D4ECE9] space-y-1 text-[11px] font-mono text-[#4D6765]">
              <div>IEC: <strong className="text-[#0C2422]">0817029381</strong></div>
              <div>GSTIN: <strong className="text-[#0C2422]">24AAHFA3928L1Z9</strong></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 2: CORE INTERACTIVE AREA (FORM + HQ COORDINATES)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: ADVANCED COMMERCIAL INQUIRY & SAMPLE REQUEST FORM
              ===================================================================== */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#D4ECE9] shadow-sm space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMMERCIAL INQUIRY DISPATCH</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#0C2422] tracking-tight">
                Submit Trade &amp; Sample Request
              </h2>
              <p className="text-xs sm:text-sm text-[#4D6765] mt-1.5 leading-relaxed font-sans">
                Complete the parameters below to connect with our trading leads. You will receive an official response and initial specification sheet within 2 - 6 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#E6F7F5] border border-[#BBE5E1] rounded-3xl p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-[#00A79D] text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#00A79D]/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest">
                    DISPATCH VERIFIED
                  </span>
                  <h3 className="font-display font-black text-2xl text-[#0C2422] mt-1">
                    Inquiry Reference: {inquiryRef}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4D6765] max-w-md mx-auto mt-2 leading-relaxed font-sans">
                    Thank you, <strong className="text-[#0C2422]">{formData.name}</strong>. Your commercial inquiry regarding <strong className="text-[#0C2422]">{formData.commodity}</strong> has been transmitted directly to Managing Partner J.P. Vora and the export merchandising desk.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/919023363680?text=Hello%20J.P.%20Vora,%20I%20have%20submitted%20inquiry%20reference%20${inquiryRef}%20regarding%20${encodeURIComponent(formData.commodity)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#1fb857] text-white font-ui font-bold text-xs px-5 py-3 rounded-full shadow-md transition flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Follow up on WhatsApp with Ref #{inquiryRef}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData(prev => ({ ...prev, message: '' }));
                    }}
                    className="bg-white hover:bg-slate-50 text-[#0C2422] font-bold text-xs px-4 py-3 rounded-full border border-[#D4ECE9] transition"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-rose-50 text-rose-700 p-4 rounded-2xl text-xs border border-rose-200 font-medium">
                    {error}
                  </div>
                )}

                {/* 1. Inquiry Type Selector Pills */}
                <div>
                  <label className="block text-xs font-bold text-[#0C2422] mb-2 font-mono uppercase tracking-wider">
                    Select Nature of Inquiry *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {inquiryTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => handleInquiryTypeSelect(type)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 text-left ${
                          formData.inquiryType === type
                            ? 'bg-[#021814] text-white shadow-md font-bold border border-brand-primary'
                            : 'bg-[#FAFCFB] hover:bg-slate-100 text-[#4D6765] border border-[#D4ECE9]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Contact Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1 font-mono uppercase">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Tariq Al-Mansoor"
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white text-[#0C2422] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1 font-mono uppercase">
                      Company / Importer Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Gulf Food Trading LLC"
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white text-[#0C2422] transition"
                    />
                  </div>
                </div>

                {/* 3. Email & Phone / WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1 font-mono uppercase">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="buyer@company.com"
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white text-[#0C2422] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1 font-mono uppercase">
                      Phone / WhatsApp (with country code) *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+971 50 123 4567"
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white text-[#0C2422] transition"
                    />
                  </div>
                </div>

                {/* 4. Commodity of Interest & Destination Port */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1 font-mono uppercase">
                      Commodity of Interest *
                    </label>
                    <select
                      name="commodity"
                      value={formData.commodity}
                      onChange={handleChange}
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-3.5 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white text-[#0C2422] transition"
                    >
                      {commodities.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0C2422] mb-1 font-mono uppercase">
                      Destination Port / Country
                    </label>
                    <input
                      type="text"
                      name="destinationPort"
                      value={formData.destinationPort}
                      onChange={handleChange}
                      placeholder="e.g. Jebel Ali, Rotterdam, Haiphong"
                      className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white text-[#0C2422] transition"
                    />
                  </div>
                </div>

                {/* 5. Detailed Commercial Specifications */}
                <div>
                  <label className="block text-xs font-bold text-[#0C2422] mb-1 font-mono uppercase">
                    Commercial Specifications &amp; Requirements *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Specify target quantity (e.g. 2 x 20ft FCL), packaging preference (PP bags, vacuum packs), target delivery month, or specific grade counts..."
                    className="w-full bg-[#FAFCFB] border border-[#D4ECE9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white text-[#0C2422] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#021814] via-[#052822] to-[#00A79D] hover:from-[#011310] hover:to-[#008f86] text-white font-ui font-bold text-sm py-4 rounded-2xl shadow-lg shadow-[#021814]/20 transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-60"
                >
                  {loading ? (
                    <span>Transmitting to Trade Merchandisers...</span>
                  ) : (
                    <>
                      <span>Transmit Message to Trade Desk</span>
                      <Send className="w-4 h-4 text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#4D6765] pt-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-primary" />
                    <span>Commercial Non-Disclosure Protected</span>
                  </span>
                  <span>Direct Export Desk • Surat, India</span>
                </div>
              </form>
            )}
          </div>

          {/* =====================================================================
              RIGHT COLUMN: CORPORATE HEADQUARTERS, GOOGLE MAP & SEAPORT GATEWAYS
              ===================================================================== */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card A: Corporate Headquarters & Direct Lines */}
            <div className="bg-gradient-to-br from-[#021814] via-[#041F1A] to-[#010D0B] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-[#00A79D]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A79D]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#F5B800] uppercase tracking-wider">
                    HEADQUARTERS (HQ)
                  </span>
                  <h3 className="font-display font-black text-xl text-white mt-0.5">
                    Surat Corporate Trade Office
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#5EEAD4] border border-white/15">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 text-xs font-sans text-slate-200">
                {/* Physical Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-sm mb-0.5">Physical Registered Office</span>
                    <span className="text-slate-300 leading-relaxed block font-sans">
                      {settings?.company_address || 'Office no. -701, THE FUTURE CORNER, Sarthana, Surat-395013, Gujarat, India'}
                    </span>
                  </div>
                </div>

                {/* Primary Managing Partner Hotline */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-sm mb-0.5">Export Director Hotline</span>
                    <a href={`tel:${(settings?.contact_phone || '+91 90233 63680').replace(/\s+/g, '')}`} className="text-white hover:text-[#5EEAD4] transition-colors font-mono font-bold text-sm">
                      {settings?.contact_phone || '+91 90233 63680'} ({settings?.contact_person || 'J.P. Vora'})
                    </a>
                    <span className="block text-[11px] text-emerald-300/80 font-mono mt-0.5">
                      Direct Calls &amp; WhatsApp Trade Desk
                    </span>
                  </div>
                </div>

                {/* Commercial Inquiries Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-sm mb-0.5">Official Commercial Email</span>
                    <a href={`mailto:${settings?.contact_email || 'agrodairyexportllp@gmail.com'}`} className="text-slate-300 hover:text-white transition-colors font-mono text-xs break-all">
                      {settings?.contact_email || 'agrodairyexportllp@gmail.com'}
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block text-sm mb-0.5">Trade Trading Hours</span>
                    <span className="text-slate-300 font-sans">{settings?.footer_hours || 'Monday - Saturday: 09:00 - 19:30 IST'}</span>
                    <span className="block text-[11px] text-slate-400 mt-0.5 font-sans">
                      Port Operations: 24/7 continuous vessel loading
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${(settings?.contact_whatsapp || '919023363680').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(settings?.contact_person || 'J.P. Vora')},%20I%20would%20like%20to%20connect%20regarding%20Agro%20Dairy%20Export%20commodities.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1fb857] text-white font-ui font-bold text-xs py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Start WhatsApp Trade Consultation</span>
                </a>
              </div>
            </div>

            {/* Card B: Interactive Google Maps Embed for THE FUTURE CORNER, Surat */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#D4ECE9] overflow-hidden">
              <div className="px-3 py-2 mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-primary" />
                  <span className="text-xs font-bold text-[#0C2422] font-sans">Surat HQ Location Map</span>
                </div>
                <a
                  href="https://maps.google.com/?q=THE+FUTURE+CORNER,+Sarthana,+Surat,+Gujarat+395013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-brand-primary hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              <div className="w-full h-56 rounded-2xl overflow-hidden border border-[#D4ECE9]">
                <iframe
                  title="Agro Dairy Export LLP Office Location - The Future Corner Surat"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?q=THE+FUTURE+CORNER,+Sarthana,+Surat,+Gujarat+395013&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Card C: Direct Seaport Gateways & Transit Times */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#D4ECE9] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D4ECE9]">
                <div>
                  <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-wider">
                    DIRECT ORIGIN SEA PORTS
                  </span>
                  <h4 className="font-display font-bold text-sm text-[#0C2422]">
                    Gujarat Seaport Gateways
                  </h4>
                </div>
                <Anchor className="w-5 h-5 text-brand-primary" />
              </div>

              <div className="space-y-3 text-xs">
                {/* Hazira Port */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFCFB] border border-[#D4ECE9]">
                  <div>
                    <div className="font-bold text-[#0C2422] flex items-center gap-1.5 font-display">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Hazira Port (INHAZ)</span>
                    </div>
                    <span className="text-[11px] text-[#4D6765] font-sans">35 km from Surat • Immediate container stuffing</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-brand-primary bg-[#E6F7F5] border border-[#BBE5E1] px-2 py-1 rounded-lg">
                    Fastest GCC/Africa
                  </span>
                </div>

                {/* Mundra Port */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFCFB] border border-[#D4ECE9]">
                  <div>
                    <div className="font-bold text-[#0C2422] flex items-center gap-1.5 font-display">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>Mundra Port (INMUN)</span>
                    </div>
                    <span className="text-[11px] text-[#4D6765] font-sans">Deep-water mega hub • Maersk / MSC / CMA CGM</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg">
                    Global Lines
                  </span>
                </div>

                {/* Kandla Port */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFCFB] border border-[#D4ECE9]">
                  <div>
                    <div className="font-bold text-[#0C2422] flex items-center gap-1.5 font-display">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>Kandla Port (INIXY)</span>
                    </div>
                    <span className="text-[11px] text-[#4D6765] font-sans">Major bulk agricultural &amp; grain terminal</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg">
                    Bulk Terminal
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 3: INTERNATIONAL TIMEZONE COVERAGE DESK (Clean Light Architecture)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F4F9F8] text-[#0C2422] py-16 px-4 sm:px-6 lg:px-8 border-y border-[#D4ECE9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#D4ECE9]">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-3 shadow-xs">
                <Globe2 className="w-3.5 h-3.5" />
                <span>SYNCHRONIZED INTERNATIONAL DESK HOURS</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0C2422]">
                Trading Desk Available Across Major Financial Hubs
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#4D6765] font-sans max-w-md">
              Our export merchandising desk coordinates dynamically across world timezones to provide real-time FOB and CIF spot prices.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8">
            <div className="bg-white rounded-3xl p-5 border border-[#D4ECE9] shadow-sm hover:shadow-md transition-all duration-200">
              <span className="text-[10px] font-mono text-brand-primary font-bold uppercase block">
                INDIA HQ (IST)
              </span>
              <div className="font-mono text-2xl font-black text-[#0C2422] mt-1">
                09:00 - 19:30
              </div>
              <span className="text-xs text-[#4D6765] block mt-1 font-sans">Surat Executive Trade Desk</span>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-[#D4ECE9] shadow-sm hover:shadow-md transition-all duration-200">
              <span className="text-[10px] font-mono text-brand-primary font-bold uppercase block">
                UAE &amp; GCC (GST)
              </span>
              <div className="font-mono text-2xl font-black text-[#0C2422] mt-1">
                07:30 - 18:00
              </div>
              <span className="text-xs text-[#4D6765] block mt-1 font-sans">Dubai / Jebel Ali Coverage</span>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-[#D4ECE9] shadow-sm hover:shadow-md transition-all duration-200">
              <span className="text-[10px] font-mono text-brand-primary font-bold uppercase block">
                EUROPE &amp; UK (CET/GMT)
              </span>
              <div className="font-mono text-2xl font-black text-[#0C2422] mt-1">
                05:30 - 16:00
              </div>
              <span className="text-xs text-[#4D6765] block mt-1 font-sans">Rotterdam / London Inquiries</span>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-[#D4ECE9] shadow-sm hover:shadow-md transition-all duration-200">
              <span className="text-[10px] font-mono text-brand-primary font-bold uppercase block">
                SOUTHEAST ASIA (SGT)
              </span>
              <div className="font-mono text-2xl font-black text-[#0C2422] mt-1">
                11:30 - 22:00
              </div>
              <span className="text-xs text-[#4D6765] block mt-1 font-sans">Singapore / Vietnam / Manila</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 4: BUYER INQUIRY & TRADE FAQ ACCORDION
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-3 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>BUYER GUIDANCE &amp; PROTOCOLS</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0C2422] tracking-tight">
            Frequently Asked Commercial Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#4D6765] max-w-lg mx-auto font-sans">
            Important parameters regarding international commodity procurement, sample dispatches, and export execution.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-[#D4ECE9] overflow-hidden shadow-xs hover:border-brand-primary/40 transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-[#0C2422]"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#4D6765] shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-brand-primary' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#4D6765] leading-relaxed font-sans border-t border-[#D4ECE9]/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SECTION 5: BOTTOM ASSURANCE & FAST RFQ CALLOUT
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#021814] via-[#052822] to-[#011310] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[#00A79D]/30 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5EEAD4] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-[#5EEAD4]" />
              <span>Direct Origin Exporter • Zero Brokerage Intermediaries</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Need an Immediate Containerized CIF Quote with Live Freight?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/75 mt-1 font-sans">
              Our automated RFQ portal calculates accurate container payload, gross weight, and preliminary CIF charges.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/rfq"
              className="bg-brand-gold hover:bg-amber-400 text-[#021814] font-ui font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Open Container RFQ Form
            </Link>
            <a
              href="https://wa.me/919023363680"
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
