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
              <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center text-agro-950 font-extrabold text-lg">
                AD
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-tight">AGRO DAIRY</span>
                <span className="block text-[10px] text-gold-400 uppercase tracking-widest font-semibold">
                  Export Platform • India
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Leading processor and bulk exporter of premium Indian agricultural commodities and dairy derivatives. 
              Delivering containerized and bulk vessel shipments to 40+ destinations worldwide with farm-to-port traceability.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['APEDA Certified', 'FSSAI Licensed', 'ISO 22000', 'HACCP Compliant', 'Halal Verified', 'Kosher Certified'].map((cert) => (
                <span key={cert} className="text-xs bg-agro-900/80 border border-agro-800 text-slate-300 px-2.5 py-1 rounded-md">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-agro-800 pb-2">
              Export Lines
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category=peanuts" className="hover:text-gold-300 transition">Peanuts & Kernels</Link>
              </li>
              <li>
                <Link to="/products?category=sesame-seeds" className="hover:text-gold-300 transition">Sesame Seeds (Hulled & Natural)</Link>
              </li>
              <li>
                <Link to="/products?category=whole-spices" className="hover:text-gold-300 transition">Whole & Ground Spices</Link>
              </li>
              <li>
                <Link to="/products?category=pulses-beans" className="hover:text-gold-300 transition">Chickpeas & Pulses</Link>
              </li>
              <li>
                <Link to="/products?category=grains-cereals" className="hover:text-gold-300 transition">Grains & Basmati Rice</Link>
              </li>
              <li>
                <Link to="/products?category=dairy-derivatives" className="hover:text-gold-300 transition">Dairy Powders & Ghee</Link>
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
                <Link to="/tools/container-calculator" className="hover:text-gold-300 transition">Container Load Calculator</Link>
              </li>
              <li>
                <Link to="/tools/landed-cost-calculator" className="hover:text-gold-300 transition">Landed Cost Estimator</Link>
              </li>
              <li>
                <Link to="/tools/crop-calendar" className="hover:text-gold-300 transition">Crop Harvest Calendar</Link>
              </li>
              <li>
                <Link to="/tools/hs-code-finder" className="hover:text-gold-300 transition">HS Code Trade Reference</Link>
              </li>
              <li>
                <Link to="/quality/traceability" className="hover:text-gold-300 transition">Verify QR / Batch Code</Link>
              </li>
              <li>
                <Link to="/quality/certifications" className="hover:text-gold-300 transition">Verify Certificates</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Desk */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-agro-800 pb-2">
              Trade Desk
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <span>NH-27 Agro Industrial Corridor, Rajkot - 360002, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 98250 12345 (Sales Desk)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>exports@agrodairy.com</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/rfq"
                  className="inline-flex items-center gap-1.5 text-gold-300 hover:text-gold-200 font-bold text-xs uppercase tracking-wider"
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
            &copy; {new Date().getFullYear()} Agro Dairy Export Platform. All global rights reserved. Powered by Node.js & React.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/admin/login" className="hover:text-gold-300 transition">Staff Portal</Link>
            <Link to="/company/about" className="hover:text-slate-200 transition">About Us</Link>
            <Link to="/logistics" className="hover:text-slate-200 transition">Port Terminals</Link>
            <Link to="/contact" className="hover:text-slate-200 transition">Compliance Inquiry</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
