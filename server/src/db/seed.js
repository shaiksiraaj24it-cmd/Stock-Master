import { pathToFileURL } from "node:url";
import { getDb, closeDb } from "./connection.js";
import { migrate } from "./migrate.js";
import { round2 } from "../utils/money.js";

/**
 * Same companies as src/data/stocks.js in the frontend.
 * marketCapCr is in ₹ crore (12.5 Lakh Cr = 1,250,000 Cr).
 */
export const SEED_STOCKS = [
  {
    symbol: "TCS", name: "Tata Consultancy Services", sector: "Information Technology",
    price: 3450, previousPrice: 3400, marketCapCr: 1250000, pe: 28.5, dividend: 1.25,
    description: "TCS is one of India's largest IT services companies.",
  },
  {
    symbol: "INFY", name: "Infosys", sector: "Information Technology",
    price: 1520, previousPrice: 1500, marketCapCr: 630000, pe: 25.4, dividend: 2.1,
    description: "Infosys provides IT consulting and digital services.",
  },
  {
    symbol: "RELIANCE", name: "Reliance Industries", sector: "Conglomerate",
    price: 2890, previousPrice: 2920, marketCapCr: 1960000, pe: 29.1, dividend: 0.35,
    description: "Reliance operates across energy, retail and telecommunications.",
  },
  {
    symbol: "HDFC", name: "HDFC Bank", sector: "Banking",
    price: 1680, previousPrice: 1640, marketCapCr: 1280000, pe: 19.7, dividend: 1.1,
    description: "HDFC Bank is one of India's major private sector banks.",
  },
  {
    symbol: "ITC", name: "ITC Limited", sector: "FMCG",
    price: 455, previousPrice: 448, marketCapCr: 570000, pe: 27.2, dividend: 3.2,
    description: "ITC operates across FMCG, hotels, paper and agribusiness.",
  },
  {
    symbol: "WIPRO", name: "Wipro Limited", sector: "Information Technology",
    price: 520, previousPrice: 530, marketCapCr: 270000, pe: 22.8, dividend: 1.8,
    description: "Wipro provides technology and consulting services.",
  },
  {
    symbol: "SBIN", name: "State Bank of India", sector: "Banking",
    price: 820, previousPrice: 800, marketCapCr: 730000, pe: 11.5, dividend: 1.65,
    description: "SBI is one of India's largest banking institutions.",
  },
];

/** Small deterministic PRNG so the demo history looks the same every time. */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HISTORY_POINTS = 30;
const HOUR_MS = 60 * 60 * 1000;

/**
 * Inserts the starter stocks (plus a short synthetic price history so charts
 * have something to draw). Does nothing if stocks already exist.
 * @returns {number} how many stocks were inserted
 */
export function seedStocks(db = getDb()) {
  const existing = db.prepare("SELECT COUNT(*) AS n FROM stocks").get().n;
  if (existing > 0) return 0;

  const insertStock = db.prepare(`
    INSERT INTO stocks (symbol, name, sector, price, previous_price,
                        market_cap_cr, pe_ratio, dividend_yield, description)
    VALUES (@symbol, @name, @sector, @price, @previousPrice,
            @marketCapCr, @pe, @dividend, @description)
  `);
  const insertPrice = db.prepare(
    "INSERT INTO market_prices (stock_id, price, recorded_at) VALUES (?, ?, ?)"
  );

  const run = db.transaction(() => {
    const now = Date.now();

    SEED_STOCKS.forEach((stock, index) => {
      const { lastInsertRowid } = insertStock.run(stock);
      const stockId = Number(lastInsertRowid);
      const random = mulberry32(index + 1);

      // Walk backwards from the previous price, then reverse into time order.
      const series = [stock.previousPrice];
      for (let i = 1; i < HISTORY_POINTS; i += 1) {
        const step = (random() - 0.5) * 0.03; // ±1.5%
        series.push(Math.max(1, round2(series[i - 1] * (1 - step))));
      }
      series.reverse();
      series.push(stock.price); // newest point = current price

      series.forEach((price, i) => {
        const at = new Date(now - (series.length - 1 - i) * HOUR_MS).toISOString();
        insertPrice.run(stockId, price, at);
      });
    });
  });

  run();
  return SEED_STOCKS.length;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  migrate();
  const n = seedStocks();
  console.log(n ? `Seeded ${n} stocks.` : "Stocks already exist - nothing to seed.");
  closeDb();
}
