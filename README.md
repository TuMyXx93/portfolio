# Portfolio Tumidev

Portfolio profesional desarrollado con Next.js, TypeScript, Tailwind CSS y Framer Motion.

## Objetivo

Mostrar proyectos, experiencia y habilidades con enfoque en rendimiento, accesibilidad y una experiencia visual moderna.

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

## Requisitos

- Node.js >= 18.17.0
- npm >= 9.0.0

## Instalacion y desarrollo

```bash
npm install
npm run dev
```

## Scripts principales

```bash
npm run lint
npm run type-check
npm run test
npm run build
```

## Flujo de ramas

- `dev`: rama de desarrollo
- `main`: rama estable para produccion
- Todo cambio se implementa en `dev` y luego se integra a `main` tras validaciones.

## Checklist de salida a produccion

Antes de merge o despliegue:

1. Ejecutar `npm run lint`
2. Ejecutar `npm run type-check`
3. Ejecutar `npm run build`
4. Confirmar variables de entorno en plataforma de despliegue

## Documentacion adicional

- `CONTRIBUTING.md`: guia de contribucion
- `CHANGELOG.md`: historial de cambios
- `SECURITY.md`: lineamientos de seguridad
