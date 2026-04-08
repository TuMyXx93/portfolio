import { useCallback, useRef } from 'react';

export const useThrottle = (callback: Function, limit: number) => {
  const waitingRef = useRef(false);

  return useCallback(
    (...args: any[]) => {
      if (!waitingRef.current) {
        callback(...args);
        waitingRef.current = true;
        setTimeout(() => {
          waitingRef.current = false;
        }, limit);
      }
    },
    [callback, limit]
  );
};
