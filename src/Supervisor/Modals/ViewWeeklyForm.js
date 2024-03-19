import React from "react";
import { useState } from "react";
import { Modal, Pagination } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase-config";

export const ViewWeeklyForm = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [wForms, setwForms] = useState(props.wForms || []);
  const [activeTab, setActiveTab] = useState("submitted");
  const [selectedwForm, setSelectedwForm] = useState(null);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  React.useEffect(() => {
    console.log("Entered Use Effect");
    setwForms(props.wForms || []);
  }, [props.wForms]);

  const handleSelectwForm = async (id) => {
    try {
      // Fetch the entire document by its ID
      const selectedFormDocRef = doc(firestore, "WeeklyForm", id); // Replace with your Firestore instance
      const selectedFormDocSnap = await getDoc(selectedFormDocRef);

      // Check if the document exists
      if (selectedFormDocSnap.exists()) {
        // Get the data from the document
        const selectedFormData = selectedFormDocSnap.data();

        // Include the document ID in the data
        selectedFormData.id = selectedFormDocSnap.id;
        // Set the entire document data to selectedwForm
        setSelectedwForm(selectedFormData);
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
  // Pagination state for "submitted" table
  const [submittedPage, setSubmittedPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Pagination state for "verified" table
  const [verifiedPage, setVerifiedPage] = useState(1);

  // Update the pagination based on the current page and tab
  const handlePageChange = (page) => {
    if (activeTab === "submitted") {
      setSubmittedPage(page);
    } else if (activeTab === "verified") {
      setVerifiedPage(page);
    }
  };

  // Filter data based on the active tab and current page
  const currentPage = activeTab === "submitted" ? submittedPage : verifiedPage;
  const filteredData =
    activeTab === "submitted"
      ? wForms
      : wForms.filter((wForm) => wForm.Status === "Verified");
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle "Next" and "Previous" button clicks
  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      handlePageChange(nextPage);
    }
  };

  const handlePreviousPage = () => {
    const previousPage = currentPage - 1;
    if (previousPage >= 1) {
      handlePageChange(previousPage);
    }
  };
  //!Table style
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
      <Modal.Body style={{ backgroundColor: "#1DC07C", color: "#ffffff" }}>
        <Modal.Header closeButton>
          <Modal.Title>Patients Weekly Form</Modal.Title>
        </Modal.Header>
        <div className="tabs mt-4 d-flex justify-content-start">
          <button
            className={`me-3 ${activeTab === "submitted" ? "active" : ""}`}
            onClick={() => handleTabChange("submitted")}
          >
            Submitted Weekly Forms
          </button>
          <button
            className={activeTab === "verified" ? "active" : ""}
            onClick={() => handleTabChange("verified")}
          >
            Verified Weekly Forms
          </button>
        </div>
        {activeTab === "submitted" && (
          <>
            <h5>Submitted:</h5>
            <table
              className="table table-light table-hover mt-3"
              style={tableStyle}
            >
              <thead>
                <tr>
                  <th scope="col">Name:</th>
                  <th scope="col">Date Submitted:</th>
                  <th scope="col">View Form:</th>
                </tr>
              </thead>
              <tbody>
                {currentData
                  .filter((wForm) => wForm.Status === null)
                  .map((wForm, index) => (
                    <tr key={index}>
                      <td>{wForm.id}</td>
                      <td>{wForm.DateSubmitted}</td>
                      <td>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#f5e9cf",
                            color: "#4d455d",
                          }}
                          onClick={() => {
                            handleSelectwForm(wForm.id);
                            handleShow(wForm.id);
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
                  onClick={handlePreviousPage}
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
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </>
        )}
        {activeTab === "verified" && (
          <>
            <h5>Verified:</h5>
            <table
              className="table table-light table-hover mt-3"
              style={tableStyle}
            >
              <thead>
                <tr>
                  <th scope="col">Name:</th>
                  <th scope="col">Date Submitted:</th>
                  <th scope="col">View Form:</th>
                </tr>
              </thead>
              <tbody>
                {currentData
                  .filter((wForm) => wForm.Status === "Verified")
                  .map((wForm, index) => (
                    <tr key={index}>
                      <td>{wForm.id}</td>
                      <td>{wForm.DateSubmitted}</td>
                      <td>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#f5e9cf",
                            color: "#4d455d",
                          }}
                          onClick={() => {
                            handleSelectwForm(wForm.id);
                            handleShow(wForm.id);
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
                  onClick={handlePreviousPage}
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
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </>
        )}
        <ViewFormWeek
          show={show}
          handleClose={handleClose}
          selectedwForm={selectedwForm}
          weeklyForm={selectedwForm}
        />
      </Modal.Body>
    </Modal>
  );
};

//!Excess Modal
const ViewFormWeek = (props) => {
  console.log("Selected Weekly Form Data:", props.selectedwForm);

  const mapAnswer = (value) => {
    switch (value) {
      case 0:
        return "At no time - 0";
      case 1:
        return "Some of the time - 1";
      case 2:
        return "Less than half of the time - 2";
      case 3:
        return "More than half of the time - 3";
      case 4:
        return "Most of the time - 4";
      case 5:
        return "All the time - 5";
      default:
        return "";
    }
  };

  const questionsAndAnswers = props.selectedwForm
    ? [
        {
          question: "1. I have felt cheerful and in good spirits.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ1),
          id: props.selectedwForm.id,
        },
        {
          question: "2. I have felt calm and relaxed.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ2),
        },
        {
          question: "3. I have felt active and vigorous.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ3),
        },
        {
          question: "4. I woke up feeling fresh and rested.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ4),
        },
        {
          question:
            "5. My daily life has been filled with things that interest me.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ5),
        },
      ]
    : [];

  const selectedwForm = props.selectedwForm || {};
  const q1 = selectedwForm.WeeklyQ1 || 0;
  const q2 = selectedwForm.WeeklyQ2 || 0;
  const q3 = selectedwForm.WeeklyQ3 || 0;
  const q4 = selectedwForm.WeeklyQ4 || 0;
  const q5 = selectedwForm.WeeklyQ5 || 0;

  const totalScore = q1 + q2 + q3 + q4 + q5;

  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#1DC07C", color: "#ffffff" }}>
        <Modal.Header closeButton>
          <Modal.Title>View Weekly Form:</Modal.Title>
        </Modal.Header>
        <div className="d-flex justify-content-end mt-3">
          {" "}
          Total Score: {totalScore}/25
        </div>
        <table class="table table-light table-hover mt-3">
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
        <div className="d-flex justify-content-end"></div>
      </Modal.Body>
    </Modal>
  );
};
