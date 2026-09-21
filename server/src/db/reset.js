import fs from "node:fs";
import { config } from "../config.js";
import { getDb, closeDb } from "./connection.js";
import { migrate } from "./migrate.js";
import { seedStocks } from "./seed.js";

/** DELETES the database file and rebuilds it from scratch. Development only. */
if (config.isProduction) {
  console.error("Refusing to reset the database in production.");
  process.exit(1);
}

closeDb();
for (const suffix of ["", "-wal", "-shm"]) {
  fs.rmSync(config.databasePath + suffix, { force: true });
}

const db = getDb();
migrate(db);
console.log(`Database recreated. Seeded ${seedStocks(db)} stocks.`);
closeDb();
