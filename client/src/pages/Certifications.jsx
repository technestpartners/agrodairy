import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, CheckCircle2, Search, AlertCircle, ChevronRight, 
  Award, FileText, Calendar, ExternalLink, Sparkles, Check,
  Microscope, ArrowRight, ShieldAlert, BadgeCheck
} from 'lucide-react';
import { qualityService } from '../services/api';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    qualityService.getCertifications()
      .then(res => {
        if (res.success) setCertifications(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError('');
    setVerifyResult(null);

    try {
      const res = await qualityService.verifyCertificate(searchQuery.trim());
      if (res.success) {
        setVerifyResult(res.data);
      } else {
        setError(res.message || 'No matching active accreditation found for this query.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Certificate verification system unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      {/* Real photographic background flanks */}
      <RealProductSectionFlanks leftType="green-moong" rightType="yellow-corn" opacity="opacity-20 lg:opacity-30" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: QUALITY & CERTIFICATIONS (Clean & Minimal Home Standard)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-[#D4ECE9]">
        {/* Rich Background Elements: Trade Grid, Compass, Watermarks & Ambient Glows */}
        <PageHeroDecorations 
          topRightType="green-moong" 
          bottomLeftType="yellow-corn"
          ticker="GOVT. OF INDIA RECOGNIZED ➔ FSSAI CENTRAL ➔ APEDA ➔ ISO 22000"
          coordinates={{ lat: 'N 21.17° SURAT', lng: 'E 72.83°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-5 font-mono">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <span className="text-brand-primary font-bold">Quality &amp; Food Safety Accreditations</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                <span className="tracking-wide">STATUTORY &amp; INTERNATIONAL STANDARDS</span>
                <span className="text-[#00A79D]/40">•</span>
                <span className="text-[#4D6765] font-normal">100% Zero-Adulteration Charter</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Global Quality &amp; <span className="text-brand-primary">Food Safety Accreditations</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                Every container export from Agro Dairy Export LLP adheres to rigorous physical, microbiological, and chemical limits. Verified by in-house HPLC chromatography and accredited third-party laboratories.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/rfq"
                className="px-7 py-3.5 rounded-full bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs sm:text-sm shadow-md shadow-brand-primary/25 hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Request Lot Specification</span>
                <ArrowRight className="w-4 h-4 text-brand-gold" />
              </Link>
              <a
                href="https://wa.me/919023363680?text=Hello%20Agro%20Dairy,%20I%20would%20like%20to%20verify%20export%20certification%20and%20COA."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 font-ui font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <span>WhatsApp Trade Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          LIVE ACCREDITATION VERIFICATION DESK CARD (Clean Home-Page Card Style)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white text-[#0C2422] rounded-3xl p-6 sm:p-10 shadow-xl border border-[#D4ECE9] space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-2 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                <span>GOVERNMENT &amp; INTERNATIONAL REGISTRY</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0C2422] tracking-tight">
                Live Certificate &amp; License Verification Desk
              </h2>
              <p className="text-xs sm:text-sm text-[#4D6765] mt-1 max-w-xl font-sans leading-relaxed">
                Search by regulatory body or certificate code (e.g. <strong>APEDA</strong>, <strong>FSSAI</strong>, <strong>ISO</strong>, <strong>FDA</strong>, <strong>HALAL</strong>, or <strong>KOSHER</strong>) to confirm validity.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-[#00A79D] bg-[#F4F9F8] px-4 py-2 rounded-2xl border border-[#D4ECE9]">
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> All Certificates Active
              </span>
              <span>•</span>
              <span className="text-slate-600 font-semibold">Annual Audit Cleared</span>
            </div>
          </div>

          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3 max-w-3xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certification title, code, or authority..."
                className="w-full bg-[#F8FAF9] border border-[#D4ECE9] text-[#0C2422] placeholder:text-slate-400 pl-11 pr-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-sm px-8 py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow-md shrink-0 disabled:opacity-60"
            >
              {loading ? 'Verifying Registry...' : 'Verify License'}
            </button>
          </form>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 text-xs max-w-3xl flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {verifyResult && (
            <div className="bg-[#F8FAF9] text-slate-900 rounded-3xl p-6 sm:p-8 max-w-3xl shadow-sm border border-[#D4ECE9] space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D4ECE9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-xl text-[#0C2422]">{verifyResult.title}</h4>
                    <span className="text-xs text-[#4D6765] font-sans">{verifyResult.issuing_body}</span>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {verifyResult.status || 'Active & Valid'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono pt-1">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Certificate Code:</span>
                  <span className="font-bold text-slate-900 text-sm">{verifyResult.certificate_no || 'Standard Registry'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Issuing Body:</span>
                  <span className="font-bold text-slate-900 truncate block">{verifyResult.issuing_body}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Issue Date:</span>
                  <span className="font-bold text-slate-700">{verifyResult.issue_date || 'Active'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Expiry / Renewal:</span>
                  <span className="font-bold text-slate-700">{verifyResult.expiry_date || 'Standard Validity'}</span>
                </div>
              </div>

              <p className="text-xs text-[#4D6765] pt-3 border-t border-[#D4ECE9] leading-relaxed font-sans">
                {verifyResult.description}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          OFFICIAL ACCREDITATIONS & LICENSES GRID (Clean White Cards)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-3 shadow-xs">
            <BadgeCheck className="w-3.5 h-3.5 text-brand-primary" />
            <span>CERTIFIED FOOD SAFETY FRAMEWORK</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0C2422] tracking-tight">
            Official Accreditations &amp; <span className="text-brand-primary">Export Licenses</span>
          </h2>
          <p className="text-base text-[#4D6765] mt-2 max-w-2xl font-sans leading-relaxed">
            Our facilities comply with strict statutory norms under the Ministry of Commerce &amp; Industry (Govt. of India) and international food safety councils.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map(cert => (
            <div 
              key={cert.id} 
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D4ECE9] shadow-sm hover:shadow-md hover:border-brand-primary/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center font-extrabold border border-[#BBE5E1] group-hover:bg-[#002B26] group-hover:text-white transition-colors duration-300">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold uppercase">
                    {cert.status || 'Active'}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-[#0C2422] group-hover:text-brand-primary transition-colors">
                  {cert.title}
                </h3>
                <span className="text-[11px] font-mono text-brand-primary block mt-1 font-bold">
                  {cert.issuing_body}
                </span>

                <p className="text-xs text-[#4D6765] mt-2.5 leading-relaxed font-sans line-clamp-3">
                  {cert.description}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3 mt-4 text-xs font-mono space-y-1 text-slate-500">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-400">Cert / Reg No:</span>
                  <span className="font-bold text-slate-900">{cert.certificate_no || 'Verified on File'}</span>
                </div>
                {cert.expiry_date && (
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Validity:</span>
                    <span className="text-slate-700 font-semibold">{new Date(cert.expiry_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          LABORATORY PROTOCOL & TESTING CAPABILITIES (Clean Mint Section)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F4F9F8] text-[#0C2422] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-[#D4ECE9]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-3 shadow-xs">
              <Microscope className="w-3.5 h-3.5 text-brand-primary" />
              <span>IN-HOUSE QA PROTOCOLS</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0C2422] tracking-tight">
              Strict European-Grade Aflatoxin &amp; <span className="text-brand-primary">Microbiological Limits</span>
            </h2>
            <p className="text-base text-[#4D6765] mt-3 leading-relaxed font-sans">
              All peanut, sesame, and grain shipments undergo High-Performance Liquid Chromatography (HPLC) testing prior to port dispatch. We guarantee complete compliance with European Commission Regulation (EC) 1881/2006.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D4ECE9] shadow-sm hover:shadow-md transition-all">
              <span className="text-[10px] font-mono font-bold text-brand-primary uppercase block">
                PEANUT MYCOTOXINS
              </span>
              <div className="font-display font-black text-2xl text-[#0C2422] mt-1">
                &lt; 2.0 ppb
              </div>
              <p className="text-xs text-[#4D6765] mt-2 font-sans leading-relaxed">
                Aflatoxin B1 guarantee for EU and Japanese direct food manufacturing.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D4ECE9] shadow-sm hover:shadow-md transition-all">
              <span className="text-[10px] font-mono font-bold text-brand-primary uppercase block">
                SORTEX PURITY
              </span>
              <div className="font-display font-black text-2xl text-[#0C2422] mt-1">
                99.5% - 99.9%
              </div>
              <p className="text-xs text-[#4D6765] mt-2 font-sans leading-relaxed">
                Buhler Sortex optical sorters eliminating foreign matter and discoloration.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D4ECE9] shadow-sm hover:shadow-md transition-all">
              <span className="text-[10px] font-mono font-bold text-brand-primary uppercase block">
                MOISTURE CONTROL
              </span>
              <div className="font-display font-black text-2xl text-[#0C2422] mt-1">
                &lt; 7.0% Max
              </div>
              <p className="text-xs text-[#4D6765] mt-2 font-sans leading-relaxed">
                Humidity-controlled mechanical drying preventing mould and fungal germination during transit.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D4ECE9] shadow-sm hover:shadow-md transition-all">
              <span className="text-[10px] font-mono font-bold text-brand-primary uppercase block">
                CONTAINER DESICCANTS
              </span>
              <div className="font-display font-black text-2xl text-[#0C2422] mt-1">
                12-Point Dry
              </div>
              <p className="text-xs text-[#4D6765] mt-2 font-sans leading-relaxed">
                High-absorption calcium chloride / silica gel desiccants hung in every ocean container.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          BOTTOM ASSURANCE CTA (Signature Clean Dark Pine Section)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#021814] via-[#052822] to-[#011310] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[#00A79D]/30 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5EEAD4] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-[#5EEAD4]" />
              <span>Third-Party Independent Inspection Welcome</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Require Pre-Shipment Inspection by SGS, Bureau Veritas or Eurofins?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/75 mt-2 font-sans leading-relaxed">
              We welcome buyer-nominated inspection agencies to draw independent lot samples and verify container stuffing seals prior to ocean dispatch.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/rfq"
              className="bg-brand-gold hover:bg-amber-400 text-[#002B26] font-ui font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Request Formal RFQ
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/15 text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-white/20 transition-all"
            >
              Contact Quality Lead
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
