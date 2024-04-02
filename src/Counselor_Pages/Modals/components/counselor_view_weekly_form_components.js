import * as React from "react";
import {
  doc,
  getDoc,
  getDocs,
  where,
  collection,
  query,
} from "firebase/firestore";
import { firestore } from "../../../firebase/firebase-config";
import CounselorSubmittedWeeklyForm from "./counselor_submitted_weekly_form_comonent";
import CounselorVerifiedWeeklyForms from "./counselor_verified_weekly_forms_component";

export default function CounselorViewWeeklyForm(props) {
  const [activeTab, setActiveTab] = React.useState("Submitted");
  const [selectedwForm, setSelectedwForm] = React.useState(null);
  const [wFormsForSelectedPatient, setwFormsForSelectedPatient] =
    React.useState([]);

  React.useEffect(() => {
    const handleShowWeek = async (selectedPatientUID) => {
      console.log("handleShowWeek called with UID:", selectedPatientUID);
      try {
        const wForm = await fetchWeeklyForPatient(selectedPatientUID);
        setwFormsForSelectedPatient(wForm);
        console.log("Weekly Forms fetched", wForm);
      } catch (error) {
        console.error("Error in handleShowAss:", error);
      }
    };

    if (props.selectedPatientUID) {
      handleShowWeek(props.selectedPatientUID);
    }
  }, [props.selectedPatientUID]);

  const fetchWeeklyForPatient = async (selectedPatientUID) => {
    console.log("Fetching weekly forms for ", selectedPatientUID);
    try {
      const q = query(
        collection(firestore, "WeeklyForm"),
        where("UID", "==", selectedPatientUID)
      );
      const querySnapshot = await getDocs(q);
      const wForms = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        // Convert specific number fields to strings
        data.WeeklyQ1 = String(data.WeeklyQ1);
        data.WeeklyQ2 = String(data.WeeklyQ2);
        data.WeeklyQ3 = String(data.WeeklyQ3);
        data.WeeklyQ4 = String(data.WeeklyQ4);
        data.WeeklyQ5 = String(data.WeeklyQ5);

        return { id: doc.id, ...data };
      });
      console.log("Fetched Weekly Forms for", selectedPatientUID, wForms);
      return wForms;
    } catch (error) {
      console.error("Error fetching wForms:", error);
      return [];
    }
  };

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

  function getTabContent(activeTab) {
    if (activeTab === "Submitted") {
      return (
        <CounselorSubmittedWeeklyForm
          selectedPatientUID={props.selectedPatientUID}
          weeklyForms={wFormsForSelectedPatient}
          handleSelectwForm={handleSelectwForm}
          selectedwForm={selectedwForm}
        />
      );
    } else if (activeTab === "Verified") {
      return (
        <CounselorVerifiedWeeklyForms
          selectedPatientUID={props.selectedPatientUID}
          weeklyForms={wFormsForSelectedPatient}
          handleSelectwForm={handleSelectwForm}
          selectedwForm={selectedwForm}
        />
      );
    }
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <div>
      <h4 className="pb-2">View Weekly Forms</h4>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-styled-tab"
        >
          <li className="me-2">
            <button
              className={`tab-button inline-block p-3 border-b-2 rounded-t-lg ${
                activeTab === "Submitted" ? "bg-orange-200" : ""
              }`}
              id="profile-styled-tab"
              onClick={() => handleTabClick("Submitted")}
              type="button"
              role="tab"
              aria-controls="Submitted"
              aria-selected={activeTab === "Submitted"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline-block mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Submitted Weekly Forms
            </button>
          </li>
          <li className="me-2">
            <button
              className={`tab-button inline-block p-3 border-b-2 rounded-t-lg ${
                activeTab === "Verified" ? "bg-orange-200" : ""
              }`}
              id="dashboard-styled-tab"
              onClick={() => handleTabClick("Verified")}
              type="button"
              role="tab"
              aria-controls="Verified"
              aria-selected={activeTab === "Verified"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline-block mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
              <span>Verified Weekly Forms</span>
            </button>
          </li>
        </ul>
      </div>
      <div>{getTabContent(activeTab)}</div>
    </div>
  );
}
