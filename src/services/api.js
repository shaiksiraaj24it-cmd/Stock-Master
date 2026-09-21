/**
 * StockMaster API client.
 *
 * Usage:
 *   import { api } from "./services/api";
 *   const { stocks } = await api.stocks.list();
 *   await api.auth.login({ email, password });   // stores the token for you
 *   await api.trade.buy(stock.id, 10);
 *
 * Every function returns the parsed JSON, or throws an ApiError whose
 * `.message` is safe to show to the user (e.g. "Insufficient virtual balance...").
 */

// In development Vite proxies /api to the backend. For a deployed build, set
// VITE_API_URL (e.g. https://api.example.com) in your .env.production file.
const BASE_URL = (import.meta.env.VITE_API_URL || "") + "/api";
const TOKEN_KEY = "stockmaster_token";

export class ApiError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/* ------------------------------ token ------------------------------ */

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/* ----------------------------- request ----------------------------- */

async function request(method, path, { body, query } = {}) {
  const params = query
    ? new URLSearchParams(
        Object.entries(query).filter(([, v]) => v !== undefined && v !== null && v !== "")
      ).toString()
    : "";

  const token = getToken();
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}${params ? `?${params}` : ""}`, {
      method,
      headers: {
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "NETWORK_ERROR", "Cannot reach the server. Is the backend running?");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // An expired/invalid token: forget it so the app can send the user to login.
    if (response.status === 401 && token) clearToken();
    const err = data?.error;
    throw new ApiError(
      response.status,
      err?.code || "HTTP_ERROR",
      err?.message || `Request failed (${response.status})`,
      err?.details
    );
  }
  return data;
}

const get = (path, query) => request("GET", path, { query });
const post = (path, body) => request("POST", path, { body: body ?? {} });
const put = (path, body) => request("PUT", path, { body: body ?? {} });
const del = (path) => request("DELETE", path);

/* ------------------------------ API ------------------------------- */

export const api = {
  auth: {
    async register({ name, email, password }) {
      const data = await post("/auth/register", { name, email, password });
      setToken(data.token);
      return data;
    },
    async login({ email, password }) {
      const data = await post("/auth/login", { email, password });
      setToken(data.token);
      return data;
    },
    me: () => get("/auth/me"),
    logout: clearToken,
    isLoggedIn: () => Boolean(getToken()),
  },

  // Public - works without logging in.
  stocks: {
    list: (query) => get("/stocks", query), // { search, sector }
    get: (idOrSymbol) => get(`/stocks/${idOrSymbol}`),
    history: (idOrSymbol, limit = 100) => get(`/stocks/${idOrSymbol}/history`, { limit }),
  },

  market: {
    overview: () => get("/market/overview"),
    tick: () => post("/market/tick"), // move prices once (demo)
  },

  portfolio: {
    get: () => get("/portfolio"), // { balance, portfolio, holdings, summary }
    reset: () => post("/portfolio/reset"),
  },

  trade: {
    buy: (stockId, quantity) => post("/trade/buy", { stockId, quantity }),
    sell: (stockId, quantity) => post("/trade/sell", { stockId, quantity }),
  },

  transactions: {
    list: (query) => get("/transactions", query), // { type, stockId, limit, offset }
  },

  watchlist: {
    get: () => get("/watchlist"), // { watchlist: [ids], stocks: [...] }
    toggle: (stockId) => post(`/watchlist/${stockId}/toggle`),
    remove: (stockId) => del(`/watchlist/${stockId}`),
  },

  notifications: {
    list: (query) => get("/notifications", query), // { unread: "true", limit }
    markRead: (id) => post(`/notifications/${id}/read`),
    markAllRead: () => post("/notifications/read-all"),
  },

  learning: {
    progress: () => get("/learning/progress"), // { completedLessons: [ids], quiz: {...} }
    completeLesson: (lessonId) => post(`/learning/lessons/${lessonId}/complete`),
    recordQuiz: ({ moduleId, score, total }) =>
      post("/learning/quiz-attempts", { moduleId, score, total }),
    quizAttempts: (query) => get("/learning/quiz-attempts", query),
  },

  courses: {
    list: () => get("/courses"),
    get: (id) => get(`/courses/${id}`),
    create: (data) => post("/courses", data),
    update: (id, data) => put(`/courses/${id}`, data),
    delete: (id) => del(`/courses/${id}`),
  },
};
