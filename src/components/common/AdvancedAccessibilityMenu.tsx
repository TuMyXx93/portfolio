'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';

export const AdvancedAccessibilityMenu = () => {
  const { state, dispatch, announceToScreenReader } = useAdvancedAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'motor' | 'cognitive' | 'audio'>('visual');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    announceToScreenReader(
      isOpen ? 'Menú de accesibilidad cerrado' : 'Menú de accesibilidad abierto'
    );
  };

  const handleToggle = (action: any, label: string) => {
    dispatch(action);
    announceToScreenReader(`${label} ${action.type.includes('TOGGLE') ? 'activado' : 'cambiado'}`);
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <>
      {/* Accessibility Menu Trigger */}
      <motion.button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir menú de accesibilidad"
        aria-expanded={isOpen}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2a3 3 0 003 3 3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003-3zm-4 7a1.5 1.5 0 00-1.5 1.5v9A1.5 1.5 0 008 21h8a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0016 9h-2.5l-1.5-1.5L10.5 9H8z"
            fill="currentColor"
          />
        </svg>
      </motion.button>

      {/* Accessibility Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
              role="dialog"
              aria-label="Menú de configuración de accesibilidad"
              aria-modal="true"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    ♿ Accesibilidad
                  </h2>
                  <button
                    onClick={toggleMenu}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Cerrar menú de accesibilidad"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    dispatch({ type: 'RESET_ALL' });
                    announceToScreenReader('Configuración de accesibilidad restablecida');
                  }}
                  className="mt-3 w-full px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-200 rounded-lg transition-colors"
                >
                  🔄 Restablecer Todo
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-1 p-4" role="tablist">
                  {[
                    { id: 'visual', label: '👁️ Visual', icon: '👁️' },
                    { id: 'motor', label: '✋ Motor', icon: '✋' },
                    { id: 'cognitive', label: '🧠 Cognitivo', icon: '🧠' },
                    { id: 'audio', label: '🔊 Audio', icon: '🔊' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                      }`}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      aria-controls={`${tab.id}-panel`}
                    >
                      {tab.icon}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-4 space-y-4">
                <AnimatePresence mode="wait">
                  {/* Visual Tab */}
                  {activeTab === 'visual' && (
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
                      <h3 className="font-semibold text-gray-900 dark:text-white">Configuración Visual</h3>
                      
                      {/* High Contrast */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                          Alto Contraste
                        </label>
                        <button
                          onClick={() => handleToggle({ type: 'TOGGLE_HIGH_CONTRAST' }, 'Alto contraste')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            state.highContrast ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={state.highContrast}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            state.highContrast ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      {/* Font Size */}
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
                          ].map((size) => (
                            <button
                              key={size.value}
                              onClick={() => handleToggle(
                                { type: 'SET_FONT_SIZE', payload: size.value as any },
                                `Tamaño de fuente ${size.label}`
                              )}
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

                      {/* Color Blind Mode */}
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                          Modo Daltonismo
                        </label>
                        <select
                          value={state.colorBlindMode}
                          onChange={(e) => handleToggle(
                            { type: 'SET_COLOR_BLIND_MODE', payload: e.target.value as any },
                            `Modo daltonismo ${e.target.value}`
                          )}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          <option value="none">Normal</option>
                          <option value="protanopia">Protanopia</option>
                          <option value="deuteranopia">Deuteranopia</option>
                          <option value="tritanopia">Tritanopia</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Motor Tab */}
                  {activeTab === 'motor' && (
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
                      <h3 className="font-semibold text-gray-900 dark:text-white">Configuración Motora</h3>
                      
                      {/* Reduced Motion */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                          Reducir Movimiento
                        </label>
                        <button
                          onClick={() => handleToggle({ type: 'TOGGLE_REDUCED_MOTION' }, 'Movimiento reducido')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            state.reducedMotion ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={state.reducedMotion}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            state.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      {/* Focus Visible */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                          Foco Visible
                        </label>
                        <button
                          onClick={() => handleToggle({ type: 'TOGGLE_FOCUS_VISIBLE' }, 'Foco visible')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            state.focusVisible ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={state.focusVisible}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            state.focusVisible ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      {/* Keyboard Navigation */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                          Navegación por Teclado
                        </label>
                        <button
                          onClick={() => handleToggle({ type: 'TOGGLE_KEYBOARD_NAVIGATION' }, 'Navegación por teclado')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            state.keyboardNavigation ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={state.keyboardNavigation}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            state.keyboardNavigation ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Cognitive Tab */}
                  {activeTab === 'cognitive' && (
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
                      <h3 className="font-semibold text-gray-900 dark:text-white">Configuración Cognitiva</h3>
                      
                      {/* Reading Mode */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                          Modo Lectura
                        </label>
                        <button
                          onClick={() => handleToggle({ type: 'TOGGLE_READING_MODE' }, 'Modo lectura')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            state.readingMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={state.readingMode}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            state.readingMode ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      {/* Reduced Complexity */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                          Reducir Complejidad
                        </label>
                        <button
                          onClick={() => handleToggle({ type: 'TOGGLE_REDUCED_COMPLEXITY' }, 'Complejidad reducida')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            state.reducedComplexity ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={state.reducedComplexity}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            state.reducedComplexity ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      {/* Enhanced Focus */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                          Foco Mejorado
                        </label>
                        <button
                          onClick={() => handleToggle({ type: 'TOGGLE_ENHANCED_FOCUS' }, 'Foco mejorado')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            state.enhancedFocus ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={state.enhancedFocus}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            state.enhancedFocus ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Audio Tab */}
                  {activeTab === 'audio' && (
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
                      <h3 className="font-semibold text-gray-900 dark:text-white">Configuración Audio</h3>
                      
                      {/* Announcements */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                          Anuncios de Pantalla
                        </label>
                        <button
                          onClick={() => handleToggle({ type: 'TOGGLE_ANNOUNCEMENTS' }, 'Anuncios de pantalla')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            state.announcements ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={state.announcements}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            state.announcements ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      {/* Audio Descriptions */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                          Descripciones de Audio
                        </label>
                        <button
                          onClick={() => handleToggle({ type: 'TOGGLE_AUDIO_DESCRIPTIONS' }, 'Descripciones de audio')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            state.audioDescriptions ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={state.audioDescriptions}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            state.audioDescriptions ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      {/* Autoplay */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                          Reproducción Automática
                        </label>
                        <button
                          onClick={() => handleToggle({ type: 'TOGGLE_AUTOPLAY' }, 'Reproducción automática')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            state.autoplay ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          role="switch"
                          aria-checked={state.autoplay}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            state.autoplay ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Live Region for announcements */}
              <div
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
                id="accessibility-announcements"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdvancedAccessibilityMenu;
