import { useCallback } from 'react'

export const useThrottle = (callback: Function, limit: number) => {
  let waiting = false
  return useCallback((...args: any[]) => {
    if (!waiting) {
      callback(...args)
      waiting = true
      setTimeout(() => {
        waiting = false
      }, limit)
    }
  }, [callback, limit])
}