import { useState } from "react";
import SearchBar from "../Common/SearchBar";
import StockDetails from "./StockDetails";

function StockExplorer({
  stocks = [],
  watchlist = [],
  onWatch
}) {

  const [search, setSearch] =
    useState("");

  const [selectedStock, setSelectedStock] =
    useState(null);


  /* =========================
     SEARCH
  ========================= */

  const filteredStocks =
    stocks.filter((stock) => {

      const searchText =
        search.toLowerCase().trim();

      if (!searchText) {
        return true;
      }

      return (
        stock.name
          ?.toLowerCase()
          .includes(searchText) ||

        stock.symbol
          ?.toLowerCase()
          .includes(searchText)
      );

    });


  /* =========================
     VIEW DETAILS
  ========================= */

  const handleViewDetails = (stock) => {

    setSelectedStock(stock);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  /* =========================
     BACK
  ========================= */

  const handleBack = () => {

    setSelectedStock(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  /* =========================
     DETAILS PAGE
  ========================= */

  if (selectedStock) {

    return (

      <StockDetails
        stock={selectedStock}
        isWatched={
          watchlist.includes(
            selectedStock.id
          )
        }
        onWatch={() =>
          onWatch(selectedStock.id)
        }
        onBack={handleBack}
      />

    );

  }


  /* =========================
     STOCK LIST
  ========================= */

  return (

    <section className="stock-explorer">


      <div className="stock-explorer-header">

        <div>

          <span className="section-label">
            MARKET EXPLORER
          </span>

          <h2>
            Explore Stocks
          </h2>

          <p>
            Search companies and open their
            detailed stock information.
          </p>

        </div>

      </div>


      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by company name or symbol..."
      />


      {filteredStocks.length === 0 ? (

        <div className="card empty-state">

          <div className="empty-state-icon">
            🔍
          </div>

          <h3>
            No stocks found
          </h3>

          <p>
            Try searching with another
            company name or stock symbol.
          </p>

        </div>

      ) : (

        <div className="stock-grid">

          {filteredStocks.map((stock) => {

            const price =
              Number(stock.price) || 0;

            const previousPrice =
              Number(
                stock.previousPrice
              ) || price;

            const change =
              price - previousPrice;

            const isPositive =
              change >= 0;

            const isWatched =
              watchlist.includes(
                stock.id
              );

            return (

              <article
                className="stock-card"
                key={stock.id}
              >


                {/* HEADER */}

                <div className="stock-card-header">

                  <div className="stock-logo">
                    {stock.symbol
                      ?.slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div>

                    <h3>
                      {stock.name}
                    </h3>

                    <span className="stock-symbol">
                      {stock.symbol}
                    </span>

                  </div>

                </div>


                {/* PRICE */}

                <div className="stock-price">

                  ₹
                  {price.toLocaleString(
                    "en-IN"
                  )}

                </div>


                <div
                  className={
                    `stock-change ${
                      isPositive
                        ? "positive"
                        : "negative"
                    }`
                  }
                >

                  {isPositive
                    ? "▲"
                    : "▼"}

                  {" "}

                  ₹
                  {Math.abs(change).toFixed(2)}

                </div>


                {/* ACTIONS */}

                <div className="stock-card-actions">


                  <button
                    type="button"
                    className="primary-button"
                    onClick={() =>
                      handleViewDetails(stock)
                    }
                  >
                    View Details →
                  </button>


                  <button
                    type="button"
                    className={
                      `secondary-button ${
                        isWatched
                          ? "watching"
                          : ""
                      }`
                    }
                    onClick={() =>
                      onWatch(stock.id)
                    }
                  >

                    {isWatched
                      ? "★ Watching"
                      : "☆ Watchlist"}

                  </button>


                </div>

              </article>

            );

          })}

        </div>

      )}

    </section>

  );

}

export default StockExplorer;