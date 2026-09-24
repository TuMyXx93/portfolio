# Integración MCP multi-herramienta

Esta referencia define el contrato común para los servidores Model Context Protocol (MCP) del proyecto. Las configuraciones concretas pueden variar entre OpenCode, VS Code, harnesses y otros agentes; las capacidades, límites, permisos y reglas de seguridad no deben variar.

## Fuentes de configuración

| Consumidor                    | Configuración                                | Estado                            |
| ----------------------------- | -------------------------------------------- | --------------------------------- |
| OpenCode                      | [`opencode.json`](../../opencode.json)       | Activa                            |
| VS Code                       | [`.vscode/mcp.json`](../../.vscode/mcp.json) | Activa para servidores existentes |
| Agentes/harnesses adicionales | Configuración nativa del consumidor          | Derivada de este contrato         |

La documentación es la fuente semántica compartida. Los archivos de configuración son adaptadores específicos del cliente y no deben contener secretos.

El inventario machine-readable está en [`mcp-registry.json`](./mcp-registry.json), para que agentes, harnesses y herramientas puedan analizar estados, alcances y restricciones sin interpretar texto libre.

## Servidores activos

### Context7

- **Propósito:** documentación actualizada de frameworks y dependencias.
- **Transporte OpenCode:** remoto.
- **Transporte VS Code:** HTTP remoto.
- **Endpoint:** `https://mcp.context7.com/mcp`.
- **Permisos:** consultas de documentación.
- **Datos prohibidos:** secretos, archivos `.env`, tokens, PII y payloads de producción.
- **Uso recomendado:** consultar documentación de Next.js, React, TypeScript, Tailwind, Framer Motion, Jest, Playwright y Zod antes de implementar cambios dependientes de versión.

### Engram

- **Propósito:** memoria persistente del proyecto y continuidad entre sesiones.
- **Transporte:** proceso local.
- **Proyecto:** `portfolio`.
- **Permisos:** herramientas de agente de Engram.
- **Configuración OpenCode:** ejecutable local explícito.
- **Configuración VS Code:** comando `engram` resoluble desde `PATH`, o mediante `ENGRAM_BIN`.
- **Windows:** definir `ENGRAM_BIN` en el entorno del proceso de VS Code con la ruta local del ejecutable.
- **Datos prohibidos:** secretos, tokens, valores de `.env.local`, PII de usuarios y contenido no necesario para una decisión técnica.
- **Sincronización cloud:** no activar automáticamente; requiere revisión de endpoint, token, retención y exclusiones.

## Servidores recomendados, todavía no activados

| Servidor   |   Prioridad | Modo inicial          | Alcance                          | Motivo                                  |
| ---------- | ----------: | --------------------- | -------------------------------- | --------------------------------------- |
| GitHub     |        Alta | Solo lectura          | Repositorio `TuMyXx93/portfolio` | PRs, issues, checks, Actions y CodeQL   |
| Playwright |        Alta | Localhost             | `127.0.0.1` y puertos de pruebas | E2E, UI, teclado y accesibilidad        |
| Vercel     |        Alta | Solo lectura          | Proyecto Vercel del portfolio    | Deployments, builds y logs              |
| Semgrep    |       Media | Análisis local        | Código del workspace             | Complementar CodeQL con feedback rápido |
| Sentry     | Condicional | Solo lectura          | Proyecto con PII redactada       | Observabilidad de producción            |
| Upstash    | Condicional | Operativo restringido | Rate limiting                    | Diagnóstico puntual de Redis            |

Estos servidores no deben añadirse a una configuración activa hasta disponer de una credencial, transporte y alcance verificados. No se recomienda activar filesystem MCP genérico ni un servidor de base de datos en el estado actual del proyecto.

## Matriz de equivalencia por cliente

| Capacidad         | OpenCode         | VS Code              | Regla portable                                        |
| ----------------- | ---------------- | -------------------- | ----------------------------------------------------- |
| Documentación     | `mcp.context7`   | `servers.context7`   | Mismo endpoint remoto y mismas restricciones de datos |
| Memoria           | `mcp.engram`     | `servers.engram`     | Mismo proyecto `portfolio`; solo proceso local        |
| GitHub futuro     | `mcp.github`     | `servers.github`     | Token fine-grained, solo repositorio autorizado       |
| Playwright futuro | `mcp.playwright` | `servers.playwright` | Solo localhost, perfil temporal                       |
| Vercel futuro     | `mcp.vercel`     | `servers.vercel`     | Lectura y proyecto limitado                           |

Los nombres o claves pueden cambiar según el cliente, pero cualquier diferencia debe quedar documentada y no puede ampliar permisos.

## Gestión de secretos

- No guardar tokens en `opencode.json`, `.vscode/mcp.json`, documentación ni commits.
- Usar secretos del entorno, almacenes de credenciales del IDE o configuración local ignorada.
- Mantener `.env.local` y variantes fuera del contexto MCP.
- Usar tokens fine-grained y scopes por repositorio/proyecto.
- Redactar nombres, emails, mensajes, IPs y payloads antes de enviarlos a servicios externos.
- Revocar credenciales cuando se retire un servidor.

## Checklist de activación

1. Confirmar que el servidor es necesario y no duplica CI, CodeQL, Dependabot, Playwright o Vercel CLI.
2. Definir transporte, endpoint/comando y alcance.
3. Elegir permisos mínimos, empezando por lectura.
4. Configurar credenciales fuera del repositorio.
5. Añadir el adaptador a cada cliente requerido.
6. Verificar consultas funcionales.
7. Ejecutar pruebas negativas contra secretos, repositorios no autorizados y operaciones mutantes.
8. Documentar rollback, revocación y responsable.
9. Comparar configuraciones para detectar drift.

## Validación y rollback

Una integración es aceptable cuando cada cliente soportado puede iniciar el servidor, ejecutar una consulta mínima y rechazar accesos fuera de su alcance. Para retirar una integración, deshabilitarla en los adaptadores nativos, revocar sus credenciales y conservar en esta referencia la decisión y el motivo.

Las validaciones de código existentes siguen siendo obligatorias:

```powershell
pnpm run lint
pnpm run type-check
pnpm run test:quick
pnpm run build
pnpm run test:e2e:ci
```

Los fallos de infraestructura, worktrees o harnesses deben aislarse y documentarse; no deben resolverse ampliando permisos MCP.
