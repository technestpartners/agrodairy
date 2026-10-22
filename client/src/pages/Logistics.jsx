import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Anchor, ChevronRight, Truck, Clock, ShieldCheck, CheckCircle2, 
  ArrowRight, Compass, Ship, Waves, MapPin, Gauge, Box, Award, FileText
} from 'lucide-react';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

export default function Logistics() {
  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      <RealProductSectionFlanks leftType="chickpeas" rightType="yellow-corn" opacity="opacity-20 lg:opacity-25" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: LOGISTICS & PORTS (Clean, Minimal Home Palette)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType="chickpeas" 
          bottomLeftType="yellow-corn"
          ticker="MUNDRA PORT (INMUN) • KANDLA PORT (INIXY) • HAZIRA PORT (INHZR) • 280 KM AVG TRANSIT • 100% SOLAS VGM"
          coordinates={{ lat: 'N 22.83° MUNDRA', lng: 'E 69.70°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-5 font-mono">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <span className="text-brand-primary font-bold">Logistics &amp; Port Gateways</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <Anchor className="w-3.5 h-3.5 text-brand-primary" />
                <span className="tracking-wide">WESTERN SEABOARD MARITIME CORRIDORS</span>
                <span className="text-[#4D6765]/40">•</span>
                <span className="text-[#4D6765] font-normal">All-Weather Deep-Water Berths</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Deep-Water Container Terminals &amp; <span className="text-brand-primary">Global Maritime Logistics</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                Strategically positioned within 280 KM of India’s top deep-draft container hubs—Mundra, Kandla, and Hazira Ports. Agro Dairy guarantees rapid factory-to-port road haulage, dedicated stuffing bays, continuous moisture control, and priority ocean vessel berthing.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/rfq"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-[#008A82] text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <span>Request Container Quote</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                to="/tools/container-calculator"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#E6F7F5] text-[#0C2422] font-ui font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-[#D4ECE9] transition-all shadow-xs"
              >
                <Truck className="w-4 h-4 text-brand-primary" />
                <span>Calculate Stuffing</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#D4ECE9] max-w-4xl">
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-primary">~280 KM</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Average Port Transit</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-gold">3-4 Days</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Direct to Jebel Ali (UAE)</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-primary">24/7 CFS</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Container Freight Station</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-gold">100% SOLAS</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Calibrated Weighbridge VGM</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          PRIMARY PORT GATEWAYS SECTION (Clean White Cards)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-3 shadow-xs">
            <Anchor className="w-3.5 h-3.5 text-brand-primary" />
            <span>EXPORT OCEAN GATEWAYS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0C2422] tracking-tight">
            Primary Maritime Terminals for <span className="text-brand-primary">Agro Dairy Shipments</span>
          </h2>
          <p className="text-base text-[#4D6765] mt-2 max-w-3xl font-sans leading-relaxed">
            Our proximity to Gujarat's all-weather international ports enables prompt bill of lading issuance and minimizes inland transit risks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mundra Port */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D4ECE9] shadow-sm hover:shadow-md hover:border-brand-primary/40 transition-all duration-300 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#E6F7F5] text-brand-primary flex items-center justify-center font-extrabold border border-[#BBE5E1]">
                  <Anchor className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                  PRIMARY CONTAINER GATEWAY
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0C2422] font-display">
                  Mundra Port (INMUN)
                </h3>
                <p className="text-xs font-mono text-brand-primary font-bold mt-1">
                  Gulf of Kutch, Gujarat, India • UN/LOCODE: INMUN
                </p>
              </div>

              <p className="text-sm text-[#4D6765] leading-relaxed font-sans">
                India’s largest private commercial deep-draft port capable of handling ultra-large container vessels. Operates 4 dedicated container terminals (MICT, AMCT, AICTPL) with mainline direct weekly sailings to the Middle East, Europe, Americas, and the Far East.
              </p>

              <div className="bg-[#F8FAF9] rounded-2xl p-5 border border-[#D4ECE9] space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-[#D4ECE9]">
                  <span className="text-[#4D6765] font-medium">Draft Depth &amp; Berth:</span>
                  <span className="font-mono font-bold text-[#0C2422]">Up to 17.5 Meters (All-Weather)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#D4ECE9]">
                  <span className="text-[#4D6765] font-medium">Distance from Agro Dairy Plant:</span>
                  <span className="font-mono font-bold text-[#0C2422]">~280 KM (Express Corridor Haulage)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#D4ECE9]">
                  <span className="text-[#4D6765] font-medium">Main Ocean Carriers:</span>
                  <span className="font-mono font-bold text-[#0C2422]">Maersk, MSC, CMA CGM, Hapag-Lloyd, ONE</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#4D6765] font-medium">Customs Clearance Window:</span>
                  <span className="font-mono font-bold text-emerald-700">Digital ICEGATE Fast-Track</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#D4ECE9] flex items-center justify-between">
              <span className="text-xs text-[#4D6765] font-medium">20ft / 40ft Dry Container Specialists</span>
              <Link
                to="/tools/container-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0C2422] hover:text-brand-primary"
              >
                Container Loading Guide <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
              </Link>
            </div>
          </div>

          {/* Kandla / Deendayal Port */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D4ECE9] shadow-sm hover:shadow-md hover:border-brand-primary/40 transition-all duration-300 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#B45309] flex items-center justify-center font-extrabold border border-amber-200">
                  <Ship className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-300">
                  BULK VESSEL &amp; BREAKBULK HUB
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0C2422] font-display">
                  Deendayal Port / Kandla (INIXY)
                </h3>
                <p className="text-xs font-mono text-[#B45309] font-bold mt-1">
                  Kutch, Gujarat, India • UN/LOCODE: INIXY
                </p>
              </div>

              <p className="text-sm text-[#4D6765] leading-relaxed font-sans">
                One of India's historic major ports and premier export gateways for bulk agricultural commodities, chartered vessel parcel loadings, grain meal, and bagged cargo. Strategically equipped with high-throughput mechanical ship-loaders.
              </p>

              <div className="bg-[#F8FAF9] rounded-2xl p-5 border border-[#D4ECE9] space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-[#D4ECE9]">
                  <span className="text-[#4D6765] font-medium">Vessel Specialization:</span>
                  <span className="font-mono font-bold text-[#0C2422]">Handysize &amp; Supramax Bulk Vessels</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#D4ECE9]">
                  <span className="text-[#4D6765] font-medium">Distance from Rajkot Facility:</span>
                  <span className="font-mono font-bold text-[#0C2422]">~220 KM (4-Hour Highway Transit)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#D4ECE9]">
                  <span className="text-[#4D6765] font-medium">Surveyor Inspection Facilities:</span>
                  <span className="font-mono font-bold text-[#0C2422]">24/7 SGS, Geo-Chem, Bureau Veritas</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#4D6765] font-medium">Best Suited For:</span>
                  <span className="font-mono font-bold text-emerald-700">1,000 MT - 25,000 MT Vessel Charters</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-[#4D6765] font-medium">Chartering &amp; Breakbulk Freight</span>
              <Link
                to="/rfq"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0C2422] hover:text-brand-primary"
              >
                Request Bulk Vessel Quote <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          OCEAN TRANSIT TIME MATRIX (Clean Mint Section)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F4F9F8] text-[#0C2422] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-[#D4ECE9]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-3 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-brand-primary" />
              <span>MAINLINE MARITIME SCHEDULES</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0C2422] font-display">
              Direct Ocean Transit Times from <span className="text-brand-primary">Mundra Gateway</span>
            </h3>
            <p className="text-sm text-[#4D6765] mt-1 font-sans">
              Typical port-to-port ocean transit days based on direct weekly carrier sailings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-white border border-[#D4ECE9] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-brand-primary">MIDDLE EAST &amp; GCC</span>
                <span className="text-xs font-mono font-bold text-[#0C2422] bg-[#E6F7F5] px-2 py-0.5 rounded">
                  3 - 4 Days
                </span>
              </div>
              <h4 className="font-bold text-[#0C2422] text-base">Jebel Ali (AEJEA)</h4>
              <p className="text-xs text-[#4D6765] leading-relaxed">Also serving Dammam, Sohar, Hamad Port, and Kuwait Shuwaikh.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#D4ECE9] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-brand-primary">SOUTHEAST ASIA</span>
                <span className="text-xs font-mono font-bold text-[#0C2422] bg-[#E6F7F5] px-2 py-0.5 rounded">
                  10 - 12 Days
                </span>
              </div>
              <h4 className="font-bold text-[#0C2422] text-base">Singapore &amp; Port Klang</h4>
              <p className="text-xs text-[#4D6765] leading-relaxed">Connecting to Jakarta Tanjung Priok, Bangkok, and Manila.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#D4ECE9] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-brand-primary">EUROPEAN UNION</span>
                <span className="text-xs font-mono font-bold text-[#0C2422] bg-[#E6F7F5] px-2 py-0.5 rounded">
                  22 - 25 Days
                </span>
              </div>
              <h4 className="font-bold text-[#0C2422] text-base">Rotterdam &amp; Hamburg</h4>
              <p className="text-xs text-[#4D6765] leading-relaxed">Also direct to Antwerp, Felixstowe, and Mediterranean ports.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#D4ECE9] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-brand-primary">EAST &amp; SOUTH AFRICA</span>
                <span className="text-xs font-mono font-bold text-[#0C2422] bg-[#E6F7F5] px-2 py-0.5 rounded">
                  14 - 18 Days
                </span>
              </div>
              <h4 className="font-bold text-[#0C2422] text-base">Mombasa &amp; Durban</h4>
              <p className="text-xs text-[#4D6765] leading-relaxed">Direct feeder and mainline services to Dar es Salaam and Djibouti.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          CONTAINER STUFFING & FUMIGATION PROTOCOLS (Clean White Section)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
            <span>TRANSIT MOISTURE PROTECTION</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0C2422] tracking-tight">
            Strict Container Stuffing, Desiccant &amp; <span className="text-brand-primary">Fumigation Protocols</span>
          </h2>
          <p className="text-base text-[#4D6765] mt-2 max-w-3xl font-sans leading-relaxed">
            Agricultural commodities are biological products vulnerable to oceanic moisture swings, container sweat, and temperature changes. Agro Dairy implements exhaustive moisture protection on every container stuffed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-7 border border-[#D4ECE9] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#B45309] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#0C2422]">Kraft Paper &amp; Pole Desiccants</h3>
            <p className="text-xs text-[#4D6765] leading-relaxed">
              Every 20ft and 40ft container is fully lined with multi-ply virgin kraft paper. High-capacity calcium chloride moisture absorber poles are mounted to prevent condensation drip on bagged goods.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-[#D4ECE9] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#0C2422]">Certified Fumigation Standards</h3>
            <p className="text-xs text-[#4D6765] leading-relaxed">
              Conducted by government-accredited pest control agencies using Methyl Bromide (MBr) or Aluminium Phosphide (ALP) in strict adherence to destination phytosanitary regulations.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-[#D4ECE9] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#0C2422]">Independent Surveyor Witness</h3>
            <p className="text-xs text-[#4D6765] leading-relaxed">
              Buyers may appoint independent surveyors (SGS, Cotecna, Bureau Veritas, Geo-Chem) to witness weighing, sampling, container sealing, and issue photographic tally sheets.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          BOTTOM CTA (Signature Clean Dark Pine Section)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#021814] via-[#052822] to-[#011310] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[#00A79D]/30 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5EEAD4] font-bold uppercase tracking-wider mb-2">
              <Anchor className="w-4 h-4 text-[#5EEAD4]" />
              <span>International Seaport Allocations</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Ready to Book Container Space or Vessel Parcels?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/75 mt-2 font-sans leading-relaxed">
              Our freight desk coordinates container slots directly with Maersk, MSC, and CMA CGM out of Mundra and Hazira gateways with guaranteed sailing dates.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/tools/container-calculator"
              className="bg-brand-gold hover:bg-amber-400 text-[#002B26] font-ui font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Payload Calculator
            </Link>
            <Link
              to="/rfq"
              className="bg-white/10 hover:bg-white/15 text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-white/20 transition-all"
            >
              Request CIF Port Rate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
