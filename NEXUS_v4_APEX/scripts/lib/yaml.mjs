import YAML from "yaml";

export function parseYaml(text, { filename = "<yaml>" } = {}) {
  const doc = YAML.parseDocument(text, { prettyErrors: true });
  if (doc.errors?.length) {
    const msg = doc.errors.map((e) => String(e)).join("\n");
    const err = new Error(`YAML parse error in ${filename}\n${msg}`);
    err.cause = doc.errors;
    throw err;
  }
  return doc.toJS();
}

export function stringifyYaml(obj) {
  return YAML.stringify(obj, { indent: 2 });
}

