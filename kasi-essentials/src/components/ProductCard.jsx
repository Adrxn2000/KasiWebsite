import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { AppContext } from '../App.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function ProductCard({ product }) {
  const { addToCart, addToWishlist, isWishlisted } = useContext(AppContext);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) { navigate('/login'); return; }
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) { navigate('/login'); return; }
    addToWishlist(product);
  };

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden bg-gray-900 aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://placehold.co/400x530/111/333?text=No+Image'; }}
        />
        <div className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              onClick={handleAddToCart}
              disabled={product.inventory === 0}
              className={`w-full py-3 font-black uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2 ${
                justAdded ? 'bg-green-500 text-white'
                : product.inventory === 0 ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-orange-500 text-black hover:bg-orange-400'
              }`}
            >
              <ShoppingCart size={16} />
              {justAdded ? 'Added!' : product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center transition-all duration-200 ${
            hovered || wishlisted ? 'opacity-100' : 'opacity-0'
          } ${wishlisted ? 'bg-red-500' : 'bg-black/60 hover:bg-black'}`}
        >
          <Heart size={16} className="text-white" fill={wishlisted ? 'white' : 'none'} />
        </button>
        <div className="absolute top-3 left-3 bg-black/80 text-orange-400 text-xs font-black uppercase tracking-widest px-2 py-1">
          {product.category}
        </div>
        {product.inventory === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-black text-gray-400 text-xs font-black uppercase tracking-widest px-3 py-2">Sold Out</span>
          </div>
        )}
        {product.inventory > 0 && product.inventory < 5 && (
          <div className="absolute bottom-16 left-3 bg-red-500 text-white text-xs font-black uppercase tracking-wider px-2 py-1">
            Only {product.inventory} left
          </div>
        )}
      </div>
      <div className="pt-3">
        <p className="text-orange-400 text-xs font-black uppercase tracking-widest mb-1">{product.brand}</p>
        <h3 className="text-white font-bold text-base leading-tight mb-2 group-hover:text-orange-400 transition-colors">{product.name}</h3>
        <span className="text-orange-500 font-black text-lg">R{product.price}</span>
      </div>
    </div>
  );
}

export default ProductCard;