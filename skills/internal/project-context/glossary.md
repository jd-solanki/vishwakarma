# Glossary

Vishwakarma is a code factory: GitHub labels and `vs` commands start sandboxed coding
agents that implement issues and review pull requests in other repositories.

**Code factory**:
The whole system. It turns a GitHub issue into a reviewed draft pull request without a
human writing the code.
_Avoid_: pipeline, bot, automation

**Target repo**:
The repository an agent does work in. This repository is one of them.
_Avoid_: client repo, user repo, workspace

**Run**:
One agent execution against one target repo, from trigger to outcome. A run owns exactly
one sandbox.
_Avoid_: job, task, execution, session

**Sandbox**:
The isolated machine a run's agent works inside.
_Avoid_: container, VM, workspace, environment

**Operator**:
The person who runs Vishwakarma and owns its GitHub credentials.
_Avoid_: user, admin, owner

**v0 / v1 / v2**:
The release ladder. v0 is now: early, unstable, and for the operator alone. v1 is the same
system once it is stable enough to release. v2 adds features on top, including the web
client and configuration for other people's projects.

**Flue**:
The agent framework Vishwakarma is built on. It owns model calls, tools, sandboxes and
the GitHub channel. See `docs/research/flue-framework.md`.
