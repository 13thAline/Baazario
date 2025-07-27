import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

const CTA = () => {
  const navigate = useNavigate();
  const { showLoader } = useLoading();

  const handleNavigate = (path) => {
    showLoader();
    setTimeout(() => {
      navigate(path);
    }, 150);
  };

  return (
    <section className="bg-black text-white">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Ready to Transform Your Commerce Experience?
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Join thousands of businesses already using Baazario to streamline operations and boost growth.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button onClick={() => handleNavigate('/signup')} className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200">
            Start Free Trial
          </button>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-transparent text-white font-semibold rounded-lg border border-gray-500 hover:bg-white/10 inline-block"
          >
            Watch Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;