'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Locale, defaultLocale, locales, Translation } from './config';
import { translations } from './translations';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, interpolations?: Record<string, string>) => string;
  formatMessage: (
    key: string,
    interpolations?: Record<string, string>
  ) => string;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale || defaultLocale);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Sync browser or stored locale after initial mount to prevent hydration mismatch
    const savedLocale = localStorage.getItem('locale') as Locale;
    const browserLocale = navigator.language.split('-')[0] as Locale;
    const detected =
      (savedLocale && locales.includes(savedLocale) ? savedLocale : null) ||
      (locales.includes(browserLocale) ? browserLocale : null);

    if (detected && locales.includes(detected) && detected !== locale) {
      queueMicrotask(() => {
        setLocale(detected);
      });
    }
  }, [locale]);

  useEffect(() => {
    // Save locale to localStorage and update document
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const getNestedTranslation = (obj: Translation, path: string): string => {
    const keys = path.split('.');
    let current: any = obj;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return path; // Return key if not found
      }
    }

    return typeof current === 'string' ? current : path;
  };

  const t = (key: string, interpolations?: Record<string, string>): string => {
    const translation = getNestedTranslation(translations[locale], key);

    if (!interpolations) return translation;

    // Replace interpolation patterns {{key}} with values
    return translation.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return interpolations[key] || match;
    });
  };

  const formatMessage = t; // Alias for consistency

  const handleSetLocale = (newLocale: Locale) => {
    if (locales.includes(newLocale)) {
      setLocale(newLocale);
    }
  };

  const value: I18nContextType = {
    locale,
    setLocale: handleSetLocale,
    t,
    formatMessage,
    isLoading,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}

// Hook for locale-specific formatting
export function useLocaleFormatting() {
  const { locale } = useTranslation();

  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(
      locale === 'es' ? 'es-ES' : 'en-US',
      options
    ).format(date);
  };

  const formatNumber = (number: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(
      locale === 'es' ? 'es-ES' : 'en-US',
      options
    ).format(number);
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const formatRelativeTime = (
    value: number,
    unit: Intl.RelativeTimeFormatUnit
  ) => {
    return new Intl.RelativeTimeFormat(
      locale === 'es' ? 'es-ES' : 'en-US'
    ).format(value, unit);
  };

  return {
    formatDate,
    formatNumber,
    formatCurrency,
    formatRelativeTime,
  };
}
