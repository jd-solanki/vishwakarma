# GitHub orchestration

load-when: labels, the GitHub API, webhooks, the Projects board, GitHub auth

## Words

**Label trigger**: a label whose presence means an agent should act. `agent:implement` on
an issue, `agent:review` on a pull request.

**Channel**: Flue's name for an inbound integration. Flue ships a GitHub one.

**Board**: the GitHub Projects kanban view. It is a _view_ of label state, never the
source of it.

## Rules

- Labels are the state machine. Comments are the log. The board is a view. A maintainer
  reading only GitHub can see every run's state.
- Never hold run state that GitHub cannot show. If it is not a label, a comment or a PR,
  it is not state.
- A trigger is the `vs` command. There is no webhook listener.
- Auth is whatever token the `gh` CLI already holds. Vishwakarma stores no credential of
  its own.
- Never write a secret or raw model output into an issue or PR comment.

## Reasons

- **Labels over a database.** The operator can inspect and change any run's state from the
  GitHub UI with Vishwakarma stopped. A private store would need its own UI to be
  recoverable. See `docs/research/software-factory-prior-art.md`.
- **The `gh` token over a GitHub App.** This is a local tool for one operator, so an app
  registration, a private key and token refresh buy nothing yet. A scoped GitHub App
  installation token is the right answer the moment a second person installs this.
- **Flue's GitHub channel, not our own.** It ships webhook signature verification and an
  Octokit client. See `docs/research/flue-framework.md`.
- **The agent workflow is versioned in Vishwakarma, never copied into each target repo.** A
  target repo carrying its own copy drifts, and then two repos disagree about what a label
  means.

## Fences

- **Flue's GitHub channel documents comment events only.** `issues.labeled` handling and
  PR creation are not shown anywhere in its docs. Test against a real webhook payload
  before designing on top of them. `docs/research/flue-framework.md`
- **A webhook handler has about 10 seconds and GitHub does not retry a timeout.** When the
  listener is built it must enqueue and return 2xx. Running an agent inline loses the
  event with no trace. `docs/research/software-factory-prior-art.md`
- **GitHub redelivers webhooks.** Claim the delivery id before starting work, or one label
  produces two runs against one issue. `docs/research/software-factory-prior-art.md`
- **Prior art's auth model cannot be copied.** One source passes a separate `read-token` and
  `write-token`, but no source states whether either is a GitHub App installation token or a
  PAT. Choose deliberately when the `gh` token is replaced; a per-repo-scoped GitHub App
  installation token is the least-privilege default.
  `docs/research/software-factory-prior-art.md`

## Where it lives

Not built. Background: `docs/research/software-factory-prior-art.md`,
`docs/research/flue-framework.md`.
