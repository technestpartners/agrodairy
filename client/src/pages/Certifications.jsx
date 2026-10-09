import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, CheckCircle2, Search, AlertCircle, ChevronRight, 
  Award, FileText, Calendar, ExternalLink
} from 'lucide-react';
import { qualityService } from '../services/api';

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    qualityService.getCertifications()
      .then(res => {
        if (res.success) setCertifications(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError('');
    setVerifyResult(null);

    try {
      const res = await qualityService.verifyCertificate(searchQuery.trim());
      if (res.success) {
        setVerifyResult(res.data);
      } else {
        setError(res.message || 'No matching certificate found.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Certificate verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-agro-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/quality" className="hover:text-agro-800">Quality</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Certifications & Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Food Safety & International Compliance
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Agro Dairy maintains rigorous compliance with global export bodies. All processing facilities adhere to strict microbiological, chemical, and physical food safety protocols.
        </p>
      </div>

      {/* Live Certificate Verification Tool */}
      <div className="bg-gradient-to-r from-agro-900 to-agro-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-agro-700/60 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-1">
            Official Compliance Registry
          </span>
          <h2 className="text-2xl font-bold">
            Live Certificate Verification Desk
          </h2>
          <p className="text-xs text-agro-100 mt-1 max-w-xl">
            Enter any certificate number or authority name (e.g. APEDA, FSSAI, ISO, HALAL) to confirm our live registration status and issuing body credentials.
          </p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. APEDA, FSSAI, ISO 22000, or certificate number"
              className="w-full bg-agro-950/80 border border-agro-700 text-white placeholder-slate-400 pl-11 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gold-500 hover:bg-gold-600 text-agro-950 font-extrabold text-sm px-8 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md shrink-0"
          >
            {loading ? 'Checking...' : 'Verify Now'}
          </button>
        </form>

        {error && (
          <div className="bg-rose-950/80 border border-rose-700 text-rose-200 rounded-xl p-4 text-xs max-w-2xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {verifyResult && (
          <div className="bg-white text-slate-800 rounded-2xl p-6 max-w-2xl shadow-lg border border-white/20 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-lg text-slate-900">{verifyResult.title}</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800">
                {verifyResult.status || 'Active'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block uppercase font-medium">Certificate No:</span>
                <span className="font-mono font-bold text-slate-800 text-sm">{verifyResult.certificate_no || 'Certified'}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium">Issuing Authority:</span>
                <span className="font-bold text-slate-800 text-sm">{verifyResult.issuing_body}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium">Issue Date:</span>
                <span className="font-medium text-slate-700">{verifyResult.issue_date || 'Standard Validity'}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-medium">Valid Until:</span>
                <span className="font-medium text-slate-700">{verifyResult.expiry_date || 'Renewed Annually'}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 pt-2 border-t border-slate-100">
              {verifyResult.description}
            </p>
          </div>
        )}
      </div>

      {/* Certifications Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900">
          Official Accreditations & Licenses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map(cert => (
            <div key={cert.id} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-agro-50 text-agro-800 flex items-center justify-center font-extrabold text-sm border border-agro-200">
                    <Award className="w-6 h-6 text-agro-700" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold uppercase">
                    {cert.status}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900">{cert.title}</h3>
                <span className="text-xs font-semibold text-agro-700 block mt-0.5">{cert.issuing_body}</span>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3 text-xs text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>Reg / Cert No:</span>
                  <span className="font-mono font-bold text-slate-800">{cert.certificate_no || 'On File'}</span>
                </div>
                {cert.expiry_date && (
                  <div className="flex justify-between">
                    <span>Valid Through:</span>
                    <span className="font-semibold text-slate-700">{new Date(cert.expiry_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
