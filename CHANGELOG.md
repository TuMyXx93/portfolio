# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Migración a pnpm v11.18.0**: sustituido `npm` por `pnpm` con configuración `.npmrc` enterprise (aislamiento de `node_modules`, lockfile v9.0).
- **Actualizaciones de dependencias de producción y desarrollo**: `next` a `16.2.12`, `react`/`react-dom` a `19.2.8`, `tailwindcss` a `4.3.3`, `framer-motion` a `12.43.0`, `dompurify` a `3.4.12`, `@playwright/test` a `1.62.1`, `jest` a `30.4.2`, `prettier` a `3.9.6`.
- **Aprobación de scripts de módulos nativos**: `pnpm approve-builds` configurado para `sharp@0.34.5`.
- **Sistema de colores enterprise progresivo** con degradación por profundidad (`deep-ocean`, `midnight-blue`, `twilight-navy`) y variables CSS semánticas.
- **Documento de investigación** `docs/RESEARCH_COLOR_SYSTEM.md` con verificación de accesibilidad WCAG 2.1 (ratios AAA/AA).
- **Integración Engram Cloud** en CI/CD para persistencia de memoria entre sesiones y máquinas.
- **Configuración de proyecto Engram** (`.engramrc.json`) con reglas de sesión, sync por hora y exclusiones.
- **Paleta extendida en Tailwind** (`deepOcean`, `midnightBlue`, `twilightNavy`, `amber.primary/light/dark`).
- **Nuevas claves de traducción** para `about`, `experience` y `skills` en `es` e `en`.

### Changed

- **BREAKING**: El tema visual ahora es **dark mode único y forzado** en `:root`; la alternancia claro/oscuro ha sido eliminada en favor de una identidad enterprise cohesiva. Todos los fondos de sección usan el sistema de degradación progresiva.
- `Section` ahora inyecta `section-content` automáticamente para unificar fondos.
- `CircularHero`, `Contact`, `Projects` migrados al nuevo sistema de color.
- `Experience` y `Skills` migrados de `bg-slate-*` hardcodeado a `glass-effect` del sistema enterprise.
- `About` internacionalizado con `useTranslation`.
- `glass-effect` consolidado en `globals.css`; eliminada duplicación del plugin de Tailwind.

### Fixed

- **E2E smoke test** (`e2e/smoke.spec.ts`): alineada expectativa de error de validación con el contrato real del API (`'Validation failed'`).

### Security

- `.gitignore` actualizado para excluir datos locales de Engram (`.engram/`, `*.engram`).

## [0.1.0] - 2024

### Added

- Proyecto base con Next.js 16, React 19, TypeScript 5.9, Tailwind CSS 4, Framer Motion 12.
- Sistema de i18n (es/en) con `useTranslation`.
- Secciones: Hero, About, Skills, Experience, Projects, Contact.
- API de contacto con validación Zod, rate limiting in-memory y sanitización DOMPurify.
- Tests unitarios (Jest 30) y E2E (Playwright).
- CSP, HSTS, X-Frame-Options y headers de seguridad en `next.config.js`.

[Unreleased]: https://github.com/HackTuCode/portfolio/compare/v0.1.0...HEAD
