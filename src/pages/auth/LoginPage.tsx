import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getRoleHome } from '../../components/shared/RoleGuard';
import { Droplets, Flame, Truck, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    setLoading(false);
    if (signInError) {
      setError('Invalid email or password. Please try again.');
    } else {
      // Profile will be fetched by context; navigate after short delay
      setTimeout(() => {
        const roleFromStorage = localStorage.getItem('userRole') as any;
        navigate(getRoleHome(roleFromStorage || 'water_cashier'));
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex flex-col justify-between w-[55%] hero-umbrella p-12 text-white">
        {/* Top */}
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center border border-white/20">
              <span className="text-2xl font-black" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>J</span>
            </div>
            <div>
              <p className="font-black text-xl tracking-[0.15em] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Jake's Enterprise</p>
              <p className="text-white/50 text-xs tracking-widest uppercase">Business Management Platform</p>
            </div>
          </div>

          <h1 className="text-5xl font-black leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            One platform.<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>Three businesses.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-sm leading-relaxed">
            Seamlessly manage Water Retail, Restaurant & Butchery, and Delivery operations — all from a single, unified platform.
          </p>
        </div>

        {/* Business cards */}
        <div className="space-y-3">
          {[
            { label: 'Water Retail', desc: 'Refill, bottles & dispensing', icon: <Droplets size={18} />, color: 'from-blue-800/80 to-blue-600/40', border: 'border-blue-400/30' },
            { label: 'Restaurant & Butchery', desc: 'Take-away chicken & more', icon: <Flame size={18} />, color: 'from-orange-900/80 to-orange-600/40', border: 'border-orange-400/30' },
            { label: 'Water Delivery', desc: 'Dispatch, GPS & debt tracking', icon: <Truck size={18} />, color: 'from-green-900/80 to-green-600/40', border: 'border-green-400/30' },
          ].map((b) => (
            <div key={b.label} className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${b.color} border ${b.border} backdrop-blur-sm`}>
              <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">{b.icon}</div>
              <div>
                <p className="font-bold text-sm">{b.label}</p>
                <p className="text-white/50 text-xs">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <p className="text-white/30 text-xs">© 2026 Mirie Technologies · All rights reserved</p>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10 text-center">
            <h1 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>JAKE'S ENTERPRISE</h1>
            <p className="text-gray-500 text-sm">Business Management Platform</p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Welcome back</h2>
            <p className="text-gray-500">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn bg-gray-900 text-white hover:bg-gray-700 justify-center py-3 text-base shadow-lg"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-xs text-blue-700 font-medium mb-1">New accounts</p>
            <p className="text-xs text-blue-600">Accounts are created by administrators only. Contact your system administrator if you need access.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
