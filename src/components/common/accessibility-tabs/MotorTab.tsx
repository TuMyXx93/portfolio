'use client';
import { motion } from 'framer-motion';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

interface MotorTabProps {
  announceToScreenReader: (message: string) => void;
}

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function MotorTab({ announceToScreenReader }: MotorTabProps) {
  const { state, dispatch } = useAdvancedAccessibility();

  const handleToggle = (action: any, label: string) => {
    dispatch(action);
    announceToScreenReader(
      `${label} ${action.type.includes('TOGGLE') ? 'activado' : 'cambiado'}`
    );
  };

  return (
    <motion.div
      key="motor"
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4"
      role="tabpanel"
      id="motor-panel"
    >
      <h3 className="font-semibold text-gray-900 dark:text-white">
        Configuración Motora
      </h3>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Reducir Movimiento
        </label>
        <button
          onClick={() =>
            handleToggle(
              { type: 'TOGGLE_REDUCED_MOTION' },
              'Movimiento reducido'
            )
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            state.reducedMotion ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
          role="switch"
          aria-checked={state.reducedMotion}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              state.reducedMotion ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Foco Visible
        </label>
        <button
          onClick={() =>
            handleToggle({ type: 'TOGGLE_FOCUS_VISIBLE' }, 'Foco visible')
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            state.focusVisible ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
          role="switch"
          aria-checked={state.focusVisible}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              state.focusVisible ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Navegación por Teclado
        </label>
        <button
          onClick={() =>
            handleToggle(
              { type: 'TOGGLE_KEYBOARD_NAVIGATION' },
              'Navegación por teclado'
            )
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            state.keyboardNavigation
              ? 'bg-blue-600'
              : 'bg-gray-300 dark:bg-gray-600'
          }`}
          role="switch"
          aria-checked={state.keyboardNavigation}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              state.keyboardNavigation ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </motion.div>
  );
}
