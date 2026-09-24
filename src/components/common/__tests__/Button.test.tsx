import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Button } from '@/components/common/Button';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = jest.requireActual('react');
  const MockButton = React.forwardRef(({ children, whileHover, whileTap, ...props }: any, ref: any) => (
    <button ref={ref} {...props}>{children}</button>
  ));
  MockButton.displayName = 'MockMotionButton';

  const MockA = React.forwardRef(({ children, whileHover, whileTap, ...props }: any, ref: any) => (
    <a ref={ref} {...props}>{children}</a>
  ));
  MockA.displayName = 'MockMotionA';

  return {
    motion: {
      button: MockButton,
      a: MockA,
    },
  };
});

describe('Button component', () => {
  test('renders standard button with text', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('type', 'button');
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Action</Button>);
    fireEvent.click(screen.getByRole('button', { name: /action/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders as anchor link when href is provided', () => {
    render(
      <Button href="https://example.com" target="_blank" download="cv.pdf">
        Download CV
      </Button>
    );
    const link = screen.getByRole('link', { name: /download cv/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('download', 'cv.pdf');
  });

  test('disables button when disabled prop is true', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const btn = screen.getByRole('button', { name: /disabled/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('shows loading spinner when loading is true and is disabled', () => {
    const handleClick = jest.fn();
    render(<Button loading onClick={handleClick}>Save</Button>);
    const btn = screen.getByRole('button', { name: /save/i });
    expect(btn).toBeDisabled();
    expect(btn.querySelector('svg.animate-spin')).toBeInTheDocument();
  });

  test('renders icons in left and right positions', () => {
    const { rerender } = render(
      <Button icon={<span data-testid="icon-left">Icon</span>} iconPosition="left">
        Button with Icon
      </Button>
    );
    expect(screen.getByTestId('icon-left')).toBeInTheDocument();

    rerender(
      <Button icon={<span data-testid="icon-right">Icon</span>} iconPosition="right">
        Button with Icon
      </Button>
    );
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });

  test('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-amber-500');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-amber-500');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-[#242424]');

    rerender(<Button variant="navigation">Navigation</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-amber-400');

    rerender(<Button variant="overlayWhite">Overlay White</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-white');

    rerender(<Button variant="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveClass('from-amber-500');
  });

  test('handles mouse and focus events', () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(
      <Button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        Hover & Focus
      </Button>
    );

    const btn = screen.getByRole('button');
    fireEvent.mouseEnter(btn);
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(btn);
    expect(handleMouseLeave).toHaveBeenCalledTimes(1);

    fireEvent.focus(btn);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(btn);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});