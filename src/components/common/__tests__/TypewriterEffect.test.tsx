import { render, screen, act } from '@testing-library/react';
import { TypewriterEffect } from '@/components/common/TypewriterEffect';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    span: ({ children, animate, transition, ...props }: any) => (
      <span {...props}>{children}</span>
    ),
  },
}));

const mockAccessibilityState = {
  reducedMotion: false,
  reducedAnimations: false,
  highContrast: false,
  fontSize: 1,
  screenReader: false,
  keyboardNavigation: false,
  readingMode: false,
  announcements: [],
};

jest.mock('@/contexts/AccessibilityContext', () => ({
  ...jest.requireActual('@/contexts/AccessibilityContext'),
  useAdvancedAccessibility: () => ({
    state: mockAccessibilityState,
    announceToScreenReader: jest.fn(),
  }),
}));

const phrases = ['Hello', 'World', 'Test'];

const renderWithProps = (props = {}) => {
  return render(
    <AccessibilityProvider>
      <TypewriterEffect
        phrases={phrases}
        typingSpeed={50}
        pauseDuration={100}
        fadeDuration={100}
        {...props}
      />
    </AccessibilityProvider>
  );
};

describe('TypewriterEffect', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockAccessibilityState.reducedMotion = false;
    mockAccessibilityState.reducedAnimations = false;
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('renders the first phrase and starts typing', () => {
    renderWithProps();
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(screen.getByText('H')).toBeInTheDocument();
  });

  test('types out the full phrase after delays', () => {
    renderWithProps();
    // 'Hello' = 5 characters * 50ms each
    for (let i = 0; i < 5; i++) {
      act(() => {
        jest.advanceTimersByTime(50);
      });
    }
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  test('cycles to the next phrase after pause and fade', () => {
    renderWithProps();
    // Type 'Hello'
    for (let i = 0; i < 5; i++) {
      act(() => {
        jest.advanceTimersByTime(50);
      });
    }
    expect(screen.getByText('Hello')).toBeInTheDocument();

    // Wait pause
    act(() => {
      jest.advanceTimersByTime(100);
    });
    // Wait fade
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Next phrase starts typing 'W'
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(screen.getByText('W')).toBeInTheDocument();
  });

  test('shows static first phrase when reducedMotion is enabled', () => {
    mockAccessibilityState.reducedMotion = true;
    renderWithProps();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  test('shows static first phrase when reducedAnimations is enabled', () => {
    mockAccessibilityState.reducedAnimations = true;
    renderWithProps();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  test('renders empty string when phrases array is empty', () => {
    renderWithProps({ phrases: [] });
    const spans = screen.queryAllByText('');
    expect(spans.length).toBeGreaterThan(0);
  });
});
