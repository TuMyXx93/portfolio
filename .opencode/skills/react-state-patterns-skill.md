# React State Patterns Skill

Focus: predictable state ownership and render stability.

Rules:
1. Keep state local unless multiple consumers require lifting.
2. Move reusable behavior into hooks in `src/hooks/`.
3. Avoid unnecessary re-renders via memoization and stable callbacks.
4. Use effects for side effects only.