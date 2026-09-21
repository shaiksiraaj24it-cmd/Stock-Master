function StockChart({
  positive
}) {

  const points = positive
    ? "0,90 25,80 50,85 75,60 100,70 125,40 150,50 175,25 200,35"
    : "0,30 25,45 50,35 75,60 100,50 125,70 150,60 175,85 200,75";


  return (

    <div className="mini-chart">

      <svg
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
      >

        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />

      </svg>

    </div>
  );
}

export default StockChart;