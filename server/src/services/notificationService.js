import { getDb } from "../db/connection.js";
import { serializeNotification } from "../utils/serializers.js";
import { notFound } from "../utils/httpError.js";

/** Adds one notification. Pass `db` to run inside an existing transaction. */
export function notify({ userId, type, title, message, stockId = null }, db = getDb()) {
  db.prepare(
    `INSERT INTO notifications (user_id, stock_id, type, title, message)
     VALUES (?, ?, ?, ?, ?)`
  ).run(userId, stockId, type, title, message);
}

export function listNotifications(userId, { unreadOnly = false, limit = 30 } = {}) {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT * FROM notifications
       WHERE user_id = ? AND (? = 0 OR is_read = 0)
       ORDER BY created_at DESC, id DESC
       LIMIT ?`
    )
    .all(userId, unreadOnly ? 1 : 0, limit);

  const { n } = db
    .prepare("SELECT COUNT(*) AS n FROM notifications WHERE user_id = ? AND is_read = 0")
    .get(userId);

  return { unreadCount: n, notifications: rows.map(serializeNotification) };
}

export function markRead(userId, notificationId) {
  const { changes } = getDb()
    .prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?")
    .run(notificationId, userId);
  if (changes === 0) throw notFound("Notification not found.");
}

export function markAllRead(userId) {
  return getDb()
    .prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0")
    .run(userId).changes;
}
