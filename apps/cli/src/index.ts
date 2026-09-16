#!/usr/bin/env node
import { Command } from "commander";
import packageJson from "../package.json" with { type: "json" };
import { createSetupCommand } from "./commands/setup.ts";

const program = new Command("vk")
  .description("Vishwakarma: turn a GitHub issue into a reviewed draft pull request")
  .version(packageJson.version);

program.addCommand(createSetupCommand());

try {
  await program.parseAsync();
} catch (error) {
  // Only a failed `gh` loses its stack. `gh` already writes a usable diagnosis to stderr
  // for a bad login or a bad repo, and a Node stack on top of it buries the message; a
  // missing `gh` never gets one at all. Every other error keeps its stack to stay
  // debuggable, so match on the command line execFile attaches rather than on its shape:
  // the next subprocess this CLI spawns must not inherit an "install gh" message.
  const failure = error as {
    cmd?: string;
    code?: unknown;
    stderr?: string;
    message?: string;
  } | null;
  if (!failure?.cmd?.startsWith("gh ")) throw error;

  const missingGh = "vk needs the GitHub CLI. Install `gh`, then run `gh auth login`.";
  const reason = failure.code === "ENOENT" ? missingGh : failure.stderr || failure.message;
  process.stderr.write(`${(reason ?? "").trim()}\n`);
  process.exit(1);
}
