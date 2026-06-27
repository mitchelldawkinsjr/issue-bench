import test from "node:test";
import assert from "node:assert/strict";
import { writeFile, mkdir, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadConfig, DEFAULTS } from "./load-config.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURE = join(__dirname, ".tmp-config");

test("loadConfig returns defaults when file missing", async () => {
  const config = await loadConfig(join(FIXTURE, "missing.yml"));
  assert.equal(config.project.defaultBranch, DEFAULTS.project.defaultBranch);
  assert.match(config.prompt.postImplementReminders, /draft/i);
});

test("loadConfig parses project name and postImplementReminders", async () => {
  await mkdir(FIXTURE, { recursive: true });
  await writeFile(
    join(FIXTURE, "issue-bench.yml"),
    `project:
  name: "Test App"
  defaultBranch: develop
agent:
  model: composer-2.5
  startingRef: develop
prompt:
  postImplementReminders: |
    Custom reminder one.
    Custom reminder two.
`
  );
  const config = await loadConfig(join(FIXTURE, "issue-bench.yml"));
  assert.equal(config.project.name, "Test App");
  assert.equal(config.agent.startingRef, "develop");
  assert.match(config.prompt.postImplementReminders, /Custom reminder one/);
  await rm(FIXTURE, { recursive: true, force: true });
});
