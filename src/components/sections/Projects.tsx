'use client';
import { motion } from 'framer-motion';
import { Project as ProjectType } from '@/types';
import { PROJECTS } from '@/constants';
import Image from 'next/image';
import { useRef } from 'react';
import { useLazySection } from '@/hooks/useLazySection';

interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: false }}
      className="group relative w-full max-w-sm mx-auto glass-effect rounded-xl p-4 hover:scale-105 transition-transform duration-200"
    >
      <motion.div
        className="relative w-full h-48 rounded-lg overflow-hidden mb-4"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="space-x-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-[#F7AB0A] text-black rounded-full text-sm font-medium hover:bg-[#F7AB0A]/80 transition-colors"
              >
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/80 transition-colors"
              >
                Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
      <motion.h3
        className="text-xl font-bold mb-2 text-[#F7AB0A]"
        whileHover={{ scale: 1.05 }}
      >
        {project.title}
      </motion.h3>
      <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map(tech => (
          <motion.span
            key={tech.name}
            className="px-2 py-1 text-sm rounded-full bg-gray-800"
            style={{ color: tech.color }}
            whileHover={{ scale: 1.1 }}
          >
            {tech.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const containerRef = useRef(null);
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
    <section id="projects" className="min-h-screen py-20 px-4">
      <h2 className="section-title">Proyectos</h2>
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </section>
  );
};
