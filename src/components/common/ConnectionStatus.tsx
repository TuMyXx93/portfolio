'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { usePWA } from '@/hooks/usePWA';
import { useState, useEffect, useRef, useCallback } from 'react';

export const ConnectionStatus = () => {
  const { isOnline } = usePWA();
  const [showStatus, setShowStatus] = useState(false);
  const lastOnlineStatusRef = useRef(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideStatus = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowStatus(false);
  }, []);

  useEffect(() => {
    if (isOnline !== lastOnlineStatusRef.current) {
      lastOnlineStatusRef.current = isOnline;

      requestAnimationFrame(() => {
        setShowStatus(true);
      });

      if (isOnline) {
        timeoutRef.current = setTimeout(() => {
          setShowStatus(false);
        }, 3000);
      }
    }
  }, [isOnline]);

  useEffect(() => {
    if (!isOnline) {
      requestAnimationFrame(() => {
        setShowStatus(true);
      });
    }
  }, [isOnline]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div
            className={`w-full py-3 px-4 text-center text-white font-medium ${
              isOnline
                ? 'bg-green-500 shadow-green-500/20'
                : 'bg-red-500 shadow-red-500/20'
            } shadow-lg backdrop-blur-sm`}
          >
            <div className="flex items-center justify-center gap-2">
              {isOnline ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    ✅
                  </motion.div>
                  <span>Conexión restaurada</span>
                </>
              ) : (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    📶
                  </motion.div>
                  <span>Sin conexión a internet</span>
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2 text-sm opacity-75"
                  >
                    Modo offline activo
                  </motion.div>
                </>
              )}
            </div>

            {!isOnline && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-sm opacity-90"
              >
                Las páginas visitadas están disponibles sin conexión
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConnectionStatus;
