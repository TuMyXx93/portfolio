import { renderHook, act } from '@testing-library/react';
import { useSmoothTransition } from '../useSmoothTransition';

describe('useSmoothTransition', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  it('should return activeSection initially empty', () => {
    const { result } = renderHook(() =>
      useSmoothTransition(['section1', 'section2'])
    );

    expect(result.current.activeSection).toBe('');
  });

  it('should have scrollToSection function', () => {
    const { result } = renderHook(() =>
      useSmoothTransition(['section1', 'section2'])
    );

    expect(typeof result.current.scrollToSection).toBe('function');
  });

  it('should return an object with activeSection and scrollToSection', () => {
    const { result } = renderHook(() =>
      useSmoothTransition(['section1', 'section2'])
    );

    expect(result.current).toHaveProperty('activeSection');
    expect(result.current).toHaveProperty('scrollToSection');
  });
});
