# Especificación: API de Contacto (`/api/contact`)

**ID:** `0001`  
**Estado:** `implemented`  
**Autor:** Tumidev  
**Fecha:** 2026-09-24  
**Spec canónica:** este archivo (reemplaza `docs/api/CONTACT_API_SPEC.md` como fuente de verdad)

---

## 1. Contexto

El endpoint `/api/contact` procesa el envío de formularios de contacto del portafolio. Cuenta con validación formal mediante un contrato Zod compartido (`src/lib/contact/schema.ts`), escape contextual del HTML de correo, protección de tasa y fail-closed cuando la entrega no está configurada.

## 2. Requisitos

| ID    | Requisito                                                                                                  | Prioridad | Verificable en repo |
| ----- | ---------------------------------------------------------------------------------------------------------- | --------- | ------------------- |
| RF-01 | Un payload válido devuelve 200 con `{ success: true, message: "Message sent successfully" }`               | Must      | ✅                  |
| RF-02 | Un payload inválido (Zod) devuelve 400 con `{ error: "Validation failed", details: [{ field, message }] }` | Must      | ✅                  |
| RF-03 | Un cuerpo mayor a 16 KiB devuelve 413, tanto por `content-length` como por stream                          | Must      | ✅                  |
| RF-04 | Si `website` (honeypot) no está vacío, devuelve 200 sin enviar correo                                      | Must      | ✅                  |
| RF-05 | Si Resend o el destinatario no están configurados, devuelve 503 (fail-closed)                              | Must      | ✅                  |
| RF-06 | Si se excede el límite de tasa, devuelve 429 con `Retry-After`                                             | Must      | ✅                  |
| RF-07 | Si el proveedor de correo falla, devuelve 502                                                              | Must      | ✅                  |
| RF-08 | Errores inesperados devuelven 500                                                                          | Must      | ✅                  |
| RF-09 | GET devuelve 200 health check                                                                              | Must      | ✅                  |
| RF-10 | Los valores del usuario se escapan en el HTML del correo (sin fuga de PII ni XSS)                          | Must      | ✅                  |
| RF-11 | El service worker no intercepta POST a `/api/*`                                                            | Must      | ✅ (e2e)            |
| RF-12 | Los logs de aplicación no contienen PII (IP, email, mensaje)                                               | Must      | ✅ (código)         |

### Requisitos verificables fuera del repo

| ID        | Requisito                                                        | Verificación                  |
| --------- | ---------------------------------------------------------------- | ----------------------------- |
| RF-06-ext | El Firewall de Vercel limita a 10 req/60s por IP (ADR-0006)      | Manual en dashboard de Vercel |
| RF-12-ext | `RESEND_API_KEY` y `CONTACT_TO_EMAIL` configurados en producción | Vercel env vars               |

## 3. Criterios de aceptación

### RF-01

- **Given** un payload con name, email, subject y message válidos
- **When** se envía POST a `/api/contact`
- **Then** la respuesta es 200 con `{ success: true, message: "Message sent successfully" }` y se llama al proveedor de correo

### RF-02

- **Given** un payload con campos vacíos o email inválido
- **When** se envía POST a `/api/contact`
- **Then** la respuesta es 400 con `{ error: "Validation failed", details: [{ field, message }] }`

### RF-03

- **Given** un cuerpo mayor a 16384 bytes
- **When** se envía POST con `content-length` excedido o stream oversized
- **Then** la respuesta es 413

### RF-04

- **Given** un payload válido con `website` no vacío (honeypot)
- **When** se envía POST a `/api/contact`
- **Then** la respuesta es 200 y NO se llama al proveedor de correo

### RF-05

- **Given** `RESEND_API_KEY` o `CONTACT_TO_EMAIL` ausentes
- **When** se envía POST con payload válido
- **Then** la respuesta es 503 (fail-closed, sin simular envío)

### RF-06

- **Given** 5 requests previos en la ventana de 60s
- **When** se envía un 6to request
- **Then** la respuesta es 429 con header `Retry-After`

### RF-07

- **Given** el proveedor de correo retorna error
- **When** se envía POST con payload válido
- **Then** la respuesta es 502

### RF-08

- **Given** un error inesperado (ej. stream corrupto)
- **When** se envía POST
- **Then** la respuesta es 500

### RF-09

- **Given** cualquier estado
- **When** se envía GET a `/api/contact`
- **Then** la respuesta es 200 con health check

### RF-10

- **Given** un payload con `<script>` en name o message
- **When** se envía POST
- **Then** el HTML del correo contiene `&lt;script&gt;`, no `<script>`

### RF-11

- **Given** un service worker activo
- **When** se hace POST a `/api/contact` desde el navegador
- **Then** la request llega al servidor (no es interceptada por el SW)

### RF-12

- **Given** cualquier request
- **When** se procesa
- **Then** los logs no contienen IP, email ni mensaje del usuario

## 4. Fuera de alcance

- Rate limiting global compartido (depende de Vercel Firewall, configurado fuera del repo)
- Validación del cliente (ContactForm.tsx usa reglas propias; divergencia documentada en RF-05 del cliente)
- Internacionalización de mensajes de error (los mensajes son en inglés por ahora)

## 5. Riesgos

| Riesgo                                           | Impacto | Mitigación                                            |
| ------------------------------------------------ | ------- | ----------------------------------------------------- |
| Divergencia client/server en validación          | Medio   | Documentada; futura unificación vía Zod en cliente    |
| Rate limit en memoria no es global en serverless | Alto    | Vercel Firewall como capa autoritativa (ADR-0006)     |
| OpenAPI puede derivar del código                 | Medio   | OpenAPI como archivo separado + check de consistencia |

## 6. Contratos / Interfaces

### Schema Zod (fuente ejecutable)

```typescript
// src/lib/contact/schema.ts
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(5).max(200),
  message: z.string().trim().min(20).max(5000),
  website: z.string().max(200).optional(), // honeypot
});
```

### OpenAPI

Ver `specs/0001-contact-api.openapi.yaml`

## 7. Trazabilidad

| Requisito | Test(s)                                                   | Estado |
| --------- | --------------------------------------------------------- | ------ |
| RF-01     | `route.test.ts:147`                                       | ✅     |
| RF-02     | `route.test.ts:93`, `e2e/smoke.spec.ts:112`               | ✅     |
| RF-03     | `route.test.ts:106`, `route.test.ts:194`                  | ✅     |
| RF-04     | `route.test.ts:115`, `route.test.ts:266`                  | ✅     |
| RF-05     | `route.test.ts:131`, `route.test.ts:249`                  | ✅     |
| RF-06     | `route.test.ts:166`                                       | ✅     |
| RF-07     | `route.test.ts:210`                                       | ✅     |
| RF-08     | `route.test.ts:232` (JSON), `route.test.ts:296` (runtime) | ✅     |
| RF-09     | `route.test.ts:85`, `e2e/smoke.spec.ts:104`               | ✅     |
| RF-10     | `route.test.ts:147`, `route.test.ts:283`                  | ✅     |
| RF-11     | `e2e/smoke.spec.ts:127`                                   | ✅     |
| RF-12     | Código (D2)                                               | ✅     |

## 8. Notas de implementación

- El honeypot se verifica después de la validación Zod (un bot debe pasar la validación primero).
- El rate limiter usa Upstash si las variables están configuradas, si no, in-memory (no global en serverless).
- El escape contextual usa `validator.escape()` + `validator.stripLow()`.
- Los mensajes de error del servidor son en inglés; la UI traduce en el cliente.
