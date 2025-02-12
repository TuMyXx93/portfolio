import { useState, useCallback } from 'react'

export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const startLoading = useCallback(() => {
    setIsLoading(true)
    setProgress(0)
  }, [])

  const updateProgress = useCallback((newProgress: number) => {
    setProgress(Math.min(newProgress, 100))
  }, [])

  const finishLoading = useCallback(() => {
    setProgress(100)
    setTimeout(() => setIsLoading(false), 300) // Pequeño delay para la animación
  }, [])

  return {
    isLoading,
    progress,
    startLoading,
    updateProgress,
    finishLoading
  }
}