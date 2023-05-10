import "./App.css";

function App() {
  return (
    <div className="container-fluid" id="bground">
      <div className="row">
        {/* Logo */}
        <div className="col">
          <img></img>
        </div>
        {/* Nav */}
        <div className="col">
          <nav className="navbar navbar-expand-lg float-end">
            <div className="container-fluid">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link fs-4 me-2"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fs-4 me-2" href="#">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fs-4 me-5" href="#">
                    FAQ
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fs-4 ms-5" href="#" id="navFocus">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fs-4" href="#" id="navFocus">
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default App;
