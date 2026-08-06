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
  const isInView = useInView(ref, { once: true, amount: 0.2 });
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
        className="mt-8 md:mt-12 max-w-5xl mx-auto space-y-12"
      >
        {/* Timeline de experiencia (ancho completo optimizado) */}
        <motion.div variants={itemVariants} className="w-full">
          <Timeline items={EXPERIENCE_ITEMS} />
        </motion.div>

        {/* Información adicional (Grilla equilibrada de 2 columnas) */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          <div className="bg-slate-800/80 rounded-xl p-6 border border-white/10 hover:border-amber-400/30 transition-colors duration-200">
            <h4 className="text-lg md:text-xl font-semibold text-white mb-4 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 bg-[#F7AB0A] rounded-full"></span>
              {t('experience.highlights')}
            </h4>
            <ul className="space-y-3 text-gray-300 font-light text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-amber-400/80 rounded-full mt-2 flex-shrink-0"></span>
                <span className="tracking-wide">
                  {t('experience.bullet1')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-amber-400/80 rounded-full mt-2 flex-shrink-0"></span>
                <span className="tracking-wide">
                  {t('experience.bullet2')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-amber-400/80 rounded-full mt-2 flex-shrink-0"></span>
                <span className="tracking-wide">
                  {t('experience.bullet3')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-amber-400/80 rounded-full mt-2 flex-shrink-0"></span>
                <span className="tracking-wide">
                  {t('experience.bullet4')}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-6 border border-white/10 hover:border-amber-400/30 transition-colors duration-200">
            <h4 className="text-lg md:text-xl font-semibold text-[#F7AB0A] mb-4 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              {t('experience.approach')}
            </h4>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {t('experience.approachText')}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};
