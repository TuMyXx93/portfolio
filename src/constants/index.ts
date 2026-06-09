import { Project, Skill } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Portfolio Next.js',
    description:
      'Portfolio profesional desarrollado con Next.js, TypeScript y Tailwind CSS',
    image: '/images/portfolio.svg',
    technologies: [
      { name: 'Next.js', icon: 'nextjs.svg', color: '#ffffff' },
      { name: 'TypeScript', icon: 'typescript.svg', color: '#007ACC' },
      { name: 'Tailwind', icon: 'tailwind.svg', color: '#38B2AC' },
      { name: 'Framer Motion', icon: 'framer.svg', color: '#FF0080' },
    ],
    github: 'https://github.com/tumidev/portfolio',
    demo: 'https://tumidev.com',
    featured: true,
  },
];

export const SKILLS: Skill[] = [
  {
    name: 'React',
    icon: 'react.svg',
    level: 90,
    category: 'frontend',
  },
  {
    name: 'Next.js',
    icon: 'nextjs.svg',
    level: 85,
    category: 'frontend',
  },
  {
    name: 'TypeScript',
    icon: 'typescript.svg',
    level: 80,
    category: 'frontend',
  },
];

export const NAVIGATION_LINKS = [
  { title: 'Inicio', href: '#home' },
  { title: 'Sobre Mí', href: '#about' },
  { title: 'Proyectos', href: '#projects' },
  { title: 'Habilidades', href: '#skills' },
  { title: 'Contacto', href: '#contact' },
];

export const EXPERIENCE_ITEMS = [
  {
    date: '2023 - Presente',
    title: 'Desarrollador Full Stack Senior',
    company: 'Freelance',
    description:
      'Desarrollo de aplicaciones web full stack y consultoría técnica para clientes diversos.',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'React'],
  },
  {
    date: '2021 - 2023',
    title: 'Desarrollador Frontend',
    company: 'Proyecto independiente',
    description:
      'Desarrollo de interfaces de usuario interactivas y optimización de rendimiento web.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
];
