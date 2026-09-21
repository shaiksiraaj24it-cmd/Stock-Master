import { getDb } from "../db/connection.js";
import { notFound } from "../utils/httpError.js";
import { serializeStock } from "../utils/serializers.js";

const idsFor = (userId) =>
  getDb()
    .prepare("SELECT stock_id FROM watchlist WHERE user_id = ? ORDER BY created_at, stock_id")
    .all(userId)
    .map((r) => r.stock_id);

/** `watchlist` = array of stock ids (what the React app keeps in state); `stocks` = full objects. */
export function getWatchlist(userId) {
  const rows = getDb()
    .prepare(
      `SELECT s.* FROM watchlist w JOIN stocks s ON s.id = w.stock_id
       WHERE w.user_id = ? AND s.is_active = 1
       ORDER BY w.created_at, s.id`
    )
    .all(userId);
  return { watchlist: idsFor(userId), stocks: rows.map(serializeStock) };
}

/** Adds the stock if it isn't watched, removes it if it is (matches the ⭐ button). */
export function toggleWatchlist(userId, stockId) {
  const db = getDb();
  const watched = db.transaction(() => {
    if (!db.prepare("SELECT 1 FROM stocks WHERE id = ?").get(stockId)) {
      throw notFound("Stock not found.");
    }
    const removed = db
      .prepare("DELETE FROM watchlist WHERE user_id = ? AND stock_id = ?")
      .run(userId, stockId).changes;
    if (removed) return false;
    db.prepare("INSERT INTO watchlist (user_id, stock_id) VALUES (?, ?)").run(userId, stockId);
    return true;
  }).immediate();
  return { watched, watchlist: idsFor(userId) };
}

export function removeFromWatchlist(userId, stockId) {
  getDb()
    .prepare("DELETE FROM watchlist WHERE user_id = ? AND stock_id = ?")
    .run(userId, stockId);
  return { watched: false, watchlist: idsFor(userId) };
}
