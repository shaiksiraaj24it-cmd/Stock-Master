import { config } from "../config.js";
import { getDb } from "../db/connection.js";
import { notFound } from "../utils/httpError.js";
import { round2 } from "../utils/money.js";
import { serializeStock } from "../utils/serializers.js";
import { getOrSet, cacheInvalidate } from "./cacheService.js";

/* ------------------------------------------------------------------ */
/*  Reading stocks                                                     */
/* ------------------------------------------------------------------ */

export function listStocks({ search, sector } = {}) {
  const rows = getDb()
    .prepare(
      `SELECT * FROM stocks
       WHERE is_active = 1
         AND (@sector IS NULL OR sector = @sector COLLATE NOCASE)
         AND (@search IS NULL OR symbol LIKE @like ESCAPE '\\' OR name LIKE @like ESCAPE '\\')
       ORDER BY symbol`
    )
    .all({
      sector: sector ?? null,
      search: search ?? null,
      like: search ? `%${search.replace(/[\\%_]/g, "\\$&")}%` : null,
    });
  return rows.map(serializeStock);
}

/** Accepts either a numeric id or a symbol such as "TCS". */
export function getStock(idOrSymbol) {
  const db = getDb();
  const row = /^\d+$/.test(String(idOrSymbol))
    ? db.prepare("SELECT * FROM stocks WHERE id = ?").get(Number(idOrSymbol))
    : db.prepare("SELECT * FROM stocks WHERE symbol = ?").get(String(idOrSymbol));
  if (!row) throw notFound("Stock not found.");
  return serializeStock(row);
}

export function getPriceHistory(idOrSymbol, limit = 100) {
  const stock = getStock(idOrSymbol);
  // newest N rows, returned oldest-first so charts can plot left -> right
  const rows = getDb()
    .prepare(
      `SELECT price, recorded_at FROM (
         SELECT price, recorded_at, id FROM market_prices
         WHERE stock_id = ? ORDER BY recorded_at DESC, id DESC LIMIT ?
       ) ORDER BY recorded_at ASC, id ASC`
    )
    .all(stock.id, limit);

  return {
    stock: { id: stock.id, symbol: stock.symbol, name: stock.name },
    history: rows.map((r) => ({ price: r.price, recordedAt: r.recorded_at })),
  };
}

/* ------------------------------------------------------------------ */
/*  Market overview (cached)                                           */
/* ------------------------------------------------------------------ */

const OVERVIEW_KEY = "market:overview";

export function getOverview() {
  return getOrSet(OVERVIEW_KEY, config.market.cacheTtlSeconds, () => {
    const stocks = listStocks();

    const rising = stocks.filter((s) => s.change > 0).length;
    const falling = stocks.filter((s) => s.change < 0).length;
    const byChange = [...stocks].sort((a, b) => b.changePercent - a.changePercent);

    const sectors = new Map();
    for (const s of stocks) {
      const key = s.sector || "Other";
      const entry = sectors.get(key) ?? { sector: key, count: 0, totalChangePct: 0 };
      entry.count += 1;
      entry.totalChangePct += s.changePercent;
      sectors.set(key, entry);
    }

    const brief = (s) => ({
      id: s.id, symbol: s.symbol, name: s.name, price: s.price,
      change: s.change, changePercent: s.changePercent,
    });

    return {
      totalStocks: stocks.length,
      rising,
      falling,
      unchanged: stocks.length - rising - falling,
      averageChangePercent: stocks.length
        ? round2(stocks.reduce((sum, s) => sum + s.changePercent, 0) / stocks.length)
        : 0,
      topGainers: byChange.filter((s) => s.changePercent > 0).slice(0, 3).map(brief),
      topLosers: byChange.filter((s) => s.changePercent < 0).reverse().slice(0, 3).map(brief),
      sectors: [...sectors.values()].map((e) => ({
        sector: e.sector,
        count: e.count,
        averageChangePercent: round2(e.totalChangePct / e.count),
      })),
      generatedAt: new Date().toISOString(),
    };
  });
}

/* ------------------------------------------------------------------ */
/*  Market simulation                                                  */
/* ------------------------------------------------------------------ */

/**
 * Moves every active stock by a random amount within ±volatility%, records
 * the new price in market_prices, clears the market cache, and notifies users
 * watching a stock that moved by at least the alert threshold.
 */
export function tickMarket({ random = Math.random } = {}) {
  const db = getDb();
  const { volatilityPct, alertThresholdPct } = config.market;
  const changes = [];

  const run = db.transaction(() => {
    const stocks = db.prepare("SELECT * FROM stocks WHERE is_active = 1").all();
    const update = db.prepare(
      `UPDATE stocks
       SET previous_price = ?, price = ?, updated_at = ?
       WHERE id = ?`
    );
    const record = db.prepare(
      "INSERT INTO market_prices (stock_id, price, recorded_at) VALUES (?, ?, ?)"
    );

    for (const stock of stocks) {
      const pct = (random() * 2 - 1) * volatilityPct;
      const newPrice = Math.max(1, round2(stock.price * (1 + pct / 100)));
      if (newPrice === stock.price) continue;

      const now = new Date().toISOString();
      update.run(stock.price, newPrice, now, stock.id);
      record.run(stock.id, newPrice, now);

      const changePct = round2(((newPrice - stock.price) / stock.price) * 100);
      changes.push({ id: stock.id, symbol: stock.symbol, from: stock.price, to: newPrice, changePct });

      if (Math.abs(changePct) >= alertThresholdPct) {
        const direction = changePct > 0 ? "up" : "down";
        db.prepare(
          `INSERT INTO notifications (user_id, stock_id, type, title, message)
           SELECT user_id, ?, 'PRICE_ALERT', ?, ? FROM watchlist WHERE stock_id = ?`
        ).run(
          stock.id,
          `${stock.symbol} is ${direction} ${Math.abs(changePct)}%`,
          `${stock.name} moved from ₹${stock.price.toLocaleString("en-IN")} to ₹${newPrice.toLocaleString("en-IN")}.`,
          stock.id
        );
      }
    }
  });

  run();
  cacheInvalidate("market:");
  return { updated: changes.length, changes };
}

/* ------------------------------------------------------------------ */
/*  Background ticker                                                  */
/* ------------------------------------------------------------------ */

let timer = null;

export function startMarketTicker() {
  const seconds = config.market.tickSeconds;
  if (timer || !seconds || seconds <= 0) return false;

  timer = setInterval(() => {
    try {
      tickMarket();
    } catch (err) {
      console.error("[market] tick failed:", err);
    }
  }, seconds * 1000);
  timer.unref(); // never keep the process alive just for the ticker
  return true;
}

export function stopMarketTicker() {
  if (timer) clearInterval(timer);
  timer = null;
}
