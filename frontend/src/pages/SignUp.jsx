import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiUsers } from 'react-icons/fi';

const SignUp = () => {
  const [userType, setUserType] = useState('Vendor');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault(); 
    try {
      const newUser = { name, email, password, role: userType };
      await axios.post('http://localhost:5000/api/auth/register', newUser);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-stone-200">
          <h1 className="text-3xl font-bold text-gray-800">Join Baazario</h1>
          <p className="mt-2 text-gray-600">Create your account and start growing your business today</p>

          <form className="mt-8" onSubmit={onSubmit}>
            <div className="mb-6">
              <span className="text-gray-700 font-semibold">I am a:</span>
              <div className="mt-2 flex space-x-4">
                <label className="flex-1">
                  <input
                    type="radio"
                    name="userType"
                    value="Vendor"
                    className="sr-only peer"
                    checked={userType === 'Vendor'}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <div className="text-center py-2 px-4 rounded-lg border border-gray-300 cursor-pointer peer-checked:bg-gray-800 peer-checked:text-white peer-checked:border-gray-800 transition-colors">
                    Vendor
                  </div>
                </label>
                <label className="flex-1">
                  <input
                    type="radio"
                    name="userType"
                    value="Supplier"
                    className="sr-only peer"
                    checked={userType === 'Supplier'}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                   <div className="text-center py-2 px-4 rounded-lg border border-gray-300 cursor-pointer peer-checked:bg-gray-800 peer-checked:text-white peer-checked:border-gray-800 transition-colors">
                    Supplier
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Name" className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500" required name="name" value={name} onChange={onChange} />
              </div>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" placeholder="Email" className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500" required name="email" value={email} onChange={onChange} />
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" placeholder="Password" className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500" required name="password" value={password} onChange={onChange} />
              </div>
            </div>
            
            <button type="submit" className="w-full mt-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-black transition-colors">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-gray-800 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-black text-white flex flex-col items-center justify-center text-center">
          <div className="bg-gray-800 p-6 rounded-full">
            <FiUsers size={48} />
          </div>
          <h2 className="text-3xl font-bold mt-8">Welcome to the Future</h2>
          <p className="mt-4 text-gray-400">
            Join thousands of businesses already growing with Baazario.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;