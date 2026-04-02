import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useContext(AppContext);
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <p className="text-xl mb-8">Please login to continue checkout</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600"
        >
          Login
        </button>
      </div>
    );
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <p className="text-xl mb-8">Your cart is empty</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-green-400">Order Placed!</h1>
          <p className="text-lg text-gray-300 mb-8">
            Thank you for your purchase, {user?.name || 'friend'}. Your order is being processed.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 mr-4"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600"
          >
            Keep Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save order to localStorage
      const order = {
        id: 'ORD-' + Date.now(),
        userId: user?.email,
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: getTotalPrice(),
        status: 'processing',
        createdAt: new Date().toISOString()
      };

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-bold">R{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between items-center text-xl font-bold mt-4 pt-4 border-t border-gray-700">
            <span>Total:</span>
            <span className="text-orange-500">R{getTotalPrice().toFixed(2)}</span>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Payment</h2>
          <div className="mb-4 p-4 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-300">Logged in as:</p>
            <p className="font-semibold">{user?.name || user?.email}</p>
          </div>
          <p className="text-gray-400 mb-6 text-sm">
            This is a demo checkout. Click "Place Order" to simulate payment processing.
          </p>
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Processing Payment...
              </span>
            ) : `Place Order — R${getTotalPrice().toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;