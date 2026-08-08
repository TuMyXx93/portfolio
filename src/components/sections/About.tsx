'use client';
import { Section } from '@/components/common/Section';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLazySection } from '@/hooks/useLazySection';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Button } from '@/components/common/Button';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t, locale } = useTranslation();

  useLazySection('about', () => {
    // Podemos usar esto para inicializar datos específicos de la sección si es necesario
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Section
      id="about"
      title={t('about.title')}
      className="py-16 md:py-20 lg:py-24 px-4"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mt-12 md:mt-16 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            variants={itemVariants}
            className="space-y-4 md:space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-bold text-[#F7AB0A]">
              {t('about.role')}
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-ch-70">
              {t('about.bio')}
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                shape="pill"
                href={
                  locale === 'en'
                    ? 'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/CV/CV-WilsonTumina-1064435224-EN.pdf'
                    : 'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/CV/CV-WilsonTumina-1064435224-ES.pdf'
                }
                download={true}
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel={`Descargar CV en formato PDF (${locale.toUpperCase()})`}
                className="w-full sm:w-auto transition-colors duration-200 font-semibold"
              >
                <svg
                  className="w-5 h-5 mr-2 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {locale === 'en' ? 'Download CV (PDF)' : 'Descargar CV (PDF)'}
              </Button>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#F7AB0A]">
              {locale === 'en' ? 'Core Engineering Pillars' : 'Pilares de Ingeniería'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-effect p-4 rounded-xl border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#F7AB0A] font-bold text-sm">
                  01
                </div>
                <h4 className="text-white font-semibold text-base">
                  {locale === 'en' ? 'Monorepo & Full Stack' : 'Monorepos & Full Stack'}
                </h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {locale === 'en'
                    ? 'Scalable Monorepos built with Turborepo, Fastify REST APIs, React 19, and Prisma ORM.'
                    : 'Monorepos escalables desarrollados con Turborepo, Fastify APIs, React 19 y Prisma ORM.'}
                </p>
              </div>

              <div className="glass-effect p-4 rounded-xl border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#F7AB0A] font-bold text-sm">
                  02
                </div>
                <h4 className="text-white font-semibold text-base">
                  {locale === 'en' ? 'Mobile & Cultural PWAs' : 'Desarrollo Móvil & PWAs'}
                </h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {locale === 'en'
                    ? 'Native-feel Flutter mobile apps, Hive NoSQL databases, and Offline PWA architectures.'
                    : 'Aplicaciones móviles en Flutter 3, bases de datos Hive NoSQL y arquitecturas PWA offline.'}
                </p>
              </div>

              <div className="glass-effect p-4 rounded-xl border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#F7AB0A] font-bold text-sm">
                  03
                </div>
                <h4 className="text-white font-semibold text-base">
                  {locale === 'en' ? 'Accessibility (a11y)' : 'Accesibilidad Universal'}
                </h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {locale === 'en'
                    ? 'WCAG 2.1 AAA standards, screen-reader navigation, and reduced-motion modes.'
                    : 'Estándares WCAG 2.1 AAA, navegación accesible por teclado y modos adaptativos.'}
                </p>
              </div>

              <div className="glass-effect p-4 rounded-xl border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#F7AB0A] font-bold text-sm">
                  04
                </div>
                <h4 className="text-white font-semibold text-base">
                  {locale === 'en' ? 'Clean Code & QA' : 'Código Limpio & QA'}
                </h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {locale === 'en'
                    ? 'Strict TypeScript, Biome linter, automated Vitest unit tests, and Playwright E2E.'
                    : 'Tipado estricto en TypeScript, Biome CI, pruebas unitarias con Vitest y E2E con Playwright.'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};
