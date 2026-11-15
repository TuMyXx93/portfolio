# Testing Quality Skill

Focus: reliable feedback loops and regression safety.

Rules:

1. Prioritize tests for high-risk paths.
2. Assert user-visible behavior over internals.
3. New tests must reference the spec requirement: `// spec:NNNN#RF-XX`.
4. Keep fixtures deterministic and minimal.
5. Treat lint/type/test/build failures as release blockers.
6. Keep unit and integration coverage in Jest, and reserve Playwright for route-level smoke and critical user journeys.
7. Include E2E smoke validation before merge to `main`.
8. Stabilize async tests with explicit waiting strategies and avoid timing-based flakiness.
