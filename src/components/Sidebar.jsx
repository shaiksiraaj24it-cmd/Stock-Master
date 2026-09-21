function Sidebar({ activePage, setActivePage, currentUser }) {
  const menuItems = [
    {
      name: "Landing",
      label: "Landing Page",
      icon: "🌐",
    },
    {
      name: "Dashboard",
      label: "Dashboard",
      icon: "🏠",
    },
    {
      name: "Learn",
      label: "Learn & Courses",
      icon: "📚",
    },
    {
      name: "Market",
      label: "Market Explorer",
      icon: "📈",
    },
    {
      name: "Analysis",
      label: "Stock Analysis",
      icon: "🔎",
    },
    {
      name: "Practice",
      label: "Virtual Trading",
      icon: "💰",
    },
    {
      name: "Quiz",
      label: "Assessment Quiz",
      icon: "🧠",
    },
    {
      name: "Watchlist",
      label: "Watchlist",
      icon: "⭐",
    },
  ];

  if (currentUser?.role === "admin") {
    menuItems.push({
      name: "Admin",
      label: "Admin Courses",
      icon: "🔐",
    });
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-title">STOCKMASTER</div>

      <div className="menu-label">MAIN NAVIGATION</div>

      <nav>
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={activePage === item.name ? "menu-item active" : "menu-item"}
            onClick={() => setActivePage(item.name)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {currentUser?.role === "admin" && (
        <div className="sidebar-admin-notice">
          <div>🔐</div>
          <strong>Admin Active</strong>
          <p>Logged in as admin (pass: 123456). Manage courses in the Admin panel.</p>
        </div>
      )}

      {!currentUser && (
        <div className="sidebar-learning">
          <div>💡</div>
          <strong>Get Started!</strong>
          <p>Register or login to track your progress and manage virtual stock portfolios.</p>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
