'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

export const ProfileImage = () => {
  const { state } = useAdvancedAccessibility();

  // Respetar preferencias de reducción de movimiento
  const shouldAnimate = !state.reducedMotion && !state.reducedAnimations;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <motion.div
        className="relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' as const }}
      >
        {/* Círculo palpitante alrededor de la imagen */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/20"
          animate={
            shouldAnimate
              ? {
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }
              : {}
          }
          transition={
            shouldAnimate
              ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut' as const,
                }
              : {}
          }
          style={{
            width: 'calc(100% + 16px)',
            height: 'calc(100% + 16px)',
            left: '-8px',
            top: '-8px',
          }}
        />

        {/* Imagen de perfil centrada exactamente en el medio */}
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl border-4 border-white/10">
            <Image
              src="/images/profile.png"
              alt="Tumidev Profile"
              fill
              className="object-cover rounded-full transition-transform duration-300 hover:scale-105"
              priority
              sizes="(max-width: 768px) 128px, 160px"
            />
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
