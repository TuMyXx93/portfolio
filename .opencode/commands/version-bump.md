# Version Bump Command

Alias: /version-bump <patch|minor|major>

Action:

1. Verify branch with `git branch --show-current` and require `dev`.
2. Ensure clean working tree before version changes.
3. Run `npm version <patch|minor|major> --no-git-tag-version`.
4. Run validation gates (`npm run lint`, `npm run type-check`, `npm run test`, `npm run build`).
5. Update release notes or changelog summary for the version bump.
6. Return concise report with:
   - Scope touched
   - Decisions made
   - Risks and follow-up actions
