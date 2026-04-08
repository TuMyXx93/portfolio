# Tooling Strategy and Substitution Matrix

Documento vivo para decisiones de tooling posteriores al upgrade mayor del stack.

Stack base actual: `Next.js 16`, `React 19`, `TypeScript 5.9.3`, `Tailwind 4`, `Framer Motion 12`, `Jest 30`.

## Operating model

- Objetivo: decidir cambios de herramientas con criterios medibles (valor, riesgo y costo).
- Regla: no migrar por tendencia; migrar solo cuando haya beneficio verificable.
- Evidencia minima para aprobar cambios:
  - benchmark local/CI,
  - impacto en DX,
  - impacto en estabilidad,
  - costo de mantenimiento trimestral.

## Portfolio status snapshot

| Area                   | Herramienta actual     | Estado                   | Nota                            |
| ---------------------- | ---------------------- | ------------------------ | ------------------------------- |
| Unit/integration tests | Jest + Testing Library | Approved                 | Estable, pipeline verde         |
| E2E smoke              | Playwright             | Approved and implemented | Corre en CI sobre Chromium      |
| Linting                | ESLint                 | Approved                 | Integrado con reglas de Next.js |
| Formatting             | Prettier               | Approved                 | Flujo actual sin friccion       |
| Motion                 | Framer Motion          | Approved                 | Ya tipado para v12              |
| Data cache cliente     | Ninguno dedicado       | Deferred                 | No hay necesidad fuerte hoy     |

## ADR-lite decisions

### DEC-001 - E2E browser validation with Playwright

- Contexto: faltaba validacion browser-level para rutas y API criticas.
- Decision: implementar `Playwright` para smoke tests.
- Estado: `approved` and `implemented`.
- Impacto:
  - cobertura real de UI y API en navegador,
  - deteccion temprana de regresiones en CI.
- Trade-offs:
  - mayor tiempo de pipeline,
  - mantenimiento de pruebas e2e.
- Evidencia:
  - `e2e/smoke.spec.ts`
  - `.github/workflows/ci-cd.yml`
  - `npm run test:e2e`

### DEC-002 - Keep Jest as primary unit runner

- Contexto: suite actual ya estable y veloz para feedback diario.
- Decision: mantener `Jest` como runner principal por ahora.
- Estado: `approved`.
- Trigger de reevaluacion:
  - si `npm run test` supera 2m de forma sostenida en CI,
  - o si hay alto costo recurrente por mocks/config de Jest.

### DEC-003 - Defer Biome migration

- Contexto: `ESLint + Prettier` ya cubre calidad con bajo riesgo.
- Decision: postergar migracion a `Biome`.
- Estado: `deferred`.
- Trigger de reevaluacion:
  - si lint + format supera 60s en dev con frecuencia,
  - o si se busca unificar tooling por costo de mantenimiento.

### DEC-004 - Defer TanStack Query adoption

- Contexto: arquitectura actual usa mayormente rendering y APIs simples.
- Decision: no agregar capa de cache cliente aun.
- Estado: `deferred`.
- Trigger de reevaluacion:
  - 3+ flujos con mutaciones/reintentos/polling,
  - datos compartidos complejos entre pantallas,
  - degradacion de UX por refetch/manual state handling.

## Prioritization matrix (next 2 cycles)

| Initiative                                     | Value  | Effort | Risk   | Priority | Owner     |
| ---------------------------------------------- | ------ | ------ | ------ | -------- | --------- |
| Expand Playwright smoke to critical user paths | High   | Medium | Low    | P1       | FE/QA     |
| Add Playwright HTML report artifact in CI      | Medium | Low    | Low    | P1       | QA/DevOps |
| Vitest technical spike (branch only)           | Medium | Medium | Medium | P2       | FE        |
| Biome technical spike (branch only)            | Medium | Medium | Medium | P3       | FE        |
| TanStack Query evaluation on real feature      | Medium | High   | Medium | P3       | FE        |

## Adoption criteria by tool

### Vitest (candidate substitution for Jest)

- Adoptar solo si:
  - mejora >= 30% en tiempo de test total en CI,
  - no degrada DX de mocks/utilidades,
  - migration plan <= 2 iteraciones.

### Biome (candidate substitution for ESLint + Prettier)

- Adoptar solo si:
  - reduce setup/runtime de lint+format sin perdida de reglas clave,
  - mantiene o mejora integracion con Next.js,
  - costo de migracion justificado por mantenimiento futuro.

### Motion One (candidate substitution for Framer Motion)

- Adoptar solo en casos acotados si:
  - hay necesidad de micro-animaciones de alto volumen,
  - se prueba mejora real de performance en esas vistas,
  - no obliga migracion total del sistema de animaciones.

### TanStack Query (candidate introduction)

- Adoptar cuando:
  - exista complejidad real de cache/retries/invalidation,
  - el manejo manual de estado async ya sea cuello de botella,
  - haya al menos una feature donde el ROI sea demostrable.

## Governance and review cadence

- Cadencia: revision mensual o por release.
- Requerido para cerrar una decision:
  - PR/issue asociado,
  - owner definido,
  - estado actualizado (`proposed`, `approved`, `implemented`, `deferred`, `rejected`).

## Changelog

- 2026-04-08: documento convertido a formato ADR-lite + matriz de priorizacion.
- 2026-04-08: Playwright smoke marcado como implementado y en CI.
