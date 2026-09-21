import { badRequest } from "./httpError.js";

/** Parses `data` with a zod schema; throws a 400 HttpError listing the problems. */
export function parse(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) return result.data;

  const details = result.error.issues.map((issue) => ({
    field: issue.path.join(".") || "(root)",
    message: issue.message,
  }));
  throw badRequest("VALIDATION_ERROR", "The request contains invalid data.", details);
}

/** Lets async route handlers throw without try/catch. */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
