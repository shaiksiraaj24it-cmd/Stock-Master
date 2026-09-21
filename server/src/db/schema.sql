-- =====================================================================
--  StockMaster database schema (SQLite)
--  Safe to run repeatedly: every statement uses IF NOT EXISTS.
--  Timestamps are stored as UTC ISO-8601 text, e.g. 2026-09-21T10:15:30.123Z
-- =====================================================================

PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------------------
-- USERS
-- One row per registered learner. `balance` is the virtual cash they can
-- spend in the simulator.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  name              TEXT    NOT NULL,
  email             TEXT    NOT NULL UNIQUE COLLATE NOCASE,
  password_hash     TEXT    NOT NULL,
  balance           REAL    NOT NULL DEFAULT 100000 CHECK (balance >= 0),
  starting_balance  REAL    NOT NULL DEFAULT 100000 CHECK (starting_balance >= 0),
  created_at        TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at        TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- ---------------------------------------------------------------------
-- STOCKS
-- The companies available in the simulator. `price` is the current
-- simulated price, `previous_price` is the price before the last update
-- (the frontend uses the two to show the ▲/▼ change).
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS stocks (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  symbol          TEXT    NOT NULL UNIQUE COLLATE NOCASE,
  name            TEXT    NOT NULL,
  sector          TEXT,
  price           REAL    NOT NULL CHECK (price > 0),
  previous_price  REAL    NOT NULL CHECK (previous_price > 0),
  market_cap_cr   REAL,            -- market capitalisation in ₹ crore
  pe_ratio        REAL,
  dividend_yield  REAL,            -- percent, e.g. 1.25 means 1.25%
  description     TEXT,
  is_active       INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at      TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at      TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- ---------------------------------------------------------------------
-- MARKET_PRICES
-- Price history. A new row is written every time a stock's price changes
-- (market tick). Used for charts and for "how did this stock move" views.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS market_prices (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  stock_id     INTEGER NOT NULL REFERENCES stocks(id) ON DELETE CASCADE,
  price        REAL    NOT NULL CHECK (price > 0),
  recorded_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_market_prices_stock_time
  ON market_prices (stock_id, recorded_at);

-- ---------------------------------------------------------------------
-- MARKET_CACHE
-- Key/value cache for expensive market calculations (overview, movers).
-- `payload` holds JSON. Rows are ignored once `expires_at` has passed and
-- are cleared whenever the market moves.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS market_cache (
  cache_key   TEXT PRIMARY KEY,
  payload     TEXT NOT NULL,
  expires_at  TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_market_cache_expires ON market_cache (expires_at);

-- ---------------------------------------------------------------------
-- PORTFOLIO
-- A user's current holdings: one row per (user, stock) they own.
-- A row is deleted when the user sells their last share.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS portfolio (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id        INTEGER NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  stock_id       INTEGER NOT NULL REFERENCES stocks(id) ON DELETE RESTRICT,
  quantity       INTEGER NOT NULL CHECK (quantity > 0),
  average_price  REAL    NOT NULL CHECK (average_price > 0),
  updated_at     TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  UNIQUE (user_id, stock_id)
);
CREATE INDEX IF NOT EXISTS idx_portfolio_user ON portfolio (user_id);

-- ---------------------------------------------------------------------
-- TRANSACTIONS
-- Immutable trade history. Every buy and sell adds one row and none are
-- ever edited. `price` is the price actually used for the trade.
-- `realized_pnl` is only filled for SELL rows.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS transactions (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id        INTEGER NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  stock_id       INTEGER NOT NULL REFERENCES stocks(id) ON DELETE RESTRICT,
  type           TEXT    NOT NULL CHECK (type IN ('BUY', 'SELL')),
  quantity       INTEGER NOT NULL CHECK (quantity > 0),
  price          REAL    NOT NULL CHECK (price > 0),
  total_amount   REAL    NOT NULL CHECK (total_amount > 0),
  realized_pnl   REAL,
  balance_after  REAL    NOT NULL,
  created_at     TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_transactions_user_time
  ON transactions (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_stock ON transactions (stock_id);

-- ---------------------------------------------------------------------
-- WATCHLIST
-- Stocks a user is following (the ⭐ button in the app).
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS watchlist (
  user_id     INTEGER NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  stock_id    INTEGER NOT NULL REFERENCES stocks(id) ON DELETE CASCADE,
  created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  PRIMARY KEY (user_id, stock_id)
);

-- ---------------------------------------------------------------------
-- NOTIFICATIONS
-- Alerts shown behind the 🔔 in the navbar: trade confirmations, big
-- price moves on watched stocks, learning milestones.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  stock_id    INTEGER          REFERENCES stocks(id) ON DELETE SET NULL,
  type        TEXT    NOT NULL CHECK (type IN ('TRADE', 'PRICE_ALERT', 'LEARNING', 'SYSTEM')),
  title       TEXT    NOT NULL,
  message     TEXT    NOT NULL,
  is_read     INTEGER NOT NULL DEFAULT 0 CHECK (is_read IN (0, 1)),
  created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read
  ON notifications (user_id, is_read, created_at DESC);

-- ---------------------------------------------------------------------
-- LESSON_PROGRESS
-- Replaces the `stockmaster_completed_lessons` localStorage entry.
-- `lesson_id` matches the ids in src/data/lessons.js (101, 102, ...).
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS lesson_progress (
  user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id     INTEGER NOT NULL,
  completed_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  PRIMARY KEY (user_id, lesson_id)
);

-- ---------------------------------------------------------------------
-- QUIZ_ATTEMPTS
-- One row each time a user finishes a quiz.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id   INTEGER,                      -- NULL = general quiz
  score       INTEGER NOT NULL CHECK (score >= 0),
  total       INTEGER NOT NULL CHECK (total > 0),
  created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  CHECK (score <= total)
);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON quiz_attempts (user_id, created_at DESC);
