# AGENTS.md - Project Orchestrator

This file is the source of truth for AI-assisted work in this repository.

## Project Overview

Portfolio web app focused on UX, accessibility, performance, and maintainability.

- Framework: Next.js + React + TypeScript
- Styling: Tailwind CSS + PostCSS + Framer Motion
- Testing: Jest + Testing Library
- Deployment: Vercel

## Branch Policy

- `dev`: development branch (all work starts here)
- `main`: stable production branch
- `main1`: deprecated branch removed from workflow

Rules:

1. Implement changes in `dev` or feature branches from `dev`.
2. Merge to `main` only after validations pass.
3. Do not develop directly on `main` except emergency hotfixes.

## Validation Commands

- `npm run lint`
- `npm run type-check`
- `npm run test`
- `npm run build`

## Architecture Rules

- `src/app/`: routes, metadata, layout boundaries
- `src/components/`: reusable UI and sections
- `src/hooks/`: reusable client behavior
- `src/lib/`: shared helpers/utilities
- `src/types/`: shared TypeScript contracts

Keep components composable, avoid cross-layer coupling, and prefer explicit types.

## Pre-Task Gate

Before code modifications, run `/version-gate`.

- FAIL: stop and fix blockers.
- PASS WITH WARNINGS: proceed with caution and report risks.
- PASS: implement directly.

## Agent System

Assets live in `.opencode/`.

### Agents

- `frontend-ux-agent`: UI, responsive behavior, animation, accessibility
- `qa-integration-agent`: lint/type/test/build quality loops
- `devops-agent`: CI/CD, workflows, build stability
- `performance-seo-agent`: Core Web Vitals, metadata, Lighthouse
- `tech-writer-agent`: docs, changelog, contributor docs

### Commands

- `/verify-web`: lint + type-check + test + build
- `/version-gate`: branch and quality pre-check
- `/version-bump <patch|minor|major>`: release/version workflow

### Skills

- `nextjs-architecture-skill`
- `react-state-patterns-skill`
- `accessibility-seo-skill`
- `testing-quality-skill`
- `git-ops-skill`
- `devsecops-workflow-skill`

## Dispatch Order

1. Run `/version-gate` for code edits.
2. UI/layout/animation -> `frontend-ux-agent`
3. Performance/SEO -> `performance-seo-agent`
4. Tests/quality regressions -> `qa-integration-agent`
5. CI/build/workflows -> `devops-agent`
6. Docs/changelogs -> `tech-writer-agent`

## MCP and Memory

- `context7`: dependency/framework docs
- `engram`: persistent memory and session continuity

Save notable bugfixes, architecture decisions, and config changes as memory.
