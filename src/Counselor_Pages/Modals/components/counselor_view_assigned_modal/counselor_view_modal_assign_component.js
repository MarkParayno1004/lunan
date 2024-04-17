import * as React from "react";
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../../../firebase/firebase-config";
import CounselorAssignedTableModal from "./counselor_assigned_table_modal_component";
import CounselorTurnedInTableModal from "./counselor_assign_turned_in_table_modal_component";
import CounselorVerifiedTable from "./counselor_assigned_verified_table_component";

export default function CounselorViewModalAssign(props) {
  const [activeTab, setActiveTab] = React.useState("Assigned");
  const [tasks, setTasks] = React.useState([]);
  const [selectedTask, setSelectedTask] = React.useState(null);

  const handleSelectTask = async (id) => {
    try {
      // Fetch the entire document by its ID
      const selectedTaskRef = doc(firestore, "Tasks", id); // Replace with your Firestore instance
      const selectedTaskDocSnap = await getDoc(selectedTaskRef);

      // Check if the document exists
      if (selectedTaskDocSnap.exists()) {
        // Get the data from the document
        const selectedTaskData = selectedTaskDocSnap.data();

        // Include the document ID in the data
        selectedTaskData.id = selectedTaskDocSnap.id;
        // Set the entire document data to selectedwForm
        setSelectedTask(selectedTaskData);
        console.log("Fetched Tasks for ID:", id);
        console.log("Selected form data:", selectedTaskData);
      } else {
        console.error("Document not found for ID:", id);
        // Handle the case where the document doesn't exist
      }
    } catch (error) {
      console.error("Error fetching form for ID:", id, error);
      // Handle the error as needed (e.g., display an error message)
    }
  };

  React.useEffect(() => {
    // Create a query to get tasks for the selected patient
    const tasksQuery = query(
      collection(firestore, "Tasks"),
      where("PatientUID", "==", props.selectedPatientUID) // Replace "PatientUID" with the actual field name in your Firestore data
    );

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const updatedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(updatedTasks);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [props.selectedPatientUID]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  function getTabContent(activeTab) {
    if (activeTab === "Assigned") {
      return (
        <CounselorAssignedTableModal
          tasks={tasks}
          selectedPatientUID={props.selectedPatientUID}
          selectedTask={selectedTask}
          handleSelectTask={handleSelectTask}
        />
      );
    } else if (activeTab === "TurnedIn") {
      return (
        <CounselorTurnedInTableModal
          tasks={tasks}
          selectedTask={selectedTask}
          handleSelectTask={handleSelectTask}
        />
      );
    } else if (activeTab === "Verified") {
      return (
        <CounselorVerifiedTable
          tasks={tasks}
          selectedTask={selectedTask}
          handleSelectTask={handleSelectTask}
        />
      );
    }
  }

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
                activeTab === "Assigned" ? "bg-orange-200" : ""
              }`}
              id="profile-styled-tab"
              onClick={() => handleTabClick("Assigned")}
              type="button"
              role="tab"
              aria-controls="Assigned"
              aria-selected={activeTab === "Assigned"}
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
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
              Assigned
            </button>
          </li>
          <li className="me-2">
            <button
              className={`tab-button inline-block p-3 border-b-2 rounded-t-lg ${
                activeTab === "TurnedIn" ? "bg-orange-200" : ""
              }`}
              id="dashboard-styled-tab"
              onClick={() => handleTabClick("TurnedIn")}
              type="button"
              role="tab"
              aria-controls="TurnedIn"
              aria-selected={activeTab === "TurnedIn"}
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

              <span>Turned-in Assigned</span>
            </button>
          </li>
          <li>
            <button
              className={`tab-button inline-block p-3 border-b-2 rounded-t-lg ${
                activeTab === "Verified" ? "bg-orange-200" : ""
              }`}
              id="settings-styled-tab"
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
              <span>Verified Assignments</span>
            </button>
          </li>
        </ul>
      </div>
      <div> {getTabContent(activeTab)}</div>
    </div>
  );
}
