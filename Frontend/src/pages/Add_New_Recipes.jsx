import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Add_New_Recipes() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQty, setIngredientQty] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [methodSteps, setMethodSteps] = useState(['']);
  const [videoFile, setVideoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const addIngredient = () => {
    if (ingredientName && ingredientQty) {
      setIngredients([...ingredients, `${ingredientQty} ${ingredientName}`]);
      setIngredientName('');
      setIngredientQty('');
    }
  };

  const addMethodStep = (index, value) => {
    const updatedSteps = [...methodSteps];
    updatedSteps[index] = value;
    setMethodSteps(updatedSteps);
  };

  const addNewStep = () => {
    setMethodSteps([...methodSteps, '']);
  };

  const removeStep = (index) => {
    if (methodSteps.length > 1) {
      const updatedSteps = methodSteps.filter((_, i) => i !== index);
      setMethodSteps(updatedSteps);
    }
  };

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleVideoUpload = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!recipeName || ingredients.length === 0 || methodSteps.some(step => !step.trim())) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('recipeName', recipeName);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('methodSteps', JSON.stringify(methodSteps));
    if (videoFile) formData.append('video', videoFile);

    try {
      const response = await axios.post('http://localhost:8085/learn/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Lesson added successfully!');
        setRecipeName('');
        setIngredients([]);
        setMethodSteps(['']);
        setVideoFile(null);
      }
    } catch (err) {
      console.error("Error:", err);
      alert('Failed to add lesson. ' + (err.response?.data || 'Please try again later.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewRecipe = () => {
    navigate('/View_Learn_Recipe');
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-blue-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-5">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Create New Learning Lesson</h1>
                <p className="text-blue-100 text-sm mt-1">Share your knowledge with the community</p>
              </div>
              <button
                onClick={handleViewRecipe}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30 hover:shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" />
                  <path fillRule="evenodd" d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
                </svg>
                View Lessons
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-8">
            {/* Lesson Title */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Lesson Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Introduction to React Hooks"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Key Concepts */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Key Concepts <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Concept (e.g. useState)"
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                    className="w-full px-4 py-2 pl-8 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Description (e.g. State management hook)"
                    value={ingredientQty}
                    onChange={(e) => setIngredientQty(e.target.value)}
                    className="w-full px-4 py-2 pl-8 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <button
                  onClick={addIngredient}
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add
                </button>
              </div>
              
              {/* Concepts List */}
              {ingredients.length > 0 && (
                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 overflow-hidden">
                  {ingredients.map((ing, index) => (
                    <div key={index} className="flex justify-between items-center px-4 py-3 hover:bg-blue-50 transition-colors">
                      <div className="flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-3 px-2.5 py-0.5 rounded-full">
                          {index + 1}
                        </span>
                        <span className="text-gray-800">{ing}</span>
                      </div>
                      <button
                        onClick={() => removeIngredient(index)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Step-by-Step Content */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Step-by-Step Content <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {methodSteps.map((step, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-800 font-medium mt-1 flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1 relative">
                      <textarea
                        placeholder={`Describe step ${index + 1} in detail`}
                        value={step}
                        onChange={(e) => addMethodStep(index, e.target.value)}
                        rows="2"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {methodSteps.length > 1 && (
                      <button
                        onClick={() => removeStep(index)}
                        className="text-red-500 hover:text-red-700 transition-colors mt-1 p-1 rounded-full hover:bg-red-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addNewStep}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium pl-14"
                >
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Add another step
                </button>
              </div>
            </div>

            {/* Video Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Upload Demonstration Video (Optional)
              </label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full max-w-xs border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <span className="mt-2 text-sm text-gray-600 group-hover:text-blue-600">
                    {videoFile ? videoFile.name : 'Click to select video'}
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>
                {videoFile && (
                  <button
                    onClick={() => setVideoFile(null)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 pl-2">MP4, MOV or AVI. Max 30MB.</p>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex items-center gap-3 px-8 py-3 rounded-lg font-medium text-white transition-all ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Publish Lesson
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}