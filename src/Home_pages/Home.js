import "../css/Home.css";
import "../css/Footer.css";
import "../css/AboutUs.css";
import "../css/MobileApp.css";
import { Navbar } from "../Navbar";
import { useNavigate } from "react-router-dom";
import header from "../img/header.png";
import BF from "../img/BLOOMFIELDS_LOGO-03.png";
import certified from "../img/certified.png";
import wallet from "../img/wallet.png";
import point from "../img/touch-control.png";
import comms from "../img/effective-communication.png";
import aboutus from "../img/aboutusnew.png";
import mobile_home from "../img/login-portrait.png";
import mobile_login from "../img/home-portrait.png";
import gPlay from "../img/GoogleStore.png";
import aStore from "../img/AppStore.png";
import logo from "../img/Bloomfields_logo_only.png";
import { useEffect, useState } from "react";
export const Home = () => {
  return (
    <div className="homepage">
      <Navbar />
      <Header />
      <BloomFields />
      <AboutUs />
      <MobileApp />
      <Footer />
    </div>
  );
};

const Header = () => {
  const nav = useNavigate();
  const goSignup = () => nav("/Sign Up");

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
      className="container-fluid "
      style={{
        backgroundColor: "#4D455D",
        paddingTop: "8%",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <div className="row ">
        <div className="col" id="colParagraph" style={{ marginLeft: "200px" }}>
          <div>
            <p
              id="pHeader"
              style={{
                color: "#F2E3D2",
              }}
            >
              <strong>
                Convenient and Affordable Therapy Anytime, Anywhere.
              </strong>
            </p>
            <p
              id="pResponse"
              style={{
                color: "#F2E3D2",
                width: "80%",
              }}
            >
              A safe and supportive space where licensed therapists provide
              compassionate and effective therapy services.
            </p>
            <button
              id="btnGetStarted"
              className="btn rounded-5 mt-3"
              onClick={goSignup}
            >
              <strong>Get Started</strong>
            </button>
          </div>
        </div>
        {screenWidth <= 768 ? null : (
          <div className="col">
            <img id="imgHeader" src={header} />
          </div>
        )}
      </div>
    </div>
  );
};

const BloomFields = () => {
  return (
    <div className="container-fluid Bloom-Fields">
      <div className="row">
        <div className="col me-5 pe-5" style={{ margin: "auto" }}>
          <img className="logoBF" src={BF} />
        </div>
        <div
          className="col d-flex justify-content-center ms-5 mt-5 fs-1"
          id="ListLogo"
        >
          <ul
            className="mt-5 hover-list"
            style={{
              listStyleType: "none",
              fontFamily: "Roboto, sans-serif",
              color: "#4D455D",
            }}
          >
            <li className="liMargin" id="certified">
              <img src={certified} className="BFlogos" />
              <span className={"ms-5 item-text"}>
                <strong>It's Licensed</strong>
              </span>
            </li>
            <li className="liMargin" id="wallet">
              <img src={wallet} className="BFlogos" />
              <span className="ms-5 pt-5 item-text">
                <strong>It's Affordable</strong>
              </span>
            </li>
            <li className="liMargin" id="point">
              <img src={point} className="BFlogos" />
              <span className="ms-5 pt-5 item-text">
                <strong>It's Easy to Use</strong>
              </span>
            </li>
            <li className="liMargin" id="comms">
              <img src={comms} className="BFlogos" />
              <span className="ms-5 item-text">
                <strong>It's Effective</strong>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
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
      className="container-fluid mb-5"
      style={{
        backgroundColor: "#F2E3D2",
        fontFamily: "Roboto, sans-serif",
        color: "#4D455D",
      }}
    >
      <div className="row">
        <div className="col paragraph-container">
          <p className="fs-1 d-flex justify-content-center">
            <strong>About Us</strong>
          </p>
          <div className="ms-5">
            <p className="fs-2 d-flex justify-content-start">
              <strong>Mission</strong>
            </p>
            <p className="fs-3 d-flex justify-content-start">
              BWI is committed to provide holistic mental health programs and
              strategies through its evidence-based psycho-social support
              services for individuals, families and communities.
            </p>
          </div>
          <div className="ms-5 mt-5">
            <p className="fs-2 d-flex justify-content-start">
              <strong>Vision</strong>
            </p>
            <p className="fs-3 d-flex justify-content-start">
              BWI aspires to become a trusted partner institution of
              individuals, families and communities in creating psycho-social
              safe spaces.
            </p>
          </div>
        </div>
        {screenWidth <= 768 ? null : (
          <div className="col d-flex justify-content-end align-items-center aboutus-container">
            <div className="aboutus-image">
              <img src={aboutus} className="aboutus-image" />
            </div>
          </div>
        )}
      </div>
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
            <a href="">
              <img src={gPlay} style={{ width: "25%" }} />
            </a>
            <a href="">
              <img src={aStore} style={{ width: "20%" }} />
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
