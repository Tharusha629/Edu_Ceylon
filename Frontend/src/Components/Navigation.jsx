import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Navigation() {
  const [profileImage, setProfileImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      axios.get(`http://localhost:8085/api/users/${email}`)
        .then(res => {
          if (res.data.profileImage) {
            setProfileImage(`http://localhost:8085/${res.data.profileImage}`);
          }
        })
        .catch(err => {
          console.error("Failed to fetch profile image:", err);
        });
    }
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with book icon */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-2xl font-black tracking-wide text-blue-600">
                Edu<span className="text-gray-800">Ceylon</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-1 py-2 text-sm font-medium relative group transition-colors duration-300"
              >
                Home
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/Shorts"
                className="text-gray-700 hover:text-red-500 px-1 py-2 text-sm font-medium relative group transition-colors duration-300"
              >
                Shorts
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/notifications"
                className="text-gray-700 hover:text-yellow-500 px-1 py-2 text-sm font-medium relative group transition-colors duration-300"
              >
                Notifications
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/Learning_Home"
                className="text-gray-700 hover:text-green-600 px-1 py-2 text-sm font-medium relative group transition-colors duration-300"
              >
                Learning Plans
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/Progress"
                className="text-gray-700 hover:text-orange-400 px-1 py-2 text-sm font-medium relative group transition-colors duration-300"
              >
                Progress
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                to="/About_us"
                className="text-gray-700 hover:text-purple-600 px-1 py-2 text-sm font-medium relative group transition-colors duration-300"
              >
                About Us
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {profileImage ? (
              <Link to="/Userprofile" className="ml-4">
                <div className="relative group">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 hover:border-red-500 transition-all duration-300"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                    <span className="block h-2 w-2 bg-green-500 rounded-full"></span>
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                to="/sign"
                className="ml-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 text-sm font-medium flex items-center"
              >
                Sign In
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {profileImage && (
              <Link to="/Userprofile" className="mr-4">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                />
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/Shorts"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-500 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Shorts
            </Link>
            <Link
              to="/notifications"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Notifications
            </Link>
            <Link
              to="/Learning_Home"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Learning Plans
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Progress
            </Link>
            <Link
              to="/About_us"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            {!profileImage && (
              <Link
                to="/sign"
                className="block w-full text-center bg-blue-500 text-white px-5 py-2 rounded-md shadow hover:bg-blue-600 transition duration-300 text-base font-medium mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}