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

  it('should detect active section on scroll and trigger onTransition callback', () => {
    const section1 = document.createElement('div');
    section1.id = 'section1';
    const section2 = document.createElement('div');
    section2.id = 'section2';
    document.body.appendChild(section1);
    document.body.appendChild(section2);

    window.innerHeight = 1000;
    jest.spyOn(section1, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      bottom: 800,
      left: 0,
      right: 0,
      width: 500,
      height: 700,
      x: 0,
      y: 100,
      toJSON: () => {},
    });
    jest.spyOn(section2, 'getBoundingClientRect').mockReturnValue({
      top: 900,
      bottom: 1600,
      left: 0,
      right: 0,
      width: 500,
      height: 700,
      x: 0,
      y: 900,
      toJSON: () => {},
    });

    const onTransition = jest.fn();
    const { result } = renderHook(() =>
      useSmoothTransition(['section1', 'section2'], { threshold: 0.5, onTransition })
    );

    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(result.current.activeSection).toBe('section1');
    expect(onTransition).toHaveBeenCalledWith('section1');

    jest.spyOn(section1, 'getBoundingClientRect').mockReturnValue({
      top: -600,
      bottom: 100,
      left: 0,
      right: 0,
      width: 500,
      height: 700,
      x: 0,
      y: -600,
      toJSON: () => {},
    });
    jest.spyOn(section2, 'getBoundingClientRect').mockReturnValue({
      top: 200,
      bottom: 900,
      left: 0,
      right: 0,
      width: 500,
      height: 700,
      x: 0,
      y: 200,
      toJSON: () => {},
    });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
      jest.advanceTimersByTime(150);
    });

    expect(result.current.activeSection).toBe('section2');
    expect(onTransition).toHaveBeenCalledWith('section2');

    document.body.innerHTML = '';
  });

  it('should scroll into view when scrollToSection is called with existing element', () => {
    const target = document.createElement('div');
    target.id = 'hero-section';
    const scrollIntoViewMock = jest.fn();
    target.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(target);

    const { result } = renderHook(() =>
      useSmoothTransition(['hero-section'])
    );

    act(() => {
      result.current.scrollToSection('hero-section');
    });

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
    document.body.innerHTML = '';
  });

  it('should gracefully handle scrollToSection when element does not exist', () => {
    const { result } = renderHook(() =>
      useSmoothTransition(['non-existent'])
    );

    expect(() => {
      act(() => {
        result.current.scrollToSection('non-existent');
      });
    }).not.toThrow();
  });
});
