import { useState } from "react";

import LessonCard from "./LessonCard";
import LessonDetails from "./LessonDetails";
import ProgressBar from "./ProgressBar";

import { modules } from "../../data/lessons";
import { videos } from "../../data/videos";

function LearningHome({ onNavigate }) {

  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [completedLessons, setCompletedLessons] = useState(() => {

    const saved =
      localStorage.getItem("stockmaster_completed_lessons");

    return saved ? JSON.parse(saved) : [];
  });


  /* =========================
     COMPLETE LESSON
  ========================= */

  const handleCompleteLesson = (lessonId) => {

    setCompletedLessons((current) => {

      if (current.includes(lessonId)) {
        return current;
      }

      const updated = [
        ...current,
        lessonId
      ];

      localStorage.setItem(
        "stockmaster_completed_lessons",
        JSON.stringify(updated)
      );

      return updated;
    });
  };


  /* =========================
     OPEN MODULE
  ========================= */

  const handleOpenModule = (module) => {

    setSelectedModule(module);

    setSelectedLesson(
      module.lessons[0] || null
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  /* =========================
     OPEN LESSON
  ========================= */

  const handleOpenLesson = (lesson) => {

    setSelectedLesson(lesson);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  /* =========================
     BACK TO MODULES
  ========================= */

  const handleBackToModules = () => {

    setSelectedModule(null);
    setSelectedLesson(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  /* =========================
     NEXT LESSON
  ========================= */

  const handleNextLesson = () => {

    if (!selectedModule || !selectedLesson) {
      return;
    }

    const currentIndex =
      selectedModule.lessons.findIndex(
        (lesson) =>
          lesson.id === selectedLesson.id
      );

    const nextLesson =
      selectedModule.lessons[
        currentIndex + 1
      ];

    if (nextLesson) {

      setSelectedLesson(nextLesson);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    } else {

      handleCompleteLesson(
        selectedLesson.id
      );

    }
  };


  /* =========================
     PREVIOUS LESSON
  ========================= */

  const handlePreviousLesson = () => {

    if (!selectedModule || !selectedLesson) {
      return;
    }

    const currentIndex =
      selectedModule.lessons.findIndex(
        (lesson) =>
          lesson.id === selectedLesson.id
      );

    const previousLesson =
      selectedModule.lessons[
        currentIndex - 1
      ];

    if (previousLesson) {

      setSelectedLesson(previousLesson);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
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

    const completed =
      module.lessons.filter(
        (lesson) =>
          completedLessons.includes(
            lesson.id
          )
      ).length;

    return Math.round(
      (completed / module.lessons.length) *
        100
    );
  };


  /* =========================
     TOTAL PROGRESS
  ========================= */

  const allLessons =
    modules.flatMap(
      (module) => module.lessons
    );

  const overallProgress =
    allLessons.length === 0
      ? 0
      : Math.round(
          (completedLessons.length /
            allLessons.length) *
            100
        );


  /* =========================
     LESSON VIEW
  ========================= */

  if (
    selectedModule &&
    selectedLesson
  ) {

    const currentIndex =
      selectedModule.lessons.findIndex(
        (lesson) =>
          lesson.id === selectedLesson.id
      );

    const hasPrevious =
      currentIndex > 0;

    const hasNext =
      currentIndex <
      selectedModule.lessons.length - 1;

    const moduleVideos =
      videos.filter(
        (video) =>
          video.moduleId ===
          selectedModule.id
      );

    return (
      <div className="page">

        <button
          className="secondary-button"
          onClick={handleBackToModules}
          style={{
            marginBottom: "24px"
          }}
        >
          ← Back to Modules
        </button>

        <LessonDetails
          lesson={selectedLesson}
          module={selectedModule}
          videos={moduleVideos}
          completedLessons={completedLessons}
          onComplete={() =>
            handleCompleteLesson(
              selectedLesson.id
            )
          }
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

          <span className="hero-label">
            📚 STOCKMASTER LEARNING
          </span>

          <h1>
            Learn the Stock Market
          </h1>

          <p>
            Start from zero and gradually
            learn how stocks, trading,
            analysis, financial ratios and
            investing work.
          </p>

        </div>

      </div>


      {/* OVERALL PROGRESS */}

      <section className="content-section">

        <div className="section-title">

          <div>

            <h2>
              Your Learning Progress
            </h2>

            <p>
              Complete lessons and track
              your progress through StockMaster.
            </p>

          </div>

          <strong>
            {overallProgress}% Complete
          </strong>

        </div>


        <ProgressBar
          progress={overallProgress}
        />

      </section>


      {/* MODULES */}

      <section className="content-section">

        <div className="section-title">

          <div>

            <h2>
              Learning Modules
            </h2>

            <p>
              Follow the modules in order,
              or explore any topic you want.
            </p>

          </div>

        </div>


        <div className="module-grid">

          {modules.map((module) => {

            const progress =
              getModuleProgress(module);

            return (
              <LessonCard
                key={module.id}
                module={module}
                progress={progress}
                completedLessons={
                  completedLessons
                }
                onClick={() =>
                  handleOpenModule(module)
                }
                onOpen={() =>
                  handleOpenModule(module)
                }
              />
            );

          })}

        </div>

      </section>


      {/* LEARNING PATH */}

      <section className="content-section">

        <div className="practice-info">

          <div>

            <h2>
              🎯 Your Learning Path
            </h2>

            <p>
              Learn the fundamentals first,
              then move into trading,
              analysis, financial ratios,
              risk management and advanced
              concepts.
            </p>

          </div>

          <button
            className="primary-button"
            onClick={() =>
              handleOpenModule(modules[0])
            }
          >
            Start from Beginning →
          </button>

        </div>

      </section>

    </div>
  );
}

export default LearningHome;