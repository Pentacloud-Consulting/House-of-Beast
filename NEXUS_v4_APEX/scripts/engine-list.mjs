#!/usr/bin/env node
import process from "node:process";
import { discoverEngines } from "./lib/engine-discovery.mjs";
import { ROOT } from "./lib/root.mjs";

for (const e of discoverEngines({ rootDir: ROOT })) {
  process.stdout.write(e.name + "\n");
}
