import { React, useState, useEffect } from "react";
import { Modal, Pagination } from "react-bootstrap";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase-config";

//!Main App Render
export const ViewWellnessForm = (props) => {
  const [activeTab, setActiveTab] = useState("submitted");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [wellForms, setwellForms] = useState(props.wellForms || []);

  useEffect(() => {
    console.log("Entered Use Effect");
    setwellForms(props.wellForms || []);
  }, [props.wellForms]);

  const [selectedwellForm, setSelectedwellForm] = useState(null);

  const handleSelectwellForm = async (id) => {
    try {
      // Fetch the entire document by its ID
      const selectedFormDocRef = doc(firestore, "WellnessForm", id); // Replace with your Firestore instance
      const selectedFormDocSnap = await getDoc(selectedFormDocRef);

      // Check if the document exists
      if (selectedFormDocSnap.exists()) {
        // Get the data from the document
        const selectedFormData = selectedFormDocSnap.data();

        // Include the document ID in the data
        selectedFormData.id = selectedFormDocSnap.id;
        // Set the entire document data to selectedwellForm
        setSelectedwellForm(selectedFormData);
        setShow(true);
        console.log("Fetched form for ID:", id);
        console.log("Selected form data:", selectedFormData);
      } else {
        console.error("Document not found for ID:", id);
        // Handle the case where the document doesn't exist
      }
    } catch (error) {
      console.error("Error fetching form for ID:", id, error);
      // Handle the error as needed (e.g., display an error message)
    }
  };
  //!Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const wFormsPerPage = 5; // Adjust as needed

  const totalPages = Math.ceil(
    wellForms.filter((wellForm) =>
      activeTab === "submitted"
        ? wellForm.Status === null
        : wellForm.Status === "Verified"
    ).length / wFormsPerPage
  );

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
  //!Table Size
  const tableStyle = {
    height: "300px", // Set the desired height
    overflow: "auto", // Add scrollbars when content overflows
  };
  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Patients Daily Form</Modal.Title>
        </Modal.Header>
        <div className="tabs mt-4 d-flex justify-content-start">
          <button
            className={`me-3 ${activeTab === "submitted" ? "active" : ""}`}
            onClick={() => handleTabChange("submitted")}
          >
            Submitted Wellness Forms
          </button>
          <button
            className={activeTab === "verified" ? "active" : ""}
            onClick={() => handleTabChange("verified")}
          >
            Verified Wellness Forms
          </button>
        </div>
        {activeTab === "submitted" && (
          <>
            <h5>Submitted:</h5>
            <table class="table table-dark table-hover mt-3" style={tableStyle}>
              <thead>
                <tr>
                  <th scope="col">Name:</th>
                  <th scope="col">Date Submited:</th>
                  <th scope="col">View Form:</th>
                </tr>
              </thead>
              <tbody>
                {wellForms
                  .filter((wellForm) => wellForm.Status === null)
                  .slice(
                    (currentPage - 1) * wFormsPerPage,
                    currentPage * wFormsPerPage
                  )
                  .map((wellForm, index) => (
                    <tr key={index}>
                      <td>{wellForm.id}</td>
                      <td>{wellForm.DateSubmitted}</td>
                      <td>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#f5e9cf",
                            color: "#4d455d",
                          }}
                          onClick={() => {
                            handleSelectwellForm(wellForm.id);
                            handleShow(wellForm.id);
                          }} // Pass the form's ID
                        >
                          View Form
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  onClick={handlePreviousClick}
                  disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={handleNextClick}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </>
        )}
        {activeTab === "verified" && (
          <>
            <h5>Verified:</h5>
            <table class="table table-dark table-hover mt-3" style={tableStyle}>
              <thead>
                <tr>
                  <th scope="col">Name:</th>
                  <th scope="col">Date Submited:</th>
                  <th scope="col">View Form:</th>
                </tr>
              </thead>
              <tbody>
                {wellForms
                  .filter((wellForm) => wellForm.Status === "Verified")
                  .slice(
                    (currentPage - 1) * wFormsPerPage,
                    currentPage * wFormsPerPage
                  )
                  .map((wellForm, index) => (
                    <tr key={index}>
                      <td>{wellForm.id}</td>
                      <td>{wellForm.DateSubmitted}</td>
                      <td>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#f5e9cf",
                            color: "#4d455d",
                          }}
                          onClick={() => {
                            handleSelectwellForm(wellForm.id);
                            handleShow(wellForm.id);
                          }} // Pass the form's ID
                        >
                          View Form
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  onClick={handlePreviousClick}
                  disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={handleNextClick}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </>
        )}
        <ViewFormWell
          show={show}
          handleClose={handleClose}
          selectedwellForm={selectedwellForm}
          wellForm={selectedwellForm}
        />
      </Modal.Body>
    </Modal>
  );
};

//!Excess Modal
const ViewFormWell = (props) => {
  const questionsAndAnswers = props.selectedwellForm
    ? [
        {
          question: "1. In general, I consider myself:",
          answer: mapAnswer(props.selectedwellForm.WellnessQ1),
          id: props.selectedwellForm.id,
        },
        {
          question: "2. Compared to most of my peers, I consider myself:",
          answer: mapAnswer(props.selectedwellForm.WellnessQ2),
        },
        {
          question:
            "3. Some people are generally very happy. They enjoy life regardless of what is going on, getting the most out of everything. To what extent does this characterization describe you?",
          answer: mapAnswer(props.selectedwellForm.WellnessQ3),
        },
        {
          question:
            "4. Some people are generally not very happy. Although they are not depressed, they never seem as happy as they might be. To what extent does this characterization describe you?",
          answer: mapAnswer(props.selectedwellForm.WellnessQ4),
        },
      ]
    : [];

  const selectedwellForm = props.selectedwellForm || {};

  const totalScore =
    selectedwellForm.WellnessQ1 +
    selectedwellForm.WellnessQ2 +
    selectedwellForm.WellnessQ3 +
    selectedwellForm.WellnessQ4;

  const updatewellFormVerified = async (wellFormId) => {
    const formRef = doc(firestore, "WellnessForm", wellFormId);
    try {
      // Update the 'Status' field to "Verified"
      await updateDoc(formRef, {
        Status: "Verified",
      });
      console.log("Form status updated to Verified");
    } catch (error) {
      console.error("Error updating form status:", error);
    }
  };

  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div>View Daily Form:</div>
          </Modal.Title>
        </Modal.Header>
        <div className="d-flex justify-content-end mt-3">
          {" "}
          Total Score: {totalScore}/25
        </div>
        <table className="table table-dark table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">Question:</th>
              <th scope="col">Answer:</th>
            </tr>
          </thead>
          <tbody>
            {questionsAndAnswers.map((qa, index) => (
              <tr key={index}>
                <td>{qa.question}</td>
                <td>{qa.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            onClick={() => updatewellFormVerified(props.selectedwellForm.id)}
          >
            Verify
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapAnswer = (value) => {
  switch (value) {
    case 1:
      return "Not a very happy person - 1";
    case 2:
      return "Rather unhappy - 2";
    case 3:
      return "Somewhat unhappy - 3";
    case 4:
      return "Neither happy nor unhappy - 4";
    case 5:
      return "Somewhat happy - 5";
    case 6:
      return "Rather happy - 6";
    case 7:
      return "A very happy person - 7";
    default:
      return "";
  }
};
