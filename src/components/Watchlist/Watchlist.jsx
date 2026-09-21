import WatchlistStock from "./WatchlistStock";

function Watchlist({
  stocks,
  watchlist,
  onWatch
}) {

  const watchedStocks =
    stocks.filter(
      (stock) =>
        watchlist.includes(stock.id)
    );


  return (

    <div className="page">

      <div className="learning-header">

        <span className="hero-label">
          ⭐ YOUR WATCHLIST
        </span>

        <h1>
          My Watchlist
        </h1>

        <p>
          Keep an eye on stocks you're
          interested in learning about.
        </p>

      </div>


      {watchedStocks.length === 0 ? (

        <div className="empty-state">

          <div>
            ⭐
          </div>

          <h2>
            Your watchlist is empty
          </h2>

          <p>
            Go to the Market page and click
            the star on a stock to add it here.
          </p>

        </div>

      ) : (

        <div className="watchlist-grid">

          {watchedStocks.map((stock) => (

            <WatchlistStock
              key={stock.id}
              stock={stock}
              onRemove={onWatch}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default Watchlist;