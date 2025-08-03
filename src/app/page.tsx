'use client';
import { CircularHero } from '@/components/hero/CircularHero';
import { About } from '@/components/sections/About';
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
        {/* Contenido de Experience - A implementar */}
        <div className="flex items-center justify-center h-full">
          <h2 className="text-4xl text-white">Experiencia</h2>
        </div>
      </section>
      
      <section id="skills" className="min-h-screen bg-slate-800">
        {/* Contenido de Skills - A implementar */}
        <div className="flex items-center justify-center h-full">
          <h2 className="text-4xl text-white">Habilidades</h2>
        </div>
      </section>
      
      <section id="projects" className="min-h-screen bg-slate-900">
        <Projects />
      </section>
    </main>
  );
}
