import { Router } from "express";
import { config } from "../config.js";
import { requireAuth } from "../middleware/auth.js";
import * as market from "../services/marketService.js";
import { forbidden } from "../utils/httpError.js";

const router = Router();

router.get("/overview", (_req, res) => {
  res.json(market.getOverview());
});

/** Moves every price once, right now. Handy for demos and for testing alerts. */
router.post("/tick", requireAuth, (_req, res) => {
  if (!config.market.allowManualTick) {
    throw forbidden("Manual market ticks are disabled on this server.");
  }
  res.json(market.tickMarket());
});

export default router;
