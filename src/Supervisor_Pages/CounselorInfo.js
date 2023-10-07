import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/firebase-config";
import { getDocs, query, where, collection } from "firebase/firestore";
import { Modal } from "react-bootstrap";
import { PatientInfo } from "./PatientInfo";

export const CounselorInfo = (props) => {
  const { show, handleClose, counselor } = props;
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(firestore, "Users"), where("counselorID", "==", counselor.UID))
        );
        const patientListData = querySnapshot.docs.map((doc) => doc.data());
        setPatients(patientListData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [counselor, firestore]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
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
  const [selectedPatientUID, setSelectedPatientUID] = useState(null);
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [selectedIntakeFormsData, setSelectedIntakeFormsData] = useState([null]);
  const [selectedPatientData, setSelectedPatientData] = useState(null);

  const handleSelectPatient = (UID) => {
    setSelectedPatientUID(UID);
    setShowPatientInfo(true);
    handleShow(UID); // Call handleShow to load patient data when a patient is selected.
  };

  const handleShow = async (UID) => {
    console.log("Selected Patient UIDssssss:", UID);

    try {
      // Query the collection to find the document with the matching UID
      const querySnapshot = await getDocs(collection(firestore, "Users"));
      console.log("Query Snapshot:", querySnapshot.docs);

      const matchingDocument = querySnapshot.docs.find(
        (doc) => doc.data().UID === UID
      );

      if (matchingDocument) {
        const patientData = matchingDocument.data();
        console.log("Selected Patient Data:", patientData);

        // Fetch additional data from the "IntakeForms" collection
        const intakeFormsQuerySnapshot = await getDocs(
          query(collection(firestore, "IntakeForms"), where("UID", "==", UID))
        );
        const intakeFormsData = intakeFormsQuerySnapshot.docs.map((doc) =>
          doc.data()
        );

        console.log("Intake Forms Data:", intakeFormsData);

        // Set the patient data and intake forms data to state
        setSelectedPatientData(patientData);
        setSelectedIntakeFormsData(intakeFormsData);

        setModal(true);
      } else {
        console.log("Patient document does not exist");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

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
              <tr key={patient.UID}>
                <td>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      color: "white",
                    }}
                    onClick={() => {
                      handleSelectPatient(patient.UID);
                    }}
                  >
                    {patient.firstName}
                  </button>
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
      {showPatientInfo && (
        <PatientInfo
          show={showModal}
          handleClose={handleClose}
          patientData={selectedPatientData}
          intakeFormsData={selectedIntakeFormsData}
          selectedPatientUID={selectedPatientUID}
        />
      )}
    </div>
  );
};

