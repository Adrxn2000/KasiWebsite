import React, { useState, useEffect, createContext, useContext } from 'react';
import { Search, ShoppingCart, User, Menu, X, Plus, Minus, Trash2, Eye, Edit, Package, Users, DollarSign, Star } from 'lucide-react';

// Context for global state management
export const AppContext = createContext(); // Export AppContext

// Mock API functions (replace with real API calls)
const API = {
  // Authentication
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const token = 'mock-jwt-token-' + user.id;
      return { user: { ...user, password: undefined }, token };
    }
    throw new Error('Invalid credentials');
  },
  
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser = { ...userData, id: Date.now(), role: 'customer' };
    mockUsers.push(newUser);
    const token = 'mock-jwt-token-' + newUser.id;
    return { user: { ...newUser, password: undefined }, token };
  },
  
  // Products
  getProducts: async (search = '') => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    );
  },
  
  addProduct: async (product) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProduct = { ...product, id: Date.now() };
    mockProducts.push(newProduct);
    return newProduct;
  },
  
  updateProduct: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts[index] = { ...mockProducts[index], ...updates };
      return mockProducts[index];
    }
    throw new Error('Product not found');
  },
  
  deleteProduct: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts.splice(index, 1);
      return true;
    }
    throw new Error('Product not found');
  },
  
  // Orders
  createOrder: async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newOrder = {
      id: Date.now(),
      ...orderData,
      status: 'processing',
      createdAt: new Date().toISOString()
    };
    mockOrders.push(newOrder);
    return newOrder;
  },
  
  processPayment: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Simulate payment processing
    if (Math.random() > 0.1) { // 90% success rate
      return { success: true, transactionId: 'txn_' + Date.now() };
    }
    throw new Error('Payment failed');
  }
};

// Mock data
const mockUsers = [
  { id: 1, email: 'admin@blackfabrics.com', password: 'admin123', name: 'Admin User', role: 'admin' },
  { id: 2, email: 'user@example.com', password: 'user123', name: 'John Doe', role: 'customer' }
];

const mockProducts = [
  { id: 1, name: 'Balaclava Hoodie', brand: 'Balaclava', price: 400, image: '/api/placeholder/300/300', inventory: 15, category: 'Hoodies' },
  { id: 2, name: 'Streetwear Hoodie', brand: 'Damnationdesign', price: 450, image: '/api/placeholder/300/300', inventory: 8, category: 'Hoodies' },
  { id: 3, name: 'Balaclava T-Shirt', brand: 'Balaclava', price: 250, image: '/api/placeholder/300/300', inventory: 20, category: 'T-Shirts' },
  { id: 4, name: 'Street Tee', brand: 'Galbakaline', price: 280, image: '/api/placeholder/300/300', inventory: 12, category: 'T-Shirts' },
  { id: 5, name: 'Kasi Bucket Hat', brand: 'Umelu', price: 150, image: '/api/placeholder/300/300', inventory: 25, category: 'Accessories' }
];

const mockOrders = [];

// Import components
import Header from './components/Header.jsx';
import HomePage from './components/HomePage.jsx';
import ShopPage from './components/ShopPage.jsx';
import ProductCard from './components/ProductCard.jsx';
import AboutPage from './components/AboutPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import CartPage from './components/CartPage.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
// import EditProductModal from './components/EditProductModal.jsx';
// import AddProductModal from './components/AddProductModal.jsx';


// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState('home'); // Added currentPage state

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await API.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
    setLoading(false);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const contextValue = {
    user, setUser,
    cart, addToCart, removeFromCart, updateCartQuantity, clearCart, getTotalPrice,
    products, setProducts, loadProducts,
    loading, setLoading,
    searchTerm, setSearchTerm,
    currentPage, setCurrentPage // Added setCurrentPage to context
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="pb-20">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'shop' && <ShopPage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'cart' && <CartPage />}
          {currentPage === 'login' && <LoginPage />}
          {currentPage === 'register' && <RegisterPage />}
          {currentPage === 'checkout' && <CheckoutPage />}
          {currentPage === 'admin' && user?.role === 'admin' && <AdminDashboard />}
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
