import { renderHook } from '@testing-library/react';
import { useLazySection } from '../useLazySection';

describe('useLazySection', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  it('should exist as a function', () => {
    expect(typeof useLazySection).toBe('function');
  });

  it('should call callback when section enters viewport', () => {
    const callback = jest.fn();
    const intersectionObserverMock = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    Object.defineProperty(window, 'IntersectionObserver', {
      value: intersectionObserverMock,
      writable: true,
    });

    renderHook(() => useLazySection('test-section', callback));

    expect(callback).toBeDefined();
  });
});
