'use client';
import { Metadata } from 'next';

// Note: metadata export is not available in client components
// This will be handled by the layout or through other means

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div className="text-center px-6 py-12 max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          {/* Offline Icon */}
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.48L18.18 13.8 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7l11.63 14.49.01.01.01-.01 3.9-4.86 3.32 3.32 1.27-1.27-3.46-3.46z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-4">
            🔌 Sin Conexión
          </h1>

          {/* Description */}
          <p className="text-white/90 mb-6 leading-relaxed">
            No hay conexión a internet disponible en este momento. 
            Las páginas que visitaste anteriormente están disponibles sin conexión.
          </p>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 border border-white/30 hover:border-white/50"
            >
              🔄 Reintentar Conexión
            </button>

            <button
              onClick={() => window.history.back()}
              className="w-full bg-transparent hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              ← Volver Atrás
            </button>
          </div>

          {/* Tips */}
          <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              💡 Consejos
            </h3>
            <ul className="text-white/80 text-sm space-y-1 text-left">
              <li>• Verifica tu conexión WiFi o datos móviles</li>
              <li>• Las páginas visitadas funcionan sin conexión</li>
              <li>• Los cambios se sincronizarán al reconectar</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-white/60 text-sm">
          TumiDev Portfolio • Modo Offline Activo
        </div>
      </div>
    </div>
  );
}
