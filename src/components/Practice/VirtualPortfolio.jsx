function VirtualPortfolio({
  balance,
  portfolio,
  stocks
}) {

  const entries =
    Object.entries(portfolio);


  const portfolioValue =
    entries.reduce(
      (total, [id, item]) => {

        const stock =
          stocks.find(
            (s) =>
              s.id === Number(id)
          );

        if (!stock) {
          return total;
        }

        return total +
          stock.price *
          item.quantity;

      },
      0
    );


  return (

    <div className="portfolio-summary">

      <div className="portfolio-money">

        <span>
          Available Balance
        </span>

        <strong>
          ₹{balance.toLocaleString("en-IN")}
        </strong>

      </div>


      <div className="portfolio-money">

        <span>
          Portfolio Value
        </span>

        <strong>
          ₹{portfolioValue.toLocaleString("en-IN")}
        </strong>

      </div>


      <div className="portfolio-money">

        <span>
          Holdings
        </span>

        <strong>
          {entries.length}
        </strong>

      </div>

    </div>
  );
}

export default VirtualPortfolio;