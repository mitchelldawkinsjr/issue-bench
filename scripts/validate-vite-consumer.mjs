#!/usr/bin/env node
/**
 * Validates issue-bench scaffold on a simulated blank Vite+React consumer.
 * Full e2e (OpenAI + Cursor) requires API keys — this checks structure only.
 */
import { mkdtemp, rm, access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const tmp = await mkdtemp(join(tmpdir(), "issue-bench-vite-"));
try {
  execSync(
    `node packages/cli/bin/issue-bench.mjs init --yes --preset vite-react --name "Vite Test" --repo test/vite --dir "${tmp}"`,
    { cwd: ROOT, stdio: "pipe" }
  );

  const checks = [
    join(tmp, ".github/workflows/issue-spec.yml"),
    join(tmp, ".github/workflows/issue-implement.yml"),
    join(tmp, ".github/ai-spec-context.md"),
    join(tmp, ".github/ai-implement-context.md"),
    join(tmp, ".github/issue-bench.yml"),
    join(tmp, "package.json"),
  ];

  for (const path of checks) {
    await access(path);
  }

  const spec = await readFile(join(tmp, ".github/ai-spec-context.md"), "utf-8");
  const implement = await readFile(
    join(tmp, ".github/ai-implement-context.md"),
    "utf-8"
  );
  const pkg = JSON.parse(await readFile(join(tmp, "package.json"), "utf-8"));

  if (!spec.includes("Vite Test")) throw new Error("spec context missing project name");
  if (!implement.includes("npm run test:e2e")) throw new Error("implement missing test command");
  if (!pkg.dependencies?.["@issue-bench/dispatch"]) {
    throw new Error("package.json missing @issue-bench/dispatch");
  }

  console.log("validate-vite-consumer: structure checks passed");
} finally {
  await rm(tmp, { recursive: true, force: true });
}
