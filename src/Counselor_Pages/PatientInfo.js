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
    <Modal size="lg" show={props.show} onHide={props.onHide}>
      <Modal.Body id="piModal">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Patient Information
          </Modal.Title>
        </Modal.Header>
        <div className="container-lg">
          <div className="patient-info rounded-4 mt-3" id="piBG">
            <div className="row d-flex align-items-center pt-3 ps-3 patient-details">
              <div className="col-1">
                <img
                  src={Pic}
                  alt={props.name}
                  className="patient-picture"
                  style={{ width: 100 + "px" }}
                />
              </div>
              <div className="col-4 ms-5">
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

              <div className="ms-2 mt-2">
                <strong className="fw-normal">Diagnosis:</strong>
                <p>{props.diagnosis}</p>
              </div>
            </div>
            <div className="button-group d-flex justify-content-end pb-3 pe-4 mt-5">
              <Link
                to="/View Patients Assignment"
                style={{ textDecoration: "none" }}
              >
                <button
                  className="me-2 rounded-5 fw-semibold"
                  onClick={handleViewCaseNotes}
                  id="viewButton"
                >
                  View Assignment
                </button>
              </Link>
              <Link to="/View Case Notes" style={{ textDecoration: "none" }}>
                <button
                  className="me-2 rounded-5 fw-semibold"
                  onClick={handleViewCaseNotes}
                  id="viewButton"
                >
                  View Case Notes
                </button>
              </Link>
              <Link
                to="/Patient Weekly Form"
                style={{ textDecoration: "none" }}
              >
                <button
                  className="me-2 rounded-5 fw-semibold"
                  onClick={handleViewCaseNotes}
                  id="viewButton"
                >
                  View Weekly Form
                </button>
              </Link>
              <Link
                to="/Patient Wellness Form"
                style={{ textDecoration: "none" }}
              >
                <button
                  className="me-2 rounded-5 fw-semibold"
                  onClick={handleViewCaseNotes}
                  id="viewButton"
                >
                  View Wellness Form
                </button>
              </Link>
              <Link to="/Create Case Notes" style={{ textDecoration: "none" }}>
                <button
                  className="rounded-5 fw-semibold"
                  onClick={handleCreateCaseNotes}
                  id="viewButton"
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
