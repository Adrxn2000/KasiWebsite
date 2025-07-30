import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const savedCredentials = localStorage.getItem('savedLoginCredentials');
    if (savedCredentials) {
      const { email, password, remember } = JSON.parse(savedCredentials);
      if (remember) {
        setFormData({ email, password });
        setRememberMe(true);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      console.log('Attempting login with:', formData.email, formData.password);
      
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find(u => u.email === formData.email && u.password === formData.password);

      if (user) {
        login({ name: user.name, email: user.email, role: user.role });
        
        if (rememberMe) {
          localStorage.setItem('savedLoginCredentials', JSON.stringify({
            email: formData.email,
            password: formData.password,
            remember: true
          }));
        } else {
          localStorage.removeItem('savedLoginCredentials');
        }
        
        navigate(user.role === 'admin' ? '/admin' : '/shop');
      }
      else if (formData.email === '' && formData.password === '') {
        login({ email: formData.email, role: 'user' });
        
        if (rememberMe) {
          localStorage.setItem('savedLoginCredentials', JSON.stringify({
            email: formData.email,
            password: formData.password,
            remember: true
          }));
        } else {
          localStorage.removeItem('savedLoginCredentials');
        }
        
        navigate('/shop');
      } 
      else if (formData.email === 'admin@blackfabrics.com' && formData.password === 'admin123') {
        login({ email: formData.email, role: 'admin' });
        
        if (rememberMe) {
          localStorage.setItem('savedLoginCredentials', JSON.stringify({
            email: formData.email,
            password: formData.password,
            remember: true
          }));
        } else {
          localStorage.removeItem('savedLoginCredentials');
        }
        
        navigate('/admin'); 
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
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2 w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
            />
            <label htmlFor="rememberMe" className="text-gray-300">
              Remember my credentials
            </label>
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
          <p>User: (empty fields) or register new account</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;