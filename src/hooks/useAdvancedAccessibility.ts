'use client';
import { useState, useEffect } from 'react';

interface SystemPreferences {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersDarkMode: boolean;
  prefersReducedTransparency: boolean;
}

export const useSystemPreferences = (): SystemPreferences => {
  const [preferences, setPreferences] = useState<SystemPreferences>({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersDarkMode: false,
    prefersReducedTransparency: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updatePreferences = () => {
      setPreferences({
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        prefersHighContrast: window.matchMedia('(prefers-contrast: high)').matches,
        prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
        prefersReducedTransparency: window.matchMedia('(prefers-reduced-transparency: reduce)').matches,
      });
    };

    // Initial check
    updatePreferences();

    // Set up listeners for preference changes
    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: high)'),
      window.matchMedia('(prefers-color-scheme: dark)'),
      window.matchMedia('(prefers-reduced-transparency: reduce)'),
    ];

    mediaQueries.forEach(mq => {
      mq.addEventListener('change', updatePreferences);
    });

    return () => {
      mediaQueries.forEach(mq => {
        mq.removeEventListener('change', updatePreferences);
      });
    };
  }, []);

  return preferences;
};

export const useKeyboardNavigation = () => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isKeyboardUser;
};

export const useScreenReader = () => {
  const [isScreenReader, setIsScreenReader] = useState(false);

  useEffect(() => {
    // Detect screen reader usage through various methods
    const detectScreenReader = () => {
      // Check for screen reader specific attributes
      const hasScreenReaderAttributes = document.querySelector('[aria-live], [aria-label], [role]');
      
      // Check for common screen reader user agents
      const userAgent = navigator.userAgent.toLowerCase();
      const screenReaderUAs = ['nvda', 'jaws', 'voiceover', 'orca', 'talkback'];
      const hasScreenReaderUA = screenReaderUAs.some(sr => userAgent.includes(sr));
      
      // Check for high contrast mode (often used with screen readers)
      const hasHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
      
      // Check for forced colors mode
      const hasForcedColors = window.matchMedia('(forced-colors: active)').matches;

      setIsScreenReader(Boolean(hasScreenReaderAttributes || hasScreenReaderUA || hasHighContrast || hasForcedColors));
    };

    detectScreenReader();

    // Re-check when preferences change
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    const forcedColorsQuery = window.matchMedia('(forced-colors: active)');

    contrastQuery.addEventListener('change', detectScreenReader);
    forcedColorsQuery.addEventListener('change', detectScreenReader);

    return () => {
      contrastQuery.removeEventListener('change', detectScreenReader);
      forcedColorsQuery.removeEventListener('change', detectScreenReader);
    };
  }, []);

  return isScreenReader;
};

export const useFocusManagement = () => {
  const [focusedElement, setFocusedElement] = useState<Element | null>(null);
  const [focusHistory, setFocusHistory] = useState<Element[]>([]);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      if (e.target instanceof Element) {
        setFocusedElement(e.target);
        setFocusHistory(prev => [...prev.slice(-9), e.target as Element]);
      }
    };

    const handleFocusOut = () => {
      setFocusedElement(null);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const returnToPreviousFocus = () => {
    const previousElement = focusHistory[focusHistory.length - 2];
    if (previousElement && previousElement instanceof HTMLElement) {
      previousElement.focus();
    }
  };

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  };

  return {
    focusedElement,
    focusHistory,
    returnToPreviousFocus,
    trapFocus,
  };
};

export const useAnnouncements = () => {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const liveRegion = document.getElementById(`live-region-${priority}`);
    if (liveRegion) {
      // Clear and then set the message to ensure it's announced
      liveRegion.textContent = '';
      setTimeout(() => {
        liveRegion.textContent = message;
      }, 10);
    }
  };

  const announceStatus = (message: string) => {
    const statusRegion = document.getElementById('live-region-status');
    if (statusRegion) {
      statusRegion.textContent = '';
      setTimeout(() => {
        statusRegion.textContent = message;
      }, 10);
    }
  };

  const clearAnnouncements = () => {
    const regions = [
      'live-region-polite',
      'live-region-assertive',
      'live-region-status'
    ];
    
    regions.forEach(id => {
      const region = document.getElementById(id);
      if (region) {
        region.textContent = '';
      }
    });
  };

  return {
    announce,
    announceStatus,
    clearAnnouncements,
  };
};
