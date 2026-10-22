import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, ChevronRight, MapPin, Clock, ArrowRight, 
  Sparkles, ShieldCheck, CheckCircle2, Sprout, SunMedium
} from 'lucide-react';
import { toolsService } from '../services/api';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function CropCalendar() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    toolsService.getCropCalendars()
      .then(res => {
        if (res.success) setCrops(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      <RealProductSectionFlanks leftType="pearl-millet" rightType="green-moong" opacity="opacity-20 lg:opacity-25" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: CROP HARVEST CALENDAR (Clean, Minimal Home Palette)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType="pearl-millet" 
          bottomLeftType="green-moong"
          ticker="SEASONAL PROCUREMENT • KHARIF & RABI CYCLES • DIRECT GUJARAT MANDI ARRIVALS • NEW-CROP FORWARD BOOKING"
          coordinates={{ lat: 'N 21.17° SURAT', lng: 'E 72.83°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-5 font-mono">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <Link to="/products" className="hover:text-brand-primary transition-colors">Trade Tools</Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <span className="text-brand-primary font-bold">Crop Harvest Calendar</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                <span className="tracking-wide">SEASONAL PROCUREMENT CYCLES</span>
                <span className="text-[#4D6765]/40">•</span>
                <span className="text-[#4D6765] font-normal">Gujarat Mandi Arrivals</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Indian Crop &amp; <span className="text-brand-primary">Harvest Export Calendar</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                Plan forward international contracts around peak Gujarat APMC mandi arrivals. Locking in new-crop contracts during early harvest guarantees optimal oil content, bold seed caliber, and competitive FOB container pricing.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/rfq"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-[#008A82] text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <span>Contract New Crop</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#E6F7F5] text-[#0C2422] font-ui font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-[#D4ECE9] transition-all shadow-xs"
              >
                <span>View Commodities</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          CROP CALENDAR MATRIX SECTION (Clean Home-Page Card)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D4ECE9] shadow-xl space-y-8 text-[#0C2422]">
          
          {/* Legend Ticker */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-amber-200 border border-amber-300 inline-block" />
                <span className="text-[#0C2422] font-bold">Sowing Window</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-emerald-400 border border-emerald-500 inline-block" />
                <span className="text-[#0C2422] font-bold">Peak Mandi Harvest</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-brand-primary border border-brand-primary inline-block" />
                <span className="text-[#0C2422] font-bold">Prime Export Shipping</span>
              </div>
            </div>

            <div className="text-[#4D6765]">
              Covers Gujarat, Saurashtra &amp; Rajasthan Agricultural Mandis
            </div>
          </div>

          {/* Commodity Cards with Sowing & Harvest Data */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-xs font-mono text-[#4D6765]">Loading agricultural crop harvest calendar...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {crops.map((crop, idx) => (
                <div 
                  key={crop.id || idx}
                  className="bg-[#F8FAF9] rounded-3xl p-6 border border-[#D4ECE9] hover:bg-white hover:shadow-md transition-all duration-300 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-wider block">
                        {crop.season || 'Kharif / Rabi Season'} • {crop.major_producing_states || 'Gujarat, Rajasthan'}
                      </span>
                      <h3 className="font-display font-extrabold text-xl text-[#0C2422] mt-0.5">
                        {crop.commodity_name}
                      </h3>
                    </div>

                    <Link
                      to={`/rfq?commodity=${encodeURIComponent(crop.commodity_name || '')}`}
                      className="inline-flex items-center gap-1.5 text-xs font-ui font-bold text-brand-primary bg-[#E6F7F5] hover:bg-brand-primary hover:text-white px-4 py-2 rounded-xl transition self-start sm:self-auto border border-[#BBE5E1]"
                    >
                      <span>Contract New Crop</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white p-4 rounded-2xl border border-[#D4ECE9]">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Sowing Cycle</span>
                      <span className="font-bold text-[#0C2422] text-sm">{crop.sowing_start} - {crop.sowing_end}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-[#D4ECE9]">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block font-bold">Mandi Harvest</span>
                      <span className="font-bold text-emerald-700 text-sm">{crop.harvest_start} - {crop.harvest_end}</span>
                    </div>
                    <div className="bg-[#E6F7F5] text-brand-primary p-4 rounded-2xl border border-[#BBE5E1]">
                      <span className="text-[10px] font-mono uppercase block font-bold">Peak Container Export</span>
                      <span className="font-bold text-brand-primary text-sm">{crop.peak_export_start} - {crop.peak_export_end}</span>
                    </div>
                  </div>

                  {crop.notes && (
                    <p className="text-xs text-[#4D6765] bg-white p-4 rounded-2xl border border-[#D4ECE9] leading-relaxed font-sans">
                      <strong className="text-[#0C2422]">Export Merchandiser Note:</strong> {crop.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          BOTTOM CTA (Signature Clean Dark Pine Section)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#021814] via-[#052822] to-[#011310] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[#00A79D]/30 shadow-2xl mt-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5EEAD4] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-[#5EEAD4]" />
              <span>Forward Procurement &amp; Spot Contracting</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Planning Forward Shipments for Upcoming Harvest Arrivals?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/75 mt-2 font-sans leading-relaxed">
              Contact our Saurashtra procurement desk to reserve certified optical sortex lots before harvest arrivals deplete at APMC mandis.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/rfq"
              className="bg-brand-gold hover:bg-amber-400 text-[#002B26] font-ui font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Lock in Forward RFQ
            </Link>
            <a
              href="https://wa.me/919023363680"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/15 text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-white/20 transition-all"
            >
              WhatsApp Procurement Lead
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
