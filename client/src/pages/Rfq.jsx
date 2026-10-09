import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Send, ShieldCheck, CheckCircle2, ChevronRight, FileText, 
  Building2, Globe2, Phone, Mail, Clock, Anchor
} from 'lucide-react';
import { productsService, inquiriesService } from '../services/api';

export default function Rfq() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryNumber, setInquiryNumber] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    product_id: searchParams.get('product_id') || '',
    product_variant: '',
    quantity: '19',
    unit: 'Metric Ton (MT)',
    packaging_preference: '50 Kg PP Bags (Standard)',
    destination_port: '',
    incoterm: 'CIF',
    target_price: '',
    target_currency: 'USD',
    preferred_delivery_date: '',
    message: '',
    subscribe_newsletter: true,
  });

  useEffect(() => {
    productsService.getAll({ limit: 100 })
      .then(res => {
        if (res.success) setProducts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await inquiriesService.submitRfq(formData);
      if (res.success) {
        setSubmitted(true);
        setInquiryNumber(res.inquiry_number);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(res.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error submitting inquiry. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          Request for Quotation Submitted
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Your formal export inquiry has been assigned to our International Trade Desk. Our export manager will formulate a formal proforma indication within 12 business hours.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center max-w-md mx-auto">
          <span className="text-xs uppercase text-slate-400 font-bold block mb-1">
            Official Reference Number
          </span>
          <span className="text-2xl font-black font-mono text-agro-900 block">
            {inquiryNumber}
          </span>
          <span className="text-xs text-slate-500 mt-2 block">
            Please retain this number for WhatsApp and email trade correspondence.
          </span>
        </div>

        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            to="/products"
            className="bg-agro-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md"
          >
            Explore More Commodities
          </Link>
          <Link
            to="/"
            className="bg-slate-100 text-slate-700 font-bold text-xs px-6 py-3 rounded-xl hover:bg-slate-200"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-agro-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Request for Quotation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Commercial Request for Quotation (RFQ)
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Complete the form below to receive binding FOB / CIF export quotations, laboratory grade specifications, and shipping schedules from Mundra/Kandla.
        </p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
        {/* Section 1: Commodity & Volume */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-agro-100 text-agro-800 font-bold text-xs flex items-center justify-center">1</span>
            Commodity & Shipment Volume
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                Selected Commodity *
              </label>
              <select
                name="product_id"
                value={formData.product_id}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              >
                <option value="">-- Choose Commodity --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.origin || 'Gujarat'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                Grade / Variety / Purity
              </label>
              <input
                type="text"
                name="product_variant"
                value={formData.product_variant}
                onChange={handleChange}
                placeholder="e.g. 40/50 count, 99.5% Sortex, Bold 50/60"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                Order Quantity *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.5"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 19"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
                />
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-semibold text-slate-700 shrink-0"
                >
                  <option value="Metric Ton (MT)">MT</option>
                  <option value="20ft Container (FCL)">20ft FCL</option>
                  <option value="40ft Container (FCL)">40ft FCL</option>
                  <option value="Bags">Bags</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                Packaging Preference
              </label>
              <select
                name="packaging_preference"
                value={formData.packaging_preference}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              >
                <option value="25 Kg PP Bags">25 Kg PP Bags</option>
                <option value="50 Kg PP Bags (Standard)">50 Kg PP Bags (Standard)</option>
                <option value="50 Kg Jute Bags">50 Kg Jute Bags</option>
                <option value="25 Kg Vacuum Packed (High Barrier)">25 Kg Vacuum Packed (High Barrier)</option>
                <option value="1000 Kg Jumbo Bags">1000 Kg Jumbo Bags</option>
                <option value="Custom Buyer Private Label">Custom Buyer Private Label</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Logistics & Pricing */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-agro-100 text-agro-800 font-bold text-xs flex items-center justify-center">2</span>
            Logistics & Incoterms
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                Incoterm *
              </label>
              <select
                name="incoterm"
                value={formData.incoterm}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600 font-semibold"
              >
                <option value="FOB">FOB (Mundra / Kandla)</option>
                <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                <option value="CFR">CFR (Cost & Freight)</option>
                <option value="EXW">EXW (Factory Rajkot)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                Destination Discharge Port
              </label>
              <input
                type="text"
                name="destination_port"
                value={formData.destination_port}
                onChange={handleChange}
                placeholder="e.g. Jebel Ali, Rotterdam, Haiphong"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                Target Price (USD/MT)
              </label>
              <input
                type="number"
                step="1"
                name="target_price"
                value={formData.target_price}
                onChange={handleChange}
                placeholder="Optional budget target"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Buyer Details */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-agro-100 text-agro-800 font-bold text-xs flex items-center justify-center">3</span>
            Buyer Information & Delivery Requirements
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                Contact Person Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                Company / Business Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Legal Name"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                Corporate Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="trade@yourcompany.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1 555 1234567"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                Destination Country *
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="e.g. United Arab Emirates, Netherlands, Vietnam"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                WhatsApp Number (For Urgent Quoting)
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="+971 50 1234567"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
              Specific Quality, Packaging or Shipping Requirements *
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Please describe any required moisture limits, aflatoxin threshold, third-party inspection (SGS), or delivery schedule..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
            />
          </div>

          <div className="pt-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="subscribe_newsletter"
              name="subscribe_newsletter"
              checked={formData.subscribe_newsletter}
              onChange={handleChange}
              className="w-4 h-4 rounded text-agro-700 focus:ring-agro-600"
            />
            <label htmlFor="subscribe_newsletter" className="text-xs text-slate-600">
              Receive weekly Indian commodity crop arrival reports and FOB Mundra price indications
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-agro-800 hover:bg-agro-900 text-white font-extrabold text-base py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
        >
          {loading ? 'Transmitting RFQ...' : 'Submit Commercial Export RFQ'}
          <Send className="w-4 h-4 text-gold-400" />
        </button>
      </form>
    </div>
  );
}
