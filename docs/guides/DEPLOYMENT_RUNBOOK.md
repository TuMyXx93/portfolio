# Runbook de Despliegue y CI/CD (Deployment Runbook)

Este documento detalla los procedimientos de integración continua (CI), validación de calidad y despliegue automatizado en la plataforma **Vercel**.

---

## 1. Pipeline de CI/CD (GitHub Actions)

El proyecto cuenta con 3 flujos de trabajo automatizados en `.github/workflows/`:

1. **`ci-cd.yml` (CI Web Validation):**
   * Se ejecuta en cada `push` y `pull_request` sobre las ramas `dev` y `main`.
   * Ejecuta: `pnpm run lint` ➔ `pnpm run type-check` ➔ `pnpm run test` ➔ `pnpm run build` ➔ `pnpm run test:e2e`.
   * Ejecuta el gate de cobertura, build de producción y smoke E2E.
2. **Dependabot (Actualizaciones Automáticas):**
   * Se ejecuta semanalmente (lunes a las 2:00 AM UTC).
   * Revisa semanalmente dependencias npm y GitHub Actions y genera PRs revisables.
3. **`deploy.yml` (Despliegue a Producción):**
   * Se ejecuta automáticamente tras cada merge exitoso en la rama `main`.

---

## 2. Variables de Entorno Requeridas

Las siguientes variables de entorno deben estar configuradas en la consola de Vercel y en GitHub Secrets:

| Variable | Tipo | Propósito |
|---|---|---|
| `VERCEL_URL` | Producción | URL pública para la generación dinámica de OG Images (`@vercel/og`). |
| `VERCEL_TOKEN` | GitHub Secret | Token de autenticación de CLI de Vercel para despliegue automatizado. |
| `VERCEL_ORG_ID` | GitHub Secret | ID de la organización en Vercel. |
| `VERCEL_PROJECT_ID` | GitHub Secret | ID del proyecto en Vercel. |

---

## 3. Despliegue Manual desde CLI (Vercel CLI)

Si se requiere realizar un despliegue manual o verificar un preview de producción:

```bash
# 1. Autenticarse en Vercel
pnpm exec vercel login

# 2. Descargar variables del entorno de producción
pnpm exec vercel pull --yes --environment=production

# 3. Compilar artefactos de producción localmente
pnpm exec vercel build --prod

# 4. Desplegar artefactos pre-compilados
pnpm exec vercel deploy --prebuilt --prod
```

---

## 4. Protección del endpoint de contacto

Configura en Vercel Firewall una regla para `POST /api/contact` con límite de 5 solicitudes por IP cada 10 minutos y challenge para tráfico automatizado. Valida la regla en preview y producción, y registra cualquier cambio en el historial de auditoría de Vercel.

## 5. Auditoría Post-Despliegue (Lighthouse)

Tras el despliegue a producción, se recomienda ejecutar la validación de Lighthouse CI:

```bash
pnpm exec lighthouserc run
```
* **Rendimiento:** `>=0.8` (Objetivo `>0.9`)
* **Accesibilidad:** `>=0.9` (Estricto)
* **Mejores Prácticas:** `>=0.8`
* **SEO:** `>=0.8`
