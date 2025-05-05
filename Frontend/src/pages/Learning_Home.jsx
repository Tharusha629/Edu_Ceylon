import React from 'react';
import { FaBookOpen, FaPlusCircle, FaEye, FaGraduationCap, FaUsers, FaChartLine, FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Learning_Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="relative">
              <FaBookOpen className="text-5xl md:text-6xl text-blue-600 z-10 relative" />
              <div className="absolute -inset-3 bg-blue-200 rounded-full opacity-75 blur-sm"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-800 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Learning Hub
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore structured step-by-step lessons, share your knowledge, and grow your academic skills through our engaging and interactive platform. 🚀
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Learn Section */}
          <Link to="/Learn_New_Recipes" className="group">
            <div className="h-full bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border border-transparent hover:border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                  <FaBookOpen className="text-4xl text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  Learn with Ease
                </h2>
                <p className="text-gray-600 mb-2">
                  Access step-by-step guides and video lessons to master subjects from across the educational world.
                </p>
                <span className="mt-4 inline-block text-blue-500 font-medium group-hover:text-blue-600 transition-colors duration-300">
                  Explore Lessons →
                </span>
              </div>
            </div>
          </Link>

          {/* Share Knowledge */}
          <Link to="/Learning_add" className="group">
            <div className="h-full bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border border-transparent hover:border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400"></div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors duration-300">
                  <FaPlusCircle className="text-4xl text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  Share Your Knowledge
                </h2>
                <p className="text-gray-600 mb-2">
                  Submit your best learning resources, tips, or study techniques to inspire other learners.
                </p>
                <span className="mt-4 inline-block text-indigo-500 font-medium group-hover:text-indigo-600 transition-colors duration-300">
                  Contribute Now →
                </span>
              </div>
            </div>
          </Link>

          {/* View My Share */}
          <Link to="/Learnig_share_recipe" className="group">
            <div className="h-full bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border border-transparent hover:border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-teal-400"></div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-cyan-100 rounded-full group-hover:bg-cyan-200 transition-colors duration-300">
                  <FaEye className="text-4xl text-cyan-600 group-hover:text-cyan-700 transition-colors duration-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-cyan-600 transition-colors duration-300">
                View My Share
                </h2>
                <p className="text-gray-600 mb-2">
                  Browse all the learning materials you've shared and see engagement with your content.
                </p>
                <span className="mt-4 inline-block text-cyan-500 font-medium group-hover:text-cyan-600 transition-colors duration-300">
                  Your Content →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Extra Info Section */}
        <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-inner border border-blue-100">
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Why Join Our Learning Hub?
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <FaLightbulb className="text-xl" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Interactive Learning</h4>
                <p className="text-gray-600">
                  Boost your learning confidence with hands-on courses and practical exercises.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                  <FaUsers className="text-xl" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Vibrant Community</h4>
                <p className="text-gray-600">
                  Connect with passionate learners and educators from around the world.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-cyan-100 p-3 rounded-full text-cyan-600">
                  <FaChartLine className="text-xl" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Progress Tracking</h4>
                <p className="text-gray-600">
                  Monitor your learning journey with personalized dashboards and analytics.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                  <FaGraduationCap className="text-xl" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Knowledge Sharing</h4>
                <p className="text-gray-600">
                  Contribute your expertise and help shape the learning experience for others.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-bounce-slow">
          <Link to="/Learn_New_Recipes">
            <button className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-full group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="relative z-10 flex items-center gap-2">
                <FaBookOpen className="text-lg" />
                Start Learning Now
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            </button>
          </Link>
          <p className="mt-4 text-gray-600">
            Join thousands of learners already improving their skills
          </p>
        </div>
      </div>
    </div>
  );
}