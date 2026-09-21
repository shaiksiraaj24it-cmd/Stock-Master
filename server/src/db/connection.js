import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { config } from "../config.js";

let db = null;

/** Opens (once) and returns the shared SQLite connection. */
export function getDb() {
  if (db) return db;

  const file = config.databasePath;
  if (file !== ":memory:") {
    fs.mkdirSync(path.dirname(file), { recursive: true });
  }

  db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.pragma("busy_timeout = 5000");
  return db;
}

export function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}
