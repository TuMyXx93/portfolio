'use client';
import { Section } from '@/components/common/Section';
import { motion, useInView } from 'framer-motion';
import { SKILLS } from '@/constants';
import { useRef } from 'react';
import { useLazySection } from '@/hooks/useLazySection';
import { useTranslation } from '@/lib/i18n/useTranslation';

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
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
      languages: t('skills.languages'),
      frameworks: t('skills.frameworks'),
      databases: t('skills.databases'),
      ai_tools: t('skills.ai_tools'),
    };
    return titles[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      languages: 'from-amber-500 to-yellow-400',
      frameworks: 'from-blue-500 to-cyan-400',
      databases: 'from-emerald-500 to-teal-400',
      ai_tools: 'from-purple-500 to-indigo-400',
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
              className="bg-slate-800/80 rounded-2xl p-5 md:p-6 border border-white/10 hover:border-amber-400/30 transition-colors duration-200 hover:ring-1 hover:ring-amber-400/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4 md:mb-6 pb-3 border-b border-white/5">
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${getCategoryColor(category)} shadow-sm`}
                  ></div>
                  <h3 className="text-lg md:text-xl font-medium text-white tracking-wide">
                    {getCategoryTitle(category)}
                  </h3>
                </div>

                <div className="flex flex-col gap-2.5">
                  {skills.map(skill => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 hover:border-amber-400/30 hover:bg-white/10 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 flex items-center justify-center bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 border border-amber-500/20 transition-all duration-200">
                          <span className="text-xs font-bold text-amber-400">
                            {skill.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-gray-200 group-hover:text-white transition-colors font-medium tracking-wide text-xs sm:text-sm">
                          {skill.name}
                        </span>
                      </div>

                      {skill.badge && (
                        <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium">
                          {skill.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Información adicional: Siempre Aprendiendo */}
        <motion.div
          variants={itemVariants}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="bg-slate-800/80 rounded-2xl p-6 md:p-10 border border-white/10 hover:border-amber-400/30 transition-colors duration-200">
            <h4 className="text-xl md:text-2xl font-bold text-[#F7AB0A] mb-4">
              {t('skills.alwaysLearning')}
            </h4>
            <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-3xl mx-auto max-ch-70 font-light">
              {t('skills.learningText')}
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 md:mt-8">
              <span className="px-3.5 py-1.5 md:px-4 md:py-2 bg-amber-500/10 text-amber-300 rounded-full text-sm font-medium border border-amber-500/20 hover:border-amber-400/40 transition-colors">
                {t('skills.tag.continuousLearning')}
              </span>
              <span className="px-3.5 py-1.5 md:px-4 md:py-2 bg-blue-500/10 text-blue-300 rounded-full text-sm font-medium border border-blue-500/20 hover:border-blue-400/40 transition-colors">
                {t('skills.tag.aiEngineering')}
              </span>
              <span className="px-3.5 py-1.5 md:px-4 md:py-2 bg-emerald-500/10 text-emerald-300 rounded-full text-sm font-medium border border-emerald-500/20 hover:border-emerald-400/40 transition-colors">
                {t('skills.tag.cleanCode')}
              </span>
              <span className="px-3.5 py-1.5 md:px-4 md:py-2 bg-purple-500/10 text-purple-300 rounded-full text-sm font-medium border border-purple-500/20 hover:border-purple-400/40 transition-colors">
                {t('skills.tag.accessibility')}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};
