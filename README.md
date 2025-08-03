# 🚀 Portfolio Personal - TumiDev

Un portfolio moderno y profesional construido con Next.js 14, TypeScript, Tailwind CSS y Framer Motion. Optimizado para rendimiento, accesibilidad y SEO.

## ✨ Características

### 🎨 Diseño y UX
- **Diseño Responsivo**: Adaptable a todos los dispositivos y tamaños de pantalla
- **Tema Claro/Oscuro**: Cambio dinámico de tema con persistencia local
- **Animaciones Fluidas**: Transiciones y animaciones con Framer Motion
- **Efectos Modernos**: Glass morphism y gradientes dinámicos

### ♿ Accesibilidad
- **WCAG 2.1 AA**: Cumplimiento con estándares de accesibilidad
- **Navegación por Teclado**: Soporte completo para navegación sin mouse
- **Screen Readers**: Optimizado para lectores de pantalla
- **Skip Links**: Enlaces de salto para navegación rápida
- **Contraste Alto**: Ratios de contraste optimizados

### ⚡ Rendimiento
- **Next.js 14**: App Router y Server Components
- **Optimización de Imágenes**: Carga lazy y compresión automática
- **Code Splitting**: Carga de código bajo demanda
- **Progressive Enhancement**: Mejora progresiva de funcionalidades

## 🛠️ Tecnologías

### Frontend
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático y mejor DX
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animaciones y transiciones

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Jest** - Testing framework
- **Testing Library** - Utilidades de testing

### CI/CD y DevOps
- **GitHub Actions** - Integración y despliegue continuo
- **Lighthouse CI** - Monitoreo de rendimiento
- **Dependabot** - Actualizaciones automáticas de dependencias
- **Vercel** - Plataforma de despliegue

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18 o superior
- npm, yarn o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Tumi-dev/portfolio.git
cd portfolio

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción

# Calidad de Código
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de ESLint
npm run type-check   # Verificar tipos TypeScript
npm run format       # Formatear código con Prettier
npm run format:check # Verificar formato

# Testing
npm test             # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Tests con cobertura
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/                 # App Router (Next.js 14)
│   ├── globals.css     # Estilos globales
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página de inicio
├── components/         # Componentes React
│   ├── common/         # Componentes comunes
│   ├── layout/         # Componentes de layout
│   └── sections/       # Secciones de la página
├── hooks/              # Custom hooks
├── lib/                # Utilidades y configuraciones
├── styles/             # Estilos adicionales
└── types/              # Definiciones de tipos TypeScript
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### 🔍 CI/CD Principal (`ci-cd.yml`)
- **Quality Checks**: Linting, type checking, formatting
- **Testing**: Unit tests con Jest
- **Build**: Compilación y verificación
- **Security**: Audit de dependencias
- **Performance**: Lighthouse CI

#### 🚀 Deployment (`deploy.yml`)
- **Auto-deployment**: Despliegue automático a Vercel
- **Environment**: Configuración de variables de entorno
- **Notifications**: Notificaciones de estado

#### 🔄 Auto-Update (`auto-update.yml`)
- **Dependencies**: Actualización automática de dependencias
- **Testing**: Verificación de compatibilidad
- **Merge**: Merge automático si los tests pasan

### 🤖 Dependabot
- **Schedule**: Actualizaciones semanales los lunes
- **Auto-merge**: Merge automático para actualizaciones menores
- **Security**: Actualizaciones de seguridad inmediatas

## 📈 Monitoreo y Calidad

### Lighthouse CI
- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 90
- **SEO**: > 95

### Code Quality
- **TypeScript**: Strict mode habilitado
- **ESLint**: Configuración estricta de Next.js
- **Prettier**: Formateo consistente
- **Test Coverage**: > 80%

## 🌐 Despliegue

### Vercel (Recomendado)
```bash
# Conectar con Vercel CLI
vercel

# O usar integración de GitHub
# Push a main -> despliegue automático
```

### Otros Proveedores
- **Netlify**: Compatible con build estático
- **Cloudflare Pages**: Soporte para SSG/SSR
- **AWS Amplify**: Integración con AWS

## 🔧 Configuración de Entorno

### Variables de Entorno
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Configuraciones Importantes
- **next.config.js**: Configuración de Next.js
- **tailwind.config.js**: Configuración de Tailwind
- **tsconfig.json**: Configuración de TypeScript
- **.eslintrc.json**: Reglas de ESLint

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución
- Seguir las convenciones de TypeScript
- Escribir tests para nuevas funcionalidades
- Mantener la cobertura de tests > 80%
- Seguir las convenciones de commit semántico

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - El framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Librería de animaciones
- [Vercel](https://vercel.com/) - Plataforma de despliegue

## 📞 Contacto

**Tumi Developer**
- Portfolio: [tu-portfolio.com](https://tu-portfolio.com)
- Email: tu-email@example.com
- LinkedIn: [tu-linkedin](https://linkedin.com/in/tu-perfil)
- GitHub: [@Tumi-dev](https://github.com/Tumi-dev)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
