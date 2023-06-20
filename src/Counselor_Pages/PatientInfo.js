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
    <Modal
      dialogClassName="modal-90w"
      size="xl"
      aria-labelledby="example-custom-modal-styling-title"
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Body id="piModal">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Patient Information
          </Modal.Title>
        </Modal.Header>
        <div className="container-fluid">
          <div className="patient-info rounded-5 mt-3 ps-5 pe-5" id="piBG">
            <div className="row d-flex align-items-start d-flex justify-content-start pt-3 ps-3 patient-details">
              <div className="col-1 ">
                <img
                  src={Pic}
                  alt={props.name}
                  className="patient-picture"
                  style={{ width: 100 + "px" }}
                />
              </div>
              <div
                className="col-8 ms-5 d-flex justify-content-center rounded-5"
                id="colBG"
              >
                <div className="container-fluid patient-text">
                  {/*1st Row */}
                  <div className="row">
                    <div className="col">
                      <strong>Name: </strong>
                      <span style={{ color: "red" }}>{props.name}</span>
                    </div>
                    <div className="col">
                      <strong>Age: </strong>
                      <span style={{ color: "red" }}>{props.age}</span>
                    </div>
                    <div className="col">
                      <strong>Gender: </strong>
                      <span style={{ color: "red" }}>{props.gender}</span>
                    </div>
                  </div>

                  {/*2nd Row */}
                  <div className="row mt-3">
                    <div className="col">
                      <strong>Birthday: </strong>
                      <span style={{ color: "red" }}>{props.birthday}</span>
                    </div>
                    <div className="col">
                      <strong>Address: </strong>
                      <span style={{ color: "red" }}>{props.address}</span>
                    </div>
                    <div className="col">
                      <strong>Assigned Counselor: </strong>
                      <span style={{ color: "red" }}>{props.counselor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="container-fluid rounded-5 mt-3 pt-2 pb-2 pe-4"
              id="colBG"
            >
              {/*3rd Row */}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col ">
                  <strong>Cell Phone Number: </strong>
                  <span style={{ color: "red" }}>{props.cellPhoneNum}</span>
                </div>
                <div className="col">
                  <strong>Home Phone Number: </strong>
                  <span style={{ color: "red" }}>{props.homePhoneNumber}</span>
                </div>
                <div className="col">
                  <strong>Email:</strong>
                  <span style={{ color: "red" }}>{props.email}</span>
                </div>
              </div>

              {/*4th Row  pt-2 pb-2*/}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Sexual Preference: </strong>
                  <span style={{ color: "red" }}>{props.sexualPref}</span>
                </div>
                <div className="col">
                  <strong>Marital Status:</strong>
                  <span style={{ color: "red" }}>{props.maritalStatus}</span>
                </div>
                <div className="col">
                  <strong>Previous Psychotherapy: </strong>
                  <span style={{ color: "red" }}>{props.yesorNo3}</span>
                </div>
              </div>

              {/*5th Row  pt-2 pb-2*/}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Current prescribed psychiatric medications:</strong>
                  <span style={{ color: "red" }}>
                    {props.currentPsychiatricMedication}
                  </span>
                </div>
                <div className="col">
                  <strong>Emergency contact person name:</strong>
                  <span style={{ color: "red" }}>
                    {props.contactEmergencyName}
                  </span>
                </div>
                <div className="col">
                  <strong>Emergency contact person number:</strong>
                  <span style={{ color: "red" }}>
                    {props.contactEmergencyNum}
                  </span>
                </div>
              </div>

              {/*6th Row  pt-2 pb-2*/}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Suicidal thoughts: </strong>
                  <span style={{ color: "red" }}>{props.suicidalThoughts}</span>
                </div>
                <div className="col">
                  <strong>Past suicidal thoughts: </strong>
                  <span style={{ color: "red" }}>
                    {props.pastSuicidalThoughts}
                  </span>
                </div>
                <div className="col">
                  <strong>Current homicidal thoughts: </strong>
                  <span style={{ color: "red" }}>
                    {props.homicidalThoughts}
                  </span>
                </div>
              </div>

              {/*7th Row  pt-2 pb-2*/}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Previous homicidal thoughts: </strong>
                  <span style={{ color: "red" }}>{props.prevHomiThoughts}</span>
                </div>
                <div className="col">
                  <strong>Current physical health: </strong>
                  <span style={{ color: "red" }}>{props.currentPhyHealth}</span>
                </div>
                <div className="col">
                  <strong>Last physical examination: </strong>
                  <span style={{ color: "red" }}>{props.lastPhyExam}</span>
                </div>
              </div>

              {/*8th Row  pt-2 pb-2*/}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>List of chronic health problem: </strong>
                  <span style={{ color: "red" }}>
                    {props.listChronicProblem}
                  </span>
                </div>
                <div className="col">
                  <strong>Any Allergies: </strong>
                  <span style={{ color: "red" }}>{props.anyAllergies}</span>
                </div>
                <div className="col">
                  <strong>List of maintenance medication: </strong>
                  <span style={{ color: "red" }}>{props.listMainMeds}</span>
                </div>
              </div>

              {/*9th Row  pt-2 pb-2*/}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Regular intake of alcohol: </strong>
                  <span style={{ color: "red" }}>
                    {props.regularIntakeAlcohol}
                  </span>
                </div>
                <div className="col">
                  <strong>Engage in recreational drug use: </strong>
                  <span style={{ color: "red" }}>{props.recreateDrugUse}</span>
                </div>
                <div className="col">
                  <strong>Habit of smoke: </strong>
                  <span style={{ color: "red" }}>
                    {props.habitSmoke} # of cigar per day
                  </span>
                </div>
              </div>

              {/*10th Row pt-2 pb-2 */}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Any past head injury: </strong>
                  <span style={{ color: "red" }}>{props.headInjury}</span>
                </div>
                <div className="col">
                  <strong>Lately significant changes or stressors: </strong>
                  <span style={{ color: "red" }}>{props.changesStressors}</span>
                </div>
                <div className="col">
                  <strong>Depressed Mood or Sadness: </strong>
                  <span style={{ color: "red" }}>{props.DepressSad}</span>
                </div>
              </div>

              {/*11th Row pt-2 pb-2 */}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Axiety: </strong>
                  <span style={{ color: "red" }}>{props.anxiety}</span>
                </div>
                <div className="col">
                  <strong>Phobias: </strong>
                  <span style={{ color: "red" }}>{props.phobias}</span>
                </div>
                <div className="col">
                  <strong>Hallucinations: </strong>
                  <span style={{ color: "red" }}>{props.hallucinations}</span>
                </div>
              </div>

              {/*12th Row */}
              <div className="row ms-2 mt-2">
                <div className="col">
                  <strong>Sexual Abuse: </strong>
                  <span style={{ color: "red" }}>{props.sexualAbuse}</span>
                </div>
                <div className="col">
                  <strong>Physical Abuse: </strong>
                  <span style={{ color: "red" }}>{props.phyAbuse}</span>
                </div>
                <div className="col">
                  <strong>Emotional Abuse: </strong>
                  <span style={{ color: "red" }}>{props.emotionalAbuse}</span>
                </div>
              </div>
            </div>

            {/*Buttons */}
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
