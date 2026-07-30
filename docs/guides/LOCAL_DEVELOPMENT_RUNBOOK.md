# Runbook de Desarrollo Local (Local Development Runbook)

Este documento guía la configuración, resolución de problemas y ejecución local del entorno de desarrollo en sistemas **Windows 11 / WSL2 / Linux**.

---

## 1. Configuración del Entorno de Desarrollo

### Requisitos Previos
* **Node.js:** v24.15.0+ (LTS recomendado v24.13.3)
* **pnpm:** v11.18.0+
* **Git:** v2.40+

### Pasos de Instalación Rápida
```bash
# 1. Clonar el repositorio
git clone https://github.com/tumidev/portfolio.git
cd portfolio

# 2. Instalar dependencias con pnpm
pnpm install

# 3. Aprobar scripts de construcción nativos (Sharp image loader)
pnpm approve-builds

# 4. Iniciar servidor de desarrollo
pnpm run dev
```

---

## 2. Coexistencia con WSL2 y Docker

En entornos mixtos (Windows host + WSL2 Ubuntu + Docker), es común que existan contenedores o servicios escuchando en puertos compartidos.

### Verificación de Puertos Libres

#### En Windows (PowerShell):
```powershell
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
```

#### En WSL / Linux:
```bash
wsl ss -tulpn | grep 3000
```

### Diagnóstico de Contenedores Docker Activos (`wsl docker ps`):
Si ejecutas bases de datos u otros servicios en Docker:
* Redis normalmente utiliza el puerto `6379`.
* PostgreSQL normalmente utiliza los puertos `5432` / `5433`.
* El servidor de dev de Next.js utiliza el puerto `3000`.

### Resolución de Conflictos de Puerto

Si el puerto `3000` se encuentra ocupado por otra aplicación:
```bash
# Opción 1: Levantar Next.js en un puerto alternativo
pnpm run dev -- -p 3001

# Opción 2: Detener contenedor en Docker que ocupe el puerto
wsl docker stop <container_id_o_nombre>
```

---

## 3. Comandos Útiles de Mantenimiento

```bash
# Limpieza de cachés de compilación y pruebas
pnpm run clean # Elimina .next, coverage, test-results

# Ejecutar pruebas e2e en modo con interfaz gráfica (Headed)
pnpm run test:e2e:headed

# Formateo automático de código con Prettier
pnpm run format
```
