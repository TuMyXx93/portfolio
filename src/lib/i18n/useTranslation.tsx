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
  const [locale, setLocale] = useState<Locale>(() => {
    if (initialLocale && locales.includes(initialLocale)) {
      return initialLocale;
    }
    if (typeof window === 'undefined') {
      return defaultLocale;
    }
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && locales.includes(savedLocale)) {
      return savedLocale;
    }
    return defaultLocale;
  });
  const [isLoading, setIsLoading] = useState(false);

  const [prevInitialLocale, setPrevInitialLocale] = useState(initialLocale);
  if (
    initialLocale &&
    initialLocale !== prevInitialLocale &&
    locales.includes(initialLocale)
  ) {
    setPrevInitialLocale(initialLocale);
    setLocale(initialLocale);
  }

  useEffect(() => {
    // Sync browser locale after initial mount if no saved preference exists and no initialLocale
    if (!initialLocale) {
      const savedLocale = localStorage.getItem('locale');
      if (!savedLocale) {
        const browserLocale = navigator.language.split('-')[0] as Locale;
        if (
          process.env.NODE_ENV !== 'test' &&
          locales.includes(browserLocale) &&
          browserLocale !== locale
        ) {
          queueMicrotask(() => {
            setLocale(browserLocale);
          });
        }
      }
    }
  }, [locale, initialLocale]);

  useEffect(() => {
    // Save locale to localStorage, cookie and update document
    localStorage.setItem('locale', locale);
    document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
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
      if (typeof window !== 'undefined') {
        localStorage.setItem('locale', newLocale);
        document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        document.documentElement.lang = newLocale;

        const pathname = window.location.pathname;
        const currentPrefix = locales.find(
          l => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
        );
        if (currentPrefix && currentPrefix !== newLocale) {
          const newPath = pathname.replace(`/${currentPrefix}`, `/${newLocale}`);
          window.location.assign(
            newPath + window.location.search + window.location.hash
          );
        } else if (!currentPrefix && (pathname === '/' || pathname === '')) {
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination
          window.location.assign(`/${newLocale}`);
        }
      }
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
