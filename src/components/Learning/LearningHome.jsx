import { useEffect, useState } from "react";

import LessonCard from "./LessonCard";
import LessonDetails from "./LessonDetails";
import ProgressBar from "./ProgressBar";

import { modules } from "../../data/lessons";
import { videos } from "../../data/videos";
import { api } from "../../services/api";

function LearningHome({ onNavigate }) {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [dbCourses, setDbCourses] = useState([]);
  const [selectedDbCourse, setSelectedDbCourse] = useState(null);
  const [selectedDbLesson, setSelectedDbLesson] = useState(null);

  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem("stockmaster_completed_lessons");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    async function fetchAdminCourses() {
      try {
        const res = await api.courses.list();
        setDbCourses(res.courses || []);
      } catch {
        // Ignore if backend isn't reachable
      }
    }
    fetchAdminCourses();
  }, []);

  /* =========================
     COMPLETE LESSON
  ========================= */

  const handleCompleteLesson = (lessonId) => {
    setCompletedLessons((current) => {
      if (current.includes(lessonId)) {
        return current;
      }
      const updated = [...current, lessonId];
      localStorage.setItem("stockmaster_completed_lessons", JSON.stringify(updated));
      return updated;
    });
  };

  /* =========================
     OPEN MODULE
  ========================= */

  const handleOpenModule = (module) => {
    setSelectedDbCourse(null);
    setSelectedDbLesson(null);
    setSelectedModule(module);
    setSelectedLesson(module.lessons[0] || null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     OPEN DB COURSE
  ========================= */

  const handleOpenDbCourse = (course) => {
    setSelectedModule(null);
    setSelectedLesson(null);
    setSelectedDbCourse(course);
    setSelectedDbLesson(course.lessons && course.lessons[0] ? course.lessons[0] : null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     BACK TO MODULES
  ========================= */

  const handleBackToModules = () => {
    setSelectedModule(null);
    setSelectedLesson(null);
    setSelectedDbCourse(null);
    setSelectedDbLesson(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     NEXT LESSON
  ========================= */

  const handleNextLesson = () => {
    if (!selectedModule || !selectedLesson) {
      return;
    }

    const currentIndex = selectedModule.lessons.findIndex(
      (lesson) => lesson.id === selectedLesson.id
    );

    const nextLesson = selectedModule.lessons[currentIndex + 1];

    if (nextLesson) {
      setSelectedLesson(nextLesson);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      handleCompleteLesson(selectedLesson.id);
    }
  };

  /* =========================
     PREVIOUS LESSON
  ========================= */

  const handlePreviousLesson = () => {
    if (!selectedModule || !selectedLesson) {
      return;
    }

    const currentIndex = selectedModule.lessons.findIndex(
      (lesson) => lesson.id === selectedLesson.id
    );

    const previousLesson = selectedModule.lessons[currentIndex - 1];

    if (previousLesson) {
      setSelectedLesson(previousLesson);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  /* =========================
     MODULE PROGRESS
  ========================= */

  const getModuleProgress = (module) => {
    if (!module.lessons.length) {
      return 0;
    }

    const completed = module.lessons.filter((lesson) =>
      completedLessons.includes(lesson.id)
    ).length;

    return Math.round((completed / module.lessons.length) * 100);
  };

  /* =========================
     TOTAL PROGRESS
  ========================= */

  const allLessons = modules.flatMap((module) => module.lessons);

  const overallProgress =
    allLessons.length === 0
      ? 0
      : Math.round((completedLessons.length / allLessons.length) * 100);

  /* =========================
     ADMIN DB COURSE VIEW
  ========================= */

  if (selectedDbCourse) {
    return (
      <div className="page">
        <button
          className="secondary-button"
          onClick={handleBackToModules}
          style={{ marginBottom: "24px" }}
        >
          ← Back to All Courses
        </button>

        <div className="db-course-viewer">
          <div className="db-course-header">
            <span className="course-icon-xl">{selectedDbCourse.icon || "📚"}</span>
            <div>
              <span className="pill-tag">{selectedDbCourse.category || "General"}</span>
              <h2>{selectedDbCourse.title}</h2>
              <p>{selectedDbCourse.description}</p>
            </div>
          </div>

          <div className="db-course-body">
            <div className="lessons-sidebar">
              <h3>Course Lessons ({selectedDbCourse.lessons ? selectedDbCourse.lessons.length : 0})</h3>
              <div className="lessons-list">
                {selectedDbCourse.lessons && selectedDbCourse.lessons.length > 0 ? (
                  selectedDbCourse.lessons.map((lesson, index) => (
                    <button
                      key={lesson.id || index}
                      className={`lesson-item-btn ${
                        selectedDbLesson?.id === lesson.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedDbLesson(lesson)}
                    >
                      <span className="lesson-num">{index + 1}</span>
                      <span className="lesson-title">{lesson.title}</span>
                    </button>
                  ))
                ) : (
                  <p className="no-lessons-text">No lessons added for this course yet.</p>
                )}
              </div>
            </div>

            <div className="lesson-content-main">
              {selectedDbLesson ? (
                <div className="lesson-detail-card">
                  <h3>{selectedDbLesson.title}</h3>
                  <div className="lesson-body-text">{selectedDbLesson.content}</div>

                  {selectedDbLesson.videoUrl && (
                    <div className="video-embed-box">
                      <h4>🎥 Video Resource</h4>
                      <p>Enhance your learning with this video lesson:</p>
                      <a
                        href={selectedDbLesson.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary-sm"
                      >
                        Watch Video Tutorial ↗
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="lesson-detail-card">
                  <p>Select a lesson from the left sidebar to start reading contents.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     STATIC MODULE LESSON VIEW
  ========================= */

  if (selectedModule && selectedLesson) {
    const currentIndex = selectedModule.lessons.findIndex(
      (lesson) => lesson.id === selectedLesson.id
    );

    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < selectedModule.lessons.length - 1;

    const moduleVideos = videos.filter((video) => video.moduleId === selectedModule.id);

    return (
      <div className="page">
        <button
          className="secondary-button"
          onClick={handleBackToModules}
          style={{ marginBottom: "24px" }}
        >
          ← Back to Modules
        </button>

        <LessonDetails
          lesson={selectedLesson}
          module={selectedModule}
          videos={moduleVideos}
          completedLessons={completedLessons}
          onComplete={() => handleCompleteLesson(selectedLesson.id)}
          onNext={handleNextLesson}
          onPrevious={handlePreviousLesson}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onSelectLesson={handleOpenLesson}
        />
      </div>
    );
  }

  /* =========================
     MODULE VIEW
  ========================= */

  return (
    <div className="page">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <span className="hero-label">📚 STOCKMASTER LEARNING</span>

          <h1>Learn the Stock Market</h1>

          <p>
            Start from zero and gradually learn how stocks, trading, analysis, financial ratios and
            investing work.
          </p>
        </div>
      </div>

      {/* ADMIN-CREATED COURSES SECTION */}
      {dbCourses.length > 0 && (
        <section className="content-section admin-courses-section">
          <div className="section-title">
            <div>
              <span className="section-label">👑 ADMIN CURATED COURSES</span>
              <h2>Courses Added by Admin</h2>
              <p>Explore structured courses and educational content published by administrators.</p>
            </div>
          </div>

          <div className="module-grid">
            {dbCourses.map((course) => (
              <div key={course.id} className="module-card db-course-card" onClick={() => handleOpenDbCourse(course)}>
                <div className="module-number">COURSE</div>
                <div className="module-icon">{course.icon || "📚"}</div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button className="module-button" onClick={() => handleOpenDbCourse(course)}>
                  View Contents ({course.lessons ? course.lessons.length : 0} Lessons) →
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* OVERALL PROGRESS */}

      <section className="content-section">
        <div className="section-title">
          <div>
            <h2>Your Learning Progress</h2>

            <p>Complete lessons and track your progress through StockMaster.</p>
          </div>

          <strong>{overallProgress}% Complete</strong>
        </div>

        <ProgressBar progress={overallProgress} />
      </section>

      {/* MODULES */}

      <section className="content-section">
        <div className="section-title">
          <div>
            <h2>Core Learning Modules</h2>

            <p>Follow the modules in order, or explore any topic you want.</p>
          </div>
        </div>

        <div className="module-grid">
          {modules.map((module) => {
            const progress = getModuleProgress(module);

            return (
              <LessonCard
                key={module.id}
                module={module}
                progress={progress}
                completedLessons={completedLessons}
                onClick={() => handleOpenModule(module)}
                onOpen={() => handleOpenModule(module)}
              />
            );
          })}
        </div>
      </section>

      {/* LEARNING PATH */}

      <section className="content-section">
        <div className="practice-info">
          <div>
            <h2>🎯 Your Learning Path</h2>

            <p>
              Learn the fundamentals first, then move into trading, analysis, financial ratios, risk
              management and advanced concepts.
            </p>
          </div>

          <button className="primary-button" onClick={() => handleOpenModule(modules[0])}>
            Start from Beginning →
          </button>
        </div>
      </section>
    </div>
  );
}

export default LearningHome;
