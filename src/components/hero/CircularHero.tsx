'use client';
import { motion } from 'framer-motion';
import { ConcentricCircles } from './ConcentricCircles';
import { ProfileImage } from './ProfileImage';
import { HorizontalNavigation } from './HorizontalNavigation';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';
import Image from 'next/image';

export const CircularHero = () => {
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Logo en la esquina superior con entrada animada */}
      <motion.div
        initial={{ opacity: 0, x: -50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' as const }}
        className="absolute top-8 left-8 z-30"
      >
        <motion.div
          whileHover={
            shouldAnimate
              ? {
                  scale: 1.05,
                  filter: 'brightness(1.1)',
                }
              : {}
          }
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

      {/* Imagen de Perfil - Centrada en los círculos */}
      <ProfileImage />

      {/* Contenido Central - Debajo de la imagen */}
      <div className="relative z-20 flex flex-col items-center justify-start min-h-screen pt-[62vh]">
        {/* Contenido de texto */}
        <motion.div
          variants={shouldAnimate ? containerVariants : undefined}
          initial={shouldAnimate ? 'hidden' : undefined}
          animate={shouldAnimate ? 'visible' : { opacity: 1 }}
          className="text-center hero-content max-w-4xl mx-auto px-4"
        >
          {/* Texto Principal */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            className="space-y-1 mb-4"
          >
            <motion.h2
              className="text-sm uppercase text-gray-400 tracking-[8px] font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {t('hero.subtitle')}
            </motion.h2>
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-none -mt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {t('hero.title')}
            </motion.h1>
          </motion.div>

          {/* Navegación Horizontal */}
          <motion.div variants={shouldAnimate ? itemVariants : undefined}>
            <HorizontalNavigation />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
