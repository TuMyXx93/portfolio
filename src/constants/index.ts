import { Project, Skill } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Portfolio Next.js 16 Enterprise',
    description:
      'Portfolio profesional de alto rendimiento desarrollado con Next.js 16 Turbopack, React 19, TypeScript y Tailwind CSS.',
    image: '/images/portfolio.svg',
    category: 'fullstack',
    technologies: [
      { name: 'Next.js', icon: 'nextjs.svg', color: '#ffffff' },
      { name: 'TypeScript', icon: 'typescript.svg', color: '#007ACC' },
      { name: 'Tailwind', icon: 'tailwind.svg', color: '#38B2AC' },
      { name: 'Framer Motion', icon: 'framer.svg', color: '#FF0080' },
    ],
    github: 'https://github.com/TuMyXx93/portfolio',
    demo: 'https://tumidev.com',
    featured: true,
    architectureDetails:
      'Arquitectura Next.js App Router con arquitectura Diátaxis para documentación, bundle optimizado con pnpm 11, pipeline de CI/CD automatizado en GitHub Actions y Vercel Production deployment.',
  },
  {
    id: 2,
    title: 'Enterprise AI Agent Orchestrator',
    description:
      'Plataforma de orquestación de subagentes de IA distribuida con gestión de contexto en tiempo real y memoria persistente Engram.',
    image: '/images/portfolio.svg',
    category: 'ai',
    technologies: [
      { name: 'Python', icon: 'python.svg', color: '#3776AB' },
      { name: 'FastAPI', icon: 'fastapi.svg', color: '#009688' },
      { name: 'React', icon: 'react.svg', color: '#61DAFB' },
      { name: 'TypeScript', icon: 'typescript.svg', color: '#007ACC' },
    ],
    github: 'https://github.com/TuMyXx93/ai-orchestrator',
    demo: 'https://ai-orchestrator.tumidev.com',
    featured: true,
    architectureDetails:
      'Sistema de comunicación concurrente vía websockets y canal RPC bidireccional, persistencia SQLite WAL de alto rendimiento y surfacing de conflictos semánticos.',
  },
  {
    id: 3,
    title: 'DevOps & Cloud Monitoring Dashboard',
    description:
      'Dashboard analítico en tiempo real para observabilidad de infraestructura Cloud, salud de pipelines CI/CD y telemetría de microservicios.',
    image: '/images/portfolio.svg',
    category: 'frontend',
    technologies: [
      { name: 'React 19', icon: 'react.svg', color: '#61DAFB' },
      { name: 'Tailwind', icon: 'tailwind.svg', color: '#38B2AC' },
      { name: 'Recharts', icon: 'recharts.svg', color: '#22B5BF' },
    ],
    github: 'https://github.com/TuMyXx93/devops-dashboard',
    demo: 'https://dashboard.tumidev.com',
    featured: false,
    architectureDetails:
      'Diseño modular basado en Web Workers para procesamiento no bloqueante de streams de eventos, micro-animaciones fluidas e integración con APIs REST/GraphQL.',
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
