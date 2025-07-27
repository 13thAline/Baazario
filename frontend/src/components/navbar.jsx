import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useLoading } from '../context/LoadingContext';
import logo from '../assets/Ellipse-2.png'; 

const Navbar = () => {
  const navigate = useNavigate();
  const { showLoader } = useLoading();

  const handleNavigate = (path) => {
    showLoader();
    setTimeout(() => {
      navigate(path);
    }, 150); 
  };
  
  const handleHomeNavigate = () => {
    if (window.location.pathname === '/' && window.scrollY < 100) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
       handleNavigate('/');
    }
  }

  return (
    <nav className="bg-[#7c7c7c] backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={handleHomeNavigate} className="flex items-center flex-shrink-0 text-white hover:text-gray-600 transition-colors cursor-pointer">
              <img className="h-12 w-auto" src={logo} alt="Baazario Logo" />
              <span className="font-bold text-xl ml-3">Baazario</span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <ScrollLink
                to="features"
                smooth={true}
                duration={500}
                offset={-80}
                className=" text-white hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Features
              </ScrollLink>
              <button onClick={() => handleNavigate('/about')} className=" text-white hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                About
              </button>
              <button onClick={() => handleNavigate('/contact')} className=" text-white hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Contact
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={() => handleNavigate('/login')} className="text-gray-800 hover:text-black px-3 py-2 rounded-md text-sm font-medium">Login</button>
            <button onClick={() => handleNavigate('/signup')} className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-gray-800 hover:bg-black">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;