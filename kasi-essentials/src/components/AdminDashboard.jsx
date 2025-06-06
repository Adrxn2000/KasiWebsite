// import React { useState, useEffect, useContext } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { AppContext } from '../App.jsx'; // Assuming AppContext is exported from App.jsx
import EditProductModal from './EditProductModal.jsx'; // Assuming EditProductModal will be in components
import AddProductModal from './AddProductModal.jsx'; // Assuming AddProductModal will be in components

function AdminDashboard() {
  const { user, products, loadProducts, setCurrentPage } = useContext(AppContext);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    if (user?.role !== 'admin') {
      setCurrentPage('home');
    }
  }, [user, setCurrentPage]);

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.deleteProduct(productId);
        loadProducts(); // Refresh product list
      } catch (error) {
        alert('Failed to delete product: ' + error.message);
      }
    }
  };

  if (user?.role !== 'admin') {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button
          onClick={() => setIsAddProductModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center"
        >
          <Plus size={20} className="mr-2" /> Add New Product
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.image} alt={product.name} className="h-12 w-12 rounded-md object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap">R{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.inventory}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="text-indigo-400 hover:text-indigo-600 mr-3"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
