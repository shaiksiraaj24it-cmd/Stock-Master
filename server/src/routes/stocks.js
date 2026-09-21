import { Router } from "express";
import { z } from "zod";
import * as market from "../services/marketService.js";
import { asyncHandler, parse } from "../utils/validate.js";

const router = Router();

const listQuery = z.object({
  search: z.string().trim().max(60).optional(),
  sector: z.string().trim().max(60).optional(),
});
const historyQuery = z.object({
  limit: z.coerce.number().int().min(1).max(1000).default(100),
});

// Public: anyone can browse the market.
router.get(
  "/",
  asyncHandler((req, res) => {
    const stocks = market.listStocks(parse(listQuery, req.query));
    res.json({ count: stocks.length, stocks });
  })
);

router.get("/:idOrSymbol", (req, res) => {
  res.json({ stock: market.getStock(req.params.idOrSymbol) });
});

router.get("/:idOrSymbol/history", (req, res) => {
  const { limit } = parse(historyQuery, req.query);
  res.json(market.getPriceHistory(req.params.idOrSymbol, limit));
});

export default router;
