import React from 'react';
import Navbar from "../components/navbar"
import Hero from "../components/hero"
import Features from '../components/features';
import CTA from '../components/CTA';
import Footer from '../components/Footer';


const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <div className="bg-white">
          <Features />
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;