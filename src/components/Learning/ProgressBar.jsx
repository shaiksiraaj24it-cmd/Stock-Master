function ProgressBar({
  completed,
  total
}) {

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );


  return (

    <div className="progress-card">

      <div className="progress-header">

        <div>

          <strong>
            Your Learning Progress
          </strong>

          <p>
            {completed} of {total} lessons completed
          </p>

        </div>

        <strong>
          {percentage}%
        </strong>

      </div>


      <div className="progress-track">

        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`
          }}
        />

      </div>

    </div>
  );
}

export default ProgressBar;