import { renderHook, act } from '@testing-library/react';
import {
  useSystemPreferences,
  useKeyboardNavigation,
  useScreenReader,
} from '../useAdvancedAccessibility';

describe('useAdvancedAccessibility - useSystemPreferences', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(query => ({
        matches: false,
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
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should return initial system preferences', () => {
    const { result } = renderHook(() => useSystemPreferences());

    expect(result.current.prefersReducedMotion).toBe(false);
    expect(result.current.prefersHighContrast).toBe(false);
    expect(result.current.prefersDarkMode).toBe(false);
    expect(result.current.prefersReducedTransparency).toBe(false);
  });

  it('should detect prefersReducedMotion from system', () => {
    (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useSystemPreferences());

    expect(result.current.prefersReducedMotion).toBe(true);
  });
});

describe('useAdvancedAccessibility - useKeyboardNavigation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should return false initially', () => {
    const { result } = renderHook(() => useKeyboardNavigation());

    expect(result.current).toBe(false);
  });

  it('should detect keyboard user when Tab is pressed', () => {
    const { result } = renderHook(() => useKeyboardNavigation());

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      (document.addEventListener as jest.Mock).mock.calls.forEach(
        ([eventName, handler]) => {
          if (eventName === 'keydown') {
            handler(event);
          }
        }
      );
    });
  });
});

describe('useAdvancedAccessibility - useScreenReader', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(query => ({
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
      writable: true,
    });
    Object.defineProperty(document, 'querySelector', {
      value: jest.fn(() => null),
      writable: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should return false when no screen reader detected', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0',
      writable: true,
    });

    const { result } = renderHook(() => useScreenReader());

    expect(result.current).toBe(false);
  });
});
