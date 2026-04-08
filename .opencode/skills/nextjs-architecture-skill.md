# Next.js Architecture Skill

Focus: App Router boundaries and component layering.

Rules:
1. Keep route concerns in `src/app/`.
2. Keep reusable UI in `src/components/`.
3. Keep cross-cutting utilities in `src/lib/`.
4. Use `"use client"` only when browser interactivity requires it.