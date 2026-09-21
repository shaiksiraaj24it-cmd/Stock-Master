import { config } from "./config.js";
import { createApp } from "./app.js";
import { getDb, closeDb } from "./db/connection.js";
import { migrate } from "./db/migrate.js";
import { seedStocks } from "./db/seed.js";
import { purgeExpiredCache } from "./services/cacheService.js";
import { startMarketTicker, stopMarketTicker } from "./services/marketService.js";

const db = getDb();
migrate(db);
const seeded = seedStocks(db);
if (seeded) console.log(`[db] Seeded ${seeded} starter stocks.`);
purgeExpiredCache();

const app = createApp();
const server = app.listen(config.port, () => {
  console.log(`[server] StockMaster API running at http://localhost:${config.port}`);
  console.log(`[server] Database: ${config.databasePath}`);
  if (startMarketTicker()) {
    console.log(`[market] Prices move every ${config.market.tickSeconds}s.`);
  } else {
    console.log("[market] Automatic price movement is off (POST /api/market/tick to move prices).");
  }
});

function shutdown(signal) {
  console.log(`\n[server] ${signal} received, shutting down...`);
  stopMarketTicker();
  server.close(() => {
    closeDb();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 5000).unref();
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
