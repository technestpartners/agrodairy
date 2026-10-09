import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Phone, Mail, MapPin, Send, ArrowRight, 
  ExternalLink, CheckCircle2, Award
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
    <footer className="site-footer bg-[#f7fafc] text-slate-600 border-t border-slate-200">
      {/* Upper Newsletter Ribbon */}
      <div className="bg-[#13612e] text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-elysium-lime text-xs font-bold uppercase tracking-wider block font-ui mb-1">
              Export Bulletin & Crop Arrivals
            </span>
            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
              Stay ahead with weekly Indian crop arrivals & container FOB rates
            </h3>
            <p className="text-xs text-slate-200 mt-1">
              Receive FOB Mundra/Hazira market indications, Gujarat harvest forecasts, and trade policy notices.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="bg-white/10 border border-white/20 rounded-full px-5 py-3 flex items-center gap-2 text-white text-xs">
                <CheckCircle2 className="w-4 h-4 text-elysium-lime" />
                <span>Subscribed! You will receive our next export bulletin.</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your commercial email..."
                  required
                  className="bg-white text-slate-900 placeholder-slate-400 px-4 py-3 rounded-full text-xs flex-1 focus:outline-none focus:ring-2 focus:ring-elysium-yellow border-0"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-elysium-yellow hover:bg-elysium-yellowhover text-slate-900 font-bold px-6 py-3 rounded-full text-xs transition duration-200 shrink-0 font-ui shadow-sm"
                >
                  {loading ? 'Sending...' : 'Subscribe'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main 5-Column Grid exactly like Elysium Agrico */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/images/logo-light.jpg"
                alt="Agro Dairy Export LLP"
                className="h-14 w-auto object-contain rounded-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <span className="font-serif font-black text-lg text-slate-900 block leading-tight">AGRO DAIRY</span>
                <span className="text-[10px] text-elysium-green font-bold uppercase tracking-wider block font-ui">
                  EXPORT LLP • GUJARAT
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed">
              Agro Dairy Export LLP is an agro commodities exporter headquartered in Surat, Gujarat, India, shipping to 50+ countries.
            </p>
            <div className="text-[11px] text-slate-500 space-y-1 pt-1 font-mono">
              <div>IEC: <strong>0817029381</strong></div>
              <div>GST: <strong>24AAHFA3928L1Z9</strong></div>
              <div>FSSAI: <strong>10722026000148</strong></div>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h4 className="text-slate-900 font-serif font-bold text-sm mb-4 border-b border-slate-200 pb-2">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs font-ui">
              <li><Link to="/company/about" className="hover:text-elysium-green transition">About Us</Link></li>
              <li><Link to="/products" className="hover:text-elysium-green transition">Our Products</Link></li>
              <li><Link to="/quality/certifications" className="hover:text-elysium-green transition">Quality Certificates</Link></li>
              <li><Link to="/quality/certifications" className="hover:text-elysium-green transition">Verify Agro Dairy</Link></li>
              <li><Link to="/tools/container-calculator" className="hover:text-elysium-green transition">Buyer Tools</Link></li>
              <li><Link to="/contact" className="hover:text-elysium-green transition">Contact Desk</Link></li>
            </ul>
          </div>

          {/* Column 3: Markets We Serve */}
          <div>
            <h4 className="text-slate-900 font-serif font-bold text-sm mb-4 border-b border-slate-200 pb-2">
              Markets We Serve
            </h4>
            <ul className="space-y-2 text-xs font-ui">
              <li><Link to="/#export-markets" className="hover:text-elysium-green transition">Middle East</Link></li>
              <li><Link to="/#export-markets" className="hover:text-elysium-green transition">Europe</Link></li>
              <li><Link to="/#export-markets" className="hover:text-elysium-green transition">Asia Pacific</Link></li>
              <li><Link to="/#export-markets" className="hover:text-elysium-green transition">South Asia</Link></li>
              <li><Link to="/#export-markets" className="hover:text-elysium-green transition">Africa</Link></li>
              <li><Link to="/#export-markets" className="hover:text-elysium-green transition">Central Asia and Russia</Link></li>
            </ul>
          </div>

          {/* Column 4: Buyer Tools */}
          <div>
            <h4 className="text-slate-900 font-serif font-bold text-sm mb-4 border-b border-slate-200 pb-2">
              Trade Calculations
            </h4>
            <ul className="space-y-2 text-xs font-ui">
              <li><Link to="/tools/container-calculator" className="hover:text-elysium-green transition">Container Load Calculator</Link></li>
              <li><Link to="/tools/landed-cost-calculator" className="hover:text-elysium-green transition">Landed Cost Calculator</Link></li>
              <li><Link to="/tools/crop-calendar" className="hover:text-elysium-green transition">Crop Harvest Calendar</Link></li>
              <li><Link to="/tools/hs-code-finder" className="hover:text-elysium-green transition">HS Code Finder</Link></li>
              <li><Link to="/rfq" className="hover:text-elysium-green transition font-bold text-elysium-green">Request a Quote (RFQ) →</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact Desk (Exact Visiting Card) */}
          <div>
            <h4 className="text-slate-900 font-serif font-bold text-sm mb-4 border-b border-slate-200 pb-2">
              Export Desk Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-elysium-green shrink-0 mt-0.5" />
                <span>Office no. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-elysium-green shrink-0" />
                <a href="tel:+919023363680" className="hover:text-elysium-green font-bold">+91 90233 63680 (J.P. Vora)</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-elysium-green shrink-0" />
                <a href="mailto:agrodairyexportllp@gmail.com" className="hover:text-elysium-green">agrodairyexportllp@gmail.com</a>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/919023363680?text=Hello%20J.P.%20Vora,%20I%20am%20inquiring%20about%20Agro%20Dairy%20export%20commodities."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-ui font-bold text-xs px-4 py-2 rounded-full transition shadow-sm"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-200 bg-slate-100/70 py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            &copy; {new Date().getFullYear()} AGRO DAIRY EXPORT LLP. All rights reserved. Registered under Ministry of Commerce & Industry, Govt. of India.
          </div>
          <div className="flex items-center gap-6 font-ui">
            <Link to="/company/about" className="hover:text-slate-800 transition">About Us</Link>
            <Link to="/products" className="hover:text-slate-800 transition">Products</Link>
            <Link to="/contact" className="hover:text-slate-800 transition">Contact</Link>
            <Link to="/admin/login" className="hover:text-elysium-green transition">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
