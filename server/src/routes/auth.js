import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { config } from "../config.js";
import { requireAuth } from "../middleware/auth.js";
import * as auth from "../services/authService.js";
import { asyncHandler, parse } from "../utils/validate.js";
import { serializeUser } from "../utils/serializers.js";

const router = Router();

// Slow down password-guessing / account-spam.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: config.env === "test" ? 10_000 : 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: { code: "RATE_LIMITED", message: "Too many attempts. Please try again later." },
  },
});

const email = z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address."));

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(80),
  email,
  // bcrypt only looks at the first 72 bytes, so cap the length.
  password: z.string().min(8, "Password must be at least 8 characters.").max(72),
});

const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required.").max(72),
});

router.post(
  "/register",
  authLimiter,
  asyncHandler(async (req, res) => {
    const result = await auth.register(parse(registerSchema, req.body));
    res.status(201).json(result);
  })
);

router.post(
  "/login",
  authLimiter,
  asyncHandler(async (req, res) => {
    res.json(await auth.login(parse(loginSchema, req.body)));
  })
);

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: serializeUser(auth.findUserById(req.user.id)) });
});

export default router;
