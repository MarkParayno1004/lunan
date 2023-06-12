import { Link } from "react-router-dom";
import "../css/CounselorDashboard.css";

export const CounselorDashboard = () => {
  return (
    <div className="d-flex align-items-center" id="cdBG">
      <div className="container text-center">
        <div className="row align-items-start">
          {/* View Patients */}
          <div className="col d-flex justify-content-end">
            <Link to="/Patient List" style={{ textDecoration: "none" }}>
              <div>
                <div
                  className="card rounded-5"
                  style={{ width: 18 + "rem" }}
                  id="cardBG"
                >
                  <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                    View Patients
                  </p>
                  <div className="card-body">
                    <img
                      alt="View Patients"
                      // src={wellFormLogo}
                      className="card-img-bottom"
                      style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* View Patients Assignments */}
          <div className="col d-flex justify-content-end">
            <Link
              to="/View Patients Assignment"
              style={{ textDecoration: "none" }}
            >
              <div>
                <div
                  className="card rounded-5"
                  style={{ width: 18 + "rem" }}
                  id="cardBG"
                >
                  <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                    View Patients Assignments
                  </p>
                  <div className="card-body">
                    <img
                      alt="View Patients Assignments"
                      // src={wellFormLogo}
                      className="card-img-bottom"
                      style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Patient Weekly Forms */}
          <div className="col d-flex justify-content-end">
            <Link
              to="/Patients Weekly Forms"
              style={{ textDecoration: "none" }}
            >
              <div>
                <div
                  className="card rounded-5"
                  style={{ width: 18 + "rem" }}
                  id="cardBG"
                >
                  <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                    Patient Weekly Forms
                  </p>
                  <div className="card-body">
                    <img
                      alt="Patient Weekly Forms"
                      // src={wellFormLogo}
                      className="card-img-bottom"
                      style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Patient Wellness Forms */}
          <div className="col d-flex justify-content-end">
            <Link
              to="/Patients Wellness Forms"
              style={{ textDecoration: "none" }}
            >
              <div>
                <div
                  className="card rounded-5"
                  style={{ width: 18 + "rem" }}
                  id="cardBG"
                >
                  <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                    Patient Wellness Forms
                  </p>
                  <div className="card-body">
                    <img
                      alt="Patient Wellness Forms"
                      // src={wellFormLogo}
                      className="card-img-bottom"
                      style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Schedule */}
          <div className="col d-flex justify-content-end">
            <Link to="/Schedule" style={{ textDecoration: "none" }}>
              <div>
                <div
                  className="card rounded-5"
                  style={{ width: 18 + "rem" }}
                  id="cardBG"
                >
                  <p className="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                    Schedule
                  </p>
                  <div className="card-body">
                    <img
                      alt="Schedule"
                      // src={wellFormLogo}
                      className="card-img-bottom"
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
