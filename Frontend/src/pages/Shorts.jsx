import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Shorts() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8085/learn');
      setRecipes(response.data);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to load videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getMimeTypeFromExtension = (videoPath) => {
    if (!videoPath) return 'video/mp4'; // default
    
    const ext = videoPath.split('.').pop().toLowerCase();
    const mimeTypes = {
      mp4: 'video/mp4',
      webm: 'video/webm',
      ogg: 'video/ogg',
      mov: 'video/quicktime',
      avi: 'video/x-msvideo',
      mkv: 'video/x-matroska'
    };
    return mimeTypes[ext] || 'video/mp4';
  };

  const getVideoUrl = (videoPath) => {
    if (!videoPath) return null;
    
    // Check if URL is already absolute
    if (videoPath.startsWith('http')) return videoPath;
    
    // Handle potential double slashes
    const baseUrl = 'http://localhost:8085'.replace(/\/$/, '');
    const path = videoPath.replace(/^\//, '');
    
    return `${baseUrl}/${path}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
        <button 
          onClick={fetchRecipes}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white p-3 rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              StudySnap Shorts
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bite-sized learning videos to boost your knowledge
          </p>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No content available</p>
            <button 
              onClick={fetchRecipes}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => {
              const videoUrl = getVideoUrl(recipe.videoPath);
              const mimeType = getMimeTypeFromExtension(recipe.videoPath);
              
              return (
                <div key={recipe.id || recipe._id || Math.random()} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
                  <div className="relative aspect-video bg-black">
                    {videoUrl ? (
                      <div className="h-full w-full">
                        <video
                          controls
                          className="w-full h-full object-cover"
                          playsInline
                          preload="metadata"
                          poster={recipe.thumbnail || ''}
                        >
                          <source
                            src={videoUrl}
                            type={mimeType}
                            onError={(e) => {
                              console.error('Video load error:', e);
                              const container = e.target.closest('.relative');
                              if (container) {
                                container.innerHTML = `
                                  <div class="h-full w-full flex items-center justify-center bg-gray-200">
                                    <p class="text-gray-500">Video unavailable</p>
                                  </div>
                                `;
                              }
                            }}
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200">
                        <p className="text-gray-500">No video available</p>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{recipe.recipeName || 'Untitled Video'}</h3>
                    <p className="text-gray-600 mb-4">{recipe.description || 'No description available'}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{recipe.duration || '--:--'}</span>
                      <span>{recipe.category || 'General'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}