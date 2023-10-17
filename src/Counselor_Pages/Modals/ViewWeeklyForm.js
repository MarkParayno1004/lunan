import { React, useState, useEffect } from "react";
import { Modal, Pagination } from "react-bootstrap";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase-config";

//!Main App Render
export const ViewWeeklyForm = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [wForms, setwForms] = useState(props.wForms || []);
  const [activeTab, setActiveTab] = useState("submitted");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    console.log("Entered Use Effect");
    setwForms(props.wForms || []);
  }, [props.wForms]);

  const [selectedwForm, setSelectedwForm] = useState(null);

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
  const [currentPage, setCurrentPage] = useState(1);
  const wFormsPerPage = 5; // Adjust as needed

  const totalPages = Math.ceil(
    wForms.filter((wForm) =>
      activeTab === "submitted"
        ? wForm.Status === null
        : wForm.Status === "Verified"
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
              className="table table-dark table-hover mt-3"
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
                {wForms
                  .filter((wForm) => wForm.Status === null)
                  .slice(
                    (currentPage - 1) * wFormsPerPage,
                    currentPage * wFormsPerPage
                  )
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
            <table
              className="table table-dark table-hover mt-3"
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
                {wForms
                  .filter((wForm) => wForm.Status === "Verified")
                  .slice(
                    (currentPage - 1) * wFormsPerPage,
                    currentPage * wFormsPerPage
                  )
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

  const updatewFormVerified = async (wFormId) => {
    const formRef = doc(firestore, "WeeklyForm", wFormId);
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
          <Modal.Title>View Weekly Form:</Modal.Title>
        </Modal.Header>
        <div className="d-flex justify-content-end mt-3">
          {" "}
          Total Score: {totalScore}/25
        </div>
        <table class="table table-dark table-hover mt-3">
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
            style={{ backgroundColor: "#f5e9cf", color: "red" }}
            onClick={() => updatewFormVerified(props.selectedwForm.id)}
          >
            Unverify
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
