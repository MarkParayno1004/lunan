import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase-config";
import {
  getDocs,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { Modal } from "react-bootstrap";
import { PatientInfo } from "./PatientInfo";

export const CounselorInfo = (props) => {
  const { show, handleClose, counselor } = props;
  const [searchInput, setSearchInput] = useState("");
  const [patients, setPatients] = useState([]); // Initialize patients state

  // useEffect(() => {
  //   const fetchPatients = async () => {
  //     try {
  //       const querySnapshot = await getDocs(
  //         query(
  //           collection(firestore, "Users"),
  //           where("counselorID", "==", counselor.UID) // Use counselor from props
  //         )
  //       );
  //       const patientListData = querySnapshot.docs.map((doc) => doc.data());
  //       setPatients(patientListData);
  //     } catch (error) {
  //       console.error("Error fetching patients:", error);
  //     }
  //   };

  //   fetchPatients();
  // }, [counselor, firestore]);

  useEffect(() => {
    // Create a query to get Forms for the selected patient
    const patientQuery = query(
      collection(firestore, "Users"),
      where("counselorID", "==", counselor.UID)
    );

    const unsubscribe = onSnapshot(patientQuery, (snapshot) => {
      const updatedPatientList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(updatedPatientList);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
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
            <CounselorData
              counselorData={counselor}
              patients={patients} // Pass patients as a prop
              setSearchInput={setSearchInput}
              searchInput={searchInput}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

const CounselorData = ({
  counselorData,
  patients,
  setSearchInput,
  searchInput,
}) => {
  const [showModal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatientUID, setSelectedPatientUID] = useState(null);
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [selectedIntakeFormsData, setSelectedIntakeFormsData] = useState([
    null,
  ]);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [filteredPatients, setFilteredPatients] = useState(patients); // Initialize filteredPatients with patients

  const handleSelectPatient = (UID) => {
    setSelectedPatientUID(UID);
    setShowPatientInfo(true);
    handleShow(UID);
  };
  useEffect(() => {
    handleSearch({ target: { value: "" } });
  }, [patients]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredPatientsList = patients.filter((patient) => {
      const firstNameMatch =
        patient.firstName && patient.firstName.toLowerCase().includes(query);
      const lastNameMatch =
        patient.lastName && patient.lastName.toLowerCase().includes(query);

      return query === "" || firstNameMatch || lastNameMatch; // Show all patients when query is empty
    });

    setFilteredPatients(filteredPatientsList);
  };

  const handleShow = async (UID) => {
    console.log("Selected Patient UIDssssss:", UID);

    try {
      const querySnapshot = await getDocs(collection(firestore, "Users"));
      console.log("Query Snapshot:", querySnapshot.docs);

      const matchingDocument = querySnapshot.docs.find(
        (doc) => doc.data().UID === UID
      );

      if (matchingDocument) {
        const patientData = matchingDocument.data();
        console.log("Selected Patient Data:", patientData);

        const intakeFormsQuerySnapshot = await getDocs(
          query(collection(firestore, "IntakeForms"), where("UID", "==", UID))
        );
        const intakeFormsData = intakeFormsQuerySnapshot.docs.map((doc) =>
          doc.data()
        );

        console.log("Intake Forms Data:", intakeFormsData);

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
        <div className="col-1">
          <img
            src=""
            alt="Patient Picture"
            className="patient-picture"
            style={{ width: "100px" }}
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
                  {counselorData?.firstName}
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
                  {counselorData?.Email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                aria-describedby="search"
                placeholder="Patient Name"
                style={{ maxWidth: "50%" }}
                value={searchQuery}
                onChange={handleSearch}
              />
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
          {filteredPatients.map((patient) => {
            console.log("Patient First Name:", patient.firstName); // Add this log
            return (
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
            );
          })}
        </tbody>
      </table>
      {showPatientInfo && (
        <PatientInfo
          show={showModal}
          onHide={handleClose}
          patientData={selectedPatientData}
          intakeFormsData={selectedIntakeFormsData}
          selectedPatientUID={selectedPatientUID}
        />
      )}
    </div>
  );
};
