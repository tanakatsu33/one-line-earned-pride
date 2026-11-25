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
}

function main(): void {
  validate(entry);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), entry, { encoding: "utf8" });
}

main();
