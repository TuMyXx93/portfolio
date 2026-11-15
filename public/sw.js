// Service Worker para Portfolio PWA
const STATIC_CACHE_NAME = 'tumidev-static-v1.1.2';
const DYNAMIC_CACHE_NAME = 'tumidev-dynamic-v1.1.2';

// Archivos estáticos para cachear
const STATIC_FILES = ['/offline', '/manifest.json', '/images/logo.png'];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then(cache => {
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
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
  } catch (_error) {
    if (request.mode === 'navigate') {
      return getOfflinePage();
    }
    return Response.error();
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
          background: linear-gradient(135deg, #0a1628 0%, #1e293b 100%);
          color: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .offline-container {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(245, 158, 11, 0.25);
          padding: 2rem;
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }
        h1 { margin-bottom: 1rem; }
        p { margin-bottom: 1.5rem; opacity: 0.9; }
        .retry-btn {
          display: inline-block;
          text-decoration: none;
          background: rgba(245, 158, 11, 0.2);
          border: 2px solid rgba(245, 158, 11, 0.5);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .retry-btn:hover {
          background: rgba(245, 158, 11, 0.35);
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <div class="offline-container">
        <h1>Sin conexión</h1>
        <p>No hay conexión a internet disponible.<br>Verifica tu conexión e intenta nuevamente.</p>
        <a class="retry-btn" href="/">Reintentar</a>
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
