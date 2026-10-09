import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, MapPin, Clock, ArrowRight } from 'lucide-react';
import { toolsService } from '../services/api';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function CropCalendar() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    toolsService.getCropCalendars()
      .then(res => {
        if (res.success) setCrops(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-agro-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/tools" className="hover:text-agro-800">Export Tools</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Crop Harvest Calendar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Indian Agricultural Crop & Export Calendar
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Plan forward export contracts around fresh crop arrivals in Gujarat and Western India to secure premium new-crop purity and competitive pricing.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-4 border-agro-800 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-slate-500">Loading crop seasonal data...</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-amber-200 inline-block" />
              <span>Sowing Period</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-emerald-400 inline-block" />
              <span>Harvest Season</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-agro-800 inline-block" />
              <span>Peak Export Window</span>
            </div>
          </div>

          <div className="space-y-4">
            {crops.map((crop) => (
              <div key={crop.id} className="border border-slate-200 rounded-2xl p-5 hover:border-agro-400 transition bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{crop.crop_name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="px-2 py-0.5 rounded bg-slate-200 font-semibold text-slate-700 text-[10px]">
                        {crop.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-agro-700" />
                        {crop.major_states}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/rfq`}
                    className="text-xs font-bold text-agro-800 hover:text-agro-950 flex items-center gap-1"
                  >
                    Contract New Crop <ArrowRight className="w-3 h-3 text-gold-500" />
                  </Link>
                </div>

                {/* Sowing / Harvest details */}
                <div className="grid grid-cols-3 gap-2 text-xs bg-white p-3 rounded-xl border border-slate-200 mb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Sowing</span>
                    <span className="font-bold text-slate-800">{crop.sowing_start} - {crop.sowing_end}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Harvest</span>
                    <span className="font-bold text-slate-800">{crop.harvest_start} - {crop.harvest_end}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Peak Export</span>
                    <span className="font-bold text-agro-800">{crop.peak_export_start} - {crop.peak_export_end}</span>
                  </div>
                </div>

                {crop.notes && (
                  <p className="text-xs text-slate-500 italic">
                    Note: {crop.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
