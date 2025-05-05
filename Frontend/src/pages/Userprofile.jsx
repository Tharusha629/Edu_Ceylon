import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function UserProfile() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const name = email ? email.split("@")[0] : "User";
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300?img=3");
  const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ followers: 124, following: 89 });
  const [activeTab, setActiveTab] = useState('posts');
  const profileImageInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  useEffect(() => {
    if (email) {
      setIsLoading(true);
      
      // Simulate API loading with timeout
      const loadingTimer = setTimeout(() => {
        axios.get(`http://localhost:8085/api/users/${email}`)
          .then(res => {
            if (res.data.profileImage) {
              setProfileImage(`http://localhost:8085/${res.data.profileImage}`);
            }
            if (res.data.coverImage) {
              setCoverImage(`http://localhost:8085/${res.data.coverImage}`);
            }
          })
          .catch(err => console.error("Error fetching user:", err));

        axios.get(`http://localhost:8085/api/posts/user?email=${email}`)
          .then(res => {
            setPosts(res.data);
            setIsLoading(false);
          })
          .catch(err => {
            console.error("Error fetching posts:", err);
            setIsLoading(false);
          });
      }, 1200);

      return () => clearTimeout(loadingTimer);
    }
  }, [email]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  const handleProfileImageClick = () => {
    profileImageInputRef.current.click();
  };

  const handleCoverImageClick = () => {
    coverImageInputRef.current.click();
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.put(`http://localhost:8085/api/users/upload/${email}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data.profileImage) {
          setProfileImage(`http://localhost:8085/api/users/images/${res.data.profileImage}`);
        }
      } catch (err) {
        console.error("Error uploading profile image:", err);
      }
    }
  };

  const handleCoverImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.put(`http://localhost:8085/api/users/uploadCover/${email}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data.coverImage) {
          setCoverImage(`http://localhost:8085/api/users/images/${res.data.coverImage}`);
        }
      } catch (err) {
        console.error("Error uploading cover image:", err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800 animate-pulse">Loading Culinary Journey</h2>
            <p className="text-gray-600">Preparing your delicious profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen py-10 px-4 sm:px-6">
      {/* Main Profile Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-white/20 backdrop-blur-sm bg-white/90 transform transition-all hover:shadow-2xl">
        
        {/* Floating Action Buttons - Glass Morphism */}
        <div className="absolute top-6 right-6 flex space-x-3 z-10">
          <button
            onClick={() => navigate("/settings")}
            className="bg-white/80 hover:bg-white backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg transition-all transform hover:scale-110 border border-white/30"
            title="Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Cover Photo with Parallax Effect */}
        <div className="relative h-96 bg-cover bg-center rounded-t-3xl overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
            onClick={handleCoverImageClick}
          >
            <div className="absolute bottom-6 right-6 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg cursor-pointer transition-all transform hover:scale-110 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-12 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="file"
              ref={coverImageInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleCoverImageChange}
            />
          </div>
          <img 
            src={coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info Section */}
        <div className="relative px-8 py-8 bg-white/95 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Profile Image with Floating Effect */}
            <div className="relative -mt-28 md:-mt-32 group">
              <div className="absolute inset-0 rounded-full border-4 border-white shadow-2xl transition-all duration-500 group-hover:border-indigo-300 animate-[pulse_3s_infinite]"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-200 to-purple-200 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <img
                src={profileImage}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover cursor-pointer transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-1"
                onClick={handleProfileImageClick}
              />
              <div 
                className="absolute bottom-3 right-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white p-3 rounded-full shadow-xl cursor-pointer transition-all transform hover:scale-110 group-hover:rotate-12"
                onClick={handleProfileImageClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              <input
                type="file"
                ref={profileImageInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </div>

            {/* User Details with Animated Elements */}
            <div className="mt-6 md:mt-0 md:ml-10 text-center md:text-left flex-1 animate-[fadeIn_1s_ease-in-out]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {name}
                  </h2>
                  <p className="text-gray-500 mt-2 flex items-center justify-center md:justify-start space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>San Francisco, CA</span>
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-full shadow-xl transition-all transform hover:scale-105 group">
                    <span className="relative z-10 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                      </svg>
                      Follow
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mt-4 max-w-lg text-center md:text-left leading-relaxed">
                Passionate chef creating culinary magic ✨ | Food photographer 📷 | Sharing my kitchen adventures and secret recipes with the world 🌍 #HomeChef #Foodie
              </p>

              {/* Stats with Hover Effects */}
              <div className="flex justify-center md:justify-start space-x-8 mt-6">
                {[
                  { value: posts.length, label: 'Posts', icon: '📝' },
                  { value: stats.followers, label: 'Followers', icon: '👥' },
                  { value: stats.following, label: 'Following', icon: '❤️' }
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className="text-center group cursor-default"
                    onMouseEnter={(e) => {
                      e.currentTarget.querySelector('.stat-value').classList.add('animate-bounce');
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.querySelector('.stat-value').classList.remove('animate-bounce');
                    }}
                  >
                    <p className="text-3xl font-bold text-gray-800 stat-value transition-all">
                      {stat.value}
                    </p>
                    <p className="text-gray-500 text-sm mt-1 flex items-center justify-center">
                      <span className="mr-1 group-hover:scale-110 transition-transform">{stat.icon}</span>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons with Glow Effect */}
          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10 mb-6">
            <button
              onClick={() => navigate("/Post_add")}
              className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 group"
            >
              <span className="relative z-10 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create New Post
              </span>
              <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></span>
            </button>
            <button
              onClick={() => navigate("/Post_views")}
              className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 group"
            >
              <span className="relative z-10 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                Explore Gallery
              </span>
              <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 px-8">
          <nav className="flex space-x-8">
            {['posts', 'recipes', 'saved', 'tagged'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 font-medium text-sm border-b-2 transition-all duration-300 ${activeTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Posts Section */}
        <div className="px-6 pb-12">
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group overflow-hidden relative"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-in-out forwards ${index * 0.1}s`
                  }}
                >
                  {/* Image Carousel */}
                  <div className="relative w-full h-64 mb-5 rounded-xl overflow-hidden">
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay, EffectFade]}
                      navigation
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3500, disableOnInteraction: false }}
                      effect={'fade'}
                      fadeEffect={{ crossFade: true }}
                      speed={800}
                      className="h-full"
                    >
                      {post.imageUrls.map((url, idx) => (
                        <SwiperSlide key={idx}>
                          <img
                            src={url}
                            alt="Post"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="absolute top-3 right-3 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur-sm">
                      {post.category || "Culinary"}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-2">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 leading-snug">
                      {post.description}
                    </h4>
                    
                    {/* Engagement Metrics */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-1 text-sm">{post.likes || 0}</span>
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-1 text-sm">{post.comments?.length || 0}</span>
                        </button>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    {/* Liked By */}
                    {post.likedBy && post.likedBy.length > 0 && (
                      <div className="mt-3 flex items-center">
                        <div className="flex -space-x-2 mr-2">
                          {post.likedBy.slice(0, 3).map((user, idx) => (
                            <div 
                              key={idx} 
                              className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white overflow-hidden"
                              style={{ zIndex: 3 - idx }}
                            >
                              <img 
                                src={`https://i.pravatar.cc/150?img=${idx + 1}`} 
                                alt="User" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {post.likedBy.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-xs font-medium text-indigo-800">
                              +{post.likedBy.length - 3}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          Liked by {post.likedBy[0].split('@')[0]} 
                          {post.likedBy.length > 1 ? ` and ${post.likedBy.length - 1} others` : ''}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Hover Effect Elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mx-auto w-32 h-32 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">Your Culinary Gallery Awaits</h4>
              <p className="text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
                Share your first masterpiece and inspire others with your unique culinary creations. Every great chef started somewhere!
              </p>
              <button
                onClick={() => navigate("/Post_add")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create Your First Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}