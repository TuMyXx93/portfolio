import { Project, Skill } from '@/types'

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Portfolio Next.js',
    description: 'Portfolio profesional desarrollado con Next.js, TypeScript y Tailwind CSS',
    image: '/images/portfolio.png',
    technologies: [
      { name: 'Next.js', icon: 'nextjs.svg', color: '#ffffff' },
      { name: 'TypeScript', icon: 'typescript.svg', color: '#007ACC' },
      { name: 'Tailwind', icon: 'tailwind.svg', color: '#38B2AC' },
      { name: 'Framer Motion', icon: 'framer.svg', color: '#FF0080' }
    ],
    github: 'https://github.com/tumidev/portfolio',
    demo: 'https://tumidev.com',
    featured: true
  },
  // Añade más proyectos aquí
]

export const SKILLS: Skill[] = [
  {
    name: 'React',
    icon: 'react.svg',
    level: 90,
    category: 'frontend'
  },
  {
    name: 'Next.js',
    icon: 'nextjs.svg',
    level: 85,
    category: 'frontend'
  },
  {
    name: 'TypeScript',
    icon: 'typescript.svg',
    level: 80,
    category: 'frontend'
  }
  // Añade más habilidades aquí
]

export const NAVIGATION_LINKS = [
  { title: 'Inicio', href: '#home' },
  { title: 'Sobre Mí', href: '#about' },
  { title: 'Proyectos', href: '#projects' },
  { title: 'Habilidades', href: '#skills' },
  { title: 'Contacto', href: '#contact' },
]

export const EXPERIENCE_ITEMS = [
  {
    date: '2023 - Presente',
    title: 'Desarrollador Full Stack Senior',
    company: 'Tech Solutions Inc.',
    description: 'Liderando el desarrollo de aplicaciones web escalables y mantenibles usando tecnologías modernas.',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'AWS']
  },
  {
    date: '2021 - 2023',
    title: 'Desarrollador Frontend',
    company: 'Digital Innovation Labs',
    description: 'Desarrollo de interfaces de usuario interactivas y optimización de rendimiento.',
    technologies: ['React', 'Redux', 'Tailwind CSS', 'Jest']
  },
  {
    date: '2019 - 2021',
    title: 'Desarrollador Web',
    company: 'Creative Web Agency',
    description: 'Creación de sitios web responsivos y aplicaciones web personalizadas.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'PHP']
  }
]