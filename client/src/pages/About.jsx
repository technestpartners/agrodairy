import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, ChevronRight, ShieldCheck, Users, Award, 
  MapPin, CheckCircle2, ArrowRight
} from 'lucide-react';
import { companyService } from '../services/api';

export default function About() {
  const [team, setTeam] = useState([]);
  const [infrastructure, setInfrastructure] = useState([]);

  useEffect(() => {
    companyService.getTeam().then(res => { if (res.success) setTeam(res.data); }).catch(e => console.error(e));
    companyService.getInfrastructure().then(res => { if (res.success) setInfrastructure(res.data); }).catch(e => console.error(e));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-agro-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">About Agro Dairy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Processing & Exporting India's Finest Agricultural Commodities
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          Founded in Gujarat’s fertile peanut and sesame growing belt, Agro Dairy Export LLP connects thousands of local farming families directly with commercial food processors, re-baggers, and importers worldwide.
        </p>
      </div>

      {/* Origin & Infrastructure Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <span className="text-xs font-bold uppercase tracking-widest text-agro-700">
            Heritage & Modern Processing
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            From the Saurashtra Basin to 40+ Ports Worldwide
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The Saurashtra region of Gujarat accounts for a massive share of India's peanut, sesame, and cumin production due to its ideal red-loamy soil and sunny climate. 
            We operate integrated cleaning, de-stoning, grading, and Buhler optical Sortex color-sorting plants within hours of major farm mandis.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every lot entering our export stream undergoes rigid quality audits: moisture checks, aflatoxin testing (&lt;4 ppb for European Union conformance), seed count analysis, and metal detection.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-2xl font-black text-agro-900 block">15,000+</span>
              <span className="text-xs text-slate-600 font-medium">Partner Farmers Network</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-2xl font-black text-agro-900 block">50 MT/Day</span>
              <span className="text-xs text-slate-600 font-medium">Buhler Sortex Optical Line</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <img
            src="/images/about-commodities.jpg"
            alt="Agro Dairy Harvesting & Processing"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/facility-bg.jpg';
            }}
          />
        </div>
      </div>

      {/* Leadership & Trade Team */}
      {team.length > 0 && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-600 block mb-1">
              International Trade Leadership
            </span>
            <h2 className="text-2xl font-black text-slate-900">Executive Management</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-agro-100 text-agro-800 flex items-center justify-center font-bold text-lg">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{member.name}</h3>
                  <span className="text-xs text-agro-700 font-semibold block">{member.position}</span>
                </div>
                {member.bio && (
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to action */}
      <div className="bg-agro-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black">
          Partner with India's Proven Agricultural Exporter
        </h2>
        <p className="text-agro-100 text-sm max-w-xl mx-auto">
          Contact our export desk to discuss seasonal supply agreements, containerized allocations, and CIF freight pricing.
        </p>
        <Link
          to="/rfq"
          className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-agro-950 font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg transition"
        >
          Submit Commercial RFQ <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
