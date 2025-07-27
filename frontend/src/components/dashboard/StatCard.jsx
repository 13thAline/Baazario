import React from 'react';

const StatCard = ({ title, value, description, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm relative">
      <div className="absolute top-5 right-5 text-gray-400">{icon}</div>
      <h2 className="text-sm font-semibold text-gray-600">{title}</h2>
      <p className="text-4xl font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
};

export default StatCard;