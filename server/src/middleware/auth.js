import { unauthorized } from "../utils/httpError.js";
import { findUserById, verifyToken } from "../services/authService.js";

/** Requires `Authorization: Bearer <token>` and sets `req.user = { id, name, email }`. */
export function requireAuth(req, _res, next) {
  const header = req.get("authorization") || "";
  const [scheme, token] = header.split(" ");

  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return next(unauthorized("Missing or malformed Authorization header."));
  }

  try {
    const payload = verifyToken(token);
    const user = findUserById(Number(payload.sub));
    if (!user) throw unauthorized("This account no longer exists.");
    req.user = { id: user.id, name: user.name, email: user.email, role: user.role || "user" };
    next();
  } catch (err) {
    next(err);
  }
}

/** Requires `req.user` to have `role === 'admin'`. */
export function requireAdmin(req, _res, next) {
  if (req.user?.role !== "admin") {
    return next(unauthorized("Admin access required."));
  }
  next();
}
