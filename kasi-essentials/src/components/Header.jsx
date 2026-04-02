import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { AppContext } from '../App.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Header() {
  const { cart, searchTerm, setSearchTerm, loadProducts, wishlist } = useContext(AppContext);
  const { isLoggedIn, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate('/shop');
    await loadProducts();
    setSearchOpen(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black shadow-2xl shadow-black/50'
            : 'bg-black/90 backdrop-blur-sm'
        }`}
      >
        {/* Top bar */}
        <div className="border-b border-orange-500/30 py-1.5 hidden md:block">
          <p className="text-center text-xs tracking-[0.3em] text-orange-400 uppercase font-medium">
            Free shipping on orders over R500 · Kasi Made · Kasi Proud
          </p>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-orange-500 flex items-center justify-center">
                <span className="text-black font-black text-sm">KE</span>
              </div>
              <span
                className="text-white font-black text-xl tracking-tight group-hover:text-orange-400 transition-colors"
                style={{ fontFamily: "'20db', 'Impact', sans-serif" }}
              >
                KASI ESSENTIALS
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { to: '/', label: 'Home' },
                { to: '/shop', label: 'Shop' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`text-sm font-bold tracking-widest uppercase transition-colors relative group ${
                    location.pathname === to ? 'text-orange-400' : 'text-white hover:text-orange-400'
                  }`}
                >
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${
                    location.pathname === to ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white hover:text-orange-400 transition-colors"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative text-white hover:text-orange-400 transition-colors">
                <Heart size={20} fill={wishlist?.length > 0 ? 'currentColor' : 'none'} className={wishlist?.length > 0 ? 'text-red-500' : ''} />
                {wishlist?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative text-white hover:text-orange-400 transition-colors">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-black text-xs w-4 h-4 flex items-center justify-center font-black">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User */}
              {isLoggedIn ? (
                <div className="hidden md:flex items-center gap-3">
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="text-xs font-bold tracking-widest text-orange-400 uppercase hover:text-orange-300">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="text-xs font-bold tracking-widest text-gray-400 uppercase hover:text-red-400 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hidden md:block text-white hover:text-orange-400 transition-colors">
                  <User size={20} />
                </Link>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:text-orange-400 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Search Bar — expands below header */}
          <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-16 pb-3' : 'max-h-0'}`}>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, brands..."
                autoFocus={searchOpen}
                className="flex-1 bg-gray-900 border border-gray-700 text-white px-4 py-2 text-sm outline-none focus:border-orange-500 transition-colors placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-orange-500 text-black px-6 py-2 text-sm font-black uppercase tracking-widest hover:bg-orange-400 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-80 bg-black border-l border-gray-800 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 pt-20">
            <nav className="space-y-1">
              {[
                { to: '/', label: 'Home' },
                { to: '/shop', label: 'Shop' },
                { to: '/wishlist', label: `Wishlist (${wishlist?.length || 0})` },
                { to: '/cart', label: `Cart (${cartCount})` },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="block py-4 text-2xl font-black text-white hover:text-orange-400 transition-colors border-b border-gray-800 tracking-tight"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 space-y-3">
              {isLoggedIn ? (
                <>
                  <p className="text-gray-400 text-sm">Hi, {user?.name || user?.email}</p>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="block text-orange-400 font-bold uppercase text-sm tracking-widest">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="block text-red-400 font-bold uppercase text-sm tracking-widest"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-4">
                  <Link to="/login" className="flex-1 bg-orange-500 text-black py-3 font-black uppercase tracking-widest text-center hover:bg-orange-400 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="flex-1 border border-orange-500 text-orange-400 py-3 font-black uppercase tracking-widest text-center hover:bg-orange-500/10 transition-colors">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-[72px]" />
    </>
  );
}

export default Header;