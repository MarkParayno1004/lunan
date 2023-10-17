import { React, useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//! Main App Render
export const CreateCaseNotes = (props) => {
  const [editorData, setEditorData] = useState("");

  const handleSubmitCase = async () => {
    const { currentUser } = getAuth();

    // Create a new case note object
    const caseNote = {
      content: editorData, // The formatted content from CKEditor
      patientUID: props.selectedPatientUID,
      counselorUID: currentUser.uid,
      dateAdded: new Date().toISOString().split("T")[0],
    };

    // Save the case note to Firebase
    const db = getFirestore();
    const caseNotesCollection = collection(db, "CaseNotes");

    try {
      await addDoc(caseNotesCollection, caseNote);
      console.log("Case note saved successfully!");
    } catch (error) {
      console.error("Error saving case note: ", error);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "#f5e9cf" }} className="rounded-5">
        {/* Add your page content here */}
        <h2 className="pt-3 ps-3" style={{ color: "#4d455d" }}>
          Input Case Note:
        </h2>
        <div style={{ color: "black" }} className="pe-3 ps-3">
          <CKEditor
            editor={Editor}
            config={{
              placeholder: "Input your case note...",
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data); // Update the editorData state with the new content
            }}
          />
        </div>
        <div className="mt-3 d-flex justify-content-end pe-3">
          <button
            className="close-button mb-3 me-3"
            onClick={props.onClose}
            style={{
              backgroundColor: "#4d455d",
              color: "#f5e9cf",
              borderRadius: "30px",
              width: "8%",
              height: "40px",
              borderStyle: "none",
            }}
          >
            Close
          </button>
          <button
            className="close-button mb-3"
            onClick={handleSubmitCase}
            style={{
              backgroundColor: "#4d455d",
              color: "#f5e9cf",
              borderRadius: "30px",
              width: "8%",
              height: "40px",
              borderStyle: "none",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
