import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import "../css/AllCounselors.css";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore, storage } from "../firebase/firebase-config";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import {
  fetchCounselorPatientsCount,
  fetchCounselorData,
  handleRemove,
  handleSubmitAdd,
  handleAddSuccess,
  addCounselorToData,
  handleSubmitEdit,
  handleEditSuccess,
} from "./Backend/AllCounselorsHelper"

export const AllCounselors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [counselorData, setCounselorData] = useState([]);
  const [filteredCounselorData, setFilteredCounselorData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editSuccess, setEditSuccess] = useState(false);
  const [newCounselorAdded, setNewCounselorAdded] = useState(false);
  
  useEffect(() => {
    fetchCounselorData(setCounselorData, setFilteredCounselorData);
}, [newCounselorAdded]);  // Fetch data on component mount


  const handleEdit = (counselor) => {
    setEditData(counselor);
    setShowEdit(true);
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
      setFilteredCounselorData([...filteredCounselors]);
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
              <span class="input-group-text" id="search">
                <button
                  style={{ border: "none", background: "none" }}
                  onClick={handleSearch}
                >
                  Search
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="flex-grow-1">
            <table className="table table-dark">
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
                {filteredCounselorData.map((counselor) => (
                  <tr key={counselor.UID}>
                    <td>
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
                          handleRemove(counselor.UID, setCounselorData, setFilteredCounselorData);
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
        <div className="row">
          <div className="col mt-auto d-flex justify-content-end">
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
    editData={editData} // Pass the entire editData object
    onEditSuccess={handleEditSuccess}
    counselorData={counselorData}
    setCounselorData={setCounselorData}
    setFilteredCounselorData={setFilteredCounselorData}
    setEditSuccess={setEditSuccess}
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
        <Form onSubmit={(event) => 
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
}>
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
  const [updateName, setUpdateName] = useState(props.editData.firstName || "");
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
      onHide={props.onHide}
      style={{ border: "none", color: "white" }}
    >
      <Modal.Body id="BGmodal">
        <Modal.Header className="mb-3" closeButton>
          <Modal.Title>Edit Counselor</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(event) => handleSubmitEdit(
  event,
  props.editData.UID, // Pass userId
  updateName,
  props.counselorData,
  props.setCounselorData,
  props.setFilteredCounselorData,
  props.onHide,
  props.editData,
  props.onEditSuccess,
  props.setEditSuccess,
  file,
  handleEditSuccess,
  setError, // Pass setError
)}>

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
