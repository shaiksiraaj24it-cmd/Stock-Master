import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { getDb } from "../db/connection.js";
import { conflict, unauthorized } from "../utils/httpError.js";
import { serializeUser } from "../utils/serializers.js";
import { notify } from "./notificationService.js";

const BCRYPT_ROUNDS = 10;
// Compared against when the email is unknown, so login takes the same time
// whether or not the account exists.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", BCRYPT_ROUNDS);

export function signToken(userId) {
  return jwt.sign({ sub: String(userId) }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch {
    throw unauthorized("Your session is invalid or has expired. Please log in again.");
  }
}

export function findUserById(id) {
  return getDb().prepare("SELECT * FROM users WHERE id = ?").get(id);
}

export async function register({ name, email, password }) {
  const db = getDb();

  if (db.prepare("SELECT 1 FROM users WHERE email = ?").get(email)) {
    throw conflict("EMAIL_TAKEN", "An account with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  let userId;
  try {
    const result = db
      .prepare(
        `INSERT INTO users (name, email, password_hash, balance, starting_balance)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(name, email, passwordHash, config.startingBalance, config.startingBalance);
    userId = Number(result.lastInsertRowid);
  } catch (err) {
    // Two sign-ups racing for the same email: the UNIQUE index catches it.
    if (String(err.code).startsWith("SQLITE_CONSTRAINT")) {
      throw conflict("EMAIL_TAKEN", "An account with this email already exists.");
    }
    throw err;
  }

  notify({
    userId,
    type: "SYSTEM",
    title: "Welcome to StockMaster 👋",
    message: `Your practice account is ready with ₹${config.startingBalance.toLocaleString(
      "en-IN"
    )} of virtual money.`,
  });

  return { user: serializeUser(findUserById(userId)), token: signToken(userId) };
}

export async function login({ email, password }) {
  const row = getDb().prepare("SELECT * FROM users WHERE email = ?").get(email);
  const ok = await bcrypt.compare(password, row ? row.password_hash : DUMMY_HASH);
  if (!row || !ok) throw unauthorized("Invalid email or password.");

  return { user: serializeUser(row), token: signToken(row.id) };
}
