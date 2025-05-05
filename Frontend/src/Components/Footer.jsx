import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === '123') {
      navigate('/Add_New_Recipes');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand/About */}
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                EduCeylon
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover, share, and connect through food. CookConnect is your daily dose of culinary inspiration and community.
            </p>
            
            {/* Social Icons for mobile */}
            <div className="flex space-x-4 md:hidden">
              <a href="#" className="text-gray-400 hover:text-white p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-300">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-300">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-300">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-300">
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>

            {/* Admin Section */}
            <div className="pt-4">
              <button
                onClick={() => setShowAdminLogin(!showAdminLogin)}
                className="relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
              >
                Admin Access
                <span className="ml-1">
                  <svg className={`w-3 h-3 transition-transform duration-200 ${showAdminLogin ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>

              {showAdminLogin && (
                <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 animate-fadeIn">
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Enter Admin Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                    />
                    {error && (
                      <div className="text-red-400 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                      </div>
                    )}
                    <button
                      onClick={handleLogin}
                      className="w-full bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800 text-white py-2 rounded-lg font-medium shadow-md hover:shadow-teal-500/20 transition-all duration-300 flex items-center justify-center"
                    >
                      Login
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Explore
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500"></span>
            </h3>
            <ul className="space-y-3">
              {['Home', 'Community', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-300 hover:text-white flex items-center transition duration-200 group"
                  >
                    <FaChevronRight className="w-3 h-3 mr-2 text-teal-500 opacity-0 group-hover:opacity-100 transition duration-200" />
                    <span className="group-hover:translate-x-1 transition duration-200">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-3">
              {['Blog', 'FAQs', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(' ', '-').replace('&', 'and')}`} 
                    className="text-gray-300 hover:text-white flex items-center transition duration-200 group"
                  >
                    <FaChevronRight className="w-3 h-3 mr-2 text-blue-400 opacity-0 group-hover:opacity-100 transition duration-200" />
                    <span className="group-hover:translate-x-1 transition duration-200">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact/Social */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
                Contact Us
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500"></span>
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-purple-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@educeylon.com</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-purple-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+94 76 123 4567</span>
                </li>
              </ul>
            </div>

            {/* Social Icons for desktop */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
                Follow Us
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500"></span>
              </h3>
              <div className="flex space-x-3">
                {[
                  { icon: <FaFacebookF className="w-4 h-4" />, color: 'bg-blue-600 hover:bg-blue-700' },
                  { icon: <FaInstagram className="w-4 h-4" />, color: 'bg-pink-600 hover:bg-pink-700' },
                  { icon: <FaTwitter className="w-4 h-4" />, color: 'bg-sky-500 hover:bg-sky-600' },
                  { icon: <FaYoutube className="w-4 h-4" />, color: 'bg-red-600 hover:bg-red-700' }
                ].map((social, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className={`${social.color} text-white p-3 rounded-full transition duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EduCeylon. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-200">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-200">Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}