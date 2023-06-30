import { Link } from "react-router-dom";
import "./css/Navbar.css";
import lunanHeader from "../src/img/Bloomfields_text_logo.png";
export const Navbar = () => {
  return (
    <div className="container-fluid sticky-top" id="navbar">
      <div className="row">
        {/* Logo */}
        <div className="col d-flex align-items-center">
          <img src={lunanHeader} style={{ width: 25 + "%" }}></img>
        </div>
        {/* Nav */}
        <div className="col d-flex align-items-center d-flex justify-content-end">
          <nav className="navbar navbar-expand-lg float-end">
            <div className="container-fluid fs-1" style={{ color: "white" }}>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link fs-4 me-2"
                    aria-current="page"
                    id="hoverNav"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/About Us"
                    className="nav-link fs-4 me-2"
                    aria-current="page"
                    id="hoverNav"
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/FAQ"
                    className="nav-link fs-4 me-2"
                    aria-current="page"
                    id="hoverNav"
                  >
                    FAQ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Login" className="nav-link fs-4 " id="hoverNav">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Sign Up" className="nav-link fs-4 " id="hoverNav">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
