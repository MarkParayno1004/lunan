import "../css/Home.css";
import "../css/Footer.css";
import { Navbar } from "../Navbar";
import { useState } from "react";
import header from "../img/header.png";
import BF from "../img/BLOOMFIELDS_LOGO-03.png";
import certified from "../img/certified.png";
import wallet from "../img/wallet.png";
import point from "../img/touch-control.png";
import comms from "../img/effective-communication.png";
import aboutus from "../img/aboutusnew.png";
export const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <BloomFields />
      <AboutUs />
      <MobileApp />
    </div>
  );
};

const Header = () => {
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
  const [showText, setShowText] = useState(false);

  const handleHover = () => {
    setShowText(true);
  };

  const handleMouseLeave = () => {
    setShowText(false);
  };
  return (
    <div className="container-fluid mb-5">
      <div className="row">
        <div className="col d-flex justify-content-center me-5 pe-5">
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
              <img src={certified} />
              <span
                className={`ms-5 item-text ${showText ? "visible" : "hidden"}`}
              >
                <strong>It's Licensed</strong>
              </span>
            </li>
            <li className="mt-5 pt-5" id="wallet">
              <img src={wallet} />
              <span className="ms-5 pt-5 item-text">
                <strong>It's Affordable</strong>
              </span>
            </li>
            <li className="mt-5 pt-5" id="point">
              <img src={point} />
              <span className="ms-5 pt-5 item-text">
                <strong>It's Easy to Use</strong>
              </span>
            </li>
            <li className="mt-5 pt-5" id="comms">
              <img src={comms} />
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
      className="container-fluid mt-5 mb-5 pt-5"
      style={{
        backgroundColor: "#F2E3D2",
        fontFamily: "Roboto, sans-serif",
        color: "#4D455D",
      }}
    >
      <div className="row">
        <div className="col mt-5">
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
  return <div className="container-fluid mt-5">this is mobile app</div>;
};
