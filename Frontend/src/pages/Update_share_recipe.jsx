import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Update_share_recipe() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(state.recipe.title);
  const [ingredients, setIngredients] = useState(state.recipe.ingredients);
  const [instructions, setInstructions] = useState(state.recipe.instructions);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(state.recipe.imageUrl || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    if (image) formData.append("image", image);

    try {
      await axios.put(`http://localhost:8085/api/recipes/${state.recipe.id}`, formData);
      setTimeout(() => {
        alert("Recipe updated successfully!");
        navigate('/Learnig_share_recipe');
      }, 1500);
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update recipe");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 transform transition-all hover:scale-[1.01]">
          <div className="inline-flex items-center justify-center mb-6 animate-bounce">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 sm:text-5xl mb-4">
          Update Your Lesson
          </h1>
          <p className="mt-4 text-lg text-blue-600/90 max-w-2xl mx-auto">
          Refine your educational content with the latest updates, insights, and improvements.
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-blue-100/50 transform transition-all hover:shadow-3xl">
          <div className="p-8 sm:p-10">
            <div className="space-y-8">
              {/* Title*/}
              <div className="space-y-3">
                <label htmlFor="title" className="block text-lg font-semibold text-blue-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-5 py-4 text-lg border-2 border-blue-100 rounded-xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 transition duration-300 placeholder-blue-300/70 shadow-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your recipe title"
                />
              </div>

              {/* Key Topics / Concepts */}
              <div className="space-y-3">
                <label htmlFor="ingredients" className="block text-lg font-semibold text-blue-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Key Topics / Concepts
                </label>
                <textarea
                  id="ingredients"
                  rows={5}
                  className="w-full px-5 py-4 text-lg border-2 border-blue-100 rounded-xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 transition duration-300 placeholder-blue-300/70 shadow-sm"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="List all ingredients needed for this recipe"
                />
                <p className="text-sm text-blue-400/80 italic">Separate key concepts or terms using commas or bullet points for better clarity</p>
              </div>

              {/* Detailed Content */}
              <div className="space-y-3">
                <label htmlFor="instructions" className="block text-lg font-semibold text-blue-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Detailed Content
                </label>
                <textarea
                  id="instructions"
                  rows={8}
                  className="w-full px-5 py-4 text-lg border-2 border-blue-100 rounded-xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 transition duration-300 placeholder-blue-300/70 shadow-sm"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Provide step-by-step cooking instructions"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-5">
                <label className="block text-lg font-semibold text-blue-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Supporting Image
                </label>
                
                {imagePreview && (
                  <div className="w-full h-72 rounded-xl overflow-hidden border-2 border-blue-100/50 shadow-md transition-all duration-300 hover:shadow-lg">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="cursor-pointer flex-1 w-full group">
                    <div className="inline-flex items-center justify-center px-6 py-4 border-2 border-dashed border-blue-200 rounded-xl shadow-sm text-lg font-medium text-blue-600 bg-blue-50/50 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100/30 transition duration-300 w-full group-hover:border-blue-300 group-active:scale-95">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      {image ? 'Change Image' : 'Upload Image'}
                    </div>
                    <input
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                  {imagePreview && (
                    <button
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="px-5 py-3.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition duration-300 flex items-center justify-center sm:w-auto w-full active:scale-95"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-sm text-blue-400/80 italic">Recommended size: 1200x600 pixels (optional)</p>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  onClick={handleUpdate}
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-5 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:ring-opacity-50 transition duration-300 transform hover:scale-[1.01] active:scale-[0.98] ${isSubmitting ? 'opacity-90 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating Lesson...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      Update Lesson
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating decoration elements */}
        <div className="fixed top-20 left-10 w-32 h-32 rounded-full bg-blue-200/20 blur-3xl -z-10"></div>
        <div className="fixed bottom-20 right-10 w-40 h-40 rounded-full bg-indigo-200/20 blur-3xl -z-10"></div>
      </div>
    </div>
  );
}