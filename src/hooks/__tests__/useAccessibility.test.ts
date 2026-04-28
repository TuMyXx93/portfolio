import { renderHook, act } from '@testing-library/react';
import { useAccessibility } from '../useAccessibility';

describe('useAccessibility', () => {
  const originalLocalStorage = window.localStorage;

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
      writable: true,
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
    });
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should return initial preferences', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    (window.matchMedia as jest.Mock).mockReturnValue({ matches: false });

    const { result } = renderHook(() => useAccessibility());

    expect(result.current.preferences.highContrast).toBe(false);
    expect(result.current.preferences.fontSize).toBe('normal');
    expect(result.current.preferences.reducedMotion).toBe(false);
  });

  it('should load saved preferences', () => {
    const savedPrefs = JSON.stringify({
      highContrast: true,
      fontSize: 'large',
      reducedMotion: true,
    });
    (window.localStorage.getItem as jest.Mock).mockReturnValue(savedPrefs);
    (window.matchMedia as jest.Mock).mockReturnValue({ matches: false });

    const { result } = renderHook(() => useAccessibility());

    expect(result.current.preferences.highContrast).toBe(true);
    expect(result.current.preferences.fontSize).toBe('large');
    expect(result.current.preferences.reducedMotion).toBe(true);
  });

  it('should have updatePreferences function', () => {
    const { result } = renderHook(() => useAccessibility());

    expect(typeof result.current.updatePreferences).toBe('function');
  });

  it('should update preferences', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    (window.matchMedia as jest.Mock).mockReturnValue({ matches: false });

    const { result } = renderHook(() => useAccessibility());

    act(() => {
      result.current.updatePreferences({ highContrast: true });
    });

    expect(result.current.preferences.highContrast).toBe(true);
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });
});
