import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Point the app at a throwaway database BEFORE any app code is imported.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "stockmaster-test-"));
process.env.NODE_ENV = "test";
process.env.DATABASE_PATH = path.join(tmpDir, "test.db");
process.env.MARKET_TICK_SECONDS = "0";
process.env.STARTING_BALANCE = "100000";

let server, baseUrl, db, config, market;

async function api(method, url, { token, body, raw } = {}) {
  const res = await fetch(baseUrl + url, {
    method,
    headers: {
      ...(body !== undefined || raw !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: raw ?? (body !== undefined ? JSON.stringify(body) : undefined),
  });
  const text = await res.text();
  return { status: res.status, body: text ? JSON.parse(text) : null };
}

let counter = 0;
async function newUser(name = "Test User") {
  counter += 1;
  const { status, body } = await api("POST", "/api/auth/register", {
    body: { name, email: `user${counter}@example.com`, password: "password123" },
  });
  assert.equal(status, 201);
  return { token: body.token, id: body.user.id, email: body.user.email };
}

const stockBySymbol = (symbol) => db.prepare("SELECT * FROM stocks WHERE symbol = ?").get(symbol);
const setPrice = (symbol, price) =>
  db.prepare("UPDATE stocks SET price = ?, previous_price = ? WHERE symbol = ?").run(price, price, symbol);

before(async () => {
  ({ config } = await import("../src/config.js"));
  const { getDb } = await import("../src/db/connection.js");
  const { migrate } = await import("../src/db/migrate.js");
  const { seedStocks } = await import("../src/db/seed.js");
  const { createApp } = await import("../src/app.js");
  market = await import("../src/services/marketService.js");

  db = getDb();
  migrate(db);
  seedStocks(db);

  await new Promise((resolve) => {
    server = createApp().listen(0, resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  const { closeDb } = await import("../src/db/connection.js");
  closeDb();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

/* ------------------------------------------------------------------ */

test("health check and unknown routes", async () => {
  assert.equal((await api("GET", "/api/health")).body.status, "ok");
  const missing = await api("GET", "/api/nope");
  assert.equal(missing.status, 404);
  assert.equal(missing.body.error.code, "NOT_FOUND");
});

test("malformed JSON gets a clean 400", async () => {
  const res = await api("POST", "/api/auth/login", { raw: "{not json" });
  assert.equal(res.status, 400);
  assert.equal(res.body.error.code, "INVALID_JSON");
});

test("schema creates every expected table", () => {
  const tables = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'")
    .all()
    .map((t) => t.name);
  for (const expected of [
    "users", "stocks", "market_prices", "market_cache", "portfolio",
    "transactions", "watchlist", "notifications", "lesson_progress", "quiz_attempts",
  ]) {
    assert.ok(tables.includes(expected), `missing table ${expected}`);
  }
});

/* ---------------------------- AUTH -------------------------------- */

test("register validates input", async () => {
  const bad = await api("POST", "/api/auth/register", {
    body: { name: "", email: "not-an-email", password: "short" },
  });
  assert.equal(bad.status, 400);
  assert.equal(bad.body.error.code, "VALIDATION_ERROR");
  const fields = bad.body.error.details.map((d) => d.field).sort();
  assert.deepEqual(fields, ["email", "name", "password"]);
});

test("register, login, /me and duplicate handling", async () => {
  const reg = await api("POST", "/api/auth/register", {
    body: { name: "Asha", email: "Asha@Example.com", password: "supersecret" },
  });
  assert.equal(reg.status, 201);
  assert.equal(reg.body.user.email, "asha@example.com"); // normalised
  assert.equal(reg.body.user.balance, 100000);
  assert.equal(reg.body.user.password_hash, undefined);
  assert.equal(reg.body.user.passwordHash, undefined);

  const dupe = await api("POST", "/api/auth/register", {
    body: { name: "Asha 2", email: "ASHA@example.com", password: "supersecret" },
  });
  assert.equal(dupe.status, 409);
  assert.equal(dupe.body.error.code, "EMAIL_TAKEN");

  const wrong = await api("POST", "/api/auth/login", {
    body: { email: "asha@example.com", password: "wrong-password" },
  });
  assert.equal(wrong.status, 401);
  const unknown = await api("POST", "/api/auth/login", {
    body: { email: "nobody@example.com", password: "wrong-password" },
  });
  assert.equal(unknown.status, 401);
  assert.equal(unknown.body.error.message, wrong.body.error.message); // no user enumeration

  const login = await api("POST", "/api/auth/login", {
    body: { email: "asha@example.com", password: "supersecret" },
  });
  assert.equal(login.status, 200);

  const me = await api("GET", "/api/auth/me", { token: login.body.token });
  assert.equal(me.body.user.name, "Asha");
});

test("passwords are stored hashed", () => {
  const row = db.prepare("SELECT password_hash FROM users WHERE email = 'asha@example.com'").get();
  assert.match(row.password_hash, /^\$2[aby]\$/);
});

test("protected routes reject missing / bad tokens", async () => {
  for (const url of ["/api/portfolio", "/api/transactions", "/api/watchlist", "/api/notifications", "/api/learning/progress"]) {
    assert.equal((await api("GET", url)).status, 401, url);
    assert.equal((await api("GET", url, { token: "garbage" })).status, 401, url);
  }
});

/* ---------------------------- STOCKS ------------------------------ */

test("stocks are public and match the frontend shape", async () => {
  const { status, body } = await api("GET", "/api/stocks");
  assert.equal(status, 200);
  assert.equal(body.count, 7);

  const tcs = body.stocks.find((s) => s.symbol === "TCS");
  assert.equal(tcs.name, "Tata Consultancy Services");
  assert.equal(tcs.marketCap, "12.5 Lakh Cr");
  assert.equal(tcs.dividend, "1.25%");
  assert.equal(tcs.pe, 28.5);
  assert.ok("previousPrice" in tcs && "price" in tcs && "sector" in tcs);
});

test("stock search, sector filter, lookup by id/symbol, history", async () => {
  const search = await api("GET", "/api/stocks?search=bank");
  // "HDFC Bank" and "State Bank of India" both contain "bank"
  assert.deepEqual(search.body.stocks.map((s) => s.symbol).sort(), ["HDFC", "SBIN"]);
  const narrow = await api("GET", "/api/stocks?search=hdfc");
  assert.deepEqual(narrow.body.stocks.map((s) => s.symbol), ["HDFC"]);

  const sector = await api("GET", "/api/stocks?sector=Banking");
  assert.deepEqual(sector.body.stocks.map((s) => s.symbol).sort(), ["HDFC", "SBIN"]);

  // '%' must be treated literally, not as a wildcard
  assert.equal((await api("GET", "/api/stocks?search=%25")).body.count, 0);

  const bySymbol = await api("GET", "/api/stocks/infy");
  assert.equal(bySymbol.body.stock.symbol, "INFY");
  const byId = await api("GET", `/api/stocks/${bySymbol.body.stock.id}`);
  assert.equal(byId.body.stock.symbol, "INFY");
  assert.equal((await api("GET", "/api/stocks/DOESNOTEXIST")).status, 404);

  const hist = await api("GET", "/api/stocks/TCS/history?limit=10");
  assert.equal(hist.body.history.length, 10);
  const times = hist.body.history.map((h) => h.recordedAt);
  assert.deepEqual(times, [...times].sort(), "history is oldest-first");
  assert.equal(hist.body.history.at(-1).price, 3450); // newest = current price
  assert.equal((await api("GET", "/api/stocks/TCS/history?limit=0")).status, 400);
});

/* ---------------------------- TRADING ----------------------------- */

test("buy: uses server price, updates balance, holding and history", async () => {
  setPrice("TCS", 3450);
  const u = await newUser();
  const tcs = stockBySymbol("TCS");

  // The client tries to sneak in its own price - it must be ignored.
  const res = await api("POST", "/api/trade/buy", {
    token: u.token,
    body: { stockId: tcs.id, quantity: 10, price: 1 },
  });
  assert.equal(res.status, 201);
  assert.equal(res.body.transaction.type, "BUY");
  assert.equal(res.body.transaction.price, 3450);
  assert.equal(res.body.transaction.totalAmount, 34500);
  assert.equal(res.body.balance, 65500);
  assert.deepEqual(res.body.portfolio[tcs.id], { quantity: 10, averagePrice: 3450 });
  assert.equal(res.body.summary.holdingsCount, 1);

  const { body: tx } = await api("GET", "/api/transactions", { token: u.token });
  assert.equal(tx.total, 1);
  assert.equal(tx.transactions[0].symbol, "TCS");
  assert.equal(tx.transactions[0].balanceAfter, 65500);
});

test("buy again at a new price -> weighted average; sell -> realised P&L", async () => {
  setPrice("TCS", 3450);
  const u = await newUser();
  const tcs = stockBySymbol("TCS");

  await api("POST", "/api/trade/buy", { token: u.token, body: { stockId: tcs.id, quantity: 10 } });
  setPrice("TCS", 3600);
  const second = await api("POST", "/api/trade/buy", { token: u.token, body: { stockId: tcs.id, quantity: 10 } });
  assert.deepEqual(second.body.portfolio[tcs.id], { quantity: 20, averagePrice: 3525 });
  assert.equal(second.body.balance, 100000 - 34500 - 36000);

  // sell 5 at 3600 -> (3600 - 3525) * 5 = 375 profit
  const sell = await api("POST", "/api/trade/sell", { token: u.token, body: { stockId: tcs.id, quantity: 5 } });
  assert.equal(sell.status, 201);
  assert.equal(sell.body.transaction.realizedPnl, 375);
  assert.equal(sell.body.portfolio[tcs.id].quantity, 15);
  assert.equal(sell.body.portfolio[tcs.id].averagePrice, 3525); // avg unchanged by a sell
  assert.equal(sell.body.balance, 100000 - 34500 - 36000 + 18000);
  assert.equal(sell.body.summary.realizedPnl, 375);

  // selling the rest removes the holding entirely
  const rest = await api("POST", "/api/trade/sell", { token: u.token, body: { stockId: tcs.id, quantity: 15 } });
  assert.equal(rest.body.portfolio[tcs.id], undefined);
  assert.equal(rest.body.holdings.length, 0);
  assert.equal(db.prepare("SELECT COUNT(*) n FROM portfolio WHERE user_id = ?").get(u.id).n, 0);

  // a loss is recorded as negative P&L
  setPrice("TCS", 3000);
  await api("POST", "/api/trade/buy", { token: u.token, body: { stockId: tcs.id, quantity: 1 } });
  setPrice("TCS", 2900);
  const loss = await api("POST", "/api/trade/sell", { token: u.token, body: { stockId: tcs.id, quantity: 1 } });
  assert.equal(loss.body.transaction.realizedPnl, -100);
  setPrice("TCS", 3450);
});

test("insufficient funds / shares are rejected and change nothing", async () => {
  setPrice("TCS", 3450);
  const u = await newUser();
  const tcs = stockBySymbol("TCS");

  const tooMany = await api("POST", "/api/trade/buy", { token: u.token, body: { stockId: tcs.id, quantity: 1000 } });
  assert.equal(tooMany.status, 400);
  assert.equal(tooMany.body.error.code, "INSUFFICIENT_FUNDS");

  const notOwned = await api("POST", "/api/trade/sell", { token: u.token, body: { stockId: tcs.id, quantity: 1 } });
  assert.equal(notOwned.body.error.code, "NOT_OWNED");

  await api("POST", "/api/trade/buy", { token: u.token, body: { stockId: tcs.id, quantity: 2 } });
  const oversell = await api("POST", "/api/trade/sell", { token: u.token, body: { stockId: tcs.id, quantity: 3 } });
  assert.equal(oversell.body.error.code, "INSUFFICIENT_SHARES");

  const p = await api("GET", "/api/portfolio", { token: u.token });
  assert.equal(p.body.balance, 100000 - 6900);
  assert.equal(p.body.portfolio[tcs.id].quantity, 2);
  assert.equal(db.prepare("SELECT COUNT(*) n FROM transactions WHERE user_id = ?").get(u.id).n, 1);
});

test("invalid trade input is rejected", async () => {
  const u = await newUser();
  const tcs = stockBySymbol("TCS");
  for (const quantity of [0, -5, 1.5, "abc", null, 1_000_000]) {
    const r = await api("POST", "/api/trade/buy", { token: u.token, body: { stockId: tcs.id, quantity } });
    assert.equal(r.status, 400, `quantity=${JSON.stringify(quantity)}`);
    assert.equal(r.body.error.code, "VALIDATION_ERROR");
  }
  assert.equal((await api("POST", "/api/trade/buy", { token: u.token, body: { quantity: 1 } })).status, 400);
  assert.equal((await api("POST", "/api/trade/buy", { token: u.token, body: { stockId: 9999, quantity: 1 } })).status, 404);
});

test("users cannot see each other's money or trades", async () => {
  const a = await newUser("A");
  const b = await newUser("B");
  const tcs = stockBySymbol("TCS");
  await api("POST", "/api/trade/buy", { token: a.token, body: { stockId: tcs.id, quantity: 1 } });

  const pb = await api("GET", "/api/portfolio", { token: b.token });
  assert.equal(pb.body.balance, 100000);
  assert.deepEqual(pb.body.portfolio, {});
  assert.equal((await api("GET", "/api/transactions", { token: b.token })).body.total, 0);
  assert.equal((await api("POST", "/api/trade/sell", { token: b.token, body: { stockId: tcs.id, quantity: 1 } })).status, 400);
});

test("50 simultaneous buys never overspend the balance", async () => {
  setPrice("TCS", 3450);
  const u = await newUser();
  const tcs = stockBySymbol("TCS");

  const results = await Promise.all(
    Array.from({ length: 50 }, () =>
      api("POST", "/api/trade/buy", { token: u.token, body: { stockId: tcs.id, quantity: 1 } })
    )
  );
  const ok = results.filter((r) => r.status === 201).length;
  const rejected = results.filter((r) => r.status === 400).length;

  assert.equal(ok, 28); // floor(100000 / 3450)
  assert.equal(rejected, 22);

  const p = await api("GET", "/api/portfolio", { token: u.token });
  assert.equal(p.body.balance, 100000 - 28 * 3450);
  assert.equal(p.body.portfolio[tcs.id].quantity, 28);
  assert.ok(p.body.balance >= 0);
  assert.equal(db.prepare("SELECT COUNT(*) n FROM transactions WHERE user_id = ?").get(u.id).n, 28);
});

test("portfolio totals and reset", async () => {
  setPrice("TCS", 3450);
  setPrice("ITC", 455);
  const u = await newUser();
  await api("POST", "/api/trade/buy", { token: u.token, body: { stockId: stockBySymbol("TCS").id, quantity: 2 } });
  await api("POST", "/api/trade/buy", { token: u.token, body: { stockId: stockBySymbol("ITC").id, quantity: 10 } });
  setPrice("ITC", 500);

  const p = await api("GET", "/api/portfolio", { token: u.token });
  assert.equal(p.body.summary.invested, 6900 + 4550);
  assert.equal(p.body.summary.portfolioValue, 6900 + 5000);
  assert.equal(p.body.summary.unrealizedPnl, 450);
  assert.equal(p.body.summary.totalValue, 100000 - 11450 + 11900);
  assert.equal(p.body.summary.totalReturn, 450);
  setPrice("ITC", 455);

  const reset = await api("POST", "/api/portfolio/reset", { token: u.token });
  assert.equal(reset.body.balance, 100000);
  assert.equal(reset.body.holdings.length, 0);
  assert.equal((await api("GET", "/api/transactions", { token: u.token })).body.total, 2); // history kept
});

test("transaction history filters and paginates", async () => {
  setPrice("TCS", 3450);
  const u = await newUser();
  const tcs = stockBySymbol("TCS");
  for (let i = 0; i < 3; i += 1) {
    await api("POST", "/api/trade/buy", { token: u.token, body: { stockId: tcs.id, quantity: 1 } });
  }
  await api("POST", "/api/trade/sell", { token: u.token, body: { stockId: tcs.id, quantity: 1 } });

  const all = await api("GET", "/api/transactions", { token: u.token });
  assert.equal(all.body.total, 4);
  assert.equal(all.body.transactions[0].type, "SELL"); // newest first

  assert.equal((await api("GET", "/api/transactions?type=BUY", { token: u.token })).body.total, 3);
  const page = await api("GET", "/api/transactions?limit=2&offset=2", { token: u.token });
  assert.equal(page.body.transactions.length, 2);
  assert.equal(page.body.total, 4);
  assert.equal((await api("GET", "/api/transactions?type=HOLD", { token: u.token })).status, 400);
});

/* ---------------------------- WATCHLIST --------------------------- */

test("watchlist toggle / list / remove", async () => {
  const u = await newUser();
  const tcs = stockBySymbol("TCS");
  const infy = stockBySymbol("INFY");

  const add = await api("POST", `/api/watchlist/${tcs.id}/toggle`, { token: u.token });
  assert.deepEqual(add.body, { watched: true, watchlist: [tcs.id] });
  await api("POST", `/api/watchlist/${infy.id}/toggle`, { token: u.token });

  const list = await api("GET", "/api/watchlist", { token: u.token });
  assert.deepEqual(list.body.watchlist, [tcs.id, infy.id]);
  assert.deepEqual(list.body.stocks.map((s) => s.symbol), ["TCS", "INFY"]);

  const off = await api("POST", `/api/watchlist/${tcs.id}/toggle`, { token: u.token });
  assert.deepEqual(off.body, { watched: false, watchlist: [infy.id] });

  const del = await api("DELETE", `/api/watchlist/${infy.id}`, { token: u.token });
  assert.deepEqual(del.body.watchlist, []);

  assert.equal((await api("POST", "/api/watchlist/9999/toggle", { token: u.token })).status, 404);
  assert.equal((await api("POST", "/api/watchlist/abc/toggle", { token: u.token })).status, 400);
});

/* ------------------- MARKET, CACHE, NOTIFICATIONS ----------------- */

test("market overview is cached, and a tick invalidates the cache", async () => {
  const first = await api("GET", "/api/market/overview");
  const second = await api("GET", "/api/market/overview");
  assert.equal(first.body.generatedAt, second.body.generatedAt, "second call served from cache");
  assert.equal(first.body.totalStocks, 7);
  assert.ok(db.prepare("SELECT COUNT(*) n FROM market_cache WHERE cache_key = 'market:overview'").get().n === 1);

  const u = await newUser();
  await new Promise((r) => setTimeout(r, 5)); // make sure timestamps differ
  await api("POST", "/api/market/tick", { token: u.token });
  const third = await api("GET", "/api/market/overview");
  assert.notEqual(third.body.generatedAt, first.body.generatedAt, "cache rebuilt after tick");
});

test("expired cache entries are ignored", async () => {
  const cache = await import("../src/services/cacheService.js");
  cache.cacheSet("test:key", { a: 1 }, 60);
  assert.deepEqual(cache.cacheGet("test:key"), { a: 1 });
  db.prepare("UPDATE market_cache SET expires_at = '2000-01-01T00:00:00.000Z' WHERE cache_key = 'test:key'").run();
  assert.equal(cache.cacheGet("test:key"), undefined);
  assert.ok(cache.purgeExpiredCache() >= 1);
});

test("tick moves prices, records history and only alerts watchers", async () => {
  const watcher = await newUser("Watcher");
  const bystander = await newUser("Bystander");
  const infy = stockBySymbol("INFY");
  await api("POST", `/api/watchlist/${infy.id}/toggle`, { token: watcher.token });

  const before = await api("GET", "/api/stocks/INFY");
  const historyBefore = (await api("GET", "/api/stocks/INFY/history?limit=1000")).body.history.length;

  const saved = { ...config.market };
  config.market.volatilityPct = 10;
  config.market.alertThresholdPct = 0.0001; // every move is "big"
  try {
    // deterministic: every stock goes up exactly 5%
    const result = market.tickMarket({ random: () => 0.75 });
    assert.equal(result.updated, 7);
  } finally {
    Object.assign(config.market, saved);
  }

  const after = await api("GET", "/api/stocks/INFY");
  assert.equal(after.body.stock.previousPrice, before.body.stock.price);
  assert.equal(after.body.stock.price, Math.round(before.body.stock.price * 1.05 * 100) / 100);
  assert.equal((await api("GET", "/api/stocks/INFY/history?limit=1000")).body.history.length, historyBefore + 1);

  const w = await api("GET", "/api/notifications?unread=true", { token: watcher.token });
  const alerts = w.body.notifications.filter((n) => n.type === "PRICE_ALERT");
  assert.equal(alerts.length, 1);
  assert.match(alerts[0].title, /^INFY is up/);
  assert.equal(alerts[0].stockId, infy.id);

  const b = await api("GET", "/api/notifications", { token: bystander.token });
  assert.equal(b.body.notifications.filter((n) => n.type === "PRICE_ALERT").length, 0);

  setPrice("INFY", 1520);
});

test("notifications: list, unread count, mark read, isolation", async () => {
  const a = await newUser("A");
  const b = await newUser("B");
  const tcs = stockBySymbol("TCS");
  setPrice("TCS", 3450);
  await api("POST", "/api/trade/buy", { token: a.token, body: { stockId: tcs.id, quantity: 1 } });

  const list = await api("GET", "/api/notifications", { token: a.token });
  // welcome + trade
  assert.equal(list.body.unreadCount, 2);
  assert.equal(list.body.notifications[0].type, "TRADE");

  const one = list.body.notifications[0].id;
  assert.equal((await api("POST", `/api/notifications/${one}/read`, { token: b.token })).status, 404); // not B's
  assert.equal((await api("POST", `/api/notifications/${one}/read`, { token: a.token })).status, 200);
  assert.equal((await api("GET", "/api/notifications", { token: a.token })).body.unreadCount, 1);

  const all = await api("POST", "/api/notifications/read-all", { token: a.token });
  assert.equal(all.body.marked, 1);
  assert.equal((await api("GET", "/api/notifications?unread=true", { token: a.token })).body.notifications.length, 0);
});

test("manual tick can be disabled", async () => {
  const u = await newUser();
  config.market.allowManualTick = false;
  try {
    assert.equal((await api("POST", "/api/market/tick", { token: u.token })).status, 403);
  } finally {
    config.market.allowManualTick = true;
  }
  assert.equal((await api("POST", "/api/market/tick")).status, 401);
});

/* ---------------------------- LEARNING ---------------------------- */

test("lesson progress is saved once per lesson", async () => {
  const u = await newUser();
  const first = await api("POST", "/api/learning/lessons/101/complete", { token: u.token });
  assert.equal(first.body.alreadyCompleted, false);
  const again = await api("POST", "/api/learning/lessons/101/complete", { token: u.token });
  assert.equal(again.body.alreadyCompleted, true);
  await api("POST", "/api/learning/lessons/102/complete", { token: u.token });

  const progress = await api("GET", "/api/learning/progress", { token: u.token });
  assert.deepEqual(progress.body.completedLessons, [101, 102]);

  const notes = await api("GET", "/api/notifications", { token: u.token });
  assert.equal(notes.body.notifications.filter((n) => n.type === "LEARNING").length, 2); // not 3

  assert.equal((await api("POST", "/api/learning/lessons/abc/complete", { token: u.token })).status, 400);
});

test("quiz attempts are validated and summarised", async () => {
  const u = await newUser();
  const bad = await api("POST", "/api/learning/quiz-attempts", { token: u.token, body: { score: 5, total: 4 } });
  assert.equal(bad.status, 400);
  assert.equal((await api("POST", "/api/learning/quiz-attempts", { token: u.token, body: { score: -1, total: 4 } })).status, 400);

  const a1 = await api("POST", "/api/learning/quiz-attempts", { token: u.token, body: { moduleId: 1, score: 3, total: 4 } });
  assert.equal(a1.status, 201);
  assert.equal(a1.body.attempt.percentage, 75);
  await api("POST", "/api/learning/quiz-attempts", { token: u.token, body: { score: 4, total: 4 } });

  const progress = await api("GET", "/api/learning/progress", { token: u.token });
  assert.equal(progress.body.quiz.attempts, 2);
  assert.equal(progress.body.quiz.bestPercentage, 100);
  assert.equal(progress.body.quiz.averagePercentage, 87.5);

  const filtered = await api("GET", "/api/learning/quiz-attempts?moduleId=1", { token: u.token });
  assert.equal(filtered.body.attempts.length, 1);
});
