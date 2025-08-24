import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">404 - Página no encontrada</h2>
        <p className="text-gray-400 mb-8">Lo sentimos, la página que buscas no existe.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
