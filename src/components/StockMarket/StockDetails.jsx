function StockDetails({
  stock,
  isWatched = false,
  onWatch,
  onBack
}) {

  if (!stock) {

    return (

      <div className="card empty-state">

        <h2>
          Stock not found
        </h2>

        <button
          type="button"
          className="primary-button"
          onClick={onBack}
        >
          ← Back to Stocks
        </button>

      </div>

    );

  }


  const price =
    Number(stock.price) || 0;

  const previousPrice =
    Number(stock.previousPrice) ||
    price;

  const change =
    price - previousPrice;

  const changePercent =
    previousPrice !== 0
      ? (change / previousPrice) * 100
      : 0;

  const isPositive =
    change >= 0;


  return (

    <div className="stock-details-page">


      {/* BACK */}

      <button
        type="button"
        className="back-button"
        onClick={onBack}
      >
        ← Back to Stock Explorer
      </button>


      {/* HERO */}

      <section className="stock-details-hero">

        <div className="stock-details-company">

          <div className="stock-details-logo">
            {stock.symbol
              ?.slice(0, 2)
              .toUpperCase()}
          </div>


          <div>

            <span className="section-label">
              STOCK DETAILS
            </span>

            <h1>
              {stock.name}
            </h1>

            <p>
              {stock.symbol}
            </p>

          </div>

        </div>


        <button
          type="button"
          className={
            `secondary-button stock-watch-button ${
              isWatched
                ? "watching"
                : ""
            }`
          }
          onClick={onWatch}
        >

          {isWatched
            ? "★ Added to Watchlist"
            : "☆ Add to Watchlist"}

        </button>

      </section>


      {/* PRICE */}

      <section className="stock-price-panel">

        <div>

          <span className="stock-price-label">
            Current Price
          </span>

          <div className="stock-details-price">
            ₹
            {price.toLocaleString(
              "en-IN"
            )}
          </div>

        </div>


        <div
          className={
            `stock-details-change ${
              isPositive
                ? "positive"
                : "negative"
            }`
          }
        >

          <strong>
            {isPositive
              ? "▲"
              : "▼"}{" "}
            ₹
            {Math.abs(change).toFixed(2)}
          </strong>

          <span>
            {isPositive ? "+" : ""}
            {changePercent.toFixed(2)}%
          </span>

        </div>

      </section>


      {/* QUICK INFORMATION */}

      <section className="stock-info-grid">


        <div className="stock-info-card">

          <span>
            Symbol
          </span>

          <strong>
            {stock.symbol || "N/A"}
          </strong>

        </div>


        <div className="stock-info-card">

          <span>
            Previous Price
          </span>

          <strong>
            ₹
            {previousPrice.toLocaleString(
              "en-IN"
            )}
          </strong>

        </div>


        <div className="stock-info-card">

          <span>
            Price Change
          </span>

          <strong
            className={
              isPositive
                ? "positive"
                : "negative"
            }
          >
            {isPositive ? "+" : ""}
            ₹
            {change.toFixed(2)}
          </strong>

        </div>


        <div className="stock-info-card">

          <span>
            Market Status
          </span>

          <strong>
            Simulated
          </strong>

        </div>


      </section>


      {/* EDUCATIONAL INFORMATION */}

      <section className="stock-learning-section">

        <span className="section-label">
          UNDERSTAND THIS STOCK
        </span>

        <h2>
          What should you look at?
        </h2>

        <p>
          When exploring a stock, don't
          look only at its current price.
          Investors generally consider
          the company's business,
          financial performance, valuation,
          growth prospects and market
          conditions.
        </p>


        <div className="stock-learning-grid">


          <div className="stock-learning-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Fundamental Analysis
            </h3>

            <p>
              Study revenue, profit,
              assets, liabilities and
              other financial information
              to understand the business.
            </p>

          </div>


          <div className="stock-learning-card">

            <div className="feature-icon">
              📈
            </div>

            <h3>
              Technical Analysis
            </h3>

            <p>
              Study price movements,
              charts, trends and trading
              volume to understand market
              behaviour.
            </p>

          </div>


          <div className="stock-learning-card">

            <div className="feature-icon">
              ⚠️
            </div>

            <h3>
              Risk
            </h3>

            <p>
              Every investment can involve
              risk. Price movements can be
              affected by company,
              economic and market factors.
            </p>

          </div>


        </div>

      </section>


      {/* SIMULATION NOTICE */}

      <div className="practice-info">

        <div>

          <span>
            💡
          </span>

          <div>

            <h3>
              Educational Stock Data
            </h3>

            <p>
              The values displayed in
              StockMaster are for learning
              and virtual-trading practice.
              They should not be treated as
              live market prices.
            </p>

          </div>

        </div>

      </div>


    </div>

  );

}

export default StockDetails;