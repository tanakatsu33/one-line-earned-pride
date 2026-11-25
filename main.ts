/**
 * One Line of Earned Pride — make.fun entry program (harness program/v1).
 *
 * Writes a single-line entry to `entry.txt` inside the output directory
 * (`MAKEFUN_OUTPUT_DIR`, defaulting to `/output`), creating it if needed.
 *
 * Gate the output must pass:
 *   - UTF-8 encoded text
 *   - 1 to 240 characters (counted as Unicode code points)
 *   - not only whitespace
 *   - a single line: no newline characters, including no trailing newline
 *
 * The entry is validated before anything is written; any violation throws.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MIN_LENGTH = 1;
const MAX_LENGTH = 240;

const fragments: string[] = [
  "After three years relearning to write with his left hand,",
  "Mr. Alvarez signed his granddaughter's birthday card",
  "\u2014",
  "and this time the ink didn't shake.",
];

const entry: string = fragments.join(" ");

function validate(text: string): void {
  const length = Array.from(text).length;
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(
      `Entry length ${length} is outside the allowed range ${MIN_LENGTH}-${MAX_LENGTH}.`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("Entry must be a single line with no newline characters.");
  }
}

function main(): void {
  validate(entry);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), entry, { encoding: "utf8" });
}

main();
