import { getDb } from "../db/connection.js";
import { round2 } from "../utils/money.js";
import { notify } from "./notificationService.js";

const serializeAttempt = (r) => ({
  id: r.id,
  moduleId: r.module_id,
  score: r.score,
  total: r.total,
  percentage: round2((r.score / r.total) * 100),
  createdAt: r.created_at,
});

/**
 * `completedLessons` is an array of lesson ids - the same shape the frontend
 * currently stores in localStorage under "stockmaster_completed_lessons".
 */
export function getProgress(userId) {
  const db = getDb();

  const completedLessons = db
    .prepare("SELECT lesson_id FROM lesson_progress WHERE user_id = ? ORDER BY completed_at, lesson_id")
    .all(userId)
    .map((r) => r.lesson_id);

  const attempts = db
    .prepare("SELECT * FROM quiz_attempts WHERE user_id = ? ORDER BY created_at DESC, id DESC LIMIT 20")
    .all(userId)
    .map(serializeAttempt);

  const stats = db
    .prepare(
      `SELECT COUNT(*) AS attempts,
              COALESCE(MAX(100.0 * score / total), 0) AS best,
              COALESCE(AVG(100.0 * score / total), 0) AS average
       FROM quiz_attempts WHERE user_id = ?`
    )
    .get(userId);

  return {
    completedLessons,
    quiz: {
      attempts: stats.attempts,
      bestPercentage: round2(stats.best),
      averagePercentage: round2(stats.average),
      recentAttempts: attempts,
    },
  };
}

export function completeLesson(userId, lessonId) {
  const db = getDb();
  const inserted =
    db
      .prepare("INSERT OR IGNORE INTO lesson_progress (user_id, lesson_id) VALUES (?, ?)")
      .run(userId, lessonId).changes === 1;

  if (inserted) {
    notify({
      userId,
      type: "LEARNING",
      title: "Lesson completed ✓",
      message: `You completed lesson ${lessonId}. Keep going!`,
    });
  }
  return { alreadyCompleted: !inserted, ...getProgress(userId) };
}

export function recordQuizAttempt(userId, { moduleId = null, score, total }) {
  const db = getDb();
  const { lastInsertRowid } = db
    .prepare("INSERT INTO quiz_attempts (user_id, module_id, score, total) VALUES (?, ?, ?, ?)")
    .run(userId, moduleId, score, total);

  notify({
    userId,
    type: "LEARNING",
    title: "Quiz finished 🧠",
    message: `You scored ${score} out of ${total} (${round2((score / total) * 100)}%).`,
  });

  const row = db.prepare("SELECT * FROM quiz_attempts WHERE id = ?").get(lastInsertRowid);
  return { attempt: serializeAttempt(row), ...getProgress(userId) };
}

export function listQuizAttempts(userId, { moduleId, limit = 50 } = {}) {
  return getDb()
    .prepare(
      `SELECT * FROM quiz_attempts
       WHERE user_id = ? AND (? IS NULL OR module_id = ?)
       ORDER BY created_at DESC, id DESC LIMIT ?`
    )
    .all(userId, moduleId ?? null, moduleId ?? null, limit)
    .map(serializeAttempt);
}
