import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Update_Learn_Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    recipeName: '',
    ingredients: [],
    methodSteps: [],
    videoPath: ''
  });
  const [newVideo, setNewVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:8085/learn`);
        const target = res.data.find(r => r.id === id);
        if (target) {
          setRecipe(target);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to fetch recipe');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, value, field) => {
    const updated = [...recipe[field]];
    updated[index] = value;
    setRecipe({ ...recipe, [field]: updated });
  };

  const addArrayItem = (field) => {
    setRecipe({ ...recipe, [field]: [...recipe[field], ''] });
  };

  const removeArrayItem = (index, field) => {
    const updated = recipe[field].filter((_, i) => i !== index);
    setRecipe({ ...recipe, [field]: updated });
  };

  const handleVideoChange = (e) => {
    setNewVideo(e.target.files[0]);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('recipeName', recipe.recipeName);
    formData.append('ingredients', JSON.stringify(recipe.ingredients));
    formData.append('methodSteps', JSON.stringify(recipe.methodSteps));

    if (newVideo) {
      formData.append('video', newVideo);
    } else {
      formData.append('videoPath', recipe.videoPath);
    }

    try {
      await axios.put(`http://localhost:8085/learn/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/View_Learn_Recipe', { state: { success: 'Lesson updated successfully!' } });
    } catch (err) {
      console.error('Error updating recipe:', err);
      setError('Failed to update lesson');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/View_Learn_Recipe')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-2">Update Lesson</h1>
          <p className="text-lg text-blue-600">Edit your lesson details below</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-8 mb-10">
          <div className="mb-8">
            <label className="block text-lg font-medium text-blue-600 mb-3">Lesson Title</label>
            <input
              name="recipeName"
              value={recipe.recipeName}
              onChange={handleChange}
              className="w-full px-5 py-3 text-lg border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Enter lesson title"
            />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-lg font-medium text-blue-600">Key Concepts</label>
              <button
                type="button"
                onClick={() => addArrayItem('ingredients')}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200 transition duration-200 text-sm font-medium"
              >
                + Add Concept
              </button>
            </div>
            {recipe.ingredients.map((ing, i) => (
              <div key={i} className="flex items-center mb-3">
                <input
                  value={ing}
                  onChange={(e) => handleArrayChange(i, e.target.value, 'ingredients')}
                  className="flex-1 px-5 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  placeholder={`Concept ${i + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(i, 'ingredients')}
                  className="ml-3 text-red-500 hover:text-red-700 transition duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-lg font-medium text-blue-600">Step-by-Step Learning</label>
              <button
                type="button"
                onClick={() => addArrayItem('methodSteps')}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200 transition duration-200 text-sm font-medium"
              >
                + Add Step
              </button>
            </div>
            {recipe.methodSteps.map((step, i) => (
              <div key={i} className="flex items-center mb-3">
                <div className="flex-shrink-0 bg-blue-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  {i + 1}
                </div>
                <input
                  value={step}
                  onChange={(e) => handleArrayChange(i, e.target.value, 'methodSteps')}
                  className="flex-1 px-5 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                  placeholder={`Describe step ${i + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(i, 'methodSteps')}
                  className="ml-3 text-red-500 hover:text-red-700 transition duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {recipe.videoPath && (
            <div className="mb-8 bg-blue-50 p-6 rounded-xl">
              <h4 className="text-lg font-medium text-blue-600 mb-4">Current Video</h4>
              <div className="relative pt-[56.25%] rounded-xl overflow-hidden bg-black shadow-lg">
                <video controls className="absolute inset-0 w-full h-full">
                  <source src={`http://localhost:8085${recipe.videoPath}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}

          <div className="mb-8">
            <label className="block text-lg font-medium text-blue-600 mb-3">Upload New Video (optional)</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full border-4 border-dashed border-blue-200 hover:border-blue-300 hover:bg-blue-50 rounded-2xl transition duration-200 cursor-pointer">
                <div className="flex flex-col items-center justify-center py-10 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-blue-600">
                    {newVideo ? newVideo.name : 'Click to select a video file (MP4)'}
                  </p>
                </div>
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={handleVideoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-center space-x-6 pt-6">
            <button
              onClick={() => navigate('/View_Learn_Recipe')}
              className="px-8 py-3 bg-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition duration-200 flex items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                'Update Lesson'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}