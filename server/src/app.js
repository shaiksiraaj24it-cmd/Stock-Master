import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.js";
import stockRoutes from "./routes/stocks.js";
import marketRoutes from "./routes/market.js";
import portfolioRoutes from "./routes/portfolio.js";
import tradeRoutes from "./routes/trades.js";
import transactionRoutes from "./routes/transactions.js";
import watchlistRoutes from "./routes/watchlist.js";
import notificationRoutes from "./routes/notifications.js";
import learningRoutes from "./routes/learning.js";

/** Builds the Express app. (Kept separate from index.js so tests can use it.) */
export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: config.corsOrigins }));
  app.use(express.json({ limit: "10kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/stocks", stockRoutes);
  app.use("/api/market", marketRoutes);
  app.use("/api/portfolio", portfolioRoutes);
  app.use("/api/trade", tradeRoutes);
  app.use("/api/transactions", transactionRoutes);
  app.use("/api/watchlist", watchlistRoutes);
  app.use("/api/notifications", notificationRoutes);
  app.use("/api/learning", learningRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
