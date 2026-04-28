import { useCallback, useRef } from 'react';

type ThrottledCallback<T extends unknown[]> = (...args: T) => void;

export const useThrottle = <T extends unknown[]>(
  callback: ThrottledCallback<T>,
  limit: number
): ThrottledCallback<T> => {
  const waitingRef = useRef(false);

  return useCallback(
    (...args: T) => {
      if (!waitingRef.current) {
        callback(...args);
        waitingRef.current = true;
        setTimeout(() => {
          waitingRef.current = false;
        }, limit);
      }
    },
    [callback, limit]
  ) as ThrottledCallback<T>;
};
