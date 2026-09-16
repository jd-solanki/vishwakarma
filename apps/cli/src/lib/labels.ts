import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

/**
 * The label triggers. Labels are the state machine, so every command that reads or
 * writes one reads its name from here.
 *
 * Colors are pinned because `gh label create` picks a random one when none is given,
 * and `--force` would then repaint the label on every setup.
 */
export const LABEL_TRIGGERS = [
  {
    name: "agent:implement",
    color: "0E8A16",
    description: "Vishwakarma implements this issue and opens a draft pull request",
  },
  {
    name: "agent:review",
    color: "5319E7",
    description: "Vishwakarma reviews this pull request",
  },
] as const;

type LabelTrigger = (typeof LABEL_TRIGGERS)[number];

/**
 * The `gh` arguments that create one label trigger, or update it if it already exists.
 *
 * No `--repo`: `gh` reads the target repo from the git remote of the directory it runs
 * in, which is the same repo the operator is looking at.
 */
export function labelArgs(trigger: LabelTrigger): string[] {
  return [
    "label",
    "create",
    trigger.name,
    "--color",
    trigger.color,
    "--description",
    trigger.description,
    "--force",
  ];
}

/** Creates every label trigger on the current repo. Safe to re-run. */
export async function ensureLabelTriggers(): Promise<void> {
  for (const trigger of LABEL_TRIGGERS) await run("gh", labelArgs(trigger));
}
