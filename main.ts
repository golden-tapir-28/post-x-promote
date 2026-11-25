import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// POST.json dicari di MAKEFUN_BOT_DIR dulu, lalu di direktori main.ts ini.
const botDir =
  process.env.MAKEFUN_BOT_DIR || dirname(fileURLToPath(import.meta.url)) || ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "./out";

try {
  const raw = readFileSync(join(botDir, "POST.json"));
  const data = JSON.parse(raw.toString("utf8"));
  if (typeof data.url !== "string" || data.url.length === 0) {
    throw new Error("POST.json: field 'url' must be a non-empty string");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "POST.json"), raw);
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
