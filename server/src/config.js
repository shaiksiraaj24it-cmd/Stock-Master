import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverRoot = path.resolve(__dirname, "..");

const num = (value, fallback) => {
  const n = Number(value);
  return value !== undefined && value !== "" && Number.isFinite(n) ? n : fallback;
};

const bool = (value, fallback) =>
  value === undefined ? fallback : String(value).toLowerCase() === "true";

const env = process.env.NODE_ENV || "development";
const isProduction = env === "production";

let jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret || jwtSecret === "change-me-to-a-long-random-string") {
  if (isProduction) {
    throw new Error("JWT_SECRET must be set to a long random string in production.");
  }
  jwtSecret = "dev-only-insecure-secret";
  if (env !== "test") {
    console.warn("[config] JWT_SECRET not set - using an insecure development secret.");
  }
}

export const config = {
  env,
  isProduction,
  port: num(process.env.PORT, 4000),
  databasePath: path.resolve(
    serverRoot,
    process.env.DATABASE_PATH || "./data/stockmaster.db"
  ),
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
  startingBalance: num(process.env.STARTING_BALANCE, 100000),
  market: {
    tickSeconds: num(process.env.MARKET_TICK_SECONDS, 60),
    volatilityPct: num(process.env.MARKET_VOLATILITY_PCT, 2),
    alertThresholdPct: num(process.env.PRICE_ALERT_THRESHOLD_PCT, 1.8),
    cacheTtlSeconds: num(process.env.MARKET_CACHE_TTL_SECONDS, 30),
    allowManualTick: bool(process.env.ALLOW_MANUAL_TICK, !isProduction),
  },
};
