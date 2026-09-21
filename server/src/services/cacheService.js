import { getDb } from "../db/connection.js";

/**
 * Tiny database-backed cache (the `market_cache` table).
 * Values are stored as JSON and ignored after they expire.
 */

export function cacheGet(key) {
  const row = getDb()
    .prepare("SELECT payload FROM market_cache WHERE cache_key = ? AND expires_at > ?")
    .get(key, new Date().toISOString());
  return row ? JSON.parse(row.payload) : undefined;
}

export function cacheSet(key, value, ttlSeconds) {
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
  getDb()
    .prepare(
      `INSERT INTO market_cache (cache_key, payload, expires_at)
       VALUES (?, ?, ?)
       ON CONFLICT(cache_key) DO UPDATE SET
         payload    = excluded.payload,
         expires_at = excluded.expires_at,
         created_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`
    )
    .run(key, JSON.stringify(value), expiresAt);
}

/** Returns the cached value, or computes it with `producer()` and caches it. */
export function getOrSet(key, ttlSeconds, producer) {
  const hit = cacheGet(key);
  if (hit !== undefined) return hit;
  const value = producer();
  cacheSet(key, value, ttlSeconds);
  return value;
}

/** Removes every entry whose key starts with `prefix` (default: everything). */
export function cacheInvalidate(prefix = "") {
  // Escape LIKE wildcards so the prefix is matched literally.
  const escaped = prefix.replace(/[\\%_]/g, "\\$&");
  getDb()
    .prepare("DELETE FROM market_cache WHERE cache_key LIKE ? ESCAPE '\\'")
    .run(`${escaped}%`);
}

/** Deletes expired rows so the table doesn't grow forever. */
export function purgeExpiredCache() {
  return getDb()
    .prepare("DELETE FROM market_cache WHERE expires_at <= ?")
    .run(new Date().toISOString()).changes;
}
