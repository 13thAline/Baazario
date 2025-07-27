
import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700); 
  };

  const value = { isLoading, showLoader };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};