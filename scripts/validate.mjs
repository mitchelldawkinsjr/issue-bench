import { access, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const required = [
  "workflows/issue-spec.yml",
  "workflows/issue-implement.yml",
  "packages/dispatch/dispatch-cursor-agent.mjs",
  "packages/dispatch/load-config.mjs",
  "packages/cli/bin/issue-bench.mjs",
  "context/ai-spec.base.md",
  "context/ai-implement.base.md",
  "template/.github/workflows/issue-spec.yml",
  "template/.github/workflows/issue-implement.yml",
  "template/.github/ai-spec-context.md",
  "template/.github/ai-implement-context.md",
  "template/package.json",
  "template/scripts/dispatch-cursor-agent.mjs",
  "template/scripts/load-config.mjs",
  "docs/LABELS.md",
  "docs/SETUP.md",
  "LICENSE",
];

let failed = false;

for (const rel of required) {
  try {
    await access(join(ROOT, rel));
    console.log(`ok ${rel}`);
  } catch {
    console.error(`missing ${rel}`);
    failed = true;
  }
}

const dispatch = await readFile(
  join(ROOT, "packages/dispatch/dispatch-cursor-agent.mjs"),
  "utf-8"
);
if (dispatch.includes("Bugbot + Ponytail run when")) {
  console.error("dispatch script still contains Fasted-specific Bugbot text");
  failed = true;
}

if (failed) process.exit(1);
console.log("validate: all checks passed");
