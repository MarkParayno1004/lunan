import * as React from "react";
import {
  doc,
  getDocs,
  query,
  collection,
  where,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../../../firebase/firebase-config";
import { Box, Typography, Modal } from "@mui/material";

export default function CounselorViewCaseNotes(props) {
  const [show, setShow] = React.useState(false);
  const [selectedcNotes, setSelectedcNotes] = React.useState(null);
  const [notesForSelectedPatient, setNotesForSelectedPatient] = React.useState(
    []
  );
  const [cNotes, setcNotes] = React.useState(notesForSelectedPatient || []);

  React.useEffect(() => {
    console.log("Entered Use Effect");
    setcNotes(notesForSelectedPatient || []);
  }, [notesForSelectedPatient]);

  React.useEffect(() => {
    console.log("handleShowAss called with UID:", props.selectedPatientUID);

    const fetchData = async () => {
      try {
        // Fetch notes for the selected patient and set them in state
        const notes = await fetchNotesForPatient(props.selectedPatientUID);
        setNotesForSelectedPatient(notes);

        console.log("Tasks fetched", notes);
      } catch (error) {
        console.error("Error in handleShowAss:", error);
      }
    };

    if (props.selectedPatientUID) {
      fetchData();
    }

    // Cleanup function (if needed)
    return () => {
      // Cleanup code (if needed)
    };
  }, [props.selectedPatientUID]);

  const fetchNotesForPatient = async (selectedPatientUID) => {
    console.log("Fetching notes for ", selectedPatientUID);
    try {
      const q = query(
        collection(firestore, "CaseNotes"),
        where("patientUID", "==", selectedPatientUID)
      );
      const querySnapshot = await getDocs(q);
      const notes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched notes for", selectedPatientUID, notes);
      return notes;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  };

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
        setShow(!show);
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
      <div>
        <table className="w-full text-sm text-center h-full table-auto border border-slate-500">
          <thead className="bg-primaryGreen">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-ss-lg">
                Date Created
              </th>
              <th scope="col" className="px-6 py-3">
                View Case
              </th>
            </tr>
          </thead>
          <tbody>
            {cNotes.map((cNote, index) => (
              <tr key={index}>
                <td className="p-2 border border-slate-600">
                  {new Date(cNote.dateAdded).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="p-2 border border-slate-600">
                  <button
                    className="bg-orange-200 p-2 rounded-lg font-semibold"
                    onClick={() => {
                      handleSelectcNotes(cNote.id);
                      setShow(!show);
                    }} // Pass the form's ID
                  >
                    View Note
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PublishCaseNotes
        show={show}
        handleClose={() => setShow(!show)}
        selectedcNotes={selectedcNotes}
        caseNotes={selectedcNotes}
      />
    </div>
  );
}

const PublishCaseNotes = (props) => {
  // Create a function to decode HTML entities
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Case Note
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHTML(props.selectedcNotes?.content || ""),
              }}
            ></div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
