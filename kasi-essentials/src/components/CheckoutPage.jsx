import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App.jsx'; 

function CheckoutPage() {
  const { cart, getTotalPrice, clearCart, user, setCurrentPage } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setCurrentPage('login');
    } else if (cart.length === 0 && !orderPlaced) {
      setCurrentPage('shop');
    }
  }, [user, cart, orderPlaced, setCurrentPage]);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError('');
    try {
      const order = await API.createOrder({
        userId: user.id,
        items: cart.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price })),
        total: getTotalPrice()
      });
      console.log('Order created:', order);
      await API.processPayment();

      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || (cart.length === 0 && !orderPlaced)) {
    return null; 
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-8 text-green-500">Order Placed Successfully!</h1>
        <p className="text-xl mb-8">Thank you for your purchase. Your order is being processed.</p>
        <button
          onClick={() => setCurrentPage('home')}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
            <span>{item.name} x {item.quantity}</span>
            <span>R{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between items-center text-xl font-bold mt-4 pt-4 border-t border-gray-700">
          <span>Total:</span>
          <span>R{getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
        <p className="text-gray-400 mb-6">
          Payment processing is simulated. Click "Place Order" to complete your purchase.
        </p>
        <button
          onClick={handleCheckout}
          disabled={isLoading || cart.length === 0}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Processing Payment...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
