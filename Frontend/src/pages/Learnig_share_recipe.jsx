import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LearningShareRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, [userEmail]);

  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8085/api/recipes/user', {
        params: { email: userEmail }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(id);
    try {
      await axios.delete(`http://localhost:8085/api/recipes/${id}`);
      await fetchRecipes(); // Refresh list
    } catch (error) {
      console.error('Error deleting recipe:', error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleUpdate = (recipe) => {
    navigate('/Update_share_recipe', { state: { recipe } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="text-blue-600">My Shared</span> Lessons
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Manage and update all the learning materials you've shared with the community
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-md mx-auto">
            <div className="text-6xl mb-4 text-blue-400">📭</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Lessons Shared Yet</h3>
            <p className="text-gray-500 mb-6">Your shared lessons will appear here once you create them</p>
            <button
              onClick={() => navigate('/share_recipe')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Share Your First Lesson
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div 
                key={recipe._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-blue-50"
              >
                {recipe.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`http://localhost:8085${recipe.imageUrl}`}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{recipe.title}</h2>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-1">
                      Key Topics
                    </h3>
                    <p className="text-gray-600 line-clamp-3">{recipe.ingredients}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-1">
                      Detailed Content
                    </h3>
                    <p className="text-gray-600 line-clamp-4">{recipe.instructions}</p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleUpdate(recipe)}
                      className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(recipe.id)}
                      disabled={deleteLoading === recipe.id}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                    >
                      {deleteLoading === recipe.id ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}