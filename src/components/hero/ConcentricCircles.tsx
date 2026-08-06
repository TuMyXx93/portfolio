'use client';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

// Radar/sonar effect: 2 circles expand from center with staggered delays
const circles = [
  { delay: 0, duration: 4.5, opacity: 0.12, strokeWidth: 1.5, highlight: true },
  { delay: 2.2, duration: 4.5, opacity: 0.06, strokeWidth: 1 },
];

export const ConcentricCircles = () => {
  const { state } = useAdvancedAccessibility();

  // Respetar preferencias de reducción de movimiento
  const shouldAnimate = !state.reducedMotion && !state.reducedAnimations;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      {circles.map((circle, index) => (
        <div
          key={index}
          className={`
            absolute rounded-full pointer-events-none
            ${circle.highlight ? 'border-amber-300/50' : 'border-amber-400/30'}
            ${shouldAnimate ? 'radar-circle-animated' : ''}
          `}
          style={{
            width: 'min(700px, 75vmin)',
            height: 'min(700px, 75vmin)',
            borderWidth: circle.strokeWidth,
            animationDelay: shouldAnimate ? `${circle.delay}s` : '0s',
            opacity: shouldAnimate ? undefined : circle.opacity,
          }}
        />
      ))}
    </div>
  );
};
