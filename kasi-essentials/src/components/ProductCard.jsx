import React, { useContext } from 'react';
import { AppContext } from '../App.jsx'; 


function ProductCard({ product }) {
  const { addToCart, user } = useContext(AppContext);

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    addToCart(product);
  };

  return (
    <div className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-84 object-cover"
      />
      <div className="p-4">
        <div className="text-sm text-gray-600 mb-1">{product.brand}</div>
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-orange-600">R{product.price}</span>
          <span className="text-sm text-gray-600">Stock: {product.inventory}</span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product.inventory === 0}
          className={`w-full py-2 rounded-lg pd- font-bold transition-colors ${
            product.inventory === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
