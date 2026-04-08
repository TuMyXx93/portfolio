'use client';
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

// Tipos para el contexto de accesibilidad avanzada
interface AccessibilityState {
  // Visual
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';

  // Motor
  focusVisible: boolean;
  keyboardNavigation: boolean;
  reducedAnimations: boolean;

  // Cognitive
  reducedComplexity: boolean;
  enhancedFocus: boolean;
  readingMode: boolean;

  // Audio/Visual
  audioDescriptions: boolean;
  autoplay: boolean;
  flashingContent: boolean;

  // Screen Reader
  announcements: boolean;
  liveRegions: boolean;

  // Navigation
  skipLinks: boolean;
  breadcrumbs: boolean;
  headingNavigation: boolean;
}

type AccessibilityAction =
  | { type: 'TOGGLE_HIGH_CONTRAST' }
  | { type: 'TOGGLE_REDUCED_MOTION' }
  | { type: 'SET_FONT_SIZE'; payload: AccessibilityState['fontSize'] }
  | {
      type: 'SET_COLOR_BLIND_MODE';
      payload: AccessibilityState['colorBlindMode'];
    }
  | { type: 'TOGGLE_FOCUS_VISIBLE' }
  | { type: 'TOGGLE_KEYBOARD_NAVIGATION' }
  | { type: 'TOGGLE_REDUCED_ANIMATIONS' }
  | { type: 'TOGGLE_REDUCED_COMPLEXITY' }
  | { type: 'TOGGLE_ENHANCED_FOCUS' }
  | { type: 'TOGGLE_READING_MODE' }
  | { type: 'TOGGLE_AUDIO_DESCRIPTIONS' }
  | { type: 'TOGGLE_AUTOPLAY' }
  | { type: 'TOGGLE_FLASHING_CONTENT' }
  | { type: 'TOGGLE_ANNOUNCEMENTS' }
  | { type: 'TOGGLE_LIVE_REGIONS' }
  | { type: 'TOGGLE_SKIP_LINKS' }
  | { type: 'TOGGLE_BREADCRUMBS' }
  | { type: 'TOGGLE_HEADING_NAVIGATION' }
  | { type: 'RESET_ALL' }
  | { type: 'LOAD_PREFERENCES'; payload: Partial<AccessibilityState> };

const initialState: AccessibilityState = {
  // Visual
  highContrast: false,
  reducedMotion: false,
  fontSize: 'medium',
  colorBlindMode: 'none',

  // Motor
  focusVisible: true,
  keyboardNavigation: true,
  reducedAnimations: false,

  // Cognitive
  reducedComplexity: false,
  enhancedFocus: false,
  readingMode: false,

  // Audio/Visual
  audioDescriptions: false,
  autoplay: false,
  flashingContent: true,

  // Screen Reader
  announcements: true,
  liveRegions: true,

  // Navigation
  skipLinks: true,
  breadcrumbs: true,
  headingNavigation: true,
};

