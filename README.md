# Portfolio Tumidev

Portfolio profesional con enfoque en rendimiento, accesibilidad WCAG 2.1 y experiencia visual moderna.

## Stack

| Tecnología    | Versión                         |
| ------------- | ------------------------------- |
| Next.js       | 16.2.3 (App Router + Turbopack) |
| React         | 19.2.4                          |
| TypeScript    | 5.9.3 (strict mode)             |
| Tailwind CSS  | 4.2.2                           |
| Framer Motion | 12.38.0                         |
| Jest          | 30.3.0                          |
| Playwright    | 1.59.1                          |

## Quick Start

```bash
git clone https://github.com/tumidev/portfolio.git
cd portfolio
npm install
npm run dev
```

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint validation
npm run type-check   # TypeScript validation
npm test             # Jest tests (61 tests)
npm run test:watch   # Jest watch mode
npm run test:coverage # Test coverage report
npm run test:e2e     # Playwright e2e (3 browsers)
npm run format       # Prettier formatting
```

## Requisitos

- Node.js `>=24.15.0 <25`
- npm `>=11`

## Arquitectura

```
src/
├── app/                 # Routes (App Router), sitemap, robots, API endpoints
├── components/
│   ├── accessibility-tabs/  # VisualTab, MotorTab, CognitiveTab, AudioTab
│   ├── common/          # Shared components
│   └── sections/        # Page sections (Hero, About, Experience, etc.)
├── contexts/            # React contexts (Accessibility, I18n)
├── hooks/               # Custom hooks with tests
│   └── __tests__/       # 9 hook test files
├── lib/
│   └── i18n/            # Internationalization
└── types/               # TypeScript contracts
```

## Seguridad

- **Input sanitization**: Zod + DOMPurify en `/api/contact`
- **Rate limiting**: IP-based (5 requests/window)
- **Headers**: CSP + HSTS configurados
- **Logger estructurado**: Sin PII en logs

## Accesibilidad

- Menú de accesibilidad con 4 tabs (Visual, Motor, Cognitivo, Audio)
- Soporte WCAG 2.1
- Navegación por teclado
- Screen reader announcements

## Deployment

Variables de entorno requeridas:

```env
VERCEL_URL=<production-url>  # Para OG image
```

## Documentación

| Archivo                     | Descripción                                          |
| --------------------------- | ---------------------------------------------------- |
| `CONTRIBUTING.md`           | Guía de contribución                                 |
| `CHANGELOG.md`              | Historial de cambios                                 |
| `SECURITY.md`               | Política de seguridad                                |
| `docs/HISTORIAL_MEJORAS.md` | Registro técnico del proceso de auditoría enterprise |

## Validación local

Antes de commit, el hook Husky ejecuta:

```bash
npm run type-check && npm run lint && npm test
```

Antes de push, ejecuta:

```bash
npm run build
```
