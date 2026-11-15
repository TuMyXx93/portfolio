# Plan Command

Alias: /plan

Action:

1. Read the active spec from `specs/` (status `approved`).
2. Read relevant ADRs from `docs/adr/` as constraints.
3. Consult context7 for current API documentation of frameworks involved.
4. Produce a technical plan including:
   - Files to create/modify (with paths)
   - Data contracts and shared types
   - Risks and mitigation
   - Testing strategy (which RF map to which tests)
5. Save the plan as `specs/NNNN-<slug>.plan.md` or present inline.
6. Return: scope touched, decisions made, risks and follow-up actions.
