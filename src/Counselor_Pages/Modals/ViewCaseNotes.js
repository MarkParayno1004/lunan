import React from "react";
import { useState } from "react";
import { Modal, Pagination } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase-config";

//!Main App Render
export const ViewCaseNotes = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cNotes, setcNotes] = useState(props.cNotes || []);

  React.useEffect(() => {
    console.log("Entered Use Effect");
    setcNotes(props.cNotes || []);
  }, [props.cNotes]);

  const [selectedcNotes, setSelectedcNotes] = useState(null);

  const handleSelectcNotes = async (id) => {
    try {
      // Fetch the entire document by its ID
      const selectedcNotesRef = doc(firestore, "CaseNotes", id); // Replace with your Firestore instance
      const selectedcNotesDocSnap = await getDoc(selectedcNotesRef);

      // Check if the document exists
      if (selectedcNotesDocSnap.exists()) {
        // Get the data from the document
        const selectedcNoteData = selectedcNotesDocSnap.data();

        // Include the document ID in the data
        selectedcNoteData.id = selectedcNotesDocSnap.id;
        // Set the entire document data to selectedwForm
        setSelectedcNotes(selectedcNoteData);
        setShow(true);
        console.log("Fetched form for ID:", id);
        console.log("Selected form data:", selectedcNoteData);
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
  const cNotesPerPage = 5; // Adjust as needed
  const totalPages = Math.ceil(cNotes.length / cNotesPerPage);

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
      <Modal.Body style={{ backgroundColor: "#1DC07C", color: "#ffffff" }}>
        <Modal.Header closeButton>
          <Modal.Title>View Case Notes</Modal.Title>
        </Modal.Header>
        <table class="table table-light table-hover mt-3" style={tableStyle}>
          <thead>
            <tr>
              <th scope="col">Name:</th>
              <th scope="col">Date Created:</th>
              <th scope="col">View Case:</th>
            </tr>
          </thead>
          <tbody>
            {cNotes
              .slice(
                (currentPage - 1) * cNotesPerPage,
                currentPage * cNotesPerPage
              )
              .map((cNote, index) => (
                <tr key={index}>
                  <td>{cNote.id}</td>
                  <td>{cNote.dateAdded}</td>
                  <td>
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#F1A34F",
                        color: "#ffffff",
                        width: "auto",
                      }}
                      onClick={() => {
                        handleSelectcNotes(cNote.id);
                        handleShow(cNote.id);
                      }} // Pass the form's ID
                    >
                      View Note
                    </button>
                  </td>
                  <PublishCaseNotes
                    show={show}
                    handleClose={handleClose}
                    selectedcNotes={selectedcNotes}
                    caseNotes={selectedcNotes}
                  />
                </tr>
              ))}
          </tbody>
        </table>

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
      </Modal.Body>
    </Modal>
  );
};

const PublishCaseNotes = (props) => {
  const { selectedcNotes } = props;

  // Create a function to decode HTML entities
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <Modal className="mt-3" show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{ backgroundColor: "#1DC07C", color: "#ffffff" }}>
        <Modal.Header closeButton>
          <Modal.Title>Publish Case Notes:</Modal.Title>
        </Modal.Header>
        <table className="table table-light table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">Case Notes:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {/* Use dangerouslySetInnerHTML to display the HTML-parsed content */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: decodeHTML(selectedcNotes?.content || ""),
                  }}
                ></div>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};
