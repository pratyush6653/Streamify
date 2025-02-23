import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import VideoUpload from './components/VideoUpload';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Centered Heading */}
        <h1 className="text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-[#30cfd0] to-[#330867] bg-clip-text text-transparent animate-gradient">
        Welcome To Streamify
        </h1>
        {/* Video Upload Component */}
        <VideoUpload />
      </div>
    </>
  );
}

export default App;