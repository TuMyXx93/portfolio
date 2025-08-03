import { useEffect } from 'react';

type IntersectionCallback = (entry: IntersectionObserverEntry) => void;

export const useLazySection = (
  sectionId: string,
  onIntersect: IntersectionCallback,
  threshold = 0.1
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            onIntersect(entry);
            // Una vez que la sección es visible, dejamos de observar
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    const element = document.getElementById(sectionId);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [sectionId, onIntersect, threshold]);
};
