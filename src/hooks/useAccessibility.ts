import { useState, useEffect } from 'react';

interface AccessibilityPreferences {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  reducedMotion: boolean;
}

const getInitialPreferences = (): AccessibilityPreferences => {
  if (typeof window === 'undefined') {
    return { highContrast: false, fontSize: 'normal', reducedMotion: false };
  }
  const savedPreferences = localStorage.getItem('accessibility-preferences');
  if (savedPreferences) {
    return JSON.parse(savedPreferences);
  }
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  return {
    highContrast: false,
    fontSize: 'normal',
    reducedMotion: prefersReducedMotion,
  };
};

export const useAccessibility = () => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(
    getInitialPreferences
  );

  const updatePreferences = (
    newPreferences: Partial<AccessibilityPreferences>
  ) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPreferences };
      localStorage.setItem(
        'accessibility-preferences',
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  useEffect(() => {
    // Aplicar clases CSS según las preferencias
    document.documentElement.classList.toggle(
      'high-contrast',
      preferences.highContrast
    );
    document.documentElement.classList.toggle(
      'reduced-motion',
      preferences.reducedMotion
    );
    document.documentElement.classList.remove(
      'text-normal',
      'text-large',
      'text-xlarge'
    );
    document.documentElement.classList.add(`text-${preferences.fontSize}`);
  }, [preferences]);

  return { preferences, updatePreferences };
};
