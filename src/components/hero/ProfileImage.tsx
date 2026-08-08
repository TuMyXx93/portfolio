'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';
import { PROFILE_IMAGES } from '@/constants';

export const ProfileImage = () => {
  const { state } = useAdvancedAccessibility();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Respetar preferencias de reducción de movimiento
  const shouldAnimate = !state.reducedMotion && !state.reducedAnimations;

  useEffect(() => {
    if (!shouldAnimate || PROFILE_IMAGES.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % PROFILE_IMAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [shouldAnimate]);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <motion.div
        className="relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' as const }}
      >
        {/* Círculo sutil alrededor de la imagen */}
        <div
          className="absolute inset-0 rounded-full border-2 border-amber-400/30"
          style={{
            width: 'calc(100% + 16px)',
            height: 'calc(100% + 16px)',
            left: '-8px',
            top: '-8px',
          }}
        />

        {/* Imagen de perfil con escalado progresivo responsivo */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52 2xl:w-60 2xl:h-60">
          <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl border-4 border-white/10">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={PROFILE_IMAGES[currentIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={PROFILE_IMAGES[currentIndex]}
                  alt={`Tumidev Profile Avatar ${currentIndex + 1}`}
                  fill
                  className="object-cover rounded-full transition-transform duration-300 hover:scale-105"
                  priority={currentIndex === 0}
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 144px, (max-width: 1280px) 176px, (max-width: 1536px) 208px, 240px"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Overlay sutil para mejorar contraste */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-slate-900/20 pointer-events-none"
            initial={{ opacity: 1 }}
            whileHover={shouldAnimate ? { opacity: 0 } : {}}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
};
