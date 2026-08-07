'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '@/constants';

interface SocialLinksProps {
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  showLabels?: boolean;
}

const IconGithub: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const IconLinkedin: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const IconTwitter: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconEmail: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const renderIcon = (id: string, iconClassName: string) => {
  switch (id) {
    case 'github':
      return <IconGithub className={iconClassName} />;
    case 'linkedin':
      return <IconLinkedin className={iconClassName} />;
    case 'twitter':
      return <IconTwitter className={iconClassName} />;
    case 'email':
      return <IconEmail className={iconClassName} />;
    default:
      return null;
  }
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  size = 'md',
  orientation = 'horizontal',
  className = '',
  showLabels = false,
}) => {
  const sizeMap = {
    sm: {
      button: 'w-8 h-8 p-1.5',
      icon: 'w-4 h-4',
      text: 'text-xs',
    },
    md: {
      button: 'w-10 h-10 p-2',
      icon: 'w-5 h-5',
      text: 'text-sm',
    },
    lg: {
      button: 'w-12 h-12 p-2.5',
      icon: 'w-6 h-6',
      text: 'text-base',
    },
  };

  const currentSize = sizeMap[size];

  return (
    <ul
      className={`flex ${
        orientation === 'vertical' ? 'flex-col space-y-3' : 'flex-row space-x-3'
      } items-center justify-center ${className}`}
    >
      {SOCIAL_LINKS.map(link => (
        <li key={link.id}>
          <motion.a
            href={link.href}
            target={link.id === 'email' ? '_self' : '_blank'}
            rel={link.id === 'email' ? undefined : 'noopener noreferrer'}
            aria-label={link.ariaLabel}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-amber-400 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
              showLabels ? 'px-3 py-2 w-auto h-auto gap-2' : currentSize.button
            }`}
          >
            {renderIcon(link.id, currentSize.icon)}
            {showLabels && (
              <span className={`font-medium ${currentSize.text}`}>
                {link.label}
              </span>
            )}
          </motion.a>
        </li>
      ))}
    </ul>
  );
};
