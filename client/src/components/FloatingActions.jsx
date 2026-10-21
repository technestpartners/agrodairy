import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowUp, FileText, CheckCircle2, Phone } from 'lucide-react';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to Top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="group pointer-events-auto relative w-12 h-12 rounded-full bg-brand-primary hover:bg-brand-secondary text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          <span className="absolute right-14 whitespace-nowrap bg-brand-deep text-white text-xs font-ui font-semibold px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
            Back to Top
          </span>
        </button>
      )}

      {/* Direct Phone Call Button */}
      <a
        href="tel:+919023363680"
        className="group pointer-events-auto relative w-12 h-12 rounded-full bg-brand-deep hover:bg-[#002622] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 border border-white/20"
        title="Call Export Director J.P. Vora"
      >
        <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="absolute right-14 whitespace-nowrap bg-brand-deep text-white text-xs font-ui font-semibold px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
          Call: +91 90233 63680
        </span>
      </a>

      {/* WhatsApp Chat Button with Pulse Ring */}
      <a
        href="https://wa.me/919023363680?text=Hello%20Agro%20Dairy%20Export%20LLP,%20I%20would%20like%20to%20inquire%20about%20commodity%20export%20and%20container%20pricing."
        target="_blank"
        rel="noopener noreferrer"
        className="group pointer-events-auto relative w-13 h-13 p-3 rounded-full bg-[#25D366] hover:bg-[#1fb857] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
        title="Chat on WhatsApp with Export Desk"
      >
        {/* Subtle pulsing ping ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
        <MessageSquare className="w-6 h-6 fill-current relative z-10" />
        <span className="absolute right-15 whitespace-nowrap bg-[#0C2422] text-white text-xs font-ui font-bold px-3 py-1.5 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-xl border border-white/10 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Chat with Export Desk</span>
        </span>
      </a>
    </div>
  );
}
