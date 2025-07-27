import React from 'react';

const FeatureCard = ({ icon, title, description, imageUrl }) => {
  return (
    <div className="bg-[#7C7C7C] p-6 rounded-xl flex flex-col">
      <div className="bg-white w-12 h-12 flex items-center justify-center rounded-full text-brand-green">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-black text-sm">{description}</p>
      <img src={imageUrl} alt={title} className="mt-4 rounded-lg object-cover h-40 w-full" />
      <a href="#" className="mt-auto pt-4 text-gray-800 font-semibold hover:text-black">
        Learn More &rarr;
      </a>
    </div>
  );
};

export default FeatureCard;