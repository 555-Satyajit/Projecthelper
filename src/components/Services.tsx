'use client';

import { useEffect, useRef, useState } from 'react';
import { services } from '../data/services';
import { motion, useAnimation, useMotionValue, useSpring, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TextScramble, GlitchText } from './TextScrambleEffect';
import GridBackground from './GridBackground';

type KineticTypographyProps = {
  text: string;
  delay?: number;
};

const KineticTypography = ({ text, delay = 0 }: KineticTypographyProps) => {
  const characters = Array.from(text);
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay }
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

const MagneticElement = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    
    x.set((e.clientX - centerX) / 5);
    y.set((e.clientY - centerY) / 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ scale: hovered ? 1.05 : 1 }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

type SplitScreenTransitionProps = {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
};

const SplitScreenTransition = ({ children, direction = "left", delay = 0 }: SplitScreenTransitionProps) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const variants = {
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1], 
        delay 
      } 
    },
    hidden: { 
      x: direction === "left" ? -100 : 100, 
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

const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: custom * 0.1,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    })
};

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 backdrop-blur-sm bg-opacity-90"
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={controls}
      variants={{
        visible: { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          transition: { 
            duration: 0.5, 
            delay: index * 0.15,
            ease: [0.22, 1, 0.36, 1]
          }
        }
      }}
      whileHover={{
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 }
      }}
    >
      <MagneticElement>
        <motion.div 
          className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center"
          initial={{ rotate: 15, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ 
            delay: index * 0.15 + 0.2, 
            type: "spring", 
            stiffness: 100 
          }}
          whileHover={{ 
            backgroundColor: "#dbeafe", // blue-100
            scale: 1.1,
            transition: { duration: 0.2 } 
          }}
        >
          <motion.img 
            src={service.iconUrl} 
            alt={service.title} 
            width={32} 
            height={32}
            animate={{ rotate: [0, 10, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 2,
              ease: "easeInOut",
              delay: index * 0.5
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
            delay={index * 0.2 + 0.3} 
            duration={1.5}
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
                  delay: index * 0.15 + 0.5 + benefitIndex * 0.1,
                  type: "spring",
                  stiffness: 150
                }
              }}
              whileHover={{ scale: 1.2, rotate: 10 }}
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

const Services = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Cyberpunk-inspired color schemes
  const glitchColors = [
    'from-blue-500 to-purple-600',
    'from-cyan-400 to-blue-600', 
    'from-pink-500 to-purple-600',
    'from-green-400 to-cyan-500',
  ];
  
  const [colorScheme, setColorScheme] = useState(glitchColors[0]);
  
  // Simulate random glitching of the colors
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * glitchColors.length);
      setColorScheme(glitchColors[randomIndex]);
    }, 5000); // Change every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <GridBackground 
      gridSize={30} 
      lineColor="#3b82f6" 
      lineOpacity={0.07}
      highlightOnHover={true}
      className="section py-24 overflow-hidden"
    >
      <section id="services" className="relative">
        <div className="container mx-auto px-4 relative">
          {/* Background animated elements with glitch effects */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-blue-100 bg-opacity-40 rounded-full"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  zIndex: 0
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0.8, 1], 
                  opacity: [0, 0.2, 0.1, 0],
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 15 + i * 5,
                  delay: i * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <motion.div 
            ref={ref}
            className="text-center mb-16 relative z-10"
            initial="hidden"
            animate={controls}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
          >
            <SplitScreenTransition direction="left">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${colorScheme}`}>
                <TextScramble 
                  text="Our Services" 
                  delay={0.3} 
                  duration={2} 
                  scrambleSpeed={40}
                />
              </h2>
            </SplitScreenTransition>
            
            <SplitScreenTransition direction="right" delay={0.2}>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                <TextScramble 
                  text="We provide comprehensive solutions for all your academic project needs, from consultation to complete development" 
                  delay={0.8}
                  duration={1.5}
                  scrambleSpeed={25}
                />
              </p>
            </SplitScreenTransition>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
            {services.map((service, index) => (
              <ServiceCard 
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
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 1, duration: 0.8 }
                }}
              >
                <TextScramble 
                  text="Request Custom Service" 
                  delay={1.2}
                  duration={1}
                  scrambleSpeed={30} 
                  className="inline-block"
                />
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  className="ml-2 w-5 h-5"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
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