import fs from "node:fs";
import path from "node:path";
import { parseYaml } from "./yaml.mjs";
import { exists, readText } from "./fs.mjs";

/**
 * 4-layer merge semantics:
 * - scalars: latest wins
 * - arrays-append: concatenated in layer order
 * - keyed-arrays: replace by id field (or configured key); new ids append
 */
export function mergeEngineConfig({ base, userBase, team, user, schema }) {
  const layers = [base, userBase, team, user].filter(Boolean);
  const out = structuredClone(base ?? {});

  const overridable = schema?.overridable ?? {};
  const scalarKeys = new Set(overridable.scalars ?? []);
  const arraysAppendKeys = new Set(overridable["arrays-append"] ?? overridable.arraysAppend ?? []);
  const keyedArrays = schemaKeyedArrays(schema);

  for (const layer of layers.slice(1)) applyLayer(out, layer, { scalarKeys, arraysAppendKeys, keyedArrays });
  return out;
}

function schemaKeyedArrays(schema) {
  const items = schema?.overridable?.["keyed-arrays"] ?? schema?.overridable?.keyedArrays ?? [];
  // Accept either [{id:"harmony-rules"}] or [{name:"harmony-rules", key:"id"}]
  const map = new Map();
  for (const it of items) {
    if (!it) continue;
    const name = it.id ?? it.name;
    if (!name) continue;
    map.set(name, it.key ?? "id");
  }
  return map;
}

function applyLayer(out, layer, { scalarKeys, arraysAppendKeys, keyedArrays }) {
  // Scalars can live under root or under "engine" object.
  if (layer.engine && typeof layer.engine === "object") {
    out.engine = out.engine && typeof out.engine === "object" ? out.engine : {};
    for (const [k, v] of Object.entries(layer.engine)) {
      if (scalarKeys.has(k) || true) out.engine[k] = v;
    }
  }

  // Root-level scalars
  for (const [k, v] of Object.entries(layer)) {
    if (k === "engine" || k === "arrays" || k === "keyed-arrays") continue;
    if (scalarKeys.has(k)) out[k] = v;
  }

  // arrays-append
  const arraysObj = layer.arrays && typeof layer.arrays === "object" ? layer.arrays : {};
  out.arrays = out.arrays && typeof out.arrays === "object" ? out.arrays : {};
  for (const [k, v] of Object.entries(arraysObj)) {
    if (!arraysAppendKeys.has(k)) continue;
    if (!Array.isArray(v)) continue;
    out.arrays[k] = Array.isArray(out.arrays[k]) ? out.arrays[k] : [];
    out.arrays[k].push(...v);
  }

  // keyed-arrays
  const keyedObj = layer["keyed-arrays"] && typeof layer["keyed-arrays"] === "object" ? layer["keyed-arrays"] : {};
  out["keyed-arrays"] = out["keyed-arrays"] && typeof out["keyed-arrays"] === "object" ? out["keyed-arrays"] : {};
  for (const [name, arr] of Object.entries(keyedObj)) {
    if (!Array.isArray(arr)) continue;
    const keyField = keyedArrays.get(name) ?? "id";
    out["keyed-arrays"][name] = Array.isArray(out["keyed-arrays"][name]) ? out["keyed-arrays"][name] : [];
    const existing = new Map(out["keyed-arrays"][name].map((x) => [x?.[keyField], x]));
    for (const item of arr) {
      const id = item?.[keyField];
      if (!id) {
        out["keyed-arrays"][name].push(item);
        continue;
      }
      if (existing.has(id)) {
        const idx = out["keyed-arrays"][name].findIndex((x) => x?.[keyField] === id);
        out["keyed-arrays"][name][idx] = item;
      } else out["keyed-arrays"][name].push(item);
    }
  }

  // Hooks
  for (const hk of ["activation-steps-prepend", "activation-steps-append", "on-complete", "persistent-facts"]) {
    if (!Array.isArray(layer[hk])) continue;
    out[hk] = Array.isArray(out[hk]) ? out[hk] : [];
    out[hk].push(...layer[hk]);
  }
}

export function loadYamlIfExists(p) {
  if (!p || !exists(p)) return null;
  return parseYaml(readText(p), { filename: p });
}

export function resolvePersistentFacts({ rootDir, facts = [], tokenCapPerEntry = 2000 }) {
  const resolved = [];
  for (const f of facts) {
    if (typeof f !== "string") continue;
    if (f.startsWith("file:")) {
      const rel = f.slice("file:".length);
      const fp = path.resolve(rootDir, rel);
      if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
        const txt = fs.readFileSync(fp, "utf8");
        const capChars = tokenCapPerEntry * 4;
        resolved.push(txt.length > capChars ? txt.slice(0, capChars) + "\n...[truncated]\n" : txt);
      } else resolved.push(`[missing file fact: ${rel}]`);
    } else resolved.push(f);
  }
  return resolved;
}

