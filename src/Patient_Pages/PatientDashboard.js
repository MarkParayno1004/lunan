import { Link } from "react-router-dom";
import "../css/PatientDashboard.css";
import { useState } from "react";
import { ModalComponent } from "./ModalComponent";
import assLogo from "./img/Assignment.png";
import wellFormLogo from "./img/WellnessForm.png";
import weekFormLogo from "./img/WeeklyForms.png";
import wellGuideLogo from "./img/WellnessGuide.png";
import scheduleLogo from "./img/Schedule.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import SideLogo from "../img/BLOOMFIELDS_LOGO-03.png";
import { DefaultPagePatient } from "./DefaultPagePatient";
import { WeeklyForm } from "./WeeklyForm";
import { WellnessForm } from "./WellnessForm";
import { WellnessGuide } from "./WellnessGuide";
import { PatientAssignment } from "./PatientAssignment";
import { Schedule } from "./Schedule";
export const PatientDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("default");
  return (
    <div className=" d-flex align-items-start" id="sdBG">
      <div class="d-flex flex-column flex-shrink-0 p-3 " id="sideBarPatient">
        <div className="d-flex justify-content-center">
          <img src={SideLogo} style={{ width: 13 + "rem" }} />
        </div>
        <h5>Welcome </h5>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li
            className={`d-flex justify-content-start ${
              activeComponent === "default" ? "active" : ""
            }`}
          >
            <button
              id="hoverPatientList"
              onClick={() => {
                setActiveComponent("default");
              }}
            >
              Dashboard
            </button>
          </li>
          <div className="ms-2 mt-1">
            <li
              className={`d-flex justify-content-start ${
                activeComponent === "Wellness" ? "active" : ""
              }`}
            >
              <button
                id="hoverPatientList"
                onClick={() => {
                  setActiveComponent("Wellness");
                }}
              >
                Wellness Form
              </button>
            </li>
            <li
              className={`d-flex justify-content-start ${
                activeComponent === "Weekly" ? "active" : ""
              }`}
            >
              <button
                id="hoverPatientList"
                onClick={() => {
                  setActiveComponent("Weekly");
                }}
              >
                Weekly Forms
              </button>
            </li>
            <li
              className={`d-flex justify-content-start ${
                activeComponent === "Guide" ? "active" : ""
              }`}
            >
              <button
                id="hoverPatientList"
                onClick={() => {
                  setActiveComponent("Guide");
                }}
              >
                Wellness Guide
              </button>
            </li>
            <li
              className={`d-flex justify-content-start ${
                activeComponent === "Assignment" ? "active" : ""
              }`}
            >
              <button
                id="hoverPatientList"
                onClick={() => {
                  setActiveComponent("Assignment");
                }}
              >
                Assignment
              </button>
            </li>
            <li
              className={`d-flex justify-content-start ${
                activeComponent === "Schedule" ? "active" : ""
              }`}
            >
              <button
                id="hoverPatientList"
                onClick={() => {
                  setActiveComponent("Schedule");
                }}
              >
                Schedule
              </button>
            </li>
          </div>
        </ul>
        <div className="d-flex justify-content-start">
          <Link to="/Login" style={{ textDecoration: "none" }}>
            <button
              className="btn rounded-5"
              style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <div className="container-fluid">
        {activeComponent === "default" ? (
          <DefaultPagePatient />
        ) : activeComponent === "Wellness" ? (
          <WellnessForm />
        ) : activeComponent === "Weekly" ? (
          <WeeklyForm />
        ) : activeComponent === "Guide" ? (
          <WellnessGuide />
        ) : activeComponent === "Assignment" ? (
          <PatientAssignment />
        ) : (
          activeComponent === "Schedule" && <Schedule />
        )}
      </div>
      <div
        className="me-5 d-flex align-items-end"
        style={{ height: 95 + "vh" }}
      >
        <div>
          <button style={{ border: "none", background: "none" }}>
            <FontAwesomeIcon
              className="fa-3x"
              icon={faComment}
              flip="horizontal"
              color={"#4d455d"}
              size={32}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
