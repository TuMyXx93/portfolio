'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, NAVIGATION_LINKS } from '@/constants';
import { SocialLinks } from '@/components/common/SocialLinks';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      className="relative w-full bg-slate-950/80 border-t border-white/10 backdrop-blur-xl text-gray-400 py-12 md:py-16 px-4 overflow-hidden"
      role="contentinfo"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-400/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-12 border-b border-white/10">
          {/* Columna 1: Branding e Identidad */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="TumiDev Logo"
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Ingeniero de Sistemas & Desarrollador Full Stack especializado en arquitecturas Monorepo, React 19, Fastify, Flutter e ingeniería potenciada con Inteligencia Artificial.
            </p>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-widest">
              Navegación
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {NAVIGATION_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => handleNavClick(e, link.href)}
                    className="hover:text-amber-400 transition-colors duration-200 focus:outline-none focus:text-amber-400"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Conexión y Redes Sociales */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4">
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-widest">
              Redes Sociales
            </h3>
            <p className="text-sm text-gray-400">
              ¿Tienes un proyecto en mente? Conectemos.
            </p>
            <SocialLinks size="md" orientation="horizontal" />
          </div>
        </div>

        {/* Barra Inferior de Derechos de Autor */}
        <div className="pt-8 text-center text-xs text-gray-500">
          <p>© {currentYear} TumiDev. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
