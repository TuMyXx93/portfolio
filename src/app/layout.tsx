import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { AccessibilityMenu } from '@/components/common/AccessibilityMenu';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NODE_ENV === 'production'
    ? 'https://tumidev.com'
    : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Tumidev | Portafolio Profesional',
  description:
    'Portafolio profesional creado con Next.js, mostrando proyectos y habilidades en desarrollo web',
  keywords: 'desarrollo web, frontend, backend, Next.js, React',
  authors: [{ name: 'Tumidev' }],
  openGraph: {
    title: 'Tumidev | Portafolio Profesional',
    description:
      'Portafolio profesional mostrando proyectos y habilidades en desarrollo web',
    url: 'https://tumidev.com',
    siteName: 'Tumidev Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tumidev Portfolio',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
};

function ThemeAndAccessibilityScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              // Theme initialization
              var theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              document.documentElement.classList.toggle('dark', theme === 'dark');

              // Accessibility preferences
              var accessibilityPrefs = JSON.parse(localStorage.getItem('accessibility-preferences') || '{}');
              if (accessibilityPrefs.highContrast) document.documentElement.classList.add('high-contrast');
              if (accessibilityPrefs.reducedMotion) document.documentElement.classList.add('reduced-motion');
              if (accessibilityPrefs.fontSize) document.documentElement.classList.add('text-' + accessibilityPrefs.fontSize);
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <ThemeAndAccessibilityScript />
      </head>
      <body className={`${inter.className} transition-colors duration-300`}>
        <ScrollProgress />
        <main className="min-h-screen bg-gradient-custom">{children}</main>
        <div id="accessibility-root" />
      </body>
    </html>
  );
}
