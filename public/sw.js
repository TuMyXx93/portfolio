// Service Worker para Portfolio PWA
const CACHE_NAME = 'tumidev-portfolio-v1.0.0';
const STATIC_CACHE_NAME = 'tumidev-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'tumidev-dynamic-v1.0.0';

// Archivos estáticos para cachear
const STATIC_FILES = [
  '/',
  '/offline',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Estrategias de cache
const CACHE_STRATEGIES = {
  STATIC: 'cache-first',
  DYNAMIC: 'network-first',
  API: 'network-only',
};

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precaching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('[SW] Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Interceptar peticiones (Fetch)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar peticiones del mismo origen
  if (url.origin !== location.origin) return;

  // Estrategia para archivos estáticos
  if (STATIC_FILES.includes(url.pathname) || url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Estrategia para páginas dinámicas
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // Estrategia para imágenes
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Default: network first
  event.respondWith(networkFirst(request));
});

// Estrategia Cache First
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return getOfflinePage();
  }
}

// Estrategia Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache...');
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si es una navegación, mostrar página offline
    if (request.mode === 'navigate') {
      return getOfflinePage();
    }
    
    throw error;
  }
}

// Página offline de respaldo
async function getOfflinePage() {
  const cache = await caches.open(STATIC_CACHE_NAME);
  const offlinePage = await cache.match('/offline');
  
  if (offlinePage) {
    return offlinePage;
  }

  // Página offline básica si no existe
  return new Response(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sin conexión - TumiDev Portfolio</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
          text-align: center; 
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .offline-container {
          background: rgba(255,255,255,0.1);
          padding: 2rem;
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }
        h1 { margin-bottom: 1rem; }
        p { margin-bottom: 1.5rem; opacity: 0.9; }
        button {
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.3);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        button:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <div class="offline-container">
        <h1>🔌 Sin conexión</h1>
        <p>No hay conexión a internet disponible.<br>Verifica tu conexión e intenta nuevamente.</p>
        <button onclick="window.location.reload()">🔄 Reintentar</button>
      </div>
    </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  });
}

// Escuchar mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background Sync para formularios offline
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    console.log('[SW] Syncing contact form...');
    
    // Get stored form data from IndexedDB or cache
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const storedData = await cache.match('/contact-form-data');
    
    if (storedData) {
      const formData = await storedData.json();
      
      // Try to submit the form data
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log('[SW] Contact form synced successfully');
        // Remove the stored data after successful sync
        await cache.delete('/contact-form-data');
        
        // Notify client of successful sync
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
          client.postMessage({
            type: 'CONTACT_FORM_SYNCED',
            success: true,
          });
        });
      } else {
        throw new Error('Failed to sync contact form');
      }
    }
  } catch (error) {
    console.error('[SW] Sync failed:', error);
    
    // Notify client of sync failure
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'CONTACT_FORM_SYNC_FAILED',
        error: error.message,
      });
    });
  }
}

// Push notifications (para futuras implementaciones)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver portfolio',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icons/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('TumiDev Portfolio', options)
  );
});

// Manejar clicks en notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
