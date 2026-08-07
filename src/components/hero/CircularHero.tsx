'use client';
import { motion } from 'framer-motion';
import { ConcentricCircles } from './ConcentricCircles';
import { ProfileImage } from './ProfileImage';
import { HorizontalNavigation } from './HorizontalNavigation';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';
import { TypewriterEffect } from '@/components/common/TypewriterEffect';
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
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden section-hero">
      {/* Logo en la esquina superior con entrada animada y sutil resplandor ámbar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' as const }}
        className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 z-30 group"
      >
        <div className="absolute -inset-2 bg-amber-400/10 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <Image
          src="/images/logo.png"
          alt="Tumidev Logo"
          width={300}
          height={100}
          className="relative z-10 object-contain w-auto h-16 sm:h-20 md:h-24 hover:scale-105 transition-transform duration-200"
          priority
        />
      </motion.div>

      {/* Círculos Concéntricos de Fondo */}
      <ConcentricCircles />

      {/* Imagen de Perfil - Centrada en los círculos */}
      <ProfileImage />

      {/* Contenido Central - Texto arriba, navegación abajo */}
      <div className="relative z-20 flex flex-col items-center justify-between min-h-[100dvh] py-[15vh] landscape:py-[10vh]">
        {/* TOP: Texto Principal con Typing Effect */}
        <motion.div
          variants={shouldAnimate ? containerVariants : undefined}
          initial={shouldAnimate ? 'hidden' : undefined}
          animate={shouldAnimate ? 'visible' : { opacity: 1 }}
          className="text-center hero-content max-w-4xl mx-auto px-4 mt-8"
        >
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            className="space-y-1 sm:space-y-2"
          >
            <motion.h2
              suppressHydrationWarning
              className="text-xs sm:text-sm uppercase text-gray-400 tracking-[4px] sm:tracking-[8px] font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {t('hero.subtitle')}
            </motion.h2>
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-none -mt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <TypewriterEffect
                phrases={[
                  t('hero.typewriter1'),
                  t('hero.typewriter2'),
                  t('hero.typewriter3'),
                ]}
              />
            </motion.h1>
          </motion.div>
        </motion.div>

        {/* CENTER GAP for ProfileImage */}
        <div className="flex-grow pointer-events-none" />

        {/* BOTTOM: Navegación Horizontal */}
        <motion.div
          variants={shouldAnimate ? containerVariants : undefined}
          initial={shouldAnimate ? 'hidden' : undefined}
          animate={shouldAnimate ? 'visible' : { opacity: 1 }}
          className="text-center hero-content max-w-4xl mx-auto px-4"
        >
          <motion.div variants={shouldAnimate ? itemVariants : undefined}>
            <HorizontalNavigation />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
