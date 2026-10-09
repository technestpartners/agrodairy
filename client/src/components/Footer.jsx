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
    <footer className="bg-agro-950 text-slate-300 pt-16 pb-12 border-t border-agro-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Assurance Grid */}
        <div className="bg-gradient-to-r from-agro-900 to-agro-800 rounded-3xl p-8 sm:p-10 mb-16 shadow-xl border border-agro-700/50 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              Global Commodity Dispatch Bulletin
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Stay ahead with weekly Indian crop arrivals & export rates
            </h3>
            <p className="text-agro-100 text-sm mt-2">
              Receive FOB Mundra/Kandla market indications, harvest forecasts, and trade policy updates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="bg-agro-900/80 border border-agro-600 rounded-2xl p-4 flex items-center gap-3 text-gold-300">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
                <span className="text-sm font-semibold">Thank you! You are subscribed to export bulletins.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your commercial trade email..."
                  required
                  className="bg-agro-950/70 border border-agro-700 text-white placeholder-slate-400 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 flex-1"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gold-500 hover:bg-gold-600 text-agro-950 font-bold px-6 py-3.5 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg shrink-0"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-agro-900">
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/images/logo-dark.jpg"
                alt="Agro Dairy Export LLP"
                className="h-12 w-auto object-contain rounded-lg bg-white p-1 shadow"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <span className="font-serif font-black text-xl text-white tracking-tight">AGRO DAIRY</span>
                <span className="block text-[10px] text-elysium-lime uppercase tracking-widest font-semibold">
                  Export LLP • Gujarat, India
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Premier processor and merchant exporter of certified Indian agricultural commodities and pure dairy fats. 
              Specializing in full container loads (FCL) and customized mixed containers with direct ocean sailings from Gujarat ports.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['IEC: 0817029381', 'GST: 24AAHFA3928L1Z9', 'FSSAI: 10722026000148', 'APEDA Registered', 'HACCP / ISO Compliant'].map((cert) => (
                <span key={cert} className="text-xs bg-agro-900/80 border border-agro-800 text-slate-300 px-2.5 py-1 rounded-md">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-agro-800 pb-2">
              Core Commodities
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category=dairy-ghee" className="hover:text-elysium-lime transition">Pure Cow & Buffalo Ghee</Link>
              </li>
              <li>
                <Link to="/products?category=grains-cereals" className="hover:text-elysium-lime transition">Green Millet (Pearl & Foxtail)</Link>
              </li>
              <li>
                <Link to="/products?category=grains-cereals" className="hover:text-elysium-lime transition">Sorghum (White / Yellow Jowar)</Link>
              </li>
              <li>
                <Link to="/products?category=grains-cereals" className="hover:text-elysium-lime transition">Yellow & White Maize</Link>
              </li>
              <li>
                <Link to="/products?category=peanuts-groundnuts" className="hover:text-elysium-lime transition">Bold Peanut Kernels (38/42 to 70/80)</Link>
              </li>
              <li>
                <Link to="/products?category=pulses-beans" className="hover:text-elysium-lime transition">Moong Beans & Moong Mogar</Link>
              </li>
              <li>
                <Link to="/products?category=pulses-beans" className="hover:text-elysium-lime transition">Desi & Kabuli Chickpeas</Link>
              </li>
            </ul>
          </div>

          {/* Tools & Traceability */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-agro-800 pb-2">
              Buyer Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tools/container-calculator" className="hover:text-elysium-lime transition">Container Load Calculator</Link>
              </li>
              <li>
                <Link to="/tools/landed-cost-calculator" className="hover:text-elysium-lime transition">Landed Cost Estimator</Link>
              </li>
              <li>
                <Link to="/tools/crop-calendar" className="hover:text-elysium-lime transition">Crop Harvest Calendar</Link>
              </li>
              <li>
                <Link to="/tools/hs-code-finder" className="hover:text-elysium-lime transition">HS Code Trade Reference</Link>
              </li>
              <li>
                <Link to="/quality/certifications" className="hover:text-elysium-lime transition">Verified Export Licenses</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Desk */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-agro-800 pb-2">
              Export Desk
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-elysium-lime shrink-0 mt-1" />
                <span>Office no. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-elysium-lime shrink-0" />
                <span>+91 90233 63680 (J.P. Vora)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-elysium-lime shrink-0" />
                <span>agrodairyexportllp@gmail.com</span>
              </div>
              <div className="text-xs text-slate-400 pt-1">
                Loading Ports: Hazira • Mundra • Kandla • Pipavav
              </div>
              <div className="pt-2">
                <Link
                  to="/rfq"
                  className="inline-flex items-center gap-1.5 text-elysium-yellow hover:underline font-bold text-xs uppercase tracking-wider"
                >
                  Submit Formal RFQ <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} AGRO DAIRY EXPORT LLP. All rights reserved. Registered under Ministry of Commerce & Industry, Govt. of India.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/company/about" className="hover:text-slate-200 transition">About Us</Link>
            <Link to="/products" className="hover:text-slate-200 transition">Commodity Catalog</Link>
            <Link to="/contact" className="hover:text-slate-200 transition">Contact Trade Desk</Link>
            <Link to="/admin/login" className="hover:text-elysium-lime transition">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
