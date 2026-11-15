# AGENTS.md - Project Orchestrator

This file is the source of truth for AI-assisted work. Keep it concise — detailed protocols live in specialized files and Engram memory.

## Project Overview

Portfolio web app: Next.js 16 + React 19 + TypeScript 5.9 + Tailwind CSS 4 + Framer Motion 13 + Jest 30 + Playwright (smoke). Package Manager: pnpm 11. Deployment: Vercel.

## Branch Policy

- `dev`: development branch (all work starts here)
- `main`: stable production branch
- `main1`: deprecated, removed from workflow

**Rules**: Implement in `dev` or feature branches. Merge to `main` only after validations pass. Do not develop directly on `main` except emergency hotfixes.

## Validation Commands

See `.opencode/commands/` for specs:

- `/version-gate` — branch check + lint + type-check + test + build
- `/verify-web` — lint + type-check + test + build + e2e smoke

## Architecture Rules

- `src/app/`: routes, metadata, layout boundaries
- `src/components/`: reusable UI and sections
- `src/hooks/`: reusable client behavior
- `src/lib/`: shared helpers/utilities
- `src/types/`: shared TypeScript contracts

Keep components composable, avoid cross-layer coupling, prefer explicit types.

## Pre-Task Gate

Before code modifications, run `/version-gate`.

- FAIL: stop and fix blockers.
- PASS WITH WARNINGS: proceed with caution and report risks.
- PASS: implement directly.

Before opening a PR to `main`, run `/verify-web` and attach results to PR context.

## Agent System

Assets live in `.opencode/`.

### Agents

| Agent                   | Role                                              |
| ----------------------- | ------------------------------------------------- |
| `frontend-ux-agent`     | UI, responsive behavior, animation, accessibility |
| `qa-integration-agent`  | lint/type/test/build quality loops                |
| `devops-agent`          | CI/CD, workflows, build stability                 |
| `performance-seo-agent` | Core Web Vitals, metadata, Lighthouse             |
| `tech-writer-agent`     | docs, changelog, contributor docs                 |

Each agent must return: Scope touched, Decisions made, Risks and follow-up actions, Memory saves triggered.

See `.opencode/agents/` for detailed guidelines per agent.

### Commands

| Command                               | Purpose                                                 |
| ------------------------------------- | ------------------------------------------------------- |
| `/verify-web`                         | Full validation: lint + type-check + test + build + e2e |
| `/version-gate`                       | Pre-task: branch + lint + type-check + test + build     |
| `/audit-orchestrator`                 | Consistency audit for AGENTS, agents, skills, commands  |
| `/version-bump <patch\|minor\|major>` | Release/version workflow                                |
| `/specify`                            | Generate feature spec from template                     |
| `/plan`                               | Technical plan from active spec                         |
| `/tasks`                              | Decompose plan into atomic tasks                        |
| `/converge`                           | Final verification (equiv. to `/verify-web`)            |
| `/engram-status`                      | Memory health and project hygiene                       |

See `.opencode/commands/` for action specs.

### Skills

- `nextjs-architecture-skill`
- `react-state-patterns-skill`
- `accessibility-seo-skill`
- `testing-quality-skill`
- `git-ops-skill`
- `devsecops-workflow-skill`

See `.opencode/skills/` for detailed rules.

## Dispatch Order

1. Run `/version-gate` for code edits
2. For new features/APIs: `/specify` → `/plan` → `/tasks` → implement → `/verify-web`
3. UI/layout/animation → `frontend-ux-agent`
4. Performance/SEO → `performance-seo-agent`
5. Tests/quality regressions → `qa-integration-agent`
6. CI/build/workflows → `devops-agent`
7. Docs/changelogs → `tech-writer-agent`
8. Before merge to `main`, run `/verify-web`

## Spec-Driven Development Workflow

Ciclo para features nuevas y cambios de API: **specify → plan → tasks → implement → converge**.

1. `/specify` — entrevista al usuario y genera `specs/NNNN-<slug>.md` desde `specs/templates/feature-spec.md`. Sign-off humano explícito antes de continuar.
2. `/plan` — lee la spec activa + ADRs como restricciones → plan técnico (archivos, contratos, riesgos). Consulta context7 para verificar APIs vigentes.
3. `/tasks` — descompone el plan en tareas atómicas etiquetadas con `[spec:NNNN RF-XX]`, una por commit.
4. Implementar — los agentes leen la spec activa antes de editar código. Commits referencian spec-ID.
5. `/verify-web` — valida implementación contra la spec (incluye `spec:trace` y `doc:drift`).

**Reglas:**

- Leer la spec activa antes de editar código en `src/`.
- Cada requisito `RF-XX` debe tener al menos un test que lo referencie (`// spec:NNNN#RF-XX`).
- No sobre-especificar: empezar con specs ligeras y expandir solo donde añada valor.
- Specs en `specs/` con estado `draft` → `approved` → `implemented`.
- La constitución del proyecto está en `docs/adr/0007-project-constitution.md`.

