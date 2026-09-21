import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import * as trading from "../services/tradingService.js";

const router = Router();
router.use(requireAuth);

router.get("/", (req, res) => {
  res.json(trading.getPortfolio(req.user.id));
});

router.post("/reset", (req, res) => {
  res.json(trading.resetPortfolio(req.user.id));
});

export default router;
