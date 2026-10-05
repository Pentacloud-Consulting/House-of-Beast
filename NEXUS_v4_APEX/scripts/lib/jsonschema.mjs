import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true, strict: false });

export function validateJson({ schema, data }) {
  const validate = ajv.compile(schema);
  const ok = validate(data);
  return { ok: Boolean(ok), errors: validate.errors ?? [] };
}

