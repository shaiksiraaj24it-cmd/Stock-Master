function Navbar({ currentUser, onOpenAuth, onLogout, onNavigate }) {
  return (
    <header className="navbar">
      <div className="brand" onClick={() => onNavigate("Landing")} style={{ cursor: "pointer" }}>
        <div className="brand-logo">📈</div>
        <div>
          <strong>
            Stock<span>Master</span>
          </strong>
          <small>Learn • Analyze • Practice</small>
        </div>
      </div>

      <div className="navbar-right">
        <button className="nav-link-btn" onClick={() => onNavigate("Landing")}>
          Landing Page
        </button>

        {currentUser ? (
          <>
            {currentUser.role === "admin" && (
              <button className="admin-nav-badge" onClick={() => onNavigate("Admin")}>
                👑 Admin Panel
              </button>
            )}

            <div className="user-info-chip">
              <div className="user-avatar">{currentUser.name ? currentUser.name.substring(0, 2).toUpperCase() : "U"}</div>
              <div className="user-details">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role-badge">{currentUser.role === "admin" ? "Admin" : "User"}</span>
              </div>
            </div>

            <button className="btn-logout" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <div className="auth-nav-buttons">
            <button className="btn-nav-login" onClick={() => onOpenAuth("login")}>
              Login
            </button>
            <button className="btn-nav-register" onClick={() => onOpenAuth("register")}>
              Register
            </button>
            <button className="btn-nav-admin" onClick={() => onOpenAuth("admin")}>
              🔑 Admin (123456)
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
