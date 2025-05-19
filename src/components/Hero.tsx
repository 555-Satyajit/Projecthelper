'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const blobRef = useRef<SVGSVGElement>(null);
  const [blobPath, setBlobPath] = useState("");
  const [_, setIsHovering] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const appControls = useAnimation();
  
  const features = [
    { title: "Project Planning", icon: "📋" },
    { title: "Expert Guidance", icon: "🧠" },
    { title: "Deadline Tracking", icon: "⏱️" },
    { title: "Resource Library", icon: "📚" }
  ];

  // More complex blob generation for organic shapes
  const generateBlobPath = () => {
    // Generate random coefficients for the blob
    const points = 8;
    const angleStep = (Math.PI * 2) / points;
    const center = 50;
    const pathParts = [];
    
    for (let i = 0; i <= points; i++) {
      const angle = i * angleStep;
      // Random radius between 30 and 50
      const radius = Math.random() * 20 + 30;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      
      if (i === 0) {
        pathParts.push(`M${x},${y}`);
      } else if (i === points) {
        // Close the path by connecting to the first point with a curve
        const firstX = center + Math.cos(0) * (Math.random() * 20 + 30);
        const firstY = center + Math.sin(0) * (Math.random() * 20 + 30);
        const cpX1 = x - (Math.random() * 10);
        const cpY1 = y + (Math.random() * 10);
        const cpX2 = firstX + (Math.random() * 10);
        const cpY2 = firstY - (Math.random() * 10);
        pathParts.push(`C${cpX1},${cpY1} ${cpX2},${cpY2} ${firstX},${firstY}`);
      } else {
        // Random control points for more organic curves
        const prevX = center + Math.cos((i - 1) * angleStep) * (Math.random() * 20 + 30);
        const prevY = center + Math.sin((i - 1) * angleStep) * (Math.random() * 20 + 30);
        const cpX1 = prevX + (Math.random() * 10);
        const cpY1 = prevY + (Math.random() * 10);
        const cpX2 = x - (Math.random() * 10);
        const cpY2 = y - (Math.random() * 10);
        pathParts.push(`C${cpX1},${cpY1} ${cpX2},${cpY2} ${x},${y}`);
      }
    }
    
    return pathParts.join(' ') + ' Z';
  };

  // Blob animation
  useEffect(() => {
    setBlobPath(generateBlobPath());
    
    const interval = setInterval(() => {
      setBlobPath(generateBlobPath());
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Feature rotation with auto-cycling - Fixed to include features.length in dependencies
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [features.length]); // Added features.length as a dependency

  // Mock app animation sequence
  useEffect(() => {
    const sequence = async () => {
      await appControls.start({ 
        y: [0, -10, 0], 
        rotate: [0, -1, 1, 0], 
        transition: { 
          duration: 4, 
          repeat: Infinity, 
          repeatType: "reverse" 
        } 
      });
    };
    
    sequence();
  }, [appControls]);

  // Hover animation for buttons
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-cyan-100">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated blobs */}
        {blobPath && (
          <>
            <svg 
              ref={blobRef}
              viewBox="0 0 100 100" 
              className="absolute top-20 right-20 w-96 h-96 text-indigo-500 opacity-10"
              fill="currentColor"
            >
              <motion.path 
                d={blobPath} 
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ 
                  scale: [0.8, 1, 0.8], 
                  opacity: [0.5, 0.7, 0.5],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
              />
            </svg>
            
            <svg 
              viewBox="0 0 100 100" 
              className="absolute bottom-20 left-20 w-80 h-80 text-cyan-500 opacity-10"
              fill="currentColor"
            >
              <motion.path 
                d={blobPath} 
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ 
                  scale: [1, 0.9, 1], 
                  opacity: [0.5, 0.8, 0.5],
                  rotate: [0, -5, 0, 5, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              />
            </svg>
          </>
        )}
        
        {/* Gradient orbs */}
        <motion.div 
          className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-cyan-300 to-indigo-300 rounded-full filter blur-xl opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <motion.div 
          className="absolute top-20 left-1/4 w-48 h-48 bg-gradient-to-br from-purple-300 to-indigo-500 rounded-full filter blur-xl opacity-10"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
        
        {/* Particles/Stars */}
        <div className="absolute top-40 left-1/4 w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-indigo-300 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/2 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
      </div>
      
      {/* Grid pattern overlay for texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0"></div>
      
      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center gap-12">
        {/* Left column - Enhanced Text content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="text-sm font-semibold text-indigo-600 tracking-wider uppercase">Introducing</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mt-2">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ProjectHelper</span>
              <br />
              <motion.span 
                className="text-slate-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Your Academic
              </motion.span>
              <br />
              <motion.span 
                className="text-slate-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Project Partner
              </motion.span>
            </h1>
          </motion.div>

          <motion.p 
            className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Get expert help with your academic projects, from conceptualization to implementation.
            Our team of professionals will assist you in creating high-quality projects that stand out.
          </motion.p>

          {/* Feature Rotator */}
          <div className="my-8">
            <motion.div 
              className="flex flex-col items-center lg:items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-sm uppercase tracking-wider text-indigo-500 font-medium mb-3">Key Features</div>
              <div className="relative h-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 bg-white bg-opacity-50 backdrop-blur-sm px-6 py-4 rounded-xl shadow-sm"
                  >
                    <span className="text-3xl">{features[activeFeature].icon}</span>
                    <div>
                      <div className="font-semibold text-lg text-slate-800">{features[activeFeature].title}</div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Feature dots indicator */}
              <div className="flex gap-2 mt-4 justify-center lg:justify-start">
                {features.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveFeature(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeFeature ? 'bg-indigo-600 w-4' : 'bg-slate-300'}`}
                    aria-label={`Select feature: ${features[idx].title}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button 
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
              </svg>
              Explore Projects
            </motion.button>
            <motion.button 
              className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-xl shadow border border-indigo-100 flex items-center justify-center gap-2 hover:shadow-md transition-all duration-300"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
              Download App
            </motion.button>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div 
            className="mt-12 flex flex-col items-center lg:items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="text-sm text-slate-500 mb-3">Trusted by students from</p>
            <div className="flex gap-6 items-center opacity-70">
              <div className="w-16 h-8 bg-slate-700 rounded flex items-center justify-center">
                <div className="w-10 h-3 bg-slate-200 rounded-sm"></div>
              </div>
              <div className="w-16 h-8 bg-slate-700 rounded flex items-center justify-center">
                <div className="w-10 h-3 bg-slate-200 rounded-sm"></div>
              </div>
              <div className="w-16 h-8 bg-slate-700 rounded flex items-center justify-center">
                <div className="w-10 h-3 bg-slate-200 rounded-sm"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right column - Enhanced App mockup */}
        <motion.div 
          className="w-full lg:w-1/2 flex justify-center lg:justify-end relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Phone mockup with enhanced design */}
          <motion.div 
            className="relative"
            animate={appControls}
          >
            {/* Device frame */}
            <div className="relative w-72 h-auto rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-300/20 border-8 border-slate-800 bg-slate-800">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-10 flex items-center justify-center">
                <div className="w-12 h-1.5 bg-slate-700 rounded-full"></div>
              </div>
              
              {/* Screen content */}
              <div className="w-full h-[500px] bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 overflow-hidden">
                {/* App UI */}
                <div className="pt-8 pb-4 px-4 h-full flex flex-col">
                  {/* Status bar */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xs text-white/90">9:41</div>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 bg-white/80 rounded-sm"></div>
                      <div className="w-3 h-2 bg-white/60 rounded-sm"></div>
                      <div className="w-2 h-2 bg-white/40 rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* App content */}
                  <div className="flex-1 flex flex-col gap-4">
                    {/* App header */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-sm"></div>
                        </div>
                        <div className="text-white font-medium">ProjectHelper</div>
                      </div>
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <div className="w-4 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Dashboard content */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                      <div className="text-white text-sm mb-2">Current Projects</div>
                      <div className="flex flex-col gap-2">
                        <motion.div 
                          className="bg-white/10 backdrop-blur-md rounded-lg p-3"
                          animate={{ 
                            y: [0, -3, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="w-24 h-2 bg-white/40 rounded-full"></div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-cyan-300 flex items-center justify-center">
                              <div className="w-3 h-3 border-2 border-white border-b-0 border-r-0 transform -rotate-45"></div>
                            </div>
                          </div>
                          <div className="mt-2 w-full h-1 bg-white/20 rounded-full">
                            <div className="w-3/4 h-1 bg-white rounded-full"></div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-white/10 backdrop-blur-md rounded-lg p-3"
                          animate={{ 
                            y: [0, -3, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="w-32 h-2 bg-white/40 rounded-full"></div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-300 flex items-center justify-center">
                              <div className="w-3 h-3 border-2 border-white"></div>
                            </div>
                          </div>
                          <div className="mt-2 w-full h-1 bg-white/20 rounded-full">
                            <div className="w-1/2 h-1 bg-white rounded-full"></div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Calendar section */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                      <div className="text-white text-sm mb-2">Upcoming Deadlines</div>
                      <div className="flex justify-between mb-2">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i === 2 ? 'bg-white text-indigo-600' : 'bg-white/10 text-white'}`}>
                              <div className="text-xs">{i + 10}</div>
                            </div>
                            <div className="text-white/80 text-xs mt-1">{['M', 'T', 'W', 'T', 'F'][i]}</div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                          <div className="w-32 h-2 bg-white/40 rounded-full"></div>
                        </div>
                        <div className="mt-2 h-2 w-full flex justify-between items-center">
                          <div className="w-16 h-2 bg-white/20 rounded-full"></div>
                          <div className="w-12 h-2 bg-white/30 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick actions */}
                    <div className="mt-auto flex justify-between">
                      {[1, 2, 3, 4].map((_, i) => (
                        <motion.div 
                          key={i}
                          className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                        >
                          <div className="w-5 h-5 bg-white/70 rounded"></div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements around the phone */}
            <motion.div 
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-400 to-cyan-200 rounded-full filter blur-md opacity-60"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            />
            
            <motion.div 
              className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-300 rounded-full filter blur-md opacity-60"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.7, 0.6],
              }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            />
          </motion.div>
          
          {/* Notification badges floating around the phone */}
          <motion.div 
            className="absolute top-16 right-0 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 w-48"
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              x: [20, 0, 0, -20],
              y: [0, 0, 10, 20]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "loop", delay: 3, times: [0, 0.1, 0.9, 1] }}
          >
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div className="w-24 h-2 bg-slate-200 rounded-full"></div>
              <div className="w-16 h-2 bg-slate-200 rounded-full mt-1"></div>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-24 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 w-48"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              x: [-20, 0, 0, 20],
              y: [0, 0, -10, -20]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "loop", delay: 8, times: [0, 0.1, 0.9, 1] }}
          >
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
              </svg>
            </div>
            <div>
              <div className="w-24 h-2 bg-slate-200 rounded-full"></div>
              <div className="w-16 h-2 bg-slate-200 rounded-full mt-1"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative code snippets floating in background */}
      <div className="absolute bottom-12 left-12 transform rotate-6 opacity-5 hidden lg:block">
        <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs">
          <div>const project = new ProjectHelper();</div>
          <div>project.complete();</div>
          <div> Success! ✨</div>
        </div>
      </div>
      
      {/* CSS for our grid pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 100, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 100, 0.1) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
};

export default Hero;