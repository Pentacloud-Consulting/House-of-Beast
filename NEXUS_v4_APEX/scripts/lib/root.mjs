import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** NEXUS_v4_APEX/ (parent of scripts/) */
export const ROOT = path.resolve(__dirname, "..", "..");
