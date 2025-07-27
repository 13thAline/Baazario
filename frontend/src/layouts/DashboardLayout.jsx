
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';

const DashboardLayout = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardNavbar />
      <main className="p-8">
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;