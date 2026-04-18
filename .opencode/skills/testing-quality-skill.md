# Testing Quality Skill

Focus: reliable feedback loops and regression safety.

Rules:

1. Prioritize tests for high-risk paths.
2. Assert user-visible behavior over internals.
3. Keep fixtures deterministic and minimal.
4. Treat lint/type/test/build failures as release blockers.
5. Keep unit and integration coverage in Jest, and reserve Playwright for route-level smoke and critical user journeys.
6. Include E2E smoke validation before merge to `main`.
7. Stabilize async tests with explicit waiting strategies and avoid timing-based flakiness.
