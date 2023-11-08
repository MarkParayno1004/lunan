import { useState, useEffect } from "react";
import { Button, Form, Pagination } from "react-bootstrap";
import "../../css/NewPatients.css";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase-config";
import { Modal } from "react-bootstrap";
import fetch from "node-fetch";

export const NewPatients = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [filteredPatientsData, setFilteredPatientsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    // Create a query to get Forms for the selected patient
    const patientQuery = query(collection(firestore, "Users"));

    const unsubscribe = onSnapshot(patientQuery, (snapshot) => {
      const updatedPatientList = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setPatientsData(updatedPatientList);
      setFilteredPatientsData(updatedPatientList);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const fetchImageUrl = (imageUrl) => {
    return imageUrl;
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

  const filteredPatients = patientsData.filter((patient) => {
    const patientData = patient.data;
    return (
      patientData.firstName?.toLowerCase().includes(searchQuery) ||
      patientData.lastName?.toLowerCase().includes(searchQuery)
    );
  });

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => setShowEdit(id);

  //!Table style
  const tableStyle = {
    height: "650px", // Set the desired height
    overflow: "hidden", // Add scrollbars when content overflows
  };

  //!Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter and slice the patients based on the current page
  const currentPatientsData = filteredPatients
    .filter((patientObj) => patientObj.data.counselorID === null)
    .slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    filteredPatients.filter(
      (patientObj) => patientObj.data.counselorID === null
    ).length / itemsPerPage
  );
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
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="flex-grow-1">
            <table className="table table-dark" style={tableStyle}>
              <thead>
                <tr>
                  <th scope="col">Picture</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date Added</th>
                  <th scope="col">Assign Patient</th>
                </tr>
              </thead>
              <tbody>
                {currentPatientsData.map(
                  (patientObj) =>
                    patientObj.data.counselorID === null && (
                      <tr key={patientObj.id}>
                        <td>
                          {patientObj.data.ProfPic ? (
                            <img
                              src={fetchImageUrl(patientObj.data.ProfPic)}
                              alt={patientObj.data.firstName}
                              width="100"
                              height="100"
                            />
                          ) : (
                            <img
                              src="https://firebasestorage.googleapis.com/v0/b/lunan-75e15.appspot.com/o/user_profile_pictures%2FProfilePic.png?alt=media&token=25b442b3-110c-4dc5-af56-4fd799b77dcc"
                              alt={patientObj.data.firstName}
                              width="100"
                              height="100"
                            />
                          )}
                        </td>
                        <td>{patientObj.data.firstName}</td>
                        <td>{patientObj.data.dateCreated}</td>
                        <td>
                          <button
                            className="rounded-5 fw-medium"
                            id="editCounselor"
                            onClick={() => handleShowEdit(patientObj.id)}
                          >
                            Assign
                          </button>
                          <AssignPatient
                            show={showEdit === patientObj.id}
                            onHide={handleCloseEdit}
                            handleClose={handleCloseEdit}
                            userId={patientObj.id}
                          />
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
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
        </div>
      </div>
    </div>
  );
};

const AssignPatient = (props) => {
  const [selectedCounselor, setSelectedCounselor] = useState("");
  const [selectedCounselorUID, setSelectedCounselorUID] = useState("");
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
        const counselorData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        setCounselors(counselorData);
      } catch (error) {
        console.error("Error fetching counselors:", error);
      }
    };

    fetchCounselors();
  }, [props.userId]);

  const handleCounselorChange = (event) => {
    setSelectedCounselor(event.target.value);
    setSelectedCounselorUID(event.target.value);
  };

  async function sendTemporaryCredentialsToEmail(existingData) {
    const emailData = {
      to: existingData.Email,
      subject: "Your Temporary Credentials",
      body: `Username: ${existingData.Email}\nPassword: ${existingData.password}`,
    };

    console.log("Sending email data:", emailData);

    try {
      const response = await fetch("http://localhost:3005/send-email", {
        // Adjust the URL as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      console.log("Email sending response:", response);

      if (response.ok) {
        console.log("Temporary credentials email sent successfully.");
      } else {
        console.error("Failed to send temporary credentials email.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // Define the function to handle form submission
  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    const userAccRef = collection(firestore, "Users");
    const userDocRef = doc(userAccRef, props.userId);

    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const existingData = docSnapshot.data();

        const selectedCounselorData = counselors.find(
          (counselor) => counselor.id === selectedCounselor
        );
        const selectedCounselorUID = selectedCounselorData
          ? selectedCounselorData.data.UID
          : "";

        const updateData = {
          ...existingData,
          counselorID: selectedCounselor,
          counselorUID: selectedCounselorUID,
        };

        await updateDoc(userDocRef, updateData);
        console.log("User data updated successfully.");

        // Send existing temporary credentials to user's email
        await sendTemporaryCredentialsToEmail(existingData);
        console.log("Temporary credentials sent to user's email.");
      } else {
        console.log("Document does not exist.");
      }
    } catch (error) {
      console.error("Firebase Error Code:", error.code);
      console.error("Error updating user data:", error);
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
                <option key={counselor.id} value={counselor.id}>
                  {counselor.data.firstName}
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
