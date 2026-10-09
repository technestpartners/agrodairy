import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowUp, FileText, CheckCircle2 } from 'lucide-react';

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
          className="pointer-events-auto w-12 h-12 rounded-full bg-[#6fa06f] hover:bg-[#5a8b5a] text-white flex items-center justify-center shadow-lg transition duration-200"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Direct Phone Call Button */}
      <a
        href="tel:+919023363680"
        className="pointer-events-auto w-12 h-12 rounded-full bg-[#13612e] hover:bg-[#0b3f1d] text-white flex items-center justify-center shadow-lg transition duration-200"
        title="Call Export Director J.P. Vora"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp Chat Button */}
      <a
        href="https://wa.me/919023363680?text=Hello%20Agro%20Dairy%20Export%20LLP,%20I%20would%20like%20to%20inquire%20about%20commodity%20export%20and%20container%20pricing."
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto w-12 h-12 rounded-full bg-[#177a40] hover:bg-[#136636] text-white flex items-center justify-center shadow-xl transition duration-200 hover:scale-105"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
      </a>
    </div>
  );
}
