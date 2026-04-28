import { renderHook, act } from '@testing-library/react';
import { useLoadingState } from '../useLoadingState';

describe('useLoadingState', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return initial loading state', () => {
    const { result } = renderHook(() => useLoadingState());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it('should start loading', () => {
    const { result } = renderHook(() => useLoadingState());

    act(() => {
      result.current.startLoading();
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.progress).toBe(0);
  });

  it('should update progress', () => {
    const { result } = renderHook(() => useLoadingState());

    act(() => {
      result.current.startLoading();
      result.current.updateProgress(50);
    });

    expect(result.current.progress).toBe(50);
  });

  it('should cap progress at 100', () => {
    const { result } = renderHook(() => useLoadingState());

    act(() => {
      result.current.updateProgress(150);
    });

    expect(result.current.progress).toBe(100);
  });

  it('should finish loading with delay', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useLoadingState());

    act(() => {
      result.current.startLoading();
      result.current.finishLoading();
    });

    expect(result.current.progress).toBe(100);
    expect(result.current.isLoading).toBe(true);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.isLoading).toBe(false);
  });
});
