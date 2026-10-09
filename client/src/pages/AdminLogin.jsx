import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { adminService } from '../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@agrodairy.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await adminService.login({ email, password });
      if (res.success && res.token) {
        localStorage.setItem('agro_admin_token', res.token);
        localStorage.setItem('agro_admin_user', JSON.stringify(res.user));
        navigate('/admin');
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-agro-900 text-gold-400 rounded-2xl flex items-center justify-center mx-auto shadow-md font-bold text-xl">
            AD
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Staff & Export Trade Portal
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to access RFQ CRM, quotation builder, and lot traceability logs.
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Staff Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-agro-600"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <div className="font-bold text-slate-700">Pre-seeded Demo Staff Accounts:</div>
            <div>Admin: <span className="font-mono text-slate-800">admin@agrodairy.com</span> / <span className="font-mono text-slate-800">password123</span></div>
            <div>Sales: <span className="font-mono text-slate-800">sales@agrodairy.com</span> / <span className="font-mono text-slate-800">password123</span></div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-agro-800 hover:bg-agro-900 text-white font-extrabold text-sm py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
            <ArrowRight className="w-4 h-4 text-gold-400" />
          </button>
        </form>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-slate-500 hover:text-agro-800 font-medium">
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
