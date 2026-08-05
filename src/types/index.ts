// Tipos base para la aplicación
export interface SectionProps {
  id: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  github?: string;
  demo?: string;
  featured?: boolean;
  category?: 'fullstack' | 'frontend' | 'backend' | 'ai' | 'mobile';
  architectureDetails?: string;
}

export interface Technology {
  name: string;
  icon: string;
  color?: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'soft';
}
