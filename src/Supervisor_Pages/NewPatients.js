import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/AllPatients.css";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
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
        const patients = querySnapshot.docs.map((doc) => doc.data());

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
      className="container-fluid justify-content-center rounded-5 mt-5 mb-3 p-3"
      id="cardAllPatientBG"
    >
      <div className="row">
        <div className="col"></div>
        <div className="col-4">
          <h2 className="text-center mt-4 mb-4">New Patient List</h2>
        </div>
        <div className="col">
          <div className="input-group mt-4">
            <input
              type="text"
              placeholder="Patient Name..."
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
                (patient) =>
                  patient.counselorUID === null && (
                    <tr key={patient.UID}>
                      <td>
                        <img
                          src={fetchImageUrl(patient.ProfPic)}
                          alt={patient.firstName}
                          width="100"
                          height="100"
                        />
                      </td>
                      <td>{patient.firstName}</td>
                      <td>{patient.dateCreated}</td>
                      <td>{patient.UID}</td>
                      <td>
                        <button
                          className="rounded-5 fw-medium"
                          id="editCounselor"
                          onClick={handleShowEdit}
                        >
                          Assign
                        </button>
                        <AssignPatient
                          show={showEdit}
                          onHide={handleCloseEdit}
                          handleClose={handleCloseEdit}
                          userId={patient.UID}
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

  const handleSubmitEdit = (event) => {
    event.preventDefault(); // Prevent form submission
    const userAccRef = collection(firestore, "Users");
    const userDocRef = doc(userAccRef, props.userId); // Access UID from props

    // Update only the fields that are not null
    const updateData = {
      counselorUID: selectedCounselor,
    };

    // Update the document with the new data
    updateDoc(userDocRef, updateData)
      .then(() => {
        console.log("User data updated successfully.");
        // Perform any additional actions after the update if needed
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        // Handle the error case if needed
      });
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
              <option value="">Select Counselor</option>
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
