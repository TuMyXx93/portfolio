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
                ariaLabel={t('about.downloadCVAria', { locale: locale.toUpperCase() })}
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
                {t('about.downloadCV')}
              </Button>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#F7AB0A]">
              {t('about.pillarsTitle')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-effect p-4 rounded-xl border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#F7AB0A] font-bold text-sm">
                  01
                </div>
                <h4 className="text-white font-semibold text-base">
                  {t('about.pillars.p1Title')}
                </h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {t('about.pillars.p1Desc')}
                </p>
              </div>

              <div className="glass-effect p-4 rounded-xl border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#F7AB0A] font-bold text-sm">
                  02
                </div>
                <h4 className="text-white font-semibold text-base">
                  {t('about.pillars.p2Title')}
                </h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {t('about.pillars.p2Desc')}
                </p>
              </div>

              <div className="glass-effect p-4 rounded-xl border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#F7AB0A] font-bold text-sm">
                  03
                </div>
                <h4 className="text-white font-semibold text-base">
                  {t('about.pillars.p3Title')}
                </h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {t('about.pillars.p3Desc')}
                </p>
              </div>

              <div className="glass-effect p-4 rounded-xl border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#F7AB0A] font-bold text-sm">
                  04
                </div>
                <h4 className="text-white font-semibold text-base">
                  {t('about.pillars.p4Title')}
                </h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {t('about.pillars.p4Desc')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};
