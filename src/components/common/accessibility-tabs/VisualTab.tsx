'use client';
import { motion } from 'framer-motion';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

interface VisualTabProps {
  announceToScreenReader: (message: string) => void;
}

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function VisualTab({ announceToScreenReader }: VisualTabProps) {
  const { state, dispatch } = useAdvancedAccessibility();

  const handleToggle = (action: any, label: string) => {
    dispatch(action);
    announceToScreenReader(
      `${label} ${action.type.includes('TOGGLE') ? 'activado' : 'cambiado'}`
    );
  };

  return (
    <motion.div
      key="visual"
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4"
      role="tabpanel"
      id="visual-panel"
    >
      <h3 className="font-semibold text-gray-900 dark:text-white">
        Configuración Visual
      </h3>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Alto Contraste
        </label>
        <button
          onClick={() =>
            handleToggle({ type: 'TOGGLE_HIGH_CONTRAST' }, 'Alto contraste')
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            state.highContrast ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
          role="switch"
          aria-checked={state.highContrast}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              state.highContrast ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
          Tamaño de Fuente
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'small', label: 'Pequeño' },
            { value: 'medium', label: 'Normal' },
            { value: 'large', label: 'Grande' },
            { value: 'extra-large', label: 'Muy Grande' },
          ].map(size => (
            <button
              key={size.value}
              onClick={() =>
                handleToggle(
                  { type: 'SET_FONT_SIZE', payload: size.value },
                  `Tamaño de fuente ${size.label}`
                )
              }
              className={`px-3 py-2 text-xs rounded transition-colors ${
                state.fontSize === size.value
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
          Modo Daltonismo
        </label>
        <select
          value={state.colorBlindMode}
          onChange={e =>
            handleToggle(
              { type: 'SET_COLOR_BLIND_MODE', payload: e.target.value },
              `Modo daltonismo ${e.target.value}`
            )
          }
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="none">Normal</option>
          <option value="protanopia">Protanopia</option>
          <option value="deuteranopia">Deuteranopia</option>
          <option value="tritanopia">Tritanopia</option>
        </select>
      </div>
    </motion.div>
  );
}
