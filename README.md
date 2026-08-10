# Portfolio Tumidev

![Next.js](https://img.shields.io/badge/Next.js-16.3.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-38bdf8?style=flat-square&logo=tailwind-css)
![pnpm](https://img.shields.io/badge/pnpm-11.20.0-orange?style=flat-square&logo=pnpm)
![WCAG](https://img.shields.io/badge/WCAG_2.1-AA%2FAAA-green?style=flat-square)

Portfolio profesional Enterprise diseñado con arquitectura limpia, alto rendimiento, accesibilidad estricta WCAG 2.1 y soporte para internacionalización (es/en).

---

## ⚡ Quick Start

```bash
# 1. Clonar repositorio
git clone https://github.com/tumidev/portfolio.git
cd portfolio

# 2. Instalar dependencias con pnpm v11
pnpm install

# 3. Iniciar servidor de desarrollo
pnpm run dev
```

El servidor local estará disponible en `http://localhost:3000`.

---

## 🛠️ Stack Tecnológico Enterprise

| Categoría | Tecnología / Librería | Versión | Propósito |
|---|---|---|---|
| **Core Framework** | Next.js | `16.3.0` | App Router, SSR, Turbopack, Server Actions |
| **UI Library** | React | `19.2.8` | Componentes concurrentes y Hooks |
| **Lenguaje** | TypeScript | `5.9.3` | Tipado estricto (Strict Mode) |
| **Estilos & UI** | Tailwind CSS | `4.3.3` | Motor de CSS con variables semánticas |
| **Animaciones** | Framer Motion | `13.0.0` | Transiciones suaves y micro-interacciones |
| **Package Manager**| pnpm | `11.20.0` | Gestor de paquetes aislado e hiperrápido |
| **Unit Testing** | Jest + React Testing Library | `30.4.2` | Pruebas unitarias de hooks y componentes (`jest-dom` v7.0) |
| **E2E Testing** | Playwright | `1.62.1` | Pruebas de humo multinavegador (Chromium, Firefox, WebKit) |

---

## 📚 Centro de Documentación (Diátaxis Framework)

Toda la documentación técnica del proyecto está estructurada bajo el estándar **Diátaxis**:

| Categoría Diátaxis | Documento | Descripción |
|---|---|---|
| **Tutoriales** | [Guía de Contribución](file:///C:/Users/HACKTU/code/portfolio/CONTRIBUTING.md) | Flujo Git, ramas `dev`/`main`, estándares de PR y Husky |
| **How-To Guides** | [Runbook de Desarrollo Local](file:///C:/Users/HACKTU/code/portfolio/docs/guides/LOCAL_DEVELOPMENT_RUNBOOK.md) | Configuración en Windows, WSL2, Docker y resolución de puertos |
| **How-To Guides** | [Runbook de Despliegue & CI/CD](file:///C:/Users/HACKTU/code/portfolio/docs/guides/DEPLOYMENT_RUNBOOK.md) | Pipeline en GitHub Actions, Vercel CLI y Lighthouse CI |
| **Referencia** | [Especificación del API de Contacto](file:///C:/Users/HACKTU/code/portfolio/docs/api/CONTACT_API_SPEC.md) | Contrato OpenAPI 3.1 para `/api/contact` |
| **Referencia** | [Política de Seguridad](file:///C:/Users/HACKTU/code/portfolio/SECURITY.md) | Especificación de CSP, HSTS, Sanitización y Rate Limiting |
| **Explicación** | [Arquitectura del Sistema](file:///C:/Users/HACKTU/code/portfolio/docs/architecture/ARCHITECTURE.md) | Diagrama C4, arquitectura de capas y flujo de datos |
| **Explicación** | [Registros ADR](file:///C:/Users/HACKTU/code/portfolio/docs/adr/) | Arquitectura Decision Records (ADR 0001 - 0005) |
| **Explicación** | [Investigación de Color](file:///C:/Users/HACKTU/code/portfolio/docs/research/RESEARCH_COLOR_SYSTEM.md) | Auditoría de ratios de contraste WCAG 2.1 |
| **Historial** | [Historial de Mejoras](file:///C:/Users/HACKTU/code/portfolio/docs/history/HISTORIAL_MEJORAS.md) | Registro histórico de refactorizaciones y auditorías |
| **Historial** | [Changelog](file:///C:/Users/HACKTU/code/portfolio/CHANGELOG.md) | Registro de versiones y notas de entrega |

Para explorar la estructura completa, visita el [Centro de Documentación principal (`docs/README.md`)](file:///C:/Users/HACKTU/code/portfolio/docs/README.md).

---

## 🔒 Seguridad & Calidad Enterprise

* **Validación en Capas:** Contrato Zod compartido en API y cliente + escape contextual de salida.
* **Cabeceras HTTP HTTP:** CSP estricto, HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.
* **Zero PII Logging:** Ningún dato personal es almacenado en logs ni expuesto en respuestas de error.
* **Gates de Calidad (`/version-gate`):**
  ```bash
  pnpm run lint        # Validation ESLint 9
  pnpm run type-check   # Check TypeScript
  pnpm test            # Tests Jest + cobertura mínima del 70%
  pnpm run build       # Build de producción Next.js
  pnpm run test:e2e    # Build + smoke tests Playwright de producción
  ```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](file:///C:/Users/HACKTU/code/portfolio/LICENSE) para más detalles.
