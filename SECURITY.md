# Política de Seguridad (Security Policy)

En **Portfolio Tumidev**, la seguridad y la protección de datos son prioridades fundamentales de nivel **Enterprise**. Este documento detalla nuestras políticas de mitigación de vulnerabilidades, protección contra ataques y el proceso de divulgación responsable.

---

## 1. Versiones Soportadas

Actualmente se proporciona soporte activo de seguridad a las siguientes versiones:

| Versión | Soportada | Estado de Mantenimiento |
|---|---|---|
| `v0.1.x` (Rama `dev` / `main`) |  Sí | Soporte activo y parches inmediatos |
| Versiones anteriores |  No | Obsoletas |

---

## 2. Divulgación Responsable de Vulnerabilidades

Si descubres una vulnerabilidad de seguridad en este proyecto:

1. **NO abrira un issue público** en GitHub.
2. Envía un correo electrónico privado a la dirección de seguridad o contacto oficial del repositorio.
3. Incluye en tu reporte:
   * Descripción técnica detallada del vector de ataque.
   * Pasos de reproducción o script de prueba de concepto (PoC).
   * Impacto estimado en la disponibilidad, confidencialidad o integridad del sistema.

Responderemos a la notificación en un plazo máximo de 48 horas y coordinaremos la emisión del parche de seguridad correspondiente.

---

## 3. Arquitectura de Seguridad Implementada

### A. Sanitización de Entradas (Input Sanitization)
* **Zod Schemas:** Todas las solicitudes entrantes al endpoint `/api/contact` son validadas estrictamente con esquemas Zod antes de su procesamiento.
* **DOMPurify:** Se aplica sanitización HTML profunda (`isomorphic-dompurify`) para prevenir ataques de Scripting entre Sitios (XSS) y la inyección de marcado malicioso.

### B. Limitación de Tasa (Rate Limiting)
* Control de tasa basado en IP de origen (máximo 5 solicitudes por ventana de tiempo) para prevenir abuso por fuerza bruta y denegación de servicio (DoS).

### C. Cabeceras HTTP de Seguridad (Security Headers)
Configuradas en `next.config.js`:
* **Content-Security-Policy (CSP):** Restringe las fuentes permitidas para scripts, estilos e imágenes.
* **Strict-Transport-Security (HSTS):** Fuerza conexiones HTTPS con `max-age=63072000` e `includeSubDomains`.
* **X-Frame-Options:** Establecido en `DENY` para evitar ataques de *Clickjacking*.
* **X-Content-Type-Options:** `nosniff` para evitar ataques de Mime Sniffing.
* **Permissions-Policy:** Bloqueo explícito de características de hardware como cámara, micrófono y geolocalización.

### D. Zero PII & Structured Logging
* Los registradores del servidor no almacenan ni exponen Información de Identificación Personal (PII) en los logs ni en las respuestas de error hacia el cliente.
