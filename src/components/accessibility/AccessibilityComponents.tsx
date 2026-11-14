'use client';

export const SkipToContent = () => {
  const announceToScreenReader = (message: string) => {
    // Safe announcement for SSR
    if (typeof window !== 'undefined') {
      const liveRegion = document.getElementById('live-region-polite');
      if (liveRegion) {
        liveRegion.textContent = '';
        setTimeout(() => {
          liveRegion.textContent = message;
        }, 10);
      }
    }
  };

  const skipToMain = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
      announceToScreenReader('Saltando al contenido principal');
    }
  };

  return (
    <button
      onClick={skipToMain}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
      onFocus={() =>
        announceToScreenReader('Enlace para saltar al contenido principal')
      }
    >
      Saltar al contenido principal
    </button>
  );
};

export const LiveRegion = () => {
  return (
    <>
      {/* Polite announcements for non-urgent updates */}
      <div
        id="live-region-polite"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Assertive announcements for urgent updates */}
      <div
        id="live-region-assertive"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Status announcements for loading/completion states */}
      <div
        id="live-region-status"
        role="status"
        aria-live="polite"
        className="sr-only"
      />
    </>
  );
};
