import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import * as trading from "../services/tradingService.js";
import { parse } from "../utils/validate.js";

const router = Router();
router.use(requireAuth);

const listQuery = z.object({
  type: z.enum(["BUY", "SELL"]).optional(),
  stockId: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

router.get("/", (req, res) => {
  res.json(trading.listTransactions(req.user.id, parse(listQuery, req.query)));
});

export default router;
