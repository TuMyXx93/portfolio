'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { usePWA } from '@/hooks/usePWA';
import { useState } from 'react';
import { Button } from '@/components/common/Button';

export const PWAInstallButton = () => {
  const {
    isInstallable,
    isInstalled,
    isOnline,
    updateAvailable,
    installApp,
    updateApp,
    shareApp,
  } = usePWA();
  const [showTooltip, setShowTooltip] = useState(false);

  // No mostrar si ya está instalado y no hay actualizaciones
  if (isInstalled && !updateAvailable) return null;

  const handleInstall = async () => {
    try {
      await installApp();
    } catch (error) {
      console.error('Error installing app:', error);
    }
  };

  const handleUpdate = () => {
    updateApp();
  };

  const handleShare = async () => {
    try {
      await shareApp();
    } catch (error) {
      console.error('Error sharing app:', error);
    }
  };

  return (
    <AnimatePresence>
      {(isInstallable || updateAvailable) && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="flex flex-col gap-2">
            {/* Update Available Button */}
            {updateAvailable && (
              <div className="relative">
                <Button
                  variant="icon"
                  shape="circle"
                  size="sm"
                  onClick={handleUpdate}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  ariaLabel="Actualizar aplicación"
                  className="bg-orange-500 hover:bg-orange-600 !p-3"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                      fill="currentColor"
                    />
                  </svg>
                </Button>
                {/* Notification Badge */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />

                {/* Tooltip reposicionado para móvil */}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 bottom-full mb-2 hidden sm:block"
                    >
                      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                        Nueva versión disponible
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Install Button */}
            {isInstallable && (
              <div className="relative">
                <Button
                  variant="icon"
                  shape="circle"
                  size="sm"
                  onClick={handleInstall}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  ariaLabel="Instalar aplicación"
                  className="bg-amber-500 hover:bg-amber-600 !p-3"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
                      fill="currentColor"
                    />
                  </svg>
                </Button>

                {/* Tooltip reposicionado */}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 bottom-full mb-2 hidden sm:block"
                    >
                      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                        Instalar como app
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Share Button */}
            <Button
              variant="icon"
              shape="circle"
              size="sm"
              onClick={handleShare}
              ariaLabel="Compartir portfolio"
              className="bg-green-500 hover:bg-green-600 !p-3"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"
                  fill="currentColor"
                />
              </svg>
            </Button>

            {/* Offline Indicator */}
            {!isOnline && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500 text-white px-3 py-2 rounded-full text-sm shadow-lg text-center"
              >
                📶 Sin conexión
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallButton;
