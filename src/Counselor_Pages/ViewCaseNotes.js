import React from "react";
import { Link } from "react-router-dom";
import Pic from "../img/ProfilePic.png";
import "../css/ViewCaseNotes.css";

export const ViewCaseNotes = (patient) => {
  return (
    <div className="container-fluid d-flex justify-content-center" id="vcaseBG">
      <div
        className="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center"
        id="vcaseCard"
      >
        <div className="container-lg mt-5">
          <h1>Patient Case Notes</h1>
          <div className="container-lg rounded-4" id="Case-Notes">
            <div className="row d-flex align-items-center pt-3 ps-3">
              <div className="col-1">
                <img
                  src={Pic}
                  alt={patient.name}
                  className="patient-picture"
                  style={{ width: 100 + "px" }}
                />
              </div>
              <div className="col-4 ">
                <div className="patient-text ms-3">
                  <span>{patient.name}PatientA</span>
                  <div>
                    <span>
                      <strong className="fw-normal">Date Added: </strong>
                      {patient.dateAdded}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="rounded-4 ms-5 mt-3"
              id="bgSession"
              style={{ height: 5 + "rem" }}
            >
              <div className="ms-3">
                <div className="pt-3">
                  <strong className="fw-normal">Session Number: </strong>
                </div>
                <div>
                  <strong className="fw-normal">Date Created: </strong>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-2 mb-2">
            <Link to="/View Patient List" style={{ textDecoration: "none" }}>
              <button
                className="me-2 rounded-5 fw-semibold"
                id="casebackButton"
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
