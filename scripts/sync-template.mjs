import { copyFile, readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function fill(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? "");
}

const vars = {
  PROJECT_NAME: "My App",
  REPO_SLUG: "owner/repo",
  STACK_SUMMARY: (
    await readFile(join(ROOT, "context/presets/vite-react.md"), "utf-8")
  ).trim(),
  BUILD_COMMAND: "npm run build",
  TEST_COMMAND: "npm run test:e2e",
  SCREENSHOT_DIR: "artifacts/issue-{N}/",
};

await mkdir(join(ROOT, "template/.github/workflows"), { recursive: true });

for (const file of ["issue-spec.yml", "issue-implement.yml"]) {
  await copyFile(
    join(ROOT, "workflows", file),
    join(ROOT, "template/.github/workflows", file)
  );
}

const specBase = await readFile(join(ROOT, "context/ai-spec.base.md"), "utf-8");
const implementBase = await readFile(
  join(ROOT, "context/ai-implement.base.md"),
  "utf-8"
);
const configTemplate = await readFile(
  join(ROOT, "template/.github/issue-bench.yml"),
  "utf-8"
);

await writeFile(
  join(ROOT, "template/.github/ai-spec-context.md"),
  fill(specBase, vars)
);
await writeFile(
  join(ROOT, "template/.github/ai-implement-context.md"),
  fill(implementBase, vars)
);
await writeFile(join(ROOT, "template/.github/issue-bench.yml"), fill(configTemplate, vars));

console.log("Synced template/ from workflows/ and context/");
