'use client'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Header } from '@/components/layout/Header'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ScrollIndicator } from '@/components/common/ScrollIndicator'
import { NAVIGATION_LINKS } from '@/constants'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import { useSmoothTransition } from '@/hooks/useSmoothTransition'

export default function Home() {
  const sectionIds = ['home', 'about', 'projects']
  useKeyboardNavigation(sectionIds)
  const { activeSection, scrollToSection } = useSmoothTransition(sectionIds, {
    onTransition: (sectionId) => {
      window.history.pushState({}, '', `#${sectionId}`)
    }
  })

  return (
    <>
      <Header 
        links={NAVIGATION_LINKS} 
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      <ScrollIndicator
        sections={sectionIds}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
      <div 
        className="snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-none" 
        role="main" 
        aria-label="Contenido principal"
      >
        <SectionWrapper>
          <div className="snap-start" id="home">
            <Hero />
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="snap-start" id="about">
            <About />
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="snap-start" id="projects">
            <Projects />
          </div>
        </SectionWrapper>
      </div>
    </>
  )
}
