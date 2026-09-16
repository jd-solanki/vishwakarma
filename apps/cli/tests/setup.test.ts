import { expect, test } from "vite-plus/test";
import { LABEL_TRIGGERS, labelArgs } from "../src/lib/labels.ts";

test("the label triggers, and the gh argv that creates one", () => {
  expect(LABEL_TRIGGERS.map((trigger) => trigger.name)).toEqual([
    "agent:implement",
    "agent:review",
  ]);

  const [implement] = LABEL_TRIGGERS;
  expect(labelArgs(implement)).toEqual([
    "label",
    "create",
    "agent:implement",
    "--color",
    implement.color,
    "--description",
    implement.description,
    "--force",
  ]);
});
