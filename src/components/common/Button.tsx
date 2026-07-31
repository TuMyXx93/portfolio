'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'navigation'
  | 'overlay'
  | 'overlayWhite'
  | 'submit'
  | 'icon';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'full';
export type ButtonShape = 'pill' | 'rounded' | 'circle';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-amber-500 hover:bg-amber-600 text-black font-medium',
  secondary:
    'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-medium',
  ghost:
    'border border-[#242424] text-gray-500 hover:border-amber-400 hover:text-amber-400',
  navigation:
    'border border-amber-400/30 text-amber-400 hover:bg-amber-400 hover:text-slate-900',
  overlay: 'bg-[#F7AB0A] text-black text-sm font-medium hover:bg-[#F7AB0A]/80',
  overlayWhite: 'bg-white text-black text-sm font-medium hover:bg-white/80',
  submit:
    'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed',
  icon: 'bg-amber-500 hover:bg-amber-600 text-white p-3',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm md:text-base',
  lg: 'px-8 py-4 text-base',
  full: 'w-full px-6 py-3 text-base',
};

const shapeClasses: Record<ButtonShape, string> = {
  pill: 'rounded-full',
  rounded: 'rounded-lg',
  circle: 'rounded-full',
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      shape = 'rounded',
      href,
      target,
      rel,
      disabled = false,
      loading = false,
      icon,
      iconPosition = 'left',
      children,
      className = '',
      ariaLabel,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      type = 'button',
    },
    ref
  ) => {
    const isSubmit = variant === 'submit';
    const isDisabled = disabled || loading;

    const baseClasses =
      'inline-flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 overflow-hidden relative';

    const motionProps = {
      whileHover: !isDisabled ? { scale: isSubmit ? 1.02 : 1.05 } : undefined,
      whileTap: !isDisabled ? { scale: isSubmit ? 0.98 : 0.95 } : undefined,
    };

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      shapeClasses[shape],
      isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className,
    ].join(' ');

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2 flex-shrink-0">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2 flex-shrink-0">{icon}</span>
        )}
      </>
    );

    const eventHandlers = {
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    };

    if (href) {
      return (
        <motion.a
          href={href}
          target={target}
          rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
          className={classes}
          aria-label={ariaLabel}
          {...motionProps}
          {...eventHandlers}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        {...motionProps}
        {...eventHandlers}
        ref={ref as React.Ref<HTMLButtonElement>}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
