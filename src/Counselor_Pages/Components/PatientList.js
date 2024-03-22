import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase-config";
import PatientInfo from "./PatientInfo";
import { getAuth } from "firebase/auth";
import { Pagination } from "react-bootstrap";
import { ListIcon } from "../../assets/images";
import "../../css/AllPatients.css";

//!Main App Render
function PatientList() {
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
  const patientsPerPage = 5;
  const indexOfLastPatient = (currentPage - 1) * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatientsData.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const handlePageChange = (pageNumber) => {
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
    <div className="flex justify-center items-center h-chatHeight">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 px-10 bg-primaryGreen py-10 h-131 w-128">
        <div className="text-2xl font-sans font-semibold  flex items-center mb-2">
          <div className="flex items-center justify-center rounded-2xl text-primaryOrange bg-white h-10 w-10">
            <ListIcon />
          </div>
          <span className="ms-1 text-3xl font-bold mb-1 text-black">
            Patients List
          </span>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-full">
          <thead className="text-sm text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-ss-lg">
                Patients Name:
              </th>
              <th scope="col" className="px-6 py-3">
                Registered Date:
              </th>
              <th scope="col" className="px-6 py-3">
                Counselor:
              </th>
              <th scope="col" className="px-6 py-3 rounded-se-lg">
                View Profile:
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.map((patient) => (
              <tr
                key={patient.UID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {patient.firstName}
                </th>
                <td className="px-6 py-4">{patient.dateCreated}</td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-primaryOrange hover:underline"
                    onClick={() => {
                      handleSelectPatient(patient.UID);
                      handleShow(patient.UID);
                    }}
                  >
                    See Profile
                  </button>
                  <PatientInfo
                    show={show}
                    onHide={handleClose}
                    patientData={selectedPatientData}
                    intakeFormsData={selectedIntakeFormsData}
                    selectedPatientUID={selectedPatientUID}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-lg">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      index + 1 === currentPage
                        ? "bg-primaryOrange text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientList;
