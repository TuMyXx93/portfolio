# Especificación del API de Contacto (`/api/contact`)

> **Nota:** Esta especificación ha sido migrada a `specs/0001-contact-api.md` (requisitos) y `specs/0001-contact-api.openapi.yaml` (contrato OpenAPI). Este archivo se mantiene como referencia histórica.

**Versión API:** 1.0.0  
**Formato OpenAPI:** 3.1.0  
**Protocolo:** HTTPS  
**Autenticación:** Ninguna (Pública con Rate Limiting)

---

## Referencias

- **Spec canónica:** [`specs/0001-contact-api.md`](../../specs/0001-contact-api.md)
- **OpenAPI:** [`specs/0001-contact-api.openapi.yaml`](../../specs/0001-contact-api.openapi.yaml)
- **Schema Zod:** [`src/lib/contact/schema.ts`](../../src/lib/contact/schema.ts)
- **Tests:** [`src/app/api/contact/__tests__/route.test.ts`](../../src/app/api/contact/__tests__/route.test.ts)

---

## Cambios respecto a la versión anterior

- Añadidos códigos de estado 413, 500 y 502 (antes ausentes).
- Corregido `email.maxLength` a 254 (antes ausente).
- Corregido ejemplo de 400 (mínimo 20 caracteres en `message`, no 10).
- Corregido mensaje de 200 a "Message sent successfully" (antes "Mensaje enviado con éxito").
- Corregido mensaje de 429 a "Too many requests. Please try again later."
- Añadido endpoint GET (health check).
- `details` ahora es array de objetos `{ field, message }` (antes strings).
