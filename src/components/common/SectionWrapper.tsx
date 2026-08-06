'use client';
import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { useLoadingState } from '@/hooks/useLoadingState';
import { preloadResources } from '@/lib/preloadResources';

interface SectionWrapperProps {
  children: ReactNode;
  resources?: Array<{ type: 'image' | 'font' | 'script'; url: string }>;
}

export const SectionWrapper = ({
  children,
  resources = [],
}: SectionWrapperProps) => {
  const { isLoading, progress, startLoading, updateProgress, finishLoading } =
    useLoadingState();

  useEffect(() => {
    if (resources.length > 0) {
      startLoading();
      preloadResources(resources, updateProgress).then(finishLoading);
    }
  }, [resources, startLoading, updateProgress, finishLoading]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative"
    >
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-16 h-16 relative">
            <motion.div
              className="w-full h-full border-4 border-[#F7AB0A] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#F7AB0A] text-sm">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
      {children}
    </motion.div>
  );
};
