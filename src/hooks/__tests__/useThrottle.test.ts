import { renderHook, act } from '@testing-library/react';
import { useThrottle } from '../useThrottle';
import { useState } from 'react';

describe('useThrottle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  it('should call callback immediately on first call', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 100));

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should throttle subsequent calls', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 100));

    act(() => {
      result.current();
    });

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should pass arguments to callback', () => {
    const callback = jest.fn((a: number, b: string) => `${a}-${b}`);
    const { result } = renderHook(() => useThrottle(callback, 100));

    act(() => {
      result.current(1, 'test');
    });

    expect(callback).toHaveBeenCalledWith(1, 'test');
  });
});
