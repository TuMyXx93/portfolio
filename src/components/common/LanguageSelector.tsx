'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { locales, Locale } from '@/lib/i18n/config';

const languageNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

const languageFlags: Record<Locale, string> = {
  es: '🇪🇸',
  en: '🇺🇸',
};

interface LanguageSelectorProps {
  className?: string;
  showFlag?: boolean;
  showName?: boolean;
  direction?: 'up' | 'down';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  showFlag = true,
  showName = true,
  direction = 'down',
}) => {
  const { locale, setLocale, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'down' ? -10 : 10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: direction === 'down' ? -10 : 10,
      scale: 0.95,
    },
  };

  return (
    <div className={`relative ${className}`}>
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={t('nav.language')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {showFlag && (
          <span className="text-lg" role="img" aria-label={languageNames[locale]}>
            {languageFlags[locale]}
          </span>
        )}
        {showName && (
          <span className="text-sm font-medium text-white">
            {languageNames[locale]}
          </span>
        )}
        <svg
          className={`w-4 h-4 text-white transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10 bg-black/20 sm:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className={`absolute z-20 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${
                direction === 'up' ? 'bottom-full mb-2' : 'top-full'
              }`}
              role="listbox"
              aria-label={t('nav.language')}
            >
              {locales.map((lng) => (
                <button
                  key={lng}
                  onClick={() => handleLocaleChange(lng)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    locale === lng
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  role="option"
                  aria-selected={locale === lng}
                >
                  <span className="text-lg" role="img" aria-label={languageNames[lng]}>
                    {languageFlags[lng]}
                  </span>
                  <span className="font-medium">{languageNames[lng]}</span>
                  {locale === lng && (
                    <svg
                      className="w-4 h-4 ml-auto text-blue-600 dark:text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
