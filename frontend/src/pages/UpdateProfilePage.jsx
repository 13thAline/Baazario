// src/pages/UpdateProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const UpdateProfilePage = () => {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    address: '',
    contactName: user?.name || '',
    contactEmail: 'user@example.com', // In a real app, get this from auth context
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const config = { headers: { 'x-auth-token': token } };
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile/me`, config);
          setFormData(prev => ({ ...prev, ...res.data }));
        } catch (err) {
          console.error('Could not fetch profile', err);
        }
      }
    };
    fetchProfile();
  }, [token]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json', 'x-auth-token': token } };
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/profile`, formData, config);
      alert(res.data.msg);
    } catch (err) {
      alert('Profile update failed');
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Update Your Profile</h1>
        <p className="text-gray-600 mb-8">Keep your supplier information and catalog up to date.</p>

        <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">Contact Person</label>
              <input type="text" name="contactName" value={formData.contactName} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100" />
            </div>
             <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input type="email" name="contactEmail" value={formData.contactEmail} disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100" />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Business Address</label>
            <textarea name="address" value={formData.address} onChange={onChange} rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
          </div>
          <div className="text-right">
            <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-black">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;