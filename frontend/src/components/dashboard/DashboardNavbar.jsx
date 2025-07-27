// src/components/dashboard/DashboardNavbar.jsx
import React from 'react';
// ## 1. Import the necessary hooks ##
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLoading } from '../../context/LoadingContext';

const DashboardNavbar = () => {
  // ## 2. Get the functions we need from our hooks ##
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showLoader } = useLoading();

  // Conditional styling for the role tag
  const roleClasses = user?.role === 'Supplier'
    ? 'bg-green-100 text-green-800'
    : 'bg-blue-100 text-blue-800';

  // ## 3. Create the sign-out handler ##
  const handleSignOut = () => {
    showLoader(); // Show the loader for a smooth transition
    setTimeout(() => {
      logout(); // Clear the user's token and data
      navigate('/'); // Redirect to the homepage
    }, 500); // A small delay for the loader to appear
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800">Baazario</h1>
            <p className="text-sm text-gray-500 pt-1">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${roleClasses}`}>
              {user?.role}
            </span>
            {/* ## 4. Add the onClick handler to the button ## */}
            <button
              onClick={handleSignOut}
              className="text-sm font-medium text-gray-600 hover:text-black"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;