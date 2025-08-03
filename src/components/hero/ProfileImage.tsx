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
      transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
        {/* Anillo exterior principal */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-amber-400 glow-amber"
          animate={shouldAnimate ? { rotate: 360 } : {}}
          transition={shouldAnimate ? {
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          } : {}}
        />
        
        {/* Anillo secundario contra-rotatorio */}
        {shouldAnimate && (
          <motion.div
            className="absolute inset-1 rounded-full border border-amber-300 opacity-50"
            animate={{ rotate: -360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
        
        {/* Imagen de perfil */}
        <div className="absolute inset-2 rounded-full overflow-hidden shadow-xl">
          <Image
            src="/images/profile.png"
            alt="Tumidev Profile"
            fill
            className="object-cover rounded-full transition-transform duration-300 hover:scale-110"
            priority
            sizes="(max-width: 768px) 128px, 160px"
          />
        </div>
        
        {/* Overlay interactivo con efecto hover */}
        <motion.div
          className="absolute inset-2 rounded-full bg-gradient-to-b from-transparent via-transparent to-slate-900/30 pointer-events-none"
          initial={{ opacity: 1 }}
          whileHover={shouldAnimate ? { opacity: 0 } : {}}
          transition={{ duration: 0.3 }}
        />
        
        {/* Puntos decorativos orbitales */}
        {shouldAnimate && (
          <>
            <motion.div
              className="absolute w-2 h-2 bg-amber-400 rounded-full"
              style={{
                top: '10%',
                left: '50%',
                transformOrigin: '0 80px',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full"
              style={{
                top: '50%',
                right: '5%',
                transformOrigin: '-60px 0',
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </>
        )}
      </div>
    </motion.div>
  );
};
