import { Command } from "commander";
import { LABEL_TRIGGERS, ensureLabelTriggers } from "../lib/labels.ts";

export function createSetupCommand(): Command {
  return new Command("setup")
    .description("Prepare the current repo by creating the label triggers")
    .action(async () => {
      await ensureLabelTriggers();
      for (const { name } of LABEL_TRIGGERS) console.log(name);
    });
}
