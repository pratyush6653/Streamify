import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component
import VideoUpload from './components/VideoUpload';
import PlayVideo from './components/PlayVideo';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { useEffect, useState } from 'react'; // Import useEffect and useState for typing effect

function App() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  const fullText1 = " Your go-to platform for streaming and sharing videos."; // First line
  const fullText2 = "Discover, stream, and share your favorite videos."; // Second line
  const fullText3 = "Join a community of creators and viewers."; // Third line

  const typingSpeed = 70; // Speed of typing in milliseconds

  // Typing effect for the first line
  useEffect(() => {
    let currentIndex = 1;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText1.length) {
        setText1(fullText1.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [fullText1]);

  // Typing effect for the second line (starts after the first line finishes)
  useEffect(() => {
    if (text1 === fullText1) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText2.length) {
          setText2(fullText2.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }
  }, [text1, fullText2]);

  // Typing effect for the third line (starts after the second line finishes)
  useEffect(() => {
    if (text2 === fullText2) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText3.length) {
          setText3(fullText3.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }
  }, [text2, fullText3]);

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
                  {text1}
                  {text1 === fullText1 && <span className="typing-cursor" />} {/* Blinking cursor */}
                </div>
              </div>

              {/* Additional Lines with Typing Animation */}
              <div className="text-center text-white mt-6 space-y-4">
                {text1 === fullText1 && (
                  <div className="text-xl font-mono relative">
                    {text2}
                    {text2 === fullText2 && <span className="typing-cursor" />} {/* Blinking cursor */}
                  </div>
                )}
                {text2 === fullText2 && (
                  <div className="text-xl font-mono relative">
                    {text3}
                    {text3 === fullText3 && <span className="typing-cursor" />} {/* Blinking cursor */}
                  </div>
                )}
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