'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

interface HeaderProps {
  links: Array<{
    title: string;
    href: string;
  }>;
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

export const Header = ({ links, activeSection, onNavigate }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    onNavigate?.(sectionId);
  };

  return (
    <motion.header
      className="sticky top-0 w-full flex items-center justify-between z-50 px-5 py-3 glass-effect"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      role="banner"
    >
      <div className="flex items-center gap-4">
        <a
          href="#home"
          onClick={e => handleClick(e, '#home')}
          aria-label="Ir al inicio"
          className="text-gradient font-bold text-xl"
        >
          TumiDev
        </a>
        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-full glass-effect"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </motion.button>
      </div>
      <nav aria-label="Navegación principal">
        <ul className="flex items-center space-x-8">
          {links.map(link => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={e => handleClick(e, link.href)}
                  className={`text-gray-400 hover:text-primary-dark dark:hover:text-primary-light transition-colors ${
                    isActive ? 'text-primary-dark dark:text-primary-light' : ''
                  }`}
                  aria-label={`Ir a la sección ${link.title}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
};
