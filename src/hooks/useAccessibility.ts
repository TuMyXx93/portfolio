import { useState, useEffect } from 'react'

interface AccessibilityPreferences {
  highContrast: boolean
  fontSize: 'normal' | 'large' | 'xlarge'
  reducedMotion: boolean
}

export const useAccessibility = () => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    highContrast: false,
    fontSize: 'normal',
    reducedMotion: false,
  })

  useEffect(() => {
    // Cargar preferencias guardadas
    const savedPreferences = localStorage.getItem('accessibility-preferences')
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }

    // Detectar preferencias del sistema
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setPreferences(prev => ({ ...prev, reducedMotion: true }))
    }
  }, [])

  const updatePreferences = (newPreferences: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPreferences }
      localStorage.setItem('accessibility-preferences', JSON.stringify(updated))
      return updated
    })
  }

  useEffect(() => {
    // Aplicar clases CSS según las preferencias
    document.documentElement.classList.toggle('high-contrast', preferences.highContrast)
    document.documentElement.classList.toggle('reduced-motion', preferences.reducedMotion)
    document.documentElement.classList.remove('text-normal', 'text-large', 'text-xlarge')
    document.documentElement.classList.add(`text-${preferences.fontSize}`)
  }, [preferences])

  return { preferences, updatePreferences }
}