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
        <h1 className="text-3xl font-extrabold text-gray-700 dark:text-gray-100 text-center mb-8">
          Welcome to Streamify
        </h1>
        {/* Video Upload Component */}
        <VideoUpload />
      </div>
    </>
  );
}

export default App;