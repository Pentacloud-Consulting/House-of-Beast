import path from "node:path";
import { listDirs, exists } from "./fs.mjs";

const SKIP_DIRS = new Set([".nexus", "scripts", "tests", "_style-reference", "nexus.custom"]);

export function discoverEngines({ rootDir }) {
  const engines = [];
  for (const name of listDirs(rootDir)) {
    if (SKIP_DIRS.has(name)) continue;
    const dir = path.join(rootDir, name);
    if (!exists(path.join(dir, "SKILL.md"))) continue;
    engines.push({ name, dir });
  }
  return engines.sort((a, b) => a.name.localeCompare(b.name));
}

