'use client';
import { motion } from 'framer-motion';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

interface AudioTabProps {
  announceToScreenReader: (message: string) => void;
}

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function AudioTab({ announceToScreenReader }: AudioTabProps) {
  const { state, dispatch } = useAdvancedAccessibility();

  const handleToggle = (action: any, label: string) => {
    dispatch(action);
    announceToScreenReader(
      `${label} ${action.type.includes('TOGGLE') ? 'activado' : 'cambiado'}`
    );
  };

  return (
    <motion.div
      key="audio"
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4"
      role="tabpanel"
      id="audio-panel"
    >
      <h3 className="font-semibold text-gray-900 dark:text-white">
        Configuración Audio
      </h3>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Anuncios de Pantalla
        </label>
        <button
          onClick={() =>
            handleToggle(
              { type: 'TOGGLE_ANNOUNCEMENTS' },
              'Anuncios de pantalla'
            )
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            state.announcements ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
          role="switch"
          aria-checked={state.announcements}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              state.announcements ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Descripciones de Audio
        </label>
        <button
          onClick={() =>
            handleToggle(
              { type: 'TOGGLE_AUDIO_DESCRIPTIONS' },
              'Descripciones de audio'
            )
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            state.audioDescriptions
              ? 'bg-blue-600'
              : 'bg-gray-300 dark:bg-gray-600'
          }`}
          role="switch"
          aria-checked={state.audioDescriptions}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              state.audioDescriptions ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Reproducción Automática
        </label>
        <button
          onClick={() =>
            handleToggle({ type: 'TOGGLE_AUTOPLAY' }, 'Reproducción automática')
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            state.autoplay ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
          role="switch"
          aria-checked={state.autoplay}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              state.autoplay ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </motion.div>
  );
}
