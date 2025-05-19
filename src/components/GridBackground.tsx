'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GridBackgroundProps {
  gridSize?: number;
  lineColor?: string;
  lineOpacity?: number;
  highlightOnHover?: boolean;
  animateGrid?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const GridBackground: React.FC<GridBackgroundProps> = ({
  gridSize = 40,
  lineColor = '#3b82f6', // blue-500
  lineOpacity = 0.1,
  highlightOnHover = true,
  animateGrid = true,
  className = '',
  children
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Track mouse position for hover effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (typeof window !== 'undefined' && highlightOnHover) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [highlightOnHover]);

  // Calculate grid lines
  const horizontalLines = [];
  const verticalLines = [];

  if (typeof window !== 'undefined') {
    // Horizontal lines
    for (let i = 0; i <= Math.ceil(windowSize.height / gridSize); i++) {
      horizontalLines.push(
        <motion.line
          key={`h-${i}`}
          x1="0"
          y1={i * gridSize}
          x2="100%"
          y2={i * gridSize}
          stroke={lineColor}
          strokeWidth="1"
          strokeOpacity={
            highlightOnHover
              ? Math.max(
                  lineOpacity - Math.abs(mousePosition.y - i * gridSize) / 200,
                  lineOpacity / 2
                )
              : lineOpacity
          }
          initial={animateGrid ? { pathLength: 0 } : { pathLength: 1 }}
          animate={animateGrid ? { pathLength: 1 } : { pathLength: 1 }}
          transition={{ duration: 1.5, delay: i * 0.05, ease: "easeInOut" }}
        />
      );
    }

    // Vertical lines
    for (let i = 0; i <= Math.ceil(windowSize.width / gridSize); i++) {
      verticalLines.push(
        <motion.line
          key={`v-${i}`}
          x1={i * gridSize}
          y1="0"
          x2={i * gridSize}
          y2="100%"
          stroke={lineColor}
          strokeWidth="1"
          strokeOpacity={
            highlightOnHover
              ? Math.max(
                  lineOpacity - Math.abs(mousePosition.x - i * gridSize) / 200,
                  lineOpacity / 2
                )
              : lineOpacity
          }
          initial={animateGrid ? { pathLength: 0 } : { pathLength: 1 }}
          animate={animateGrid ? { pathLength: 1 } : { pathLength: 1 }}
          transition={{ duration: 1.5, delay: i * 0.05, ease: "easeInOut" }}
        />
      );
    }
  }

  // Render grid points at intersections
  const renderGridPoints = () => {
    const points = [];
    
    if (typeof window !== 'undefined') {
      for (let x = 0; x <= Math.ceil(windowSize.width / gridSize); x++) {
        for (let y = 0; y <= Math.ceil(windowSize.height / gridSize); y++) {
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - x * gridSize, 2) + 
            Math.pow(mousePosition.y - y * gridSize, 2)
          );
          
          const isCloseToMouse = distance < 100;
          
          points.push(
            <motion.circle
              key={`p-${x}-${y}`}
              cx={x * gridSize}
              cy={y * gridSize}
              r={isCloseToMouse ? 2 : 1}
              fill={lineColor}
              fillOpacity={
                highlightOnHover 
                  ? Math.max(0.8 - distance / 200, 0.1)
                  : lineOpacity * 2
              }
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: (x + y) * 0.01,
                ease: "easeOut" 
              }}
            />
          );
        }
      }
    }
    
    return points;
  };

  return (
    <div className={`grid-background-container relative ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {horizontalLines}
        {verticalLines}
        {highlightOnHover && renderGridPoints()}
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GridBackground;