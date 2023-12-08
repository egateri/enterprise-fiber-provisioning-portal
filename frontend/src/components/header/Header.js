const Header = () => {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <a className="navbar-brand" href="/home">
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
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/pe" >
                  PE ROUTER
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ne" >
                  NE ROUTER
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/logout">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  };
  
  export default Header;