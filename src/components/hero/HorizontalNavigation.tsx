'use client';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';
import { useState } from 'react';

const navigationItems = [
  { key: 'about', label: 'nav.about', icon: '👤' },
  { key: 'experience', label: 'nav.experience', icon: '💼' },
  { key: 'skills', label: 'nav.skills', icon: '🚀' },
  { key: 'projects', label: 'nav.projects', icon: '💻' },
  { key: 'contact', label: 'nav.contact', icon: '✉️' },
];

export const HorizontalNavigation = () => {
  const { t } = useTranslation();
  const { state, announceToScreenReader } = useAdvancedAccessibility();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Respetar preferencias de reducción de movimiento
  const shouldAnimate = !state.reducedMotion && !state.reducedAnimations;

  const handleNavigation = (section: string, label: string) => {
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({
        behavior: shouldAnimate ? 'smooth' : 'auto',
        block: 'start',
      });
    }
    announceToScreenReader(
      t('accessibility.announcements.navigationChanged', { page: label })
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5,
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <motion.nav
      variants={shouldAnimate ? containerVariants : undefined}
      initial={shouldAnimate ? 'hidden' : undefined}
      animate={shouldAnimate ? 'visible' : { opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6"
      role="navigation"
      aria-label="Navegación principal"
    >
      {navigationItems.map((item, index) => {
        const label = t(item.label);
        const isHovered = hoveredItem === item.key;

        return (
          <button
            key={item.key}
            onClick={() => handleNavigation(item.key, label)}
            className={`
              group relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full border border-amber-400/30 text-amber-400 
              hover:bg-amber-400 hover:text-slate-900 hover:scale-105 active:scale-95
              focus:bg-amber-400 focus:text-slate-900 focus:outline-none 
              focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900
              transition-all duration-200 text-xs sm:text-sm md:text-base font-medium overflow-hidden
              min-h-[40px] sm:min-h-[44px] cursor-pointer
              ${state.enhancedFocus ? 'ring-2 ring-offset-2 ring-offset-slate-900' : ''}
            `}
            aria-label={`Ir a sección ${label}`}
          >
            {/* Contenido del botón */}
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg">{item.icon}</span>
              <span suppressHydrationWarning>{label}</span>
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
};
