import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowUp, FileText, CheckCircle2 } from 'lucide-react';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Quick RFQ Pill */}
      <Link
        to="/rfq"
        className="pointer-events-auto bg-agro-900 hover:bg-agro-950 text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-lg border border-agro-700/60 flex items-center gap-2 hover:scale-105 transition duration-200"
      >
        <FileText className="w-4 h-4 text-gold-400" />
        <span>Instant RFQ</span>
      </Link>

      {/* WhatsApp Floating Action */}
      <a
        href="https://wa.me/919825012345?text=Hello%20Agro%20Dairy%20Export%20Desk,%20I%20would%20like%20to%20inquire%20about%20commodity%20pricing%20and%20container%20shipment."
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition duration-200"
        title="Chat with Export Manager on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
      </a>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-10 h-10 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-md border border-slate-200 flex items-center justify-center hover:scale-105 transition duration-200"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
