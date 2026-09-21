/** An error that carries an HTTP status and a machine-readable code. */
export class HttpError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const badRequest = (code, message, details) =>
  new HttpError(400, code, message, details);
export const unauthorized = (message = "Authentication required.") =>
  new HttpError(401, "UNAUTHORIZED", message);
export const forbidden = (message = "You are not allowed to do that.") =>
  new HttpError(403, "FORBIDDEN", message);
export const notFound = (message = "Not found.") =>
  new HttpError(404, "NOT_FOUND", message);
export const conflict = (code, message) => new HttpError(409, code, message);
