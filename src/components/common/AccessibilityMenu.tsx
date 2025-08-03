'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessibilityMenuProps {
  onHighContrastToggle: () => void;
  isHighContrast: boolean;
}

export const AccessibilityMenu = ({
  onHighContrastToggle,
  isHighContrast,
}: AccessibilityMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-primary-dark dark:bg-primary-light text-background-dark dark:text-background-light"
        aria-label="Abrir menú de accesibilidad"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 p-4 rounded-lg glass-effect shadow-lg"
            role="dialog"
            aria-label="Menú de accesibilidad"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-1"
              aria-label="Cerrar menú de accesibilidad"
            >
              ✕
            </button>
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-2">Accesibilidad</h3>
              <div className="flex items-center justify-between gap-4">
                <span>Alto contraste</span>
                <button
                  onClick={onHighContrastToggle}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    isHighContrast ? 'bg-primary-dark' : 'bg-gray-400'
                  }`}
                  role="switch"
                  aria-checked={isHighContrast}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      isHighContrast ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="text-sm text-gray-400">
                <p>Atajos de teclado:</p>
                <ul className="mt-2 space-y-1">
                  <li>Alt + A: Abrir/cerrar menú</li>
                  <li>↑/↓: Navegar secciones</li>
                  <li>Alt + T: Cambiar tema</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
