# React State Patterns Skill

Focus: predictable state ownership and render stability.

Rules:

1. Keep state local unless multiple consumers require lifting.
2. Move reusable behavior into hooks in `src/hooks/`.
3. Avoid unnecessary re-renders via memoization and stable callbacks.
4. Use effects for side effects only.
5. In React 19, prefer event-driven updates and keep transitions intentional for perceived performance.
6. Do not mirror props into state unless there is a clear synchronization requirement.
7. Keep async state flows cancellable to avoid race conditions and stale UI updates.
