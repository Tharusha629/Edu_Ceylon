import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Learning_add() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    formData.append('email', userEmail);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:8085/api/recipes/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Content submitted successfully!');
      setTitle('');
      setIngredients('');
      setInstructions('');
      setImage(null);
      navigate('/Learning_Home');
    } catch (error) {
      console.error('Error response:', error.response);
      alert('Failed to submit content: ' + (error.response?.data || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.match('image.*')) {
        setImage(file);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Floating decorative elements */}
        <div className="fixed top-20 left-10 w-32 h-32 rounded-full bg-indigo-200 opacity-20 blur-xl animate-float"></div>
        <div className="fixed bottom-20 right-10 w-40 h-40 rounded-full bg-purple-200 opacity-20 blur-xl animate-float animation-delay-2000"></div>
        
        <div className="relative z-10 transform transition-all duration-500 hover:scale-[1.005]">
          {/* Card with subtle 3D effect */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-100 before:to-purple-100 before:opacity-30 before:-z-10">
            {/* Header with animated gradient */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-95"></div>
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-purple-500 opacity-20 animate-pulse-slow"></div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-indigo-400 opacity-30 animate-pulse-slower"></div>
              <div className="relative z-10 p-8 text-white">
                <h1 className="text-3xl font-bold tracking-tight">Share Your Knowledge</h1>
                <p className="opacity-90 mt-2 text-indigo-100">Contribute to our learning community</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
              </div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Title */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400 bg-white/80 backdrop-blur-sm"
                    placeholder="e.g., Introduction to Quantum Physics"
                    required 
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Key Topics */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Key Topics / Concepts <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                  <textarea 
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400 bg-white/80 backdrop-blur-sm"
                    placeholder="List important topics or concepts, separated by commas"
                    rows="3"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-start pr-3 pt-3 pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 italic">Example: Variables, Functions, Loops, Conditionals</p>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Detailed Content <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                  <textarea 
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400 bg-white/80 backdrop-blur-sm"
                    placeholder="Provide detailed explanation, examples, or lesson plan"
                    rows="6"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-start pr-3 pt-3 pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Supporting Image
                </label>
                <div 
                  className={`relative group ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <label className={`flex flex-col w-full border-2 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-dashed border-gray-300'} rounded-xl cursor-pointer transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50 overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    <div className="flex flex-col items-center justify-center pt-8 pb-6 px-4 relative z-10">
                      {image ? (
                        <div className="text-center space-y-2">
                          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center shadow-inner">
                            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-sm text-indigo-600 font-medium truncate max-w-xs">{image.name}</p>
                          <p className="text-xs text-gray-500 mt-1">Click to change or drag a new image</p>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 mb-3 bg-indigo-100 rounded-full flex items-center justify-center shadow-inner">
                            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4/5 h-1 bg-indigo-200 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg relative overflow-hidden
                    ${isSubmitting 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-0.5'}
                    flex items-center justify-center space-x-2`}
                >
                  <span className="relative z-10 flex items-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        <span>Submit Content</span>
                      </>
                    )}
                  </span>
                  {!isSubmitting && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Back link */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/Learning_Home')}
              className="group text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center justify-center mx-auto transition-colors duration-200 relative"
            >
              <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="relative">
                <span className="block">Back to Learning Hub</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Add these styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.3; }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slow 10s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}