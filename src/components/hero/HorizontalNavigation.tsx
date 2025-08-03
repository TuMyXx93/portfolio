'use client';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

const navigationItems = [
  { key: 'about', label: 'nav.about' },
  { key: 'experience', label: 'nav.experience' },
  { key: 'skills', label: 'nav.skills' },
  { key: 'projects', label: 'nav.projects' },
];

export const HorizontalNavigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { state, announceToScreenReader } = useAdvancedAccessibility();
  
  // Respetar preferencias de reducción de movimiento
  const shouldAnimate = !state.reducedMotion && !state.reducedAnimations;

  const handleNavigation = (section: string, label: string) => {
    onNavigate(section);
    announceToScreenReader(`Navegando a ${label}`);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="flex flex-wrap justify-center gap-4 md:gap-6"
      role="navigation"
      aria-label="Navegación principal"
    >
      {navigationItems.map((item, index) => {
        const label = t(item.label);
        
        return (
          <motion.button
            key={item.key}
            onClick={() => handleNavigation(item.key, label)}
            className={`
              px-6 py-3 rounded-full border border-amber-400/30 text-amber-400 
              hover:bg-amber-400 hover:text-slate-900 
              focus:bg-amber-400 focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900
              transition-all duration-300 text-sm md:text-base font-medium
              ${state.enhancedFocus ? 'ring-2 ring-offset-2 ring-offset-slate-900' : ''}
            `}
            whileHover={shouldAnimate ? { scale: 1.05 } : {}}
            whileTap={shouldAnimate ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 + index * 0.1 }}
            aria-label={`Ir a sección ${label}`}
          >
            {label}
          </motion.button>
        );
      })}
    </motion.nav>
  );
};
