---
name: project-context
description: This repository's words, rules, reasons and fences. Invoke before the first code action in a session, and again when a task enters a new domain.
---

# Project context

## What earns a line here

- A **word** — a term whose meaning this project fixes.
- A **rule** — a convention no linter or type checker enforces.
- A **reason** — why this shape was chosen, when the code cannot show it.
- A **fence** — the trap, where it bites (`file:line`), and why the fence stands.

**The test: could I learn this by reading the code?** Then link the path under
**Where it lives**. Leave the prose out.

Git holds the history and `package.json` holds the commands. Both are sources of
truth already; point at them.

Past ~150 lines, a file is two domains, or it is restating code. Split it or cut it.

`/audit-project-context` enforces all of the above.

## References

Load `glossary.md` every session. Load a domain file when your task enters it.

A domain file is settled unless its header says otherwise. `provisional`: build on it, but
keep its detail behind one seam. `exploratory`: argue with it before building on it.

| Reference                         | Load when                                                                    |
| --------------------------------- | ---------------------------------------------------------------------------- |
| `glossary.md`                     | always                                                                       |
| `domains/github-orchestration.md` | labels, the GitHub API, webhooks, the Projects board, GitHub auth            |
| `domains/sandboxing.md`           | creating a sandbox, images, seeding files into one, secrets, local vs remote |
| `domains/agent-runs.md`           | run lifecycle, the implement or review flow, rounds, what a PR carries       |
| `domains/extensibility.md`        | the config schema, hooks, events, plugins, modules                           |
| `domains/server-and-client.md`    | the server process, the client, observability, streaming run progress        |
