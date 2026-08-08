'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal = ({
  project,
  onClose,
}: ProjectDetailModalProps) => {
  const imagesList =
    project?.images && project.images.length > 0
      ? project.images
      : project
        ? [project.image]
        : [];
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [prevProjectId, setPrevProjectId] = useState(project?.id);

  if (project?.id !== prevProjectId) {
    setPrevProjectId(project?.id);
    setActiveImgIndex(0);
  }

  useEffect(() => {
    if (!project || imagesList.length <= 1) return;
    const timer = setInterval(() => {
      setActiveImgIndex(prev => (prev + 1) % imagesList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [project, imagesList.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d1c30] border border-white/15 rounded-2xl shadow-2xl p-6 md:p-8 z-10 custom-scrollbar text-white"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none z-20"
              aria-label="Cerrar modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full mb-2">
                Caso de Estudio Técnicos
              </span>
              <h2
                id="modal-title"
                className="text-2xl md:text-3xl font-bold text-white"
              >
                {project.title}
              </h2>
            </div>

            {/* Image Preview / Slider */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-white/10 shadow-lg group">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={imagesList[activeImgIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={imagesList[activeImgIndex]}
                    alt={`${project.title} - Vista ${activeImgIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Botones de navegación manual si hay más de 1 imagen */}
              {imagesList.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImgIndex(
                        prev =>
                          (prev - 1 + imagesList.length) % imagesList.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-amber-400 hover:text-black text-white transition-colors backdrop-blur-xs z-20"
                    aria-label="Vista anterior"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setActiveImgIndex(prev => (prev + 1) % imagesList.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-amber-400 hover:text-black text-white transition-colors backdrop-blur-xs z-20"
                    aria-label="Vista siguiente"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Indicadores flotantes inferiores */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10">
                    {imagesList.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImgIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === activeImgIndex
                            ? 'w-6 bg-amber-400'
                            : 'w-2 bg-white/40 hover:bg-white'
                        }`}
                        aria-label={`Ir a la vista ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Descripción General
              </h3>
              <p className="text-gray-200 text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technical Architecture Details */}
            {project.architectureDetails && (
              <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-amber-500/20">
                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.12a2 2 0 01-1.022-.547l-1.07-1.07a2 2 0 010-2.828l1.07-1.07a2 2 0 011.022-.547l2.387-.477a6 6 0 003.86-.517l.318-.158a6 6 0 013.86-.517l2.387.477a2 2 0 011.022.547l1.07 1.07a2 2 0 010 2.828l-1.07 1.07z"
                    />
                  </svg>
                  Arquitectura & Retos Técnicos
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {project.architectureDetails}
                </p>
              </div>
            )}

            {/* Stack Technologies */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Tecnologías Clave
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span
                    key={tech.name}
                    className="px-3 py-1.5 text-xs md:text-sm rounded-full bg-white/5 border border-white/10 text-gray-200 flex items-center gap-2"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: tech.color || '#F7AB0A' }}
                    />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Links / Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-4 pt-4 border-t border-white/10">
              {project.github && (
                <Button
                  variant="ghost"
                  size="md"
                  shape="pill"
                  href={project.github}
                  target="_blank"
                  ariaLabel={`Código en GitHub de ${project.title}`}
                >
                  Ver en GitHub
                </Button>
              )}
              {project.demo && (
                <Button
                  variant="primary"
                  size="md"
                  shape="pill"
                  href={project.demo}
                  target="_blank"
                  download={project.demo.endsWith('.apk') ? true : undefined}
                  ariaLabel={`Descargar o probar demo de ${project.title}`}
                >
                  {project.demo.endsWith('.apk')
                    ? 'Descargar APK'
                    : 'Probar Demo'}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
