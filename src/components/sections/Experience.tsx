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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <Section id="experience" title={t('experience.title')} className="py-20 px-4">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mt-32 max-w-7xl mx-auto"
      >
        {/* Título de la sección */}
        <motion.div 
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wide">
            {t('experience.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline de experiencia */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-light text-white mb-8 tracking-wide">
              Experiencia Profesional
            </h3>
            <Timeline items={EXPERIENCE_ITEMS} />
          </motion.div>

          {/* Información adicional */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h4 className="text-xl font-light text-white mb-4 tracking-wide">
                Destacados Profesionales
              </h4>
              <ul className="space-y-3 text-gray-300 font-light">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                  <span className="tracking-wide">Más de X años de experiencia en desarrollo web</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                  <span className="tracking-wide">Especialista en tecnologías modernas</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                  <span className="tracking-wide">Liderazgo de equipos de desarrollo</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                  <span className="tracking-wide">Arquitectura de aplicaciones escalables</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h4 className="text-xl font-semibold text-[#F7AB0A] mb-4">
                Enfoque Profesional
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Mi enfoque se centra en crear soluciones innovadoras que combinen
                las mejores prácticas de desarrollo con tecnologías de vanguardia.
                Siempre busco oportunidades para aprender y aplicar nuevas metodologías
                que mejoren la eficiencia y calidad del código.
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
                Contáctame
              </motion.a>
              <motion.a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-medium rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Descargar CV
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};
