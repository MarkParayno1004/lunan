import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/firebase-config";
import { PatientInfo } from "./PatientInfo";
import "../css/AllPatients.css";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

export const AllPatients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patientsData, setPatientsData] = useState([]);
  const [filteredPatientsData, setFilteredPatientsData] = useState([]);
  const [counselorNames, setCounselorNames] = useState({});
  const [show, setShow] = useState();
  const [selectedPatientUID, setSelectedPatientUID] = useState(null);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [selectedIntakeFormsData, setSelectedIntakeFormsData] = useState([
    null,
  ]);
  const [showPatientInfo, setShowPatientInfo] = useState(false);

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(firestore, "Users"),
            where("counselorID", "!=", null)
          )
        );
        const patients = querySnapshot.docs.map((doc) => doc.data());

        console.log("Patients Data:", patients);

        setPatientsData(patients);
        setFilteredPatientsData(patients);
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };

    fetchPatientsData();
  }, []);

  useEffect(() => {
    const fetchCounselorNames = async () => {
      const names = {};

      await Promise.all(
        patientsData.map(async (patient) => {
          if (patient.counselorID) {
            console.log("Fetching counselor name for:", patient.counselorID);
            const counselorName = await fetchCounselorName(patient.counselorID);
            names[patient.counselorID] = counselorName;
          }
        })
      );

      console.log("Fetched Counselor Names:", names);
      setCounselorNames(names);
    };

    fetchCounselorNames();
  }, [patientsData]);

  const fetchCounselorName = async (counselorID) => {
    try {
      const counselorDocRef = doc(firestore, "Users", counselorID);
      const counselorDocSnapshot = await getDoc(counselorDocRef);

      if (counselorDocSnapshot.exists()) {
        const counselorData = counselorDocSnapshot.data();
        if (counselorData.Role === "Counselor") {
          return counselorData.firstName;
        } else {
          return "Not a Counselor";
        }
      } else {
        return "Unknown Counselor";
      }
    } catch (error) {
      console.error("Error fetching counselor name:", error);
      return "Error Fetching Name";
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredPatients = patientsData.filter((patient) => {
      const firstNameMatch =
        patient.firstName && patient.firstName.toLowerCase().includes(query);
      const lastNameMatch =
        patient.lastName && patient.lastName.toLowerCase().includes(query);

      return firstNameMatch || lastNameMatch;
    });

    setFilteredPatientsData(filteredPatients);
  };

  const fetchImageUrl = (imageUrl) => {
    return imageUrl;
  };

  const handleSelectPatient = (UID) => {
    setSelectedPatientUID(UID);
    setShowPatientInfo(true);
  };

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

  //!Pagination
  // Step 1: Define the number of items to display per page
  const itemsPerPage = 5; // You can change this value as needed

  // Step 2: Create a state variable for the current page number
  const [currentPage, setCurrentPage] = useState(1);

  // Step 3: Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Step 4: Update the component to display data for the current page
  const currentPatientsData = filteredPatientsData.slice(startIndex, endIndex);

  // Step 5: Create pagination buttons to navigate between pages
  const totalPages = Math.ceil(filteredPatientsData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div
      className="container-lg d-flex justify-content-center rounded-5 mt-5 ms-5 pb-3"
      id="AllPatientForm"
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col d-flex align-items-center d-flex justify-content-center ms-5 ps-5">
            <h1 className="mt-2 ms-5 ps-5">All Patient List</h1>
          </div>
          <div className="col-3 col-sm-3 mb-3">
            <div className="input-group mt-4">
              <input
                type="text"
                placeholder="Search Patients Name:"
                value={searchQuery}
                onChange={handleSearch}
                aria-describedby="search"
                className="w-25 form-control"
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="flex-grow-1">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Picture</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date Added</th>
                  <th scope="col">Counselor</th>
                </tr>
              </thead>
              <tbody>
                {currentPatientsData.map((patient) => (
                  <tr key={patient.UID}>
                    <td>
                      <button
                        style={{ border: "none", background: "none" }}
                        onClick={() => {
                          handleSelectPatient(patient.UID);
                          handleShow(patient.UID);
                        }} // Pass the patient's UID
                      >
                        {patient.ProfPic ? (
                          <img
                            src={fetchImageUrl(patient.ProfPic)}
                            alt={patient.firstName}
                            width="100"
                            height="100"
                          />
                        ) : (
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/lunan-75e15.appspot.com/o/user_profile_pictures%2F4WWRyPzPJH2ipbcK1npZ?alt=media&token=72e0fdf1-18e1-4065-bc70-2ebc18166aa1"
                            alt={patient.firstName}
                            width="100"
                            height="100"
                          />
                        )}
                      </button>
                      <PatientInfo
                        show={show}
                        onHide={handleClose}
                        patientData={selectedPatientData}
                        intakeFormsData={selectedIntakeFormsData}
                        selectedPatientUID={selectedPatientUID}
                      />
                    </td>
                    <td>{patient.firstName}</td>
                    <td>{patient.dateCreated}</td>
                    <td>{counselorNames[patient.counselorID] || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Step 5: Create pagination buttons */}
        <nav>
          <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
