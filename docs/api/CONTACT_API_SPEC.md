# Especificación del API de Contacto (`/api/contact`)

**Versión API:** 1.0.0  
**Formato OpenAPI:** 3.1.0  
**Protocolo:** HTTPS  
**Autenticación:** Ninguna (Pública con Rate Limiting)

---

## 1. Descripción General

El endpoint `/api/contact` procesa el envío de formularios de contacto del portafolio. Cuenta con validación formal mediante un contrato **Zod** compartido, escape contextual del HTML de correo y protección distribuida mediante **Vercel WAF**.

---

## 2. Definición OpenAPI (YAML)

```yaml
openapi: 3.1.0
info:
  title: API de Contacto Portfolio Tumidev
  version: 1.0.0
  description: Endpoint seguro para procesamiento de mensajes de contacto.
paths:
  /api/contact:
    post:
      summary: Enviar un mensaje de contacto
      operationId: sendContactMessage
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ContactPayload'
      responses:
        '200':
          description: Mensaje enviado exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  message:
                    type: string
                    example: "Mensaje enviado con éxito."
        '400':
          description: Error de validación en los datos de entrada
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '429':
          description: Límite de tasa excedido (Rate Limit Exceeded)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
components:
  schemas:
    ContactPayload:
      type: object
      required:
        - name
        - email
        - subject
        - message
      properties:
        name:
          type: string
          minLength: 2
          maxLength: 100
          example: "Juan Pérez"
        email:
          type: string
          format: email
          example: "juan.perez@example.com"
        subject:
          type: string
          minLength: 5
          maxLength: 200
          example: "Oportunidad de colaboración"
        message:
          type: string
          minLength: 20
          maxLength: 5000
          example: "Hola, me gustaría discutir una oportunidad de colaboración."
        website:
          type: string
          maxLength: 200
          description: "Campo honeypot; debe permanecer vacío."
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
          example: "Validation failed"
        details:
          type: array
          items:
            type: object
```

---

## 3. Códigos de Estado HTTP y Ejemplos de Respuesta

###  200 OK — Envío Exitoso
```json
{
  "success": true,
  "message": "Mensaje enviado con éxito."
}
```

### ❌ 400 Bad Request — Error de Validación Zod
```json
{
  "error": "Validation failed",
  "details": [
    "Invalid email address",
    "String must contain at least 10 character(s)"
  ]
}
```

### 🛑 429 Too Many Requests — Límite de Tasa Excedido
```json
{
  "error": "Rate limit exceeded. Please wait before sending another message."
}
```

### ⚠️ 503 Service Unavailable — Entrega no configurada

La API falla cerrada si Resend o el destinatario no están configurados. Nunca simula una entrega exitosa.
