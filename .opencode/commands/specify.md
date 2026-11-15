# Specify Command

Alias: /specify

Action:

1. Ask the user for the feature description, constraints, and out-of-scope items.
2. Determine the next spec number by scanning `specs/` for the highest `NNNN` prefix.
3. Consult context7 to verify current APIs for any framework mentioned (Next.js, React, etc.).
4. Generate `specs/NNNN-<slug>.md` from `specs/templates/feature-spec.md` with:
   - Context, Requirements (RF-01...), Acceptance criteria (Given/When/Then)
   - Out of scope, Risks, Contracts/Interfaces, Traceability, Implementation notes
5. Set status to `draft`.
6. Present the spec to the user for review and explicit sign-off.
7. On approval, change status to `approved`.
8. Return: scope touched, decisions made, risks and follow-up actions.
