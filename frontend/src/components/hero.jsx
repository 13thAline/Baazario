import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
const heroImage = '/Rectangle-12.png';

const Hero = () => {
  const navigate = useNavigate();
  const { showLoader } = useLoading();

  const handleNavigate = (path) => {
    showLoader();
    setTimeout(() => {
      navigate(path);
    }, 150);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#dad8d3]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Smart Commerce, <br /> Seamless Connections
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Transform your business with AI-powered insights, local emergency shopping, and direct wholesale connections. Everything you need in one platform.
          </p>
          <div className="mt-8 flex space-x-4">
            <button onClick={() => handleNavigate('/signup')} className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-black">
              Get Started Free
            </button>
            <button onClick={() => handleNavigate('/login')} className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50">
              Log In
            </button>
          </div>
        </div>
           <img src={heroImage} alt="Grocer assisting customer" className="rounded-xl w-full h-full object-cover"/>
      </div>
    </section>
  );
};

export default Hero;