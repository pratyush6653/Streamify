import React, { useState } from 'react';
import axios from 'axios'; // Import axios

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const [title, setTitle] = useState(''); // State to store the video title
  const [description, setDescription] = useState(''); // State to store the video description
  const [uploading, setUploading] = useState(false); // State to track upload progress
  const [error, setError] = useState(null); // State to handle errors
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress percentage
  const [uploadSuccess, setUploadSuccess] = useState(false); // State to track upload success

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Update state with the selected file
      console.log('Selected file:', file);
    }
  };

  // Function to reset everything
  const resetForm = () => {
    setSelectedFile(null); // Clear the selected file
    setTitle(''); // Clear the title input
    setDescription(''); // Clear the description input
    setError(null); // Clear any errors
    setUploadProgress(0); // Reset upload progress
    setUploadSuccess(false); // Reset upload success
  };

  // Function to remove the selected file
  const handleRemoveFile = () => {
    resetForm(); // Reset everything
  };

  // Function to upload the file to the Spring Boot API
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    if (!title || !description) {
      alert('Please provide a title and description for the video.');
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append('file', selectedFile); // Append the video file
    formData.append('title', title); // Append the title
    formData.append('description', description); // Append the description

    setUploading(true); // Start uploading
    setError(null); // Reset error state
    setUploadSuccess(false); // Reset upload success

    try {
      // Send the FormData to the backend using axios
      const response = await axios.post('http://localhost:9000/api/v1/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type
        },
        onUploadProgress: (progressEvent) => {
          // Calculate the upload progress percentage
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress); // Update the progress state
        },
      });

      console.log('Upload successful:', response.data);

      // Set upload success state
      setUploadSuccess(true);

      // Reset everything after successful upload
      setTimeout(() => {
        resetForm();
      }, 3000); // Reset the form after 3 seconds
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error.response?.data?.message || 'Failed to upload file. Please try again.');
    } finally {
      setUploading(false); // Stop uploading
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#002244]">
      {/* Upload Card */}
      <div className="max-w-md w-full p-6 rounded-lg shadow-xl border border-gray-200 bg-white/10 backdrop-blur-sm">
        {/* Gradient Text for Heading */}
        <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-white">
          Upload Your Video Here !
        </h2>
        

        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-white">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter video title"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-white">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
            placeholder="Enter video description"
            rows="2" // Set a fixed number of rows
/>
        </div>

        {/* File Input */}
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="video-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/30 rounded-lg cursor-pointer bg-white/10 hover:bg-white/20 transition-colors"
          >
            <div className="flex flex-col items-center justify-center">
              {/* Upload Icon */}
              <svg
                className="w-8 h-8 text-white mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                ></path>
              </svg>
              <p className="text-sm text-white/80">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-white/60">
                MP4, AVI, or MOV (max. 1000MB)
              </p>
            </div>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          
        </div>
        <p className="text-sm text-center text-white mb-6 pt-4">
          Please select a video file to upload. Supported formats: MP4, AVI, MOV, etc.
        </p>
        {/* Display Selected File Name with Remove Button */}
        {selectedFile && (
          <div className="mt-3 p-1 bg-white/10 rounded-lg flex items-center justify-between backdrop-blur-sm">
            <p className="text-sm text-white">
              {selectedFile.name}
            </p>
            <button
              onClick={handleRemoveFile}
              className="text-white/80 hover:text-red-400 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        )}

        {/* Upload Button or Progress Bar */}
        {uploading ? (
          <div className="w-full mt-6 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-gradient-to-r from-[#30cfd0] to-[#330867] h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        ) : uploadSuccess ? (
          <p className="mt-6 text-sm text-green-400 text-center">
            File uploaded successfully!
          </p>
        ) : (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full mt-6 px-4 py-2 bg-[#002244] text-white font-semibold rounded-lg 
             border-2 border-white/30 hover:border-white/50 
             shadow-[0_0_8px_2px_rgba(255,255,255,0.3)] hover:shadow-[0_0_12px_4px_rgba(255,255,255,0.5)]
             transition-all duration-50000 
             disabled:opacity-50 disabled:cursor-not-allowed"
>
  Upload
</button>
        )}

        {/* Display Error Message */}
        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default VideoUpload;