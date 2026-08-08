import { Project, Skill } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Portfolio Profesional',
    description:
      'Portfolio profesional de alto rendimiento desarrollado con Next.js 16 Turbopack, React 19, TypeScript y Tailwind CSS.',
    image:
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/portfolio/1.notebook.webp',
    images: [
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/portfolio/1.notebook.webp',
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/portfolio/2.movil.webp',
    ],
    category: 'fullstack',
    technologies: [
      { name: 'Next.js', icon: 'nextjs.svg', color: '#ffffff' },
      { name: 'TypeScript', icon: 'typescript.svg', color: '#007ACC' },
      { name: 'Tailwind', icon: 'tailwind.svg', color: '#38B2AC' },
      { name: 'Framer Motion', icon: 'framer.svg', color: '#FF0080' },
    ],
    github: 'https://github.com/TuMyXx93/portfolio',
    demo: 'https://portfolio-eta-orpin-11.vercel.app/',
    featured: true,
    architectureDetails:
      'Arquitectura Next.js App Router con arquitectura Diátaxis para documentación, bundle optimizado con pnpm 11, pipeline de CI/CD automatizado en GitHub Actions y Vercel Production deployment.',
  },
  {
    id: 2,
    title: 'Tsatsɵ Musik',
    description:
      'Aplicación móvil educativa e interactiva desarrollada con Flutter para la enseñanza y revitalización lingüística del idioma Namtrik (Pueblo Misak). Incluye 6 módulos de aprendizaje lúdico, pronunciación con audios nativos y diccionario bilingüe.',
    image:
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tsatso-musik/1.home.webp',
    images: [
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tsatso-musik/1.home.webp',
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tsatso-musik/4.activity4.webp',
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tsatso-musik/5.activity5.webp',
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tsatso-musik/6.activuty6.webp',
    ],
    category: 'mobile',
    technologies: [
      { name: 'Flutter 3', icon: 'flutter.svg', color: '#02569B' },
      { name: 'Dart', icon: 'dart.svg', color: '#0175C2' },
      { name: 'Hive NoSQL DB', icon: 'hive.svg', color: '#FFA000' },
      { name: 'GetIt / Provider', icon: 'getit.svg', color: '#13B9FD' },
      { name: 'AudioPlayers', icon: 'audio.svg', color: '#FF5722' },
    ],
    github: 'https://github.com/TuMyXx93/tsatso_musik',
    demo: 'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tsatso-musik/tsatsomusik-latest.apk',
    featured: true,
    architectureDetails:
      'Desarrollo pedagógico y cultural para el Cabildo Indígena del Resguardo de Guambía (Pueblo Misak). Arquitectura limpia en Flutter modularizada en 6 actividades pedagógicas. Motor de almacenamiento persisente con base de datos NoSQL Hive (`hive_flutter`), inyección de dependencias con GetIt (Service Locator), gestión de estado con Provider y reproducción nativa de audios en Namtrik.',
  },
  {
    id: 3,
    title: 'Diccionario Cultural Misak',
    description:
      'Plataforma Enterprise PWA para la preservación cultural digital del idioma Namtrik y la memoria colectiva del Pueblo Misak de Colombia. Combina React 19 + PWA con un Backend de microservicios en Fastify, Prisma ORM y PostgreSQL.',
    image:
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/misak-dictionary/1.home.webp',
    images: [
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/misak-dictionary/1.home.webp',
    ],
    category: 'fullstack',
    technologies: [
      { name: 'React 19 PWA', icon: 'react.svg', color: '#61DAFB' },
      { name: 'Fastify API', icon: 'fastify.svg', color: '#009688' },
      { name: 'TypeScript 5.9', icon: 'typescript.svg', color: '#007ACC' },
      { name: 'Prisma / Postgres', icon: 'prisma.svg', color: '#2D3748' },
      { name: 'Vite / Biome', icon: 'vite.svg', color: '#646CFF' },
    ],
    github: 'https://github.com/TuMyXx93/misak-dictionary-docs',
    featured: true,
    architectureDetails:
      'Plataforma Enterprise de preservación cultural digital para la comunidad indígena Misak de Colombia. Arquitectura Monorepo desacoplada: Frontend cliente PWA en React 19.2 + Vite + TypeScript (177 tests unitarios) y Backend API Service en Fastify + Prisma ORM + PostgreSQL (246 tests con 80% de cobertura), auditado estrictamente con Biome CI.',
  },
  {
    id: 4,
    title: 'TumiSuite ERP & POS',
    description:
      'Plataforma integral de gestión empresarial ERP y Punto de Venta (POS) desarrollada en arquitectura Monorepo de alto rendimiento (Fastify, React 19, Tailwind v4, Prisma ORM, Redis y BullMQ).',
    image:
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tumisuite/1.1.login-light.webp',
    images: [
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tumisuite/1.1.login-light.webp',
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tumisuite/1.2.dashboard-light.webp',
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tumisuite/1.movil-light.webp',
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tumisuite/2.1.login-dark.webp',
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tumisuite/2.2.dashboard-dark.webp',
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tumisuite/2.movil-dark.webp',
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tumisuite/4.1.reports-light.webp',
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tumisuite/4.2.reports-dark.webp',
      'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/projects/tumisuite/3.movil-dark-light.webp',
    ],
    category: 'fullstack',
    technologies: [
      { name: 'Fastify API', icon: 'fastify.svg', color: '#009688' },
      { name: 'React 19', icon: 'react.svg', color: '#61DAFB' },
      { name: 'TypeScript', icon: 'typescript.svg', color: '#007ACC' },
      { name: 'Prisma / Postgres', icon: 'prisma.svg', color: '#2D3748' },
      { name: 'Redis / BullMQ', icon: 'redis.svg', color: '#DC382D' },
      { name: 'Tailwind v4', icon: 'tailwind.svg', color: '#38B2AC' },
    ],
    github: 'https://github.com/TuMyXx93/tumisuite-docs',
    featured: true,
    architectureDetails:
      'Arquitectura Monorepo enterprise gestionada con Turborepo y pnpm workspaces. Backend en Fastify con Prisma ORM (PostgreSQL), colas de procesamiento asíncrono con Redis + BullMQ y validación estricta Zod. Frontend en React 19 + Vite + Tailwind CSS v4 + TanStack Query. Cobertura de pruebas con Vitest y Playwright E2E, auditado con Biome CI.',
  },
];

