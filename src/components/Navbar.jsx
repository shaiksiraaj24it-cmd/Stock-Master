function Navbar() {

  return (
    <header className="navbar">

      <div className="brand">

        <div className="brand-logo">
          📈
        </div>

        <div>
          <strong>
            Stock<span>Master</span>
          </strong>

          <small>
            Learn • Analyze • Practice
          </small>
        </div>

      </div>


      <div className="navbar-right">

        <div className="notification">
          🔔
        </div>

        <div className="user-avatar">
          SM
        </div>

        <div className="user-name">
          Student
        </div>

      </div>

    </header>
  );
}

export default Navbar;