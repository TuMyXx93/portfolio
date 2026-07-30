# ADR 0001: Adopción de Next.js 16 App Router & Turbopack

* **Estado:** Aprobado
* **Fecha:** 2026-04-27
* **Autor:** Equipo de Arquitectura Portfolio Tumidev

## Contexto

Se requiere un marco de desarrollo web de alto rendimiento para soportar Server-Side Rendering (SSR), generación de páginas estáticas (SSG), optimización automática de imágenes y procesamiento de rutas modernas para un portafolio profesional de nivel Enterprise.

## Decisión

Se adopta **Next.js 16 (App Router)** junto con el empaquetador **Turbopack** como la base de arquitectura de la aplicación web.

## Consecuencias

### Positivas
* Compilación ultrarrápida en desarrollo mediante Turbopack.
* Renderizado híbrido (Server Components + Client Components) optimizando los tiempos de First Contentful Paint (FCP) y Largest Contentful Paint (LCP).
* Generación de metadatos dinámica (`sitemap.xml`, `robots.txt`, `opengraph-image`).

### Negativas / Mitigaciones
* Requiere aislamiento explícito entre Client Components (`'use client'`) y Server Components para evitar errores de deshidratación en SSR.
