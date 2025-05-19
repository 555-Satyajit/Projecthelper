'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TextScrambleProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  scrambleSpeed?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}—=+*^?#_~';

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  delay = 0, 
  duration = 2.5,
  className = '',
  scrambleSpeed = 50,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [setIsScrambling] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const finalTextRef = useRef(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    finalTextRef.current = text;
    
    // Reset if text changes
    if (isComplete) {
      setIsScrambling(true);
      setIsComplete(false);
      startScrambling();
    }
  }, [text]);

  useEffect(() => {
    // Initial delay before starting scramble effect
    const timer = setTimeout(() => {
      setIsScrambling(true);
      startScrambling();
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [delay]);

  const startScrambling = () => {
    let iteration = 0;
    const maxIterations = duration * 1000 / scrambleSpeed;
    const finalText = finalTextRef.current;
    
    // Generate initial scrambled text of the same length
    let scrambledText = '';
    for (let i = 0; i < finalText.length; i++) {
      scrambledText += chars[Math.floor(Math.random() * chars.length)];
    }
    setDisplayText(scrambledText);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start scrambling effect
    intervalRef.current = setInterval(() => {
      iteration++;
      
      // Calculate how many characters should be finalized based on progress
      const progress = iteration / maxIterations;
      const finalizedCount = Math.floor(finalText.length * progress);
      
      let newText = '';
      
      for (let i = 0; i < finalText.length; i++) {
        // If this character should be finalized
        if (i < finalizedCount) {
          newText += finalText[i];
        } 
        // If character is a space, keep it as a space
        else if (finalText[i] === ' ') {
          newText += ' ';
        } 
        // Otherwise scramble it
        else {
          newText += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      setDisplayText(newText);
      
      // When all characters are set correctly, stop the scrambling
      if (iteration >= maxIterations) {
        setDisplayText(finalText); // Ensure final text is correct
        setIsScrambling(false);
        setIsComplete(true);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, scrambleSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  };

  return (
    <motion.span 
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay }}
    >
      {displayText || text}
    </motion.span>
  );
};

// Animated variant that can be used with a trigger
export const GlitchText: React.FC<TextScrambleProps & { inView?: boolean }> = ({
  text,
  delay = 0,
  duration = 2.5,
  className = '',
  scrambleSpeed = 50,
  inView = true
}) => {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    if (inView && !isActive) {
      const timer = setTimeout(() => {
        setIsActive(true);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [inView, isActive, delay]);
  
  return isActive ? (
    <TextScramble
      text={text}
      delay={0}
      duration={duration}
      className={className}
      scrambleSpeed={scrambleSpeed}
    />
  ) : (
    <span className={className}>
      {Array(text.length).fill('_').join('')}
    </span>
  );
};
export default { TextScramble, GlitchText };