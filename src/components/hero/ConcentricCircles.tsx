'use client';
import { motion } from 'framer-motion';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

const circles = [
  { size: 200, delay: 0, duration: 2.5, opacity: 0.1 },
  { size: 400, delay: 0.2, duration: 3, opacity: 0.08 },
  { size: 600, delay: 0.4, duration: 3.5, opacity: 0.06 },
  { size: 800, delay: 0.6, duration: 4, opacity: 0.04, pulse: true },
  { size: 1000, delay: 0.8, duration: 4.5, opacity: 0.02 },
];

export const ConcentricCircles = () => {
  const { state } = useAdvancedAccessibility();
  
  // Respetar preferencias de reducción de movimiento
  const shouldAnimate = !state.reducedMotion && !state.reducedAnimations;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className={`absolute border border-amber-400 rounded-full ${
            circle.pulse && shouldAnimate ? 'animate-pulse' : ''
          }`}
          style={{
            width: circle.size,
            height: circle.size,
            opacity: circle.opacity,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: circle.opacity,
            rotate: shouldAnimate ? 360 : 0
          }}
          transition={{
            delay: circle.delay,
            duration: circle.duration,
            ease: "easeOut",
            rotate: shouldAnimate ? {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            } : undefined
          }}
        />
      ))}
      
      {/* Círculo central con ping effect */}
      <motion.div
        className={`absolute w-32 h-32 border border-amber-300 rounded-full ${
          shouldAnimate ? 'animate-ping' : ''
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </div>
  );
};
