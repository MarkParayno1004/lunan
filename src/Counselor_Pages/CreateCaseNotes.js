import React from "react";
import { Link } from "react-router-dom";
import Pic from "../img/ProfilePic.png";
import { useState } from "react";
import "../css/CreateCaseNotes.css";

export const CreateCaseNotes = (patient) => {
  const [getDiagnosis, setDiagnosis] = useState("");
  return (
    <div className="container-fluid d-flex justify-content-center" id="cnoteBG">
      <div
        className="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center"
        id="cnoteCard"
      >
        <div className="container-lg mt-5">
          <h1>Create Case Notes</h1>
          <div className="container-lg rounded-4" id="Create-Case-Notes">
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
            <div className="ms-5 mt-3">
              <strong className="fw-normal">Diagnosis: </strong>
            </div>
            <div className="rounded-4 ms-5 mt-3">
              <div class="form-floating">
                <textarea
                  class="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  onChange={(e) => {
                    setDiagnosis(e.target.value);
                  }}
                  style={{ height: 200 + "px" }}
                ></textarea>
                <label for="floatingTextarea2">Input Diagnosis</label>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-2 mb-2">
            <Link to="/Counselor Dashboard" style={{ textDecoration: "none" }}>
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
