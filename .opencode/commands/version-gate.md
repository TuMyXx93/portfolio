# Version Gate Command

Alias: /version-gate

Action:
1. Verify branch with `git branch --show-current`
2. If branch is `main`, block non-hotfix code changes
3. Run baseline validation (`npm run lint` and `npm run type-check`)
4. Return PASS, PASS WITH WARNINGS, or FAIL with reasons