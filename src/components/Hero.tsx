'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const blobRef = useRef<SVGSVGElement>(null);
  // Use state to handle the blob path - initialize with empty path
  const [blobPath, setBlobPath] = useState("");

  // Function to generate random blob paths
  const generateBlobPath = () => {
    const rand = () => Math.floor(Math.random() * 40) + 60;
    return `M${rand()},${20} 
      C${rand()},${0} ${rand()},${0} ${rand()},${20} 
      C${100},${rand()} ${100},${rand()} ${rand()},${rand()} 
      C${rand()},${100} ${rand()},${100} ${rand()},${rand()} 
      C${0},${rand()} ${0},${rand()} ${rand()},${20} Z`;
  };

  // Animation for morphing blob in the background - CLIENT SIDE ONLY
  useEffect(() => {
    // Set initial path
    setBlobPath(generateBlobPath());
    
    // Then set up the interval for changing it
    const interval = setInterval(() => {
      setBlobPath(generateBlobPath());
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        {/* Only render the SVG when we have a path (client-side) */}
        {blobPath && (
          <svg 
            ref={blobRef}
            viewBox="0 0 100 100" 
            className="absolute top-20 right-20 w-64 h-64 text-indigo-500 opacity-10" 
            fill="currentColor"
          >
            <path d={blobPath} />
          </svg>
        )}
        
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-cyan-300 to-indigo-300 rounded-full filter blur-xl opacity-20 animate-pulse-slow"></div>
        
        <div className="absolute top-40 left-1/4 w-2 h-2 bg-indigo-600 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-400 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-indigo-300 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center">
        {/* Left column - Text content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">ProjectHelper</span>
              <br />
              <span className="text-slate-800">Your Academic</span>
              <br />
              <span className="text-slate-800">Project Partner</span>
            </h1>
          </motion.div>

          <motion.p 
            className="text-lg md:text-xl text-slate-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Get expert help with your academic projects, from conceptualization to implementation.
            Our team of professionals will assist you in creating high-quality projects that stand out.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="btn-primary flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
              </svg>
              Explore Projects
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
              Download App
            </button>
          </motion.div>
        </div>

        {/* Right column - App mockup */}
        <motion.div 
          className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative w-64 h-auto animate-float">
            {/* Placeholder for app mockup - replace with actual image */}
            <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-2xl overflow-hidden">
              <div className="w-full h-8 bg-indigo-800 flex items-center justify-center">
                <div className="w-16 h-1 bg-white rounded-full opacity-50"></div>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="w-3/4 h-6 bg-white/20 rounded-lg"></div>
                <div className="w-full h-20 bg-white/20 rounded-lg"></div>
                <div className="w-full h-10 bg-white/20 rounded-lg"></div>
                <div className="w-5/6 h-10 bg-white/20 rounded-lg"></div>
                <div className="w-full h-32 bg-white/20 rounded-lg"></div>
              </div>
            </div>
            
            {/* Decorative elements around the phone */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-400 to-cyan-200 rounded-full filter blur-md opacity-60"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-300 rounded-full filter blur-md opacity-60"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;