import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Phone, Mail, ShieldCheck, ChevronDown, 
  ArrowRight, Anchor, MessageCircle, CheckCircle2,
  Globe2, Sparkles, ChevronRight, Package, Layers, Sprout,
  Linkedin, Instagram
} from 'lucide-react';
import { productsService } from '../services/api';
import { useSettings } from '../context/SettingsContext';

export default function Navbar() {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    productsService.getCategories()
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setCategories(res.data);
        }
      })
      .catch(err => console.error(err));

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          // Deadband hysteresis: shrink after scrolling 70px down, restore only above 25px
          // This prevents rapid oscillation/flickering near the scroll threshold
          setScrolled(prev => {
            if (!prev && y > 70) return true;
            if (prev && y < 25) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setProductsOpen(false);
  }, [location]);

  const handleMouseEnterProducts = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setProductsOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 180);
  };

  const cleanPhone = (settings.header_hotline_phone || '+91 90233 63680').replace(/[^0-9+]/g, '');
  const cleanWhatsapp = (settings.header_whatsapp || '+919023363680').replace(/[^0-9]/g, '');

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_4px_20px_-4px_rgba(0,55,50,0.08)]">
      
      {/* =========================================================================
          1. PROPER UTILITY TOP BAR (Deep Pine & Gold Credentials)
          ========================================================================= */}
      <div 
        className={`w-full bg-[#002B26] text-white transition-[max-height,opacity,padding,border-color] duration-300 ease-in-out border-b ${
          scrolled 
            ? 'max-h-0 opacity-0 overflow-hidden py-0 border-transparent pointer-events-none' 
            : 'max-h-14 opacity-100 py-2 px-4 border-[#00A79D]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
          
          {/* Left: Export Credentials & Port Gateways */}
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <div className="flex items-center gap-1.5 font-bold text-white tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A79D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A79D]"></span>
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#00A79D]" />
              <span>{settings.company_name || 'AGRO DAIRY EXPORT LLP'}</span>
            </div>

            <span className="hidden sm:inline-block text-white/30">•</span>

            <div className="hidden sm:flex items-center gap-1.5 text-white/80 font-mono text-[11px]">
              <Anchor className="w-3 h-3 text-[#F5B800]" />
              <span>{settings.header_ticker || 'Mundra, Kandla & Hazira Seaport Direct Dispatches'}</span>
            </div>

            <span className="hidden lg:inline-block text-white/30">•</span>

            <span className="hidden lg:inline-block text-[#F5B800] font-mono text-[11px] font-bold">
              {settings.header_credentials_badge || 'APEDA • FSSAI • DGFT IEC: 0817029381'}
            </span>
          </div>

          {/* Right: Phone, Email Direct Hotline & Social Channels */}
          <div className="flex items-center gap-3 sm:gap-4 text-white/90 text-xs flex-wrap justify-center md:justify-end">
            <a 
              href={`tel:${cleanPhone}`} 
              className="hover:text-[#00A79D] transition-colors flex items-center gap-1.5 font-bold font-mono"
            >
              <Phone className="w-3 h-3 text-[#00A79D]" />
              <span>{settings.header_hotline_phone || '+91 90233 63680'} <span className="hidden sm:inline font-normal text-white/60 font-sans">({settings.header_contact_person || 'J.P. Vora'})</span></span>
            </a>

            <span className="text-white/20">|</span>

            <a 
              href={`mailto:${settings.header_primary_email || 'agrodairyexportllp@gmail.com'}`} 
              className="hover:text-[#00A79D] transition-colors flex items-center gap-1.5 font-mono text-white/80 hover:text-white truncate max-w-[180px] sm:max-w-none"
            >
              <Mail className="w-3 h-3 text-[#00A79D]" />
              <span className="hidden lg:inline">{settings.header_primary_email || 'agrodairyexportllp@gmail.com'}</span>
              <span className="lg:hidden">Email Desk</span>
            </a>

            {/* Social Media Links: LinkedIn & Instagram */}
            {(settings.header_show_social !== '0' && settings.header_show_social !== false) && (
              <>
                <span className="text-white/20">|</span>
                <div className="flex items-center gap-2">
                  {settings.header_linkedin && (
                    <a
                      href={settings.header_linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Follow Agro Dairy on LinkedIn"
                      aria-label="LinkedIn Profile"
                      className="w-5.5 h-5.5 rounded bg-white/10 hover:bg-[#0077B5] text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                    >
                      <Linkedin className="w-3 h-3" />
                    </a>
                  )}
                  {settings.header_instagram && (
                    <a
                      href={settings.header_instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Follow Agro Dairy on Instagram"
                      aria-label="Instagram Profile"
                      className="w-5.5 h-5.5 rounded bg-white/10 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                    >
                      <Instagram className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* =========================================================================
          2. MAIN SHAPED NAVIGATION BAR
          ========================================================================= */}
      <div className="w-full bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-[height] duration-300 ease-in-out ${
            scrolled ? 'h-16' : 'h-20'
          }`}>
            
            {/* Logo */}
            <Link to="/" className="flex items-center group shrink-0 py-1">
              <img 
                src={settings.site_logo || "/images/logo.png"} 
                alt="Agro Dairy Export LLP" 
                className={`w-auto object-contain transform-gpu transition-[height,transform] duration-300 group-hover:scale-[1.03] ${
                  scrolled ? 'h-11 sm:h-12' : 'h-14 sm:h-15'
                }`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/logo-light.jpg';
                }}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-sans font-semibold text-[13px] tracking-normal">
              
              {/* 1. Home */}
              {(settings.nav_show_home !== '0' && settings.nav_show_home !== 0 && settings.nav_show_home !== false) && (
                <Link 
                  to="/" 
                  className={`px-3.5 py-2 rounded-xl transition-colors duration-150 ${
                    location.pathname === '/' 
                      ? 'text-[#003732] bg-[#E6F7F5] font-extrabold border border-[#00A79D]/30' 
                      : 'text-slate-700 hover:text-[#00A79D] hover:bg-[#E6F7F5]/50'
                  }`}
                >
                  {settings.nav_label_home || 'Home'}
                </Link>
              )}

              {/* 2. About */}
              {(settings.nav_show_about !== '0' && settings.nav_show_about !== 0 && settings.nav_show_about !== false) && (
                <Link 
                  to="/company/about" 
                  className={`px-3.5 py-2 rounded-xl transition-colors duration-150 ${
                    location.pathname.startsWith('/company/about') || location.pathname === '/about'
                      ? 'text-[#003732] bg-[#E6F7F5] font-extrabold border border-[#00A79D]/30' 
                      : 'text-slate-700 hover:text-[#00A79D] hover:bg-[#E6F7F5]/50'
                  }`}
                >
                  {settings.nav_label_about || 'About'}
                </Link>
              )}

              {/* 3. Products (with Dropdown) */}
              {(settings.nav_show_products !== '0' && settings.nav_show_products !== 0 && settings.nav_show_products !== false) && (
                <div 
                  className="relative"
                  onMouseEnter={handleMouseEnterProducts}
                  onMouseLeave={handleMouseLeaveProducts}
                  onFocus={handleMouseEnterProducts}
                  onBlur={handleMouseLeaveProducts}
                >
                  <Link 
                    to="/products" 
                    onClick={() => setProductsOpen(false)}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-1 transition-colors duration-150 ${
                      location.pathname.startsWith('/products') || location.pathname.startsWith('/categories')
                        ? 'text-[#003732] bg-[#E6F7F5] font-extrabold border border-[#00A79D]/30' 
                        : 'text-slate-700 hover:text-[#00A79D] hover:bg-[#E6F7F5]/50'
                    }`}
                  >
                    <span>{settings.nav_label_products || 'Products'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsOpen ? 'text-[#00A79D] rotate-180' : 'text-slate-400'}`} />
                  </Link>
                
                {/* Proper Sculpted Dropdown Card with stable position & invisible bridge */}
                <div 
                  className={`absolute left-0 -translate-x-12 top-full pt-2 w-[500px] z-50 transition-all duration-200 ease-out origin-top ${
                    productsOpen 
                      ? 'opacity-100 scale-100 pointer-events-auto visible' 
                      : 'opacity-0 scale-95 pointer-events-none invisible'
                  }`}
                >
                  {/* Invisible Hit Bridge: eliminates dead zone between button and card */}
                  <div className="absolute inset-x-0 -top-3 h-4 bg-transparent pointer-events-auto" />

                  <div className="bg-white rounded-2xl shadow-2xl border border-[#D4ECE9] p-3.5 overflow-hidden ring-1 ring-black/5">
                    
                    {/* Header Bar */}
                    <div className="px-3.5 py-2 mb-2 bg-[#F4F9F8] rounded-xl border border-[#D4ECE9] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                        <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wider font-mono">
                          Export Commodities Directory
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-[10px] font-mono font-bold text-brand-primary">
                        Sortex 99.5%+
                      </span>
                    </div>

                    {/* Commodity Category Links */}
                    <div className="space-y-1">
                      {/* 1. Peanuts */}
                      <Link
                        to="/products?category=peanuts"
                        onClick={() => setProductsOpen(false)}
                        className="group/item flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#E6F7F5] hover:text-[#003732] transition-colors duration-150 border border-transparent hover:border-[#BBE5E1]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform">
                            <Package className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-[13px] text-[#0C2422] group-hover/item:text-brand-primary transition-colors flex items-center gap-1.5">
                              <span>Bold &amp; Java Peanuts</span>
                              <span className="text-[11px] font-mono text-slate-400 font-normal">(38/42–70/80)</span>
                            </div>
                            <div className="text-[11px] text-[#4D6765] font-sans">
                              Saurashtra origin, HPS groundnut kernels, Sortex cleaned
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                            Peanuts
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/item:text-brand-primary group-hover/item:translate-x-0.5 transition-all" />
                        </div>
                      </Link>

                      {/* 3. Dairy */}
                      <Link
                        to="/products?category=dairy-products"
                        onClick={() => setProductsOpen(false)}
                        className="group/item flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#E6F7F5] hover:text-[#003732] transition-colors duration-150 border border-transparent hover:border-[#BBE5E1]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-[13px] text-[#0C2422] group-hover/item:text-brand-primary transition-colors">
                              Pure Indian Cow &amp; Buffalo Ghee
                            </div>
                            <div className="text-[11px] text-[#4D6765] font-sans">
                              Desi Danedar A2 Cow &amp; Creamy Buffalo, AGMARK &amp; FSSAI
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                            Dairy
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/item:text-brand-primary group-hover/item:translate-x-0.5 transition-all" />
                        </div>
                      </Link>

                      {/* 4. Grains & Millets */}
                      <Link
                        to="/products?category=grains-millets"
                        onClick={() => setProductsOpen(false)}
                        className="group/item flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#E6F7F5] hover:text-[#003732] transition-colors duration-150 border border-transparent hover:border-[#BBE5E1]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform">
                            <Sprout className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-[13px] text-[#0C2422] group-hover/item:text-brand-primary transition-colors">
                              Green Millet, Sorghum &amp; Maize
                            </div>
                            <div className="text-[11px] text-[#4D6765] font-sans">
                              Bajra, Jowar &amp; White/Yellow Maize, machine-cleaned
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                            Grains
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/item:text-brand-primary group-hover/item:translate-x-0.5 transition-all" />
                        </div>
                      </Link>

                      {/* 5. Pulses & Beans */}
                      <Link
                        to="/products?category=pulses-beans"
                        onClick={() => setProductsOpen(false)}
                        className="group/item flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#E6F7F5] hover:text-[#003732] transition-colors duration-150 border border-transparent hover:border-[#BBE5E1]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-teal-50 text-brand-primary border border-teal-200/60 flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-[13px] text-[#0C2422] group-hover/item:text-brand-primary transition-colors">
                              Green Moong, Mogar &amp; Chickpeas
                            </div>
                            <div className="text-[11px] text-[#4D6765] font-sans">
                              Whole Moong, Moong Dal &amp; Desi/Kabuli Chickpeas
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/60">
                            Pulses
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/item:text-brand-primary group-hover/item:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                    </div>

                    {/* Bottom Bar: Action Links */}
                    <div className="border-t border-[#D4ECE9] mt-2.5 pt-2.5 px-2 flex items-center justify-between gap-3 text-xs">
                      <Link 
                        to="/products" 
                        onClick={() => setProductsOpen(false)}
                        className="flex items-center gap-1.5 font-bold text-brand-primary hover:text-[#008A82] transition group/link"
                      >
                        <span>View All Commodities Catalog</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-[#4D6765]">
                        <Link 
                          to="/tools/container-calculator" 
                          onClick={() => setProductsOpen(false)}
                          className="hover:text-brand-primary transition hover:underline"
                        >
                          Container Calc
                        </Link>
                        <span>•</span>
                        <Link 
                          to="/tools/hs-code-finder" 
                          onClick={() => setProductsOpen(false)}
                          className="hover:text-brand-primary transition hover:underline"
                        >
                          HS Codes
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              )}

              {/* 4. Gallery */}
              {(settings.nav_show_gallery !== '0' && settings.nav_show_gallery !== 0 && settings.nav_show_gallery !== false) && (
                <Link 
                  to="/gallery" 
                  className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                    location.pathname === '/gallery' 
                      ? 'text-[#003732] bg-[#E6F7F5] font-extrabold border border-[#00A79D]/30' 
                      : 'text-slate-700 hover:text-[#00A79D] hover:bg-[#E6F7F5]/50'
                  }`}
                >
                  {settings.nav_label_gallery || 'Gallery'}
                </Link>
              )}

              {/* 5. Certificate */}
              {(settings.nav_show_certifications !== '0' && settings.nav_show_certifications !== 0 && settings.nav_show_certifications !== false) && (
                <Link 
                  to="/quality/certifications" 
                  className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                    location.pathname.startsWith('/quality') || location.pathname.startsWith('/certifications') || location.pathname === '/certificates'
                      ? 'text-[#003732] bg-[#E6F7F5] font-extrabold border border-[#00A79D]/30' 
                      : 'text-slate-700 hover:text-[#00A79D] hover:bg-[#E6F7F5]/50'
                  }`}
                >
                  {settings.nav_label_certifications || 'Certificates'}
                </Link>
              )}

              {/* 6. Contact Us */}
              {(settings.nav_show_contact !== '0' && settings.nav_show_contact !== 0 && settings.nav_show_contact !== false) && (
                <Link 
                  to="/contact" 
                  className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                    location.pathname === '/contact' 
                      ? 'text-[#003732] bg-[#E6F7F5] font-extrabold border border-[#00A79D]/30' 
                      : 'text-slate-700 hover:text-[#00A79D] hover:bg-[#E6F7F5]/50'
                  }`}
                >
                  {settings.nav_label_contact || 'Contact Us'}
                </Link>
              )}
            </nav>

            {/* Right Action Cluster */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Direct LinkedIn & Instagram Channels */}
              {(settings.header_show_social !== '0' && settings.header_show_social !== false) && (
                <div className="flex items-center gap-1.5 mr-1">
                  {settings.header_linkedin && (
                    <a
                      href={settings.header_linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Follow Agro Dairy on LinkedIn"
                      aria-label="LinkedIn Profile"
                      className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#0077B5] text-slate-600 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 border border-slate-200/80 shadow-xs group/li"
                    >
                      <Linkedin className="w-4 h-4 text-[#0077B5] group-hover/li:text-white transition-colors" />
                    </a>
                  )}
                  {settings.header_instagram && (
                    <a
                      href={settings.header_instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Follow Agro Dairy on Instagram"
                      aria-label="Instagram Profile"
                      className="w-9 h-9 rounded-full bg-slate-100 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] text-slate-600 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 border border-slate-200/80 shadow-xs group/ig"
                    >
                      <Instagram className="w-4 h-4 text-[#E1306C] group-hover/ig:text-white transition-colors" />
                    </a>
                  )}
                </div>
              )}

              {/* Direct WhatsApp Quick Contact */}
              {(settings.nav_show_whatsapp_btn !== '0' && settings.nav_show_whatsapp_btn !== 0 && settings.nav_show_whatsapp_btn !== false) && (
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20${encodeURIComponent(settings.company_name || 'Agro Dairy Export LLP')},%20I%20would%20like%20to%20inquire%20about%20agricultural%20commodity%20exports.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Chat on WhatsApp"
                  className="w-10 h-10 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}

              {/* Proper Sculpted CTA Button */}
              {(settings.nav_show_quote_btn !== '0' && settings.nav_show_quote_btn !== 0 && settings.nav_show_quote_btn !== false && settings.header_show_cta !== '0' && settings.header_show_cta !== false) && (
                <Link
                  to={settings.header_cta_link || '/rfq'}
                  id="nav-get-quote-btn"
                  className="px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#00A79D] to-[#008C84] hover:from-[#008C84] hover:to-[#006B64] text-white font-sans font-extrabold text-xs tracking-wider uppercase shadow-md shadow-[#00A79D]/25 hover:shadow-lg transition-all duration-200 flex items-center gap-2 active:scale-95"
                >
                  <span>{settings.header_cta_text || 'Get a Quote'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                to="/rfq"
                className="bg-[#00A79D] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm"
              >
                Quote
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-[#E6F7F5] transition active:scale-95"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6 text-[#003732]" /> : <Menu className="w-6 h-6 text-[#003732]" />}
              </button>
            </div>

          </div>
        </div>

        {/* Sculpted Bottom Accent Line: Custom shaped gradient border */}
        <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#00A79D] to-transparent opacity-40" />
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-1.5 font-sans font-semibold text-sm">
            {/* 1. Home */}
            {(settings.nav_show_home !== '0' && settings.nav_show_home !== 0 && settings.nav_show_home !== false) && (
              <Link 
                to="/" 
                className={`px-3 py-2.5 rounded-xl flex items-center justify-between ${
                  location.pathname === '/' ? 'bg-[#E6F7F5] text-[#003732] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{settings.nav_label_home || 'Home'}</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
            )}

            {/* 2. About */}
            {(settings.nav_show_about !== '0' && settings.nav_show_about !== 0 && settings.nav_show_about !== false) && (
              <Link 
                to="/company/about" 
                className={`px-3 py-2.5 rounded-xl flex items-center justify-between ${
                  location.pathname.startsWith('/company/about') || location.pathname === '/about' ? 'bg-[#E6F7F5] text-[#003732] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{settings.nav_label_about || 'About'}</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
            )}

            {/* 3. Products */}
            {(settings.nav_show_products !== '0' && settings.nav_show_products !== 0 && settings.nav_show_products !== false) && (
              <Link 
                to="/products" 
                className={`px-3 py-2.5 rounded-xl flex items-center justify-between ${
                  location.pathname.startsWith('/products') ? 'bg-[#E6F7F5] text-[#003732] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{settings.nav_label_products || 'Products'}</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
            )}

            {/* 4. Gallery */}
            {(settings.nav_show_gallery !== '0' && settings.nav_show_gallery !== 0 && settings.nav_show_gallery !== false) && (
              <Link 
                to="/gallery" 
                className={`px-3 py-2.5 rounded-xl flex items-center justify-between ${
                  location.pathname === '/gallery' ? 'bg-[#E6F7F5] text-[#003732] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{settings.nav_label_gallery || 'Gallery'}</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
            )}

            {/* 5. Certificates */}
            {(settings.nav_show_certifications !== '0' && settings.nav_show_certifications !== 0 && settings.nav_show_certifications !== false) && (
              <Link 
                to="/quality/certifications" 
                className={`px-3 py-2.5 rounded-xl flex items-center justify-between ${
                  location.pathname.startsWith('/quality') ? 'bg-[#E6F7F5] text-[#003732] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{settings.nav_label_certifications || 'Certificates'}</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
            )}

            {/* 6. Contact Us */}
            {(settings.nav_show_contact !== '0' && settings.nav_show_contact !== 0 && settings.nav_show_contact !== false) && (
              <Link 
                to="/contact" 
                className={`px-3 py-2.5 rounded-xl flex items-center justify-between ${
                  location.pathname === '/contact' ? 'bg-[#E6F7F5] text-[#003732] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{settings.nav_label_contact || 'Contact Us'}</span>
                <span className="text-xs text-slate-400">→</span>
              </Link>
            )}

            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              {(settings.nav_show_quote_btn !== '0' && settings.nav_show_quote_btn !== 0 && settings.nav_show_quote_btn !== false && settings.header_show_cta !== '0' && settings.header_show_cta !== false) && (
                <Link 
                  to={settings.header_cta_link || '/rfq'} 
                  className="w-full bg-[#00A79D] hover:bg-[#008C84] text-white font-extrabold py-3.5 rounded-xl text-center text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2"
                >
                  <span>{settings.header_cta_text || 'Request Proforma Quote'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              {(settings.nav_show_whatsapp_btn !== '0' && settings.nav_show_whatsapp_btn !== 0 && settings.nav_show_whatsapp_btn !== false) && (
                <a 
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20${encodeURIComponent(settings.company_name || 'Agro Dairy Export LLP')},%20I%20would%20like%20to%20inquire%20about%20agricultural%20commodity%20exports.`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 font-bold py-3 rounded-xl text-center text-xs flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp ({settings.header_hotline_phone || '+91 90233 63680'})</span>
                </a>
              )}

              {/* Social Media Channels (LinkedIn & Instagram) */}
              {(settings.header_show_social !== '0' && settings.header_show_social !== false) && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2.5">
                  {settings.header_linkedin && (
                    <a
                      href={settings.header_linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#0077B5] text-slate-700 hover:text-white border border-slate-200/80 text-xs font-bold transition group"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-[#0077B5] group-hover:text-white transition-colors" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {settings.header_instagram && (
                    <a
                      href={settings.header_instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-50 hover:bg-rose-500 text-slate-700 hover:text-white border border-slate-200/80 text-xs font-bold transition group"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#E1306C] group-hover:text-white transition-colors" />
                      <span>Instagram</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
      )}

    </header>
  );
}
