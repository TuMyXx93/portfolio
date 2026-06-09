'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  animated?: boolean;
}

export const SectionHeader = ({
  title,
  subtitle,
  align = 'center',
  className = '',
  animated = true,
}: SectionHeaderProps) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const TitleTag = animated ? motion.h2 : 'h2';
  const SubtitleTag = animated ? motion.p : 'p';

  const animationProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: false, amount: 0.3 },
        transition: { duration: 0.6, ease: 'easeOut' as const },
      }
    : {};

  return (
    <div
      className={`mb-8 md:mb-12 lg:mb-16 ${alignClasses[align]} ${className}`}
    >
      <TitleTag
        className="uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-400 text-fluid-lg md:text-fluid-xl lg:text-fluid-2xl font-light"
        {...animationProps}
      >
        {title}
      </TitleTag>
      {subtitle && (
        <SubtitleTag
          className="mt-3 md:mt-4 text-gray-500 text-fluid-sm md:text-fluid-base max-w-2xl mx-auto"
          {...(animated
            ? {
                initial: { opacity: 0, y: 15 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: false, amount: 0.3 },
                transition: {
                  duration: 0.5,
                  delay: 0.2,
                  ease: 'easeOut' as const,
                },
              }
            : {})}
        >
          {subtitle}
        </SubtitleTag>
      )}
    </div>
  );
};
