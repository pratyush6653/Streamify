import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import VideoUpload from './components/VideoUpload';
import PlayVideo from './components/PlayVideo'; // Fix the casing of the file name

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const fullText = 'Welcome To Streamify';
  const [videoId, setVideoId] = useState('32b0120e-bce9-4b64-958e-16cb87b37a68'); // State to store the video ID

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Adjust typing speed here

    return () => clearInterval(typingInterval);
  }, []);


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Centered Heading with Typing Effect */}
        <h1 className="text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-[#30cfd0] to-[#330867] bg-clip-text text-transparent py-1">
          {text}
          <span className="typing-cursor">|</span> {/* Cursor Blink Effect */}
        </h1>
       
        {/* <div>
          <h1 className='text-white'>Playing Video</h1>
          <video src={`http://localhost:9000/api/v1/videos/stream/${videoId}`} controls>
           
          </video>
        </div> */}
         {/* Video Upload Component */}
        <VideoUpload />

        <PlayVideo/>
      </div>
    </>
  );
}

export default App;