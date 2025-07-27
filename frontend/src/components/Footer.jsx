import React from 'react';
import { FaInstagram, FaGithub, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../assets/Ellipse-1.png';

const Footer = () => {
  const navigate = useNavigate();
  const { showLoader } = useLoading();

  const handleNavigate = (path) => {
    showLoader();
    setTimeout(() => {
      navigate(path);
    }, 150);
  };
  return (
    <footer name="contact" className="bg-[#dad8d3] text-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-4">
            <img 
              className="h-16 w-auto" 
              src={logo} 
              alt="Baazario Logo" 
            />
            <p className="mt-4 text-sm">
              Smart commerce solutions for modern businesses.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><ScrollLink
                                to="features"
                                smooth={true}
                                duration={500}
                                offset={-80}
                                className="text-sm hover:underline cursor-pointer"
                              >
                                Features
                              </ScrollLink></li>
                <li><button onClick={() => handleNavigate('/api-docs')} className="text-sm hover:underline">API</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><button onClick={() => handleNavigate('/about')} className="text-sm hover:underline">About</button></li>
                <li><button onClick={() => handleNavigate('/contact')} className="text-sm hover:underline">Contact</button></li>
                <li><button onClick={() => handleNavigate('/careers')} className="text-sm hover:underline">Careers</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-stone-300 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">&copy; 2025 Baazario. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a href="https://www.instagram.com/_not_the_real_sailen/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
              <FaInstagram size={20} />
            </a>
            <a href="https://github.com/13thAline/Baazario" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
              <FaGithub size={20} />
            </a>
            <a href="https://x.com/Aline_of_Aliens" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;