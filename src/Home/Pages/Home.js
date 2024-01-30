import "../../css/Home.css";
import "../../css/Footer.css";
import "../../css/AboutUs.css";
import "../../css/MobileApp.css";
import { Navbar } from "../../Navbar";
import { useNavigate } from "react-router-dom";
import BF from "../../assets/img/BLOOMFIELDS_LOGO-03.png";
import mobile_home from "../../assets/img/login-portrait.png";
import mobile_login from "../../assets/img/home-portrait.png";
import gPlay from "../../assets/img/GoogleStore.png";
import logo from "../../assets/img/Bloomfields_logo_only.png";
import { useEffect, useState } from "react";

import HeaderComponent from "../Components/home_header_component";
import ProcessComponent from "../Components/home_process_component";
import AboutUsComponent from "../Components/home_about_us_component";

export const Home = () => {
  return (
    <div className="homepage">
      <Navbar />
      <HeaderComponent />
      <ProcessComponent />
      <AboutUsComponent />
      <MobileApp />
      <Footer />
    </div>
  );
};

const MobileApp = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className="container-fluid mt-5 mobile-paragraph-container"
      style={{ fontFamily: "Roboto, sans-serif", color: "#4D455D" }}
    >
      <div className="row">
        {screenWidth <= 768 ? null : (
          <div className="col d-flex justify-content-center">
            <img src={mobile_login} style={{ width: "30%" }} />

            <img src={mobile_home} style={{ width: "30%" }} className="ms-5" />
          </div>
        )}

        <div className="col">
          <div>
            <p className="fs-1" style={{ width: "80%" }}>
              <strong>
                Discover the power of self-care and mental well-being with our
                mobile therapy app.
              </strong>
            </p>
            <p className="fs-4 " style={{ width: "80%" }}>
              Embark on a journey towards a happier, healthier you, one session
              at a time.
            </p>
          </div>
          <div className="mt-5">
            <a href="https://drive.google.com/file/d/1Yo99eKL2IdXl4wSlxvDUljikHcAGBof9/view?usp=sharing">
              <img src={gPlay} style={{ width: "25%" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer>
      <div
        className="container-fluid mt-5 pb-5"
        style={{
          backgroundColor: "#4D455D",
          color: "#F2E3D2",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <div className="row">
          <div className="col ms-5">
            <div
              className="mt-5"
              style={{ borderBottom: "2px solid #F2E3D2", width: "300px" }}
            >
              <strong className="fs-4">BLOOMFIELDS WELLNESS INSTITUTE</strong>
            </div>
            <div className="mt-3">
              <img src={logo} style={{ width: "40%" }} />
            </div>
          </div>
          <div className="col mt-5">
            <h3>Quick Links</h3>
            <ul className="fs-5" style={{ listStyleType: "none" }}>
              <li className="mt-3">
                <a href="/" style={{ color: "#F2E3D2" }}>
                  Home
                </a>
              </li>
              <li className="mt-3">
                <a href="/" style={{ color: "#F2E3D2" }}>
                  Login
                </a>
              </li>
              <li className="mt-3">
                <a href="/" style={{ color: "#F2E3D2" }}>
                  FAQ
                </a>
              </li>
              <li className="mt-3">
                <a href="/" style={{ color: "#F2E3D2" }}>
                  Sign
                </a>
              </li>
            </ul>
          </div>
          <div className="col mt-5">
            <div>
              <p className="fs-3">Contact Us</p>
              <p className="fs-5">
                #98 SAN PEDRO BAUTISTA <br /> ST. BRGY. DAMAYAN
              </p>
            </div>
            <div>
              <p className="fs-5">0920 528 7823</p>
            </div>
          </div>
          <div className="col mt-5">
            <p className="fs-3">
              &copy; {new Date().getFullYear()} Bloomfields Wellness Institute
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
