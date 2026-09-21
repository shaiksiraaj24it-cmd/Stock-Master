import Quiz from "./Quiz";

function QuizHome({
  onNavigate
}) {

  return (

    <div className="page">

      <div className="quiz-hero">

        <div className="quiz-icon">
          🧠
        </div>

        <span className="hero-label">
          STOCKMASTER QUIZ
        </span>

        <h1>
          Test Your Stock Knowledge
        </h1>

        <p>
          Check how well you understand
          the concepts you've learned.
        </p>

      </div>


      <Quiz
        onFinish={(score, total) => {

          alert(
            `You scored ${score} out of ${total}!`
          );

        }}
      />


      <div className="learning-next">

        <div>

          <h2>
            Want to learn more?
          </h2>

          <p>
            Go back to the lessons and
            strengthen your knowledge.
          </p>

        </div>

        <button
          className="primary-button"
          onClick={() =>
            onNavigate("Learn")
          }
        >
          Back to Learning
        </button>

      </div>

    </div>
  );
}

export default QuizHome;