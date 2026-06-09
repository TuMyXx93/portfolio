'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  variant?: 'glass' | 'bordered' | 'plain';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const variantClasses = {
  glass:
    'bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20',
  bordered: 'border border-gray-700 hover:border-gray-600',
  plain: '',
};

const paddingClasses = {
  none: '',
  sm: 'p-4 md:p-5',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-10',
};

export const Card = ({
  children,
  variant = 'glass',
  padding = 'md',
  hover = true,
  className = '',
  onClick,
}: CardProps) => {
  const baseClasses = [
    'rounded-xl transition-all duration-300',
    variantClasses[variant],
    paddingClasses[padding],
    hover && !onClick ? 'hover:shadow-lg hover:shadow-amber-500/5' : '',
    onClick ? 'cursor-pointer hover:shadow-lg hover:shadow-amber-500/10' : '',
    className,
  ].join(' ');

  if (onClick) {
    return (
      <motion.div
        className={baseClasses}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{children}</div>;
};
