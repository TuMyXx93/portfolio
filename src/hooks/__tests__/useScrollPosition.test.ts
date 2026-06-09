import { renderHook, act } from '@testing-library/react';
import { useScrollPosition } from '../useScrollPosition';

describe('useScrollPosition', () => {
  const originalScrollY = window.scrollY;

  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });
    window.addEventListener = jest.fn((event, handler) => {
      if (event === 'scroll') {
        (window as unknown as { _scrollHandler: () => void })._scrollHandler =
          handler as () => void;
      }
    });
    window.removeEventListener = jest.fn();
  });

  afterEach(() => {
    Object.defineProperty(window, 'scrollY', {
      value: originalScrollY,
      writable: true,
      configurable: true,
    });
  });

  it('should return initial scroll position of 0', () => {
    Object.defineProperty(window, 'scrollY', { value: 0 });

    const { result } = renderHook(() => useScrollPosition());

    expect(result.current).toBe(0);
  });

  it('should return updated scroll position', () => {
    Object.defineProperty(window, 'scrollY', { value: 100 });

    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      (window as unknown as { _scrollHandler: () => void })._scrollHandler();
    });

    expect(result.current).toBe(100);
  });

  it('should clean up event listener on unmount', () => {
    const { unmount } = renderHook(() => useScrollPosition());

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });
});
