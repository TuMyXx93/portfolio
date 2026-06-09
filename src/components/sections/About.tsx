'use client';
import { Section } from '@/components/common/Section';
import { Timeline } from '@/components/common/Timeline';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCE_ITEMS } from '@/constants';
import { useRef } from 'react';
import { useLazySection } from '@/hooks/useLazySection';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Button } from '@/components/common/Button';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { t } = useTranslation();

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
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button
                variant="ghost"
                size="md"
                shape="pill"
                href="#contact"
                ariaLabel={t('about.contactButton') || 'Ir a contacto'}
              >
                {t('about.contactButton')}
              </Button>
              <Button
                variant="ghost"
                size="md"
                shape="pill"
                href="#projects"
                ariaLabel={t('about.projectsButton') || 'Ir a proyectos'}
              >
                {t('about.projectsButton')}
              </Button>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-[#F7AB0A]">
              {t('about.experienceTitle')}
            </h3>
            <Timeline items={EXPERIENCE_ITEMS} />
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};
