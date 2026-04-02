import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@blackfabrics.com';
const ADMIN_PASSWORD = 'admin123';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('savedLoginCredentials');
    if (saved) {
      try {
        const { email, password, remember } = JSON.parse(saved);
        if (remember) {
          setFormData({ email, password });
          setRememberMe(true);
        }
      } catch {}
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 700));

      const email = formData.email.trim().toLowerCase();
      const password = formData.password;

      // ── Admin check first ──
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        login({ name: 'Admin', email: ADMIN_EMAIL, role: 'admin' });

        if (rememberMe) {
          localStorage.setItem('savedLoginCredentials', JSON.stringify({ email, password, remember: true }));
        } else {
          localStorage.removeItem('savedLoginCredentials');
        }

        navigate('/admin');
        return;
      }

      // ── Registered users check ──
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find(
        u => u.email.toLowerCase() === email && u.password === password
      );

      if (user) {
        login({ name: user.name, email: user.email, role: user.role || 'user' });

        if (rememberMe) {
          localStorage.setItem('savedLoginCredentials', JSON.stringify({ email, password, remember: true }));
        } else {
          localStorage.removeItem('savedLoginCredentials');
        }

        navigate('/shop');
        return;
      }

      // ── No match ──
      throw new Error('Invalid email or password');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-orange-500 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black flex items-center justify-center">
              <span className="text-orange-500 font-black text-sm">KE</span>
            </div>
            <span className="text-black font-black text-xl tracking-tight" style={{ fontFamily: "'Impact', sans-serif" }}>
              KASI ESSENTIALS
            </span>
          </div>
        </div>
        <div className="relative z-10">
          <h2 className="text-black font-black leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontFamily: "'Impact', sans-serif" }}>
            WEAR THE<br />KASI SPIRIT
          </h2>
          <p className="text-black/70 text-lg max-w-sm">
            Authentic streetwear from the township to the world.
          </p>
        </div>
        <div className="relative z-10 flex gap-8">
          {[['5+', 'Local Brands'], ['100%', 'Authentic'], ['JHB', 'Based']].map(([val, label]) => (
            <div key={label}>
              <p className="text-black font-black text-2xl">{val}</p>
              <p className="text-black/60 text-xs uppercase tracking-widest font-bold">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-orange-500 flex items-center justify-center">
              <span className="text-black font-black text-xs">KE</span>
            </div>
            <span className="text-white font-black text-lg tracking-tight" style={{ fontFamily: "'Impact', sans-serif" }}>
              KASI ESSENTIALS
            </span>
          </div>

          <div className="mb-8">
            <p className="text-orange-400 text-xs font-black uppercase tracking-[0.4em] mb-2">Welcome Back</p>
            <h1 className="text-white font-black text-4xl" style={{ fontFamily: "'Impact', sans-serif" }}>
              SIGN IN
            </h1>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 border border-red-500/50 bg-red-500/10 text-red-400 text-sm font-bold">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="your@email.com"
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-4 outline-none focus:border-orange-500 transition-colors placeholder-gray-600 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-4 outline-none focus:border-orange-500 transition-colors placeholder-gray-600 text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-5 h-5 border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                  rememberMe ? 'bg-orange-500 border-orange-500' : 'border-gray-600 hover:border-orange-500'
                }`}
              >
                {rememberMe && <span className="text-black text-xs font-black">✓</span>}
              </button>
              <label
                className="text-gray-400 text-sm cursor-pointer select-none"
                onClick={() => setRememberMe(!rememberMe)}
              >
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-black py-4 font-black uppercase tracking-widest hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing In...
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Register link */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm mb-3">Don't have an account?</p>
            <Link
              to="/register"
              className="text-orange-400 font-black uppercase tracking-widest text-sm hover:text-orange-300 transition-colors"
            >
              Create Account →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;