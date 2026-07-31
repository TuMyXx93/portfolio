# ADR 0003: Migración al Gestor de Paquetes pnpm v11

* **Estado:** Aprobado
* **Fecha:** 2026-07-30
* **Autor:** DevOps & Build Quality Team

## Contexto

El gestor `npm` utilizaba una estructura plana de `node_modules` susceptible a dependencias fantasma (*phantom dependencies*), consumo excesivo de disco en entornos locales y tiempos de compilación mayores.

## Decisión

Se migra formalmente el proyecto a **`pnpm v11.18.0`** configurando un archivo `.npmrc` con aislamiento de dependencias (`node-linker=isolated`) y un lockfile v9.0 (`pnpm-lock.yaml`).

## Consecuencias

### Positivas
* **Mayor velocidad de build:** Reducción del tiempo de compilación de `next build` en un **25.7%** (de 9.7s a 7.2s).
* **Ahorro de espacio en disco:** Uso del almacén global de contenido direccionable de pnpm mediante enlaces rígidos (*hard links*).
* **Mayor seguridad:** Imposibilidad de importar paquetes que no estén declarados explícitamente en `package.json`.

### Negativas / Mitigaciones
* Los scripts nativos de post-instalación (como `sharp`) vienen deshabilitados por defecto en pnpm v11; se solucionó configurando la aprobación explícita vía `pnpm approve-builds`.
