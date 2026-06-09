'use client';
import { Section } from '@/components/common/Section';
import { Timeline } from '@/components/common/Timeline';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCE_ITEMS } from '@/constants';
import { useRef } from 'react';
import { useLazySection } from '@/hooks/useLazySection';
import { useTranslation } from '@/lib/i18n/useTranslation';

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

  const titleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <Section
      id="experience"
      title={t('experience.title')}
      className="py-20 px-4"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mt-16 max-w-7xl mx-auto"
      >
        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline de experiencia */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-light text-white mb-8 tracking-wide">
              {t('experience.professionalExperience')}
            </h3>
            <Timeline items={EXPERIENCE_ITEMS} />
          </motion.div>

          {/* Información adicional */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="glass-effect rounded-lg p-6 border border-white/10">
              <h4 className="text-xl font-light text-white mb-4 tracking-wide">
                {t('experience.highlights')}
              </h4>
              <ul className="space-y-3 text-gray-300 font-light">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                  <span className="tracking-wide">
                    {t('experience.bullet1')}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                  <span className="tracking-wide">
                    {t('experience.bullet2')}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                  <span className="tracking-wide">
                    {t('experience.bullet3')}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                  <span className="tracking-wide">
                    {t('experience.bullet4')}
                  </span>
                </li>
              </ul>
            </div>

            <div className="glass-effect rounded-lg p-6 border border-white/10">
              <h4 className="text-xl font-semibold text-[#F7AB0A] mb-4">
                {t('experience.approach')}
              </h4>
              <p className="text-gray-300 leading-relaxed">
                {t('experience.approachText')}
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('experience.contactMe')}
              </motion.a>
              <motion.a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-medium rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('experience.downloadCV')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};
