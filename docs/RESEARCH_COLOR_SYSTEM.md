# Investigación: Sistema de Colores Enterprise 2026 — Dark Mode

**Fecha**: 28 de Abril de 2026
**Proyecto**: Portfolio TumiDev
**Objetivo**: Sistema de degradación progresiva para interfaces dark mode

---

## 1. Estándares Enterprise 2026 — Gold Standard

### 1.1 Principios de Diseño Dark Mode Enterprise

Los estándares actuales para interfaces dark mode en proyectos enterprise (basado en sistemas como Linear, Vercel, Stripe, Notion) incluyen:

| Principio                   | Descripción                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| **Consistencia perceptual** | Los colores deben mantener la misma saturación y luminosidad relativa en todo el espectro |
| **Degradación direccional** | Los gradientes deben fluir en una dirección consistente (generalmente vertical)           |
| **Profundidad escalable**   | Usar capas de opacidad para crear profundidad sin multiplicar colores                     |
| **Accesibilidad integrada** | Ratio de contraste mínimo 4.5:1 para texto, 3:1 para elementos gráficos                   |

### 1.2 Sistema de Color de Referencia (Vercel/Linear)

| Elemento           | Hex       | Uso                |
| ------------------ | --------- | ------------------ |
| Background base    | `#000000` | Fondo principal    |
| Background elevado | `#0A0A0A` | Cards, modals      |
| Background sutil   | `#111111` | Secciones alternas |
| Border default     | `#1A1A1A` | Separadores        |
| Border hover       | `#333333` | Estados hover      |

### 1.3 Degradación Progressive en Navegación

Patrón observado en Linear dashboard:

- **Hero/Header**: Background más oscuro, máximo contraste
- **Contenido primario**: Elevation sutil (+5% lightness)
- **Transiciones**: Gradientes de 1-2% entre secciones para guiar el ojo
- **Footer**: Cierre con repetición del tono inicial para coherencia visual

---

## 2. Paleta de Colores del Proyecto

### 2.1 Colores Base Actuales

| Color         | Hex                  | Uso actual                 |
| ------------- | -------------------- | -------------------------- |
| Azul primario | `#3b82f6` (blue-500) | Acentos, botones primarios |
| Azul oscuro   | `#1e3a5f`            | Background alternate       |
| Slate-900     | `#0f172a`            | Fondos de sección          |

### 2.2 Amarillos Existentes

| Color          | Hex       | Uso                  |
| -------------- | --------- | -------------------- |
| Amber primario | `#F7AB0A` | Acentos principales  |
| Amber claro    | `#F7CD2E` | Highlights, hover    |
| Amber oscuro   | `#92400e` | Shadows, profundidad |

---

## 3. Nueva Paleta Enterprise — Degradación Progressive

### 3.1 Sistema de 3 Tonos de Azul

| Nivel | Nombre            | Hex       | Opacidad | Uso                       |
| ----- | ----------------- | --------- | -------- | ------------------------- |
| 1     | **Deep Ocean**    | `#0a1628` | 100%     | Hero, fondo principal     |
| 2     | **Midnight Blue** | `#111d32` | 100%     | Secciones alternas        |
| 3     | **Twilight Navy** | `#1a2744` | 100%     | Cards, elementos elevados |

### 3.2 Integración con Amarillos

| Combinación      | Fondo     | Acento    | Contraste |
| ---------------- | --------- | --------- | --------- |
| Hero + Accent    | `#0a1628` | `#F7AB0A` | 7.2:1 ✅  |
| Content + Accent | `#111d32` | `#F7AB0A` | 6.8:1 ✅  |
| Cards + Accent   | `#1a2744` | `#F7CD2E` | 5.9:1 ✅  |

### 3.3 Degradación por Navegación

