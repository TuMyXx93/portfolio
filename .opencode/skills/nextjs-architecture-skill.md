# Next.js Architecture Skill

Focus: App Router boundaries and component layering.

Rules:

1. Keep route concerns in `src/app/`.
2. Keep reusable UI in `src/components/`.
3. Keep cross-cutting utilities in `src/lib/`.
4. Use `"use client"` only when browser interactivity requires it.
5. Prefer Server Components by default and isolate client interactivity to small leaf components.
6. Keep route metadata in App Router boundaries (`layout.tsx` or `page.tsx`) and avoid duplicated metadata sources.
7. Use typed route-level data contracts and avoid implicit `any` in server/client boundaries.
