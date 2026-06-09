'use client';
import { Section } from '@/components/common/Section';
import { motion, useInView } from 'framer-motion';
import { SKILLS } from '@/constants';
import { useRef } from 'react';
import { useLazySection } from '@/hooks/useLazySection';
import { useTranslation } from '@/lib/i18n/useTranslation';

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { t } = useTranslation();

  useLazySection('skills', () => {
    // Inicializar datos específicos de la sección si es necesario
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  };

  // Agrupar skills por categoría
  const skillsByCategory = SKILLS.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof SKILLS>
  );

  const getCategoryTitle = (category: string) => {
    const titles: Record<string, string> = {
      frontend: t('skills.frontend'),
      backend: t('skills.backend'),
      tools: t('skills.tools'),
      soft: t('skills.soft'),
    };
    return titles[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      frontend: 'from-blue-500 to-cyan-500',
      backend: 'from-green-500 to-emerald-500',
      tools: 'from-purple-500 to-violet-500',
      soft: 'from-orange-500 to-amber-500',
    };
    return (
      colors[category as keyof typeof colors] || 'from-gray-500 to-slate-500'
    );
  };

  return (
    <Section
      id="skills"
      title={t('skills.title')}
      className="py-16 md:py-20 lg:py-24 px-4"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mt-12 md:mt-16 max-w-7xl mx-auto"
      >
        {/* Grid de categorías de skills - 1 col móvil, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`}
                ></div>
                <h3 className="text-lg md:text-xl font-light text-white tracking-wide">
                  {getCategoryTitle(category)}
                </h3>
              </div>

              <div className="grid gap-3 md:gap-4">
                {skills.map(skill => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between group [@media(hover:hover)]:hover:translate-x-1 transition-transform duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                        <span className="text-xs font-bold text-amber-400">
                          {skill.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors font-light tracking-wide text-sm md:text-base">
                        {skill.name}
                      </span>
                    </div>

                    {/* Barra de progreso */}
                    <div className="flex items-center gap-2">
                      <div className="w-12 md:w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-white/60 to-white/40 rounded-full"
                          initial={{ width: 0 }}
                          animate={
                            isInView
                              ? { width: `${skill.level}%` }
                              : { width: 0 }
                          }
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 min-w-[2rem] text-right font-light">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Información adicional */}
        <motion.div
          variants={itemVariants}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="glass-effect rounded-xl p-6 md:p-8 border border-white/10">
            <h4 className="text-xl md:text-2xl font-bold text-[#F7AB0A] mb-4">
              {t('skills.alwaysLearning')}
            </h4>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto max-ch-70">
              {t('skills.learningText')}
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 md:mt-8">
              <span className="px-3 py-1.5 md:px-4 md:py-2 bg-amber-500/10 text-amber-400 rounded-full text-sm border border-amber-500/20">
                {t('skills.tag.continuousLearning')}
              </span>
              <span className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20">
                {t('skills.tag.bestPractices')}
              </span>
              <span className="px-3 py-1.5 md:px-4 md:py-2 bg-green-500/10 text-green-400 rounded-full text-sm border border-green-500/20">
                {t('skills.tag.cleanCode')}
              </span>
              <span className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20">
                {t('skills.tag.teamwork')}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};
