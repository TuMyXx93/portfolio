import { useEffect } from 'react';

export const useKeyboardNavigation = (sectionIds: string[]) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentSection = sectionIds.findIndex(
        id => document.getElementById(id)?.getBoundingClientRect().top === 0
      );

      if (e.key === 'ArrowDown' && currentSection < sectionIds.length - 1) {
        e.preventDefault();
        document
          .getElementById(sectionIds[currentSection + 1])
          ?.scrollIntoView({
            behavior: 'smooth',
          });
      }

      if (e.key === 'ArrowUp' && currentSection > 0) {
        e.preventDefault();
        document
          .getElementById(sectionIds[currentSection - 1])
          ?.scrollIntoView({
            behavior: 'smooth',
          });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sectionIds]);
};
