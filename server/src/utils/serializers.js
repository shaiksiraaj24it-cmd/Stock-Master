import { formatDividend, formatMarketCap, round2 } from "./money.js";

/**
 * DB row -> the stock object the React app already uses
 * (same field names as src/data/stocks.js, plus a few extras).
 */
export function serializeStock(row) {
  const change = round2(row.price - row.previous_price);
  return {
    id: row.id,
    symbol: row.symbol,
    name: row.name,
    sector: row.sector,
    price: row.price,
    previousPrice: row.previous_price,
    change,
    changePercent: row.previous_price ? round2((change / row.previous_price) * 100) : 0,
    marketCap: formatMarketCap(row.market_cap_cr),
    marketCapCr: row.market_cap_cr,
    pe: row.pe_ratio,
    dividend: formatDividend(row.dividend_yield),
    dividendYield: row.dividend_yield,
    description: row.description,
    updatedAt: row.updated_at,
  };
}

export function serializeUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role || "user",
    balance: row.balance,
    startingBalance: row.starting_balance,
    createdAt: row.created_at,
  };
}

export function serializeTransaction(row) {
  return {
    id: row.id,
    type: row.type,
    stockId: row.stock_id,
    symbol: row.symbol,
    stockName: row.stock_name,
    quantity: row.quantity,
    price: row.price,
    totalAmount: row.total_amount,
    realizedPnl: row.realized_pnl,
    balanceAfter: row.balance_after,
    createdAt: row.created_at,
  };
}

export function serializeNotification(row) {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    message: row.message,
    stockId: row.stock_id,
    isRead: Boolean(row.is_read),
    createdAt: row.created_at,
  };
}
