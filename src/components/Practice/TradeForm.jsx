import { useState } from "react";

function TradeForm({
  stock,
  onBuy,
  onSell
}) {

  const [quantity, setQuantity] =
    useState(1);


  return (

    <div className="trade-form">

      <h3>
        Trade {stock.symbol}
      </h3>

      <p>
        Current price:
        <strong>
          ₹{stock.price.toLocaleString("en-IN")}
        </strong>
      </p>


      <label>
        Quantity
      </label>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) =>
          setQuantity(
            Number(e.target.value)
          )
        }
      />


      <div className="trade-buttons">

        <button
          className="buy-button"
          onClick={() =>
            onBuy(
              stock,
              quantity
            )
          }
        >
          Buy
        </button>

        <button
          className="sell-button"
          onClick={() =>
            onSell(
              stock,
              quantity
            )
          }
        >
          Sell
        </button>

      </div>

    </div>
  );
}

export default TradeForm;