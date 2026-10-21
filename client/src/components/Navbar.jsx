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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    productsService.getCategories()
      .then(res => {
        if (res.success) setCategories(res.data);
      })
      .catch(err => console.error(err));

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80' 
        : 'bg-white shadow-sm border-b border-slate-200'
    }`}>
      {/* Top Bar - Deep Logo Pine Banner with Live Indicator */}
      <div className="bg-brand-deep text-white text-xs py-2 px-4 font-ui font-semibold border-b border-brand-primary/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 font-bold text-white/95">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
              AGRO DAIRY EXPORT LLP • Surat, Gujarat, India
            </span>
            <span className="hidden md:inline-block text-white/30">|</span>
            <span className="hidden md:inline-block text-white/70 text-[11px]">
              Direct Shipments via Mundra, Kandla &amp; Hazira Ports
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-white text-[11px] sm:text-xs">
            <a 
              href="tel:+919023363680" 
              className="hover:text-brand-primary transition-colors flex items-center gap-1 font-bold"
            >
              <Phone className="w-3 h-3 text-brand-primary" />
              <span>+91 90233 63680 <span className="hidden sm:inline font-normal opacity-75">(J.P. Vora)</span></span>
            </a>
            <span className="text-white/30">|</span>
            <a 
              href="mailto:agrodairyexportllp@gmail.com" 
              className="hover:text-brand-primary transition-colors flex items-center gap-1 font-bold truncate max-w-[200px] sm:max-w-none"
            >
              <Mail className="w-3 h-3 text-brand-primary" />
              <span>agrodairyexportllp@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center group py-1">
            <img 
              src="/images/logo.png" 
              alt="Agro Dairy Export LLP" 
              className="h-14 sm:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/logo-light.jpg';
              }}
            />
          </Link>

          {/* Desktop Navigation - Exact User Order: Home, About, Product, Gallery, Certificate, Contact Us */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-ui font-semibold text-sm">
            {/* 1. Home */}
            <Link 
              to="/" 
              className={`px-3.5 py-2 rounded-lg transition ${
                location.pathname === '/' ? 'text-brand-primary bg-brand-accent font-bold' : 'text-slate-700 hover:text-brand-primary hover:bg-brand-accent'
              }`}
            >
              Home
            </Link>

            {/* 2. About */}
            <Link 
              to="/company/about" 
              className={`px-3.5 py-2 rounded-lg transition ${
                location.pathname.startsWith('/company/about') || location.pathname === '/about'
                  ? 'text-brand-primary bg-brand-accent font-bold' 
                  : 'text-slate-700 hover:text-brand-primary hover:bg-brand-accent'
              }`}
            >
              About
            </Link>

            {/* 3. Product (with Category Dropdown) */}
            <div className="relative group">
              <Link 
                to="/products" 
                className={`px-3.5 py-2 rounded-lg flex items-center gap-1 transition ${
                  location.pathname.startsWith('/products') || location.pathname.startsWith('/categories')
                    ? 'text-brand-primary bg-brand-accent font-bold' 
                    : 'text-slate-700 hover:text-brand-primary hover:bg-brand-accent'
                }`}
              >
                Product
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-primary group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              
              <div className="absolute left-0 top-full pt-2 w-80 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-brand-border p-3 overflow-hidden">
                  <div className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                    Core Export Lines
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/products?category=dairy-products"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-accent hover:text-brand-deep transition"
                    >
                      <span className="font-bold text-brand-primary">Pure Cow &amp; Buffalo Ghee</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">Dairy</span>
                    </Link>

                    <Link
                      to="/products?category=grains-millets"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-accent hover:text-brand-deep transition"
                    >
                      <span>Green Millet, Sorghum &amp; Maize</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-accent text-brand-primary font-bold">Grains</span>
                    </Link>

                    <Link
                      to="/products?category=peanuts"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-accent hover:text-brand-deep transition"
                    >
                      <span>Bold Peanut Kernels (38/42 to 70/80)</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">Peanuts</span>
                    </Link>

                    <Link
                      to="/products?category=pulses-beans"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-accent hover:text-brand-deep transition"
                    >
                      <span>Moong, Moong Mogar &amp; Chickpeas</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-accent text-brand-primary font-bold">Pulses</span>
                    </Link>

                    <Link
                      to="/products?category=sesame-seeds"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-accent hover:text-brand-deep transition"
                    >
                      <span>Natural &amp; Hulled Sesame Seeds</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">Oilseeds</span>
                    </Link>
                  </div>

                  <div className="border-t border-brand-border mt-2 pt-2">
                    <Link 
                      to="/products" 
                      className="flex items-center justify-between px-3 py-2 text-xs font-bold text-brand-primary hover:bg-brand-accent rounded-xl"
                    >
                      View All Products Catalog
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Gallery */}
            <Link 
              to="/gallery" 
              className={`px-3.5 py-2 rounded-lg transition ${
                location.pathname === '/gallery' ? 'text-brand-primary bg-brand-accent font-bold' : 'text-slate-700 hover:text-brand-primary hover:bg-brand-accent'
              }`}
            >
              Gallery
            </Link>

            {/* 5. Certificate */}
            <Link 
              to="/quality/certifications" 
              className={`px-3.5 py-2 rounded-lg transition ${
                location.pathname.startsWith('/quality') || location.pathname.startsWith('/certifications') || location.pathname === '/certificates'
                  ? 'text-brand-primary bg-brand-accent font-bold' 
                  : 'text-slate-700 hover:text-brand-primary hover:bg-brand-accent'
              }`}
            >
              Certificate
            </Link>

            {/* 6. Contact Us */}
            <Link 
              to="/contact" 
              className={`px-3.5 py-2 rounded-lg transition ${
                location.pathname === '/contact' ? 'text-brand-primary bg-brand-accent font-bold' : 'text-slate-700 hover:text-brand-primary hover:bg-brand-accent'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/rfq"
              id="nav-get-quote-btn"
              className="bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold px-7 py-3 rounded-full shadow-md shadow-brand-primary/20 hover:shadow-lg transition-all duration-200 text-sm flex items-center gap-2 active:scale-95"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/rfq"
              className="bg-brand-primary text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm"
            >
              Quote
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-brand-accent transition active:scale-95"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-brand-deep" /> : <Menu className="w-6 h-6 text-brand-deep" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with smooth animation */}
      {isOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-brand-border px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto custom-scrollbar animate-fade-in shadow-xl">
          <nav className="flex flex-col gap-1.5 font-ui font-semibold text-sm">
            <Link to="/" className="px-3 py-2.5 rounded-xl text-slate-800 hover:bg-brand-accent flex items-center justify-between">
              <span>Home</span>
              <span className="text-xs text-slate-400">→</span>
            </Link>
            <Link to="/company/about" className="px-3 py-2.5 rounded-xl text-slate-800 hover:bg-brand-accent flex items-center justify-between">
              <span>About</span>
              <span className="text-xs text-slate-400">→</span>
            </Link>
            <Link to="/products" className="px-3 py-2.5 rounded-xl text-slate-800 hover:bg-brand-accent flex items-center justify-between">
              <span>Product</span>
              <span className="text-xs text-slate-400">→</span>
            </Link>
            <Link to="/gallery" className="px-3 py-2.5 rounded-xl text-slate-800 hover:bg-brand-accent flex items-center justify-between">
              <span>Gallery</span>
              <span className="text-xs text-slate-400">→</span>
            </Link>
            <Link to="/quality/certifications" className="px-3 py-2.5 rounded-xl text-slate-800 hover:bg-brand-accent flex items-center justify-between">
              <span>Certificate</span>
              <span className="text-xs text-slate-400">→</span>
            </Link>
            <Link to="/contact" className="px-3 py-2.5 rounded-xl text-slate-800 hover:bg-brand-accent flex items-center justify-between">
              <span>Contact Us</span>
              <span className="text-xs text-slate-400">→</span>
            </Link>
            <Link to="/rfq" className="mt-2 w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3.5 rounded-full text-center shadow-md">
              Get a Quote →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
