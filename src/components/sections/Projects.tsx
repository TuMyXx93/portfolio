'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Project as ProjectType } from '@/types';
import { PROJECTS } from '@/constants';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLazySection } from '@/hooks/useLazySection';
import { Section } from '@/components/common/Section';
import { Button } from '@/components/common/Button';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectCardProps {
  project: ProjectType;
  index: number;
  onOpenDetails: (project: ProjectType) => void;
}

const ProjectCard = ({ project, index, onOpenDetails }: ProjectCardProps) => {
  const imagesList =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (imagesList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % imagesList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [imagesList.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative w-full mx-auto bg-slate-800/80 border border-white/10 hover:border-amber-400/40 rounded-2xl p-5 transition-colors duration-200 hover:ring-1 hover:ring-amber-400/30 flex flex-col justify-between"
    >
      <div>
        <motion.div
          className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 border border-white/5 cursor-pointer"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          onClick={() => onOpenDetails(project)}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={imagesList[currentImageIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={imagesList[currentImageIndex]}
                alt={`${project.title} - Vista ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Indicadores de imágenes múltiples */}
          {imagesList.length > 1 && (
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10">
              {imagesList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={e => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex
                      ? 'w-5 bg-amber-400'
                      : 'w-1.5 bg-white/40 hover:bg-white'
                  }`}
                  aria-label={`Ver vista ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Overlay - visible en hover (pointer) o siempre en touch */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs z-10">
            <div className="flex flex-wrap items-center justify-center gap-3 p-2">
              <Button
                variant="overlay"
                size="sm"
                shape="pill"
                onClick={e => {
                  e?.stopPropagation();
                  onOpenDetails(project);
                }}
                ariaLabel={`Ver detalles de ${project.title}`}
              >
                Caso de Estudio
              </Button>
              {project.demo && (
                <Button
                  variant="overlayWhite"
                  size="sm"
                  shape="pill"
                  href={project.demo}
                  target="_blank"
                  download={project.demo.endsWith('.apk') ? true : undefined}
                  ariaLabel={`Descargar o ver demo de ${project.title}`}
                >
                  {project.demo.endsWith('.apk') ? 'Descargar APK' : 'Demo'}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
        <motion.h3
          className="text-lg md:text-xl font-bold mb-2 text-[#F7AB0A] group-hover:text-amber-300 transition-colors cursor-pointer"
          onClick={() => onOpenDetails(project)}
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  useLazySection('projects', () => {
    PROJECTS.forEach(project => {
      const img = document.createElement('img');
      img.src = project.image;
    });
  });

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'ai', label: 'IA & Agentes' },
    { id: 'frontend', label: 'Frontend' },
  ];

  const filteredProjects = PROJECTS.filter(project => {
    const matchesCategory =
      selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <Section
      id="projects"
      title={t('projects.title') || 'Proyectos'}
      className="py-16 md:py-20 lg:py-24 px-4"
    >
      {/* Controles de Filtro y Búsqueda */}
      <div className="max-w-7xl mx-auto mt-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Píldoras de Categoría */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border ${
                selectedCategory === cat.id
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 shadow-[0_0_15px_rgba(247,171,10,0.2)]'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Input de Búsqueda */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar por tecnología..."
            className="w-full px-4 py-2 pl-10 text-sm bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-colors"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3.5 top-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Grid de Proyectos Filtrados */}
      <motion.div
        ref={containerRef}
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenDetails={setActiveProject}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Mensaje de Sin Resultados */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-base">
          No se encontraron proyectos para los criterios seleccionados.
        </div>
      )}

      {/* Modal de Detalle / Caso de Estudio */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </Section>
  );
};
