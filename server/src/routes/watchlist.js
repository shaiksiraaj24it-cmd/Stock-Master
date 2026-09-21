import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import * as watchlist from "../services/watchlistService.js";
import { parse } from "../utils/validate.js";

const router = Router();
router.use(requireAuth);

const stockParam = z.object({ stockId: z.coerce.number().int().positive() });

router.get("/", (req, res) => {
  res.json(watchlist.getWatchlist(req.user.id));
});

router.post("/:stockId/toggle", (req, res) => {
  const { stockId } = parse(stockParam, req.params);
  res.json(watchlist.toggleWatchlist(req.user.id, stockId));
});

router.delete("/:stockId", (req, res) => {
  const { stockId } = parse(stockParam, req.params);
  res.json(watchlist.removeFromWatchlist(req.user.id, stockId));
});

export default router;
