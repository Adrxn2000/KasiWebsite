import React, { useContext } from 'react';
import ProductCard from './ProductCard.jsx'; // Assuming ProductCard will also be in components
import { AppContext } from '../App.jsx';

function HomePage() {
  const { products, addToCart, setCurrentPage } = useContext(AppContext);
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-4">Fresh streetwear, Delivered!</h2>
          <p className="text-xl mb-8">Shop the latest Kasi brands and streetwear fashion.</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
