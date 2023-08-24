import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/NewPatients.css";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  getMetadata,
  setMetadata,
} from "firebase/storage";
import { firestore } from "../firebase/firebase-config";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export const NewPatients = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patientsData.filter(
    (patient) =>
      patient.name &&
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  //! Modal Behaviour for Edit Button
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        const patients = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID
          data: doc.data(), // Include the patient data
        }));
  
        console.log("Patients Data:", patients); // Log the data
  
        setPatientsData(patients);
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };
  
    fetchPatientsData();
  }, []);
  const fetchImageUrl = (imageUrl) => {
    return imageUrl;
  };

  return (
    <div
      className="container-lg d-flex justify-content-center rounded-5 mt-5 ms-5 mb-3 pb-3"
      id="NewPatientForm"
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col d-flex align-items-center d-flex justify-content-center ms-5 ps-5">
            <h1 className="mt-2 ms-5 ps-5">New Patient List</h1>
          </div>
          <div className="col-3 col-sm-3 mb-3">
            <div className="input-group mt-4">
              <input
                type="text"
                placeholder="Search Patient Name:"
                value={searchQuery}
                onChange={handleSearch}
                aria-describedby="search"
                className="w-25 form-control"
              />
              <span class="input-group-text" id="search">
                <button style={{ border: "none", background: "none" }}>
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
                  <th scope="col">Picture</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date Added</th>
                  <th scope="col">Counselor</th>
                  <th scope="col">Assign Patient</th>
                </tr>
              </thead>
              <tbody>
              {patientsData.map(
  (patientObj) =>
    patientObj.data.counselorUID === null && (
      <tr key={patientObj.id}>
        <td>
          <img
            src={fetchImageUrl(patientObj.data.ProfPic)}
            alt={patientObj.data.firstName}
            width="100"
            height="100"
          />
        </td>
        <td>{patientObj.data.firstName}</td>
        <td>{patientObj.data.dateCreated}</td>
        <td>{patientObj.data.UID}</td>
        <td>
          <button
            className="rounded-5 fw-medium"
            id="editCounselor"
            onClick={() => handleShowEdit(patientObj.id)} // Pass the document ID
          >
            Assign
          </button>
          <AssignPatient
            show={showEdit}
            onHide={handleCloseEdit}
            handleClose={handleCloseEdit}
            userId={patientObj.id} // Pass the document ID
                          />
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
const AssignPatient = (props) => {
  const [selectedCounselor, setSelectedCounselor] = useState("");
  const [counselors, setCounselors] = useState([]);

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(firestore, "Users"),
            where("Role", "==", "Counselor")
          )
        );
        const counselorData = querySnapshot.docs.map((doc) => doc.data());

        setCounselors(counselorData);
        console.log("User ID:", props.userId);
      } catch (error) {
        console.error("Error fetching counselors:", error);
      }
    };

    fetchCounselors();
  }, [props.userId]);

  const handleCounselorChange = (event) => {
    setSelectedCounselor(event.target.value);
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    const userAccRef = collection(firestore, "Users");
    const userDocRef = doc(userAccRef, props.userId);
  
    console.log("Document Reference Path:", userDocRef.path);
  
    try {
      // Fetch the existing document data
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const existingData = docSnapshot.data();
  
        // Modify the existing data with the new counselorUID
        const updateData = {
          ...existingData,
          counselorUID: selectedCounselor,
        };
  
        // Attempt to update the existing document
        await updateDoc(userDocRef, updateData);
        console.log("User data updated successfully.");
        
      } else {
        console.log("Document does not exist."); // Handle this case if needed
      }
    } catch (error) {
      console.error("Firebase Error Code:", error.code);
      console.error("Error updating user data:", error);
      // Handle the error case if needed
    }
  };
  
  

  return (
    <Modal
      className="container-fluid"
      show={props.show}
      onHide={props.handleClose}
      style={{ color: "white" }}
    >
      <Modal.Body id="BGmodal">
        <Modal.Header className="mb-3" closeButton>
          <Modal.Title>Edit Counselor</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitEdit}>
          {/* Counselor */}
          <Form.Group>
            <Form.Label>Counselor</Form.Label>
            <Form.Control
              as="select"
              name="counselor"
              value={selectedCounselor}
              onChange={handleCounselorChange}
            >
              <option value="null">Select Counselor</option>
              {counselors.map((counselor) => (
                <option key={counselor.UID} value={counselor.UID}>
                  {counselor.firstName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Modal.Footer className="mt-3">
            <Button
              variant="primary"
              type="submit"
              className="rounded-5 fw-medium"
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
