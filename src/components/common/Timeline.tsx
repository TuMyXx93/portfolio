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
    <div className="relative w-full max-w-4xl mx-auto mt-10 px-4 md:px-0">
      {/* Línea vertical - izquierda en móvil, centro en desktop */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-600 md:-translate-x-px" />

      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: false }}
          className="relative flex flex-col md:flex-row md:items-center mb-8 md:mb-12 last:mb-0"
        >
          {/* Dot marker */}
          <div className="absolute left-4 md:left-1/2 top-2 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 z-10">
            <div className="w-4 h-4 rounded-full bg-[#F7AB0A] ring-4 ring-slate-900" />
          </div>

          {/* Mobile layout: fecha arriba, contenido abajo */}
          <div className="md:hidden ml-10">
            <span className="text-gray-500 font-mono text-sm block mb-1">
              {item.date}
            </span>
            <h3 className="text-lg font-bold text-[#F7AB0A]">{item.title}</h3>
            {item.company && (
              <p className="text-gray-400 text-sm mb-1">{item.company}</p>
            )}
            <p className="text-gray-300 text-sm leading-relaxed">
              {item.description}
            </p>
            {item.technologies && (
              <div className="flex flex-wrap gap-2 mt-2">
                {item.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Desktop layout: alternado */}
          <div className="hidden md:flex w-full items-center">
            {/* Lado izquierdo */}
            <div
              className={`w-5/12 ${
                index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8 order-3'
              }`}
            >
              {index % 2 === 0 ? (
                <>
                  <h3 className="text-xl font-bold text-[#F7AB0A]">
                    {item.title}
                  </h3>
                  {item.company && (
                    <p className="text-gray-400 text-sm mb-2">{item.company}</p>
                  )}
                  <p className="text-gray-300">{item.description}</p>
                  {item.technologies && (
                    <div className="flex flex-wrap gap-2 mt-2 justify-end">
                      {item.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <span className="text-gray-500 font-mono">{item.date}</span>
              )}
            </div>

            {/* Espacio para el dot (centro) */}
            <div className="w-2/12 flex justify-center" />

            {/* Lado derecho */}
            <div
              className={`w-5/12 ${
                index % 2 === 0 ? 'text-left pl-8' : 'text-right pr-8 order-1'
              }`}
            >
              {index % 2 === 0 ? (
                <span className="text-gray-500 font-mono">{item.date}</span>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-[#F7AB0A]">
                    {item.title}
                  </h3>
                  {item.company && (
                    <p className="text-gray-400 text-sm mb-2">{item.company}</p>
                  )}
                  <p className="text-gray-300">{item.description}</p>
                  {item.technologies && (
                    <div className="flex flex-wrap gap-2 mt-2 justify-end">
                      {item.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
