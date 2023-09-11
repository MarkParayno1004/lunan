import Modal from "react-bootstrap/Modal";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
export const PatientInfo = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} size="xl">
        <Modal.Body id="piModal">
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Handling Counselor
            </Modal.Title>
          </Modal.Header>
          <div className="container-fluid">
            <PatientData />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

//!PATIENT DATA
const PatientData = () => {
  //!View Assignment Modal Behaviour
  const [showAss, setShowAss] = useState(false);
  const handleAss = () => setShowAss(true);
  const handleCloseAss = () => setShowAss(false);

  //!View Case Note Modal Behaviour
  const [showCase, setShowCase] = useState(false);
  const handleCase = () => setShowCase(true);
  const handleCloseCase = () => setShowCase(false);

  return (
    <div className="patient-info rounded-5 mt-3 ps-5 pe-5" id="piBG">
      <div className="row d-flex align-items-start d-flex justify-content-start pt-3 ps-3 patient-details">
        <div className="col-1 ">
          <img
            src=""
            className="patient-picture"
            style={{ width: 100 + "px" }}
          />
        </div>
        <div
          className="col-8 ms-5 d-flex justify-content-center rounded-5"
          id="colBG"
        >
          <div className="container-fluid patient-text">
            {/*1st Row Header*/}
            <div className="row">
              <div className="col">
                <strong>Name: </strong>
                <span style={{ color: "red" }}></span>
              </div>
              <div className="col">
                <strong>Age: </strong>
                <span style={{ color: "red" }}></span>
              </div>
              <div className="col">
                <strong>Gender: </strong>
                <span style={{ color: "red" }}></span>
              </div>
            </div>

            {/*2nd Row Header*/}
            <div className="row">
              <div className="col">
                <strong>Birthday: </strong>
                <span style={{ color: "red" }}></span>
              </div>
              <div className="col">
                <strong>Address: </strong>
                <span style={{ color: "red" }}></span>
              </div>
              <div className="col">
                <strong>Assigned Counselor: </strong>
                <span style={{ color: "red" }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Body Column */}
      <div className="container-fluid rounded-5 mt-3 pt-2 pb-2 pe-4" id="colBG">
        {/*1st Row Body Column */}
        <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
          <div className="col">
            <strong>Cell Phone Number: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Home Phone Number: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Email: </strong>
            <span style={{ color: "red" }}></span>
          </div>
        </div>

        {/*2nd Row Body Column */}
        <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
          <div className="col">
            <strong>Sexual preference: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Marital status: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Previous psychotherapy: </strong>
            <span style={{ color: "red" }}></span>
          </div>
        </div>

        {/*3rd Row Body Column */}
        <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
          <div className="col">
            <strong>Current prescribed psychiatric medications:</strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Emergency contact person name: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Emergency contact person number: </strong>
            <span style={{ color: "red" }}></span>
          </div>
        </div>

        {/*4th Row Body Column */}
        <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
          <div className="col">
            <strong>Suicidal thoughts:</strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Past suicidal thoughts: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Current homicidal thoughts: </strong>
            <span style={{ color: "red" }}></span>
          </div>
        </div>

        {/*5th Row Body Column */}
        <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
          <div className="col">
            <strong>Previous homicidal thoughts:</strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Current physical health: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Last physical examination: </strong>
            <span style={{ color: "red" }}></span>
          </div>
        </div>

        {/*6th Row Body Column */}
        <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
          <div className="col">
            <strong>List of chronic health problem:</strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Any allergies: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>List of maintenance medication: </strong>
            <span style={{ color: "red" }}></span>
          </div>
        </div>

        {/*7th Row Body Column */}
        <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
          <div className="col">
            <strong>Any past head injury:</strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Lately significant changes or stressors: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Depressed mood or sadness: </strong>
            <span style={{ color: "red" }}></span>
          </div>
        </div>

        {/*8th Row Body Column */}
        <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
          <div className="col">
            <strong>Anxiety:</strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Phobias: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Hallucinations: </strong>
            <span style={{ color: "red" }}></span>
          </div>
        </div>

        {/*9th Row Body Column */}
        <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
          <div className="col">
            <strong>Sexual abuse:</strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Physical abuse: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Emotional abuse: </strong>
            <span style={{ color: "red" }}></span>
          </div>
        </div>
      </div>

      {/*Buttons */}
      <div className="button-group d-flex justify-content-end pb-3 pe-4 mt-5">
        <button
          className="me-2 rounded-5 fw-semibold"
          id="viewButton"
          onClick={handleAss}
        >
          View Assignment
        </button>

        <button
          className="me-2 rounded-5 fw-semibold"
          id="viewButton"
          onClick={handleCase}
        >
          View Case Notes
        </button>

        <button className="me-2 rounded-5 fw-semibold" id="viewButton">
          View Weekly Form
        </button>

        <button className="me-2 rounded-5 fw-semibold" id="viewButton">
          View Daily Form
        </button>

        <ViewModalAssign show={showAss} handleClose={handleCloseAss} />
        <ViewModalCase show={showCase} handleClose={handleCloseCase} />

        {/* <ViewWeeklyForm show={showWeek} handleClose={handleCloseWeek} /> */}
        {/* <ViewWellnessForm
            show={showWell}
            handleClose={handleCloseWell}
          /> */}
      </div>
    </div>
  );
};

