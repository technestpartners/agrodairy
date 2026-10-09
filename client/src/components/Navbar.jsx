import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Phone, Mail, ShieldCheck, ChevronDown, 
  Search, ArrowRight, Globe, Layers, Calculator, FileText, CheckCircle
} from 'lucide-react';
import { productsService } from '../services/api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    setSearchOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Bar */}
      <div className="bg-agro-900 text-white text-xs py-2 px-4 border-b border-agro-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-agro-200">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              APEDA & FSSAI Recognized Indian Exporter
            </span>
            <span className="hidden md:inline-block text-agro-400">|</span>
            <span className="hidden md:inline-block text-slate-300">
              Direct Loading: Mundra & Kandla Ports, Gujarat
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a href="tel:+919825012345" className="hover:text-gold-300 transition flex items-center gap-1">
              <Phone className="w-3 h-3 text-gold-400" />
              +91 98250 12345
            </a>
            <span className="text-agro-400">|</span>
            <a href="mailto:trade@agrodairy.com" className="hover:text-gold-300 transition flex items-center gap-1">
              <Mail className="w-3 h-3 text-gold-400" />
              trade@agrodairy.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-agro-900 to-agro-700 flex items-center justify-center text-white shadow-md shadow-agro-900/20 group-hover:scale-105 transition">
              <span className="font-extrabold text-xl tracking-wider text-gold-300">AD</span>
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-agro-950 block leading-tight">
                AGRO DAIRY
              </span>
              <span className="text-[10px] tracking-widest text-gold-600 font-semibold uppercase block">
                Export Platform • India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                location.pathname === '/' ? 'text-agro-800 bg-agro-50' : 'text-slate-700 hover:text-agro-800 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* Commodities Dropdown */}
            <div className="relative group">
              <Link 
                to="/products" 
                className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 transition ${
                  location.pathname.startsWith('/products') || location.pathname.startsWith('/categories')
                    ? 'text-agro-800 bg-agro-50' 
                    : 'text-slate-700 hover:text-agro-800 hover:bg-slate-50'
                }`}
              >
                Commodities
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-agro-700 group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              
              <div className="absolute left-0 top-full pt-2 w-72 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 overflow-hidden">
                  <div className="text-xs font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                    Core Export Lines
                  </div>
                  <div className="max-h-80 overflow-y-auto custom-scrollbar">
                    {categories.slice(0, 8).map(cat => (
                      <Link
                        key={cat.id}
                        to={`/categories/${cat.slug}`}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-agro-50 hover:text-agro-900 transition"
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono">
                          {cat.products_count || 0}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link 
                      to="/products" 
                      className="flex items-center justify-between px-3 py-2 text-xs font-bold text-agro-700 hover:bg-agro-50 rounded-xl"
                    >
                      View All Commodities Catalog
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality & Traceability */}
            <div className="relative group">
              <Link 
                to="/quality" 
                className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 transition ${
                  location.pathname.startsWith('/quality') || location.pathname.startsWith('/traceability')
                    ? 'text-agro-800 bg-agro-50' 
                    : 'text-slate-700 hover:text-agro-800 hover:bg-slate-50'
                }`}
              >
                Quality & QA
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-agro-700 group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              <div className="absolute left-0 top-full pt-2 w-64 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2">
                  <Link 
                    to="/quality/certifications" 
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-agro-50 transition"
                  >
                    <ShieldCheck className="w-5 h-5 text-agro-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Certificates & Compliance</div>
                      <div className="text-xs text-slate-500">APEDA, FSSAI, ISO, Halal verification</div>
                    </div>
                  </Link>
                  <Link 
                    to="/quality/traceability" 
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-agro-50 transition"
                  >
                    <CheckCircle className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Lot Traceability System</div>
                      <div className="text-xs text-slate-500">Farm-to-port batch & COA tracking</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Export Tools */}
            <div className="relative group">
              <Link 
                to="/tools" 
                className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 transition ${
                  location.pathname.startsWith('/tools')
                    ? 'text-agro-800 bg-agro-50' 
                    : 'text-slate-700 hover:text-agro-800 hover:bg-slate-50'
                }`}
              >
                Export Tools
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-agro-700 group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              <div className="absolute left-0 top-full pt-2 w-72 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2">
                  <Link 
                    to="/tools/container-calculator" 
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-agro-50 transition"
                  >
                    <Layers className="w-5 h-5 text-agro-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Container Load Calculator</div>
                      <div className="text-xs text-slate-500">20ft / 40ft FCL payload & bag estimator</div>
                    </div>
                  </Link>
                  <Link 
                    to="/tools/landed-cost-calculator" 
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-agro-50 transition"
                  >
                    <Calculator className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Landed Cost Estimator</div>
                      <div className="text-xs text-slate-500">FOB, freight, CIF & customs duty breakdown</div>
                    </div>
                  </Link>
                  <Link 
                    to="/tools/crop-calendar" 
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-agro-50 transition"
                  >
                    <FileText className="w-5 h-5 text-agro-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Crop Harvest Calendar</div>
                      <div className="text-xs text-slate-500">Indian sowing, harvest & peak export cycles</div>
                    </div>
                  </Link>
                  <Link 
                    to="/tools/hs-code-finder" 
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-agro-50 transition"
                  >
                    <Search className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">HS Code Finder</div>
                      <div className="text-xs text-slate-500">Export tariffs & customs trade classification</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              to="/markets" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                location.pathname.startsWith('/markets') ? 'text-agro-800 bg-agro-50' : 'text-slate-700 hover:text-agro-800 hover:bg-slate-50'
              }`}
            >
              Export Markets
            </Link>

            <Link 
              to="/logistics" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                location.pathname === '/logistics' ? 'text-agro-800 bg-agro-50' : 'text-slate-700 hover:text-agro-800 hover:bg-slate-50'
              }`}
            >
              Logistics
            </Link>

            <Link 
              to="/company/about" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                location.pathname.startsWith('/company') ? 'text-agro-800 bg-agro-50' : 'text-slate-700 hover:text-agro-800 hover:bg-slate-50'
              }`}
            >
              Company
            </Link>

            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                location.pathname === '/contact' ? 'text-agro-800 bg-agro-50' : 'text-slate-700 hover:text-agro-800 hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/rfq"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-agro-800 to-agro-900 hover:from-agro-900 hover:to-agro-950 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-agro-900/20 hover:shadow-lg transition-all text-sm"
            >
              <span>Request Quotation</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/rfq"
              className="bg-agro-800 text-white text-xs font-bold px-3 py-2 rounded-lg"
            >
              RFQ
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
          <nav className="flex flex-col gap-1">
            <Link to="/" className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-agro-50">
              Home
            </Link>
            <Link to="/products" className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-agro-50">
              Commodities Catalog
            </Link>
            <Link to="/quality/certifications" className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-agro-50">
              Certifications & Compliance
            </Link>
            <Link to="/quality/traceability" className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-agro-50">
              Lot Traceability System
            </Link>
            <Link to="/tools/container-calculator" className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-agro-50">
              Container Load Calculator
            </Link>
            <Link to="/tools/landed-cost-calculator" className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-agro-50">
              Landed Cost Estimator
            </Link>
            <Link to="/tools/crop-calendar" className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-agro-50">
              Crop Harvest Calendar
            </Link>
            <Link to="/markets" className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-agro-50">
              Export Markets
            </Link>
            <Link to="/logistics" className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-agro-50">
              Logistics & Ports
            </Link>
            <Link to="/company/about" className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-agro-50">
              About Us
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-agro-50">
              Contact Desk
            </Link>
            <Link to="/rfq" className="mt-3 w-full bg-agro-800 text-white font-bold py-3 rounded-xl text-center shadow-md">
              Submit Request for Quotation (RFQ)
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
