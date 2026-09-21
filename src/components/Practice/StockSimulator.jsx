import { useState } from "react";

import TradeForm from "./TradeForm";
import VirtualPortfolio from "./VirtualPortfolio";

function StockSimulator({
  stocks,
  balance,
  portfolio,
  onBuy,
  onSell
}) {

  const [selectedStock, setSelectedStock] =
    useState(stocks[0]);


  return (

    <div>

      <div className="learning-header">

        <span className="hero-label">
          💰 VIRTUAL TRADING
        </span>

        <h1>
          Stock Simulator
        </h1>

        <p>
          Practice buying and selling stocks
          without using real money.
        </p>

      </div>


      <VirtualPortfolio
        balance={balance}
        portfolio={portfolio}
        stocks={stocks}
      />


      <div className="simulator-layout">

        <div className="simulator-stocks">

          <h2>
            Available Stocks
          </h2>

          {stocks.map((stock) => (

            <button
              key={stock.id}
              className={
                selectedStock.id === stock.id
                  ? "sim-stock selected"
                  : "sim-stock"
              }
              onClick={() =>
                setSelectedStock(stock)
              }
            >

              <div>

                <strong>
                  {stock.symbol}
                </strong>

                <span>
                  {stock.name}
                </span>

              </div>

              <strong>
                ₹{stock.price.toLocaleString("en-IN")}
              </strong>

            </button>

          ))}

        </div>


        <TradeForm
          stock={selectedStock}
          onBuy={onBuy}
          onSell={onSell}
        />

      </div>

    </div>
  );
}

export default StockSimulator;