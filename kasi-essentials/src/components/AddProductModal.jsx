import React, { useState, useContext } from 'react';
import { X } from 'lucide-react';
import { AppContext } from '../App.jsx';

function AddProductModal({ onClose, onSave }) {
  const { API } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    image: '',
    inventory: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Create new product object
      const newProduct = {
        id: Date.now().toString(), // Simple ID generation
        name: formData.name,
        brand: formData.brand,
        price: parseFloat(formData.price),
        image: formData.image,
        inventory: parseInt(formData.inventory),
        description: formData.description,
        createdAt: new Date().toISOString()
      };

      // Add product to localStorage
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const updatedProducts = [...products, newProduct];
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      // If you have an API, uncomment this line:
      // await API.addProduct(newProduct);
      
      onSave();
    } catch (err) {
      setError(err.message || 'Failed to add product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              placeholder="Enter brand name"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price (R)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="/src/assets/IMG-20250221-WA0012.jpg"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Inventory Count</label>
            <input
              type="number"
              name="inventory"
              value={formData.inventory}
              onChange={handleChange}
              required
              min="0"
              placeholder="0"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Enter product description..."
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;