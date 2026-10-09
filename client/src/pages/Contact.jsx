import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, ChevronRight, 
  Clock, ShieldCheck, MessageSquare
} from 'lucide-react';
import { companyService } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: 'Commodity Export Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await companyService.submitContact(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.message || 'Error sending message');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error transmitting message');
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
          <span className="text-slate-800 font-semibold">Contact Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          International Trade & Communications Desk
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Connect directly with our export merchandising directors, shipping coordinators, and quality control leads. We respond to commercial inquiries within 6 - 12 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info & Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-agro-900 text-white rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold">Registered Office & Processing Plant</h2>

            <div className="space-y-5 text-xs text-agro-100">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block text-sm mb-0.5">Corporate & Facility Address</span>
                  <span>Plot No. 42-45, Agro Industrial Corridor, NH-27, Gondal Road, Rajkot - 360002, Gujarat, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block text-sm mb-0.5">Commercial Trade Desk</span>
                  <span>+91 98250 12345 (Managing Director / Super Admin)</span>
                  <span className="block mt-0.5">+91 98250 23456 (Head of International Trade)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block text-sm mb-0.5">Direct Trade Emails</span>
                  <span>trade@agrodairy.com</span>
                  <span className="block mt-0.5">exports@agrodairy.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block text-sm mb-0.5">Operating Hours</span>
                  <span>Monday - Saturday: 09:00 - 19:30 (IST / UTC+5:30)</span>
                  <span className="block text-[11px] text-slate-300">24/7 WhatsApp monitored for active maritime vessel loadings</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-agro-800">
              <a
                href="https://wa.me/919825012345?text=Hello%20Agro%20Dairy%20Export%20Desk,%20I%20would%20like%20to%20connect%20regarding%20commodity%20export."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Trade Chat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Send Commercial Inquiry</h2>
            <p className="text-xs text-slate-500 mt-1">
              For binding CIF container quotes, we recommend using our dedicated <Link to="/rfq" className="text-agro-800 font-bold underline">RFQ form</Link>.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-lg">Message Transmitted</h3>
              <p className="text-xs max-w-md mx-auto">
                Thank you for contacting Agro Dairy Export. Our trade merchandising team will reach out to you within a few hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-rose-50 text-rose-700 p-3 rounded-xl text-xs border border-rose-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Phone / WhatsApp</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Message *</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Inquire about commodity availability, sample dispatch, or export agency..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-agro-800 hover:bg-agro-900 text-white font-bold text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
              >
                {loading ? 'Sending...' : 'Transmit Message to Trade Desk'}
                <Send className="w-4 h-4 text-gold-400" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
