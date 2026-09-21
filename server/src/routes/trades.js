import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import * as trading from "../services/tradingService.js";
import { parse } from "../utils/validate.js";

const router = Router();
router.use(requireAuth);

// Note: no `price` field - the server always trades at the current price.
const tradeSchema = z.object({
  stockId: z.coerce.number().int().positive("stockId must be a positive whole number."),
  quantity: z.coerce
    .number()
    .int("Quantity must be a whole number.")
    .min(1, "Quantity must be at least 1.")
    .max(100000, "Quantity is too large."),
});

router.post("/buy", (req, res) => {
  const { stockId, quantity } = parse(tradeSchema, req.body);
  res.status(201).json(trading.buyStock(req.user.id, stockId, quantity));
});

router.post("/sell", (req, res) => {
  const { stockId, quantity } = parse(tradeSchema, req.body);
  res.status(201).json(trading.sellStock(req.user.id, stockId, quantity));
});

export default router;
