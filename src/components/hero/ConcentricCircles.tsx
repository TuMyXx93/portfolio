'use client';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

export const ConcentricCircles = () => {
  const { state } = useAdvancedAccessibility();

  // Respetar preferencias de reducción de movimiento
  const shouldAnimate = !state.reducedMotion && !state.reducedAnimations;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
      <svg
        className={`w-[min(750px,80vmin)] h-[min(750px,80vmin)] text-amber-400/40 ${
          shouldAnimate ? 'radar-svg-animated' : ''
        }`}
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Anillo Exterior Concéntrico */}
        <circle
          cx="400"
          cy="400"
          r="375"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="12 8"
          className={shouldAnimate ? 'radar-ring-1' : 'opacity-30'}
        />
        {/* Anillo Intermedio Concéntrico */}
        <circle
          cx="400"
          cy="400"
          r="260"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="8 6"
          className={shouldAnimate ? 'radar-ring-2' : 'opacity-40'}
        />
        {/* Anillo Interior Concéntrico */}
        <circle
          cx="400"
          cy="400"
          r="145"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6 4"
          className={shouldAnimate ? 'radar-ring-3' : 'opacity-50'}
        />
      </svg>
    </div>
  );
};
