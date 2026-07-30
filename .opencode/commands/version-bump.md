# Version Bump Command

Alias: /version-bump <patch|minor|major>

Action:

1. Verify branch with `git branch --show-current` and require `dev`.
2. Ensure clean working tree before version changes.
3. Run `pnpm version <patch|minor|major> --no-git-tag-version`.
4. Run validation gates (`pnpm run lint`, `pnpm run type-check`, `pnpm run test`, `pnpm run build`).
5. Update release notes or changelog summary for the version bump.
6. Return concise report with:
   - Scope touched
   - Decisions made
   - Risks and follow-up actions
