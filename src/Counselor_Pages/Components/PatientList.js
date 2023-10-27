import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase-config";
import { PatientInfo } from "./PatientInfo";
import { getAuth } from "firebase/auth";
import { Pagination } from "react-bootstrap";
import "../../css/PatientList.css";

//!Main App Render
export const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patientsData, setPatientsData] = useState([]);
  const [filteredPatientsData, setFilteredPatientsData] = useState([]);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [selectedIntakeFormsData, setSelectedIntakeFormsData] = useState([
    null,
  ]);
  const [selectedPatientUID, setSelectedPatientUID] = useState(null);
  const [showPatientInfo, setShowPatientInfo] = useState(false);

  // useEffect(() => {
  //   const fetchPatientsData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(firestore, "Users"));
  //       const patients = querySnapshot.docs.map((doc) => doc.data());

  //       console.log("Patients Data:", patients);

  //       setPatientsData(patients);
  //       setFilteredPatientsData(patients);
  //     } catch (error) {
  //       console.error("Error fetching patients data:", error);
  //     }
  //   };

  //   fetchPatientsData();
  // }, []);

  useEffect(() => {
    // Create a query to get Forms for the selected patient
    const patientQuery = query(collection(firestore, "Users"));

    const unsubscribe = onSnapshot(patientQuery, (snapshot) => {
      const updatedPatientList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatientsData(updatedPatientList);
      setFilteredPatientsData(updatedPatientList);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

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

  const auth = getAuth();
  const loggedInUserUID = auth.currentUser ? auth.currentUser.uid : null;
  console.log("Logged In User UID:", loggedInUserUID);

  const fetchImageUrl = (imageUrl) => {
    return imageUrl;
  };

  //! Modal Behaviour
  const [show, setShow] = useState(false);

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
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10; // Change this to your preferred number of patients per page

  // Calculate the index of the first and last patient for the current page
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatientsData.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredPatientsData.length / patientsPerPage);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const tableStyle = {
    height: "650px", // Set the desired height
    overflow: "auto", // Add scrollbars when content overflows
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
            </div>
          </div>
        </div>
        <div className="col"></div>
        <div className="d-flex flex-column">
          <div className="flex-grow-1">
            <table className="table table-dark table-hover" style={tableStyle}>
              <thead>
                <tr>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Date Added</th>
                  <th>Patients</th>
                </tr>
              </thead>
              <tbody>
                {currentPatients
                  .filter((patient) => patient.counselorUID === loggedInUserUID)
                  .map((patient) => (
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
                              src="https://firebasestorage.googleapis.com/v0/b/lunan-75e15.appspot.com/o/user_profile_pictures%2FProfilePic.png?alt=media&token=25b442b3-110c-4dc5-af56-4fd799b77dcc"
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
        <Pagination>
          <Pagination.Prev
            onClick={handlePreviousClick}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
          />
        </Pagination>
        {show && (
          <PatientInfo
            show={show}
            onHide={handleClose}
            patientData={selectedPatientData}
            intakeFormsData={selectedIntakeFormsData}
            selectedPatientUID={selectedPatientUID}
          />
        )}
      </div>
    </div>
  );
};
