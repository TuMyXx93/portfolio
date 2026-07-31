'use client';
import { motion } from 'framer-motion';
import { Project as ProjectType } from '@/types';
import { PROJECTS } from '@/constants';
import Image from 'next/image';
import { useRef } from 'react';
import { useLazySection } from '@/hooks/useLazySection';
import { Section } from '@/components/common/Section';
import { Button } from '@/components/common/Button';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative w-full mx-auto bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-amber-400/40 rounded-2xl p-5 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(247,171,10,0.12)] flex flex-col justify-between"
    >
      <div>
        <motion.div
          className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 border border-white/5"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Overlay - visible en hover (pointer) o siempre en touch */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
            <div className="flex flex-wrap items-center justify-center gap-3 p-2">
              {project.github && (
                <Button
                  variant="overlay"
                  size="sm"
                  shape="pill"
                  href={project.github}
                  target="_blank"
                  ariaLabel={`Ver código fuente de ${project.title} en GitHub`}
                >
                  GitHub
                </Button>
              )}
              {project.demo && (
                <Button
                  variant="overlayWhite"
                  size="sm"
                  shape="pill"
                  href={project.demo}
                  target="_blank"
                  ariaLabel={`Ver demo de ${project.title}`}
                >
                  Demo
                </Button>
              )}
            </div>
          </div>
        </motion.div>
        <motion.h3
          className="text-lg md:text-xl font-bold mb-2 text-[#F7AB0A] group-hover:text-amber-300 transition-colors"
          whileHover={{ scale: 1.01 }}
        >
          {project.title}
        </motion.h3>
        <p className="text-gray-300 mb-4 line-clamp-3 text-sm md:text-base leading-relaxed">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
        {project.technologies.map(tech => (
          <span
            key={tech.name}
            className="px-2.5 py-1 text-xs md:text-sm rounded-full bg-white/5 border border-white/10 text-gray-200 transition-all duration-200 hover:scale-105 hover:bg-white/10 hover:border-amber-400/30 cursor-default flex items-center gap-1.5"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: tech.color || '#F7AB0A' }}
            />
            {tech.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  useLazySection('projects', () => {
    // Precargar imágenes de proyectos cuando la sección sea visible
    PROJECTS.forEach(project => {
      const img = document.createElement('img');
      img.src = project.image;
    });
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

  return (
    <Section
      id="projects"
      title={t('projects.title') || 'Proyectos'}
      className="py-16 md:py-20 lg:py-24 px-4"
    >
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </Section>
  );
};
