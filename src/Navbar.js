import { Link } from "react-router-dom";
import { useState } from "react"; // Import useState
import "./css/Navbar.css";
import lunanHeader from "./assets/img/Bloomfields_text_logo.png";

export const Navbar = () => {
  // Create a state variable to control the navbar collapse
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Function to toggle the navbar collapse
  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <div className="sticky-top" id="navbar">
      <div className="container-fluid">
        <div className="row">
          {/* Logo */}
          <div className="col d-flex align-items-center">
            <img
              className="logo"
              src={lunanHeader}
              style={{ width: "25%" }}
              alt="Logo"
            />
          </div>
          {/* Nav */}
          <div className="col d-flex align-items-center d-flex justify-content-end">
            <nav className="navbar navbar-expand-lg float-end">
              <button
                className="navbar-toggler"
                type="button"
                onClick={handleNavCollapse} // Handle click to toggle the collapse
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={`collapse navbar-collapse ${
                  isNavCollapsed ? "" : "show"
                }`}
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link fs-4 me-2" id="hoverNav">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/FAQ"
                      className="nav-link fs-4 me-2"
                      id="hoverNav"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Login" className="nav-link fs-4" id="hoverNav">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Sign Up" className="nav-link fs-4" id="hoverNav">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
