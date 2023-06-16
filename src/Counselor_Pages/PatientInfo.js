import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Pic from "../img/ProfilePic.png";
import "../css/PatientInfo.css";

export const PatientInfo = (props) => {
  const handleBack = () => {
    // Handle back button functionality
  };

  const handleViewCaseNotes = () => {
    // Handle view case notes button functionality
  };

  const handleCreateCaseNotes = () => {
    // Handle create case notes button functionality
  };

  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Body>
        <div className="container-lg mt-5">
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              <h1>Patient Information</h1>
            </Modal.Title>
          </Modal.Header>
          <div className="patient-info rounded-4" id="piBG">
            <div className="row d-flex align-items-center pt-3 ps-3 patient-details">
              <div className="col-1">
                <img
                  src={Pic}
                  alt={props.name}
                  className="patient-picture"
                  style={{ width: 100 + "px" }}
                />
              </div>
              <div className="col-4 ">
                <div className="patient-text ms-3">
                  <span>{props.name}PatientA</span>
                  <div>
                    <span>
                      <strong className="fw-normal">Date Added: </strong>
                      {props.dateAdded}
                    </span>
                  </div>
                  <div>
                    <span>
                      <strong className="fw-normal">Last Session: </strong>
                      {props.lastSession}
                    </span>
                  </div>
                </div>
              </div>

              <div className="ms-4 mt-2">
                <strong className="fw-normal">Diagnosis:</strong>
                <p>{props.diagnosis}</p>
              </div>
            </div>
            <div className="button-group d-flex justify-content-end pb-3 pe-4">
              <Link to="/View Patient List" style={{ textDecoration: "none" }}>
                <button
                  className="me-2 rounded-5 fw-semibold"
                  onClick={handleBack}
                  id="backButton"
                >
                  Back
                </button>
              </Link>
              <Link
                to="/View Patients Assignment"
                style={{ textDecoration: "none" }}
              >
                <button
                  className="me-2 rounded-5 fw-semibold"
                  onClick={handleViewCaseNotes}
                  id="viewAssButton"
                >
                  View Assignment
                </button>
              </Link>
              <Link to="/View Case Notes" style={{ textDecoration: "none" }}>
                <button
                  className="me-2 rounded-5 fw-semibold"
                  onClick={handleViewCaseNotes}
                  id="viewcaseButton"
                >
                  View Case Notes
                </button>
              </Link>
              <Link to="/Create Case Notes" style={{ textDecoration: "none" }}>
                <button
                  className="rounded-5 fw-semibold"
                  onClick={handleCreateCaseNotes}
                  id="createButton"
                >
                  Create Case Notes
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