export const SKILLS: Skill[] = [
  // Lenguajes & Core
  { name: 'TypeScript', icon: 'typescript.svg', category: 'languages', badge: 'v5.9' },
  { name: 'JavaScript (ESNext)', icon: 'javascript.svg', category: 'languages' },
  { name: 'Python', icon: 'python.svg', category: 'languages', badge: 'Misión TIC' },
  { name: 'Dart', icon: 'dart.svg', category: 'languages' },
  { name: 'HTML5 / CSS3', icon: 'html5.svg', category: 'languages' },

  // Frameworks & Libs
  { name: 'React 19', icon: 'react.svg', category: 'frameworks', badge: 'Frontend' },
  { name: 'Next.js 16', icon: 'nextjs.svg', category: 'frameworks', badge: 'App Router' },
  { name: 'Fastify API', icon: 'fastify.svg', category: 'frameworks', badge: 'Backend' },
  { name: 'Flutter 3', icon: 'flutter.svg', category: 'frameworks', badge: 'Mobile' },
  { name: 'Tailwind CSS v4', icon: 'tailwind.svg', category: 'frameworks' },
  { name: 'Vite', icon: 'vite.svg', category: 'frameworks' },
  { name: 'Framer Motion', icon: 'framer.svg', category: 'frameworks' },

  // Bases de Datos & ORM
  { name: 'PostgreSQL', icon: 'postgresql.svg', category: 'databases' },
  { name: 'Prisma ORM', icon: 'prisma.svg', category: 'databases' },
  { name: 'Redis / BullMQ', icon: 'redis.svg', category: 'databases', badge: 'Queues' },
  { name: 'Hive NoSQL', icon: 'hive.svg', category: 'databases', badge: 'Flutter' },

  // IA, Agentes & Herramientas
  { name: 'Agentes & CLIs de IA', icon: 'ai.svg', category: 'ai_tools', badge: 'Orquestación' },
  { name: 'LLMs & Prompt Eng.', icon: 'brain.svg', category: 'ai_tools', badge: 'IA Avanzada' },
  { name: 'Turborepo / pnpm', icon: 'turborepo.svg', category: 'ai_tools', badge: 'Monorepos' },
  { name: 'Git & GitHub Actions', icon: 'git.svg', category: 'ai_tools' },
  { name: 'Biome CI', icon: 'biome.svg', category: 'ai_tools', badge: 'Linter/Format' },
  { name: 'Vitest / Playwright', icon: 'test.svg', category: 'ai_tools', badge: 'QA Testing' },
  { name: 'Cloudflare R2 CDN', icon: 'cloudflare.svg', category: 'ai_tools' },
];

