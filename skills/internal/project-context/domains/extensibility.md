# Extensibility

load-when: the config schema, hooks, events, plugins, modules

confidence: exploratory — the hook, event and module shape is still a guess.

## Words

**Hook**: a named point where behaviour can be replaced or observed.

**Module**: a unit that registers hooks and config together. Not built.

## Rules

- Name and place the hook points now. Do not build a plugin or module loader until a
  second consumer exists.
- Any workflow difference between two projects is expressed in config, never in a fork of
  the code.
- Config is JSON or TypeScript.
- No workflow engine and no durability layer. Run orchestration is plain code this project
  owns.

## Reasons

- **Hook points are architecture; a registry is machinery.** Where behaviour bends is a
  long-term decision and is decided now. The loader that discovers and orders plugins is
  the part that only pays off with more than one consumer.
- **Flue's own extension model is plain function composition, explicitly not a plugin
  registry.** A Nuxt-style registry is a layer Flue does not provide and cannot maintain
  for us. `docs/research/flue-framework.md`
- **Being generic for other people is v2.** Until a second project uses this, our own
  workflow is the only consumer, and one consumer cannot show where a seam belongs.

## Fences

- **Flue's v2 deleted its general Workflows system** and pushed orchestration back into the
  app. Code written against a Flue-owned workflow or durability layer has nothing to sit on,
  and a large framework-shaped layer here is Vishwakarma's to maintain forever.
  `docs/research/flue-framework.md`

## Where it lives

Not built. Background: `docs/research/flue-framework.md`.
