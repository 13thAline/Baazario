import React from 'react';
import FeatureCard from './featureCard'
import { FaSearch, FaBoxOpen, FaChartLine } from 'react-icons/fa';

const schedulingImage = '/Rectangle-9.png';
const bulkImage = '/Rectangle-10.png';
const analyticsImage = '/Rectangle-17.png';

const Features = () => {
  const featureData = [
    {
      icon: <FaSearch size={24} />,
      title: 'Smart Scheduling',
      description: 'Automate recurring orders and receive timely reminders for planning time. Stay ahead with smart scheduling that ensures you never miss a beat.',
      imageUrl: schedulingImage,
    },
    {
      icon: <FaBoxOpen size={24} />,
      title: 'Bulk Direct',
      description: 'Access wholesale deals directly from manufacturers. Skip the middleman and maximize your profit margins with bulk purchasing.',
      imageUrl: bulkImage,
    },
    {
      icon: <FaChartLine size={24} />,
      title: 'Analytics Dashboard',
      description: 'Track your daily spending with ease, gain clarity on vendor-wise expenses, and make smarter decisions with detailed monthly reports.',
      imageUrl: analyticsImage,
    },
  ];

  return (
    <section name="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#dad8d3]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Powerful Features for Modern Commerce</h2>
        <p className="mt-4 text-lg text-gray-600">Discover three game-changing tools designed to revolutionize how you do business</p>
      </div>
      <div className="mt-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureData.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;