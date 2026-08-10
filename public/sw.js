// Service Worker para Portfolio PWA
const STATIC_CACHE_NAME = 'tumidev-static-v1.1.1';
const DYNAMIC_CACHE_NAME = 'tumidev-dynamic-v1.1.1';

// Archivos estáticos para cachear
const STATIC_FILES = ['/', '/offline', '/manifest.json', '/images/logo.png'];

// Estrategias de cache
const CACHE_STRATEGIES = {
  STATIC: 'cache-first',
  DYNAMIC: 'network-first',
  API: 'network-only',
};

// Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker...');

  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('[SW] Precaching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker...');

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME
            ) {
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
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar peticiones GET del mismo origen. Las mutaciones nunca se cachean.
  if (url.origin !== location.origin || request.method !== 'GET') return;

  // Las APIs, incluido el formulario de contacto, siempre deben ir a la red.
  if (url.pathname.startsWith('/api/')) return;

  // Estrategia para archivos estáticos
  if (
    STATIC_FILES.includes(url.pathname) ||
    url.pathname.startsWith('/_next/static/')
  ) {
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
  return new Response(
    `
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
  `,
    {
      headers: { 'Content-Type': 'text/html' },
    }
  );
}

// Escuchar mensajes del cliente
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
