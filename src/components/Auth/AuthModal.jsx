import { useState } from "react";
import { api, ApiError } from "../../services/api";

function AuthModal({ isOpen, onClose, initialMode = "login", onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register' | 'admin'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleAdminQuickFill = () => {
    setFormData({
      name: "admin",
      email: "admin",
      password: "123456",
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "register") {
        if (!formData.name || !formData.email || !formData.password) {
          setError("All fields are required.");
          setLoading(false);
          return;
        }
        const res = await api.auth.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        onAuthSuccess(res.user);
        onClose();
      } else {
        // 'login' or 'admin'
        if (!formData.email || !formData.password) {
          setError("Please provide username/email and password.");
          setLoading(false);
          return;
        }
        const res = await api.auth.login({
          email: formData.email,
          password: formData.password,
        });
        onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("An error occurred during authentication.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="auth-header">
          <div className="auth-logo">📈</div>
          <h2>
            {mode === "admin"
              ? "Admin Login"
              : mode === "register"
              ? "Create Learner Account"
              : "Welcome Back"}
          </h2>
          <p>
            {mode === "admin"
              ? "Access administrative control panel"
              : mode === "register"
              ? "Sign up to track course progress & virtual trading"
              : "Log in to access your courses and portfolio"}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => {
              setMode("login");
              setError("");
            }}
          >
            User Login
          </button>
          <button
            className={`auth-tab ${mode === "register" ? "active" : ""}`}
            onClick={() => {
              setMode("register");
              setError("");
            }}
          >
            User Register
          </button>
          <button
            className={`auth-tab ${mode === "admin" ? "active" : ""}`}
            onClick={() => {
              setMode("admin");
              setFormData({ name: "admin", email: "admin", password: "123456" });
              setError("");
            }}
          >
            Admin Login
          </button>
        </div>

        {mode === "admin" && (
          <div className="admin-hint-box">
            <span>🔐 <strong>Admin Credentials:</strong> Username: <code>admin</code> | Password: <code>123456</code></span>
            <button type="button" className="quick-fill-btn" onClick={handleAdminQuickFill}>
              Auto Fill
            </button>
          </div>
        )}

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "register" && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>{mode === "admin" ? "Username or Email" : "Email Address"}</label>
            <input
              type={mode === "admin" ? "text" : "email"}
              name="email"
              placeholder={mode === "admin" ? "admin" : "learner@example.com"}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Processing..." : mode === "register" ? "Register & Get Started" : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          {mode === "register" ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
              >
                Log In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account yet?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
              >
                Register Now
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
