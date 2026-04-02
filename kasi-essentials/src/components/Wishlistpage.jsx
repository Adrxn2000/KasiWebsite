import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { AppContext } from '../App.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function WishlistPage() {
  const { wishlist, addToWishlist, addToCart } = useContext(AppContext);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart size={64} className="mx-auto mb-4 text-gray-600" />
        <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
        <p className="text-gray-400 mb-8">Please login to view your wishlist</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Login
        </button>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart size={64} className="mx-auto mb-4 text-gray-600" />
        <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
        <p className="text-gray-400 mb-8">You haven't saved any items yet</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart size={32} className="text-orange-500" fill="currentColor" />
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <span className="text-gray-400 text-lg">({wishlist.length} items)</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div key={product.id} className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
            {/* Remove from wishlist button */}
            <button
              onClick={() => addToWishlist(product)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
              title="Remove from wishlist"
            >
              <Trash2 size={16} className="text-red-500" />
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
              <h3
                className="font-bold text-lg mb-2 cursor-pointer hover:text-orange-600 transition-colors"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {product.name}
              </h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-orange-600">R{product.price}</span>
                <span className="text-sm text-gray-500">Stock: {product.inventory}</span>
              </div>
              <button
                onClick={() => {
                  addToCart(product);
                  navigate('/cart');
                }}
                disabled={product.inventory === 0}
                className={`w-full py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                  product.inventory === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                <ShoppingCart size={18} />
                {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;