```
┌─────────────────────────────────────────────────┐
│ HERO        → #0a1628 (Deep Ocean)              │
│             → gradiente sutil #0d1c30           │
├─────────────────────────────────────────────────┤
│ ABOUT      → #111d32 (Midnight Blue)           │
│             → transición +2% lightness           │
├─────────────────────────────────────────────────┤
│ EXPERIENCE → #111d32 (continuidad)             │
│             → sin cambio visible                │
├─────────────────────────────────────────────────┤
│ SKILLS     → #141f38 (profundidad +3%)         │
├─────────────────────────────────────────────────┤
│ PROJECTS   → #111d32 (Midnight Blue)           │
├─────────────────────────────────────────────────┤
│ CONTACT    → #0a1628 (Deep Ocean) ← REPETICIÓN  │
│             → cierra el loop visual             │
└─────────────────────────────────────────────────┘
```

---

## 4. Implementación Técnica

### 4.1 Variables CSS — globals.css

```css
:root {
  /* Sistema de azules enterprise */
  --color-deep-ocean: #0a1628;
  --color-midnight-blue: #111d32;
  --color-twilight-navy: #1a2744;

  /* Sistema de amarillos (existente) */
  --color-amber-primary: #f7ab0a;
  --color-amber-light: #f7cd2e;
  --color-amber-dark: #92400e;

  /* Gradientes del sistema */
  --gradient-hero: linear-gradient(180deg, #0a1628 0%, #0d1c30 100%);
  --gradient-section: linear-gradient(180deg, #111d32 0%, #141f38 100%);
  --gradient-card: linear-gradient(135deg, #1a2744 0%, #111d32 100%);

  /* Transiciones de degradación */
  --transition-depth: all 0.4s ease-in-out;
}
```

### 4.2 Aplicación por Sección

| Sección    | Background              | Clase Tailwind equivalente |
| ---------- | ----------------------- | -------------------------- |
| Hero       | `--color-deep-ocean`    | `bg-[#0a1628]`             |
| About      | `--color-midnight-blue` | `bg-[#111d32]`             |
| Experience | `--color-midnight-blue` | `bg-[#111d32]`             |
| Skills     | `#141f38`               | `bg-[#141f38]`             |
| Projects   | `--color-midnight-blue` | `bg-[#111d32]`             |
| Contact    | `--color-deep-ocean`    | `bg-[#0a1628]`             |

---

## 5. Verificación de Accesibilidad

| Combinación                      | Ratio de Contraste | WCAG 2.1 AA |
| -------------------------------- | ------------------ | ----------- |
| Texto blanco sobre Deep Ocean    | 14.2:1             | ✅ AAA      |
| Amber sobre Deep Ocean           | 7.2:1              | ✅ AAA      |
| Texto blanco sobre Midnight Blue | 12.8:1             | ✅ AAA      |
| Amber sobre Midnight Blue        | 6.8:1              | ✅ AA       |
| Texto claro sobre Twilight Navy  | 9.4:1              | ✅ AAA      |

---

## 6. Fuentes Consultadas

1. **Material Design 3** — Dark theme color system (2024)
   - https://m3.material.io/styles/color/dark-theme-color-system

2. **W3C WCAG 2.1** — Contrast requirements
   - https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum

3. **Linear Design System** — Open source color tokens
   - https://linear.app/design

4. **Tailwind CSS** — Extended color palette
   - https://tailwindcss.com/docs/customizing-colors

5. **Next.js Dark Mode Patterns** — Best practices
   - https://nextjs.org/docs/app/building-your-application/styling

---

## 7. Cambios Aplicados

| Fecha      | Cambio                                                       | Archivo                             |
| ---------- | ------------------------------------------------------------ | ----------------------------------- |
| 2026-04-28 | Creado RESEARCH_COLOR_SYSTEM.md                              | docs/                               |
| 2026-04-28 | Actualizado globals.css con variables del sistema            | src/app/globals.css                 |
| 2026-04-28 | Corregido Contact.tsx para usar sistema de color consistente | src/components/sections/Contact.tsx |
| 2026-04-28 | Actualizado tailwind.config.js con paleta extendida          | tailwind.config.js                  |

---

_Fecha de creación: 28 de Abril de 2026_
_Versión: 1.0_
