import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { getAuth } from "firebase/auth";

export default function CounselorCreateCaseNote(props) {
  const [editorData, setEditorData] = React.useState("");

  const handleSubmitCase = async () => {
    const { currentUser } = getAuth();

    // Check if editorData is empty
    if (!editorData.trim()) {
      // If empty, show a toast message or any other form of notification to the user
      return toast.error("Please enter a case note before submitting.", {
        autoClose: 2500,
      });
    }
    const caseNote = {
      // The formatted content from CKEditor
      content: editorData,
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
      toast.success("Successful Submitted", { autoClose: 2500 });
    } catch (error) {
      console.error("Error saving case note: ", error);
    }
  };

  return (
    <div>
      <div>
        {/* Add your page content here */}
        <h2>Create Case Note:</h2>
        <div>
          <CKEditor
            editor={Editor}
            config={{
              placeholder: "Create new case note...",
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data); // Update the editorData state with the new content
            }}
          />
          <ToastContainer />
        </div>
      </div>
      <div className="grid justify-items-stretch">
        <div className="justify-self-end">
          <button
            className="bg-orange-200 p-2 rounded-lg mt-2 text-sm font-semibold"
            onClick={handleSubmitCase}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