function accessibilityReducer(
  state: AccessibilityState,
  action: AccessibilityAction
): AccessibilityState {
  switch (action.type) {
    case 'TOGGLE_HIGH_CONTRAST':
      return { ...state, highContrast: !state.highContrast };
    case 'TOGGLE_REDUCED_MOTION':
      return { ...state, reducedMotion: !state.reducedMotion };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    case 'SET_COLOR_BLIND_MODE':
      return { ...state, colorBlindMode: action.payload };
    case 'TOGGLE_FOCUS_VISIBLE':
      return { ...state, focusVisible: !state.focusVisible };
    case 'TOGGLE_KEYBOARD_NAVIGATION':
      return { ...state, keyboardNavigation: !state.keyboardNavigation };
    case 'TOGGLE_REDUCED_ANIMATIONS':
      return { ...state, reducedAnimations: !state.reducedAnimations };
    case 'TOGGLE_REDUCED_COMPLEXITY':
      return { ...state, reducedComplexity: !state.reducedComplexity };
    case 'TOGGLE_ENHANCED_FOCUS':
      return { ...state, enhancedFocus: !state.enhancedFocus };
    case 'TOGGLE_READING_MODE':
      return { ...state, readingMode: !state.readingMode };
    case 'TOGGLE_AUDIO_DESCRIPTIONS':
      return { ...state, audioDescriptions: !state.audioDescriptions };
    case 'TOGGLE_AUTOPLAY':
      return { ...state, autoplay: !state.autoplay };
    case 'TOGGLE_FLASHING_CONTENT':
      return { ...state, flashingContent: !state.flashingContent };
    case 'TOGGLE_ANNOUNCEMENTS':
      return { ...state, announcements: !state.announcements };
    case 'TOGGLE_LIVE_REGIONS':
      return { ...state, liveRegions: !state.liveRegions };
    case 'TOGGLE_SKIP_LINKS':
      return { ...state, skipLinks: !state.skipLinks };
    case 'TOGGLE_BREADCRUMBS':
      return { ...state, breadcrumbs: !state.breadcrumbs };
    case 'TOGGLE_HEADING_NAVIGATION':
      return { ...state, headingNavigation: !state.headingNavigation };
    case 'RESET_ALL':
      return initialState;
    case 'LOAD_PREFERENCES':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

interface AccessibilityContextType {
  state: AccessibilityState;
  dispatch: React.Dispatch<AccessibilityAction>;
  announceToScreenReader: (
    message: string,
    priority?: 'polite' | 'assertive'
  ) => void;
  applyAccessibilityClasses: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(accessibilityReducer, initialState);

  // Cargar preferencias guardadas
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPreferences = localStorage.getItem(
        'accessibility-preferences-advanced'
      );
      if (savedPreferences) {
        try {
          const preferences = JSON.parse(savedPreferences);
          dispatch({ type: 'LOAD_PREFERENCES', payload: preferences });
        } catch (error) {
          console.error('Error loading accessibility preferences:', error);
        }
      }

      // Detectar preferencias del sistema
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      const prefersHighContrast = window.matchMedia(
        '(prefers-contrast: high)'
      ).matches;

      if (prefersReducedMotion) {
        dispatch({ type: 'TOGGLE_REDUCED_MOTION' });
      }
      if (prefersHighContrast) {
        dispatch({ type: 'TOGGLE_HIGH_CONTRAST' });
      }
    }
  }, []);

  // Guardar preferencias
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'accessibility-preferences-advanced',
        JSON.stringify(state)
      );
    }
  }, [state]);

  // Aplicar clases CSS basadas en el estado
  const applyAccessibilityClasses = useCallback(() => {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;

    // Limpiar clases anteriores
    html.classList.remove(
      'high-contrast',
      'reduced-motion',
      'text-small',
      'text-medium',
      'text-large',
      'text-extra-large',
      'protanopia',
      'deuteranopia',
      'tritanopia',
      'focus-visible',
      'reduced-animations',
      'reduced-complexity',
      'enhanced-focus',
      'reading-mode'
    );

    // Aplicar nuevas clases
    if (state.highContrast) html.classList.add('high-contrast');
    if (state.reducedMotion) html.classList.add('reduced-motion');
    if (state.fontSize !== 'medium')
      html.classList.add(`text-${state.fontSize}`);
    if (state.colorBlindMode !== 'none')
      html.classList.add(state.colorBlindMode);
    if (state.focusVisible) html.classList.add('focus-visible');
    if (state.reducedAnimations) html.classList.add('reduced-animations');
    if (state.reducedComplexity) html.classList.add('reduced-complexity');
    if (state.enhancedFocus) html.classList.add('enhanced-focus');
    if (state.readingMode) html.classList.add('reading-mode');
  }, [state]);

  // Aplicar clases cuando cambie el estado
  useEffect(() => {
    applyAccessibilityClasses();
  }, [applyAccessibilityClasses]);

  // Función para anunciar a lectores de pantalla
  const announceToScreenReader = (
    message: string,
    priority: 'polite' | 'assertive' = 'polite'
  ) => {
    if (!state.announcements || typeof document === 'undefined') return;

    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remover después de un tiempo
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const contextValue = {
    state,
    dispatch,
    announceToScreenReader,
    applyAccessibilityClasses,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAdvancedAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      'useAdvancedAccessibility must be used within an AccessibilityProvider'
    );
  }
  return context;
}

export default AccessibilityProvider;
