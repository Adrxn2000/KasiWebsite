import React, { useState, useContext } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { AppContext } from '../App.jsx'; // Assuming AppContext is exported from App.jsx

function Header() {
  const { user, setUser, cart, currentPage, setCurrentPage, searchTerm, setSearchTerm, loadProducts } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage('shop');
    await loadProducts();
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <header className="bg-white text-black shadow-lg relative z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 
            className="text-3xl font-bold cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            BlackFabrics
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
            <button onClick={() => setCurrentPage('home')} className="hover:text-orange-500">Home</button>
            <button onClick={() => setCurrentPage('shop')} className="hover:text-orange-500">Shop</button>
            <button onClick={() => setCurrentPage('about')} className="hover:text-orange-500">About</button>
            <button onClick={() => setCurrentPage('contact')} className="hover:text-orange-500">Contact</button>
            
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative hover:text-orange-500"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-2">
                <span>Hi, {user.name}</span>
                {user.role === 'admin' && (
                  <button onClick={() => setCurrentPage('admin')} className="text-orange-500 hover:underline">
                    Admin
                  </button>
                )}
                <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
              </div>
            ) : (
              <button onClick={() => setCurrentPage('login')} className="hover:text-orange-500">
                <User size={24} />
              </button>
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
              <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="block w-full text-left py-2">Home</button>
              <button onClick={() => { setCurrentPage('shop'); setIsMenuOpen(false); }} className="block w-full text-left py-2">Shop</button>
              <button onClick={() => { setCurrentPage('about'); setIsMenuOpen(false); }} className="block w-full text-left py-2">About</button>
              <button onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }} className="block w-full text-left py-2">Contact</button>
              <button onClick={() => { setCurrentPage('cart'); setIsMenuOpen(false); }} className="block w-full text-left py-2">
                Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </button>
              {user ? (
                <>
                  <div className="py-2">Hi, {user.name}</div>
                  {user.role === 'admin' && (
                    <button onClick={() => { setCurrentPage('admin'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-orange-500">
                      Admin Panel
                    </button>
                  )}
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-red-500">Logout</button>
                </>
              ) : (
                <button onClick={() => { setCurrentPage('login'); setIsMenuOpen(false); }} className="block w-full text-left py-2">Login</button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
