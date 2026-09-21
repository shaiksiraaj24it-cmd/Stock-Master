import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import * as learning from "../services/learningService.js";
import { parse } from "../utils/validate.js";

const router = Router();
router.use(requireAuth);

const lessonParam = z.object({ lessonId: z.coerce.number().int().positive() });

const attemptSchema = z
  .object({
    moduleId: z.coerce.number().int().positive().nullish(),
    score: z.coerce.number().int().min(0),
    total: z.coerce.number().int().min(1).max(500),
  })
  .refine((v) => v.score <= v.total, {
    message: "score cannot be greater than total.",
    path: ["score"],
  });

const attemptsQuery = z.object({
  moduleId: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

router.get("/progress", (req, res) => {
  res.json(learning.getProgress(req.user.id));
});

router.post("/lessons/:lessonId/complete", (req, res) => {
  const { lessonId } = parse(lessonParam, req.params);
  res.json(learning.completeLesson(req.user.id, lessonId));
});

router.post("/quiz-attempts", (req, res) => {
  const data = parse(attemptSchema, req.body);
  res.status(201).json(
    learning.recordQuizAttempt(req.user.id, { ...data, moduleId: data.moduleId ?? null })
  );
});

router.get("/quiz-attempts", (req, res) => {
  const { moduleId, limit } = parse(attemptsQuery, req.query);
  res.json({ attempts: learning.listQuizAttempts(req.user.id, { moduleId, limit }) });
});

export default router;