export const NAVIGATION_LINKS = [
  { title: 'Inicio', href: '#home' },
  { title: 'Sobre Mí', href: '#about' },
  { title: 'Experiencia', href: '#experience' },
  { title: 'Habilidades', href: '#skills' },
  { title: 'Proyectos', href: '#projects' },
  { title: 'Contacto', href: '#contact' },
];

export const EXPERIENCE_ITEMS = [
  {
    date: '2026 - Presente',
    title: 'Desarrollador Lead & Arquitecto de Software',
    company: 'TumiSuite ERP & POS System',
    description:
      'Diseño y desarrollo de plataforma integral de gestión empresarial ERP y Punto de Venta (POS) en arquitectura Monorepo enterprise (Fastify, React 19, Tailwind v4, Prisma ORM, Redis y BullMQ).',
    technologies: [
      'Fastify',
      'React 19',
      'TypeScript',
      'Prisma',
      'Redis',
      'Tailwind v4',
    ],
  },
  {
    date: '2025',
    title: 'Desarrollador Full Stack PWA',
    company: 'Diccionario Cultural Misak',
    description:
      'Desarrollo de plataforma PWA de preservación cultural digital para el idioma Namtrik. Arquitectura desacoplada en React 19 + PWA con microservicios en Fastify, PostgreSQL y suite de pruebas automatizadas.',
    technologies: [
      'React 19 PWA',
      'Fastify',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
      'Vite',
    ],
  },
  {
    date: '2024 - 2025',
    title: 'Desarrollador Móvil',
    company: 'Tsatsɵ Musik App',
    description:
      'Creación de aplicación móvil educativa e interactiva en Flutter para la enseñanza y revitalización del idioma Namtrik (Pueblo Misak). Implementación de 6 módulos pedagógicos, motor de audio nativo y almacenamiento NoSQL persistente.',
    technologies: [
      'Flutter 3',
      'Dart',
      'Hive NoSQL',
      'GetIt',
      'Provider',
      'AudioPlayers',
    ],
  },
  {
    date: '2023 - Presente',
    title: 'Desarrollador Full Stack & Creador del Portfolio',
    company: 'Portfolio Enterprise',
    description:
      'Ingeniería, evolución continua y optimización de rendimiento de portfolio web enterprise de alto impacto, implementado con Next.js 16 App Router, TypeScript, Tailwind CSS y almacenamiento CDN en Cloudflare R2.',
    technologies: [
      'Next.js 16',
      'TypeScript',
      'React 19',
      'Tailwind CSS',
      'Framer Motion',
      'Cloudflare R2',
    ],
  },
];

export const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/TuMyXx93',
    ariaLabel: 'Visitar perfil de GitHub de TumiDev',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/wilson-tumi/',
    ariaLabel: 'Visitar perfil de LinkedIn de TumiDev',
  },
  {
    id: 'twitter',
    label: 'X (Twitter)',
    href: 'https://x.com/Tumix19',
    ariaLabel: 'Visitar perfil de X de TumiDev',
  },
  {
    id: 'email',
    label: 'Correo',
    href: 'mailto:tumyxx2@gmail.com',
    ariaLabel: 'Enviar correo electrónico a TumiDev',
  },
];

export const PROFILE_IMAGES = [
  'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/profile/profile1.png',
  'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/profile/profile2.png',
  'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/profile/profile3.png',
  'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/profile/profile4.png',
  'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/profile/profile5.png',
  'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/profile/profile6.png',
  'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/profile/profile7.png',
  'https://pub-cf08710fb7df426c96d811575acc39c4.r2.dev/profile/profile8.png',
];

