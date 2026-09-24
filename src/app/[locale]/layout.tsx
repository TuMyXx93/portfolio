import React from 'react';
import type { Metadata } from 'next';
import { locales, Locale } from '@/lib/i18n/config';
import { I18nProvider } from '@/lib/i18n/useTranslation';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { PWAInstallButton } from '@/components/common/PWAInstallButton';
import { ConnectionStatus } from '@/components/common/ConnectionStatus';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/common/BackToTop';
import {
  SkipToContent,
  LiveRegion,
} from '@/components/accessibility/AccessibilityComponents';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tumidev.com';

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const title = isEn
    ? 'TumiDev | Software Engineer & Full Stack Developer'
    : 'TumiDev | Portfolio Profesional';
  const description = isEn
    ? 'Professional portfolio of TumiDev - Software Engineer specialized in React 19, Next.js, Fastify, TypeScript, Flutter and scalable system architecture.'
    : 'Portfolio profesional de TumiDev - Desarrollador Full Stack especializado en React, Next.js, TypeScript y tecnologías modernas de desarrollo web.';
  const canonicalUrl = `${siteUrl}/${locale}`;

  return {
    title,
    description,
    keywords: isEn
      ? [
          'software engineer',
          'web development',
          'frontend',
          'backend',
          'Next.js',
          'React',
          'TypeScript',
          'full stack',
          'TumiDev',
        ]
      : [
          'desarrollo web',
          'frontend',
          'backend',
          'Next.js',
          'React',
          'TypeScript',
          'full stack',
          'TumiDev',
        ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
        'x-default': `${siteUrl}/es`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: isEn ? 'en_US' : 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@tumidev',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;

  return (
    <I18nProvider initialLocale={locale as Locale}>
      <SkipToContent />
      <ConnectionStatus />
      <ScrollProgress />
      <LiveRegion />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen bg-gradient-custom focus:outline-none"
      >
        {children}
      </main>
      <Footer />
      <BackToTop />
      <PWAInstallButton />
    </I18nProvider>
  );
}