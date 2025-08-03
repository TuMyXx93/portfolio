'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

export const ProfileImage = () => {
  const { state } = useAdvancedAccessibility();
  
  // Respetar preferencias de reducción de movimiento
  const shouldAnimate = !state.reducedMotion && !state.reducedAnimations;

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
        {/* Anillo exterior animado */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-amber-400"
          animate={shouldAnimate ? { rotate: 360 } : {}}
          transition={shouldAnimate ? {
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          } : {}}
        />
        
        {/* Imagen de perfil */}
        <div className="absolute inset-2 rounded-full overflow-hidden">
          <Image
            src="/images/profile.png"
            alt="Tumidev Profile"
            fill
            className="object-cover rounded-full"
            priority
            sizes="(max-width: 768px) 128px, 160px"
          />
        </div>
        
        {/* Overlay con efecto hover - Solo si las animaciones están habilitadas */}
        {shouldAnimate && (
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-b from-transparent to-slate-900/20"
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
};
