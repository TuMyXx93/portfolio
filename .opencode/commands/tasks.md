# Tasks Command

Alias: /tasks

Action:

1. Read the active spec and its technical plan.
2. Decompose into atomic tasks, each tagged with `[spec:NNNN RF-XX]`.
3. Each task must be:
   - Small enough for a single commit
   - Independently testable
   - Ordered by dependency
4. Output a task list with checkboxes in `specs/NNNN-<slug>.tasks.md`.
5. Each task includes: description, files touched, RF reference, test expectation.
6. Return: scope touched, decisions made, risks and follow-up actions.
