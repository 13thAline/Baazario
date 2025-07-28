import React, { useState, useEffect } from 'react';
import StatCard from '../components/dashboard/StatCard';
import { FiUsers, FiArchive, FiBox, FiPlus, FiX, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const SupplierDashboard = () => {
  const { token } = useAuth();
  const [catalogItems, setCatalogItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // State for form fields
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const fetchCatalogItems = async () => {
    if (token) {
      try {
        const config = { headers: { 'x-auth-token': token } };
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/catalog/my-items`, config);
        setCatalogItems(res.data || []); // Fallback to empty array if data is null
      } catch (err) {
        console.error("Could not fetch catalog items", err);
        setCatalogItems([]); // Set to empty array on error to prevent crash
      }
    }
  };

  useEffect(() => {
    fetchCatalogItems();
  }, [token]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('quantity', quantity);
    formData.append('itemImage', imageFile);

    try {
      const config = { headers: { 'x-auth-token': token } };
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/catalog`, formData, config);
      setCatalogItems([res.data, ...catalogItems]);
      
      // Reset form fields
      setName('');
      setQuantity('');
      setImageFile(null);
      setShowForm(false);
    } catch (err) {
      alert('Failed to add item. Check console for details.');
      console.error(err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const config = { headers: { 'x-auth-token': token } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/catalog/${itemId}`, config);
        setCatalogItems(catalogItems.filter(item => item._id !== itemId));
      } catch (err) {
        alert('Failed to delete item');
        console.error(err);
      }
    }
  };

  const stats = [
    { title: 'Vendor Groups', value: '0', description: 'Active groups', icon: <FiUsers size={20} /> },
    { title: 'My Items', value: catalogItems.length, description: 'Items in catalog', icon: <FiArchive size={20} /> },
    { title: 'Orders', value: '0', description: 'Coming in Phase 2', icon: <FiBox size={20} /> },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
      </div>

      {/* My Catalog Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">My Catalog</h3>
            <p className="text-sm text-gray-500">Manage the items you have for sale</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black">
            {showForm ? <FiX /> : <FiPlus />}
            <span>{showForm ? 'Cancel' : 'Add Item'}</span>
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAddItem} className="mt-6 border-t pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                <input type="text" placeholder="e.g., Tomato" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input type="text" placeholder="e.g., 50kg" value={quantity} onChange={(e) => setQuantity(e.target.value)} required className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Item Image</label>
              <input type="file" onChange={(e) => setImageFile(e.target.files[0])} required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
            </div>
            <div className="text-right">
              <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">Save Item</button>
            </div>
          </form>
        )}

        <div className="mt-6 border-t border-gray-200">
          {catalogItems.length === 0 ? (
            <div className="text-center py-16"><p className="text-gray-500">Your catalog is empty. Add your first item!</p></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6">
              {catalogItems.map(item => (
                <div key={item._id} className="border rounded-lg overflow-hidden shadow-sm relative group">
                  <button 
                    onClick={() => handleDeleteItem(item._id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    aria-label="Delete item"
                  >
                    <FiTrash2 size={16} />
                  </button>
                  <img src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`} alt={item.name} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;