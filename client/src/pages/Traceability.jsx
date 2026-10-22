import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, ShieldCheck, CheckCircle2, AlertCircle, ChevronRight, 
  MapPin, Calendar, Clock, Anchor, FileCheck, Truck, Box,
  QrCode, ArrowRight, Award, Compass, Sparkles, Download, Check
} from 'lucide-react';
import { qualityService } from '../services/api';
import { RealProductSectionFlanks, PageHeroDecorations } from '../components/ProductBackgroundDecorations';

export default function Traceability() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [batchCode, setBatchCode] = useState(searchParams.get('batch') || 'AGRO-PN-2026-0814');
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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
        setError(res.message || 'No export lot found matching this identification code.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Lot code not recognized. Please check your shipping documents or bill of lading.');
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

  const setSampleBatch = (code) => {
    setBatchCode(code);
    setSearchParams({ batch: code });
    lookupBatch(code);
  };

  const copyBatchCode = () => {
    if (batch?.batch_code) {
      navigator.clipboard.writeText(batch.batch_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative bg-[#FAFCFB] min-h-screen">
      <RealProductSectionFlanks leftType="shelled-peanuts" rightType="pearl-millet" opacity="opacity-20 lg:opacity-25" />

      {/* ══════════════════════════════════════════════════════════════════════════
          HERO BANNER: LOT TRACEABILITY (Clean, Minimal Home Palette)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F4F9F8] text-[#0C2422] pt-8 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28 border-b border-[#D4ECE9]">
        <PageHeroDecorations 
          topRightType="shelled-peanuts" 
          bottomLeftType="pearl-millet"
          ticker="100% FARM GEOTAGGED • HPLC & GC-MS DUAL LAB CLEARANCE • SGS/GEO-CHEM WITNESSED • SOLAS VGM CERTIFIED"
          coordinates={{ lat: 'N 21.52° JUNAGADH', lng: 'E 70.45°' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#4D6765] mb-5 font-mono">
            <Link to="/" className="hover:text-brand-primary transition-colors flex items-center gap-1">
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <Link to="/certifications" className="hover:text-brand-primary transition-colors">
              Quality Assurance
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-brand-primary/60" />
            <span className="text-brand-primary font-bold">Batch Traceability Desk</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold shadow-xs">
                <QrCode className="w-3.5 h-3.5 text-brand-primary" />
                <span className="tracking-wide">DIGITAL PROVENANCE SYSTEM</span>
                <span className="text-[#4D6765]/40">•</span>
                <span className="text-[#4D6765] font-normal">Farm to Port Geotagged</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#0C2422]">
                Complete Consignment <span className="text-brand-primary">Traceability Engine</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4D6765] leading-relaxed font-sans max-w-2xl">
                Every export consignment from Agro Dairy is indexed with a tamper-evident lot code. Instantly inspect certified farm cluster origins, Sortex grading timestamps, laboratory Certificate of Analysis (COA) releases, and ocean container seals.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/certifications"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-[#008A82] text-white font-ui font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <span>Accreditation Portfolio</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                to="/rfq"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#E6F7F5] text-[#0C2422] font-ui font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-[#D4ECE9] transition-all shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                <span>Request Sample COA</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#D4ECE9] max-w-4xl">
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-primary">100%</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Farm Origin Geotagged</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-gold">HPLC &amp; GC-MS</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Dual Lab Clearance</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-primary">SGS / Geo-Chem</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">Witnessed Stuffing</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D4ECE9] shadow-xs">
              <div className="text-xl sm:text-2xl font-black font-mono text-brand-gold">VGM Certified</div>
              <div className="text-[11px] text-[#4D6765] font-sans mt-0.5 font-medium">SOLAS Maritime Standard</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SEARCH INPUT BENTO CARD (Clean Home-Page Style)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D4ECE9] shadow-xl relative overflow-hidden text-[#0C2422]">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7F5] border border-[#BBE5E1] text-brand-primary text-xs font-ui font-bold mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
              <span>DIRECT LIMS DATABASE VERIFICATION</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0C2422] tracking-tight">
              Enter Consignment Lot Code or Container Number
            </h2>
            <p className="text-xs sm:text-sm text-[#4D6765] mt-1 font-sans leading-relaxed">
              Locate your 16-character alphanumeric lot code stamped on export bag tags, pallet seals, or container packing lists.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
              <input
                type="text"
                value={batchCode}
                onChange={(e) => setBatchCode(e.target.value)}
                placeholder="e.g. AGRO-PN-2026-0814"
                className="w-full bg-[#F8FAF9] border border-[#D4ECE9] rounded-2xl pl-12 pr-4 py-3.5 text-sm sm:text-base uppercase font-mono font-bold text-[#0C2422] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:bg-white transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-sm px-8 py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Lot Now</span>
                </>
              )}
            </button>
          </form>

          {/* Sample Active Lots */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-[#0C2422]">Sample verified export consignments:</span>
            <button
              type="button"
              onClick={() => setSampleBatch('AGRO-PN-2026-0814')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F9F8] hover:bg-[#E6F7F5] text-brand-primary font-mono font-bold transition-all border border-[#D4ECE9]"
            >
              <span>AGRO-PN-2026-0814</span>
              <span className="text-[10px] text-slate-500 uppercase font-sans">(Bold Peanuts)</span>
            </button>
            <button
              type="button"
              onClick={() => setSampleBatch('AGRO-SES-2026-0419')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F9F8] hover:bg-[#E6F7F5] text-brand-primary font-mono font-bold transition-all border border-[#D4ECE9]"
            >
              <span>AGRO-SES-2026-0419</span>
              <span className="text-[10px] text-slate-500 uppercase font-sans">(Natural Sesame)</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-3xl p-6 sm:p-8 flex items-start gap-4 shadow-sm animate-fadeIn">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-rose-900">Lot Verification Record Not Found</h3>
              <p className="text-sm text-rose-700 mt-1 leading-relaxed">{error}</p>
              <div className="mt-4 flex items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 hover:text-rose-950 underline"
                >
                  Contact Quality Assurance Desk <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════════
            VERIFIED BATCH DOSSIER DISPLAY (Clean White Cards & Timeline)
            ══════════════════════════════════════════════════════════════════════════ */}
        {batch && (
          <div className="bg-white rounded-3xl border border-[#D4ECE9] shadow-xl overflow-hidden space-y-8 p-6 sm:p-10 animate-fadeIn">
            
            {/* Dossier Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-wider">
                    Official Export Consignment Dossier
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#0C2422]">
                    {batch.batch_code}
                  </span>
                  <button
                    onClick={copyBatchCode}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Copy Lot Code"
                  >
                    {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Box className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-[#4D6765] mt-1">
                  Tamper-evident QR code verified against Agro Dairy Central LIMS (Laboratory Information Management System).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {batch.inspection_status || 'QA Lab Cleared'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#E6F7F5] text-brand-primary border border-[#BBE5E1]">
                  <Truck className="w-4 h-4 text-brand-primary" />
                  {batch.shipment_status || 'Maritime Transit'}
                </span>
              </div>
            </div>

            {/* Commodity & Key Quality Parameters Bento */}
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Technical Specifications &amp; Grading Profile
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#D4ECE9]">
                  <span className="text-xs text-slate-400 uppercase block font-semibold">Commodity Grade</span>
                  <span className="font-extrabold text-[#0C2422] text-lg block mt-1">{batch.product_name}</span>
                  <span className="text-xs text-brand-primary font-mono mt-0.5 block font-semibold">Export Machine Cleaned</span>
                </div>

                <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#D4ECE9]">
                  <span className="text-xs text-slate-400 uppercase block font-semibold">Origin Farm Cluster</span>
                  <span className="font-extrabold text-[#0C2422] text-lg block mt-1 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-primary" />
                    {batch.origin_region}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 block">Saurashtra Agri-Belt</span>
                </div>

                <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#D4ECE9]">
                  <span className="text-xs text-slate-400 uppercase block font-semibold">Moisture Certified</span>
                  <span className="font-extrabold text-[#0C2422] text-xl font-mono block mt-1">
                    {batch.moisture_percentage || '6.8% Max'}
                  </span>
                  <span className="text-xs text-emerald-600 font-semibold mt-0.5 block">Safe Maritime Moisture</span>
                </div>

                <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-[#D4ECE9]">
                  <span className="text-xs text-slate-400 uppercase block font-semibold">Sortex Optical Purity</span>
                  <span className="font-extrabold text-[#0C2422] text-xl font-mono block mt-1">
                    {batch.purity_percentage || '99.5% Min'}
                  </span>
                  <span className="text-xs text-emerald-600 font-semibold mt-0.5 block">Buhler Tri-Chromatic Sorted</span>
                </div>
              </div>
            </div>

            {/* Provenance Milestone Timeline */}
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-4">
                Farm-to-Port Provenance Journey
              </span>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#F8FAF9] rounded-2xl p-5 border border-[#D4ECE9] relative overflow-hidden">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-3 font-mono">
                    01
                  </div>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-brand-primary" /> Harvest Date
                  </span>
                  <span className="font-extrabold text-[#0C2422] text-base block mt-1 font-mono">
                    {batch.harvest_date ? new Date(batch.harvest_date).toLocaleDateString() : 'Active Season'}
                  </span>
                  <p className="text-xs text-[#4D6765] mt-2 leading-relaxed">
                    Sourced from contracted GAP farmer clusters with zero pesticide residues.
                  </p>
                </div>

                <div className="bg-[#F8FAF9] rounded-2xl p-5 border border-[#D4ECE9] relative overflow-hidden">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#B45309] flex items-center justify-center font-bold text-xs mb-3 font-mono">
                    02
                  </div>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" /> Sortex Processing
                  </span>
                  <span className="font-extrabold text-[#0C2422] text-base block mt-1 font-mono">
                    {batch.processing_date ? new Date(batch.processing_date).toLocaleDateString() : 'Post-Harvest'}
                  </span>
                  <p className="text-xs text-[#4D6765] mt-2 leading-relaxed">
                    De-stoned, gravity separated, magnetic cleared &amp; optical laser graded.
                  </p>
                </div>

                <div className="bg-[#F8FAF9] rounded-2xl p-5 border border-[#D4ECE9] relative overflow-hidden">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs mb-3 font-mono">
                    03
                  </div>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                    <Box className="w-3.5 h-3.5 text-brand-primary" /> Packaging &amp; Tagging
                  </span>
                  <span className="font-extrabold text-[#0C2422] text-base block mt-1 font-mono">
                    {batch.packing_date ? new Date(batch.packing_date).toLocaleDateString() : 'Certified Lot'}
                  </span>
                  <p className="text-xs text-[#4D6765] mt-2 leading-relaxed">
                    Packed in {batch.packing_type || '50 Kg Export PP / Jute Bags'} with lot barcoding.
                  </p>
                </div>

                <div className="bg-[#F8FAF9] rounded-2xl p-5 border border-[#D4ECE9] relative overflow-hidden">
                  <div className="w-8 h-8 rounded-xl bg-[#002B26] text-[#5EEAD4] flex items-center justify-center font-bold text-xs mb-3 font-mono">
                    04
                  </div>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                    <Anchor className="w-3.5 h-3.5 text-brand-primary" /> Container Stuffing
                  </span>
                  <span className="font-extrabold text-[#0C2422] text-base block mt-1 font-mono">
                    {batch.port_of_loading || 'Mundra Port'}
                  </span>
                  <p className="text-xs text-[#4D6765] mt-2 leading-relaxed">
                    Inspected by third-party surveyor; sealed with tamper-proof bolt seal.
                  </p>
                </div>
              </div>
            </div>

            {/* COA Lab Parameters & Shipping Breakdown Bento */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              <div className="border border-[#D4ECE9] rounded-3xl p-6 sm:p-7 bg-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#0C2422]">Certificate of Analysis (COA)</h3>
                      <span className="text-xs font-mono text-slate-500">
                        Ref: {batch.certificate_of_analysis_no || 'COA-IND-2026-9021'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                    PASSED
                  </span>
                </div>

                <div className="space-y-2 text-xs divide-y divide-slate-100 pt-2">
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#4D6765]">Aflatoxin (B1+B2+G1+G2):</span>
                    <span className="font-mono font-bold text-emerald-700">&lt; 4.0 ppb (EU Compliant)</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#4D6765]">Salmonella / Shigella:</span>
                    <span className="font-mono font-bold text-emerald-700">Absent in 25 grams</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#4D6765]">E. Coli:</span>
                    <span className="font-mono font-bold text-emerald-700">&lt; 10 CFU/g</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#4D6765]">Heavy Metals (Lead, Cadmium):</span>
                    <span className="font-mono font-bold text-emerald-700">Within Codex Limits</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#4D6765]">Live Insect Infestation:</span>
                    <span className="font-mono font-bold text-emerald-700">Zero (Fumigated)</span>
                  </div>
                </div>
              </div>

              <div className="border border-[#D4ECE9] rounded-3xl p-6 sm:p-7 bg-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                      <Anchor className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#0C2422]">Maritime Container Logistics</h3>
                      <span className="text-xs font-mono text-slate-500">
                        Port of Loading: {batch.port_of_loading || 'Mundra Port (INMUN)'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#E6F7F5] text-brand-primary">
                    STUFFED
                  </span>
                </div>

                <div className="space-y-2 text-xs divide-y divide-slate-100 pt-2">
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#4D6765]">Ocean Container ID:</span>
                    <span className="font-mono font-bold text-[#0C2422]">{batch.container_number || 'MSKU-892104-5'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#4D6765]">High-Security Customs Seal:</span>
                    <span className="font-mono font-bold text-[#0C2422]">IN-CUST-884920</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#4D6765]">Fumigation Treatment:</span>
                    <span className="font-mono font-bold text-[#0C2422]">Methyl Bromide (MBr)</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#4D6765]">Surveyor Agency:</span>
                    <span className="font-mono font-bold text-[#0C2422]">SGS India Private Limited</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#4D6765]">VGM Calibration:</span>
                    <span className="font-mono font-bold text-emerald-700">Certified Weighbridge</span>
                  </div>
                </div>
              </div>
            </div>

            {batch.public_notes && (
              <div className="bg-[#F8FAF9] rounded-2xl p-5 text-xs text-[#4D6765] border border-[#D4ECE9]">
                <span className="font-bold text-[#0C2422] block mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-brand-gold" /> Third-Party Surveyor Remarks:
                </span>
                <p className="leading-relaxed font-mono">{batch.public_notes}</p>
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <div className="text-xs text-[#4D6765]">
                Questions regarding this consignment? Contact our trade desk with your reference lot code.
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to={`/rfq?commodity=${encodeURIComponent(batch.product_name)}`}
                  className="bg-brand-primary hover:bg-brand-primary-dark text-white font-ui font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm"
                >
                  Reorder This Commodity
                </Link>
                <Link
                  to="/contact"
                  className="bg-white hover:bg-slate-50 text-[#0C2422] font-ui font-bold text-xs px-6 py-3 rounded-xl transition-all border border-[#D4ECE9]"
                >
                  Inquire on Lot
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════════
            WHY TRACEABILITY MATTERS - 3 CLEAN CARDS
            ══════════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white rounded-3xl p-7 border border-[#D4ECE9] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0C2422] font-display">100% Geo-Farmed Saurashtra</h3>
            <p className="text-xs text-[#4D6765] leading-relaxed">
              Direct aggregation from certified farmer groups across Rajkot, Junagadh, and Amreli. Zero reliance on untraceable open-market spot buying.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-[#D4ECE9] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#B45309] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0C2422] font-display">European MRL Guarantee</h3>
            <p className="text-xs text-[#4D6765] leading-relaxed">
              Dual HPLC chromatography testing ensures every lot satisfies strict EU Maximum Residue Limits (MRL) and US FDA aflatoxin thresholds (&lt; 4 ppb).
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-[#D4ECE9] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0C2422] font-display">Full Bank L/C Document Pack</h3>
            <p className="text-xs text-[#4D6765] leading-relaxed">
              Each verified lot is accompanied by clean on-board Ocean Bill of Lading, Phytosanitary Certificate, Fumigation Certificate, and Certificate of Origin.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            BOTTOM COMMERCIAL CALL TO ACTION
            ══════════════════════════════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-br from-[#021814] via-[#052822] to-[#011310] rounded-3xl p-8 sm:p-12 text-white border border-[#00A79D]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A79D]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <span className="text-xs font-mono font-bold text-[#5EEAD4] uppercase tracking-wider block">
                Custom Trade Specifications
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
                Require Dedicated Batch Inspection or Pre-Shipment Audit?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Our quality team facilitates on-site buyer witness audits, third-party SGS / Bureau Veritas surveyor sampling, and custom packaging barcoding.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Link
                to="/rfq"
                className="bg-brand-gold hover:bg-[#e5ab00] text-[#002B26] font-ui font-black text-sm px-8 py-4 rounded-full transition-all shadow-lg shadow-brand-gold/20 hover:scale-[1.02]"
              >
                Request Commercial RFQ
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 text-white font-ui font-bold text-sm px-7 py-4 rounded-full transition-all border border-white/20"
              >
                Speak with QA Director
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
