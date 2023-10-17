import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "../../css/AllCounselors.css";
import { Pagination } from "react-bootstrap";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase-config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  fetchCounselorData,
  handleRemove,
  handleSubmitAdd,
  handleAddSuccess,
  addCounselorToData,
} from "../Backend/AllCounselorsHelper";
import { CounselorInfo } from "./CounselorInfo";
export const AllCounselors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [counselorData, setCounselorData] = useState([]);
  const [filteredCounselorData, setFilteredCounselorData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editSuccess, setEditSuccess] = useState(false);
  const [newCounselorAdded, setNewCounselorAdded] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);

  const handleCounselorSelect = (counselorData) => {
    setSelectedCounselor(counselorData);
    setShowCounselor(true);
  };

  useEffect(() => {
    fetchCounselorData(setCounselorData, setFilteredCounselorData);
  }, [newCounselorAdded]); // Fetch data on component mount

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

  //!Pagination
  // Step 1: Define the number of items to display per page
  const itemsPerPage = 5; // You can change this value as needed

  // Step 2: Create a state variable for the current page number
  const [currentPage, setCurrentPage] = useState(1);

  // Step 3: Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Step 4: Update the component to display data for the current page
  const currentCounselorData = filteredCounselorData.slice(
    startIndex,
    endIndex
  );

  // Step 5: Create pagination buttons to navigate between pages
  const totalPages = Math.ceil(filteredCounselorData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  //!Table style
  const tableStyle = {
    height: "650px", // Set the desired height
    overflow: "auto", // Add scrollbars when content overflows
  };
  return (
    <div
      className="container-lg d-flex justify-content-center rounded-5 mt-5 ms-5 mb-3 pb-3"
      id="counselorForm"
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col d-flex align-items-center d-flex justify-content-center ms-5 ps-5">
            <h1 className="mt-2 ms-5 ps-5">Counselor List</h1>
          </div>
          <div className="col-3 col-sm-3 mb-3">
            <div className="input-group mt-4">
              <input
                type="text"
                placeholder="Search Counselors Name:"
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
            <div className="table-responsive">
              <table className="table table-dark" style={tableStyle}>
                <thead>
                  <tr>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Date Added</th>
                    <th>Patients</th>
                    <th>Edit</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCounselorData.map((counselor) => (
                    <tr key={counselor.UID}>
                      <td>
                        <button
                          onClick={() => handleCounselorSelect(counselor)}
                          style={{ border: "none", background: "none" }}
                        >
                          {counselor.ProfPic ? (
                            <img
                              src={fetchImageUrl(counselor.ProfPic)}
                              alt={counselor.firstName}
                              width="100"
                              height="100"
                            />
                          ) : (
                            <img
                              src="https://firebasestorage.googleapis.com/v0/b/lunan-75e15.appspot.com/o/user_profile_pictures%2FProfilePic.png?alt=media&token=25b442b3-110c-4dc5-af56-4fd799b77dcc"
                              alt={counselor.firstName}
                              width="100"
                              height="100"
                            />
                          )}
                        </button>
                        {showCouncelor && (
                          <CounselorInfo
                            show={showCouncelor}
                            handleClose={handleCloseCounselor}
                            counselor={selectedCounselor}
                          />
                        )}
                      </td>
                      <td>{counselor.firstName}</td>
                      <td>{counselor.dateCreated}</td>
                      <td>
                        {counselor.patientsCount !== undefined
                          ? counselor.patientsCount
                          : 0}
                      </td>
                      <td>
                        <button
                          onClick={() => handleShowEdit(counselor.UID)}
                          className="rounded-5 fw-medium"
                          id="editCounselor"
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          id="removeCounselor"
                          className="rounded-5 fw-medium"
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
            </div>
          </div>
        </div>

        {/* Step 5: Create pagination buttons */}
        <div className="row">
          <div className="col">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
          <div className="col d-flex justify-content-end">
            <Button
              className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4 fw-medium"
              id="buttonCard"
              onClick={handleShowAdd}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <AddModal
        show={showAdd}
        onHide={handleCloseAdd}
        addCounselorToData={addCounselorToData}
        onAddSuccess={handleAddSuccess}
        setCounselorData={setCounselorData}
        setFilteredCounselorData={setFilteredCounselorData}
      />
      {editData && (
        <EditModal
          show={showEdit}
          onHide={handleCloseEdit}
          userId={editData.UID}
          firstName={editData.firstName}
          ProfPic={editData.ProfPic}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

const AddModal = (props) => {
  const [localFormData, setLocalFormData] = useState({
    firstName: "",
    ConNum: "",
    Email: "",
    ProfPic: null,
  });
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setLocalFormData({
        ...localFormData,
        ProfPic: selectedFile,
      });
      setFileError("");
    } else {
      setLocalFormData({
        ...localFormData,
        ProfPic: null,
      });
      setFileError("Please select a valid image file (JPEG, PNG, GIF).");
    }
  };

  const generateRandomPassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    return password;
  };

  const uploadImage = async (file) => {
    try {
      const storageRef = ref(storage, `user_photos/${file.name}`);

      const metadata = {
        contentType: file.type,
      };

      const snapshot = await uploadBytes(storageRef, file, metadata);

      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  return (
    <Modal
      className="container-fluid"
      show={props.show}
      onHide={props.onHide}
      style={{ border: "none", color: "white" }}
    >
      <Modal.Body id="BGmodal">
        <Modal.Header className="mb-3" closeButton>
          <Modal.Title>Add Counselor</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(event) =>
            handleSubmitAdd(
              event,
              setLoading,
              localFormData,
              handleAddSuccess,
              props.onHide, // Pass props.onHide to close the modal
              props.setCounselorData, // Pass props.setCounselorData
              props.setFilteredCounselorData, // Pass props.setFilteredCounselorData
              props.addCounselorToData
            )
          }
        >
          {/* Name */}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={localFormData.firstName}
              onChange={(event) =>
                setLocalFormData({
                  ...localFormData,
                  firstName: event.target.value,
                })
              }
              required
            />
          </Form.Group>

          {/* Picture */}
          <Form.Group className="mt-3">
            <Form.Control
              type="file"
              accept="image/*"
              name="ProfPic"
              onChange={handleFileChange}
            />
            <Form.Text className="text-danger">{fileError}</Form.Text>
          </Form.Group>

          {/* Contact Number */}
          <Form.Group>
            <Form.Label className="mt-2">Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="ConNum"
              value={localFormData.ConNum}
              onChange={(event) =>
                setLocalFormData({
                  ...localFormData,
                  ConNum: event.target.value,
                })
              }
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group>
            <Form.Label className="mt-2">Email</Form.Label>
            <Form.Control
              type="text"
              name="Email"
              value={localFormData.Email}
              onChange={(event) =>
                setLocalFormData({
                  ...localFormData,
                  Email: event.target.value,
                })
              }
              required
            />
          </Form.Group>

          <Modal.Footer className="mt-3">
            {loading ? (
              <Button
                variant="primary"
                className="rounded-5 fw-medium"
                disabled
              >
                Adding...
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                className="rounded-5 fw-medium"
                id="BtnSubmitAC"
              >
                Submit
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const EditModal = (props) => {
  const [updateName, setUpdateName] = useState(props.firstName || "");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid image file (JPEG, PNG, GIF).");
    }
  };

  const handleUpdateName = (event) => {
    setUpdateName(event.target.value);
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    const userAccRef = collection(firestore, "Users");

    try {
      if (props.userId) {
        const userDocRef = doc(userAccRef, props.userId);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const existingData = docSnapshot.data();

          const updateData = {
            ...existingData,
            firstName: updateName,
          };

          if (file) {
            const imageUrl = await uploadProfilePicture(props.userId, file);
            updateData.ProfPic = imageUrl;
          }

          await updateDoc(userDocRef, updateData);

          console.log("User data updated successfully.");
          props.onEditSuccess(updateData); // Call the parent component's callback
        } else {
          console.log("Document does not exist.");
        }
      } else {
        console.log("Invalid userId.");
      }
    } catch (error) {
      console.error("Firebase Error Code:", error.code);
      console.error("Error updating user data:", error);
      setError("Error updating user data.");
    }
  };

  const uploadProfilePicture = async (userId, file) => {
    try {
      const storageRef = ref(storage, `user_profile_pictures/${userId}`);
      const snapshot = await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(snapshot.ref);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      throw error;
    }
  };

  return (
    <Modal
      className="container-fluid"
      show={props.show}
      onHide={props.handleClose}
      style={{ border: "none", color: "white" }}
    >
      <Modal.Body id="BGmodal">
        <Modal.Header className="mb-3" closeButton>
          <Modal.Title>Edit Counselor</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitEdit}>
          {/* Name */}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={updateName}
              onChange={handleUpdateName}
            />
          </Form.Group>

          {/* Picture */}
          <Form.Group className="mt-3">
            <Form.Control
              type="file"
              accept="image/*"
              name="ProfPic"
              onChange={handleFile}
            />
            <Form.Text className="text-danger">{error}</Form.Text>
          </Form.Group>

          <Modal.Footer className="mt-3">
            <Button
              variant="primary"
              type="submit"
              className=" rounded-5 fw-medium"
              id="BtnSubmitAC"
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AllCounselors;
