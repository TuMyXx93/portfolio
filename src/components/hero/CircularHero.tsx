'use client';
import { motion } from 'framer-motion';
import { ConcentricCircles } from './ConcentricCircles';
import { ProfileImage } from './ProfileImage';
import { HorizontalNavigation } from './HorizontalNavigation';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';
import Image from 'next/image';

interface CircularHeroProps {
  onNavigate: (section: string) => void;
}

export const CircularHero: React.FC<CircularHeroProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { state } = useAdvancedAccessibility();
  
  // Respetar preferencias de reducción de movimiento
  const shouldAnimate = !state.reducedMotion && !state.reducedAnimations;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Logo en la esquina superior con entrada animada */}
      <motion.div
        initial={{ opacity: 0, x: -50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-8 left-8 z-30"
      >
        <motion.div
          whileHover={shouldAnimate ? { 
            scale: 1.05,
            filter: "brightness(1.1)"
          } : {}}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/images/logo.png"
            alt="Tumidev Logo"
            width={150}
            height={50}
            className="object-contain filter drop-shadow-lg"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Círculos Concéntricos de Fondo */}
      <ConcentricCircles />
      
      {/* Contenido Central */}
      <motion.div
        variants={shouldAnimate ? containerVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : { opacity: 1 }}
        className="relative z-20 text-center hero-content"
      >
        {/* Imagen de Perfil */}
        <motion.div variants={shouldAnimate ? itemVariants : undefined}>
          <ProfileImage />
        </motion.div>
        
        {/* Texto Principal */}
        <motion.div
          variants={shouldAnimate ? itemVariants : undefined}
          className="mt-8 mb-12 hero-text"
        >
          <motion.h2 
            className="text-sm uppercase text-gray-400 tracking-[8px] mb-4 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {t('hero.subtitle')}
          </motion.h2>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {t('hero.title')}
          </motion.h1>
        </motion.div>
        
        {/* Navegación Horizontal */}
        <motion.div variants={shouldAnimate ? itemVariants : undefined}>
          <HorizontalNavigation onNavigate={onNavigate} />
        </motion.div>
      </motion.div>

      {/* Elementos decorativos adicionales */}
      {shouldAnimate && (
        <>
          {/* Partículas flotantes */}
          <motion.div
            className="absolute top-20 left-1/4 w-1 h-1 bg-amber-400 rounded-full particle"
            animate={{ 
              y: [-100, -200],
              x: [0, 50],
              opacity: [0, 1, 0],
              scale: [1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-32 right-1/3 w-1.5 h-1.5 bg-amber-300 rounded-full particle"
            animate={{ 
              y: [100, 0],
              x: [0, -30],
              opacity: [0, 1, 0],
              scale: [0.5, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 3
            }}
          />
        </>
      )}

      {/* Indicador de scroll sutil */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-amber-400/30 rounded-full flex justify-center"
          whileHover={{ borderColor: "rgba(251, 191, 36, 0.6)" }}
        >
          <motion.div
            className="w-1 h-3 bg-amber-400 rounded-full mt-2"
            animate={shouldAnimate ? { y: [0, 12, 0] } : {}}
            transition={shouldAnimate ? {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
