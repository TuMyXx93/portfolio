'use client';
import { motion } from 'framer-motion';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

const circles = [
  { size: 200, delay: 0, duration: 2.5, opacity: 0.15, strokeWidth: 1 },
  { size: 400, delay: 0.2, duration: 3, opacity: 0.12, strokeWidth: 1 },
  {
    size: 600,
    delay: 0.4,
    duration: 3.5,
    opacity: 0.08,
    strokeWidth: 2,
    highlight: true,
  },
  {
    size: 800,
    delay: 0.6,
    duration: 4,
    opacity: 0.06,
    strokeWidth: 1,
    pulse: true,
  },
  { size: 1000, delay: 0.8, duration: 4.5, opacity: 0.04, strokeWidth: 1 },
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
          className={`
            absolute rounded-full hero-circle
            ${circle.highlight ? 'border-amber-300 glow-amber' : 'border-amber-400'}
            ${circle.pulse && shouldAnimate ? 'animate-pulse' : ''}
          `}
          style={{
            width: circle.size,
            height: circle.size,
            opacity: circle.opacity,
            borderWidth: circle.strokeWidth,
          }}
          initial={{
            scale: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            scale: 1,
            opacity: circle.opacity,
            rotate: shouldAnimate ? [0, 360] : 0,
          }}
          transition={{
            delay: circle.delay,
            duration: circle.duration,
            ease: 'easeOut' as const,
            rotate: shouldAnimate
              ? {
                  duration: 15 + index * 5, // Velocidades diferentes para cada círculo
                  repeat: Infinity,
                  ease: 'linear' as const,
                }
              : undefined,
          }}
        />
      ))}
    </div>
  );
};
