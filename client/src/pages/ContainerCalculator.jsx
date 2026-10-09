import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Layers, ChevronRight, Calculator, Scale, AlertCircle, 
  CheckCircle2, ArrowRight, Anchor
} from 'lucide-react';
import { toolsService } from '../services/api';

export default function ContainerCalculator() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    container_type: '20ft',
    commodity_category: searchParams.get('category') || 'peanuts',
    bag_weight_kg: '50',
    bag_count: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    setLoading(true);
    try {
      const res = await toolsService.calculateContainer(formData);
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
  }, [formData.container_type, formData.commodity_category, formData.bag_weight_kg]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    calculate();
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
          <span className="text-slate-800 font-semibold">Container Load Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Marine Container Load Calculator (FCL)
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Estimate full container load (FCL) stuffing capacity, total bag count, gross cargo weight, and marine VGM for 20ft & 40ft sea containers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Parameters Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Container & Packaging Specs
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
              Container Type
            </label>
            <select
              name="container_type"
              value={formData.container_type}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600 font-semibold"
            >
              <option value="20ft">20ft Standard Dry Container (Max ~28 MT)</option>
              <option value="40ft">40ft Standard Dry Container (Max ~28.5 MT)</option>
              <option value="40ft_hc">40ft High Cube Container (Max ~28.6 MT)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
              Commodity Category
            </label>
            <select
              name="commodity_category"
              value={formData.commodity_category}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
            >
              <option value="peanuts">Peanuts & Groundnut Kernels</option>
              <option value="sesame">Sesame Seeds (Hulled & Natural)</option>
              <option value="spices">Whole Spices (Cumin, Coriander, Fennel)</option>
              <option value="pulses">Chickpeas & Pulses</option>
              <option value="grains">Grains & Basmati Rice</option>
              <option value="dehydrated">Dehydrated Onion & Garlic</option>
              <option value="feed">Animal Feed Meals (Soybean, Rapeseed)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
              Bag Unit Weight (KG)
            </label>
            <select
              name="bag_weight_kg"
              value={formData.bag_weight_kg}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
            >
              <option value="25">25 Kg Bags</option>
              <option value="50">50 Kg Bags (Standard Export)</option>
              <option value="1000">1000 Kg Jumbo Big Bags</option>
            </select>
          </div>

          <form onSubmit={handleCustomSubmit} className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
              Custom Bag Count (Optional Override)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="bag_count"
                value={formData.bag_count}
                onChange={handleChange}
                placeholder="Auto-calculated payload"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
              <button
                type="submit"
                className="bg-agro-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shrink-0"
              >
                Apply
              </button>
            </div>
          </form>
        </div>

        {/* Calculation Results Card */}
        <div className="lg:col-span-7 space-y-6">
          {result && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-agro-700 uppercase tracking-wider block">
                    Calculated Payload
                  </span>
                  <h3 className="text-xl font-black text-slate-900">{result.container_name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-agro-900 font-mono">{result.total_bags}</span>
                  <span className="text-xs text-slate-500 block">Total Bags</span>
                </div>
              </div>

              {/* Weight Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase block font-semibold">Net Cargo Weight</span>
                  <span className="font-bold text-slate-900 text-base font-mono">{result.net_weight_mt} MT</span>
                  <span className="text-[10px] text-slate-500 block">({result.net_weight_kg.toLocaleString()} KG)</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase block font-semibold">Gross Cargo Weight</span>
                  <span className="font-bold text-slate-900 text-base font-mono">{result.gross_weight_mt} MT</span>
                  <span className="text-[10px] text-slate-500 block">({result.gross_weight_kg.toLocaleString()} KG)</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase block font-semibold">Verified Gross Mass (VGM)</span>
                  <span className="font-bold text-emerald-700 text-base font-mono">{result.total_vgm_mt} MT</span>
                  <span className="text-[10px] text-slate-500 block">Incl. container tare</span>
                </div>
              </div>

              {/* Payload Utilization Gauge */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Max Legal Container Payload Utilization:</span>
                  <span className="text-agro-800 font-bold">{result.payload_utilization_percent}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-agro-600 to-agro-800 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, result.payload_utilization_percent)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>0 MT</span>
                  <span>Max Payload: {result.max_allowed_payload_mt} MT</span>
                </div>
              </div>

              {/* Maritime Assumptions */}
              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
                <div className="font-bold text-slate-800 mb-1">Berth & Highway Shipping Guidelines:</div>
                {result.assumptions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-agro-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  to={`/rfq?quantity=${result.net_weight_mt}&packaging_preference=${formData.bag_weight_kg} Kg PP Bags`}
                  className="w-full bg-agro-800 hover:bg-agro-900 text-white font-bold text-xs py-3.5 rounded-xl text-center shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>Request RFQ for this Container Load</span>
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
