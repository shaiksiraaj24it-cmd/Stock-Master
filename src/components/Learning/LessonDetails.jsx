import React from "react";

function LessonDetails({
  lesson,
  module,
  videos = [],
  completedLessons = [],
  onComplete,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  onSelectLesson,
  onBack
}) {

  if (!lesson || !module) {
    return (
      <div className="page">
        <div className="common-card">

          <h2>Lesson not found</h2>

          <p>
            The selected lesson could not be loaded.
          </p>

          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ← Back to Modules
          </button>

        </div>
      </div>
    );
  }


  const isCompleted =
    completedLessons.includes(lesson.id);


  return (

    <div className="page lesson-details-page">

      {/* =========================
          BACK TO MODULES
      ========================= */}

      <button
        type="button"
        className="back-button"
        onClick={onBack}
      >
        ← Back to Modules
      </button>


      {/* =========================
          MODULE HEADER
      ========================= */}

      <div className="lesson-module-header">

        <div className="lesson-module-icon">
          {module.icon}
        </div>

        <div>

          <span className="section-label">
            MODULE {String(module.id).padStart(2, "0")}
          </span>

          <h1>
            {module.title}
          </h1>

          <p>
            {module.description}
          </p>

        </div>

      </div>


      {/* =========================
          LESSON LAYOUT
      ========================= */}

      <div className="lesson-layout">


        {/* =========================
            LESSON SIDEBAR
        ========================= */}

        <aside className="lesson-sidebar">

          <div className="lesson-sidebar-header">

            <span className="section-label">
              MODULE CONTENT
            </span>

            <h3>
              Lessons
            </h3>

          </div>


          <div className="lesson-list">

            {module.lessons.map(
              (moduleLesson, index) => {

                const completed =
                  completedLessons.includes(
                    moduleLesson.id
                  );

                const active =
                  moduleLesson.id ===
                  lesson.id;


                return (

                  <button
                    type="button"
                    key={moduleLesson.id}
                    className={
                      `lesson-list-item ${
                        active ? "active" : ""
                      }`
                    }
                    onClick={() =>
                      onSelectLesson(
                        moduleLesson
                      )
                    }
                  >

                    <span className="lesson-list-number">

                      {completed
                        ? "✓"
                        : index + 1}

                    </span>


                    <span className="lesson-list-content">

                      <strong>
                        {moduleLesson.title}
                      </strong>

                      <small>
                        ⏱️ {moduleLesson.duration}
                      </small>

                    </span>

                  </button>

                );

              }
            )}

          </div>

        </aside>


        {/* =========================
            MAIN LESSON
        ========================= */}

        <main className="lesson-content">


          {/* =========================
              LESSON TITLE
          ========================= */}

          <div className="lesson-heading">

            <span className="lesson-tag">
              {module.level}
            </span>

            <h2>
              {lesson.title}
            </h2>

            <div className="lesson-meta">

              <span>
                📖 Lesson
              </span>

              <span>
                ⏱️ {lesson.duration}
              </span>

              {isCompleted && (

                <span className="completed-badge">
                  ✓ Completed
                </span>

              )}

            </div>

          </div>


          {/* =========================
              INTRODUCTION
          ========================= */}

          {lesson.description && (

            <section className="lesson-section">

              <h3>
                📘 Introduction
              </h3>

              <p>
                {lesson.description}
              </p>

            </section>

          )}


          {/* =========================
              THEORY SECTIONS
          ========================= */}

          {Array.isArray(lesson.sections) &&
            lesson.sections.map(
              (section, index) => (

                <section
                  className="lesson-section"
                  key={index}
                >

                  {/* SECTION HEADING */}

                  {section.heading && (

                    <h3>
                      {section.heading}
                    </h3>

                  )}


                  {/* SECTION CONTENT */}

                  {section.content && (

                    <div className="lesson-text">

                      <p>
                        {section.content}
                      </p>

                    </div>

                  )}


                  {/* SECTION POINTS */}

                  {Array.isArray(
                    section.points
                  ) &&
                    section.points.length > 0 && (

                      <ul className="lesson-points">

                        {section.points.map(
                          (point, pointIndex) => (

                            <li
                              key={pointIndex}
                            >
                              {point}
                            </li>

                          )
                        )}

                      </ul>

                    )}

                </section>

              )
            )}


          {/* =========================
              KEY POINTS
          ========================= */}

          {Array.isArray(
            lesson.keyPoints
          ) &&
            lesson.keyPoints.length > 0 && (

              <section className="key-points-card">

                <h3>
                  ⭐ Key Points to Remember
                </h3>

                <ul>

                  {lesson.keyPoints.map(
                    (point, index) => (

                      <li key={index}>
                        {point}
                      </li>

                    )
                  )}

                </ul>

              </section>

            )}


          {/* =========================
              VIDEO RESOURCES
          ========================= */}

          {Array.isArray(videos) &&
            videos.length > 0 && (

              <section className="video-resources">

                <div className="section-title">

                  <div>

                    <span className="section-label">
                      VIDEO RESOURCES
                    </span>

                    <h2>
                      Learn Visually
                    </h2>

                    <p>
                      Watch these recommended
                      videos to reinforce what
                      you learned in this module.
                    </p>

                  </div>

                </div>


                <div className="video-grid">

                  {videos.map(
                    (video, index) => (

                      <div
                        className="video-card"
                        key={
                          video.id || index
                        }
                      >

                        <div className="video-icon">
                          ▶️
                        </div>


                        <div>

                          <h3>
                            {video.title ||
                              `Recommended Video ${index + 1}`}
                          </h3>


                          {video.description && (

                            <p>
                              {video.description}
                            </p>

                          )}


                          {(video.url ||
                            video.link) && (

                            <a
                              href={
                                video.url ||
                                video.link
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="watch-button"
                            >
                              Watch on YouTube →
                            </a>

                          )}

                        </div>

                      </div>

                    )
                  )}

                </div>

              </section>

            )}


          {/* =========================
              COMPLETE LESSON
          ========================= */}

          <div className="lesson-completion">

            {!isCompleted ? (

              <button
                type="button"
                className="primary-button"
                onClick={onComplete}
              >
                ✓ Mark Lesson as Complete
              </button>

            ) : (

              <div className="lesson-completed-message">
                ✓ You have completed this lesson.
              </div>

            )}

          </div>


          {/* =========================
              PREVIOUS / NEXT
          ========================= */}

          <div className="lesson-navigation">

            <button
              type="button"
              className="back-button"
              disabled={!hasPrevious}
              onClick={onPrevious}
            >
              ← Previous Lesson
            </button>


            <button
              type="button"
              className="primary-button"
              disabled={!hasNext}
              onClick={onNext}
            >
              Next Lesson →
            </button>

          </div>

        </main>

      </div>

    </div>

  );
}

export default LessonDetails;