import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase-config";
import { getDocs, query, where, collection } from "firebase/firestore";
import SupervisorPatientInfoComponent from "./supervisor_patient_info_component";
function SupervisorCounselorDataComponent({
  counselorData,
  patients,
  setSearchInput,
  searchInput,
}) {
  const [showModal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatientUID, setSelectedPatientUID] = useState(null);
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [selectedIntakeFormsData, setSelectedIntakeFormsData] = useState([
    null,
  ]);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [filteredPatients, setFilteredPatients] = useState(patients);

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
      return query === "" || firstNameMatch || lastNameMatch;
    });

    setFilteredPatients(filteredPatientsList);
  };

  const handleShow = async (UID) => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "Users"));
      const matchingDocument = querySnapshot.docs.find(
        (doc) => doc.data().UID === UID
      );
      if (matchingDocument) {
        const patientData = matchingDocument.data();
        const intakeFormsQuerySnapshot = await getDocs(
          query(collection(firestore, "IntakeForms"), where("UID", "==", UID))
        );
        const intakeFormsData = intakeFormsQuerySnapshot.docs.map((doc) =>
          doc.data()
        );
        setSelectedPatientData(patientData);
        setSelectedIntakeFormsData(intakeFormsData);
        setModal(true);
      } else {
        return "Patient document does not exist";
      }
    } catch (error) {
      return error;
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
        <SupervisorPatientInfoComponent
          show={showModal}
          close={handleClose}
          patientData={selectedPatientData}
          intakeFormsData={selectedIntakeFormsData}
          selectedPatientUID={selectedPatientUID}
        />
      )}
    </div>
  );
}

export default SupervisorCounselorDataComponent;
