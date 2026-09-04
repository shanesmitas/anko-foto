# Agent Instructions

## Agent write ownership

The primary Codex agent is the only agent permitted to modify application source, tests,
configuration, dependency files, product specifications, or project documentation.

All custom subagents are advisory or verification agents.

- `code-explorer`, `plan-guardian`, and `code-reviewer` are strictly read-only.
- `e2e-verifier` and `ui-ux-reviewer` may create verification artifacts only.
- Subagents must never implement their own findings.
- All recommended changes return to the primary agent for assessment and implementation.
