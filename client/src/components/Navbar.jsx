import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Phone, Mail, ShieldCheck, ChevronDown, 
  Search, ArrowRight, Layers, Calculator, FileText, CheckCircle2,
  Package, MapPin, Globe2
} from 'lucide-react';
import { productsService } from '../services/api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    productsService.getCategories()
      .then(res => {
        if (res.success) setCategories(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200 transition-all">
      {/* Top Bar - Elysium Style Lime Green Banner */}
      <div className="bg-elysium-lime text-elysium-dark text-xs py-2 px-4 font-ui font-semibold">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 font-bold text-slate-900">
              <ShieldCheck className="w-3.5 h-3.5 text-elysium-dark" />
              AGRO DAIRY EXPORT LLP • Surat, Gujarat, India
            </span>
            <span className="hidden md:inline-block text-elysium-green">|</span>
            <span className="hidden md:inline-block text-slate-800">
              Direct Shipments via Mundra, Kandla & Hazira Ports
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-900">
            <a 
              href="tel:+919023363680" 
              className="hover:text-white transition flex items-center gap-1 font-bold"
            >
              <Phone className="w-3 h-3 text-elysium-dark" />
              +91 90233 63680 (J.P. Vora)
            </a>
            <span className="text-elysium-green">|</span>
            <a 
              href="mailto:agrodairyexportllp@gmail.com" 
              className="hover:text-white transition flex items-center gap-1 font-bold"
            >
              <Mail className="w-3 h-3 text-elysium-dark" />
              agrodairyexportllp@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-14 w-auto flex items-center">
              <img 
                src="/images/logo-light.jpg" 
                alt="Agro Dairy Export LLP" 
                className="h-12 w-auto object-contain rounded-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/logo.png';
                }}
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-elysium-dark block leading-tight">
                AGRO DAIRY
              </span>
              <span className="text-[10px] tracking-widest text-elysium-green font-bold uppercase block font-ui">
                EXPORT LLP • GUJARAT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-ui font-semibold text-sm">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-lg transition ${
                location.pathname === '/' ? 'text-elysium-green bg-elysium-tint' : 'text-slate-700 hover:text-elysium-green hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* Commodities Dropdown */}
            <div className="relative group">
              <Link 
                to="/products" 
                className={`px-3 py-2 rounded-lg flex items-center gap-1 transition ${
                  location.pathname.startsWith('/products') || location.pathname.startsWith('/categories')
                    ? 'text-elysium-green bg-elysium-tint' 
                    : 'text-slate-700 hover:text-elysium-green hover:bg-slate-50'
                }`}
              >
                Commodities
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-elysium-green group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              
              <div className="absolute left-0 top-full pt-2 w-80 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 overflow-hidden">
                  <div className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                    Core Export Lines
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/products?category=dairy-products"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-elysium-tint hover:text-elysium-dark transition"
                    >
                      <span className="font-bold text-elysium-green">Pure Cow & Buffalo Ghee</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">Dairy</span>
                    </Link>

                    <Link
                      to="/products?category=grains-millets"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-elysium-tint hover:text-elysium-dark transition"
                    >
                      <span>Green Millet, Sorghum & Maize</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Grains</span>
                    </Link>

                    <Link
                      to="/products?category=peanuts"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-elysium-tint hover:text-elysium-dark transition"
                    >
                      <span>Bold Peanut Kernels (38/42 to 70/80)</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">Peanuts</span>
                    </Link>

                    <Link
                      to="/products?category=pulses-beans"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-elysium-tint hover:text-elysium-dark transition"
                    >
                      <span>Moong, Moong Mogar & Chickpeas</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Pulses</span>
                    </Link>

                    <Link
                      to="/products?category=sesame-seeds"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-elysium-tint hover:text-elysium-dark transition"
                    >
                      <span>Natural & Hulled Sesame Seeds</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">Oilseeds</span>
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 mt-2 pt-2">
                    <Link 
                      to="/products" 
                      className="flex items-center justify-between px-3 py-2 text-xs font-bold text-elysium-green hover:bg-elysium-tint rounded-xl"
                    >
                      View All Commodities Catalog
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Mixed Containers Link - Signature Elysium feature */}
            <Link 
              to="/#mixed-containers" 
              className="px-3 py-2 rounded-lg text-slate-700 hover:text-elysium-green hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <Package className="w-4 h-4 text-elysium-lime" />
              <span>Mixed Containers</span>
            </Link>

            {/* Quality & Traceability */}
            <div className="relative group">
              <Link 
                to="/quality/certifications" 
                className={`px-3 py-2 rounded-lg flex items-center gap-1 transition ${
                  location.pathname.startsWith('/quality')
                    ? 'text-elysium-green bg-elysium-tint' 
                    : 'text-slate-700 hover:text-elysium-green hover:bg-slate-50'
                }`}
              >
                Quality & Verification
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-elysium-green group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              <div className="absolute left-0 top-full pt-2 w-64 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2">
                  <Link 
                    to="/quality/certifications" 
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-elysium-tint transition"
                  >
                    <ShieldCheck className="w-5 h-5 text-elysium-green shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Verify Agro Dairy</div>
                      <div className="text-xs text-slate-500">APEDA, FSSAI, IEC & GST credentials</div>
                    </div>
                  </Link>
                  <Link 
                    to="/quality/traceability" 
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-elysium-tint transition"
                  >
                    <CheckCircle2 className="w-5 h-5 text-elysium-lime shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Lot Traceability & COA</div>
                      <div className="text-xs text-slate-500">Track origin, moisture & test results</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Export Tools */}
            <div className="relative group">
              <Link 
                to="/tools/container-calculator" 
                className={`px-3 py-2 rounded-lg flex items-center gap-1 transition ${
                  location.pathname.startsWith('/tools')
                    ? 'text-elysium-green bg-elysium-tint' 
                    : 'text-slate-700 hover:text-elysium-green hover:bg-slate-50'
                }`}
              >
                Export Tools
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-elysium-green group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              <div className="absolute left-0 top-full pt-2 w-72 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2">
                  <Link 
                    to="/tools/container-calculator" 
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-elysium-tint transition"
                  >
                    <Layers className="w-5 h-5 text-elysium-green shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Container Load Calculator</div>
                      <div className="text-xs text-slate-500">20ft / 40ft HC FCL payload estimator</div>
                    </div>
                  </Link>
                  <Link 
                    to="/tools/landed-cost-calculator" 
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-elysium-tint transition"
                  >
                    <Calculator className="w-5 h-5 text-elysium-orange shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Landed Cost Estimator</div>
                      <div className="text-xs text-slate-500">FOB, freight, CIF & customs duty breakdown</div>
                    </div>
                  </Link>
                  <Link 
                    to="/tools/crop-calendar" 
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-elysium-tint transition"
                  >
                    <FileText className="w-5 h-5 text-elysium-green shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Crop Harvest Calendar</div>
                      <div className="text-xs text-slate-500">Indian sowing, harvest & peak export cycles</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              to="/logistics" 
              className={`px-3 py-2 rounded-lg transition ${
                location.pathname === '/logistics' ? 'text-elysium-green bg-elysium-tint' : 'text-slate-700 hover:text-elysium-green hover:bg-slate-50'
              }`}
            >
              Ports & Logistics
            </Link>

            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-lg transition ${
                location.pathname === '/contact' ? 'text-elysium-green bg-elysium-tint' : 'text-slate-700 hover:text-elysium-green hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs - Elysium Signature Round Yellow Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/rfq"
              className="bg-elysium-yellow hover:bg-elysium-yellowhover text-slate-900 font-display font-bold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all text-sm flex items-center gap-2 border border-amber-300"
            >
              <span>Get a Quote</span>
              <span className="font-sans text-base">→</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/rfq"
              className="bg-elysium-yellow text-slate-900 text-xs font-bold px-4 py-2 rounded-full border border-amber-300"
            >
              Get Quote
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <nav className="flex flex-col gap-1 font-ui font-semibold text-sm">
            <Link to="/" className="px-3 py-2 rounded-lg text-slate-800 hover:bg-elysium-tint">
              Home
            </Link>
            <Link to="/products" className="px-3 py-2 rounded-lg text-slate-800 hover:bg-elysium-tint">
              All Commodities
            </Link>
            <Link to="/products?category=dairy-products" className="px-3 py-2 rounded-lg text-elysium-green hover:bg-elysium-tint">
              • Pure Cow & Buffalo Ghee
            </Link>
            <Link to="/products?category=grains-millets" className="px-3 py-2 rounded-lg text-elysium-green hover:bg-elysium-tint">
              • Green Millet, Sorghum & Maize
            </Link>
            <Link to="/products?category=peanuts" className="px-3 py-2 rounded-lg text-elysium-green hover:bg-elysium-tint">
              • Bold Peanut Kernels (38/42 to 70/80)
            </Link>
            <Link to="/products?category=pulses-beans" className="px-3 py-2 rounded-lg text-elysium-green hover:bg-elysium-tint">
              • Green Moong, Mogar & Chickpeas
            </Link>
            <Link to="/quality/certifications" className="px-3 py-2 rounded-lg text-slate-800 hover:bg-elysium-tint">
              Verify Agro Dairy & Licenses
            </Link>
            <Link to="/quality/traceability" className="px-3 py-2 rounded-lg text-slate-800 hover:bg-elysium-tint">
              Lot Traceability System
            </Link>
            <Link to="/tools/container-calculator" className="px-3 py-2 rounded-lg text-slate-800 hover:bg-elysium-tint">
              Container Load Calculator
            </Link>
            <Link to="/logistics" className="px-3 py-2 rounded-lg text-slate-800 hover:bg-elysium-tint">
              Ports & Shipping Logistics
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-lg text-slate-800 hover:bg-elysium-tint">
              Contact Desk (J.P. Vora)
            </Link>
            <Link to="/rfq" className="mt-3 w-full bg-elysium-yellow text-slate-900 font-bold py-3 rounded-full text-center shadow-md">
              Request Commercial Quotation (RFQ) →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
