import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaPenAlt, FaTimes, FaTrash, FaCloudUploadAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Post_add() {
  const email = localStorage.getItem("userEmail");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).slice(0, 3);
      setImages(files);
      setPreview(files.map(file => URL.createObjectURL(file)));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImages(files);
    setPreview(files.map(file => URL.createObjectURL(file)));
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreview = [...preview];
    newImages.splice(index, 1);
    newPreview.splice(index, 1);
    setImages(newImages);
    setPreview(newPreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (images.length > 3) {
      alert("Only up to 3 images allowed.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("description", description);
    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await axios.post("http://localhost:8085/api/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("Response:", res.data);
      
      // Success animation
      setTimeout(() => {
        setDescription("");
        setImages([]);
        setPreview([]);
        navigate('/Userprofile');
      }, 1500);
    } catch (error) {
      console.error("Error Details:", error.response || error.message);
      alert("Post creation failed: " + (error.response?.data || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Share Your Creativity</h2>
          <p className="text-sm mt-2 opacity-90">Let the world see your life 🌍</p>
        </div>

        <div className="px-6 py-8">
          <div className="mb-6 text-center">
            <p className="text-gray-700 text-sm">Posting as 
              <span className="font-semibold text-blue-600 ml-1">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Description Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <FaPenAlt className="text-blue-500" />
                Description
              </label>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                rows="5"
                placeholder="What's on your mind? Describe your creation..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <FaImage className="text-blue-500" />
                Upload Images (Max 3)
              </label>
              
              <div 
                className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-blue-300 bg-blue-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full opacity-0 absolute h-full cursor-pointer"
                  id="imageUpload"
                />
                <label 
                  htmlFor="imageUpload"
                  className="block w-full p-8 text-center cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <FaCloudUploadAlt className="text-blue-400 text-4xl" />
                    <p className="text-blue-600 font-medium">
                      {dragActive ? "Drop images here" : "Click to select or drag & drop"}
                    </p>
                    <p className="text-xs text-gray-500">
                      JPEG, PNG (Max 3 images, 5MB each)
                    </p>
                  </div>
                </label>
              </div>
              {images.length > 3 && (
                <p className="text-red-500 text-sm mt-1">Only up to 3 images allowed</p>
              )}
            </div>

            {/* Preview Section */}
            {preview.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-3"
              >
                <p className="text-sm text-gray-600 font-medium">Image Preview:</p>
                <div className="flex gap-4 flex-wrap">
                  {preview.map((src, index) => (
                    <motion.div 
                      key={index}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative group"
                    >
                      <div className="w-32 h-32 rounded-lg overflow-hidden shadow-md border border-gray-200">
                        <img
                          src={src}
                          alt="preview"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                        aria-label="Remove image"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {preview.length}/3 images selected • Click on <FaTrash className="inline text-red-500" /> to remove
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-sm flex items-center justify-center ${
                  isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Your Post...
                  </>
                ) : (
                  <span className="flex items-center">
                    <FaPenAlt className="mr-2" />
                    Create Post
                  </span>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}