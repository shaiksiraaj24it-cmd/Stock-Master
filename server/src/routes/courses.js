import { Router } from "express";
import { z } from "zod";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import * as courseService from "../services/courseService.js";
import { asyncHandler, parse } from "../utils/validate.js";

const router = Router();

const lessonSchema = z.object({
  title: z.string().trim().min(1, "Lesson title is required."),
  content: z.string().trim().min(1, "Lesson content is required."),
  videoUrl: z.string().trim().optional().nullable(),
  orderIndex: z.number().int().optional(),
});

const courseCreateSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  description: z.string().trim().min(1, "Description is required."),
  category: z.string().trim().optional().default("General"),
  level: z.string().trim().optional().default("Beginner"),
  icon: z.string().trim().optional().default("📚"),
  lessons: z.array(lessonSchema).optional().default([]),
});

const courseUpdateSchema = z.object({
  title: z.string().trim().min(1).optional(),
  description: z.string().trim().min(1).optional(),
  category: z.string().trim().optional(),
  level: z.string().trim().optional(),
  icon: z.string().trim().optional(),
  lessons: z.array(lessonSchema).optional(),
});

const courseIdParam = z.object({
  id: z.coerce.number().int().positive(),
});

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json({ courses: courseService.listCourses() });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = parse(courseIdParam, req.params);
    res.json({ course: courseService.getCourse(id) });
  })
);

router.post(
  "/",
  requireAuth,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const data = parse(courseCreateSchema, req.body);
    const course = courseService.createCourse(data);
    res.status(201).json({ course });
  })
);

router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { id } = parse(courseIdParam, req.params);
    const data = parse(courseUpdateSchema, req.body);
    const course = courseService.updateCourse(id, data);
    res.json({ course });
  })
);

router.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { id } = parse(courseIdParam, req.params);
    const result = courseService.deleteCourse(id);
    res.json(result);
  })
);

export default router;
