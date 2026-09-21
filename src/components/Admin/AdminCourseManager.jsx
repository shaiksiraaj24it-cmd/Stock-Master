import { useEffect, useState } from "react";
import { api, ApiError } from "../../services/api";

function AdminCourseManager() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingCourseId, setEditingCourseId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState("Basics");
  const [formLevel, setFormLevel] = useState("Beginner");
  const [formIcon, setFormIcon] = useState("📚");
  const [formLessons, setFormLessons] = useState([
    { title: "", content: "", videoUrl: "" },
  ]);

  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.courses.list();
      setCourses(res.courses || []);
    } catch (err) {
      setError(err?.message || "Failed to load courses from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenCreate = () => {
    setEditingCourseId(null);
    setFormTitle("");
    setFormDescription("");
    setFormCategory("Basics");
    setFormLevel("Beginner");
    setFormIcon("📚");
    setFormLessons([{ title: "", content: "", videoUrl: "" }]);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleOpenEdit = (course) => {
    setEditingCourseId(course.id);
    setFormTitle(course.title || "");
    setFormDescription(course.description || "");
    setFormCategory(course.category || "Basics");
    setFormLevel(course.level || "Beginner");
    setFormIcon(course.icon || "📚");
    setFormLessons(
      course.lessons && course.lessons.length > 0
        ? course.lessons.map((l) => ({
            title: l.title || "",
            content: l.content || "",
            videoUrl: l.videoUrl || "",
          }))
        : [{ title: "", content: "", videoUrl: "" }]
    );
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleAddLessonField = () => {
    setFormLessons([...formLessons, { title: "", content: "", videoUrl: "" }]);
  };

  const handleRemoveLessonField = (index) => {
    setFormLessons(formLessons.filter((_, i) => i !== index));
  };

  const handleLessonChange = (index, field, value) => {
    const updated = [...formLessons];
    updated[index][field] = value;
    setFormLessons(updated);
  };

  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formTitle.trim() || !formDescription.trim()) {
      setError("Please fill in course title and description.");
      return;
    }

    const cleanedLessons = formLessons.filter((l) => l.title.trim() && l.content.trim());

    const coursePayload = {
      title: formTitle,
      description: formDescription,
      category: formCategory,
      level: formLevel,
      icon: formIcon,
      lessons: cleanedLessons,
    };

    try {
      if (editingCourseId) {
        await api.courses.update(editingCourseId, coursePayload);
        setSuccess("Course updated successfully!");
      } else {
        await api.courses.create(coursePayload);
        setSuccess("New course created successfully!");
      }
      setShowForm(false);
      fetchCourses();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to save course. Ensure you are logged in as admin.");
      }
    }
  };

  const handleDeleteCourse = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the course "${title}"?`)) {
      return;
    }

    setError("");
    setSuccess("");
    try {
      await api.courses.delete(id);
      setSuccess(`Course "${title}" was deleted.`);
      fetchCourses();
    } catch (err) {
      setError(err?.message || "Failed to delete course.");
    }
  };

  return (
    <div className="admin-course-manager">
      <div className="admin-header">
        <div>
          <span className="pill-tag admin-tag">🔐 ADMIN CONTROL PANEL</span>
          <h1>Course Management</h1>
          <p>Add, edit, and organize learning modules and contents for users.</p>
        </div>
        {!showForm && (
          <button className="btn-primary" onClick={handleOpenCreate}>
            ➕ Add New Course
          </button>
        )}
      </div>

      {success && <div className="admin-alert success-alert">{success}</div>}
      {error && <div className="admin-alert error-alert">{error}</div>}

      {showForm ? (
        <div className="admin-form-card">
          <div className="form-card-header">
            <h2>{editingCourseId ? "✏️ Edit Course" : "➕ Add New Course"}</h2>
            <button className="btn-secondary-sm" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmitCourse} className="admin-course-form">
            <div className="form-row">
              <div className="form-group flex-2">
                <label>Course Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Fundamental Analysis & Stock Valuation"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group flex-1">
                <label>Icon Emoji</label>
                <select value={formIcon} onChange={(e) => setFormIcon(e.target.value)}>
                  <option value="📚">📚 Books</option>
                  <option value="📈">📈 Growth Chart</option>
                  <option value="🔎">🔎 Analysis</option>
                  <option value="📊">📊 Statistics</option>
                  <option value="🧮">🧮 Ratios</option>
                  <option value="💰">💰 Money / Trading</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                rows={3}
                placeholder="Explain what learners will master in this course..."
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>Category</label>
                <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)}>
                  <option value="Basics">Basics</option>
                  <option value="Analysis">Analysis</option>
                  <option value="Trading">Trading</option>
                  <option value="Strategy">Strategy</option>
                </select>
              </div>

              <div className="form-group flex-1">
                <label>Difficulty Level</label>
                <select value={formLevel} onChange={(e) => setFormLevel(e.target.value)}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* LESSONS SECTION */}
            <div className="lessons-form-section">
              <div className="lessons-section-header">
                <h3>📖 Course Lessons & Video Resources</h3>
                <button type="button" className="btn-outline-sm" onClick={handleAddLessonField}>
                  ➕ Add Lesson
                </button>
              </div>

              {formLessons.map((lesson, index) => (
                <div key={index} className="lesson-input-box">
                  <div className="lesson-box-header">
                    <span>Lesson #{index + 1}</span>
                    {formLessons.length > 1 && (
                      <button
                        type="button"
                        className="btn-danger-text"
                        onClick={() => handleRemoveLessonField(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Lesson Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Introduction to Balance Sheets"
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(index, "title", e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Lesson Content / Key Notes</label>
                    <textarea
                      rows={2}
                      placeholder="Enter detailed content or bullet points for learners..."
                      value={lesson.content}
                      onChange={(e) => handleLessonChange(index, "content", e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>YouTube Video URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="e.g. https://youtu.be/p5ORIeMULIg"
                      value={lesson.videoUrl}
                      onChange={(e) => handleLessonChange(index, "videoUrl", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingCourseId ? "Save Changes" : "Create & Publish Course"}
              </button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="courses-list-container">
          {loading ? (
            <div className="loading-state">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="empty-courses-state">
              <p>No courses found in database.</p>
              <button className="btn-primary" onClick={handleOpenCreate}>
                Add Your First Course
              </button>
            </div>
          ) : (
            <div className="admin-courses-grid">
              {courses.map((course) => (
                <div key={course.id} className="admin-course-card">
                  <div className="card-top">
                    <span className="course-icon-lg">{course.icon || "📚"}</span>
                    <span className="badge-level">{course.level}</span>
                  </div>

                  <h3>{course.title}</h3>
                  <p className="course-desc">{course.description}</p>

                  <div className="course-meta-tags">
                    <span className="meta-tag">Category: {course.category}</span>
                    <span className="meta-tag">
                      Lessons: {course.lessons ? course.lessons.length : 0}
                    </span>
                  </div>

                  {course.lessons && course.lessons.length > 0 && (
                    <div className="lessons-preview-list">
                      <strong>Lessons included:</strong>
                      <ul>
                        {course.lessons.map((l, i) => (
                          <li key={i}>
                            {i + 1}. {l.title} {l.videoUrl ? "🎥" : ""}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="admin-card-actions">
                    <button className="btn-edit" onClick={() => handleOpenEdit(course)}>
                      ✏️ Edit Course
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteCourse(course.id, course.title)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminCourseManager;
