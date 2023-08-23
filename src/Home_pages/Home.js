import "../css/Home.css";
import "../css/Footer.css";
import { Footer } from "../Footer.js";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar";
export const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid" id="bodyBG">
        <p className="text-center" id="titleP">
          dadadad
          <br />
          <p id="titleP2">Anytime, Anywhere</p>
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/Sign Up" style={{ textDecoration: "none" }}>
            <button
              type="button"
              className="d-flex align-items-center d-flex justify-content-center"
              id="GetStartedBody"
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
