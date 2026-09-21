import { getDb } from "../db/connection.js";
import { HttpError, badRequest, notFound } from "../utils/httpError.js";
import { round2 } from "../utils/money.js";
import { serializeTransaction } from "../utils/serializers.js";
import { notify } from "./notificationService.js";

const inr = (n) => `₹${Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

/**
 * The client only says WHAT to trade (stock + quantity). The price always
 * comes from the database, so a user can never buy at a price they invent.
 *
 * Each trade runs in one IMMEDIATE transaction, so the balance check, balance
 * update, holding update and history row either all happen or none do, even
 * with several requests arriving at once.
 */

/* ------------------------------ BUY ------------------------------- */

const buyTx = (db) =>
  db.transaction((userId, stockId, quantity) => {
    const stock = db.prepare("SELECT * FROM stocks WHERE id = ?").get(stockId);
    if (!stock) throw notFound("Stock not found.");
    if (!stock.is_active) {
      throw badRequest("STOCK_INACTIVE", `${stock.symbol} is not available for trading.`);
    }

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    const total = round2(stock.price * quantity);

    if (total > user.balance) {
      throw new HttpError(
        400,
        "INSUFFICIENT_FUNDS",
        `Insufficient virtual balance. You need ${inr(total)} but have ${inr(user.balance)}.`,
        { required: total, available: user.balance }
      );
    }

    const balanceAfter = round2(user.balance - total);
    const now = new Date().toISOString();

    db.prepare("UPDATE users SET balance = ?, updated_at = ? WHERE id = ?").run(
      balanceAfter, now, userId
    );

    const holding = db
      .prepare("SELECT * FROM portfolio WHERE user_id = ? AND stock_id = ?")
      .get(userId, stockId);

    if (holding) {
      const newQuantity = holding.quantity + quantity;
      const newAverage = round2(
        (holding.quantity * holding.average_price + quantity * stock.price) / newQuantity
      );
      db.prepare(
        "UPDATE portfolio SET quantity = ?, average_price = ?, updated_at = ? WHERE id = ?"
      ).run(newQuantity, newAverage, now, holding.id);
    } else {
      db.prepare(
        `INSERT INTO portfolio (user_id, stock_id, quantity, average_price, updated_at)
         VALUES (?, ?, ?, ?, ?)`
      ).run(userId, stockId, quantity, stock.price, now);
    }

    const { lastInsertRowid } = db
      .prepare(
        `INSERT INTO transactions
           (user_id, stock_id, type, quantity, price, total_amount, realized_pnl, balance_after, created_at)
         VALUES (?, ?, 'BUY', ?, ?, ?, NULL, ?, ?)`
      )
      .run(userId, stockId, quantity, stock.price, total, balanceAfter, now);

    notify(
      {
        userId,
        stockId,
        type: "TRADE",
        title: `Bought ${quantity} × ${stock.symbol}`,
        message: `${quantity} share(s) of ${stock.name} at ${inr(stock.price)} for ${inr(total)}.`,
      },
      db
    );

    return { transactionId: Number(lastInsertRowid), stock };
  });

/* ------------------------------ SELL ------------------------------ */

const sellTx = (db) =>
  db.transaction((userId, stockId, quantity) => {
    const stock = db.prepare("SELECT * FROM stocks WHERE id = ?").get(stockId);
    if (!stock) throw notFound("Stock not found.");

    const holding = db
      .prepare("SELECT * FROM portfolio WHERE user_id = ? AND stock_id = ?")
      .get(userId, stockId);

    if (!holding) {
      throw badRequest("NOT_OWNED", `You do not own any shares of ${stock.symbol}.`);
    }
    if (quantity > holding.quantity) {
      throw new HttpError(
        400,
        "INSUFFICIENT_SHARES",
        `You only own ${holding.quantity} share(s) of ${stock.symbol}.`,
        { owned: holding.quantity, requested: quantity }
      );
    }

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    const total = round2(stock.price * quantity);
    const realizedPnl = round2((stock.price - holding.average_price) * quantity);
    const balanceAfter = round2(user.balance + total);
    const now = new Date().toISOString();

    db.prepare("UPDATE users SET balance = ?, updated_at = ? WHERE id = ?").run(
      balanceAfter, now, userId
    );

    const remaining = holding.quantity - quantity;
    if (remaining === 0) {
      db.prepare("DELETE FROM portfolio WHERE id = ?").run(holding.id);
    } else {
      db.prepare("UPDATE portfolio SET quantity = ?, updated_at = ? WHERE id = ?").run(
        remaining, now, holding.id
      );
    }

    const { lastInsertRowid } = db
      .prepare(
        `INSERT INTO transactions
           (user_id, stock_id, type, quantity, price, total_amount, realized_pnl, balance_after, created_at)
         VALUES (?, ?, 'SELL', ?, ?, ?, ?, ?, ?)`
      )
      .run(userId, stockId, quantity, stock.price, total, realizedPnl, balanceAfter, now);

    const outcome = realizedPnl >= 0 ? `profit of ${inr(realizedPnl)}` : `loss of ${inr(-realizedPnl)}`;
    notify(
      {
        userId,
        stockId,
        type: "TRADE",
        title: `Sold ${quantity} × ${stock.symbol}`,
        message: `${quantity} share(s) of ${stock.name} at ${inr(stock.price)} - a ${outcome}.`,
      },
      db
    );

    return { transactionId: Number(lastInsertRowid), stock };
  });

/* --------------------------- public API --------------------------- */

function runTrade(makeTx, userId, stockId, quantity) {
  const db = getDb();
  // .immediate() takes the write lock up front so concurrent trades queue up.
  const { transactionId } = makeTx(db).immediate(userId, stockId, quantity);

  return {
    transaction: getTransaction(userId, transactionId),
    ...getPortfolio(userId),
  };
}

export const buyStock = (userId, stockId, quantity) => runTrade(buyTx, userId, stockId, quantity);
export const sellStock = (userId, stockId, quantity) => runTrade(sellTx, userId, stockId, quantity);

/* --------------------------- portfolio ---------------------------- */

/**
 * Returns the user's cash, holdings and totals.
 * `portfolio` uses the exact shape the React app keeps in state:
 *   { [stockId]: { quantity, averagePrice } }
 */
export function getPortfolio(userId) {
  const db = getDb();
  const user = db.prepare("SELECT balance, starting_balance FROM users WHERE id = ?").get(userId);

  const rows = db
    .prepare(
      `SELECT p.stock_id, p.quantity, p.average_price, s.symbol, s.name, s.price
       FROM portfolio p JOIN stocks s ON s.id = p.stock_id
       WHERE p.user_id = ?
       ORDER BY s.symbol`
    )
    .all(userId);

  const holdings = rows.map((r) => {
    const invested = round2(r.quantity * r.average_price);
    const currentValue = round2(r.quantity * r.price);
    const profitLoss = round2(currentValue - invested);
    return {
      stockId: r.stock_id,
      symbol: r.symbol,
      name: r.name,
      quantity: r.quantity,
      averagePrice: r.average_price,
      currentPrice: r.price,
      invested,
      currentValue,
      profitLoss,
      profitLossPercent: invested ? round2((profitLoss / invested) * 100) : 0,
    };
  });

  const portfolio = Object.fromEntries(
    holdings.map((h) => [h.stockId, { quantity: h.quantity, averagePrice: h.averagePrice }])
  );

  const invested = round2(holdings.reduce((sum, h) => sum + h.invested, 0));
  const portfolioValue = round2(holdings.reduce((sum, h) => sum + h.currentValue, 0));
  const totalValue = round2(user.balance + portfolioValue);

  const { pnl } = db
    .prepare("SELECT COALESCE(SUM(realized_pnl), 0) AS pnl FROM transactions WHERE user_id = ?")
    .get(userId);

  return {
    balance: user.balance,
    portfolio,
    holdings,
    summary: {
      balance: user.balance,
      startingBalance: user.starting_balance,
      invested,
      portfolioValue,
      totalValue,
      unrealizedPnl: round2(portfolioValue - invested),
      realizedPnl: round2(pnl),
      totalReturn: round2(totalValue - user.starting_balance),
      totalReturnPercent: user.starting_balance
        ? round2(((totalValue - user.starting_balance) / user.starting_balance) * 100)
        : 0,
      holdingsCount: holdings.length,
    },
  };
}

/** Sell nothing, just start over: cash back to the starting amount, holdings cleared. History is kept. */
export function resetPortfolio(userId) {
  const db = getDb();
  db.transaction(() => {
    db.prepare("DELETE FROM portfolio WHERE user_id = ?").run(userId);
    db.prepare(
      "UPDATE users SET balance = starting_balance, updated_at = ? WHERE id = ?"
    ).run(new Date().toISOString(), userId);
    notify(
      {
        userId,
        type: "SYSTEM",
        title: "Portfolio reset",
        message: "Your virtual cash and holdings were reset. Your trade history was kept.",
      },
      db
    );
  }).immediate();
  return getPortfolio(userId);
}

/* -------------------------- transactions -------------------------- */

const TX_SELECT = `
  SELECT t.*, s.symbol, s.name AS stock_name
  FROM transactions t JOIN stocks s ON s.id = t.stock_id`;

function getTransaction(userId, id) {
  return serializeTransaction(
    getDb().prepare(`${TX_SELECT} WHERE t.id = ? AND t.user_id = ?`).get(id, userId)
  );
}

export function listTransactions(userId, { type, stockId, limit = 50, offset = 0 } = {}) {
  const db = getDb();
  const params = { userId, type: type ?? null, stockId: stockId ?? null, limit, offset };
  const where = `t.user_id = @userId
                 AND (@type IS NULL OR t.type = @type)
                 AND (@stockId IS NULL OR t.stock_id = @stockId)`;

  const rows = db
    .prepare(`${TX_SELECT} WHERE ${where} ORDER BY t.created_at DESC, t.id DESC LIMIT @limit OFFSET @offset`)
    .all(params);
  const { n } = db
    .prepare(`SELECT COUNT(*) AS n FROM transactions t WHERE ${where}`)
    .get({ userId, type: params.type, stockId: params.stockId });

  return { total: n, limit, offset, transactions: rows.map(serializeTransaction) };
}
