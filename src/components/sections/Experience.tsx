'use client';
import { Section } from '@/components/common/Section';
import { Timeline } from '@/components/common/Timeline';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCE_ITEMS } from '@/constants';
import { useRef } from 'react';
import { useLazySection } from '@/hooks/useLazySection';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Button } from '@/components/common/Button';

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { t } = useTranslation();

  useLazySection('experience', () => {
    // Inicializar datos específicos de la sección si es necesario
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <Section
      id="experience"
      title={t('experience.title')}
      className="py-16 md:py-20 lg:py-24 px-4"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mt-12 md:mt-16 max-w-7xl mx-auto"
      >
        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Timeline de experiencia */}
          <motion.div
            variants={itemVariants}
            className="space-y-4 md:space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-light text-white mb-6 md:mb-8 tracking-wide">
              {t('experience.professionalExperience')}
            </h3>
            <Timeline items={EXPERIENCE_ITEMS} />
          </motion.div>

          {/* Información adicional */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 md:space-y-8"
          >
            <div className="glass-effect rounded-lg p-4 md:p-6 border border-white/10">
              <h4 className="text-lg md:text-xl font-light text-white mb-4 tracking-wide">
                {t('experience.highlights')}
              </h4>
              <ul className="space-y-3 text-gray-300 font-light text-sm md:text-base">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-white/40 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="tracking-wide">
                    {t('experience.bullet1')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-white/40 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="tracking-wide">
                    {t('experience.bullet2')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-white/40 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="tracking-wide">
                    {t('experience.bullet3')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-white/40 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="tracking-wide">
                    {t('experience.bullet4')}
                  </span>
                </li>
              </ul>
            </div>

            <div className="glass-effect rounded-lg p-4 md:p-6 border border-white/10">
              <h4 className="text-lg md:text-xl font-semibold text-[#F7AB0A] mb-4">
                {t('experience.approach')}
              </h4>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base max-ch-70">
                {t('experience.approachText')}
              </p>
            </div>

            {/* Botones de acción usando Button component */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button
                variant="primary"
                size="md"
                shape="rounded"
                href="#contact"
                className="w-full sm:w-auto"
                ariaLabel={t('experience.contactMe') || 'Contactarme'}
              >
                {t('experience.contactMe')}
              </Button>
              <Button
                variant="secondary"
                size="md"
                shape="rounded"
                href="/cv.pdf"
                target="_blank"
                className="w-full sm:w-auto"
                ariaLabel={t('experience.downloadCV') || 'Descargar CV'}
              >
                {t('experience.downloadCV')}
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};
