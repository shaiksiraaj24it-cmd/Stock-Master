function LessonCard({
  module,
  progress = 0,
  onClick,
  onOpen
}) {

  const handleClick = () => {

    if (onOpen) {
      onOpen();
      return;
    }

    if (onClick) {
      onClick();
    }
  };


  return (
    <div
      className="module-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          handleClick();
        }

      }}
    >

      {/* MODULE ICON */}

      <div className="module-icon">
        {module.icon || "📚"}
      </div>


      {/* MODULE NUMBER */}

      <div className="module-number">
        MODULE {module.id}
      </div>


      {/* TITLE */}

      <h3>
        {module.title}
      </h3>


      {/* DESCRIPTION */}

      <p>
        {module.description}
      </p>


      {/* MODULE INFORMATION */}

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          margin: "16px 0"
        }}
      >

        <span className="lesson-tag">
          📖 {module.lessons.length} Lessons
        </span>

        <span className="lesson-tag">
          ⏱️ {module.duration}
        </span>

        <span className="lesson-tag">
          🎓 {module.level}
        </span>

      </div>


      {/* PROGRESS */}

      <div className="lesson-progress">

        <div className="progress-header">

          <span>
            Progress
          </span>

          <strong>
            {progress}%
          </strong>

        </div>

        <div className="progress-track">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`
            }}
          />

        </div>

      </div>


      {/* BUTTON */}

      <button
        className="module-button"
        onClick={(event) => {

          event.stopPropagation();
          handleClick();

        }}
      >
        {progress > 0
          ? "Continue Learning →"
          : "Start Module →"}
      </button>

    </div>
  );
}

export default LessonCard;