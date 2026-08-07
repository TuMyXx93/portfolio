# ADR 0005: Estrategia de Actualización de Dependencias Major/Patch (Next.js 16.3, Zod 4, Framer Motion 13, ESLint 9 Pin, TypeScript 5.9 Pin)

* **Estado:** Aprobado
* **Fecha:** 2026-08-06
* **Autor:** Orchestrator & QA Integration Team

## Contexto

Con la evolución del ecosistema React 19 y Next.js 16, varias dependencias del proyecto publicaron versiones mayores y parches (Next.js 16.3, Zod 4, Framer Motion 13, ESLint 10, TypeScript 7). Se requirió auditar e integrar las actualizaciones sin comprometer la estabilidad del sistema, el tipado de TypeScript ni la suite de pruebas unitarias y de integración.

## Decisiones

1. **Actualización de Core & Runtime (Patch/Minor):**
   - **`next`** y **`eslint-config-next`** actualizados de `16.2.12` a `16.3.0` (soporte Turbopack optimizado).
   - **`dompurify`** (`3.4.13`) e **`isomorphic-dompurify`** (`3.21.0`) actualizados por seguridad.
   - **`@types/react`** (`19.2.18`) y **`@types/react-dom`** (`19.2.4`) alineados.
   - **`vercel` CLI** actualizado a `58.7.1`.

2. **Actualización de Dependencias Major:**
   - **`@testing-library/jest-dom`** actualizado a `7.0.0` (100% de matchers verificados en 13 suites/60 tests).
   - **`framer-motion`** actualizado a `13.0.0` (compatibilidad verificada en `CircularHero`, `HorizontalNavigation`, `ProfileImage`, `SectionWrapper`).
   - **`zod`** actualizado a `4.4.3`. Se migró [`src/app/api/contact/route.ts`](file:///c:/Users/HACKTU/code/portfolio/src/app/api/contact/route.ts) sustituyendo la propiedad extinta `result.error.errors` por `result.error.issues`.

3. **Pines Estratégicos y Retenciones de Versión:**
   - **ESLint mantenido en `9.39.5` (NO actualizar a v10):** `eslint-config-next@16.3.0` invoca internamente `eslint-plugin-react@7.37.5` el cual llama a `context.getFilename()`. Esta función fue removida en el motor de ESLint v10 (`RuleContext`), provocando `TypeError` en linting. Se retiene v9 hasta que Next.js actualice su plugin oficial.
   - **TypeScript mantenido en `5.9.3` LTS (NO actualizar a v7.x):** TypeScript 7.0 (compilador `tsc-go`) es experimental y no cuenta con certificación oficial para `plugin: "next"` en Next.js 16.x.
   - **`@types/node` mantenido en `24.13.3`:** Alineado estrictamente con el runtime Node.js `v24.15.0` LTS en uso (`.node-version`).

## Consecuencias

### Positivas
* **Compatibilidad de Producción:** Next.js 16.3.0 + Turbopack compila estáticamente en 3.0s (reducción de tiempo).
* **Seguridad y Tipado:** `zod@4.4.3` con migración limpia a `issues` previene errores silenciosos en tiempo de ejecución.
* **Estabilidad del Tooling:** Retener ESLint 9.39.5 y TypeScript 5.9.3 evita rupturas en la suite de CI/CD.

### Mitigaciones
* Se reevaluará ESLint v10 cuando Next.js lance `eslint-config-next` con soporte para ESLint v10 Flat Config.
