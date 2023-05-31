import assLogo from "./img/Assignment.png";
import wellFormLogo from "./img/WellnessForm.png";
import weekFormLogo from "./img/WeeklyForms.png";
import wellGuideLogo from "./img/WellnessGuide.png";
import scheduleLogo from "./img/Schedule.png";
import "../css/PatientDashboard.css";
import { Link } from "react-router-dom";
import { ModalComponent } from "./ModalComponent";

export const PatientDashboard = () => {
  return (
    <>
      <div class="d-flex align-items-center " id="pdBG">
        <div class="container text-center ">
          <div class="row align-items-start ">
            {/* Wellness Form */}
            <ModalComponent />
            <div class="col d-flex justify-content-end">
              <Link to="" style={{ textDecoration: "none" }}>
                <div>
                  <div
                    class="card rounded-5"
                    style={{ width: 18 + "rem" }}
                    id="cardBG"
                  >
                    <p class="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                      Wellness Form
                    </p>
                    <div class="card-body">
                      <img
                        src={wellFormLogo}
                        class="card-img-bottom"
                        style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Assignment */}
            <div class="col d-flex justify-content-center">
              <Link to="" style={{ textDecoration: "none" }}>
                <div>
                  <div
                    class="card rounded-5"
                    style={{ width: 18 + "rem" }}
                    id="cardBG"
                  >
                    <p class="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                      Assignment
                    </p>
                    <div class="card-body">
                      <img
                        src={assLogo}
                        class="card-img-bottom"
                        style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Weekly Form */}
            <div class="col d-flex justify-content-start">
              <Link to="" style={{ textDecoration: "none" }}>
                <div>
                  <div
                    class="card rounded-5"
                    style={{ width: 18 + "rem" }}
                    id="cardBG"
                  >
                    <p class="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                      Weekly Forms
                    </p>
                    <div class="card-body">
                      <img
                        src={weekFormLogo}
                        class="card-img-bottom"
                        style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Wellness Guide */}
          <div class="row align-items-start mt-5">
            <div class="col d-flex justify-content-end">
              <Link to="" style={{ textDecoration: "none" }}>
                <div>
                  <div
                    class="card rounded-5"
                    style={{ width: 18 + "rem" }}
                    id="cardBG"
                  >
                    <p class="card-text mt-3" style={{ fontSize: 36 + "px" }}>
                      Wellness Guide
                    </p>
                    <div class="card-body">
                      <img
                        src={wellGuideLogo}
                        class="card-img-bottom"
                        style={{ width: 150 + "px", paddingBottom: 10 + "px" }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Schedule */}
            <div class="col d-flex justify-content-start ms-5">
              <Link to="" style={{ textDecoration: "none" }}>
                <div>
                  <div
                    class="card rounded-5"
                    style={{ width: 18 + "rem" }}
                    id="cardBG"
                  >
                    <span
                      class="card-text mt-3"
                      style={{ fontSize: 36 + "px" }}
                    >
                      Schedule
                    </span>
                    <div class="card-body">
                      <img
                        src={scheduleLogo}
                        class="card-img-bottom pb-4"
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
    </>
  );
};
