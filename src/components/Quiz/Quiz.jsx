import { useState } from "react";

function Quiz({
  onFinish
}) {

  const questions = [

    {
      question:
        "What does owning a stock represent?",
      options: [
        "A loan to the government",
        "A small ownership interest in a company",
        "A bank account",
        "A fixed deposit"
      ],
      answer: 1
    },

    {
      question:
        "What can influence stock prices?",
      options: [
        "Supply and demand",
        "Only company employees",
        "Weather only",
        "Nothing"
      ],
      answer: 0
    },

    {
      question:
        "What is a dividend?",
      options: [
        "A type of loan",
        "A stock exchange",
        "A distribution of company profits to eligible shareholders",
        "A brokerage account"
      ],
      answer: 2
    },

    {
      question:
        "What is diversification?",
      options: [
        "Buying only one stock",
        "Spreading investments across different investments",
        "Selling every stock",
        "Borrowing money"
      ],
      answer: 1
    }

  ];


  const [current, setCurrent] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [selected, setSelected] =
    useState(null);

  const [finished, setFinished] =
    useState(false);


  const question =
    questions[current];


  const chooseAnswer = (index) => {

    if (selected !== null) {
      return;
    }

    setSelected(index);

    if (index === question.answer) {
      setScore(
        (currentScore) =>
          currentScore + 1
      );
    }
  };


  const nextQuestion = () => {

    if (current === questions.length - 1) {

      setFinished(true);

      onFinish(
        score,
        questions.length
      );

      return;
    }

    setCurrent(
      (value) => value + 1
    );

    setSelected(null);
  };


  if (finished) {

    return (

      <div className="quiz-result">

        <div className="result-icon">
          🎉
        </div>

        <h2>
          Quiz Complete!
        </h2>

        <p>
          You scored
        </p>

        <strong>
          {score} / {questions.length}
        </strong>

        <button
          className="primary-button"
          onClick={() => {

            setCurrent(0);
            setScore(0);
            setSelected(null);
            setFinished(false);

          }}
        >
          Try Again
        </button>

      </div>
    );
  }


  return (

    <div className="quiz-card">

      <div className="quiz-progress">

        Question {current + 1}
        {" "}
        of
        {" "}
        {questions.length}

      </div>


      <h2>
        {question.question}
      </h2>


      <div className="quiz-options">

        {question.options.map(
          (option, index) => (

            <button
              key={option}
              className={
                selected === null
                  ? "quiz-option"
                  : index === question.answer
                    ? "quiz-option correct"
                    : index === selected
                      ? "quiz-option wrong"
                      : "quiz-option"
              }
              onClick={() =>
                chooseAnswer(index)
              }
            >
              {option}
            </button>

          )
        )}

      </div>


      <button
        className="primary-button"
        disabled={selected === null}
        onClick={nextQuestion}
      >
        {current === questions.length - 1
          ? "Finish Quiz"
          : "Next Question →"}
      </button>

    </div>
  );
}

export default Quiz;