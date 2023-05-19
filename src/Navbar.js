import { Link } from "react-router-dom";
import "./css/Navbar.css";
import lunanHeader from "../src/img/lunanHeader.png";
export const Navbar = () => {
  return (
    <div className="container-fluid" id="bground">
      <div className="row">
        {/* Logo */}
        <div className="col">
          <img src={lunanHeader} style={{ width: 20 + "%" }}></img>
        </div>
        {/* Nav */}
        <div className="col">
          <nav className="navbar navbar-expand-lg float-end">
            <div className="container-fluid">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link fs-4 me-2"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/About Us"
                    className="nav-link fs-4 me-2"
                    aria-current="page"
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link fs-4 me-5" href="#">
                    FAQ
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/Login" className="nav-link fs-4 " id="navFocus">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Sign Up" className="nav-link fs-4 " id="navFocus">
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
