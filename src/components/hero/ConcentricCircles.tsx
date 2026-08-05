'use client';
import { motion } from 'framer-motion';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

// Radar/sonar effect: 4 circles expand from center with staggered delays
const circles = [
  { delay: 0, duration: 4.5, opacity: 0.14, strokeWidth: 2, highlight: true },
  { delay: 1.1, duration: 4.5, opacity: 0.1, strokeWidth: 1 },
  { delay: 2.2, duration: 4.5, opacity: 0.07, strokeWidth: 1 },
  { delay: 3.3, duration: 4.5, opacity: 0.04, strokeWidth: 1 },
];

export const ConcentricCircles = () => {
  const { state } = useAdvancedAccessibility();

  // Respetar preferencias de reducción de movimiento
  const shouldAnimate = !state.reducedMotion && !state.reducedAnimations;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className={`
            absolute rounded-full pointer-events-none
            ${circle.highlight ? 'border-amber-300 shadow-[0_0_15px_rgba(247,171,10,0.3)]' : 'border-amber-400/40'}
          `}
          transformTemplate={({ scale }) => `scale3d(${scale}, ${scale}, 1)`}
          style={{
            width: 'min(1000px, 90vmin)',
            height: 'min(1000px, 90vmin)',
            borderWidth: circle.strokeWidth,
          }}
          initial={{
            scale: 0,
            opacity: 1,
          }}
          animate={{
            scale: shouldAnimate ? [0, 1] : 1,
            opacity: shouldAnimate ? [circle.opacity, 0] : circle.opacity,
          }}
          transition={{
            delay: circle.delay,
            duration: circle.duration,
            ease: 'easeOut',
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};
