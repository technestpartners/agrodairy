import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Sparkles, Building2, Eye, EyeOff } from 'lucide-react';
import { adminService } from '../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@agrodairy.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
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

  const fillCredentials = (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001814] via-[#002824] to-[#001512] flex items-center justify-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Ambient Halos */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00A79D]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F5B800]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00A79D_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2 group" title="Return to Website Home">
            <div className="w-14 h-14 rounded-2xl bg-white p-2 flex items-center justify-center shadow-xl shadow-[#00A79D]/30 ring-2 ring-emerald-400/40 group-hover:scale-105 group-hover:ring-emerald-400 transition-all duration-300">
              <img 
                src="/images/logo.png" 
                alt="Agro Dairy Export Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/logo-light.png';
                }}
              />
            </div>
          </Link>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[11px] font-mono mb-2 border border-white/10">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>Enterprise CMS &amp; Trade Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Staff &amp; Executive Portal
            </h1>
            <p className="text-xs text-white/60 mt-1 max-w-sm mx-auto leading-relaxed">
              Sign in with administrative credentials to manage live website content, commodities, and trade RFQs.
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-md p-8 sm:p-9 rounded-3xl border border-white/20 shadow-2xl space-y-5">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl text-xs flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0C2422] uppercase tracking-wider mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@agrodairy.com"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A79D] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0C2422] uppercase tracking-wider mb-1.5">
                Portal Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-[#F4F9F8] border border-[#D4ECE9] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#0C2422] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A79D] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Demo Credentials Switcher */}
            <div className="bg-[#F4F9F8] p-3 rounded-2xl border border-[#D4ECE9] text-[11px] space-y-1.5">
              <span className="font-bold text-[#0C2422] block text-[10px] uppercase tracking-wider text-slate-500">
                Quick Demo Access:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fillCredentials('admin@agrodairy.com', 'password123')}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#D4ECE9] text-[10px] font-mono font-bold text-[#00A79D] hover:bg-[#E6F7F5] transition shadow-2xs"
                >
                  Super Admin
                </button>
                <button
                  type="button"
                  onClick={() => fillCredentials('sales@agrodairy.com', 'password123')}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#D4ECE9] text-[10px] font-mono font-bold text-slate-700 hover:bg-[#E6F7F5] transition shadow-2xs"
                >
                  Sales Desk
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#002824] via-[#053833] to-[#00A79D] hover:from-[#001F1C] hover:to-[#008f86] text-white font-ui font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-md shadow-[#002824]/20 flex items-center justify-center gap-2 group disabled:opacity-60"
            >
              {loading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Executive Desk</span>
                  <ArrowRight className="w-4 h-4 text-[#F5B800] group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-slate-100">
            <Link to="/" className="text-xs text-slate-500 hover:text-[#00A79D] font-semibold transition">
              &larr; Return to Public Website
            </Link>
          </div>
        </div>

        {/* Security Disclaimers */}
        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-emerald-200/60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>256-Bit SSL Encrypted Admin Gateway</span>
        </div>

      </div>
    </div>
  );
}
