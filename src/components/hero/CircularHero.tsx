'use client';
import { motion } from 'framer-motion';
import { ConcentricCircles } from './ConcentricCircles';
import { ProfileImage } from './ProfileImage';
import { HorizontalNavigation } from './HorizontalNavigation';
import { useTranslation } from '@/lib/i18n/useTranslation';
import Image from 'next/image';

interface CircularHeroProps {
  onNavigate: (section: string) => void;
}

export const CircularHero: React.FC<CircularHeroProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Logo en la esquina superior */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-8 left-8 z-30"
      >
        <Image
          src="/images/logo.png"
          alt="Tumidev Logo"
          width={150}
          height={50}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Círculos Concéntricos de Fondo */}
      <ConcentricCircles />
      
      {/* Contenido Central */}
      <div className="relative z-20 text-center">
        {/* Imagen de Perfil */}
        <ProfileImage />
        
        {/* Texto Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 mb-12"
        >
          <h2 className="text-sm uppercase text-gray-400 tracking-[8px] mb-4 font-light">
            {t('hero.subtitle')}
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
            {t('hero.title')}
          </h1>
        </motion.div>
        
        {/* Navegación Horizontal */}
        <HorizontalNavigation onNavigate={onNavigate} />
      </div>
    </section>
  );
};
