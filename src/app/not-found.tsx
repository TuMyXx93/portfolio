import { Button } from '@/components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-custom px-4 sm:px-6">
      <div className="text-center max-w-md mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          404 - Página no encontrada
        </h2>
        <p className="text-gray-400 mb-8 text-sm md:text-base max-ch-65 mx-auto">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Button
          variant="primary"
          size="md"
          shape="rounded"
          href="/"
          ariaLabel="Volver al inicio"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
