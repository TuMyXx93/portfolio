'use client';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';
import { useState } from 'react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

const navigationItems = [
  { key: 'about', label: 'nav.about', icon: '👤' },
  { key: 'experience', label: 'nav.experience', icon: '💼' },
  { key: 'skills', label: 'nav.skills', icon: '🚀' },
  { key: 'projects', label: 'nav.projects', icon: '💻' },
];

export const HorizontalNavigation: React.FC<NavigationProps> = ({
  onNavigate,
}) => {
  const { t } = useTranslation();
  const { state, announceToScreenReader } = useAdvancedAccessibility();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Respetar preferencias de reducción de movimiento
  const shouldAnimate = !state.reducedMotion && !state.reducedAnimations;

  const handleNavigation = (section: string, label: string) => {
    onNavigate(section);
    announceToScreenReader(`Navegando a ${label}`);
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
      className="flex flex-wrap justify-center gap-4 md:gap-6"
      role="navigation"
      aria-label="Navegación principal"
    >
      {navigationItems.map((item, index) => {
        const label = t(item.label);
        const isHovered = hoveredItem === item.key;

        return (
          <motion.button
            key={item.key}
            variants={shouldAnimate ? itemVariants : undefined}
            onClick={() => handleNavigation(item.key, label)}
            onMouseEnter={() => setHoveredItem(item.key)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`
              group relative px-6 py-3 rounded-full border border-amber-400/30 text-amber-400 
              hover:bg-amber-400 hover:text-slate-900 
              focus:bg-amber-400 focus:text-slate-900 focus:outline-none 
              focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900
              transition-all duration-300 text-sm md:text-base font-medium overflow-hidden
              ${state.enhancedFocus ? 'ring-2 ring-offset-2 ring-offset-slate-900' : ''}
              ${isHovered ? 'shadow-lg shadow-amber-400/20' : ''}
            `}
            whileHover={
              shouldAnimate
                ? {
                    scale: 1.05,
                    boxShadow: '0 10px 20px rgba(251, 191, 36, 0.2)',
                  }
                : {}
            }
            whileTap={shouldAnimate ? { scale: 0.95 } : {}}
            aria-label={`Ir a sección ${label}`}
          >
            {/* Efecto de onda en hover */}
            {shouldAnimate && isHovered && (
              <motion.div
                className="absolute inset-0 bg-amber-400/10 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.6 }}
              />
            )}

            {/* Contenido del botón */}
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-lg">{item.icon}</span>
              <span>{label}</span>
            </span>

            {/* Borde animado */}
            {shouldAnimate && (
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-amber-400"
                initial={{ width: 0 }}
                animate={{ width: isHovered ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.nav>
  );
};
