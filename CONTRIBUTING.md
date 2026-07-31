# Guía de Contribución (Contributing Guidelines)

¡Gracias por tu interés en contribuir a **Portfolio Tumidev**! Este proyecto sigue los estándares **Enterprise 2026** para el desarrollo web con Next.js 16, React 19, TypeScript 5.9 y pnpm.

---

## 1. Política de Ramas (Git Branching Policy)

El flujo de trabajo se basa en el modelo **Git Flow simplificado**:

* **`dev` (Rama de Desarrollo Principal):** Todo el trabajo de desarrollo de características, refactorización y correcciones debe iniciar y fusionarse en `dev`.
* **`main` (Rama de Producción Estable):** Solo recibe código probado y validado desde `dev`. No se permite el desarrollo directo en `main` salvo *hotfixes* críticos de emergencia.
* **Ramas de Características (`feature/*`):** Se ramifican desde `dev` y se fusionan mediante Pull Requests.

---

## 2. Requisitos Previos del Entorno

* **Node.js:** `>=24.15.0 <25` (LTS recomendado `v24.13.3+`)
* **Package Manager:** `pnpm >=11.0.0`
* **Entornos recomendados:** Windows 11 con soporte para WSL2 / Linux.

---

## 3. Flujo de Trabajo Local

### Paso 1: Clonar e Instalar Dependencias
```bash
git clone https://github.com/tumidev/portfolio.git
cd portfolio
pnpm install
```

### Paso 2: Ejecutar el Servidor de Desarrollo
```bash
pnpm run dev
```
El servidor estará disponible en `http://localhost:3000`.

### Paso 3: Gates de Validación Obligatorios (`/version-gate`)

Antes de realizar commits o abrir un Pull Request, debes ejecutar la suite de validaciones locales:

```bash
# 1. Validación de ESLint
pnpm run lint

# 2. Comprobación de Tipos de TypeScript
pnpm run type-check

# 3. Pruebas Unitarias e Integración (Jest)
pnpm test

# 4. Compilación de Producción (Next.js Turbopack)
pnpm run build
```

---

## 4. Convención de Commits

Sugerimos utilizar **Conventional Commits**:

* `feat(scope)`: Nueva característica (ej. `feat(hero): add 3D progressive circle animation`).
* `fix(scope)`: Corrección de error (ej. `fix(contact): sanitize XSS payload in contact form`).
* `docs(scope)`: Cambios en documentación.
* `refactor(scope)`: Reestructuración de código sin alterar comportamiento.
* `test(scope)`: Adición o actualización de pruebas.
* `chore(scope)`: Tareas de mantenimiento, dependencias o CI/CD.

Los hooks de **Husky** (`pre-commit` y `pre-push`) ejecutarán automáticamente las validaciones antes de permitir la persistencia en Git.

---

## 5. Proceso de Pull Request (PR)

1. Asegúrate de estar en la rama `dev`.
2. Ejecuta `/verify-web` (`pnpm run lint && pnpm run type-check && pnpm test && pnpm run build && pnpm run test:e2e`).
3. Abre el Pull Request apuntando hacia la rama `dev`.
4. Incluye en la descripción:
   * **Alcance:** Resumen de los cambios.
   * **Pruebas:** Confirmación de resultados de Jest y Playwright.
   * **Capturas / GIFs:** En caso de cambios visuales o de interfaz.
