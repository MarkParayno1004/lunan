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
  const [totalPatientsForLoggedInUser, setTotalPatientsForLoggedInUser] =
    useState(0);

  useEffect(() => {
    // Create a query to get Forms for the selected patient
    const patientQuery = query(collection(firestore, "Users"));

    const unsubscribe = onSnapshot(patientQuery, (snapshot) => {
      const updatedPatientList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter patients based on the loggedInUserUID
      const filteredPatientsForUser = updatedPatientList.filter(
        (patient) => patient.counselorUID === loggedInUserUID
      );

      // Update totalPatientsForLoggedInUser
      setTotalPatientsForLoggedInUser(filteredPatientsForUser.length);

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
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  // Filter patients based on counselorUID
  const filteredPatientsForUser = filteredPatientsData.filter(
    (patient) => patient.counselorUID === loggedInUserUID
  );
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;

  const currentPatients = filteredPatientsForUser.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const totalPages = Math.ceil(
    filteredPatientsForUser.length / patientsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Inside the return statement, before the pagination JSX
  console.log("totalPages:", totalPages);
  console.log("indexOfFirstPatient:", indexOfFirstPatient);
  console.log("indexOfLastPatient:", indexOfLastPatient);
  console.log("totalPatientsForLoggedInUser:", totalPatientsForLoggedInUser);

  return (
    <div className="flex justify-center items-center h-chatHeight">
      <div className="relative shadow-md sm:rounded-lg mx-10 px-10 bg-primaryGreen py-10 h-131 w-128">
        <div className="text-2xl font-sans font-semibold flex items-center mb-3">
          <div className="flex items-center justify-center rounded-2xl text-primaryOrange bg-white h-10 w-10">
            <ListIcon />
          </div>
          <span className="ms-1 text-3xl font-bold mb-1 text-black">
            Patients List
          </span>
        </div>
        <div className="text-black text-center max-h-tableHeight overflow-y-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white rounded-tl-lg overflow-hidden">
            <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center sticky top-0 bg-gray-50 dark:bg-gray-700 z-50 ">
                <th scope="col" className="px-6 py-3 ">
                  Profile Picture:
                </th>
                <th scope="col" className="px-6 py-3">
                  Patients Name:
                </th>
                <th scope="col" className="px-6 py-3">
                  Registered Date:
                </th>
                <th scope="col" className="px-6 py-3 ">
                  View Profile:
                </th>
              </tr>
            </thead>
            <tbody className="text-black text-center">
              {currentPatients
                .filter((patient) => patient.counselorUID === loggedInUserUID)
                .map((patient) => (
                  <tr key={patient.UID}>
                    <td className="px-6 py-4">
                      {patient.ProfPic ? (
                        <img
                          src={fetchImageUrl(patient.ProfPic)}
                          alt={patient.firstName}
                          className="mx-auto"
                          width="100"
                          height="100"
                        />
                      ) : (
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/lunan-75e15.appspot.com/o/user_profile_pictures%2FProfilePic.png?alt=media&token=25b442b3-110c-4dc5-af56-4fd799b77dcc"
                          alt={patient.firstName}
                          className="mx-auto"
                          width="100"
                          height="100"
                        />
                      )}
                    </td>
                    <td>{patient.firstName}</td>
                    <td>
                      {new Date(patient.dateCreated).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          handleSelectPatient(patient.UID);
                          handleShow(patient.UID);
                        }}
                        className="text-indigo-400 font-semibold"
                      >
                        See Profile
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

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
  );
}

export default PatientList;
