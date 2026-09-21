function WatchlistStock({
  stock,
  onRemove
}) {

  const change =
    stock.price -
    stock.previousPrice;

  const percentage =
    (
      (change / stock.previousPrice)
      * 100
    ).toFixed(2);


  return (

    <div className="watchlist-card">

      <div>

        <span className="stock-symbol">
          {stock.symbol}
        </span>

        <h3>
          {stock.name}
        </h3>

      </div>


      <strong className="watch-price">
        ₹{stock.price.toLocaleString("en-IN")}
      </strong>


      <span
        className={
          change >= 0
            ? "price-up"
            : "price-down"
        }
      >
        {change >= 0 ? "▲" : "▼"}
        {" "}
        {Math.abs(percentage)}%
      </span>


      <button
        className="remove-watch"
        onClick={() =>
          onRemove(stock.id)
        }
      >
        ★ Remove
      </button>

    </div>
  );
}

export default WatchlistStock;