import * as React from "react";
import { Modal, Pagination } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase-config";

export default function CounselorViewCaseNotes(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => React.setShow(false);
  const handleShow = () => React.setShow(true);
  const [cNotes, setcNotes] = React.useState(props.cNotes || []);

  React.useEffect(() => {
    console.log("Entered Use Effect");
    setcNotes(props.cNotes || []);
  }, [props.cNotes]);

  const [selectedcNotes, setSelectedcNotes] = React.useState(null);

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

  return (
    <div>
      {/* <table>
          <thead>
            <tr>
              <th scope="col">Name:</th>
              <th scope="col">Date Created:</th>
              <th scope="col">View Case:</th>
            </tr>
          </thead>
          <tbody>
            {cNotes.map((cNote, index) => (
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
        </table> */}
      <table className="w-full text-sm text-center h-full table-auto border border-slate-500">
        <thead className="bg-primaryGreen">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-ss-lg">
              Activity
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Deadline
            </th>
            <th scope="col" className="px-6 py-3">
              View Activity
            </th>
            <th scope="col" className="px-6 py-3 ">
              Edit
            </th>
            <th scope="col" className="px-6 py-3 rounded-se-lg">
              Delete
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

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
