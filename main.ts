// Copies POST.json (the address of the X post) into the output directory,
// byte for byte. Validates it first: it must exist, be valid JSON, and carry
// a non-empty url field. Prints nothing on success.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./out";

let raw: Buffer;
try {
  raw = readFileSync("POST.json");
} catch {
  console.error("error: POST.json not found");
  process.exit(1);
}

let data: unknown;
try {
  data = JSON.parse(raw.toString("utf8"));
} catch {
  console.error("error: POST.json is not valid JSON");
  process.exit(1);
}

const url = (data as { url?: unknown } | null)?.url;
if (typeof url !== "string" || url.length === 0) {
  console.error("error: POST.json has no url field");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "POST.json"), raw);
