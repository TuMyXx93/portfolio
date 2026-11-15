'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { locales, Locale } from '@/lib/i18n/config';

const languageNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

const languageCodes: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
};

interface LanguageSelectorProps {
  className?: string;
  direction?: 'up' | 'down';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
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
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-400/30 bg-[#0d1c30]/80 hover:bg-amber-400/15 hover:border-amber-400 text-amber-400 backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
        aria-label={`${t('nav.language')}: ${languageNames[locale]}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">
          {languageCodes[locale]}
        </span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
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
              className={`absolute right-0 left-auto z-20 mt-2 min-w-[5rem] bg-[#0d1c30]/95 backdrop-blur-md rounded-xl shadow-xl border border-white/15 overflow-hidden ${
                direction === 'up' ? 'bottom-full mb-2' : 'top-full'
              }`}
              role="listbox"
              aria-label={t('nav.language')}
            >
              {locales.map(lng => (
                <button
                  key={lng}
                  onClick={() => handleLocaleChange(lng)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-left transition-colors ${
                    locale === lng
                      ? 'bg-amber-400/15 text-amber-400 font-semibold'
                      : 'text-gray-200 hover:bg-white/10 hover:text-amber-300'
                  }`}
                  role="option"
                  aria-label={languageNames[lng]}
                  aria-selected={locale === lng}
                >
                  <span className="text-xs sm:text-sm tracking-wider uppercase">
                    {languageCodes[lng]}
                  </span>
                  {locale === lng && (
                    <svg
                      className="w-3.5 h-3.5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
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
