import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../useTheme';

describe('useTheme', () => {
  const originalLocalStorage = window.localStorage;
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    jest.useFakeTimers();
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
        matches: query === '(prefers-color-scheme: dark)',
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
  });

  afterEach(() => {
    jest.useRealTimers();
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
    });
    Object.defineProperty(window, 'matchMedia', {
      value: originalMatchMedia,
    });
  });

  it('should return dark theme when no saved preference and system prefers dark', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    (window.matchMedia as jest.Mock).mockReturnValue({ matches: true });

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('dark');
  });

  it('should return light theme when no saved preference and system prefers light', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    (window.matchMedia as jest.Mock).mockReturnValue({ matches: false });

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('light');
  });

  it('should return saved theme when available', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('light');

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('light');
  });

  it('should toggle theme from dark to light', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('dark');

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('should toggle theme from light to dark', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('light');

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });
});
