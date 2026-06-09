'use client';
import { motion } from 'framer-motion';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

interface CognitiveTabProps {
  announceToScreenReader: (message: string) => void;
}

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function CognitiveTab({ announceToScreenReader }: CognitiveTabProps) {
  const { state, dispatch } = useAdvancedAccessibility();

  const handleToggle = (action: any, label: string) => {
    dispatch(action);
    announceToScreenReader(
      `${label} ${action.type.includes('TOGGLE') ? 'activado' : 'cambiado'}`
    );
  };

  return (
    <motion.div
      key="cognitive"
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4"
      role="tabpanel"
      id="cognitive-panel"
    >
      <h3 className="font-semibold text-gray-900 dark:text-white">
        Configuración Cognitiva
      </h3>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Modo Lectura
        </label>
        <button
          onClick={() =>
            handleToggle({ type: 'TOGGLE_READING_MODE' }, 'Modo lectura')
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            state.readingMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
          role="switch"
          aria-checked={state.readingMode}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              state.readingMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Reducir Complejidad
        </label>
        <button
          onClick={() =>
            handleToggle(
              { type: 'TOGGLE_REDUCED_COMPLEXITY' },
              'Complejidad reducida'
            )
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            state.reducedComplexity
              ? 'bg-blue-600'
              : 'bg-gray-300 dark:bg-gray-600'
          }`}
          role="switch"
          aria-checked={state.reducedComplexity}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              state.reducedComplexity ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Foco Mejorado
        </label>
        <button
          onClick={() =>
            handleToggle({ type: 'TOGGLE_ENHANCED_FOCUS' }, 'Foco mejorado')
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            state.enhancedFocus ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
          role="switch"
          aria-checked={state.enhancedFocus}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              state.enhancedFocus ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </motion.div>
  );
}
