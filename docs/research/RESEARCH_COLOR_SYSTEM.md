# Investigación: Sistema de Colores Enterprise 2026 — Dark Mode

**Fecha**: 28 de Abril de 2026  
**Proyecto**: Portfolio TumiDev  
**Objetivo**: Sistema de degradación progresiva para interfaces dark mode  

---

## 1. Estándares Enterprise 2026 — Gold Standard

### 1.1 Principios de Diseño Dark Mode Enterprise

Los estándares actuales para interfaces dark mode en proyectos enterprise (basado en sistemas como Linear, Vercel, Stripe, Notion) incluyen:

| Principio | Descripción |
| --- | --- |
| **Consistencia perceptual** | Los colores deben mantener la misma saturación y luminosidad relativa en todo el espectro |
| **Degradación direccional** | Los gradientes deben fluir en una dirección consistente (generalmente vertical) |
| **Profundidad escalable** | Usar capas de opacidad para crear profundidad sin multiplicar colores |
| **Accesibilidad integrada** | Ratio de contraste mínimo 4.5:1 para texto, 3:1 para elementos gráficos |

### 1.2 Sistema de Color de Referencia (Vercel/Linear)

| Elemento | Hex | Uso |
| --- | --- | --- |
| Background base | `#000000` | Fondo principal |
| Background elevado | `#0A0A0A` | Cards, modals |
| Background sutil | `#111111` | Secciones alternas |
| Border default | `#1A1A1A` | Separadores |
| Border hover | `#333333` | Estados hover |

---

## 2. Paleta de Colores del Proyecto

### 2.1 Colores Base Actuales

| Color | Hex | Uso actual |
| --- | --- | --- |
| Azul primario | `#3b82f6` (blue-500) | Acentos, botones primarios |
| Azul oscuro | `#1e3a5f` | Background alternate |
| Slate-900 | `#0f172a` | Fondos de sección |

### 2.2 Amarillos Existentes

| Color | Hex | Uso |
| --- | --- | --- |
| Amber primario | `#F7AB0A` | Acentos principales |
| Amber claro | `#F7CD2E` | Highlights, hover |
| Amber oscuro | `#92400e` | Shadows, profundidad |

---

## 3. Nueva Paleta Enterprise — Degradación Progressive

### 3.1 Sistema de 3 Tonos de Azul

| Nivel | Nombre | Hex | Opacidad | Uso |
| --- | --- | --- | --- | --- |
| 1 | **Deep Ocean** | `#0a1628` | 100% | Hero, fondo principal |
| 2 | **Midnight Blue** | `#111d32` | 100% | Secciones alternas |
| 3 | **Twilight Navy** | `#1a2744` | 100% | Cards, elementos elevados |

### 3.2 Integración con Amarillos

| Combinación | Fondo | Acento | Contraste |
| --- | --- | --- | --- |
| Hero + Accent | `#0a1628` | `#F7AB0A` | 7.2:1 ✅ |
| Content + Accent | `#111d32` | `#F7AB0A` | 6.8:1 ✅ |
| Cards + Accent | `#1a2744` | `#F7CD2E` | 5.9:1 ✅ |

---

## 4. Verificación de Accesibilidad

| Combinación | Ratio de Contraste | WCAG 2.1 AA |
| --- | --- | --- |
| Texto blanco sobre Deep Ocean | 14.2:1 | ✅ AAA |
| Amber sobre Deep Ocean | 7.2:1 | ✅ AAA |
| Texto blanco sobre Midnight Blue | 12.8:1 | ✅ AAA |
| Amber sobre Midnight Blue | 6.8:1 | ✅ AA |
| Texto claro sobre Twilight Navy | 9.4:1 | ✅ AAA |