**Comandos SDD:**

- `/specify` — generar spec
- `/plan` — plan técnico
- `/tasks` — descomposición en tareas
- `/converge` — verificación final (equivale a `/verify-web`)

## MCP and Memory

### MCP Tools

La referencia portable y la matriz de equivalencia entre clientes están en [`docs/reference/MCP_INTEGRATION.md`](docs/reference/MCP_INTEGRATION.md). `opencode.json` y `.vscode/mcp.json` son adaptadores nativos; no deben contener secretos.

**context7**: Dependency/framework documentation resolver. Use to fetch up-to-date library docs before implementing.

**engram**: Persistent memory system for AI coding agents. 23 tools available (Engram v3.6.0):

| Category           | Tools                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Save & Update      | `mem_save`, `mem_update`, `mem_delete`, `mem_suggest_topic_key`                                                  |
| Search & Retrieve  | `mem_search`, `mem_context`, `mem_timeline`, `mem_get_observation`                                               |
| Session Lifecycle  | `mem_session_start`, `mem_session_end`, `mem_session_summary`                                                    |
| Conflict Surfacing | `mem_judge`, `mem_compare`                                                                                       |
| Utilities          | `mem_save_prompt`, `mem_stats`, `mem_capture_passive`, `mem_merge_projects`, `mem_current_project`, `mem_doctor` |

### Engram Cloud (opt-in replication)

Background push/pull replication for multi-machine sync.

**Enable autosync** (all three env vars required):

```
ENGRAM_CLOUD_AUTOSYNC=1
ENGRAM_CLOUD_TOKEN=<token>
ENGRAM_CLOUD_SERVER=<url>
```

**CLI commands**:

```
engram cloud config --server <url>      # configure cloud endpoint
engram cloud enroll <project>           # enroll project for cloud sync
engram cloud upgrade doctor --project <name>   # readiness diagnosis
engram cloud upgrade repair --project <name>   # repair planner/apply
engram cloud upgrade bootstrap --project <name> # resumable enroll/push/verify
engram cloud upgrade status --project <name>   # show stage/class/reason
engram projects list|consolidate|prune       # project hygiene
```

**Status reason codes**: `blocked_unenrolled`, `auth_required`, `cloud_config_error`, `policy_forbidden`, `paused`, `transport_failed`

### Legacy Sync Mutation Repair

If `engram doctor` reports `sync_mutation_required_fields` blocked, session upsert payloads in `sync_mutations` are missing required fields (typically `directory` from older engram versions). Two repair paths:

1. **Local-only (no cloud enrollment)**: run `py tools/repair-missing-session-directory.py --apply --project <name>`. The Python script is a Windows-portable equivalent of upstream `tools/repair-missing-session-directory.sh --fix-exported` (upstream shell script requires `sqlite3` CLI not available on Windows). Dry-run is the default.
2. **Post-enrollment**: `engram cloud upgrade repair --project <name> --apply` (canonical flow per upstream docs).

A complete pre-repair backup of `~/.engram/engram.db` (+ `-wal`, `-shm`) is mandatory before any `--apply`. Use timestamped `.bak` files.

### Beta Conflict Surfacing (opt-in)

Upstream `feat/memory-conflict-surfacing-cloud-sync` branch exposes `--semantic` LLM-judge scans via `engram conflicts scan --semantic --apply`. Optional and isolated; not enabled in this project (no `docker-compose.beta.yml`).

### Memory Protocol

Detailed protocol stored in Engram — retrieve via `mem_context` on session start. Key rules:

**When to Save**: Call `mem_save` immediately after bug fix, architecture decision, non-obvious discovery, config change, pattern established, or user preference learned.

**When to Search**: When user asks to recall ("remember", "recall", "what did we do") or proactively when starting work on something potentially done before.

**Session Close Protocol**: Before ending a session, call `mem_session_summary`. After compaction, call `mem_session_summary` immediately then `mem_context` to recover.

**Passive Capture**: Include `## Key Learnings:` section in responses — Engram auto-extracts numbered items.

**Project Hygiene**: All project names normalized (lowercase, trim, collapse hyphens/underscores). Use `mem_merge_projects` to consolidate variants. Run `engram projects list` periodically.

### PDF Documentation Pipeline

When encountering PDF documentation during research, chain the PDF parser tools with Engram memory:

1. `pdf_parser_analyze_pdf_to_markdown` — convert PDF to searchable markdown
2. `pdf_parser_extract_pdf_metadata` — extract metadata for indexing context
3. `pdf_parser_extract_figures` — extract embedded figures as base64 for vision LLMs
4. Save key learnings as observations via `mem_save` or `mem_capture_passive`

Query via `mem_search` when needed.

## Save Notable Decisions

Save bugfixes, architecture decisions, and config changes as memory immediately after completing them.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
