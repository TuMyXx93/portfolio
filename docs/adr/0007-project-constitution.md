# ADR-0007: Constitución del Proyecto (Spec-Driven Development)

## Status

Accepted — 2026-09-24

## Contexto

El proyecto carecía de una constitución formal que consolidara los principios no negociables. Las reglas estaban dispersas en AGENTS.md, los agentes de `.opencode/`, los ADRs y la arquitectura. Con la adopción de Spec-Driven Development (spec-anchored), se necesita una fuente única de principios que todos los agentes y contribuidores respeten.

## Decisión

Se adoptan los siguientes principios no negociables para el proyecto:

### Principios técnicos

1. **TypeScript strict mode** en todo el código. Sin `any` implícito en fronteras servidor/cliente.
2. **Contratos Zod como fuente ejecutable** para validación en runtime. El schema Zod es la verdad ejecutable; la documentación OpenAPI se deriva o se verifica contra él.
3. **Fail-closed** en el endpoint de contacto: si Resend o el destinatario no están configurados, se devuelve 503. Nunca se simula una entrega exitosa.
4. **Escape contextual** de todos los valores del usuario antes de interpolarlos en HTML de correo.
5. **Rate limiting en dos capas:** Vercel Firewall (10 req/60s por IP, autoritativo) + contador en memoria (5 req/60s por instancia, best-effort). Ambas documentadas como intencionales.
6. **Sin PII en logs de aplicación:** los logs registran `requestId` y eventos, pero no IP, email ni mensaje del usuario. La IP se registra solo en el Firewall de Vercel.
7. **WCAG 2.1 AA** como mínimo de accesibilidad. La accesibilidad no se sacrifica por animación o pulido visual.
8. **Cobertura de tests:** mínimo 70% global (branches, functions, lines, statements). Los tests referencian requisitos con `// spec:XXXX#RF-YY`.
9. **Gates de calidad como bloqueadores:** lint, type-check, test y build son obligatorios antes de merge a `main`.

### Principios de proceso (SDD)

10. **Spec-anchored:** las especificaciones evolucionan con el código. Cada feature nueva o cambio de API requiere una spec en `specs/`.
11. **Leer la spec activa antes de editar código.** Los agentes deben consultar la spec correspondiente antes de modificar archivos de `src/`.
12. **Commits referencian spec-ID:** `feat(contact): ... [spec:0001 RF-03]`.
13. **Trazabilidad requisito→test:** cada requisito `RF-XX` debe tener al menos un test que lo referencie.
14. **No sobre-especificar:** empezar con specs ligeras y expandir solo donde añada valor (Microsoft, 2026).
15. **Constitución portable:** AGENTS.md es la fuente semántica compartida; los archivos de `.opencode/` son adaptadores.

### Principios de seguridad

16. **Secretos fuera del repositorio:** tokens en variables de entorno o almacenes de credenciales del IDE.
17. **Acciones de GitHub fijadas por SHA** (con comentario de versión).
18. **Ramas protegidas:** `main` requiere PR + aprobación + checks. `dev` requiere checks + sin force-push.
19. **Despliegue a producción solo desde `main`.**

## Consecuencias

- Todas las features nuevas requieren una spec en `specs/` antes de implementación.
- Los agentes de `.opencode/` deben leer la spec activa antes de editar código.
- El gate `spec-trace` verifica la trazabilidad requisito→test.
- El gate `doc-drift` verifica la consistencia de la documentación.

## Referencias

- [Spec-Driven Development (GitHub Spec Kit)](https://github.com/github/spec-kit)
- [IBM: What is Spec-Driven Development?](https://www.ibm.com/think/topics/spec-driven-development)
- [arXiv:2602.00180 — Spec-Driven Development: From Code to Contract](https://arxiv.org/abs/2602.00180)
