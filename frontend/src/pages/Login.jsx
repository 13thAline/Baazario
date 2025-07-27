import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaHandshake, FaFacebook, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const { email, password } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      login(res.data.user, res.data.token); 
      
      if (res.data.user.role === 'Supplier') {
        navigate('/supplier-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err.response.data.msg || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-xl shadow-lg overflow-hidden">
        
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-[#dad8d3]">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Login and continue growing your business</p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>

            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                placeholder="Email"
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"

                name="email" 
                value={email} 
                onChange={onChange}
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="password" 
                placeholder="Password"
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"

                name="password" 
                value={password}
                onChange={onChange}
              />
            </div>
            
            <button className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-black transition-colors" type="submit">
              Login
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center space-x-4">
            <button className="flex items-center justify-center p-2 w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              <FaFacebook size={24} className="text-blue-600" />
            </button>
            <button className="flex items-center justify-center p-2 w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              <FcGoogle size={24} />
            </button>
            <button className="flex items-center justify-center p-2 w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              <FaApple size={24} className="text-black" />
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-black text-white flex flex-col items-center justify-center text-center">
          <div className="bg-gray-800 p-6 rounded-full">
            <FaHandshake size={48} />
          </div>
          <h2 className="text-3xl font-bold mt-8">Welcome to the Future</h2>
          <p className="mt-4 text-gray-400">
            Trusted by thousands, pick up where you left off with Baazario.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;