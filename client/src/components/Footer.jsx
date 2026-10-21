import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Phone, Mail, MapPin, Send, ArrowRight, 
  CheckCircle2, MessageCircle, ChevronRight, Globe2, Ship,
  Clock, Award, ExternalLink
} from 'lucide-react';
import { companyService } from '../services/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await companyService.subscribeNewsletter({ email });
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-[#F4F9F8] overflow-hidden pt-12 sm:pt-16">
      {/* ═══════════════════════════════════════
          SECTION A: UNIQUELY SHAPED FLOATING TRADE CAPSULE
          ═══════════════════════════════════════ */}
      <div className="section-container relative z-20 -mb-24 sm:-mb-28 lg:-mb-32 px-4 sm:px-6">
        <div className="relative rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-[#062B24] via-[#0B3A32] to-[#041D18] p-8 sm:p-12 lg:p-16 text-white shadow-[0_24px_64px_rgba(0,35,30,0.35)] border border-[#00A79D]/35">
          {/* Subtle geometric dot grid pattern */}
          <div 
            className="absolute inset-0 bg-[radial-gradient(#00A79D_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" 
            aria-hidden="true" 
          />

          {/* Ambient luminous radial glow orbs */}
          <div 
            className="absolute -top-20 -right-20 w-80 h-80 bg-[#00A79D]/25 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#F5B800]/15 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#5EEAD4] text-xs font-mono uppercase tracking-wider mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
              <span>Verified Trade Intelligence • Weekly Crop Arrivals</span>
            </div>

            {/* Gradient Heading */}
            <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-[#5EEAD4] tracking-tight leading-tight">
              Stay ahead with weekly Indian crop arrivals &amp; container FOB rates
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-emerald-100/75 mt-3 leading-relaxed font-sans max-w-xl mx-auto">
              Receive verified FOB Mundra/Hazira market indications, Gujarat harvest arrivals (Peanuts, Ghee, Pulses, Grains), and trade policy notices.
            </p>

            {/* Floating Glassmorphism Input Pill */}
            <form onSubmit={handleSubscribe} className="mt-8 max-w-md mx-auto">
              {subscribed ? (
                <div className="bg-white/10 border border-emerald-400/40 rounded-full px-6 py-4 flex items-center justify-center gap-3 text-white text-xs sm:text-sm backdrop-blur-md shadow-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="font-semibold">Subscribed! You will receive our next export bulletin.</span>
                </div>
              ) : (
                <div className="p-1.5 rounded-full bg-white/[0.08] border border-white/25 backdrop-blur-md shadow-2xl focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/25 transition-all flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center gap-2.5 px-4 py-2 flex-1">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your commercial email..."
                      required
                      className="w-full bg-transparent text-white placeholder-emerald-100/40 text-xs sm:text-sm focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-brand-primary to-[#008f86] hover:from-brand-primary-dark hover:to-brand-primary text-white font-ui font-bold text-xs sm:text-sm shadow-lg shadow-brand-primary/30 transition-all duration-200 flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50 group"
                  >
                    <span>{loading ? 'Subscribing...' : 'Subscribe Free'}</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              )}
            </form>

            {/* Trust Perks Ticker */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-[11px] font-mono text-emerald-300/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Weekly FOB Price Sheets
              </span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> APMC Gujarat Mandi Arrivals
              </span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Direct Importers Only
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          SECTION B: UNIQUELY ARCHED LUXURY FOOTER
          ═══════════════════════════════════════ */}
      <div className="relative bg-gradient-to-b from-[#021814] via-[#041F1A] to-[#010D0B] text-slate-300 pt-36 sm:pt-42 lg:pt-48 pb-12 overflow-hidden rounded-t-[3.5rem] sm:rounded-t-[5rem] lg:rounded-t-[6.5rem] border-t border-[#00A79D]/30 shadow-[0_-25px_60px_rgba(0,0,0,0.35)]">
        {/* Giant Architectural Watermark Typography */}
        <div 
          className="absolute bottom-16 left-1/2 -translate-x-1/2 font-display font-black text-[5rem] sm:text-[9rem] lg:text-[13rem] text-white/[0.025] tracking-tighter whitespace-nowrap select-none pointer-events-none"
          aria-hidden="true"
        >
          AGRO DAIRY EXPORT
        </div>

        {/* Ambient background glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="section-container relative z-10">
          {/* Top Brand Identity & WhatsApp Callout Banner */}
          <div className="pb-12 mb-12 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Logo and Brand Statement */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
              <Link to="/" className="bg-white p-2.5 rounded-2xl shadow-xl inline-flex items-center shrink-0 border border-white/20 group">
                <img
                  src="/images/logo.png"
                  alt="Agro Dairy Export LLP Logo"
                  className="h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-serif font-black text-xl text-white tracking-tight leading-none">
                    <span className="text-brand-primary">AGRO</span> DAIRY
                  </span>
                  <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold/10 border border-brand-gold/25 font-mono">
                    GOVT. RECOGNISED MERCHANT
                  </span>
                </div>
                <p className="text-xs text-slate-300/80 mt-1.5 font-sans max-w-lg leading-relaxed">
                  Agro Dairy Export LLP is an agro &amp; dairy commodities exporter based in Surat, Gujarat. Delivering origin-direct shipments to 40+ countries.
                </p>
              </div>
            </div>

            {/* Direct WhatsApp & Telephone Action Desk */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/919023363680?text=Hello%20J.P.%20Vora,%20I%20am%20inquiring%20about%20Agro%20Dairy%20export%20commodities."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1fb857] text-white font-ui font-bold text-xs px-5 py-3 rounded-full transition-all duration-200 shadow-lg shadow-[#25D366]/20 group"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat with Export Desk (WhatsApp)</span>
              </a>
              <a
                href="tel:+919023363680"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-ui font-semibold text-xs px-4 py-3 rounded-full border border-white/15 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-brand-primary" />
                <span>+91 90233 63680 (J.P. Vora)</span>
              </a>
            </div>
          </div>

          {/* 4 Sculpted Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pb-12 border-b border-white/10">
            {/* Card 1: Export Commodity Catalog */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-brand-primary/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between">
              <div>
                <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-brand-primary/30 flex items-center justify-between">
                  <span>Export Commodities</span>
                  <span className="text-[10px] font-mono text-brand-primary">CATALOG</span>
                </h4>
                <ul className="space-y-2.5 text-xs font-sans text-slate-300">
                  <li>
                    <Link to="/products" className="hover:text-emerald-300 transition-colors flex items-center justify-between group">
                      <span>Bold Peanuts (38/42 to 70/80)</span>
                      <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="hover:text-emerald-300 transition-colors flex items-center justify-between group">
                      <span>Pure Cow &amp; Buffalo Ghee</span>
                      <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="hover:text-emerald-300 transition-colors flex items-center justify-between group">
                      <span>Green Pearl Millet &amp; Sorghum</span>
                      <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="hover:text-emerald-300 transition-colors flex items-center justify-between group">
                      <span>Desi &amp; Kabuli Chickpeas</span>
                      <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="hover:text-emerald-300 transition-colors flex items-center justify-between group">
                      <span>Yellow Maize &amp; Pulses</span>
                      <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="pt-4 mt-3 border-t border-white/5">
                <Link to="/products" className="text-brand-gold hover:text-amber-300 text-xs font-semibold transition-colors flex items-center gap-1 group">
                  <span>Mixed Container Loads</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 2: Buyer & Trade Tools */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-brand-primary/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between">
              <div>
                <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-brand-primary/30 flex items-center justify-between">
                  <span>Buyer &amp; Trade Tools</span>
                  <span className="text-[10px] font-mono text-brand-primary">PORTAL</span>
                </h4>
                <ul className="space-y-2.5 text-xs font-sans text-slate-300">
                  <li>
                    <Link to="/tools/container-calculator" className="hover:text-emerald-300 transition-colors flex items-center justify-between group">
                      <span>Container Load Calculator</span>
                      <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/tools/landed-cost-calculator" className="hover:text-emerald-300 transition-colors flex items-center justify-between group">
                      <span>Landed Cost Calculator</span>
                      <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/tools/crop-calendar" className="hover:text-emerald-300 transition-colors flex items-center justify-between group">
                      <span>Crop Harvest Calendar</span>
                      <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/tools/hs-code-finder" className="hover:text-emerald-300 transition-colors flex items-center justify-between group">
                      <span>HS Code &amp; Tariff Directory</span>
                      <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/quality/certifications" className="hover:text-emerald-300 transition-colors flex items-center justify-between group">
                      <span>Quality &amp; Lab Certifications</span>
                      <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="pt-4 mt-3 border-t border-white/5">
                <Link to="/rfq" className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold transition-colors flex items-center gap-1 group">
                  <span>Request Formal RFQ</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 3: Global Discharge Ports */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-brand-primary/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between">
              <div>
                <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-brand-primary/30 flex items-center justify-between">
                  <span>Markets &amp; Gateways</span>
                  <span className="text-[10px] font-mono text-brand-primary">PORTS</span>
                </h4>
                <ul className="space-y-2.5 text-xs font-sans text-slate-300">
                  <li className="flex items-center justify-between">
                    <span>Middle East &amp; GCC</span>
                    <span className="text-[10px] font-mono text-emerald-400">Jebel Ali / Dammam</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Southeast Asia &amp; ASEAN</span>
                    <span className="text-[10px] font-mono text-emerald-400">Haiphong / Manila</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Europe &amp; UK</span>
                    <span className="text-[10px] font-mono text-emerald-400">Rotterdam / Mersin</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>South Asia &amp; Africa</span>
                    <span className="text-[10px] font-mono text-emerald-400">Chittagong / Mombasa</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 mt-3 border-t border-white/5">
                <div className="text-[10px] font-mono text-brand-gold uppercase tracking-wider font-bold mb-0.5">
                  Direct Origin Sea Ports:
                </div>
                <div className="text-[11px] text-white/80">
                  Mundra • Kandla • Hazira
                </div>
              </div>
            </div>

            {/* Card 4: Corporate Headquarters */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-brand-primary/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between">
              <div>
                <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-brand-primary/30 flex items-center justify-between">
                  <span>Export Headquarters</span>
                  <span className="text-[10px] font-mono text-brand-primary">SURAT</span>
                </h4>
                <div className="space-y-2.5 text-xs font-sans">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    <span className="text-slate-300 leading-snug">
                      Office no. -701, THE FUTURE CORNER, Sarthana, Surat-395013, Gujarat, India
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                    <a href="tel:+919023363680" className="hover:text-emerald-300 text-white font-bold transition-colors">
                      +91 90233 63680 (J.P. Vora)
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                    <a href="mailto:agrodairyexportllp@gmail.com" className="hover:text-emerald-300 text-slate-300 transition-colors break-all">
                      agrodairyexportllp@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-white/5 text-[10px] font-mono text-slate-400 space-y-0.5">
                <div>IEC: <strong className="text-slate-200">0817029381</strong> (DGFT)</div>
                <div>GSTIN: <strong className="text-slate-200">24AAHFA3928L1Z9</strong></div>
                <div>FSSAI: <strong className="text-slate-200">10722026000148</strong></div>
              </div>
            </div>
          </div>

          {/* Bottom Legal, Accreditation & Live Status Bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans">
            <div className="flex flex-wrap items-center gap-2 text-center md:text-left">
              <span>&copy; {new Date().getFullYear()} AGRO DAIRY EXPORT LLP. All rights reserved.</span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="text-slate-400">Registered under Ministry of Commerce &amp; Industry, Govt. of India.</span>
            </div>

            <div className="flex items-center gap-5 font-mono text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Port Dispatch: Active</span>
              </div>
              <span className="text-white/20">•</span>
              <Link to="/company/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/products" className="hover:text-white transition-colors">Products</Link>
              <Link to="/quality/certifications" className="hover:text-white transition-colors">Certifications</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link to="/admin/login" className="hover:text-brand-primary transition-colors">Staff</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
