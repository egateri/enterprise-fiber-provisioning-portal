const Header = () => {
  const email = localStorage.getItem("email");
  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <a className="navbar-brand" href="/">
          Home
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li> */}
            {/* <li className="nav-item">
                <a className="nav-link" href="/">
                  Login
                </a>
              </li> */}
            <li className="nav-item">
              <a className="nav-link" href="/">
                PE ROUTER
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                NE ROUTER
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                {email}
              </a>
            </li>
            <li className="nav-item">
              <button
                type="button"
                class="btn btn-outline-danger"
                onClick={handleClick}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
