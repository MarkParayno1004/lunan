import { Navbar } from "../../Navbar";
import "../../css/AboutUs.css";
export const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div
        className="container-fluid d-flex justify-content-center d-flex align-items-center"
        id="bgAboutUs"
      >
        <h1 style={{ fontSize: "100px" }}>About Us</h1>
      </div>
      <div className="d-flex justify-content-center pt-5" id="blueBackground">
        <div className="mt-5 mb-5">
          <div
            className="container-fluid rounded-5 "
            style={{
              backgroundColor: "#f5e9cf",
              width: "1000px",
              height: "220px",
            }}
          >
            <h2 className="fw-semibold pt-3">Mission</h2>
            <p className="fs-2">
              BWI is committed to provide holistic mental health programs and
              strategies through its evidence-based psychosocial support
              services for individuals, families and communities.
            </p>
          </div>

          <div
            className="container-fluid rounded-5 mt-5"
            style={{
              backgroundColor: "#f5e9cf",
              width: "1000px",
              height: "200px",
            }}
          >
            <h2 className="fw-semibold pt-3">Vision</h2>
            <p className="fs-2">
              BWI aspires to become a trusted partner institution of
              individuals, families and communities in creating psychosocial
              safe spaces.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
