function FinancialRatios() {

  const ratios = [

    {
      name: "P/E Ratio",
      meaning:
        "Compares a company's share price with its earnings per share."
    },

    {
      name: "ROE",
      meaning:
        "Measures how effectively a company generates profit from shareholders' equity."
    },

    {
      name: "Debt-to-Equity",
      meaning:
        "Compares a company's debt with shareholders' equity."
    },

    {
      name: "Dividend Yield",
      meaning:
        "Shows dividends relative to the stock price."
    }

  ];


  return (

    <section className="content-section">

      <div className="section-title">

        <div>

          <span className="hero-label">
            03 • FINANCIAL RATIOS
          </span>

          <h2>
            Important Financial Ratios
          </h2>

          <p>
            Ratios help investors compare
            different aspects of companies.
          </p>

        </div>

      </div>


      <div className="ratio-grid">

        {ratios.map((ratio) => (

          <div
            className="ratio-card"
            key={ratio.name}
          >

            <h3>
              {ratio.name}
            </h3>

            <p>
              {ratio.meaning}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default FinancialRatios;