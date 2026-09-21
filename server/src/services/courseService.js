import { getDb } from "../db/connection.js";
import { notFound } from "../utils/httpError.js";

export function listCourses() {
  const db = getDb();
  const courses = db.prepare("SELECT * FROM courses ORDER BY id ASC").all();
  const lessons = db.prepare("SELECT * FROM course_lessons ORDER BY order_index ASC, id ASC").all();

  const lessonsByCourse = {};
  for (const lesson of lessons) {
    if (!lessonsByCourse[lesson.course_id]) {
      lessonsByCourse[lesson.course_id] = [];
    }
    lessonsByCourse[lesson.course_id].push({
      id: lesson.id,
      courseId: lesson.course_id,
      title: lesson.title,
      content: lesson.content,
      videoUrl: lesson.video_url,
      orderIndex: lesson.order_index,
      createdAt: lesson.created_at,
    });
  }

  return courses.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    category: course.category,
    level: course.level,
    icon: course.icon,
    createdAt: course.created_at,
    updatedAt: course.updated_at,
    lessons: lessonsByCourse[course.id] || [],
  }));
}

export function getCourse(id) {
  const db = getDb();
  const course = db.prepare("SELECT * FROM courses WHERE id = ?").get(id);
  if (!course) throw notFound("Course not found.");

  const lessons = db
    .prepare("SELECT * FROM course_lessons WHERE course_id = ? ORDER BY order_index ASC, id ASC")
    .all(id)
    .map((l) => ({
      id: l.id,
      courseId: l.course_id,
      title: l.title,
      content: l.content,
      videoUrl: l.video_url,
      orderIndex: l.order_index,
      createdAt: l.created_at,
    }));

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    category: course.category,
    level: course.level,
    icon: course.icon,
    createdAt: course.created_at,
    updatedAt: course.updated_at,
    lessons,
  };
}

export function createCourse({ title, description, category, level, icon, lessons = [] }) {
  const db = getDb();
  const insertCourse = db.prepare(`
    INSERT INTO courses (title, description, category, level, icon)
    VALUES (?, ?, ?, ?, ?)
  `);
  const insertLesson = db.prepare(`
    INSERT INTO course_lessons (course_id, title, content, video_url, order_index)
    VALUES (?, ?, ?, ?, ?)
  `);

  let courseId;
  const run = db.transaction(() => {
    const res = insertCourse.run(
      title,
      description,
      category || "General",
      level || "Beginner",
      icon || "📚"
    );
    courseId = Number(res.lastInsertRowid);

    lessons.forEach((l, idx) => {
      insertLesson.run(courseId, l.title, l.content, l.videoUrl || null, l.orderIndex || idx + 1);
    });
  });

  run();
  return getCourse(courseId);
}

export function updateCourse(id, { title, description, category, level, icon, lessons }) {
  const db = getDb();
  const existing = db.prepare("SELECT * FROM courses WHERE id = ?").get(id);
  if (!existing) throw notFound("Course not found.");

  const run = db.transaction(() => {
    db.prepare(`
      UPDATE courses
      SET title = ?, description = ?, category = ?, level = ?, icon = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
      WHERE id = ?
    `).run(
      title ?? existing.title,
      description ?? existing.description,
      category ?? existing.category,
      level ?? existing.level,
      icon ?? existing.icon,
      id
    );

    if (Array.isArray(lessons)) {
      db.prepare("DELETE FROM course_lessons WHERE course_id = ?").run(id);
      const insertLesson = db.prepare(`
        INSERT INTO course_lessons (course_id, title, content, video_url, order_index)
        VALUES (?, ?, ?, ?, ?)
      `);
      lessons.forEach((l, idx) => {
        insertLesson.run(id, l.title, l.content, l.videoUrl || null, l.orderIndex || idx + 1);
      });
    }
  });

  run();
  return getCourse(id);
}

export function deleteCourse(id) {
  const db = getDb();
  const existing = db.prepare("SELECT * FROM courses WHERE id = ?").get(id);
  if (!existing) throw notFound("Course not found.");

  db.prepare("DELETE FROM courses WHERE id = ?").run(id);
  return { success: true, message: "Course deleted." };
}
