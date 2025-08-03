'use client';
import { useAdvancedAccessibility } from '@/contexts/AccessibilityContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      onFocus={() => announceToScreenReader('Enlace para saltar al contenido principal')}
    >
      Saltar al contenido principal
    </button>
  );
};

export const Breadcrumbs = ({ items }: { items: Array<{ label: string; href?: string }> }) => {
  const router = useRouter();

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

  const handleNavigation = (href: string, label: string) => {
    if (href) {
      router.push(href as any);
      announceToScreenReader(`Navegando a ${label}`);
    }
  };

  return (
    <nav aria-label="Navegación de migas de pan" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 mx-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {item.href ? (
              <button
                onClick={() => handleNavigation(item.href!, item.label)}
                className="hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </button>
            ) : (
              <span aria-current="page" className="font-medium text-gray-900 dark:text-white">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export const HeadingNavigation = () => {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    const updateHeadings = () => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const headingsData = Array.from(headingElements).map((heading, index) => {
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
        return {
          id: heading.id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1))
        };
      });
      setHeadings(headingsData);
    };

    updateHeadings();
    const observer = new MutationObserver(updateHeadings);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const navigateToHeading = (id: string, text: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth' });
      announceToScreenReader(`Navegando a encabezado: ${text}`);
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white p-2 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Navegación por encabezados"
        aria-expanded={isOpen}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 bottom-full mb-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-80 overflow-y-auto">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Navegación por Encabezados</h3>
          </div>
          <ul className="p-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => navigateToHeading(heading.id, heading.text)}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    heading.level > 1 ? `ml-${(heading.level - 1) * 2}` : ''
                  }`}
                  style={{ paddingLeft: `${heading.level * 8}px` }}
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400">H{heading.level}</span>
                  <span className="block text-sm text-gray-900 dark:text-white truncate">
                    {heading.text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
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

export const FocusTrap = ({ 
  children, 
  active = true,
  onEscape 
}: { 
  children: React.ReactNode;
  active?: boolean;
  onEscape?: () => void;
}) => {
  useEffect(() => {
    if (!active) return;

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, onEscape]);

  return <>{children}</>;
};
