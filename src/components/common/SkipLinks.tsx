'use client'
import { useCallback, useEffect, useState } from 'react'

interface SkipLinksProps {
  links: Array<{
    id: string
    label: string
  }>
}

export const SkipLinks = ({ links }: SkipLinksProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      setIsVisible(true)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <nav
      className={`fixed top-0 left-0 z-50 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Links de acceso rápido"
    >
      {links.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className="skip-link"
          onClick={() => {
            const element = document.getElementById(id)
            element?.focus()
          }}
        >
          {label}
        </a>
      ))}
    </nav>
  )
}