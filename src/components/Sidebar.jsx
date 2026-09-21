function Sidebar({
  activePage,
  setActivePage
}) {

  const menuItems = [
    {
      name: "Dashboard",
      icon: "🏠"
    },
    {
      name: "Learn",
      icon: "📚"
    },
    {
      name: "Market",
      icon: "📈"
    },
    {
      name: "Analysis",
      icon: "🔎"
    },
    {
      name: "Practice",
      icon: "💰"
    },
    {
      name: "Quiz",
      icon: "🧠"
    },
    {
      name: "Watchlist",
      icon: "⭐"
    }
  ];


  return (
    <aside className="sidebar">

      <div className="sidebar-title">
        STOCKMASTER
      </div>

      <div className="menu-label">
        MENU
      </div>


      <nav>

        {menuItems.map((item) => (

          <button
            key={item.name}
            className={
              activePage === item.name
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() =>
              setActivePage(item.name)
            }
          >

            <span className="menu-icon">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>

          </button>

        ))}

      </nav>


      <div className="sidebar-learning">

        <div>
          💡
        </div>

        <strong>
          Keep Learning!
        </strong>

        <p>
          Small steps today,
          smarter decisions tomorrow.
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;