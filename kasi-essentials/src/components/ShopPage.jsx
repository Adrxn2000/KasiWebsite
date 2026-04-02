import React, { useState, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import { AppContext } from '../App.jsx';
import { SlidersHorizontal, X } from 'lucide-react';

function ShopPage() {
  const { products, loading, searchTerm } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  let filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchTerm === '' ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'price-asc') filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  if (sortBy === 'name') filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-gray-400 uppercase tracking-widest text-sm font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Page Header */}
      <div className="border-b border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <p className="text-orange-400 text-xs font-black uppercase tracking-[0.4em] mb-2">Kasi Essentials</p>
          <h1 className="text-white font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: "'Impact', sans-serif" }}>
            THE COLLECTION
          </h1>
          <p className="text-gray-500 mt-2">{filteredProducts.length} products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-800">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-black'
                    : 'border border-gray-700 text-gray-400 hover:border-orange-500 hover:text-orange-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <label className="text-gray-500 text-xs font-bold uppercase tracking-widest whitespace-nowrap">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white text-sm px-3 py-2 outline-none focus:border-orange-500 transition-colors"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Active filters */}
        {(selectedCategory !== 'all' || searchTerm) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory !== 'all' && (
              <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase px-3 py-1.5">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('all')}><X size={12} /></button>
              </div>
            )}
            {searchTerm && (
              <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 text-gray-400 text-xs font-bold uppercase px-3 py-1.5">
                "{searchTerm}"
              </div>
            )}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <p className="text-gray-600 text-6xl mb-4">¯\_(ツ)_/¯</p>
            <p className="text-white font-black text-2xl uppercase tracking-wide mb-2">Nothing found</p>
            <p className="text-gray-500 mb-6">Try a different category or search term</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-orange-500 text-black px-6 py-3 font-black uppercase tracking-widest hover:bg-orange-400 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;