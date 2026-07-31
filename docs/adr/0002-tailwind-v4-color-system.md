# ADR 0002: Sistema de Colores Progresivo y Tailwind CSS v4

* **Estado:** Aprobado
* **Fecha:** 2026-04-28
* **Autor:** Equipo UX / Frontend Architecture

## Contexto

El diseño anterior del portafolio contaba con alternancia entre modo claro y oscuro, lo cual generaba inconsistencias de contraste visual y duplicidad de reglas CSS. Se requería una identidad Enterprise sofisticada, moderna y con soporte estricto de accesibilidad WCAG 2.1.

## Decisión

Se adopta un **modo oscuro único forzado** sustentado en un **sistema de colores progresivo** (`deep-ocean`, `midnight-blue`, `twilight-navy`) procesado con **Tailwind CSS v4** y `@tailwindcss/postcss`.

## Consecuencias

### Positivas
* Eliminación de complejidad de estado de tema claro/oscuro.
* Garantía de ratios de contraste accesibles de 4.5:1 (AA) y 7:1 (AAA) verificados mediante auditoría en `RESEARCH_COLOR_SYSTEM.md`.
* Uso de tokens semánticos globales en CSS (`globals.css`) que facilitan el mantenimiento visual.

### Negativas / Mitigaciones
* No se ofrece tema claro alternativo; esto se compensa con herramientas especializadas de accesibilidad (modos de alto contraste y reducción de brillo en la suite de accesibilidad).
