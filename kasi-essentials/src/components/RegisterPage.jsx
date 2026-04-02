import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');

    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return; }

    setIsLoading(true);
    try {
      const existing = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      if (existing.some(u => u.email === formData.email)) throw new Error('Email already registered');

      await new Promise(resolve => setTimeout(resolve, 800));

      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'user',
        registeredAt: new Date().toISOString()
      };

      localStorage.setItem('registeredUsers', JSON.stringify([...existing, newUser]));
      register({ name: newUser.name, email: newUser.email, role: 'user' });
      setSuccess('Account created! Redirecting...');
      setTimeout(() => navigate('/shop'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-black border-r border-gray-800 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,165,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,165,0,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 flex items-center justify-center">
              <span className="text-black font-black text-sm">KE</span>
            </div>
            <span className="text-white font-black text-xl tracking-tight" style={{ fontFamily: "'Impact', sans-serif" }}>
              KASI ESSENTIALS
            </span>
          </div>
        </div>
        <div className="relative z-10 space-y-6">
          {[
            { num: '01', title: 'Create Your Account', desc: 'Join the Kasi family in seconds.' },
            { num: '02', title: 'Browse The Collection', desc: 'Access exclusive local streetwear drops.' },
            { num: '03', title: 'Rep Your Roots', desc: 'Wear authentic Kasi culture, delivered to you.' },
          ].map(({ num, title, desc }) => (
            <div key={num} className="flex gap-4">
              <span className="text-orange-500 font-black text-sm mt-0.5">{num}</span>
              <div>
                <p className="text-white font-black uppercase tracking-wide text-sm">{title}</p>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative z-10">
          <p className="text-gray-600 text-xs uppercase tracking-widest">Kasi Made · Kasi Proud · 2025</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-orange-500 flex items-center justify-center">
              <span className="text-black font-black text-xs">KE</span>
            </div>
            <span className="text-white font-black text-lg" style={{ fontFamily: "'Impact', sans-serif" }}>KASI ESSENTIALS</span>
          </div>

          <div className="mb-8">
            <p className="text-orange-400 text-xs font-black uppercase tracking-[0.4em] mb-2">Join The Family</p>
            <h1 className="text-white font-black text-4xl" style={{ fontFamily: "'Impact', sans-serif" }}>
              CREATE ACCOUNT
            </h1>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 border border-red-500/50 bg-red-500/10 text-red-400 text-sm font-bold">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 px-4 py-3 border border-green-500/50 bg-green-500/10 text-green-400 text-sm font-bold">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
              { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-2">{label}</label>
                <input
                  type={type}
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  required
                  placeholder={placeholder}
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-4 outline-none focus:border-orange-500 transition-colors placeholder-gray-600 text-sm"
                />
              </div>
            ))}

            <div>
              <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  placeholder="Min 6 characters"
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-4 outline-none focus:border-orange-500 transition-colors placeholder-gray-600 text-sm pr-12"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                placeholder="Repeat password"
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-4 outline-none focus:border-orange-500 transition-colors placeholder-gray-600 text-sm"
              />
            </div>

            {/* Password strength indicator */}
            {formData.password && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`h-1 flex-1 transition-colors ${
                      formData.password.length >= i * 3
                        ? i <= 1 ? 'bg-red-500' : i <= 2 ? 'bg-orange-500' : i <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                        : 'bg-gray-800'
                    }`} />
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  {formData.password.length < 4 ? 'Too short' : formData.password.length < 7 ? 'Weak' : formData.password.length < 10 ? 'Good' : 'Strong'}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-black py-4 font-black uppercase tracking-widest hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3 group mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                <>Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm mb-3">Already have an account?</p>
            <Link to="/login" className="text-orange-400 font-black uppercase tracking-widest text-sm hover:text-orange-300 transition-colors">
              Sign In →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;