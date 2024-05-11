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
    if (!editorData.trim()) {
      return toast.error("Please enter a case note before submitting.", {
        autoClose: 2500,
      });
    }
    const caseNote = {
      content: editorData,
      patientUID: props.selectedPatientUID,
      counselorUID: currentUser.uid,
      dateAdded: new Date().toISOString().split("T")[0],
    };
    const db = getFirestore();
    const caseNotesCollection = collection(db, "CaseNotes");
    try {
      await addDoc(caseNotesCollection, caseNote);
      toast.success("Successful Submitted", { autoClose: 2500 });
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <div>
        <div>
          <div className="bg-primaryGreen rounded-t-lg p-2 text-md font-semibold">
            <span>Create Case Note</span>
          </div>
          <CKEditor
            editor={Editor}
            config={{
              placeholder: "Create new case note...",
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
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
