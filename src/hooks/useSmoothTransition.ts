import { useEffect, useState } from 'react';
import { useThrottle } from './useThrottle';

interface UseSmoothTransitionOptions {
  threshold?: number;
  onTransition?: (sectionId: string) => void;
}

export const useSmoothTransition = (
  sectionIds: string[],
  options: UseSmoothTransitionOptions = {}
) => {
  const [activeSection, setActiveSection] = useState('');
  const { threshold = 0.5, onTransition } = options;

  const handleScroll = useThrottle(() => {
    const sections = sectionIds
      .map(id => {
        const element = document.getElementById(id);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          id,
          visible:
            rect.top <= window.innerHeight * threshold &&
            rect.bottom >= window.innerHeight * threshold,
        };
      })
      .filter(Boolean);

    const visibleSection = sections.find(section => section?.visible);
    if (visibleSection && visibleSection.id !== activeSection) {
      setActiveSection(visibleSection.id);
      onTransition?.(visibleSection.id);
    }
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { activeSection, scrollToSection };
};
