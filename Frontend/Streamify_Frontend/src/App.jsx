import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component
import VideoUpload from './components/VideoUpload';
import PlayVideo from './components/PlayVideo';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { useEffect, useState } from 'react'; // Import useEffect and useState for typing effect

function App() {
  const [text, setText] = useState('');
  const fullText = "Your go-to platform for streaming and sharing videos."; // Description text
  const typingSpeed = 100; // Speed of typing in milliseconds

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              {/* Welcome text with multiple effects */}
              <motion.div
                className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#30cfd0] to-[#330867] mt-20 pb-4" // Reduced text size and added padding-bottom
                initial={{ opacity: 0, scale: 0.5, y: -30 }}
                animate={{
                  opacity: 1,
                  scale: 1.2,
                  y: 0,
                  transition: {
                    opacity: { duration: 1, ease: 'easeOut' },
                    scale: { duration: 1.5, ease: 'easeInOut' },
                    y: { type: 'spring', stiffness: 200, damping: 20 },
                  },
                }}
              >
                Welcome to Streamify!
              </motion.div>

              {/* Description with blinking cursor */}
              <div className="flex justify-center mt-4">
                <div className="text-xl text-white font-mono relative">
                  {text}
                  <span className="typing-cursor" /> {/* Blinking cursor */}
                </div>
              </div>
              
              {/* Additional Content */}
              <div className="text-center mt-10 overflow-visible"> {/* Ensure overflow is visible */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7, duration: 3 }}
                >
                  {/* Additional Content */}
                </motion.div>
              </div>
            </Layout>
          }
        /> {/* Home Page */}

        <Route path="/play-video" element={<Layout><PlayVideo /></Layout>} /> {/* PlayVideo Page */}
        <Route path="/upload" element={<Layout><VideoUpload /></Layout>} /> {/* Upload Page */}
      </Routes>
    </Router>
  );
}

export default App;