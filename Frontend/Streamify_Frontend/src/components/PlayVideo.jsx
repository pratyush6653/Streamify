import React, { useState, useEffect } from 'react';

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log('Fetching videos...');
        const response = await fetch('http://localhost:9000/api/v1/videos');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw video data:', data); // Log the raw data
        
        // Ensure data is an array
        setVideos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Failed to fetch videos. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div className="text-center text-white p-4">Loading videos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (!videos || videos.length === 0) {
    return <div className="text-center text-white p-4">No videos found</div>;
  }

  return (
    <div className="p-6 bg-[#002244] min-h-screen">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Video Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => {
          console.log('Rendering video:', video);

          // Ensure video has a valid ID
          const videoId = video.videoId; // Use video.videoId

          // If the video ID is not present, skip rendering that video
          if (!videoId) {
            console.warn('Video ID not found for video:', video);
            return null;
          }

          // Construct the streaming URL
          const videoUrl = `http://localhost:9000/api/v1/videos/stream/id/${videoId}`;
          console.log('Video URL:', videoUrl);

          return (
            <div key={videoId} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-2">
                {video.title || 'Untitled Video'}
              </h2>
              <p className="text-sm text-white/80 mb-4">
                {video.description || 'No description available'}
              </p>
              <div className="relative">
                <video
                  controls
                  className="w-full rounded-lg"
                  src={videoUrl}
                  onError={(e) => {
                    console.error("Failed to load video:", e);
                    setError("Error loading video. Please try again later.");
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VideoList;