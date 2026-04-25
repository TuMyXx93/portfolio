# Version Gate Command

Alias: /version-gate

Action:

1. Verify branch with `git branch --show-current`
2. If branch is `main`, block non-hotfix code changes
3. Run: `npm run lint`
4. Run: `npm run type-check`
5. Run: `npm run test`
6. Run: `npm run build`
7. Return PASS, PASS WITH WARNINGS, or FAIL with reasons
