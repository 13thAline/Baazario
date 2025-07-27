import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import { FiShield, FiUsers } from 'react-icons/fi';
import { IoSparklesOutline } from 'react-icons/io5';
import { FaHandshake } from 'react-icons/fa';

const ValueCard = ({ icon, title }) => (
  <div className="flex flex-col items-center text-center">
    <div className="bg-white/10 p-6 rounded-full">
      {icon}
    </div>
    <h3 className="mt-4 text-xl font-bold">{title}</h3>
  </div>
);

const AboutPage = () => {
  return (
    <div className="bg-stone-100">
      <Navbar />
      <main>
        <section className="bg-stone-200">
          <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10">
              Connecting Communities, Empowering Commerce
            </h1>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Born from observing the daily challenges of vendors in Bhubaneswar's local markets, Baazario was created to solve one problem: making raw material sourcing simple and fair. We connect vendors directly with suppliers through an easy-to-use platform, replacing outdated methods with transparency and efficiency. Our mission is to empower every local business to thrive.
            </p>
          </div>
        </section>

        <section className="bg-gray-900 text-white">
          <div className="max-w-5xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-wider uppercase">
              Our Values
            </h2>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
              <ValueCard icon={<FiShield size={48} />} title="Trust" />
              <ValueCard icon={<FiUsers size={48} />} title="Unity" />
              <ValueCard icon={<IoSparklesOutline size={48} />} title="Ease" />
              <ValueCard icon={<FaHandshake size={48} />} title="Alliance" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;