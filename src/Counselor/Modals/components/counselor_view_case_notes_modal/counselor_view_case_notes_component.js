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
    setcNotes(notesForSelectedPatient || []);
  }, [notesForSelectedPatient]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const notes = await fetchNotesForPatient(props.selectedPatientUID);
        setNotesForSelectedPatient(notes);
      } catch (error) {
        return error;
      }
    };

    if (props.selectedPatientUID) {
      fetchData();
    }
  }, [props.selectedPatientUID]);

  const fetchNotesForPatient = async (selectedPatientUID) => {
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
      return notes;
    } catch (error) {
      return error;
    }
  };

  const handleSelectcNotes = async (id) => {
    try {
      const selectedcNotesRef = doc(firestore, "CaseNotes", id);
      const selectedcNotesDocSnap = await getDoc(selectedcNotesRef);
      if (selectedcNotesDocSnap.exists()) {
        const selectedcNoteData = selectedcNotesDocSnap.data();
        selectedcNoteData.id = selectedcNotesDocSnap.id;
        setSelectedcNotes(selectedcNoteData);
        setShow(!show);
      } else {
        return "Document not found for ID";
      }
    } catch (error) {
      return error;
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
                    }}
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
