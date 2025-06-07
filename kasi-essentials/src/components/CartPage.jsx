import React, { useContext } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { AppContext } from '../App.jsx'; // Keep AppContext for cart state

function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, getTotalPrice } = useContext(AppContext);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <p className="text-xl mb-8">Please login to view your cart</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600"
        >
          Login
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b border-gray-700 py-4 last:border-b-0">
            <div className="flex items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-400">R{item.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-600 rounded-md">
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 hover:bg-gray-700 rounded-l-md"
                >
                  <Minus size={16} />
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-700 rounded-r-md"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center text-2xl font-bold mb-6">
          <span>Total:</span>
          <span>R{getTotalPrice().toFixed(2)}</span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;
