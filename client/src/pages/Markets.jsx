import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe2, ChevronRight, Anchor, FileText, ArrowRight } from 'lucide-react';
import { marketsService } from '../services/api';

export default function Markets() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    marketsService.getMarkets()
      .then(res => {
        if (res.success) setMarkets(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-agro-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Global Export Markets</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Global Destination Gateways & Regulatory Profiles
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          We export to over 40 countries across the Middle East, Europe, Southeast Asia, Africa, and the Americas, complying with each destination's food safety standards, customs documentation, and packaging specifications.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-4 border-agro-800 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-slate-500">Loading export markets...</p>
        </div>
      ) : (
        <div className="space-y-12">
          {markets.map(market => (
            <div key={market.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-agro-100 text-agro-800 flex items-center justify-center font-bold">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{market.name}</h2>
                  <p className="text-xs text-slate-500">{market.description || 'Core international trade destination corridor.'}</p>
                </div>
              </div>

              {/* Countries Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {market.countries && market.countries.map(c => (
                  <div key={c.id} className="border border-slate-200 rounded-2xl p-5 hover:border-agro-400 transition bg-slate-50/50 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{c.flag_emoji || '🌐'}</span>
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                          {c.code || 'ISO'}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900">{c.name}</h3>

                      {c.primary_ports && (
                        <div className="text-xs text-slate-600">
                          <span className="font-semibold text-slate-800 block mb-0.5">Discharge Ports:</span>
                          <span className="text-slate-500">{c.primary_ports}</span>
                        </div>
                      )}

                      {c.popular_products_summary && (
                        <div className="text-xs text-slate-600">
                          <span className="font-semibold text-slate-800 block mb-0.5">Key Commodities:</span>
                          <span className="text-slate-500 line-clamp-2">{c.popular_products_summary}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-200 mt-4">
                      <Link
                        to={`/rfq?destination_port=${encodeURIComponent(c.primary_ports?.split(',')[0]?.trim() || c.name)}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-agro-800 hover:text-agro-950"
                      >
                        Request CIF {c.name} Quote <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
