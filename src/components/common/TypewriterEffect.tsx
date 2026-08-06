'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

interface TypewriterEffectProps {
  phrases: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  fadeDuration?: number;
}

export const TypewriterEffect = ({
  phrases,
  typingSpeed = 90,
  pauseDuration = 500,
  fadeDuration = 400,
}: TypewriterEffectProps) => {
  const { state } = useAdvancedAccessibility();
  const shouldAnimate =
    !state.reducedMotion && !state.reducedAnimations && phrases.length > 0;

  const [display, setDisplay] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const phraseIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isTypingRef = useRef(true);

  useEffect(() => {
    if (!shouldAnimate) return;

    const tick = () => {
      const phrase = phrases[phraseIndexRef.current] ?? '';
      if (isTypingRef.current) {
        if (charIndexRef.current < phrase.length) {
          charIndexRef.current += 1;
          setDisplay(phrase.slice(0, charIndexRef.current));
        } else {
          isTypingRef.current = false;
          setIsVisible(false);
        }
      } else {
        phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
        charIndexRef.current = 0;
        isTypingRef.current = true;
        setDisplay('');
        setIsVisible(true);
      }
    };

    const currentPhrase = phrases[phraseIndexRef.current] ?? '';
    const delay = isTypingRef.current
      ? charIndexRef.current < currentPhrase.length
        ? typingSpeed
        : pauseDuration
      : fadeDuration;

    const timeoutId = setTimeout(tick, delay);
    return () => clearTimeout(timeoutId);
  }, [
    display,
    isVisible,
    shouldAnimate,
    phrases,
    typingSpeed,
    pauseDuration,
    fadeDuration,
  ]);

  // Reduced motion: show first phrase statically without animation
  if (!shouldAnimate) {
    return (
      <span className="inline-flex items-center min-h-[1.2em]">
        {phrases[0] ?? ''}
      </span>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: fadeDuration / 1000 }}
      className="inline-flex items-center min-h-[1.2em]"
    >
      {display}
      <span
        className="inline-block w-[3px] h-[1em] bg-amber-400 ml-1 sm:ml-2 animate-pulse"
        style={{ verticalAlign: 'text-bottom' }}
      />
    </motion.span>
  );
};
