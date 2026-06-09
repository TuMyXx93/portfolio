import { ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  variant?: 'default' | 'narrow' | 'wide';
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main';
}

const variantClasses = {
  default: 'max-w-7xl mx-auto',
  narrow: 'max-w-3xl mx-auto',
  wide: 'max-w-screen-2xl mx-auto',
};

export const ResponsiveContainer = ({
  children,
  variant = 'default',
  className = '',
  as: Component = 'div',
}: ResponsiveContainerProps) => {
  return (
    <Component
      className={`w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};
