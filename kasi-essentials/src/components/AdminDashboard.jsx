import React, { useState, useContext } from 'react';
import { Plus, Edit, Trash2, Package, Users, DollarSign, TrendingUp, X, Save } from 'lucide-react';
import { AppContext } from '../App.jsx';
import { useAuth } from '../context/AuthContext.jsx';

// ── Inline Edit Modal ──────────────────────────────────────────────────────────
function ProductModal({ product, onClose, onSave, mode = 'edit' }) {
  const [formData, setFormData] = useState(product || {
    name: '', brand: '', price: '', image: '', inventory: '', category: '', description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 400));

    const products = JSON.parse(localStorage.getItem('products') || '[]');

    if (mode === 'edit') {
      const updated = products.map(p =>
        p.id === product.id
          ? { ...p, ...formData, price: parseFloat(formData.price), inventory: parseInt(formData.inventory) }
          : p
      );
      localStorage.setItem('products', JSON.stringify(updated));
    } else {
      const newProduct = {
        ...formData,
        id: Date.now().toString(),
        price: parseFloat(formData.price),
        inventory: parseInt(formData.inventory),
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('products', JSON.stringify([...products, newProduct]));
    }

    setIsLoading(false);
    onSave();
  };

  const fields = [
    { key: 'name', label: 'Product Name', type: 'text', placeholder: 'e.g. Balaclava Hoodie', col: 2 },
    { key: 'brand', label: 'Brand', type: 'text', placeholder: 'e.g. Balaclava', col: 1 },
    { key: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Hoodies', col: 1 },
    { key: 'price', label: 'Price (R)', type: 'number', placeholder: '0.00', col: 1 },
    { key: 'inventory', label: 'Stock Count', type: 'number', placeholder: '0', col: 1 },
    { key: 'image', label: 'Image Path', type: 'text', placeholder: '/src/assets/image.jpg', col: 2 },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-950 border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <p className="text-orange-400 text-xs font-black uppercase tracking-[0.3em]">Admin</p>
            <h2 className="text-white font-black text-2xl" style={{ fontFamily: "'Impact', sans-serif" }}>
              {mode === 'edit' ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {fields.map(({ key, label, type, placeholder, col }) => (
              <div key={key} className={col === 2 ? 'col-span-2' : 'col-span-1'}>
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-2">{label}</label>
                <input
                  type={type}
                  value={formData[key] || ''}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  required={key !== 'description'}
                  placeholder={placeholder}
                  min={type === 'number' ? 0 : undefined}
                  step={key === 'price' ? '0.01' : undefined}
                  className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 outline-none focus:border-orange-500 transition-colors placeholder-gray-600 text-sm"
                />
              </div>
            ))}
            <div className="col-span-2">
              <label className="block text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Description (Optional)</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Product description..."
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 outline-none focus:border-orange-500 transition-colors placeholder-gray-600 text-sm resize-none"
              />
            </div>
          </div>

          {/* Image preview */}
          {formData.image && (
            <div className="mt-4 flex items-center gap-4">
              <img
                src={formData.image}
                alt="Preview"
                className="w-16 h-16 object-cover border border-gray-700"
                onError={(e) => e.target.style.display = 'none'}
              />
              <p className="text-gray-500 text-xs">Image preview</p>
            </div>
          )}

          <div className="flex gap-4 mt-6 pt-6 border-t border-gray-800">
            <button type="button" onClick={onClose}
              className="flex-1 border border-gray-700 text-gray-400 py-3 font-black uppercase tracking-widest hover:border-gray-500 transition-colors text-sm">
              Cancel
            </button>
            <button type="submit" disabled={isLoading}
              className="flex-1 bg-orange-500 text-black py-3 font-black uppercase tracking-widest hover:bg-orange-400 disabled:opacity-50 transition-colors text-sm flex items-center justify-center gap-2">
              {isLoading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> Saving...</>
              ) : (
                <><Save size={16} /> {mode === 'edit' ? 'Save Changes' : 'Add Product'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
function AdminDashboard() {
  const {products, loadProducts } = useContext(AppContext);
  const { user } = useAuth();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-black text-4xl mb-4" style={{ fontFamily: "'Impact', sans-serif" }}>ACCESS DENIED</p>
          <p className="text-gray-500">You need admin privileges to view this page.</p>
        </div>
      </div>
    );
  }

  const handleDelete = async (productId) => {
    const stored = JSON.parse(localStorage.getItem('products') || '[]');
    const updated = stored.filter(p => String(p.id) !== String(productId));
    localStorage.setItem('products', JSON.stringify(updated));
    await loadProducts();
    setDeleteConfirm(null);
  };

  const totalValue = products.reduce((sum, p) => sum + (p.price * p.inventory), 0);
  const lowStock = products.filter(p => p.inventory < 5).length;
  const outOfStock = products.filter(p => p.inventory === 0).length;

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'text-orange-400' },
    { label: 'Inventory Value', value: `R${totalValue.toLocaleString()}`, icon: DollarSign, color: 'text-green-400' },
    { label: 'Low Stock', value: lowStock, icon: TrendingUp, color: 'text-yellow-400' },
    { label: 'Out of Stock', value: outOfStock, icon: Users, color: 'text-red-400' },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-xs font-black uppercase tracking-[0.4em] mb-1">Admin Panel</p>
              <h1 className="text-white font-black text-4xl" style={{ fontFamily: "'Impact', sans-serif" }}>
                DASHBOARD
              </h1>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-xs uppercase tracking-widest">Logged in as</p>
              <p className="text-orange-400 font-bold text-sm">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800 mb-8">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-black p-6 hover:bg-gray-950 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest">{label}</p>
                <Icon size={18} className={color} />
              </div>
              <p className={`font-black text-3xl ${color}`} style={{ fontFamily: "'Impact', sans-serif" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-px bg-gray-800 mb-8 w-fit">
          {['products', 'orders'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-colors ${
                activeTab === tab ? 'bg-orange-500 text-black' : 'bg-black text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'products' && (
          <>
            {/* Products Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400 text-sm">{products.length} products total</p>
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 bg-orange-500 text-black px-5 py-3 font-black uppercase tracking-widest text-sm hover:bg-orange-400 transition-colors"
              >
                <Plus size={16} /> Add Product
              </button>
            </div>

            {/* Products Table */}
            {products.length === 0 ? (
              <div className="border border-gray-800 py-16 text-center">
                <Package size={48} className="text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 font-bold uppercase tracking-wide">No products yet</p>
                <button onClick={() => setIsAdding(true)} className="mt-4 text-orange-400 font-black uppercase tracking-widest text-sm hover:text-orange-300 transition-colors">
                  Add your first product →
                </button>
              </div>
            ) : (
              <div className="border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800 bg-gray-950">
                        {['Product', 'Brand', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-500">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                      {products.map(product => (
                        <tr key={product.id} className="hover:bg-gray-950 transition-colors group">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 object-cover border border-gray-700"
                                onError={(e) => { e.target.src = 'https://placehold.co/40x40/111/333?text=?'; }}
                              />
                              <span className="text-white font-bold text-sm">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-gray-400 text-sm">{product.brand}</td>
                          <td className="px-4 py-4">
                            <span className="bg-gray-900 text-gray-400 text-xs font-bold uppercase px-2 py-1">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-orange-400 font-black text-sm">R{product.price}</td>
                          <td className="px-4 py-4">
                            <span className={`text-sm font-black ${
                              product.inventory === 0 ? 'text-red-500'
                              : product.inventory < 5 ? 'text-yellow-400'
                              : 'text-green-400'
                            }`}>
                              {product.inventory}
                              {product.inventory === 0 && <span className="text-xs ml-1 font-bold text-red-500/70">OUT</span>}
                              {product.inventory > 0 && product.inventory < 5 && <span className="text-xs ml-1 font-bold text-yellow-400/70">LOW</span>}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="text-gray-500 hover:text-orange-400 transition-colors"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(product)}
                                className="text-gray-500 hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'orders' && (
          <div className="border border-gray-800 py-16 text-center">
            <DollarSign size={48} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-wide">Orders coming soon</p>
            <p className="text-gray-600 text-sm mt-2">Real order management will be available once the backend is connected.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {editingProduct && (
        <ProductModal
          product={editingProduct}
          mode="edit"
          onClose={() => setEditingProduct(null)}
          onSave={() => { loadProducts(); setEditingProduct(null); }}
        />
      )}

      {isAdding && (
        <ProductModal
          mode="add"
          onClose={() => setIsAdding(false)}
          onSave={() => { loadProducts(); setIsAdding(false); }}
        />
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-950 border border-gray-800 p-8 max-w-sm w-full">
            <p className="text-white font-black text-xl uppercase tracking-wide mb-2">Delete Product?</p>
            <p className="text-gray-400 text-sm mb-6">
              "{deleteConfirm.name}" will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-700 text-gray-400 py-3 font-black uppercase tracking-widest text-sm hover:border-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="flex-1 bg-red-500 text-white py-3 font-black uppercase tracking-widest text-sm hover:bg-red-400 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;