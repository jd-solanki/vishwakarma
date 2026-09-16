# Agent runs

load-when: run lifecycle, the implement or review flow, rounds, what a PR carries

## Words

**Implement run**: reads an issue, writes code in a sandbox, opens a draft pull request.

**Review run**: clones a pull request, installs dependencies, runs the tests, reviews,
fixes what it finds, and repeats for a capped number of rounds.

**Round**: one review-then-fix cycle inside a review run.

**Outcome**: the recorded verdict of a finished run. Every run has one, whether or not it
produced code.

## Rules

- The agent that wrote the code never reviews it. An implement run and a review run are
  separate runs with separate agents.
- Vishwakarma never merges. A human merges every pull request.
- Every run records an outcome, including the ones that produced nothing.
- A review run uses the target repo's own `/review-pr` skill. Vishwakarma carries no
  review prompt of its own.
- Rounds are capped by config. A review run never loops until it is happy.
- A pull request body carries the evidence: what commands ran and what passed, so a
  reviewer can judge depth without rerunning the work.

## Reasons

- **Implementer and reviewer are split** so no agent both produces work and judges it. Prior
  art isolates phases behind a written handoff, because an agent that diagnoses and fixes in
  one pass drifts toward forcing a solution when the bug may not exist.
  `docs/research/software-factory-prior-art.md`
- **`/review-pr` lives in the target repo** so each project owns its own review bar. A bar
  set here would be wrong for every repo but one.
- **A human merges.** The one team that documents its merge step has a human merge
  everything an agent produces. The evidence chain exists so review effort can scale with
  risk instead of every PR getting the same read.
  `docs/research/software-factory-prior-art.md`
- **Readiness is proved, not declared.** A run that claims an issue is ready shows a failing
  probe first. `docs/research/software-factory-prior-art.md`

## Fences

- **Repeated agent failure on one repo usually means the codebase is opaque, not that the
  agent is weak.** A missing test caused Astro's HMR regression. Check the repo before
  tuning the prompt. `docs/research/software-factory-prior-art.md`
- **A run against this repository can change the code that runs it.** Vishwakarma is its own
  target repo, so a bad merge breaks the factory, and the next run inherits the break.
  Treat a PR that touches run orchestration, labels or sandbox setup as higher risk than the
  same PR in any other repo.
- **No public write-up reports cost, rate limits, runaway loops or PR noise volume.**
  Silence is not evidence they do not happen. Instrument from the first run.
  `docs/research/software-factory-prior-art.md`

## Where it lives

Not built. The v0 surface is three commands: `vs setup <repo>`, `vs implement <issue-no>`,
`vs review <pr-no>`.
