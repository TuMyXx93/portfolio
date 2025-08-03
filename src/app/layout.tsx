import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { AccessibilityMenu } from '@/components/common/AccessibilityMenu';
import { PWAInstallButton } from '@/components/common/PWAInstallButton';
import { ConnectionStatus } from '@/components/common/ConnectionStatus';

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
  title: 'TumiDev | Portfolio Profesional',
  description:
    'Portfolio profesional de TumiDev - Desarrollador Full Stack especializado en React, Next.js, TypeScript y tecnologías modernas de desarrollo web',
  keywords: ['desarrollo web', 'frontend', 'backend', 'Next.js', 'React', 'TypeScript', 'full stack', 'TumiDev'],
  authors: [{ name: 'TumiDev', url: 'https://tumidev.com' }],
  creator: 'TumiDev',
  publisher: 'TumiDev',
  robots: 'index, follow',
  alternates: {
    canonical: defaultUrl,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180' },
    ],
    shortcut: '/favicon.ico',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TumiDev Portfolio',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'TumiDev | Portfolio Profesional',
    description:
      'Portfolio profesional de TumiDev mostrando proyectos y habilidades en desarrollo web full stack',
    url: defaultUrl,
    siteName: 'TumiDev Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TumiDev Portfolio',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TumiDev | Portfolio Profesional',
    description: 'Portfolio profesional de TumiDev - Desarrollador Full Stack',
    images: ['/images/og-image.png'],
    creator: '@tumidev',
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
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TumiDev" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inter.className} transition-colors duration-300`}>
        <ConnectionStatus />
        <ScrollProgress />
        <main className="min-h-screen bg-gradient-custom">{children}</main>
        <PWAInstallButton />
        <div id="accessibility-root" />
      </body>
    </html>
  );
}
