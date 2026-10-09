import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, ShieldCheck, CheckCircle2, AlertCircle, ChevronRight, 
  MapPin, Calendar, Clock, Anchor, FileCheck, Truck, Box
} from 'lucide-react';
import { qualityService } from '../services/api';

export default function Traceability() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [batchCode, setBatchCode] = useState(searchParams.get('batch') || 'AGRO-PN-2026-0814');
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupBatch = async (code) => {
    if (!code) return;
    setLoading(true);
    setError('');
    setBatch(null);

    try {
      const res = await qualityService.verifyBatch(code);
      if (res.success && res.found) {
        setBatch(res.data);
      } else {
        setError(res.message || 'No lot found matching code.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Batch not found. Please verify the code.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const q = searchParams.get('batch');
    if (q) {
      setBatchCode(q);
      lookupBatch(q);
    } else {
      lookupBatch('AGRO-PN-2026-0814');
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!batchCode.trim()) return;
    setSearchParams({ batch: batchCode.trim() });
    lookupBatch(batchCode.trim());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-agro-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/quality" className="hover:text-agro-800">Quality</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Lot Traceability</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Farm-to-Port Lot Traceability System
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Verify harvest origin, processing dates, moisture parameters, and Certificate of Analysis (COA) clearance directly from our quality database.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
            <input
              type="text"
              value={batchCode}
              onChange={(e) => setBatchCode(e.target.value)}
              placeholder="Enter Lot Code (e.g. AGRO-PN-2026-0814)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm uppercase font-mono focus:outline-none focus:ring-2 focus:ring-agro-600"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-agro-800 hover:bg-agro-900 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md shrink-0"
          >
            {loading ? 'Verifying...' : 'Verify Lot'}
          </button>
        </form>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Sample active export batches:</span>
          <button
            type="button"
            onClick={() => {
              setBatchCode('AGRO-PN-2026-0814');
              setSearchParams({ batch: 'AGRO-PN-2026-0814' });
            }}
            className="text-agro-700 font-mono font-bold hover:underline"
          >
            AGRO-PN-2026-0814
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-bold">Lot Verification Failed</div>
            <div className="text-xs text-rose-700 mt-0.5">{error}</div>
          </div>
        </div>
      )}

      {/* Batch Results */}
      {batch && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden space-y-6 p-6 sm:p-8">
          {/* Top Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Export Batch Code
              </span>
              <div className="text-2xl font-black font-mono text-agro-950 flex items-center gap-2">
                {batch.batch_code}
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-4 h-4" />
                {batch.inspection_status || 'QA Cleared'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-agro-900 text-white">
                <Truck className="w-3.5 h-3.5" />
                {batch.shipment_status || 'Dispatched'}
              </span>
            </div>
          </div>

          {/* Commodity Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[11px] text-slate-400 uppercase block font-semibold">Commodity</span>
              <span className="font-bold text-slate-900 text-sm">{batch.product_name}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase block font-semibold">Origin Farm Region</span>
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-agro-700" />
                {batch.origin_region}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase block font-semibold">Moisture Content</span>
              <span className="font-bold text-slate-900 text-sm font-mono">{batch.moisture_percentage || '6.8% Max'}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase block font-semibold">Sortex Purity</span>
              <span className="font-bold text-slate-900 text-sm font-mono">{batch.purity_percentage || '99.5% Min'}</span>
            </div>
          </div>

          {/* Provenance Milestones */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-4">
              Quality & Processing Timeline
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-slate-200 rounded-xl p-4 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-agro-600" /> Farm Harvest
                </span>
                <span className="font-bold text-sm text-slate-800 block">
                  {batch.harvest_date ? new Date(batch.harvest_date).toLocaleDateString() : 'N/A'}
                </span>
                <span className="text-[11px] text-slate-500 block">Saurashtra Farm Cluster</span>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-agro-600" /> Sortex Processing
                </span>
                <span className="font-bold text-sm text-slate-800 block">
                  {batch.processing_date ? new Date(batch.processing_date).toLocaleDateString() : 'N/A'}
                </span>
                <span className="text-[11px] text-slate-500 block">Optical Color Sorted</span>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Box className="w-3.5 h-3.5 text-agro-600" /> Packaging & QA
                </span>
                <span className="font-bold text-sm text-slate-800 block">
                  {batch.packing_date ? new Date(batch.packing_date).toLocaleDateString() : 'N/A'}
                </span>
                <span className="text-[11px] text-slate-500 block">{batch.packing_type || '50 Kg PP Bags'}</span>
              </div>
            </div>
          </div>

          {/* Shipping & COA Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Certificate of Analysis (COA)
              </div>
              <p className="text-xs text-slate-600">
                COA Reference: <span className="font-mono font-bold text-slate-800">{batch.certificate_of_analysis_no || 'COA-IND-2026-9021'}</span>
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Aflatoxin: Negative (&lt; 4 ppb) • Salmonella: Absent / 25g • E. Coli: Negative • Free of live weevils.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Anchor className="w-4 h-4 text-agro-700" />
                Container & Port Loading
              </div>
              <p className="text-xs text-slate-600">
                Port of Loading: <span className="font-bold text-slate-800">{batch.port_of_loading || 'Mundra Port'}</span>
              </p>
              <p className="text-xs text-slate-600">
                Container ID: <span className="font-mono font-bold text-slate-800">{batch.container_number || 'MSKU-892104-5'}</span>
              </p>
            </div>
          </div>

          {batch.public_notes && (
            <div className="bg-slate-50 rounded-2xl p-4 text-xs text-slate-600 border border-slate-200">
              <span className="font-bold text-slate-800 block mb-0.5">Surveyor & Inspector Remarks:</span>
              {batch.public_notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
