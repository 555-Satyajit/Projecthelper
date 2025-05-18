'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

// Magnetic effect for hover interactions
const useMagneticEffect = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
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
  };

  return { ref, springX, springY, handleMouseMove, handleMouseLeave };
};

// Animating text character by character
const KineticText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const characters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.03 * i + delay }
    })
  };
  
  const child = {
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
    <motion.span
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
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
    </motion.span>
  );
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const magnetic = useMagneticEffect();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Animation for staggered elements within the card
  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 relative overflow-hidden"
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
      {/* Decorative background elements */}
      <motion.div 
        className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: index * 0.1, 
          duration: 0.8, 
          ease: "backOut" 
        }}
      />
      
      <motion.div 
        className="absolute -left-8 -bottom-8 w-32 h-32 bg-purple-50 rounded-full opacity-30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: index * 0.1 + 0.2, 
          duration: 0.8, 
          ease: "backOut" 
        }}
      />

      {/* Service icon with magnetic effect */}
      <motion.div
        ref={magnetic.ref}
        style={{ 
          x: magnetic.springX, 
          y: magnetic.springY 
        }}
        onMouseMove={magnetic.handleMouseMove}
        onMouseLeave={magnetic.handleMouseLeave}
        className="relative z-10 mb-4"
      >
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
            backgroundColor: "#dbeafe",
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
      </motion.div>

      {/* Kinetic typography for title */}
      <motion.h3 
        className="text-xl font-bold mb-2 text-gray-800"
        custom={1}
        variants={staggerVariants}
      >
        <KineticText text={service.title} delay={index * 0.1 + 0.3} />
      </motion.h3>
      
      {/* Description with split screen effect */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ 
          delay: index * 0.15 + 0.4, 
          duration: 0.6, 
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        <p className="text-gray-600 mb-4 relative z-10">
          {service.description}
        </p>
      </motion.div>
      
      {/* Benefits list with staggered animation */}
      <ul className="space-y-2 relative z-10">
        {service.benefits.slice(0, 2).map((benefit, benefitIndex) => (
          <motion.li 
            key={benefitIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { 
                delay: index * 0.15 + 0.5 + benefitIndex * 0.1,
                duration: 0.5
              }
            }}
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
                  delay: index * 0.15 + 0.6 + benefitIndex * 0.1,
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

export default ServiceCard;