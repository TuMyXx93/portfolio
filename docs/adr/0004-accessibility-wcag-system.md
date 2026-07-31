# ADR 0004: Suite de Accesibilidad WCAG 2.1 de 4 Cuadrantes

* **Estado:** Aprobado
* **Fecha:** 2026-04-28
* **Autor:** Frontend & Accessibility Architecture

## Contexto

Garantizar la inclusión de usuarios con diversas capacidades físicas, cognitivas y visuales respetando el estándar internacional **WCAG 2.1 Nivel AA/AAA**.

## Decisión

Implementar un menú de accesibilidad persistente estructurado en 4 cuadrantes contextuales:
1. **Visual Tab:** Ajustes de tamaño de fuente, alto contraste y tipografía disléxica.
2. **Motor Tab:** Objetivos de clic amplias, desactivación de animaciones.
3. **Cognitivo Tab:** Resaltado de enlaces y guía de lectura.
4. **Audio Tab:** Anunciador para lectores de pantalla y soporte sintetizado.

## Consecuencias

### Positivas
* Cumplimiento verificable de guías WCAG 2.1.
* Pruebas de unidad dedicadas en Jest (`src/components/accessibility-tabs/__tests__` y `useAccessibility.test.ts`).
* Experiencia personalizada para el usuario sin impactar el rendimiento inicial.
