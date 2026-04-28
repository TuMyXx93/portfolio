'use client';
import { Section } from '@/components/common/Section';
import { Timeline } from '@/components/common/Timeline';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCE_ITEMS } from '@/constants';
import { useRef } from 'react';
import { useLazySection } from '@/hooks/useLazySection';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

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
    <Section id="about" title="Sobre Mí" className="py-20 px-4">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mt-16 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold text-[#F7AB0A]">
              Desarrollador Web Full Stack
            </h3>
            <p className="text-gray-300">
              Desarrollador Web Full Stack con pasión por crear soluciones
              inovadoras y eficientes. Mi experiencia en desarrollo web abarca
              desde aplicaciones front-end interactivas hasta APIs y sistemas de
              backend escalables.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#contact"
                className="hero-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contactar
              </motion.a>
              <motion.a
                href="#projects"
                className="hero-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Proyectos
              </motion.a>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold text-[#F7AB0A]">
              Experiencia Profesional
            </h3>
            <Timeline items={EXPERIENCE_ITEMS} />
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};
