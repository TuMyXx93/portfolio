'use client';
import { useEffect, useState } from 'react';

interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  updateAvailable: boolean;
}

interface PWAActions {
  installApp: () => Promise<void>;
  updateApp: () => void;
  shareApp: () => Promise<void>;
}

export function usePWA(): PWAState & PWAActions {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<PWAInstallPrompt | null>(null);

  useEffect(() => {
    // Verificar si ya está instalado
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebApp = 'standalone' in window.navigator && 
        (window.navigator as any).standalone === true;
      setIsInstalled(isStandalone || Boolean(isInWebApp));
    };

    // Verificar estado online/offline
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Registrar Service Worker (únicamente en entorno de producción)
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          console.log('✅ Service Worker registrado:', registration);

          // Verificar actualizaciones
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                  console.log('🔄 Nueva versión disponible');
                }
              });
            }
          });

          // Escuchar cambios de estado
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
          });

        } catch (error) {
          console.error('❌ Error registrando Service Worker:', error);
        }
      }
    };

    // Manejar evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as any);
      setIsInstallable(true);
      console.log('📱 App es instalable');
    };

    // Event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Inicializar
    checkInstalled();
    updateOnlineStatus();
    registerServiceWorker();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      console.log('❌ Prompt de instalación no disponible');
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ Usuario aceptó la instalación');
        setIsInstalled(true);
      } else {
        console.log('❌ Usuario rechazó la instalación');
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('❌ Error durante la instalación:', error);
    }
  };

  const updateApp = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  const shareApp = async () => {
    const shareData = {
      title: 'TumiDev Portfolio',
      text: 'Conoce el portfolio profesional de TumiDev - Desarrollador Full Stack',
      url: window.location.origin,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        console.log('✅ Contenido compartido exitosamente');
      } else {
        // Fallback: copiar al clipboard
        await navigator.clipboard.writeText(window.location.origin);
        console.log('📋 URL copiada al clipboard');
        
        // Mostrar notificación temporal
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('URL copiada', {
            body: 'La URL del portfolio se copió al clipboard',
            icon: '/icons/icon-192x192.png',
          });
        }
      }
    } catch (error) {
      console.error('❌ Error compartiendo:', error);
    }
  };

  return {
    // State
    isInstallable,
    isInstalled,
    isOnline,
    updateAvailable,
    
    // Actions
    installApp,
    updateApp,
    shareApp,
  };
}

export default usePWA;
