'use client';
import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  sections: string[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export const ScrollIndicator = ({
  sections,
  activeSection,
  onSectionClick,
}: ScrollIndicatorProps) => {
  return (
    <motion.div
      className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {sections.map(section => (
        <button
          key={section}
          onClick={() => onSectionClick(section)}
          className="group relative p-2"
          aria-label={`Ir a la sección ${section}`}
        >
          <motion.div
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              activeSection === section
                ? 'bg-[#F7AB0A]'
                : 'bg-gray-500 group-hover:bg-[#F7AB0A]/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          <span className="absolute left-0 transform -translate-x-full -translate-y-1/2 top-1/2 mr-2 px-2 py-1 bg-gray-800 rounded text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </span>
        </button>
      ))}
    </motion.div>
  );
};
