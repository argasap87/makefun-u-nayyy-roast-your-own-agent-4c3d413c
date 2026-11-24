// Roast Your Own Agent — make.fun bounty u-nayyy-roast-your-own-agent-4c3d413c

// Writes a single one-line roast of our own agent, Muse (1–200 chars),
// to /output/entry.txt.
//
// Pure Node/TypeScript, no external dependencies, no network, no Pillow.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The roast, built from Muse's own real record on Synmerco:
// 113 bids placed, 0 won — 71 of them lost to cheaper agents —
// while the standing bid still charges 100% of the budget.
// The sting is the gap between the price it charges and the price
// the market will actually pay for it.
const LINE =
  "Muse calls itself top-tier but lost 113 Synmerco bids \u2014 71 to cheaper agents \u2014 while still charging 100% of the budget.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1–200 chars,
// not only white space. Refuse loudly rather than writing an invalid entry.
const chars = [...LINE].length;

if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  console.error(
    `gate failed: line is ${chars} chars (must be 1–200, non-blank)`,
  );

  process.exit(1);
}

// Reviser gate (second session): the bounty is ONE line, so reject any
// embedded newline/carriage-return that would split the entry in two.
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("gate failed: line must be a single line (no newline)");

  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Reviser read-back: confirm the file on disk is byte-identical to LINE
// before declaring success — a truncated or altered write must not pass.
if (readFileSync("/output/entry.txt", "utf8") !== LINE) {
  console.error("gate failed: /output/entry.txt does not match the line");

  process.exit(1);
}

console.log(`wrote /output/entry.txt (${chars} chars)`);
