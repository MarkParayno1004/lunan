import { Link } from "react-router-dom";
import "../css/PatientDashboard.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import SideLogo from "../img/BLOOMFIELDS_LOGO-03.png";
import { DefaultPagePatient } from "./DefaultPagePatient";
import { WeeklyForm } from "./WeeklyForm";
import { WellnessForm } from "./WellnessForm";
import { WellnessGuide } from "./WellnessGuide";
import { PatientAssignment } from "./PatientAssignment";
import { ViewAnswerWell } from "./ViewAnswerWell";
import { ViewAnswerWeek } from "./ViewAnswerWeek";
import PatientScheduler from "./PatientScheduler";

import { AvatarPatient } from "../SupportEngine/AvatarPatient";

export const PatientDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("default");
  const [showDropdownWell, setShowDropdownWell] = useState(false);
  const [showDropdownWeek, setShowDropdownWeek] = useState(false);
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
            {/*Wellness Form DropDown */}
            <li>
              <button
                id="hoverPatientList"
                onClick={() => {
                  setShowDropdownWell(!showDropdownWell);
                }}
              >
                {showDropdownWell === true ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
                <span className="ms-2">Wellness Form</span>
              </button>
            </li>
            <div>
              {showDropdownWell === true && (
                <>
                  <div
                    className={`d-flex justify-content-start ms-4  ${
                      activeComponent === "Wellness" ? "active" : ""
                    }`}
                  >
                    <button
                      id="hoverPatientList"
                      onClick={() => {
                        setActiveComponent("Wellness");
                      }}
                    >
                      Answer Form
                    </button>
                  </div>
                  <div
                    className={`d-flex justify-content-start ms-4  ${
                      activeComponent === "ViewWellness" ? "active" : ""
                    }`}
                  >
                    <button
                      id="hoverPatientList"
                      onClick={() => {
                        setActiveComponent("ViewWellness");
                      }}
                    >
                      View Answer
                    </button>
                  </div>
                </>
              )}
            </div>

            {/*Weekly Form DropDown */}
            <li>
              <button
                id="hoverPatientList"
                onClick={() => {
                  setShowDropdownWeek(!showDropdownWeek);
                }}
              >
                {showDropdownWeek === true ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
                <span className="ms-2">Weekly Form</span>
              </button>
            </li>
            <div>
              {showDropdownWeek === true && (
                <>
                  <div
                    className={`d-flex justify-content-start ms-4 ${
                      activeComponent === "Weekly" ? "active" : ""
                    }`}
                  >
                    <button
                      id="hoverPatientList"
                      onClick={() => {
                        setActiveComponent("Weekly");
                      }}
                    >
                      Answer Form
                    </button>
                  </div>
                  <div
                    className={`d-flex justify-content-start ms-4 ${
                      activeComponent === "ViewWeekly" ? "active" : ""
                    }`}
                  >
                    <button
                      id="hoverPatientList"
                      onClick={() => {
                        setActiveComponent("ViewWeekly");
                      }}
                    >
                      View Answer
                    </button>
                  </div>
                </>
              )}
            </div>
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
          <>
            <AvatarPatient
              style={{
                position: "fixed",
                bottom: 120 + "px",
                right: 24 + "px",
              }}
            />
            <AvatarPatient
              style={{ position: "fixed", bottom: 24 + "px", right: 24 + "px" }}
            />
            <DefaultPagePatient />
          </>
        ) : activeComponent === "Wellness" ? (
          <>
            <WellnessForm />
            <AvatarPatient
              style={{
                position: "fixed",
                bottom: 120 + "px",
                right: 24 + "px",
              }}
            />
            <AvatarPatient
              style={{ position: "fixed", bottom: 24 + "px", right: 24 + "px" }}
            />
          </>
        ) : activeComponent === "Weekly" ? (
          <>
            <WeeklyForm />
            <AvatarPatient
              style={{
                position: "fixed",
                bottom: 120 + "px",
                right: 24 + "px",
              }}
            />
            <AvatarPatient
              style={{ position: "fixed", bottom: 24 + "px", right: 24 + "px" }}
            />
          </>
        ) : activeComponent === "Guide" ? (
          <>
            <WellnessGuide />
            <AvatarPatient
              style={{
                position: "fixed",
                bottom: 120 + "px",
                right: 24 + "px",
              }}
            />
            <AvatarPatient
              style={{ position: "fixed", bottom: 24 + "px", right: 24 + "px" }}
            />
          </>
        ) : activeComponent === "Assignment" ? (
          <>
            <PatientAssignment />
            <AvatarPatient
              style={{
                position: "fixed",
                bottom: 120 + "px",
                right: 24 + "px",
              }}
            />
            <AvatarPatient
              style={{ position: "fixed", bottom: 24 + "px", right: 24 + "px" }}
            />
          </>
        ) : activeComponent === "ViewWellness" ? (
          <>
            <ViewAnswerWell />
            <AvatarPatient
              style={{
                position: "fixed",
                bottom: 120 + "px",
                right: 24 + "px",
              }}
            />
            <AvatarPatient
              style={{ position: "fixed", bottom: 24 + "px", right: 24 + "px" }}
            />
          </>
        ) : activeComponent === "ViewWeekly" ? (
          <>
            <ViewAnswerWeek />
            <AvatarPatient
              style={{
                position: "fixed",
                bottom: 120 + "px",
                right: 24 + "px",
              }}
            />
            <AvatarPatient
              style={{ position: "fixed", bottom: 24 + "px", right: 24 + "px" }}
            />
          </>
        ) : (
          activeComponent === "Schedule" && <PatientScheduler />
        )}
      </div>
    </div>
  );
};
