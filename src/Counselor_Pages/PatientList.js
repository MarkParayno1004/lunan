import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, getDoc, where, query } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import { PatientInfo } from "./PatientInfo";
import { getAuth } from "firebase/auth";
import "../css/PatientList.css";

export const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patientsData, setPatientsData] = useState([]);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [selectedIntakeFormsData, setSelectedIntakeFormsData] = useState([null]);
  

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        const patients = querySnapshot.docs.map((doc) => doc.data());

        console.log("Patients Data:", patients);

        setPatientsData(patients);
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };

    fetchPatientsData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const auth = getAuth();
  const loggedInUserUID = auth.currentUser ? auth.currentUser.uid : null;
  console.log("Logged In User UID:", loggedInUserUID);

  const fetchImageUrl = (imageUrl) => {
    return imageUrl;
  };

  //! Modal Behaviour
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = async (UID) => {
    console.log("Selected Patient UID:", UID);
  
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
  
        setShow(true);
      } else {
        console.log("Patient document does not exist");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };
  
  
  
  return (
    <div
      className="container-lg mt-5 pb-3 rounded-4 fw-normal d-flex justify-content-center"
      id="cardAllPatientBG"
    >
      <div className="container-fluid">
        <div className="row">
          {/*Dont remove this col */}
          <div className="col"></div>
          <div className="col-6">
            <h2
              className="text-center mt-4 mb-4"
              style={{ fontSize: 30 + "px" }}
            >
              All Patient List
            </h2>
          </div>
          <div className="col">
            <div className="input-group mt-4">
              <input
                type="text"
                placeholder="Search Patient Name:"
                value={searchQuery}
                onChange={handleSearch}
                aria-describedby="search"
                className="w-25 form-control"
              />
              <div className="input-group-append">
                <span className="input-group-text" id="search">
                  Search
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col"></div>
        <div className="d-flex flex-column">
          <div className="flex-grow-1">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Date Added</th>
                  <th>Patients</th>
                </tr>
              </thead>
              <tbody>
              {patientsData
  .filter((patient) => patient.counselorUID === loggedInUserUID)
  .map((patient) => (
    <tr key={patient.UID}>
      <td>
        <button
          style={{ border: "none", background: "none" }}
          onClick={() => handleShow(patient.UID)} // Pass the patient's UID
        >
          {patient.ProfPic && (
            <img
              src={fetchImageUrl(patient.ProfPic)}
              alt={patient.firstName}
              width="100"
              height="100"
            />
          )}
        </button>
      </td>
      <td>{patient.firstName}</td>
      <td>{patient.dateCreated}</td>
      <td>{patient.UID}</td>
    </tr>
  ))}
              </tbody>
            </table>
          </div>
        </div>
        {show && (
  <PatientInfo
    show={show}
    onHide={handleClose}
    patientData={selectedPatientData}
    intakeFormsData={selectedIntakeFormsData}
  />
)}

      </div>
    </div>
  );
};
