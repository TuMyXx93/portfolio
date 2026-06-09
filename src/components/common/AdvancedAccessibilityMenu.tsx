'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';
import {
  VisualTab,
  MotorTab,
  CognitiveTab,
  AudioTab,
} from './accessibility-tabs';

type TabId = 'visual' | 'motor' | 'cognitive' | 'audio';

const TAB_CONFIG = [
  { id: 'visual' as TabId, label: '👁️ Visual', icon: '👁️' },
  { id: 'motor' as TabId, label: '✋ Motor', icon: '✋' },
  { id: 'cognitive' as TabId, label: '🧠 Cognitivo', icon: '🧠' },
  { id: 'audio' as TabId, label: '🔊 Audio', icon: '🔊' },
];

export const AdvancedAccessibilityMenu = () => {
  const { dispatch, announceToScreenReader } = useAdvancedAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('visual');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    announceToScreenReader(
      isOpen ? 'Menú de accesibilidad cerrado' : 'Menú de accesibilidad abierto'
    );
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_ALL' });
    announceToScreenReader('Configuración de accesibilidad restablecida');
  };

  const renderTabContent = (tabId: TabId) => {
    switch (tabId) {
      case 'visual':
        return <VisualTab announceToScreenReader={announceToScreenReader} />;
      case 'motor':
        return <MotorTab announceToScreenReader={announceToScreenReader} />;
      case 'cognitive':
        return <CognitiveTab announceToScreenReader={announceToScreenReader} />;
      case 'audio':
        return <AudioTab announceToScreenReader={announceToScreenReader} />;
    }
  };

  return (
    <>
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

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={toggleMenu}
            />

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
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-3 w-full px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-200 rounded-lg transition-colors"
                >
                  🔄 Restablecer Todo
                </button>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-1 p-4" role="tablist">
                  {TAB_CONFIG.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
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

              <div className="p-4 space-y-4">
                <AnimatePresence mode="wait">
                  {renderTabContent(activeTab)}
                </AnimatePresence>
              </div>

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
