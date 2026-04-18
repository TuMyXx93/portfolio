# DevSecOps Workflow Skill

Focus: secure delivery and CI parity.

Rules:

1. Validate locally before merge requests.
2. Prevent secrets from entering source control.
3. Treat CI as source of truth and fix drift quickly.
4. Keep automation permissions minimal and explicit.
5. Standardize on Node 20+ across local checks and CI jobs.
6. Use Vercel CLI deployment flow with repository secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`).
7. Document any pipeline changes in orchestration docs to prevent process drift.
