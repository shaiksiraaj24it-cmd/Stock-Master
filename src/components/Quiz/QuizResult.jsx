function QuizResult({
  score,
  total
}) {

  return (

    <div className="quiz-result">

      <div className="result-icon">
        🏆
      </div>

      <h2>
        Your Result
      </h2>

      <strong>
        {score} / {total}
      </strong>

      <p>
        Keep learning and improving!
      </p>

    </div>
  );
}

export default QuizResult;