//!MODALS

//!Assignment Modals
const ViewModalAssign = (props) => {
  const [activeTab, setActiveTab] = useState("turnedIn");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShowCreate = (selectedPatientUID) => {
    console.log(
      `Creating assignments for patient with UID: ${selectedPatientUID}`
    );
    setShow(true);
  };

  const [showFiles, setShowFiles] = useState();
  const handleCloseFiles = () => setShowFiles(false);
  const handleShowFiles = () => setShowFiles(true);

  const handleSubmit = () => {
    Swal.fire({
      background: "#4d455d",
      color: "#f5e9cf",
      position: "center",
      icon: "success",
      title: "Assignment successfully created!",
      showConfirmButton: false,
      timer: 2000,
    });
    setShow(false);
  };
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      className="mt-3"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>View Assignment</Modal.Title>
        </Modal.Header>
        <div className="tabs mt-4 mb-3 d-flex justify-content-start">
          <button
            className={`me-3 rounded-5 ${
              activeTab === "turnedIn" ? "active" : ""
            }`}
            onClick={() => handleTabChange("turnedIn")}
            style={{ borderStyle: "none" }}
          >
            Turned-in Assignments
          </button>
          <button
            className={`me-3 rounded-5 ${
              activeTab === "verified" ? "active" : ""
            }`}
            onClick={() => handleTabChange("verified")}
            style={{ borderStyle: "none" }}
          >
            Verified Assignments
          </button>
        </div>
        <table class="table table-dark table-hover">
          {activeTab === "turnedIn" && (
            <>
              <thead>
                <tr>
                  <th scope="col">Activity:</th>
                  <th scope="col">Descsription:</th>
                  <th scope="col">Turned in on:</th>
                  <th scope="col">Verify:</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr>
                  <td>
                    <span
                      onClick={handleShowFiles}
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      Journal and Drawing Entry
                    </span>
                    <AssignmentFiles
                      show={showFiles}
                      handleClose={handleCloseFiles}
                    />
                  </td>
                  <td>
                    Make a Journal about yourself and make a drawing entry that
                    represents you today.
                  </td>
                  <td>March 8, 2023</td>
                  <td>
                    <button
                      className="btn"
                      style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          )}
          {activeTab === "verified" && (
            <>
              <thead>
                <tr>
                  <th scope="col">Activity:</th>
                  <th scope="col">Turned in on:</th>
                  <th scope="col">Files:</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr>
                  <td>Journal and Drawing Entry</td>
                  <td>March 8, 2023</td>
                  <td>JournalDrawingEntry.docx</td>
                </tr>
              </tbody>
            </>
          )}
        </table>
        <Modal.Footer>
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            variant="secondary"
            onClick={props.handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

const AssignmentFiles = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Files Submitted</Modal.Title>
        </Modal.Header>
        <table class="table">
          <tr>
            <th scope="col">Files:</th>
            <th scope="col">Date:</th>
          </tr>
          <tbody>
            <td>JournalDrawingEntry.docx</td>
            <td>06/29/2023</td>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

//!Case Notes Modals
const ViewModalCase = (props) => {
  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={props.handleClose}>
            Close
          </button>
          <button variant="primary" onClick={props.handleClose}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
