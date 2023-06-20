import { Navbar } from "../Navbar";
import "../css/AboutUs.css";
export const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid" id="bgAboutUs">
        <div
          className="d-flex justify-content-center d-flex al"
          style={{ backgroundColor: "#f5e9cf" }}
        ></div>
        <div className="row ">
          <div className="col" style={{ backgroundColor: "#f5e9cf" }}>
            BOBO
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
};
