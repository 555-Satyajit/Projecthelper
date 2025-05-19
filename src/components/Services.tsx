'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { services } from '../data/services';
import { motion, useAnimation, useMotionValue, useSpring, Variants, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TextScramble, GlitchText } from './TextScrambleEffect';
import GridBackground from './GridBackground';

// Performance optimization: Memoized component
const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const characters = useMemo(() => Array.from(text), [text]);
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    }
  };
  
  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-block"
    >
      {characters.map((character, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{
            textShadow: character !== " " ? "0 0 8px rgba(0,0,0,0.1)" : "none",
          }}
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Performance optimization: Separated component with memoization
const MagneticElement = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Optimized spring config
  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Optimized event handler with useCallback
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Reduced sensitivity for smoother motion
    const moveX = (e.clientX - centerX) / 6;
    const moveY = (e.clientY - centerY) / 6;
    
    // Use set method efficiently
    x.set(moveX);
    y.set(moveY);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setHovered(false);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ scale: hovered ? 1.05 : 1 }}
      transition={{ type: "spring", damping: 15, stiffness: 150, mass: 0.8 }}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

// Performance optimization: Simplified transform logic
const SplitScreenTransition = ({ 
  children, 
  direction = "left", 
  delay = 0 
}: { 
  children: React.ReactNode; 
  direction?: "left" | "right"; 
  delay?: number; 
}) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const variants = {
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, // Reduced duration
        ease: [0.22, 1, 0.36, 1], 
        delay 
      } 
    },
    hidden: { 
      x: direction === "left" ? -70 : 70, // Reduced distance
      opacity: 0 
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

type Service = {
  id: string;
  iconUrl: string;
  title: string;
  description: string;
  benefits: string[];
};

// Performance optimization: Extracted as pure component
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Simplified animation variants
  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.08, // Reduced delay
        duration: 0.6, // Reduced duration
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 backdrop-blur-sm bg-opacity-90 will-change-transform"
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={controls}
      variants={{
        visible: { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          transition: { 
            duration: 0.4, 
            delay: index * 0.1, // Reduced delay
            ease: [0.22, 1, 0.36, 1]
          }
        }
      }}
      whileHover={{
        y: -8, // Reduced movement
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 } // Faster transition
      }}
      layout="position"
    >
      <MagneticElement>
        <motion.div 
          className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center"
          initial={{ rotate: 10, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ 
            delay: index * 0.1 + 0.2, 
            type: "spring", 
            stiffness: 100 
          }}
          whileHover={{ 
            backgroundColor: "#dbeafe", 
            scale: 1.05, // Reduced scale
            transition: { duration: 0.2 } 
          }}
        >
          <motion.img 
            src={service.iconUrl} 
            alt={service.title} 
            width={32} 
            height={32}
            animate={{ rotate: [0, 8, 0] }} // Reduced rotation
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 3, // Slower animation
              ease: "easeInOut",
              delay: index * 0.3
            }}
          />
        </motion.div>
      </MagneticElement>

      <motion.div
        custom={1}
        variants={staggerVariants}
        className="mt-4"
      >
        <h3 className="text-xl font-bold mb-2 text-gray-800">
          <GlitchText 
            text={service.title} 
            delay={index * 0.15 + 0.3} // Reduced delay
            duration={1.2}
            scrambleSpeed={30}
            inView={inView}
          />
        </h3>
      </motion.div>
      
      <motion.div
        custom={2}
        variants={staggerVariants}
      >
        <p className="text-gray-600 mb-4">
          {service.description}
        </p>
      </motion.div>
      
      <ul className="space-y-2">
        {service.benefits.slice(0, 2).map((benefit, benefitIndex) => (
          <motion.li 
            key={benefitIndex}
            custom={3 + benefitIndex}
            variants={staggerVariants}
            className="flex items-start"
          >
            <motion.svg 
              className="w-5 h-5 text-green-500 mr-2 mt-0.5" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { 
                  delay: index * 0.1 + 0.4 + benefitIndex * 0.08, // Reduced delay
                  type: "spring",
                  stiffness: 200
                }
              }}
              whileHover={{ scale: 1.15, rotate: 5 }} // Reduced movement
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </motion.svg>
            <span className="text-sm text-gray-700">{benefit}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

// Memoize for performance
const MemoizedServiceCard = React.memo(ServiceCard);

const Services = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true, // Changed to true for performance
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Cyberpunk-inspired color schemes
  const glitchColors = useMemo(() => [
    'from-blue-500 to-purple-600',
    'from-cyan-400 to-blue-600', 
    'from-pink-500 to-purple-600',
    'from-green-400 to-cyan-500',
  ], []);
  
  const [colorScheme, setColorScheme] = useState(glitchColors[0]);
  
  // Performance optimization: Reduced frequency of color changes
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * glitchColors.length);
      setColorScheme(glitchColors[randomIndex]);
    }, 7000); // Changed to 7 seconds for less frequent updates
    
    return () => clearInterval(interval);
  }, [glitchColors]);

  // Performance optimization: Reduced number of background elements
  const backgroundElements = useMemo(() => {
    return [...Array(5)].map((_, i) => ({ // Reduced from 8 to 5
      width: Math.random() * 250 + 50,
      height: Math.random() * 250 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: i * 3,
      duration: 18 + i * 4
    }));
  }, []);

  return (
    <GridBackground 
      gridSize={40} // Increased grid size for performance
      lineColor="#3b82f6" 
      lineOpacity={0.07}
      highlightOnHover={true}
      className="section py-24 overflow-hidden"
    >
      <section id="services" className="relative">
        <div className="container mx-auto px-4 relative">
          {/* Reduced number of background animated elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <AnimatePresence>
              {backgroundElements.map((el, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-blue-100 bg-opacity-40 rounded-full will-change-transform"
                  style={{
                    width: el.width,
                    height: el.height,
                    left: el.left,
                    top: el.top,
                    zIndex: 0
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 0.9, 0.8, 0.95], 
                    opacity: [0, 0.15, 0.1, 0],
                    x: Math.random() * 80 - 40, // Reduced movement range
                    y: Math.random() * 80 - 40, // Reduced movement range
                  }}
                  transition={{ 
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: el.duration,
                    delay: el.delay,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </AnimatePresence>
          </div>

          <motion.div 
            ref={ref}
            className="text-center mb-16 relative z-10"
            initial="hidden"
            animate={controls}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
          >
            <SplitScreenTransition direction="left">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${colorScheme}`}>
                <TextScramble 
                  text="Our Services" 
                  delay={0.2} 
                  duration={1.5} 
                  scrambleSpeed={40}
                />
              </h2>
            </SplitScreenTransition>
            
            <SplitScreenTransition direction="right" delay={0.15}>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                <TextScramble 
                  text="We provide comprehensive solutions for all your academic project needs, from consultation to complete development" 
                  delay={0.6} // Reduced delay
                  duration={1.2} // Reduced duration
                  scrambleSpeed={30}
                />
              </p>
            </SplitScreenTransition>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {services.map((service, index) => (
              <MemoizedServiceCard 
                key={service.id} 
                service={service} 
                index={index}
              />
            ))}
          </div>
          
          <div className="mt-20 text-center relative z-10">
            <MagneticElement>
              <motion.a 
                href="#contact" 
                className={`btn-primary inline-flex items-center px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r ${colorScheme} shadow-lg`}
                whileHover={{ 
                  scale: 1.03, // Reduced scale
                  boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.1), 0 8px 8px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 15 }} // Reduced movement
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.8, duration: 0.6 } // Reduced delay and duration
                }}
              >
                <TextScramble 
                  text="Request Custom Service" 
                  delay={1}
                  duration={0.8}
                  scrambleSpeed={30} 
                  className="inline-block"
                />
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  className="ml-2 w-5 h-5"
                  animate={{ x: [0, 4, 0] }} // Reduced movement
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.8, // Slowed down
                    ease: "easeInOut" 
                  }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </motion.svg>
              </motion.a>
            </MagneticElement>
          </div>
        </div>
      </section>
    </GridBackground>
  );
};

export default Services;
AnimatedText({ text: "Sample text" })