# Portfolio Tumidev

Portfolio profesional desarrollado con Next.js, TypeScript, Tailwind CSS y Framer Motion.

## Objetivo

Mostrar proyectos, experiencia y habilidades con enfoque en rendimiento, accesibilidad y una experiencia visual moderna.

## Stack

- Next.js 16 (App Router + Turbopack)
- React 19
- TypeScript 5.9.3
- Tailwind CSS 4
- Framer Motion 12
- Jest 30

## Estado de upgrade (completado)

El upgrade por etapas ya fue ejecutado y validado a cabalidad:

1. **Etapa 1 (completada):** upgrades seguros (patch/minor) sin cambios de arquitectura.
2. **Etapa 2 (completada):** migracion de tooling mayor sin tocar runtime principal (ESLint CLI flat config, Jest 30, ajustes de configuracion).
3. **Etapa 3 (completada):** migraciones mayores de plataforma (Next 16 + React 19 + Tailwind 4 + Framer Motion 12) con validacion extendida.

## Validacion ejecutada

- `npm run lint`
- `npm run type-check`
- `npm run test`
- `npm run build`

Resultado: todas las validaciones en verde.

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
