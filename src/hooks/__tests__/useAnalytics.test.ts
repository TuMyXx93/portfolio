import { renderHook } from '@testing-library/react';
import { useAnalytics, useAutoTracking } from '../useAnalytics';

describe('useAnalytics', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return tracking functions', () => {
    const { result } = renderHook(() => useAnalytics());

    expect(typeof result.current.trackEvent).toBe('function');
    expect(typeof result.current.trackPageView).toBe('function');
    expect(typeof result.current.trackClick).toBe('function');
    expect(typeof result.current.trackFormSubmit).toBe('function');
    expect(typeof result.current.trackError).toBe('function');
  });

  it('should have trackEvent function', () => {
    const { result } = renderHook(() => useAnalytics());

    expect(typeof result.current.trackEvent).toBe('function');
  });

  it('should have trackPageView function', () => {
    const { result } = renderHook(() => useAnalytics());

    expect(typeof result.current.trackPageView).toBe('function');
  });
});

describe('useAutoTracking', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.addEventListener = jest.fn();
    window.addEventListener = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should exist and be a function', () => {
    expect(typeof useAutoTracking).toBe('function');
  });
});
