# Audit Orchestrator Command

Alias: /audit-orchestrator

Action:

1. Verify `AGENTS.md` reflects current stack versions and active validation commands.
2. Verify `.opencode/agents/` definitions align with dispatch order and required output contract.
3. Verify `.opencode/skills/` guidance is consistent with Next.js 16, React 19, and the current test strategy.
4. Verify command docs in `.opencode/commands/` match actual scripts and CI workflows.
5. Return a concise report with:
   - Scope touched
   - Decisions made
   - Risks and follow-up actions
