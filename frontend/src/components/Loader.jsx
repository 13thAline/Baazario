import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
    </div>
  );
};

export default Loader;