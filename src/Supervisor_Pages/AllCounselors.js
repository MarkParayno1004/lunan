import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import "../css/AllCounselors.css";
import { CounselorInfo } from "./CounselorInfo";
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

export const AllCounselors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [counselorData, setCounselorData] = useState([]);
  const [filteredCounselorData, setFilteredCounselorData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editSuccess, setEditSuccess] = useState(false);
  const [newCounselorAdded, setNewCounselorAdded] = useState(false);
  const addCounselorToData = (newCounselor) => {
    setCounselorData((prevData) => [...prevData, newCounselor]);
    setFilteredCounselorData((prevData) => [...prevData, newCounselor]);
  };

  // Fetch the number of patients for a counselor
  const fetchCounselorPatientsCount = async (counselorID) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(firestore, "Users"), where("Role", "==", "Patient"))
      );

      const patientDocs = querySnapshot.docs;
      let patientsCount = 0;

      const counselorDoc = await getDoc(
        doc(collection(firestore, "Users"), counselorID)
      );

      if (counselorDoc.exists()) {
        const counselorData = counselorDoc.data();

        for (const patientDoc of patientDocs) {
          const patientData = patientDoc.data();
          if (patientData.counselorID === counselorID) {
            patientsCount++;
          }
        }
      }

      return patientsCount;
    } catch (error) {
      console.error("Error fetching counselor patients count:", error);
      return 0;
    }
  };

  // Fetch counselor data and patients count
  const fetchCounselorData = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(firestore, "Users"), where("Role", "==", "Counselor"))
      );

      const counselorDataWithPatientsCount = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const patientsCount = await fetchCounselorPatientsCount(doc.id);
          return {
            ...doc.data(),
            UID: doc.id,
            patientsCount: patientsCount,
          };
        })
      );

      setCounselorData(counselorDataWithPatientsCount);
      setFilteredCounselorData(counselorDataWithPatientsCount);
    } catch (error) {
      console.error("Error fetching counselor data:", error);
    }
  };

  useEffect(() => {
    fetchCounselorData();
  }, [newCounselorAdded]); // Fetch data on component mount

  const handleRemove = async (UID) => {
    try {
      const userAccRef = collection(firestore, "Users");
      const counselorDocRef = doc(userAccRef, UID);

      const confirmationResult = await Swal.fire({
        position: "top",
        title: "Are you sure?",
        background: "#7db9b6",
        color: "#FFFFFF",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmationResult.isConfirmed) {
        await deleteDoc(counselorDocRef);
        await Swal.fire({
          title: "Deleted!",
          text: "The counselor has been removed.",
          background: "#7db9b6",
          color: "#FFFFFF",
        });

        setCounselorData((prevData) =>
          prevData.filter((counselor) => counselor.UID !== UID)
        );

        setFilteredCounselorData((prevData) =>
          prevData.filter((counselor) => counselor.UID !== UID)
        );

        console.log("Counselor removed successfully.", UID);
      }
    } catch (error) {
      console.error("Error removing counselor:", error);

      await Swal.fire({
        title: "Error",
        text: "An error occurred while removing the counselor.",
        background: "#7db9b6",
        color: "#FFFFFF",
        icon: "error",
      });
    }
  };

  const handleEdit = (counselor) => {
    setEditData(counselor);
    setShowEdit(true);
  };

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

  const handleAddSuccess = (newCounselor) => {
    // Update the counselorData state to include the new counselor
    setCounselorData((prevData) => [...prevData, newCounselor]);

    // Update the filteredCounselorData state to include the new counselor
    setFilteredCounselorData((prevData) => [...prevData, newCounselor]);
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

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => setShowAdd(false);

  const handleShowEdit = (UID) => {
    setEditData(counselorData.find((counselor) => counselor.UID === UID));
    setShowEdit(true);
  };

  const handleCloseEdit = () => setShowEdit(false);

  //!MODAL BEHAVIOUR IMG CLICK
  const [showCounselor, setShowCounselor] = useState(false);
  const handleCloseCounselor = () => setShowCounselor(false);
  const handleShowCounselor = () => setShowCounselor(true);

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
                      <button
                        style={{ border: "none", background: "none" }}
                        onClick={handleShowCounselor}
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
                      <CounselorInfo
                        show={showCounselor}
                        handleClose={handleCloseCounselor}
                      />
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
                          handleRemove(counselor.UID);
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
        handleClose={handleCloseAdd}
        addCounselorToData={addCounselorToData}
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

  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const password = generateRandomPassword(8);

      const { user } = await createUserWithEmailAndPassword(
        auth,
        localFormData.Email,
        password
      );

      let photoURL = "";
      if (localFormData.ProfPic) {
        photoURL = await uploadImage(localFormData.ProfPic);
      }

      const newUser = {
        dateCreated: new Date().toISOString().split("T")[0],
        Email: localFormData.Email,
        firstName: localFormData.firstName,
        ConNum: localFormData.ConNum,
        ProfPic: photoURL,
        Role: "Counselor",
        UID: user.uid,
      };

      const userAccRef = collection(firestore, "Users");
      await addDoc(userAccRef, newUser);
      props.addCounselorToData(newUser);
      setLoading(false);

      // Close the modal after successful addition
      props.onHide();

      // Automatically render the new counselor in the table
      props.onAddSuccess(newUser);
    } catch (error) {
      setLoading(false);
      console.error("Error adding new counselor:", error);
    }
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
        <Form onSubmit={handleSubmitAdd}>
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
