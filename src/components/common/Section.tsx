import { SectionProps } from '@/types';

export const Section = ({ id, title, className, children }: SectionProps) => {
  return (
    <section id={id} className={`relative min-h-screen w-full ${className}`}>
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </section>
  );
};
