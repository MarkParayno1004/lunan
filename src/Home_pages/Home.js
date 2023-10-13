import "../css/Home.css";
import "../css/Footer.css";
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
export const Home = () => {
  return (
    <div>
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
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#4D455D",
        paddingTop: "8%",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <div className="row ">
        <div className="col" style={{ marginLeft: "200px" }}>
          <div>
            <p
              className="fs-1"
              style={{
                color: "#F2E3D2",
              }}
            >
              <strong>
                Convenient and Affordable Therapy Anytime, Anywhere.
              </strong>
            </p>
            <p
              className="fs-5"
              style={{
                color: "#F2E3D2",
                width: "80%",
              }}
            >
              A safe and supportive space where licensed therapists provide
              compassionate and effective therapy services.
            </p>
            <button
              className="rounded-5 mt-3"
              style={{
                backgroundColor: "#F2E3D2",
                borderStyle: "none",
                color: "#4D455D",
                fontSize: "20px",
                padding: "8px",
              }}
              onClick={goSignup}
            >
              <strong>Get Started</strong>
            </button>
          </div>
        </div>
        <div className="col">
          <img src={header} style={{ width: "100%" }} />
        </div>
      </div>
    </div>
  );
};

const BloomFields = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col d-flex justify-content-start me-5 pe-5">
          <img src={BF} style={{ width: "150%" }} />
        </div>
        <div className="col d-flex justify-content-center ms-5 mt-5 fs-1">
          <ul
            className="mt-5 hover-list"
            style={{
              listStyleType: "none",
              fontFamily: "Roboto, sans-serif",
              color: "#4D455D",
            }}
          >
            <li id="certified">
              <img src={certified} style={{ width: "30%" }} />
              <span className={"ms-5 item-text"}>
                <strong>It's Licensed</strong>
              </span>
            </li>
            <li className="mt-5 pt-5" id="wallet">
              <img src={wallet} style={{ width: "30%" }} />
              <span className="ms-5 pt-5 item-text">
                <strong>It's Affordable</strong>
              </span>
            </li>
            <li className="mt-5 pt-5" id="point">
              <img src={point} style={{ width: "30%" }} />
              <span className="ms-5 pt-5 item-text">
                <strong>It's Easy to Use</strong>
              </span>
            </li>
            <li className="mt-5 pt-5" id="comms">
              <img src={comms} style={{ width: "30%" }} />
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
        <div className="col">
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
        <div
          className="col d-flex justify-content-end align-items-center"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "100%",
          }}
        >
          <img src={aboutus} style={{ width: "100%" }} />
        </div>
      </div>
    </div>
  );
};
const MobileApp = () => {
  return (
    <div
      className="container-fluid mt-5"
      style={{ fontFamily: "Roboto, sans-serif", color: "#4D455D" }}
    >
      <div className="row">
        <div className="col d-flex justify-content-center">
          <img src={mobile_login} style={{ width: "30%" }} />

          <img src={mobile_home} style={{ width: "30%" }} className="ms-5" />
        </div>
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
            <a href="https://www.youtube.com/watch?v=l3Zo12m0tGM">
              <img src={gPlay} style={{ width: "25%" }} />
            </a>
            <a href="https://www.youtube.com/watch?v=l3Zo12m0tGM">
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
                <FontAwesomeIcon icon={faHouse} />
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
