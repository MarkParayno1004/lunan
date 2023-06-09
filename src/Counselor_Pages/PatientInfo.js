import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Pic from "../img/ProfilePic.png";
import { useState, useRef } from "react";
import "../css/PatientInfo.css";
import Swal from "sweetalert2";

export const PatientInfo = (props) => {
  //!View Assignment Modal Behaviour
  const [showAss, setShowAss] = useState(false);
  const handleCloseAss = () => setShowAss(false);
  const handleShowAss = () => setShowAss(true);

  //!View Case Notes  Modal Behaviour
  const [showCase, setShowCase] = useState(false);
  const handleCloseCase = () => setShowCase(false);
  const handleShowCase = () => setShowCase(true);

  //!View Weekly Form  Modal Behaviour
  const [showWeek, setShowWeek] = useState(false);
  const handleCloseWeek = () => setShowWeek(false);
  const handleShowWeek = () => setShowWeek(true);

  //!View Wellness Form Modal Behaviour
  const [showWell, setShowWell] = useState(false);
  const handleCloseWell = () => setShowWell(false);
  const handleShowWell = () => setShowWell(true);

  //!Create Case Notes Form Modal Behaviour
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => {
    setShowCreate(false);
  };
  const handleShowCreate = () => setShowCreate(true);
  const handleSubmitCreate = () => {
    Swal.fire({
      background: "#4d455d",
      color: "#f5e9cf",
      position: "center",
      icon: "success",
      title: "Case note has been created sucessfully!",
      showConfirmButton: false,
      timer: 2000,
    });
    setShowCreate(false);
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

              {/*4th Row  */}
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

              {/*5th Row  */}
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

              {/*6th Row  */}
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

              {/*7th Row  */}
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

              {/*8th Row  */}
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

              {/*9th Row */}
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

              {/*10th Row */}
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

              {/*11th Row */}
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
              <button
                className="me-2 rounded-5 fw-semibold"
                onClick={handleShowAss}
                id="viewButton"
              >
                View Assignment
              </button>

              <button
                className="me-2 rounded-5 fw-semibold"
                onClick={handleShowCase}
                id="viewButton"
              >
                View Case Notes
              </button>

              <button
                className="me-2 rounded-5 fw-semibold"
                onClick={handleShowWeek}
                id="viewButton"
              >
                View Weekly Form
              </button>

              <button
                className="me-2 rounded-5 fw-semibold"
                onClick={handleShowWell}
                id="viewButton"
              >
                View Daily Form
              </button>

              <button
                className="rounded-5 fw-semibold"
                onClick={handleShowCreate}
                id="viewButton"
              >
                Create Case Notes
              </button>
              <ViewModalAssign show={showAss} handleClose={handleCloseAss} />
              <ViewCaseNotes show={showCase} handleClose={handleCloseCase} />
              <ViewWeeklyForm show={showWeek} handleClose={handleCloseWeek} />
              <ViewWellnessForm show={showWell} handleClose={handleCloseWell} />
              <CreateCaseNotes
                show={showCreate}
                handleClose={handleCloseCreate}
                handleSubmit={handleSubmitCreate}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

//!MODALS

const ViewModalAssign = (props) => {
  const [activeTab, setActiveTab] = useState("turnedIn");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <div className="tabs mt-4 d-flex justify-content-start">
          <button
            className={`me-3 ${activeTab === "turnedIn" ? "active" : ""}`}
            onClick={() => handleTabChange("turnedIn")}
          >
            Turned-in Assignments
          </button>
          <button
            className={activeTab === "verified" ? "active" : ""}
            onClick={() => handleTabChange("verified")}
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
            onClick={handleShow}
          >
            Create Assignment
          </button>
          <CreateAssignment
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
          />
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

const ViewCaseNotes = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>View Case Notes</Modal.Title>
        </Modal.Header>

        <table class="table table-dark table-hover mt-3">
          {}
          <thead>
            <tr>
              <th scope="col">Name:</th>
              <th scope="col">Date Created:</th>
              <th scope="col">View Case:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>06/22/2023</td>
              <td>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#f5e9cf",
                    color: "#4d455d",
                    width: "auto",
                  }}
                  onClick={handleShow}
                >
                  View Note
                </button>
              </td>
              <PublishCaseNotes show={show} handleClose={handleClose} />
            </tr>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

const ViewWeeklyForm = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [activeTab, setActiveTab] = useState("submitted");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Patients Weekly Form</Modal.Title>
        </Modal.Header>
        <div className="tabs mt-4 d-flex justify-content-start">
          <button
            className={`me-3 ${activeTab === "submitted" ? "active" : ""}`}
            onClick={() => handleTabChange("submitted")}
          >
            Submitted Assignment
          </button>
          <button
            className={activeTab === "verified" ? "active" : ""}
            onClick={() => handleTabChange("verified")}
          >
            Verified Assignments
          </button>
        </div>
        {activeTab === "submitted" && (
          <>
            <h5>Submitted:</h5>
            <table class="table table-dark table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">Name:</th>
                  <th scope="col">Date Submited:</th>
                  <th scope="col">View Form:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>06/22/2023</td>
                  <td>
                    <button
                      className="btn"
                      style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
                      onClick={handleShow}
                    >
                      Form
                    </button>
                    <ViewFormWeek show={show} handleClose={handleClose} />
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        {activeTab === "verified" && (
          <>
            <h5>Verified:</h5>
            <table class="table table-dark table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">Name:</th>
                  <th scope="col">Date Submited:</th>
                  <th scope="col">View Form:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>06/22/2023</td>
                  <td>
                    <button
                      className="btn"
                      style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
                      onClick={handleShow}
                    >
                      Form
                    </button>
                    <ViewFormWeek show={show} handleClose={handleClose} />
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

const ViewWellnessForm = (props) => {
  const [activeTab, setActiveTab] = useState("submitted");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Patients Daily Form</Modal.Title>
        </Modal.Header>
        <div className="tabs mt-4 d-flex justify-content-start">
          <button
            className={`me-3 ${activeTab === "submitted" ? "active" : ""}`}
            onClick={() => handleTabChange("submitted")}
          >
            Submitted Assignment
          </button>
          <button
            className={activeTab === "verified" ? "active" : ""}
            onClick={() => handleTabChange("verified")}
          >
            Verified Assignments
          </button>
        </div>
        {activeTab === "submitted" && (
          <>
            <h5>Submitted:</h5>
            <table class="table table-dark table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">Name:</th>
                  <th scope="col">Date Submited:</th>
                  <th scope="col">View Form:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>06/22/2023</td>
                  <td>
                    <button
                      className="btn"
                      style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
                      onClick={handleShow}
                    >
                      Form
                    </button>
                    <ViewFormWell show={show} handleClose={handleClose} />
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        {activeTab === "verified" && (
          <>
            <h5>Verified:</h5>
            <table class="table table-dark table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">Name:</th>
                  <th scope="col">Date Submited:</th>
                  <th scope="col">View Form:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>06/22/2023</td>
                  <td>
                    <button
                      className="btn"
                      style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
                      onClick={handleShow}
                    >
                      Form
                    </button>
                    <ViewFormWell show={show} handleClose={handleClose} />
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

const CreateCaseNotes = (props) => {
  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Create Case Note</Modal.Title>
        </Modal.Header>
        <div class="form-floating mt-3 mb-3">
          <textarea
            className="form-control"
            id="CreateCaseNote"
            style={{ height: 150 + "px" }}
          ></textarea>
          <label for="CreateCaseNote">Case Note</label>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            onClick={props.handleSubmit}
          >
            Submit
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const PublishCaseNotes = (props) => {
  return (
    <Modal className="mt-3" show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Publish Case Notes:</Modal.Title>
        </Modal.Header>
        <table class="table table-dark table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">Case Notes:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

const ViewFormWeek = (props) => {
  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>View Weekly Form:</Modal.Title>
        </Modal.Header>
        <div className="d-flex justify-content-end mt-3"> Total Score /25</div>
        <table class="table table-dark table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">Question:</th>
              <th scope="col">Answer:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1. I have felt cheerful and in good spirits.</td>
              <td>A very happy and joyful person</td>
            </tr>
            <tr>
              <td>2. I have felt calm and relaxed.</td>
              <td>A very happy and joyful person</td>
            </tr>
            <tr>
              <td>3. I have felt active and vigorous.</td>
              <td>A very happy and joyful person</td>
            </tr>
            <tr>
              <td>4. I woke up feeling fresh and rested.</td>
              <td>A very happy and joyful person</td>
            </tr>
            <tr>
              <td>
                5. My daily life has been filled with things that interest me.
              </td>
              <td>A very happy and joyful person</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
          >
            Verify
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ViewFormWell = (props) => {
  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div>View Daily Form:</div>
          </Modal.Title>
        </Modal.Header>
        <div className="d-flex justify-content-end mt-3"> Total Score /25</div>
        <table class="table table-dark table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">Question:</th>
              <th scope="col">Answer:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1. In general, I consider myself:</td>
              <td>A very happy and joyful person</td>
            </tr>
            <tr>
              <td>2. Compared to most of my peers, I consider myself:</td>
              <td>A very happy and joyful person</td>
            </tr>
            <tr>
              <td>
                3. Some people are generally very happy. They enjoy life
                regardless of what is going on, getting the most out of
                everything. To what extent does this characterization describe
                you?
              </td>
              <td>A very happy and joyful person</td>
            </tr>
            <tr>
              <td>
                4. Some people are generally not very happy. Although they are
                not depressed, they never seem as happy as they might be. To
                what extent does this characterization describe you?
              </td>
              <td>A very happy and joyful person</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
          >
            Verify
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const CreateNote = (props) => {
  return (
    <Modal className="mt-3" show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Create Case Note:</Modal.Title>
        </Modal.Header>
        <div class="form-floating mt-3 mb-3">
          <h5>Input Case Note:</h5>
          <textarea
            className="form-control"
            id="floatingTextarea2"
            style={{ height: 150 + "px" }}
          ></textarea>
        </div>
        <Modal.Footer>
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            onClick={props.handleSubmit}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

const CreateAssignment = (props) => {
  const [date, setDate] = useState("");
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };
  return (
    <Modal className="mt-3" show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Create Assignment:</Modal.Title>
        </Modal.Header>
        <h5>Input Activity:</h5>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            aria-label="CreateAssignment"
            aria-describedby="basic-addon1"
          />
        </div>
        <div>
          <h5>Input Date:</h5>
          <input
            className="input-group rounded-2"
            type="date"
            onChange={handleChange}
            ref={dateInputRef}
            style={{ border: "none" }}
          />
        </div>
        <div class="form-floating mt-3 mb-3">
          <h5>Input Descsription:</h5>
          <textarea
            className="form-control"
            id="floatingTextarea2"
            style={{ height: 150 + "px" }}
          ></textarea>
        </div>

        <Modal.Footer>
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            onClick={props.handleSubmit}
          >
            Submit
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
