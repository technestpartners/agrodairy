import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Phone, Mail, MapPin, Send, ArrowRight, 
  ExternalLink, CheckCircle2, Award
} from 'lucide-react';
import { companyService } from '../services/api';
import { WheatStalkSvg, DairyGheeDropletSvg, PeanutPodSvg } from './ProductBackgroundDecorations';

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
    <footer className="bg-brand-deep text-slate-300 border-t border-white/10 relative overflow-hidden bg-agro-decor-deep">
      {/* Background custom product motifs in footer */}
      <div className="absolute -left-12 bottom-10 pointer-events-none transform -rotate-12">
        <WheatStalkSvg className="w-52 h-52 text-brand-primary" opacity="0.05" />
      </div>
      <div className="absolute -right-8 top-32 pointer-events-none transform rotate-12">
        <DairyGheeDropletSvg className="w-44 h-44 text-brand-gold" opacity="0.08" />
      </div>
      {/* Upper Newsletter Ribbon */}
      <div className="bg-[#08221F] border-b border-white/10 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle ambient blur */}
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-[#5EEAD4] text-xs font-bold uppercase tracking-wider block font-ui mb-1.5 flex items-center justify-center lg:justify-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4]" />
              Export Bulletin &amp; Crop Arrivals
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug">
              Stay ahead with weekly Indian crop arrivals &amp; container FOB rates
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Receive FOB Mundra/Hazira market indications, Gujarat harvest forecasts, and trade policy notices.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="bg-white/10 border border-[#5EEAD4]/40 rounded-full px-5 py-3.5 flex items-center gap-2 text-white text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#5EEAD4] shrink-0" />
                <span>Subscribed! You will receive our next export bulletin.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your commercial email..."
                  required
                  className="bg-white/10 text-white placeholder-slate-400 px-5 py-3.5 rounded-full text-xs sm:text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#5EEAD4] border border-white/20 backdrop-blur-sm transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold px-7 py-3.5 rounded-full text-xs sm:text-sm transition-all duration-200 shrink-0 shadow-md shadow-brand-primary/25 flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <span>{loading ? 'Sending...' : 'Subscribe'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main 5-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl inline-flex items-center shadow-md">
                <img
                  src="/images/logo.png"
                  alt="Agro Dairy Export LLP Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-black text-lg text-white block leading-tight">
                  <span className="text-brand-primary">AGRO</span> DAIRY
                </span>
                <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider block font-ui">
                  EXPORT LLP • GUJARAT
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-300/80 leading-relaxed">
              Agro Dairy Export LLP is an agro commodities exporter headquartered in Surat, Gujarat, India, shipping to 50+ countries.
            </p>
            <div className="text-[11px] text-slate-400 space-y-1 pt-1 font-mono">
              <div>IEC: <strong className="text-slate-200">0817029381</strong></div>
              <div>GST: <strong className="text-slate-200">24AAHFA3928L1Z9</strong></div>
              <div>FSSAI: <strong className="text-slate-200">10722026000148</strong></div>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm mb-4 border-b border-white/10 pb-2">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs font-ui">
              <li><Link to="/company/about" className="hover:text-brand-primary transition">About Us</Link></li>
              <li><Link to="/products" className="hover:text-brand-primary transition">Our Products</Link></li>
              <li><Link to="/gallery" className="hover:text-brand-primary transition">Export Gallery</Link></li>
              <li><Link to="/quality/certifications" className="hover:text-brand-primary transition">Quality Certificates</Link></li>
              <li><Link to="/tools/container-calculator" className="hover:text-brand-primary transition">Container Calculator</Link></li>
              <li><Link to="/contact" className="hover:text-brand-primary transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Markets We Serve */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm mb-4 border-b border-white/10 pb-2">
              Markets We Serve
            </h4>
            <ul className="space-y-2 text-xs font-ui">
              <li><Link to="/#export-markets" className="hover:text-brand-primary transition">Middle East (GCC)</Link></li>
              <li><Link to="/#export-markets" className="hover:text-brand-primary transition">Europe & UK</Link></li>
              <li><Link to="/#export-markets" className="hover:text-brand-primary transition">Southeast Asia & ASEAN</Link></li>
              <li><Link to="/#export-markets" className="hover:text-brand-primary transition">South Asia & Far East</Link></li>
              <li><Link to="/#export-markets" className="hover:text-brand-primary transition">Africa & Maghreb</Link></li>
              <li><Link to="/#export-markets" className="hover:text-brand-primary transition">Central Asia & CIS</Link></li>
            </ul>
          </div>

          {/* Column 4: Buyer Tools */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm mb-4 border-b border-white/10 pb-2">
              Trade Calculations
            </h4>
            <ul className="space-y-2 text-xs font-ui">
              <li><Link to="/tools/container-calculator" className="hover:text-brand-primary transition">Container Load Calculator</Link></li>
              <li><Link to="/tools/landed-cost-calculator" className="hover:text-brand-primary transition">Landed Cost Calculator</Link></li>
              <li><Link to="/tools/crop-calendar" className="hover:text-brand-primary transition">Crop Harvest Calendar</Link></li>
              <li><Link to="/tools/hs-code-finder" className="hover:text-brand-primary transition">HS Code Finder</Link></li>
              <li><Link to="/rfq" className="hover:text-brand-gold transition font-bold text-brand-primary">Request a Quote (RFQ) →</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact Desk (Exact Visiting Card) */}
          <div>
            <h4 className="text-white font-serif font-bold text-sm mb-4 border-b border-white/10 pb-2">
              Export Desk Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-slate-300">Office no. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                <a href="tel:+919023363680" className="hover:text-brand-primary text-white font-bold">+91 90233 63680 (J.P. Vora)</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                <a href="mailto:agrodairyexportllp@gmail.com" className="hover:text-brand-primary text-slate-300">agrodairyexportllp@gmail.com</a>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/919023363680?text=Hello%20J.P.%20Vora,%20I%20am%20inquiring%20about%20Agro%20Dairy%20export%20commodities."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-ui font-bold text-xs px-4 py-2 rounded-full transition shadow-sm"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/10 bg-[#002622] py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            &copy; {new Date().getFullYear()} AGRO DAIRY EXPORT LLP. All rights reserved. Registered under Ministry of Commerce & Industry, Govt. of India.
          </div>
          <div className="flex items-center gap-6 font-ui">
            <Link to="/company/about" className="hover:text-white transition">About Us</Link>
            <Link to="/products" className="hover:text-white transition">Products</Link>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
            <Link to="/admin/login" className="hover:text-brand-primary transition">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
