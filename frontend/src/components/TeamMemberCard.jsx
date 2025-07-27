import React from 'react';
import { FiGithub } from 'react-icons/fi';

const TeamMemberCard = ({ imageUrl, name, role, githubUrl }) => {
  return (
    <div className="bg-[#7C7C7C]/55 p-4 rounded-lg flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <img src={imageUrl} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
        <FiGithub size={24} />
      </a>
    </div>
  );
};

export default TeamMemberCard;