import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { firestore } from "../firebase/firebase-config";
import Swal from "sweetalert2";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

export const CounselorInfo = (props) => {
  const { show, handleClose, counselor } = props;
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        console.log(counselor.UID);
        const querySnapshot = await getDocs(
          query(
            collection(firestore, "Users"),
            where("counselorID", "==", counselor.UID)
          )
        );
        const patientData = querySnapshot.docs.map((doc) => doc.data());
        setPatients(patientData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [counselor, firestore]);

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        size="xl"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body id="piModal">
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Handle Counselors
            </Modal.Title>
          </Modal.Header>
          <div className="container-fluid">
            {counselor && (
              <CounselorData counselorData={counselor} patients={patients} />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const CounselorData = ({ counselorData, patients }) => {
  const [showModal, setModal] = useState(false);
  const handleShow = () => setModal(true);
  const handleClose = () => setModal(false);
  return (
    <div className="patient-info rounded-5 mt-3 ps-5 pe-5 pb-3" id="piBG">
      <div className="row d-flex align-items-start d-flex justify-content-start pt-3 ps-3 patient-details">
        <div className="col-1 ">
          <img
            src=""
            className="patient-picture"
            style={{ width: 100 + "px" }}
          />
          Pic
        </div>
        <div
          className="col-8 ms-5 d-flex justify-content-center rounded-5"
          id="colBG"
        >
          <div className="container-fluid patient-text pt-3 pb-3">
            {/* 1st Row Header */}
            <div className="row">
              <div className="col">
                <strong className="fs-5">Name: </strong>
                <span className="fs-6" style={{ color: "red" }}>
                  {counselorData && counselorData.firstName}
                </span>
              </div>
              <div className="col">
                <strong className="fs-5">Age: </strong>
                <span className="fs-6" style={{ color: "red" }}>
                  25
                </span>
              </div>
              <div className="col">
                <strong className="fs-5">Gender: </strong>
                <span className="fs-6" style={{ color: "red" }}>
                  Female
                </span>
              </div>
              <div className="col">
                <strong className="fs-5">Email: </strong>
                <span className="fs-6" style={{ color: "red" }}>
                  {counselorData && counselorData.Email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-3">
          <div className="row">
            <div className="col">
              <h3>List of Patients:</h3>
            </div>
            <div className="col">
              <div class="input-group  d-flex justify-content-end mb-3">
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="Patient Name..."
                  style={{ maxWidth: "50%" }}
                />
                <button class="input-group-text" id="inputGroup-sizing-default">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>
              <strong>Name: </strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <tr key={patient.id}>
                <td>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      color: "white",
                    }}
                    onClick={handleShow}
                  >
                    {patient.firstName}
                  </button>
                  <PatientInfoModal
                    show={showModal}
                    handleClose={handleClose}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No patients found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const PatientInfoModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="xl"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body id="piModal">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Patient Information
          </Modal.Title>
        </Modal.Header>
        <div className="container-fluid">
          <PatientData />
        </div>
      </Modal.Body>
    </Modal>
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

  //!View Weekly Form
  const [showWeekly, setWeeklyForm] = useState(false);
  const handleWeekly = () => setWeeklyForm(true);
  const handleCloseWeekly = () => setWeeklyForm(false);

  //!View Daily Form
  const [showDaily, setDailyForm] = useState(false);
  const handleDaily = () => setDailyForm(true);
  const handleCloseDaily = () => setDailyForm(false);

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

        <button
          className="me-2 rounded-5 fw-semibold"
          id="viewButton"
          onClick={handleWeekly}
        >
          View Weekly Form
        </button>

        <button
          className="me-2 rounded-5 fw-semibold"
          id="viewButton"
          onClick={handleDaily}
        >
          View Daily Form
        </button>

        <ViewModalAssign show={showAss} handleClose={handleCloseAss} />

        <ViewModalWeekly show={showWeekly} handleClose={handleCloseWeekly} />
        <ViewFormDaily show={showDaily} handleClose={handleCloseDaily} />
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

//!View Weekly Form Modals
const ViewModalWeekly = (props) => {
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
        <div className="tabs mt-4 mb-2 d-flex justify-content-start">
          <button
            className={`me-3 rounded-5 ${
              activeTab === "submitted" ? "active" : ""
            }`}
            onClick={() => handleTabChange("submitted")}
            style={{ borderStyle: "none" }}
          >
            Submitted Assignment
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
      </Modal.Body>
    </Modal>
  );
};

//!View Daily Form Modals
const ViewFormDaily = (props) => {
  const [activeTab, setActiveTab] = useState("submitted");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = async (selectedPatientUID) => {
    console.log("Selected Patient UID:", props.selectedPatientUID);
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
          <Modal.Title>Patients Daily Form</Modal.Title>
        </Modal.Header>
        <div className="tabs mt-4 d-flex justify-content-start">
          <button
            className={`me-3 rounded-5 ${
              activeTab === "submitted" ? "active" : ""
            }`}
            onClick={() => handleTabChange("submitted")}
            style={{ borderStyle: "none" }}
          >
            Submitted Assignment
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
