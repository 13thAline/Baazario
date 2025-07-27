import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import TeamMemberCard from '../components/TeamMemberCard';
import { FiPhoneCall, FiCalendar } from 'react-icons/fi';
import axios from 'axios'; // ## Import axios ##

import sailenImage from '../assets/Ellipse-17.png';
import ashutoshImage from '../assets/Ellipse-19.png';
import nipunaImage from '../assets/Ellipse-18.png';
import bibhuduttaImage from '../assets/Ellipse-15.png';
import arpitaImage from '../assets/Ellipse-16.png';


const teamMembers = [
  { name: 'Sailen Sahoo', role: 'Fullstack developer', imageUrl: sailenImage, githubUrl: 'https://github.com/13thAline' },
  { name: 'Ashutosh Badapanda', role: 'Backend developer', imageUrl: ashutoshImage, githubUrl: 'https://github.com/fomo-ash' },
  { name: 'Nipuna Mahakur', role: 'Backend developer', imageUrl: nipunaImage, githubUrl: 'https://github.com/nipuna1902' },
  { name: 'Bibhudutta Panda', role: 'Backend developer', imageUrl: bibhuduttaImage, githubUrl: 'https://github.com/BibhuDev' },
  { name: 'Arpita Mahapatra', role: 'UI/UX designer', imageUrl: arpitaImage, githubUrl: 'https://github.com/ArpitaM27' },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ## Handle form submission ##
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);
      alert(res.data.msg);
      handleClear();
    } catch (err) {
      alert('Failed to send message.');
    }
  };

  const handleClear = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-[#dad8d3]">
      <Navbar />
      <main>
        <section className="py-16 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-4xl font-extrabold text-gray-900">Get in Touch</h1>
            <p className="mt-4 text-lg text-gray-600">
              Ready to transform your commerce experience? Our team is here to help you get started with smart, seamless connections.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              {/* ## Make "Call us" a link ## */}
              <button
                onClick={() => alert('This feature is currently not available.')}
                className="flex items-center space-x-2 bg-gray-800 text-white px-5 py-3 rounded-lg font-semibold hover:bg-black"
              >
                <FiPhoneCall />
                <span>Call us Now</span>
              </button>
              {/* ## Make "Schedule Meeting" an external link ## */}
              <a href="https://calendly.com/sahoosailen13/30min" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-white text-gray-800 px-5 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50">
                <FiCalendar />
                <span>Schedule Meeting</span>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto p-8 sm:p-12 bg-[#7C7C7C]/55 rounded-2xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-gray-900">Send Us A Message</h2>
            <p className="text-gray-900">Fill out the form below and we'll get back to you within 24 hours</p>
            
            <form className="mt-8 text-left space-y-4" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-3 rounded-md bg-gray-100 border-transparent focus:ring-2 focus:ring-gray-500" required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-md bg-gray-100 border-transparent focus:ring-2 focus:ring-gray-500" required />
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className="w-full p-3 rounded-md bg-gray-100 border-transparent focus:ring-2 focus:ring-gray-500" required />
              <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} className="w-full p-3 rounded-md bg-gray-100 border-transparent focus:ring-2 focus:ring-gray-500" required></textarea>
              <div className="flex space-x-4">
                <button type="submit" className="flex-1 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-black">Send</button>
                <button type="button" onClick={handleClear} className="flex-1 py-3 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50">Clear Form</button>
              </div>
            </form>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Meet Our Team</h2>
            <div className="mt-8 space-y-4">
              {teamMembers.map(member => (
                <TeamMemberCard key={member.name} {...member} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;