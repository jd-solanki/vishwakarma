# Sandboxing

load-when: creating a sandbox, images, seeding files into one, secrets, local vs remote

## Words

**Image**: the named container image a run's sandbox starts from. Config names it.

**Seed**: a file written into a fresh sandbox before the agent starts — the global agent
instructions, the repo checkout, a config file.

## Rules

- Config names an image. Vishwakarma never builds, tags, pushes or hosts one.
- Every run gets a fresh sandbox. A sandbox is never reused across runs.
- A sandbox receives only the secrets that run needs, never the operator's full
  environment.
- The operator's global agent instructions (`~/.claude/CLAUDE.md`, `~/.codex/AGENTS.md`)
  are seeded into every sandbox.
- Anything that must outlive the run is pushed to GitHub or stored by Vishwakarma before
  the run ends.

## Reasons

- **Naming an image instead of building one keeps image hosting out of this project.** The
  operator runs `docker build -t <name> .` and Docker resolves the local name. A repo that
  needs pnpm names an image that already has pnpm. No registry, no build cache, no
  pipeline inside the code factory.
- **Local sandbox before remote.** One path that works end to end beats two half paths.
  Cloudflare is added once a local run is boring.

## Fences

- **A remote sandbox does not read the operator's local Docker daemon.** Cloudflare declares
  its container image in `wrangler.jsonc`, outside Flue entirely. Whether a locally built
  image name can be named remotely at all is unverified; confirm it against Cloudflare's own
  docs before assuming one config field serves both. `docs/research/flue-framework.md`
- **Flue's sandbox interface has no image concept at all.** Its `createSandbox({id})` gets
  no identity beyond an id, so picking an image per project is entirely Vishwakarma's
  code. `docs/research/flue-framework.md`
- **There is no copy-a-folder primitive.** Flue offers `writeFile(path, content)`, one
  file at a time. Seeding is hand-written, and a large seed is a loop, not a mount.
  `docs/research/flue-framework.md`
- **Sandbox workspace files are ephemeral by design.** Flue states this outright. Build
  output and repo state do not survive the run. `docs/research/flue-framework.md`
- **Environment variables are per-`exec`, layered over the adapter's base env.** A secret
  passed to one `exec` call is invisible to the next unless it sits in the sandbox's base env
  (`local({ env })`). `docs/research/flue-framework.md`

## Where it lives

Not built. Background: `docs/research/flue-framework.md`.
