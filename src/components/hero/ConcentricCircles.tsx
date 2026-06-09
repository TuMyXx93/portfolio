'use client';
import { motion } from 'framer-motion';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

// Radar/sonar effect: all circles expand from center to 90vmin / 1000px
// using staggered delays for a smooth, modern animation.
const circles = [
  { delay: 0, duration: 4, opacity: 0.15, strokeWidth: 2, highlight: true },
  { delay: 0.8, duration: 4, opacity: 0.12, strokeWidth: 1 },
  { delay: 1.6, duration: 4, opacity: 0.08, strokeWidth: 1 },
  { delay: 2.4, duration: 4, opacity: 0.06, strokeWidth: 1 },
  { delay: 3.2, duration: 4, opacity: 0.04, strokeWidth: 1 },
  { delay: 4.0, duration: 4, opacity: 0.02, strokeWidth: 1 }, // 6th circle for radar effect
];

export const ConcentricCircles = () => {
  const { state } = useAdvancedAccessibility();

  // Respetar preferencias de reducción de movimiento
  const shouldAnimate = !state.reducedMotion && !state.reducedAnimations;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className={`
            absolute rounded-full hero-circle
            ${circle.highlight ? 'border-amber-300 glow-amber' : 'border-amber-400'}
          `}
          style={{
            // El radar se expande hasta llenar un diámetro de 90vmin / 1000px
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
