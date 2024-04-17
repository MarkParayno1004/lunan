import * as React from "react";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../../../firebase/firebase-config";
import CounselorSubmittedDailyForms from "./counselor_submitted_daily_forms_component";
import CounselorVerifiedDailyForms from "./counselor_verified_daily_forms_component";
export default function CounselorViewDailyForm(props) {
  const [activeTab, setActiveTab] = React.useState("Submitted");
  const [wellFormsForSelectedPatient, setWellFormsForSelectedPatient] =
    React.useState([]);

  const [wellForms, setwellForms] = React.useState(
    wellFormsForSelectedPatient || []
  );

  const fetchWellnessForPatient = async (selectedPatientUID) => {
    console.log("Fetching wellness forms for ", selectedPatientUID);
    try {
      const q = query(
        collection(firestore, "WellnessForm"),
        where("UID", "==", selectedPatientUID)
      );
      const querySnapshot = await getDocs(q);
      const wellForms = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        // Convert specific number fields to strings
        data.WellnessQ1 = String(data.WellnessQ1);
        data.WellnessQ2 = String(data.WellnessQ2);
        data.WellnessQ3 = String(data.WellnessQ3);
        data.WellnessQ4 = String(data.WellnessQ4);

        return { id: doc.id, ...data };
      });
      console.log("Fetched Weekly Forms for", selectedPatientUID, wellForms);
      return wellForms;
    } catch (error) {
      console.error("Error fetching wForms:", error);
      return [];
    }
  };

  React.useEffect(() => {
    const fetchWellnessData = async () => {
      console.log(
        "handleShowWellness called with UID:",
        props.selectedPatientUID
      );
      try {
        const wellForm = await fetchWellnessForPatient(
          props.selectedPatientUID
        );
        setWellFormsForSelectedPatient(wellForm);
        console.log("Wellness Forms fetched", wellForm);
      } catch (error) {
        console.error("Error in handleShowWellness:", error);
      }
    };

    if (props.selectedPatientUID !== null) {
      fetchWellnessData();
    }
  }, [props.selectedPatientUID]);

  React.useEffect(() => {
    // Create a query to get Forms for the selected patient
    const wellFormsQuery = query(
      collection(firestore, "WellnessForm"),
      where("UID", "==", props.selectedPatientUID) // Replace "PatientUID" with the actual field name in your Firestore data
    );

    const unsubscribe = onSnapshot(wellFormsQuery, (snapshot) => {
      const updatedwellForms = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setwellForms(updatedwellForms);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [props.selectedPatientUID]);

  function getTabContent(activeTab) {
    if (activeTab === "Submitted") {
      return <CounselorSubmittedDailyForms wellForms={wellForms} />;
    } else if (activeTab === "Verified") {
      return <CounselorVerifiedDailyForms wellForms={wellForms} />;
    }
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <div>
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
              Submitted Daily Forms
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
              <span>Verified Daily Forms</span>
            </button>
          </li>
        </ul>
      </div>
      <div>{getTabContent(activeTab)}</div>
    </div>
  );
}
