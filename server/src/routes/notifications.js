import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import * as notifications from "../services/notificationService.js";
import { parse } from "../utils/validate.js";

const router = Router();
router.use(requireAuth);

const listQuery = z.object({
  unread: z.enum(["true", "false"]).default("false"),
  limit: z.coerce.number().int().min(1).max(100).default(30),
});
const idParam = z.object({ id: z.coerce.number().int().positive() });

router.get("/", (req, res) => {
  const { unread, limit } = parse(listQuery, req.query);
  res.json(notifications.listNotifications(req.user.id, { unreadOnly: unread === "true", limit }));
});

// declared before "/:id/read" so "read-all" is never mistaken for an id
router.post("/read-all", (req, res) => {
  res.json({ marked: notifications.markAllRead(req.user.id) });
});

router.post("/:id/read", (req, res) => {
  const { id } = parse(idParam, req.params);
  notifications.markRead(req.user.id, id);
  res.json({ ok: true });
});

export default router;
