'use client';
import { CircularHero } from '@/components/hero/CircularHero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';

export default function Home() {
  const handleNavigation = (section: string) => {
    // Implementar navegación smooth scroll
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen" id="main-content">
      {/* Hero Section Circular */}
      <CircularHero onNavigate={handleNavigation} />
      
      {/* Secciones adicionales */}
      <section id="about" className="min-h-screen bg-slate-800">
        <About />
      </section>
      
      <section id="experience" className="min-h-screen bg-slate-900">
        <Experience />
      </section>
      
      <section id="skills" className="min-h-screen bg-slate-800">
        <Skills />
      </section>
      
      <section id="projects" className="min-h-screen bg-slate-900">
        <Projects />
      </section>
    </main>
  );
}
