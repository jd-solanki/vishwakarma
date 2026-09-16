# Server and client

load-when: the server process, the client, observability, streaming run progress

## Words

**Headless server**: the long-running process that owns runs. It has no UI.

**Client**: a separate process that renders run state for a human. Web, and not built.

## Rules

- The server completes a run with no client attached. A client is never required for work
  to finish.
- A client reads run progress over the stream the server exposes. It never reaches into
  Flue internals.

## Reasons

- **The server and client split is a settled goal, not an open question.** A run survives a
  closed browser and a restarted UI. This is the shape herdr and opencode use, and they are
  the inspiration for it.
- **The client is v2.** The v0 interface is the `vs` commands plus GitHub itself, which is
  already a usable view of every run.
- **A fleet-wide view is ours to store.** Neither Flue surface aggregates across runs, so
  any across-run view needs Vishwakarma's own storage. `docs/research/flue-framework.md`

## Fences

- **Flue has two observability surfaces and only one is reachable from outside.**
  `observe()` and `instrument()` are in-process only; a client built against them cannot
  read anything over HTTP. The Streaming Protocol is the external one —
  `GET /:id?view=updates&live=sse`, carrying `tool-input`, `tool-output` and `message-delta`
  chunks. `docs/research/flue-framework.md`

## Where it lives

Not built. Background: `docs/research/flue-framework.md`.
