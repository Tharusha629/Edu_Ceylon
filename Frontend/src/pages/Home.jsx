import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import gggImage from '../images/ggg.jpg';

export default function Home() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const name = email ? email.split("@")[0] : "User";

  const [posts, setPosts] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8085/api/posts/all");
        setPosts(res.data.reverse()); // show newest first
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchAllRecipes = async () => {
      try {
        const res = await axios.get('http://localhost:8085/api/recipes/all');
        setAllRecipes(res.data.reverse()); // newest first
      } catch (error) {
        console.error('Error fetching all recipes:', error);
      }
    };

    fetchPosts();
    fetchAllRecipes();
  }, [email]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/Login');
  };

  const handleLikePost = async (postId) => {
    try {
      const res = await axios.put(`http://localhost:8085/api/posts/like/${postId}`, null, {
        params: { userEmail: email },
      });
      const updatedPost = res.data;
  
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const handleCommentPost = (postId, comment) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      )
    );
  };

  const handleLikeRecipe = (recipeId) => {
    setAllRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe._id === recipeId ? { ...recipe, likes: (recipe.likes || 0) + 1 } : recipe
      )
    );
  };

  const handleCommentRecipe = (recipeId, comment) => {
    setAllRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe._id === recipeId ? { ...recipe, comments: [...(recipe.comments || []), comment] } : recipe
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 font-sans antialiased">
 {/* Navbar */}
<nav className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-xl">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-20">
      {/* Empty div to push content to center and right */}
      <div className="flex-1"></div>
      
      {/* Welcome message - centered */}
      <div className="flex-1 flex justify-center">
        {email && (
          <span className="text-lg font-medium text-white/90 hover:text-white transition">
            Welcome back, <span className="font-bold">{name}</span>!
          </span>
        )}
      </div>
      
      {/* Logout/Login button - right aligned */}
      <div className="flex-1 flex justify-end">
        {email ? (
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm hover:bg-white/20 hover:shadow-md transition-all duration-200 flex items-center space-x-2"
          >
            <span>Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
          </button>
        ) : (
          <Link 
            to="/Login" 
            className="px-6 py-2.5 rounded-full bg-white text-blue-600 font-medium shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center space-x-2"
          >
            <span>Login</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  </div>
</nav>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${gggImage})`,
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Animated floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: Math.random() * 10 + 5 + 'px',
                height: Math.random() * 10 + 5 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, (Math.random() - 0.5) * 100],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <motion.div 
          className="relative z-10 text-center px-6 w-full max-w-6xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tight"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
              EduCeylon
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Revolutionizing education through collaborative learning, skill sharing, and community growth.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <Link
              to="/Shorts"
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-700 group shadow-lg hover:shadow-xl"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                Shorts
              </span>
            </Link>
            <Link
              to="/Learning_Home"
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 bg-green-500 rounded-full hover:bg-green-600 group shadow-lg hover:shadow-xl"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                Learning Plans
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <svg className="w-8 h-8 text-white hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full opacity-10 blur-3xl"></div>
        
        <motion.div 
          className="max-w-7xl mx-auto px-6 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">Why Choose Us</span>
              <motion.h2 
                className="text-3xl md:text-5xl font-bold text-gray-900 mt-3 mb-6"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Transform Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">Learning Experience</span>
              </motion.h2>
              <motion.div 
                className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <motion.div 
              whileHover={{ y: -10 }}
              className="group p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-100 opacity-10"></div>
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 text-2xl transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Certification</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn recognized certifications that validate your skills and knowledge, helping you stand out in the competitive job market.
              </p>
              <div className="mt-6">
                <Link to="/certification" className="text-blue-600 font-medium inline-flex items-center group-hover:underline">
                  Learn more
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="group p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-green-100 opacity-10"></div>
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-2xl bg-gradient-to-br from-green-100 to-green-50 text-green-600 text-2xl transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Skill Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Access curated learning paths and expert-led courses to develop both technical and soft skills for comprehensive growth.
              </p>
              <div className="mt-6">
                <Link to="/skills" className="text-green-600 font-medium inline-flex items-center group-hover:underline">
                  Explore skills
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="group p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-purple-100 opacity-10"></div>
              <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 text-2xl transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Career Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with industry professionals and access career resources to accelerate your professional journey.
              </p>
              <div className="mt-6">
                <Link to="/careers" className="text-purple-600 font-medium inline-flex items-center group-hover:underline">
                  Career paths
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Community Content Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">🔥 Community Content</h3>

        {posts.length === 0 && allRecipes.length === 0 ? (
          <p className="text-lg text-gray-500 text-center bg-gray-200 p-6 rounded-xl shadow-inner">
            No content available yet. Be the first to contribute!
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-2xl shadow-xl p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform hover:shadow-lg"
                whileHover={{ y: -5 }}
              >
                {post.imageUrls && post.imageUrls.length > 0 && (
                  <img
                    src={post.imageUrls[0]}
                    alt="Post"
                    className="rounded-xl mb-4 h-52 w-full object-cover shadow-sm"
                  />
                )}
                <h4 className="text-xl font-semibold text-gray-900 mb-1">
                  {post.email?.split('@')[0]}'s Post
                </h4>
                <p className="text-sm text-gray-700 mb-4">{post.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                  <span>❤️ {post.likes || 0} Likes • 💬 {(post.comments || []).length} Comments</span>
                </div>

                <div className="flex gap-4 mt-4 justify-center">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="text-blue-500 hover:underline font-medium"
                  >
                    👍 Like
                  </button>
                  <button
                    onClick={() => handleCommentPost(post.id, 'Nice post!')}
                    className="text-green-500 hover:underline font-medium"
                  >
                    💬 Comment
                  </button>
                </div>
              </motion.div>
            ))}

            {allRecipes.map((recipe) => (
              <motion.div 
                key={recipe._id} 
                className="bg-white rounded-lg shadow-lg p-6 transition transform hover:scale-105"
                whileHover={{ y: -5 }}
              >
                {recipe.imageUrl && (
                  <img
                    src={`http://localhost:8085${recipe.imageUrl}`}
                    alt={recipe.title}
                    className="rounded-md mb-4 h-48 w-full object-cover"
                  />
                )}
                <p className="text-sm text-gray-500 mb-1">
                📚 <span className="italic">{recipe.email?.split('@')[0]}'s Lesson</span>
                </p>
                <h4 className="text-lg font-semibold text-green-500 mb-3">{recipe.title}</h4>
                <h5 className="text-md font-medium text-gray-700 mb-2">Concepts:</h5>
                <p className="text-gray-600 mb-3">{recipe.ingredients}</p>

                <h5 className="text-md font-medium text-gray-700 mb-2">Instructions:</h5>
                <p className="text-gray-600 mb-4">{recipe.instructions}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>❤️ {recipe.likes || 0} Likes • 💬 {(recipe.comments || []).length} Comments</span>
                </div>

                <div className="flex gap-4 mt-4 justify-center">
                  <button
                    onClick={() => handleLikeRecipe(recipe._id)}
                    className="text-green-500 hover:underline"
                  >
                    Like
                  </button>
                  <button
                    onClick={() => handleCommentRecipe(recipe._id, "Looks great!")}
                    className="text-blue-500 hover:underline"
                  >
                    Comment
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Learners</div>
            </motion.div>
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Courses Available</div>
            </motion.div>
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">200+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </motion.div>
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-4xl font-bold text-yellow-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial/CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-green-500 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Learning Community</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Thousands of learners are already transforming their lives with EduCeylon. Be part of the education revolution today.
            </p>
            <Link
              to={email ? "/posts" : "/register"}
              className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {email ? "Explore Content" : "Get Started Now"}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}