import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, ShieldCheck, CheckCircle2, Clock, AlertCircle, 
  Search, Filter, LogOut, ChevronRight, User, Phone, Mail, 
  MapPin, MessageSquare, Send, RefreshCw
} from 'lucide-react';
import { adminService, inquiriesService } from '../services/api';

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  reviewed: 'bg-purple-100 text-purple-800 border-purple-200',
  assigned: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  quotation_prepared: 'bg-amber-100 text-amber-800 border-amber-200',
  quotation_sent: 'bg-orange-100 text-orange-800 border-orange-200',
  negotiation: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  accepted: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  rejected: 'bg-rose-100 text-rose-800 border-rose-200',
  completed: 'bg-slate-100 text-slate-800 border-slate-200',
};

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const [dashRes, inqRes] = await Promise.all([
        adminService.getDashboard(),
        inquiriesService.getAll({ status: statusFilter !== 'all' ? statusFilter : undefined, search: search || undefined })
      ]);
      if (dashRes.success) setStats(dashRes.stats);
      if (inqRes.success) setInquiries(inqRes.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('agro_admin_token');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const rawUser = localStorage.getItem('agro_admin_user');
    if (!rawUser || !localStorage.getItem('agro_admin_token')) {
      navigate('/admin/login');
      return;
    }
    setUser(JSON.parse(rawUser));
    loadData();
  }, [statusFilter]);

  const handleLogout = () => {
    localStorage.removeItem('agro_admin_token');
    localStorage.removeItem('agro_admin_user');
    navigate('/admin/login');
  };

  const handleStatusChange = async (inquiryId, newStatus) => {
    setActionLoading(true);
    try {
      await inquiriesService.updateStatus(inquiryId, { status: newStatus });
      await loadData();
      if (selectedInquiry && selectedInquiry.id === inquiryId) {
        const detailRes = await inquiriesService.getById(inquiryId);
        if (detailRes.success) setSelectedInquiry(detailRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenDetail = async (id) => {
    setActionLoading(true);
    try {
      const res = await inquiriesService.getById(id);
      if (res.success) {
        setSelectedInquiry(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim() || !selectedInquiry) return;
    try {
      await inquiriesService.addNote(selectedInquiry.id, { note: noteText.trim() });
      setNoteText('');
      const detailRes = await inquiriesService.getById(selectedInquiry.id);
      if (detailRes.success) setSelectedInquiry(detailRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Staff Navigation Header */}
      <div className="bg-agro-950 text-white border-b border-agro-900 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="w-9 h-9 rounded-xl bg-gold-500 text-agro-950 flex items-center justify-center font-extrabold text-sm">
              AD
            </Link>
            <div>
              <span className="font-bold text-sm tracking-wide">Agro Dairy Trade Desk CRM</span>
              <span className="block text-[10px] text-gold-400">Node.js Express + MySQL Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-300 hidden sm:inline-block">
              Logged in: <strong className="text-white">{user?.name}</strong> ({user?.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-agro-900 hover:bg-agro-800 text-rose-300 hover:text-rose-200 border border-agro-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Metric Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Inquiries</span>
              <div className="text-3xl font-black text-slate-900 font-mono">{stats.totalInquiries}</div>
              <span className="text-[11px] text-slate-500 block">All recorded RFQs</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase">New RFQ Queue</span>
              <div className="text-3xl font-black text-blue-700 font-mono">{stats.newInquiries}</div>
              <span className="text-[11px] text-slate-500 block">Awaiting sales review</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-agro-700 uppercase">Active Export Lines</span>
              <div className="text-3xl font-black text-agro-900 font-mono">{stats.totalProducts}</div>
              <span className="text-[11px] text-slate-500 block">Seeded in MySQL</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-emerald-600 uppercase">Active Lot Batches</span>
              <div className="text-3xl font-black text-emerald-700 font-mono">{stats.totalBatches}</div>
              <span className="text-[11px] text-slate-500 block">Traceability verified</span>
            </div>
          </div>
        )}

        {/* Inquiries CRM Table Area */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Controls Bar */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Commercial Inquiries Pipeline</h2>
              <p className="text-xs text-slate-500">Live request for quotations submitted via web portal & API.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 px-3 py-2 rounded-xl focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="quotation_prepared">Quotation Prepared</option>
                <option value="quotation_sent">Quotation Sent</option>
                <option value="accepted">Accepted</option>
                <option value="completed">Completed</option>
              </select>

              <button
                onClick={loadData}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                title="Refresh Table"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Ref Number</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Buyer / Company</th>
                  <th className="px-5 py-3.5">Destination</th>
                  <th className="px-5 py-3.5">Commodity / Volume</th>
                  <th className="px-5 py-3.5">Pipeline Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-16 text-slate-400">Loading inquiries...</td>
                  </tr>
                ) : inquiries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-16 text-slate-400">No inquiries found matching criteria.</td>
                  </tr>
                ) : (
                  inquiries.map(inq => (
                    <tr key={inq.id} className="hover:bg-slate-50/70 transition">
                      <td className="px-5 py-4 font-mono font-bold text-agro-900 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenDetail(inq.id)}
                          className="hover:underline text-left"
                        >
                          {inq.inquiry_number}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                        {new Date(inq.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">{inq.name}</div>
                        <div className="text-[11px] text-slate-500">{inq.company || inq.email}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-700 whitespace-nowrap">
                        {inq.country}
                        {inq.destination_port && <span className="block text-[11px] text-slate-400">Port: {inq.destination_port}</span>}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800">{inq.product_name || inq.product_variant || 'General'}</div>
                        {inq.quantity && (
                          <div className="text-[11px] font-mono text-slate-500">{inq.quantity} {inq.unit} ({inq.incoterm})</div>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border focus:outline-none ${STATUS_COLORS[inq.status] || 'bg-slate-100 text-slate-700'}`}
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="assigned">Assigned</option>
                          <option value="quotation_prepared">Quotation Prepared</option>
                          <option value="quotation_sent">Quotation Sent</option>
                          <option value="negotiation">Negotiation</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleOpenDetail(inq.id)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg transition"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400">Inquiry Dossier</span>
                <h3 className="text-2xl font-black font-mono text-slate-900">{selectedInquiry.inquiry_number}</h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                &times;
              </button>
            </div>

            {/* Buyer Contact Details */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold">Contact Person:</span>
                <span className="font-bold text-slate-800 text-sm">{selectedInquiry.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Company:</span>
                <span className="font-bold text-slate-800 text-sm">{selectedInquiry.company || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Email:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-agro-700 font-bold underline">{selectedInquiry.email}</a>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Phone / WhatsApp:</span>
                <span className="font-bold text-slate-800">{selectedInquiry.phone} {selectedInquiry.whatsapp && `(WA: ${selectedInquiry.whatsapp})`}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Country & Port:</span>
                <span className="font-bold text-slate-800">{selectedInquiry.country} {selectedInquiry.destination_port && `• ${selectedInquiry.destination_port}`}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Incoterm & Target:</span>
                <span className="font-bold text-slate-800">{selectedInquiry.incoterm} {selectedInquiry.target_price && `@ $${selectedInquiry.target_price}/MT`}</span>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Buyer Specification / Message:</span>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Internal CRM Notes */}
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 block mb-2">Staff CRM Communication Notes:</span>
              <div className="space-y-2 mb-3 max-h-40 overflow-y-auto custom-scrollbar">
                {selectedInquiry.notes && selectedInquiry.notes.length > 0 ? (
                  selectedInquiry.notes.map(n => (
                    <div key={n.id} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
                      <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                        <span className="font-semibold text-slate-600">{n.user_name || 'Staff'}</span>
                        <span>{new Date(n.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-700">{n.note}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No internal notes logged yet.</p>
                )}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add trade negotiation or status note..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-agro-600"
                />
                <button
                  type="submit"
                  className="bg-agro-800 text-white font-bold text-xs px-4 py-2 rounded-xl shrink-0"
                >
                  Add Note
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
