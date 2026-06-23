#!/usr/bin/env -S deno run -A
import * as process from "node:process";
import { parseArgs } from "node:util";
import { parse } from "@std/xml";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
const parsedArgs = parseArgs({
  args: process.argv.slice(2),
  options: {
    help: { type: "boolean", short: "h" },
    input: { type: "string", short: "i" },
    output: { type: "string", short: "o" },
  },
});
if (parsedArgs.values.help) {
  console.log(`xml2json.ts

This does not read stdin or write to stdout because it's just a quick and dirty wrapper.

Options:
  --input <file>, -i <file>: Input XML file
  --output <file>, -o <file>: Write to this file`);
  process.exit(0);
}
const input = parsedArgs.values.input;
if (!input) throw new Error("Input must be specified");
if (!existsSync(input)) throw new Error("Input must exist");
const output = parsedArgs.values.output;
if (!output) throw new Error("Output must be specified");

const value = parse(readFileSync(input, { encoding: "utf-8" }));
writeFileSync(output, JSON.stringify(value, null, 2));
