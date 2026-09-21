import { useState } from "react";
import LearningHome from "../components/Learning/LearningHome";
import LessonDetails from "../components/Learning/LessonDetails";

const Learn = () => {
  const [selected, setSelected] = useState(null);

  const openLesson = (module, lesson) => {
    setSelected({
      module,
      lesson
    });
  };

  const goToNextLesson = () => {
    if (!selected) return;

    const currentIndex =
      selected.module.lessons.findIndex(
        (lesson) =>
          lesson.id === selected.lesson.id
      );

    const nextLesson =
      selected.module.lessons[currentIndex + 1];

    if (nextLesson) {
      setSelected({
        module: selected.module,
        lesson: nextLesson
      });
    } else {
      setSelected(null);
    }
  };

  if (selected) {
    return (
      <LessonDetails
        module={selected.module}
        lesson={selected.lesson}
        onBack={() => setSelected(null)}
        onNext={goToNextLesson}
      />
    );
  }

  return (
    <LearningHome
      onOpenLesson={openLesson}
    />
  );
};

export default Learn;