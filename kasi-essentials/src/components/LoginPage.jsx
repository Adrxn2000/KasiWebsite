import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      console.log('Attempting login with:', formData.email, formData.password); // Debug log
      if (formData.email === 'user@example.com' && formData.password === 'user123') {
        login({ email: formData.email, role: 'user' });
        navigate('/shop'); // Redirect to shop page after login
      } else if (formData.email === 'admin@blackfabrics.com' && formData.password === 'admin123') {
        login({ email: formData.email, role: 'admin' });
        navigate('/admin'); // Redirect to admin dashboard for admin
      }
      else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-gray-400">Don't have an account?</p>
          <button
            onClick={() => navigate('/register')}
            className="text-orange-500 hover:underline font-bold"
          >
            Register here
          </button>
        </div>
        
        <div className="text-center mt-4 text-sm text-gray-400">
          <p>Demo accounts:</p>
          <p>Admin: admin@blackfabrics.com / admin123</p>
          <p>User: user@example.com / user123</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
