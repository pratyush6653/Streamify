import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import VideoUpload from './components/VideoUpload';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const fullText = 'Welcome To Streamify';

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
        <h1 className="text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-[#30cfd0] to-[#330867] bg-clip-text text-transparent py-2">
          {text}
          <span className="typing-cursor">|</span> {/* Cursor Blink Effect */}
        </h1>
        {/* Video Upload Component */}
        <VideoUpload />
      </div>
    </>
  );
}

export default App;