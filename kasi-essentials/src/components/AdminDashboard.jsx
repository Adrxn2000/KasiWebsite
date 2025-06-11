import React, { useState, useContext } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { AppContext } from '../App.jsx'; 
import EditProductModal from './EditProductModal.jsx'; 
import AddProductModal from './AddProductModal.jsx';

function AdminDashboard() {
  const { user, products, loadProducts } = useContext(AppContext);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // Delete from localStorage
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const updatedProducts = products.filter(p => p.id !== productId);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        
        // If you have an API, uncomment this line:
        // await API.deleteProduct(productId);
        
        loadProducts(); // Refresh product list
      } catch (error) {
        alert('Failed to delete product: ' + error.message);
      }
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-400">You need admin privileges to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button
          onClick={() => setIsAddProductModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center transition-colors"
        >
          <Plus size={20} className="mr-2" /> Add New Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-400 text-lg">No products found. Add your first product!</p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Brand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Inventory</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-12 w-12 rounded-md object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{product.brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-400 font-semibold">R{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      <span className={`${product.inventory < 10 ? 'text-red-400' : 'text-gray-300'}`}>
                        {product.inventory}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-indigo-400 hover:text-indigo-300 mr-3 transition-colors"
                        title="Edit Product"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={() => {
            loadProducts();
            setEditingProduct(null);
          }}
        />
      )}

      {isAddProductModalOpen && (
        <AddProductModal
          onClose={() => setIsAddProductModalOpen(false)}
          onSave={() => {
            loadProducts();
            setIsAddProductModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default AdminDashboard;