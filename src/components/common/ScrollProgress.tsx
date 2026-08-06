'use client';
import { useEffect, useState } from 'react';

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setProgress(currentProgress);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-[#F7AB0A] origin-left z-50 transition-transform duration-100 ease-out pointer-events-none"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
};
