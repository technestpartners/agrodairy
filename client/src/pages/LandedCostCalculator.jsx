import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, ChevronRight, DollarSign, TrendingUp, ShieldCheck, 
  ArrowRight, FileSpreadsheet
} from 'lucide-react';
import { toolsService } from '../services/api';

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-agro-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/tools" className="hover:text-agro-800">Export Tools</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Landed Cost Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Import Landed Cost Estimator
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Simulate full import landed budget from FOB Mundra/Kandla through ocean freight, marine transit insurance, customs duties, and destination port clearance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Parameters Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Financial & Shipping Inputs
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
              FOB Price (USD / MT)
            </label>
            <input
              type="number"
              name="fob_price"
              value={formData.fob_price}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-agro-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
              Shipment Quantity (MT)
            </label>
            <input
              type="number"
              name="quantity_mt"
              value={formData.quantity_mt}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-agro-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
              Ocean Freight Rate (USD / MT)
            </label>
            <input
              type="number"
              name="freight_per_mt"
              value={formData.freight_per_mt}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                Insurance (%)
              </label>
              <input
                type="number"
                step="0.1"
                name="insurance_percent"
                value={formData.insurance_percent}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                Duty / Tariff (%)
              </label>
              <input
                type="number"
                step="0.5"
                name="customs_duty_percent"
                value={formData.customs_duty_percent}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
              Port Handling (USD / MT)
            </label>
            <input
              type="number"
              name="port_handling_per_mt"
              value={formData.port_handling_per_mt}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
              Local FX Conversion Rate (Optional)
            </label>
            <input
              type="number"
              step="0.01"
              name="exchange_rate"
              value={formData.exchange_rate}
              onChange={handleChange}
              placeholder="e.g. 3.67 for AED, 0.92 for EUR"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
            />
          </div>
        </div>

        {/* Breakdown Results */}
        <div className="lg:col-span-7 space-y-6">
          {result && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
              {/* Grand Total Banner */}
              <div className="bg-gradient-to-r from-agro-900 to-agro-800 text-white rounded-2xl p-6 space-y-3">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">
                  Total Landed Import Cost
                </span>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="text-3xl sm:text-4xl font-black font-mono">
                    ${result.total_landed_cost.toLocaleString()}
                  </div>
                  <div className="text-sm text-gold-300 font-semibold font-mono">
                    ≈ {result.total_in_local_currency.toLocaleString()} Local Curr
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-agro-700/80 text-xs">
                  <div>
                    <span className="text-agro-200 block">Unit Cost Per MT</span>
                    <span className="font-bold text-base font-mono">${result.landed_cost_per_mt.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-agro-200 block">Unit Cost Per KG</span>
                    <span className="font-bold text-base font-mono">${result.landed_cost_per_kg}</span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Waterfall Breakdown */}
              <div className="space-y-3 text-xs">
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-2">
                  Incoterm Cost Buildup
                </h3>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Total FOB Cargo Value ({result.quantity_mt} MT @ ${formData.fob_price}/MT):</span>
                  <span className="font-mono font-bold text-slate-800">${result.fob_total.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">+ Ocean Freight from Mundra:</span>
                  <span className="font-mono font-bold text-slate-800">${result.freight_total.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">+ Marine Transit Insurance ({formData.insurance_percent}%):</span>
                  <span className="font-mono font-bold text-slate-800">${result.insurance_total.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 bg-slate-50 px-3 rounded-lg font-bold text-agro-900">
                  <span>= CIF Discharge Port Value:</span>
                  <span className="font-mono">${result.cif_total.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">+ Destination Customs Duty ({formData.customs_duty_percent}%):</span>
                  <span className="font-mono font-bold text-slate-800">${result.customs_duty_total.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">+ Port Handling & Terminal Charges:</span>
                  <span className="font-mono font-bold text-slate-800">${result.port_handling_total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/rfq?quantity=${result.quantity_mt}&target_price=${formData.fob_price}`}
                  className="w-full bg-agro-800 hover:bg-agro-900 text-white font-bold text-xs py-3.5 rounded-xl text-center shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>Request Official Commercial Quotation</span>
                  <ArrowRight className="w-4 h-4 text-gold-400" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
