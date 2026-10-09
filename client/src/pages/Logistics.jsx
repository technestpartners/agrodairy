import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, ChevronRight, Truck, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Logistics() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-agro-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Logistics & Ports</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Port Gateways & Maritime Logistics
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Located within 280 KM of India’s premier container gateways—Mundra and Kandla Ports—Agro Dairy guarantees rapid container stuffing, customs clearance, and prompt ocean sailings.
        </p>
      </div>

      {/* Main Ports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mundra Port */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-agro-50 text-agro-800 flex items-center justify-center">
            <Anchor className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-agro-700 uppercase tracking-wider">Primary Container Port</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Mundra Port (INMUN)</h2>
            <p className="text-xs text-slate-500 font-medium">Gulf of Kutch, Gujarat, India</p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            India's largest private commercial port with dedicated deep-draft berths accommodating mega-container vessels. Direct weekly mainline services to the Middle East, Europe, and the Far East.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-500">Transit to Jebel Ali (UAE):</span>
              <span className="text-slate-900">3 - 4 Days</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-slate-500">Transit to Rotterdam / Hamburg:</span>
              <span className="text-slate-900">22 - 25 Days</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-slate-500">Transit to Singapore / Port Klang:</span>
              <span className="text-slate-900">10 - 12 Days</span>
            </div>
          </div>
        </div>

        {/* Kandla Port */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-700 flex items-center justify-center">
            <Anchor className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-gold-700 uppercase tracking-wider">Bulk Vessel & Container Gateway</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Deendayal Port / Kandla (INIXY)</h2>
            <p className="text-xs text-slate-500 font-medium">Kutch, Gujarat, India</p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            One of India's major public trust ports, specializing in high-tonnage dry bulk commodity shipments, chartered vessels, and standard breakbulk agricultural cargoes.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-500">Best for:</span>
              <span className="text-slate-900">Bulk Grain, Meal & Vessel Charter</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-slate-500">Distance from Rajkot Facility:</span>
              <span className="text-slate-900">~220 KM (4-Hour Highway Transit)</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-slate-500">Terminal Surveyor Access:</span>
              <span className="text-slate-900">24/7 SGS, Geo-Chem, Bureau Veritas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stuffing & Fumigation Protocols */}
      <div className="bg-agro-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black">
          Strict Container Stuffing & Phytosanitary Protocols
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-agro-100">
          <div className="bg-agro-950/60 p-5 rounded-2xl border border-agro-800 space-y-2">
            <ShieldCheck className="w-5 h-5 text-gold-400" />
            <h3 className="font-bold text-sm text-white">Kraft Paper & Desiccant Lining</h3>
            <p className="leading-relaxed">
              Every 20ft & 40ft dry container is lined with multi-layer corrugated craft paper and equipped with silica gel pole desiccants to absorb maritime transit sweat.
            </p>
          </div>
          <div className="bg-agro-950/60 p-5 rounded-2xl border border-agro-800 space-y-2">
            <Clock className="w-5 h-5 text-gold-400" />
            <h3 className="font-bold text-sm text-white">Certified Methyl Bromide Fumigation</h3>
            <p className="leading-relaxed">
              Carried out by government-authorized pest control operators with official Phytosanitary & Fumigation Certificates adhering to destination quarantine norms.
            </p>
          </div>
          <div className="bg-agro-950/60 p-5 rounded-2xl border border-agro-800 space-y-2">
            <CheckCircle2 className="w-5 h-5 text-gold-400" />
            <h3 className="font-bold text-sm text-white">Independent Surveyor Inspection</h3>
            <p className="leading-relaxed">
              Pre-shipment sampling, weighing, and container stuffing witnessed by third-party surveyors (SGS, Cotecna, Geo-Chem) with continuous photographic records.
            </p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <Link
            to="/tools/container-calculator"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-agro-950 font-extrabold text-sm px-6 py-3.5 rounded-xl transition shadow-lg"
          >
            Calculate Payload for Your Shipment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
