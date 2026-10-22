import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, ChevronRight, DollarSign, TrendingUp, ShieldCheck, 
  ArrowRight, FileSpreadsheet, Sparkles, Scale, Anchor
} from 'lucide-react';
import { toolsService } from '../services/api';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

export default function LandedCostCalculator() {
  const [formData, setFormData] = useState({
    fob_price: '1250',
    quantity_mt: '19',
    freight_per_mt: '65',
    insurance_percent: '0.5',
    customs_duty_percent: '5',
    port_handling_per_mt: '15',
    exchange_rate: '3.67', // e.g. AED
    currency: 'USD',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    setLoading(true);
    try {
      const res = await toolsService.calculateLandedCost(formData);
      if (res.success) {
        setResult(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculate();
  }, [formData.fob_price, formData.quantity_mt, formData.freight_per_mt, formData.insurance_percent, formData.customs_duty_percent, formData.port_handling_per_mt, formData.exchange_rate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      <RealProductSectionFlanks leftType="shelled-peanuts" rightType="yellow-corn" opacity="opacity-20 lg:opacity-25" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: LANDED COST ESTIMATOR (Clean, Minimal Home Palette)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType="shelled-peanuts" 
          bottomLeftType="yellow-corn"
          ticker="FOB TO CIF WATERFALL • OCEAN FREIGHT SIMULATOR • TRANSIT INSURANCE MODELING • TARIFF & DUTY PROJECTIONS"
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
            <span className="text-brand-primary font-bold">Landed Cost Simulator</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <TrendingUp className="w-3.5 h-3.5 text-brand-primary" />
                <span className="tracking-wide">FINANCIAL IMPORT SIMULATOR</span>
                <span className="text-[#4D6765]/40">•</span>
                <span className="text-[#4D6765] font-normal">FOB to CIF &amp; DDP Cost Waterfall</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Import <span className="text-brand-primary">Landed Cost Calculator</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                Simulate full destination landed budgets from FOB Mundra/Hazira sea ports through ocean freight, marine transit insurance, destination customs tariffs, and local port clearance fees.
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
                <span>Container Load Engine</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          CALCULATOR INTERFACE & RESULTS (Clean Home-Page Cards)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#D4ECE9] shadow-xl space-y-6 text-[#0C2422]">
            <div className="border-b border-slate-100 pb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-[10px] font-ui font-bold mb-2 shadow-xs">
                <FileSpreadsheet className="w-3 h-3 text-brand-primary" />
                <span>FINANCIAL INPUT PARAMETERS</span>
              </div>
              <h2 className="text-xl font-display font-extrabold text-[#0C2422]">
                Commercial Cost Elements
              </h2>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-700 font-bold mb-1 uppercase">
                  FOB Price per Metric Ton (USD) *
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="number"
                    name="fob_price"
                    value={formData.fob_price}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl pl-9 pr-4 py-2.5 text-sm font-bold text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 uppercase">
                  Shipment Quantity (Metric Tons) *
                </label>
                <input
                  type="number"
                  name="quantity_mt"
                  value={formData.quantity_mt}
                  onChange={handleChange}
                  className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-sm font-bold text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1 uppercase">
                  Ocean Freight per MT (USD to Destination Port) *
                </label>
                <input
                  type="number"
                  name="freight_per_mt"
                  value={formData.freight_per_mt}
                  onChange={handleChange}
                  className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-sm font-bold text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1 uppercase">
                    Marine Insurance %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="insurance_percent"
                    value={formData.insurance_percent}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-sm font-bold text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1 uppercase">
                    Import Duty %
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    name="customs_duty_percent"
                    value={formData.customs_duty_percent}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-sm font-bold text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1 uppercase">
                    Port Clearing / MT
                  </label>
                  <input
                    type="number"
                    name="port_handling_per_mt"
                    value={formData.port_handling_per_mt}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-sm font-bold text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1 uppercase">
                    FX Rate to Local
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="exchange_rate"
                    value={formData.exchange_rate}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-xl px-4 py-2.5 text-sm font-bold text-[#0C2422] focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Breakdown & Total Landed Budget */}
          <div className="lg:col-span-7 space-y-6">
            {result && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D4ECE9] shadow-xl space-y-6 text-[#0C2422]">
                <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-[10px] font-ui font-bold mb-1 shadow-xs">
                      <span>ESTIMATED IMPORT VALUATION</span>
                    </div>
                    <h3 className="text-2xl font-display font-extrabold text-[#0C2422]">
                      Landed Cost Summary
                    </h3>
                  </div>
                  <div className="text-left sm:text-right bg-[#E6F7F5] px-5 py-2.5 rounded-2xl border border-[#BBE5E1]">
                    <div className="text-2xl font-black text-brand-primary font-mono leading-none">
                      ${result.landed_cost_per_mt?.toFixed(2)}
                    </div>
                    <span className="text-[11px] text-[#4D6765] font-mono">Total Landed / MT</span>
                  </div>
                </div>

                {/* Grand Total Banner */}
                <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#D4ECE9] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="text-xs text-[#4D6765] font-mono uppercase block font-bold">Total Consignment Landed Budget</span>
                    <span className="text-2xl font-black text-[#0C2422] font-mono">
                      ${result.total_landed_cost?.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                    </span>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-xs text-[#4D6765] font-mono uppercase block font-bold">In Local Currency (FX {formData.exchange_rate})</span>
                    <span className="text-xl font-bold text-brand-primary font-mono">
                      {result.local_currency_total?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Step-by-Step Cost Buildup Waterfall Table */}
                <div className="rounded-2xl border border-[#D4ECE9] overflow-hidden text-xs font-mono">
                  <div className="bg-[#F4F9F8] p-3 border-b border-[#D4ECE9] font-bold text-[#0C2422] flex justify-between uppercase">
                    <span>Incoterm Cost Element</span>
                    <span>Amount (USD)</span>
                  </div>
                  <div className="divide-y divide-slate-100 bg-white">
                    <div className="p-3 flex justify-between">
                      <span className="text-[#4D6765]">1. Base FOB Goods Value:</span>
                      <span className="font-bold text-[#0C2422]">${result.total_fob_cost?.toLocaleString()}</span>
                    </div>
                    <div className="p-3 flex justify-between">
                      <span className="text-[#4D6765]">2. Ocean Freight to Destination Port:</span>
                      <span className="font-bold text-[#0C2422]">${result.total_freight_cost?.toLocaleString()}</span>
                    </div>
                    <div className="p-3 flex justify-between bg-[#F8FAF9] font-bold">
                      <span className="text-brand-primary">Total CIF Valuation:</span>
                      <span className="text-brand-primary font-mono">${result.total_cif_cost?.toLocaleString()}</span>
                    </div>
                    <div className="p-3 flex justify-between">
                      <span className="text-[#4D6765]">3. Marine Cargo Transit Insurance:</span>
                      <span className="font-bold text-[#0C2422]">${result.total_insurance_cost?.toLocaleString()}</span>
                    </div>
                    <div className="p-3 flex justify-between">
                      <span className="text-[#4D6765]">4. Customs Tariff &amp; Duty ({formData.customs_duty_percent}%):</span>
                      <span className="font-bold text-[#0C2422]">${result.total_customs_duty?.toLocaleString()}</span>
                    </div>
                    <div className="p-3 flex justify-between">
                      <span className="text-[#4D6765]">5. Local Port Handling &amp; Clearance:</span>
                      <span className="font-bold text-[#0C2422]">${result.total_port_handling?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <span className="text-xs text-[#4D6765]">
                    Simulate formal commercial quotation with confirmed freight slots?
                  </span>
                  <Link
                    to="/rfq"
                    className="bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs px-6 py-3 rounded-full transition shadow-sm w-full sm:w-auto text-center"
                  >
                    Submit Quotation RFQ
                  </Link>
                </div>
              </div>
            )}
          </div>
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
              <span>Transparent Proforma Commercial Pricing</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Request Binding Proforma Invoice with Locked Ocean Freight
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/75 mt-2 font-sans leading-relaxed">
              Agro Dairy locks in container freight rates with carriers for 14-day validity, protecting your import budget from sudden maritime surcharges.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/rfq"
              className="bg-brand-gold hover:bg-amber-400 text-[#002B26] font-ui font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Request Binding Proforma
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/15 text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-white/20 transition-all"
            >
              Consult Trade Finance Lead
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
