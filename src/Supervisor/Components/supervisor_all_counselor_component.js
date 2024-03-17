import React, { useState, useEffect } from "react";
import { AddIcon, ListIcon } from "../../assets/images";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase-config";
import {
  fetchCounselorData,
  handleRemove,
  handleAddSuccess,
  addCounselorToData,
} from "../Data/supervisor_all_counselors_helper";
import SupervisorCounselorInfoComponent from "./supervisor_counselor_info_component";
import SupervisorAddCounselorModalComponent from "./supervisor_add_counselor_modal_component";
import SupervisorEditCounselorModalComponent from "./supervisor_edit_counselor_modal_component";

function SupervisorAllCounselorComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [counselorData, setCounselorData] = useState([]);
  const [filteredCounselorData, setFilteredCounselorData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editSuccess, setEditSuccess] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [reloadTable, setReloadTable] = useState(false); // Add reloadTable state

  useEffect(() => {
    const counselorQuery = query(
      collection(firestore, "Users"),
      where("Role", "==", "Counselor")
    );

    const unsubscribe = onSnapshot(counselorQuery, async (snapshot) => {
      // Your existing code for updating counselorData and filteredCounselorData...
    });

    return () => unsubscribe();
  }, [reloadTable]); // Add reloadTable as a dependency
  const handleCounselorSelect = (counselorData) => {
    setSelectedCounselor(counselorData);
    setShowCounselor(true);
    console.log(counselorData.UID);
  };

  useEffect(() => {
    const counselorQuery = query(
      collection(firestore, "Users"),
      where("Role", "==", "Counselor")
    );

    const unsubscribe = onSnapshot(counselorQuery, async (snapshot) => {
      const updatedCounselorList = [];

      for (const doc of snapshot.docs) {
        const patientsQuery = query(
          collection(firestore, "Users"),
          where("counselorID", "==", doc.id)
        );

        const patientsQuerySnapshot = await getDocs(patientsQuery);
        const patientsCount = patientsQuerySnapshot.size;

        updatedCounselorList.push({
          ...doc.data(),
          UID: doc.id,
          patientsCount: patientsCount,
        });
      }

      setCounselorData(updatedCounselorList);
      setFilteredCounselorData(updatedCounselorList);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleEditSuccess = async (updatedData) => {
    try {
      // Update the counselorData with the updated data
      const updatedCounselorData = counselorData.map((counselor) =>
        counselor.UID === updatedData.UID ? updatedData : counselor
      );

      // Update the state with the new data
      setCounselorData(updatedCounselorData);
      setFilteredCounselorData(updatedCounselorData);

      // Set the edit success flag and close the edit modal
      setEditSuccess(true);
      setShowEdit(false);

      // Trigger table reload by updating reloadTable key
      setReloadTable(!reloadTable);

      // Fetch updated data from Firestore
      await fetchCounselorData();
    } catch (error) {
      console.error("Error updating counselor:", error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredCounselorData(counselorData); // Show all data when query is empty
    } else {
      const filteredCounselors = counselorData.filter(
        (counselor) =>
          (counselor.firstName &&
            counselor.firstName.toLowerCase().includes(query)) ||
          (counselor.lastName &&
            counselor.lastName.toLowerCase().includes(query))
      );
      setFilteredCounselorData(filteredCounselors);
    }
  };

  const fetchImageUrl = (imageUrl) => {
    return imageUrl;
  };

  const handleShowEdit = (UID) => {
    setEditData(counselorData.find((counselor) => counselor.UID === UID));
    setShowEdit(true);
  };

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => setShowAdd(false);

  //!MODAL BEHAVIOUR
  const [showCouncelor, setShowCounselor] = useState(false);
  const handleShowCounselor = () => setShowCounselor(true);
  const handleCloseCounselor = () => setShowCounselor(false);

  //!Table style
  const tableStyle = {
    height: "650px", // Set the desired height
    overflow: "auto", // Add scrollbars when content overflows
  };

  //!Pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCounselorData = filteredCounselorData.slice(
    startIndex,
    endIndex
  );
  const totalPages = Math.ceil(filteredCounselorData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div>
      <div className="flex justify-center items-center h-chatHeight">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 px-10 bg-primaryGreen py-10 h-131 w-128">
          <div className="text-2xl font-sans font-semibold  flex items-center mb-2">
            <div className="flex items-center justify-center rounded-2xl text-primaryGreen bg-orange-400 h-10 w-10">
              <ListIcon />
            </div>
            <span className="ms-1 text-3xl font-bold mb-1 text-black">
              Counselor List
            </span>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-full">
            <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-ss-lg">
                  Patients Name:
                </th>
                <th scope="col" className="px-6 py-3">
                  Registered Date:
                </th>
                <th scope="col" className="px-6 py-3">
                  Number of Patients Enrolled:
                </th>
                <th scope="col" className="px-6 py-3">
                  View Profile:
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit Profile:
                </th>
                <th scope="col" className="px-6 py-3 rounded-se-lg">
                  Remove Counselor:
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCounselorData.map((counselor) => (
                <tr
                  key={counselor.UID}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{counselor.firstName}</td>
                  <td className="px-6 py-4">{counselor.dateCreated}</td>
                  <td className="px-6 py-4">
                    {counselor.patientsCount !== undefined
                      ? counselor.patientsCount
                      : 0}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleCounselorSelect(counselor)}
                    >
                      See Profile
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="rounded-xl bg-primaryOrange px-3 py-2 text-white font-medium"
                      onClick={() => handleShowEdit(counselor.UID)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="rounded-xl bg-primaryOrange px-3 py-2 text-white font-medium"
                      onClick={() => {
                        handleRemove(
                          counselor.UID,
                          setCounselorData,
                          setFilteredCounselorData
                        );
                      }}
                    >
                      Remove
                    </button>
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
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-around">
              <div>
                <p className="text-sm text-gray-700 ">
                  <span>Showing</span>
                  <span className="font-medium ms-1 me-1">
                    {startIndex + 1}
                  </span>
                  <span>to</span>
                  <span className="font-medium ms-1 me-1">
                    {Math.min(endIndex, filteredCounselorData.length)}
                  </span>
                  <span>of</span>
                  <span className="font-medium ms-1 me-1">
                    {filteredCounselorData.length}
                  </span>
                  <span>results</span>
                </p>
              </div>

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
              <div className="text-2xl font-sans font-semibold  flex items-center mb-2">
                <div className="flex items-center justify-center rounded-2xl text-primaryGreen h-10 w-10 cursor-pointer">
                  <button onClick={() => handleShowAdd()}>
                    <AddIcon />
                  </button>
                </div>
                <span className="ms-1 text-base font-bold mb-1 text-black">
                  Add Counselor
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCouncelor && (
        <SupervisorCounselorInfoComponent
          show={showCouncelor}
          handleClose={handleCloseCounselor}
          counselor={selectedCounselor}
        />
      )}
      <SupervisorAddCounselorModalComponent
        show={showAdd}
        onHide={handleCloseAdd}
        addCounselorToData={addCounselorToData}
        onAddSuccess={handleAddSuccess}
        setCounselorData={setCounselorData}
        setFilteredCounselorData={setFilteredCounselorData}
      />
      {editData && (
        <SupervisorEditCounselorModalComponent
          show={showEdit}
          handleClose={handleCloseEdit}
          userId={editData.UID}
          firstName={editData.firstName}
          ProfPic={editData.ProfPic}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}

export default SupervisorAllCounselorComponent;
