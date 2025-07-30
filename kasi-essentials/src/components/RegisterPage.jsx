import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = existingUsers.some(user => user.email === formData.email);
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }
    
      await new Promise(resolve => setTimeout(resolve, 1000));
    
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'user',
        registeredAt: new Date().toISOString()
      };
      
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      
      
      localStorage.setItem('currentUser', JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }));
      
      setSuccess('Registration successful! Redirecting...');

      register({ name: formData.name, email: formData.email, role: 'user' });
    
      setTimeout(() => {
        navigate('/shop');
      }, 1500);
      
    } catch (err) {
      setError(err.message);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>
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
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              minLength="6"
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-gray-400">Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
            className="text-orange-500 hover:underline font-bold"
          >
            Login here
          </button>
        </div>
        
        <div className="text-center mt-4 text-xs text-gray-500">
          <p>Users are stored locally in your browser</p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;