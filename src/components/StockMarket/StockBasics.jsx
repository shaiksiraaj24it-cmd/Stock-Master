function StockBasics() {

  return (

    <section className="basics-section">

      <span className="hero-label">
        📈 STOCK MARKET
      </span>

      <h1>
        Understanding the Stock Market
      </h1>

      <p>
        A stock market is a place where
        investors can buy and sell shares
        of publicly traded companies.
      </p>


      <div className="info-grid">

        <div className="info-box">
          <span>🏢</span>
          <h3>Company</h3>
          <p>
            A business can issue shares
            to raise capital.
          </p>
        </div>

        <div className="info-box">
          <span>👥</span>
          <h3>Investors</h3>
          <p>
            Investors buy shares to participate
            in the company's potential growth.
          </p>
        </div>

        <div className="info-box">
          <span>⚖️</span>
          <h3>Supply & Demand</h3>
          <p>
            Buying and selling activity can
            influence stock prices.
          </p>
        </div>

      </div>

    </section>
  );
}

export default StockBasics;