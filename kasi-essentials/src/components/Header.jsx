import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { AppContext } from '../App.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Header() {
  const { cart, searchTerm, setSearchTerm, loadProducts } = useContext(AppContext);
  const { isLoggedIn, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate('/shop');
    await loadProducts();
  };

  return (
    <header className="bg-white text-black shadow-lg relative z-50 h-18">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
         <h1 
  className="text-3xl font-bold cursor-pointer font-['20db']"
  onClick={() => navigate('/')}
>
  Kasi Essentials
</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="flex w-full bg-gray-100 rounded-full overflow-hidden">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for brands, products..."
                className="flex-1 px-4 py-2 bg-transparent outline-none"
              />
              <button type="submit" className="px-4 py-2 hover:bg-gray-200">
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-orange-500">Home</Link>
            <Link to="/shop" className="hover:text-orange-500">Shop</Link>
            <Link to="/about" className="hover:text-orange-500">About</Link>
            <Link to="/contact" className="hover:text-orange-500">Contact</Link>
            
            <Link
              to="/cart"
              className="relative hover:text-orange-500"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span>Hi, {user?.name || user?.email}</span>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-orange-500 hover:underline">
                    Admin
                  </Link>
                )}
                <button onClick={() => { logout(); navigate('/'); }} className="text-red-500 hover:underline">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="hover:text-orange-500">
                <User size={24} />
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex bg-gray-100 rounded-full overflow-hidden">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 px-4 py-2 bg-transparent outline-none"
                />
                <button type="submit" className="px-4 py-2">
                  <Search size={20} />
                </button>
              </div>
            </form>
            <nav className="space-y-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2">Home</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2">Shop</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2">About</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2">Contact</Link>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2">
                Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </Link>
              {isLoggedIn ? (
                <>
                  <div className="py-2">Hi, {user?.name || user?.email}</div>
                  {user?.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2 text-orange-500">
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }} className="block w-full text-left py-2 text-red-500">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-left py-2">Login</Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
