import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, Package, Tag, Hash } from 'lucide-react';
import { AppContext } from '../App.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function ProductDetailPage() {
  const { id } = useParams();
  const { products, addToCart, addToWishlist, isWishlisted } = useContext(AppContext);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-400 mb-8">This product doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    addToWishlist(product);
  };

  // Related products — same category, exclude current
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-2xl object-cover shadow-2xl"
            style={{ maxHeight: '520px' }}
          />
          {product.inventory === 0 && (
            <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-orange-500 font-semibold uppercase tracking-widest">
              {product.brand}
            </span>
          </div>

          <h1 className="text-4xl font-black mb-4 text-white">{product.name}</h1>

          <div className="text-4xl font-black text-orange-500 mb-6">
            R{product.price}
          </div>

          {/* Product meta */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
              <Tag size={16} className="text-orange-500" />
              <span className="text-sm text-gray-300">{product.category}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
              <Package size={16} className={product.inventory < 10 ? 'text-red-400' : 'text-green-400'} />
              <span className={`text-sm ${product.inventory < 10 ? 'text-red-400' : 'text-green-400'}`}>
                {product.inventory === 0 ? 'Out of stock' : product.inventory < 10 ? `Only ${product.inventory} left` : `${product.inventory} in stock`}
              </span>
            </div>
          </div>

          {product.description && (
            <p className="text-gray-400 mb-6 leading-relaxed">{product.description}</p>
          )}

          {/* Quantity selector */}
          {product.inventory > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-400 text-sm">Quantity:</span>
              <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-gray-700 transition-colors text-white"
                >
                  −
                </button>
                <span className="px-4 py-2 text-white font-bold min-w-[48px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.inventory, q + 1))}
                  className="px-4 py-2 hover:bg-gray-700 transition-colors text-white"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.inventory === 0}
              className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : product.inventory === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              <ShoppingCart size={22} />
              {added ? 'Added!' : product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <button
              onClick={handleWishlist}
              className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${
                wishlisted
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-600 hover:border-red-500 hover:bg-red-500/10'
              }`}
              title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                size={22}
                className={wishlisted ? 'text-red-500' : 'text-gray-400'}
                fill={wishlisted ? 'currentColor' : 'none'}
              />
            </button>
          </div>

          {/* View cart link */}
          {added && (
            <button
              onClick={() => navigate('/cart')}
              className="mt-3 text-orange-500 hover:underline text-sm text-center"
            >
              View Cart →
            </button>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="bg-white text-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer transition-all hover:-translate-y-1"
              >
                <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-3">
                  <p className="text-xs text-gray-500">{p.brand}</p>
                  <p className="font-bold truncate">{p.name}</p>
                  <p className="text-orange-600 font-black">R{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;