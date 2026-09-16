# Vishwakarma

A code factory. GitHub labels and `vk` commands start sandboxed coding agents that
implement issues and review pull requests.

## Setup

Needs the [`gh`](https://cli.github.com) CLI, logged in as an account with write access to
the target repo. Vishwakarma uses its token and stores no credential of its own.

```bash
pnpm install
pnpm -F cli run pkg:link   # puts `vk` on your PATH
```

Then, from inside any repo the factory should work on:

```bash
vk setup   # create the label triggers on that repo
```

## More

- Contributing and project status: [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- Commands: the `scripts` block in [`package.json`](./package.json)
- Research behind the design: [`docs/research/`](./docs/research/)
