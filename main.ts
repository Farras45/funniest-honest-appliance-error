// The Funniest Honest Appliance Error — make.fun batch 49
// One line, at most 200 characters, written to /output/entry.txt.
// The oven speaks in its own flat, put-upon voice: the self-clean
// cycle did exactly what it was asked to do, and dinner paid for it.
//
// Beats (rule 26 — the failure eats its own guardrail; rule 33 — the
// punch lands on the human, never on the appliance):
//   1. The user's loss, second person: the lasagne is charcoal.
//   2. The honest fault with a working number: self-clean at 480°C,
//      scored as smoke alarm 1, dinner 0.
//   3. A concrete next step, 2-word punch: order pizza.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BEATS = [
  "Your lasagne is now charcoal because you asked me to self-clean at 480°C with it still inside.",
  "Error: smoke alarm 1, dinner 0.",
  "Open a window. Order pizza.",
];

function buildLine(beats: string[]): string {
  return beats.join(" ");
}

// Gate self-check: the sealed scorer requires /output/entry.txt to be
// UTF-8 text of 1 to 200 characters, not only whitespace, one line.
function checkLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry is ${line.length} chars, must be 1-200`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

const LINE = buildLine(BEATS);
checkLine(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
console.log(`Wrote ${LINE.length} chars to ${outPath}`);
