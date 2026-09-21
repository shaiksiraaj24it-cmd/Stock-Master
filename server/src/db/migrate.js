import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { getDb, closeDb } from "./connection.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Creates any missing tables/indexes. Idempotent. */
export function migrate(db = getDb()) {
  const sql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
  db.exec(sql);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  migrate();
  console.log("Database schema is up to date.");
  closeDb();
}
