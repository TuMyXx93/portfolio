'use client';
import { motion } from 'framer-motion';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  company?: string;
  technologies?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 px-2 sm:px-4">
      {/* Línea vertical continuo a la izquierda */}
      <div className="absolute left-4 sm:left-6 md:left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#F7AB0A] via-amber-500/40 to-transparent" />

      <div className="space-y-8 sm:space-y-10">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true, margin: '-50px' }}
            className="relative flex flex-col pl-10 sm:pl-14 md:pl-16"
          >
            {/* Dot marker */}
            <div className="absolute left-4 sm:left-6 md:left-8 top-4 -translate-x-1/2 z-10">
              <div className="w-4 h-4 rounded-full bg-[#F7AB0A] ring-4 ring-[#0a1628]" />
            </div>

            {/* Tarjeta de Contenido */}
            <div className="bg-slate-800/80 rounded-xl p-5 sm:p-6 border border-white/10 hover:border-amber-400/30 transition-colors duration-200 hover:ring-1 hover:ring-amber-400/20">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-[#F7AB0A] bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full font-medium">
                  {item.date}
                </span>
                {item.company && (
                  <span className="text-xs text-gray-400 font-medium tracking-wide bg-white/5 px-2.5 py-1 rounded-md">
                    {item.company}
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-wide">
                {item.title}
              </h3>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                {item.description}
              </p>

              {item.technologies && item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-white/5">
                  {item.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
