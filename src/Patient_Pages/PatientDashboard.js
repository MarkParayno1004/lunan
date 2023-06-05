import { Link } from "react-router-dom";
import "../css/PatientDashboard.css";
import { ModalComponent } from "./ModalComponent";
import assLogo from "./img/Assignment.png";
import wellFormLogo from "./img/WellnessForm.png";
import weekFormLogo from "./img/WeeklyForms.png";
import wellGuideLogo from "./img/WellnessGuide.png";
import scheduleLogo from "./img/Schedule.png";

export const PatientDashboard = () => {
  return (
    <div className="d-flex align-items-center " id="pdBG">
      <div className="container text-center ">
        <div className="row align-items-start ">
          {/* Wellness Form */}
          <ModalComponent />
          <div className="col d-flex justify-content-end">
            <Link to="/Wellness Form" style={{ textDecoration: "none" }}>
              <div>
                <div
                  className="card rounded-5"
                  style={{ width: 18 + "rem" }}
                  id="cardBG"
                >
                  <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                    Wellness Form
                  </p>
                  <div className="card-body">
                    <img
                      alt="wellLogo"
                      src={wellFormLogo}
                      className="card-img-bottom"
                      style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Assignment */}
          <div className="col d-flex justify-content-center">
            <Link to="/Assignment" style={{ textDecoration: "none" }}>
              <div>
                <div
                  className="card rounded-5"
                  style={{ width: 18 + "rem" }}
                  id="cardBG"
                >
                  <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                    Assignment
                  </p>
                  <div className="card-body">
                    <img
                      alt="assignment"
                      src={assLogo}
                      className="card-img-bottom"
                      style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Weekly Form */}
          <div className="col d-flex justify-content-start">
            <Link to="/Weekly Form" style={{ textDecoration: "none" }}>
              <div>
                <div
                  className="card rounded-5"
                  style={{ width: 18 + "rem" }}
                  id="cardBG"
                >
                  <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                    Weekly Forms
                  </p>
                  <div className="card-body">
                    <img
                      alt="weekFormLogo"
                      src={weekFormLogo}
                      className="card-img-bottom"
                      style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Wellness Guide */}
        <div className="row align-items-start mt-5">
          <div className="col d-flex justify-content-end">
            <Link to="" style={{ textDecoration: "none" }}>
              <div>
                <div
                  className="card rounded-5"
                  style={{ width: 18 + "rem" }}
                  id="cardBG"
                >
                  <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                    Wellness Guide
                  </p>
                  <div className="card-body">
                    <img
                      alt="wellGuide"
                      src={wellGuideLogo}
                      className="card-img-bottom"
                      style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Schedule */}
          <div className="col d-flex justify-content-start ms-5">
            <Link to="" style={{ textDecoration: "none" }}>
              <div>
                <div
                  className="card rounded-5"
                  style={{ width: 18 + "rem" }}
                  id="cardBG"
                >
                  <span
                    className="card-text mt-3"
                    style={{ fontSize: 36 + "px" }}
                  >
                    Schedule
                  </span>
                  <div className="card-body">
                    <img
                      alt="scheduleLogo"
                      src={scheduleLogo}
                      className="card-img-bottom pb-4"
                      style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
