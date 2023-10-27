import React, { useState, useRef, useEffect } from "react";
import { Modal, Pagination } from "react-bootstrap";
import {
  collection,
  doc,
  updateDoc,
  getFirestore,
  addDoc,
  getDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, getMetadata, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";
import { firestore } from "../../firebase/firebase-config";
//!Main App Render
export const ViewModalAssign = (props) => {
  const [activeTab, setActiveTab] = useState("assigned");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [tasks, setTasks] = useState(props.tasks || []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  React.useEffect(() => {
    // Update tasks when props.tasks changes
    console.log("Entered Use Effect");
    setTasks(props.tasks || []);
  }, [props.tasks]);

  useEffect(() => {
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
  //!View Assigned Activity Modal
  const [showAct, setShowAct] = useState(false);

  const handleShowAct = () => setShowAct(true);
  const handleCloseAct = () => setShowAct(false);

  //!View Turned-In Assignments Modal
  const [showTurnIn, setShowTurnIn] = useState(false);
  const handleShowTurnIn = () => setShowTurnIn(true);
  const handleCloseTurnIn = () => setShowTurnIn(false);

  //!View Verified Assignments Modal
  const [showVerified, setShowVerified] = useState(false);
  const handleShowVerified = () => setShowVerified(true);
  const handleCloseVerified = () => setShowVerified(false);

  //!Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the index of the first and last items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Function to filter tasks based on the active tab
  const filteredTasks = () => {
    if (activeTab === "assigned") {
      return tasks.filter((task) => task.Status === null);
    } else if (activeTab === "verified") {
      return tasks.filter((task) => task.Status === "Verified");
    } else if (activeTab === "turnedIn") {
      return tasks.filter((task) => task.Status === "turnedIn");
    }
    return [];
  };

  const [selectedTask, setSelectedTask] = useState(null);

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
        // setShow(true);
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

  // Get the tasks to be displayed on the current page
  const currentTasks = filteredTasks().slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages for pagination
  const totalPages = Math.ceil(filteredTasks().length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //!Table Size
  const tableStyle = {
    height: "300px", // Set the desired height
    overflow: "auto", // Add scrollbars when content overflows
  };
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      className="mt-3"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>View Assignment</Modal.Title>
        </Modal.Header>
        <div className="tabs mt-4 d-flex justify-content-start">
          <button
            className={`me-3 ${activeTab === "assigned" ? "active" : ""}`}
            onClick={() => handleTabChange("assigned")}
          >
            Assigned
          </button>
          <button
            className={`me-3 ${activeTab === "turnedIn" ? "active" : ""}`}
            onClick={() => handleTabChange("turnedIn")}
          >
            Turned-in Assignments
          </button>
          <button
            className={activeTab === "verified" ? "active" : ""}
            onClick={() => handleTabChange("verified")}
          >
            Verified Assignments
          </button>
        </div>
        {activeTab === "assigned" && (
          <>
            <table class="table table-dark table-hover mt-3" style={tableStyle}>
              <thead>
                <tr>
                  <th scope="col">Activity:</th>
                  <th scope="col">Descsription:</th>
                  <th scope="col">Deadline:</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {currentTasks
                  .filter((task) => task.Status === null)
                  .map((task, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          style={{
                            background: "none",
                            borderStyle: "none",
                            color: "white",
                            textDecoration: "underline",
                          }}
                          onClick={() => {
                            handleSelectTask(task.id);
                            handleShowAct(task.id);
                          }} // Pass the form's ID
                        >
                          {task.Activity}
                        </button>
                        <ViewAssignedActivity
                          show={showAct}
                          handleClose={handleCloseAct}
                          task={selectedTask}
                        />
                      </td>
                      <td>{task.Description}</td>
                      <td>{task.Deadline}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </>
        )}
        {activeTab === "verified" && (
          <>
            <table class="table table-dark table-hover mt-3" style={tableStyle}>
              <thead>
                <tr>
                  <th scope="col">Activity:</th>
                  <th scope="col">Description:</th>
                  <th scope="col">Turn-In Date:</th>{" "}
                  {/* Display Firestore document ID here */}
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {console.log("Tasks:", tasks)}
                {currentTasks
                  .filter((task) => task.Status === "Verified")
                  .map((task, index) => (
                    <tr key={index}>
                      <td>
                        {" "}
                        <button
                          style={{
                            background: "none",
                            borderStyle: "none",
                            color: "white",
                            textDecoration: "underline",
                          }}
                          onClick={() => {
                            handleSelectTask(task.id);
                            handleShowVerified(task.id);
                          }} // Pass the form's ID
                        >
                          {task.Activity}
                        </button>
                        <ViewVerifiedActivity
                          show={showVerified}
                          handleClose={handleCloseVerified}
                          task={selectedTask}
                        />
                      </td>
                      <td>{task.Description}</td>
                      <td>{task.id}</td>
                      {/* Display Firestore document ID here */}
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </>
        )}
        {activeTab === "turnedIn" && (
          <>
            <table class="table table-dark table-hover mt-3" style={tableStyle}>
              <thead>
                <tr>
                  <th scope="col">Activity:</th>
                  <th scope="col">Description:</th>
                  <th scope="col">Turn-In Date:</th>{" "}
                  {/* Display Firestore document ID here */}
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {console.log("Tasks:", tasks)}
                {currentTasks
                  .filter((task) => task.Status === "turnedIn")
                  .map((task, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          style={{
                            background: "none",
                            borderStyle: "none",
                            color: "white",
                            textDecoration: "underline",
                          }}
                          onClick={() => {
                            handleSelectTask(task.id);
                            handleShowTurnIn(task.id);
                          }} // Pass the form's ID
                        >
                          {task.Activity}
                        </button>
                        <ViewTurnedInActivity
                          show={showTurnIn}
                          handleClose={handleCloseTurnIn}
                          task={selectedTask}
                          selectedTask={selectedTask}
                        />
                      </td>
                      <td>{task.Description}</td>
                      <td>{task.id}</td>{" "}
                      {/* Display Firestore document ID here */}
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </>
        )}

        <Modal.Footer>
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            variant="secondary"
            onClick={props.handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

//!Excess Modals
const ViewAssignedActivity = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      className="mt-5"
      style={{ borderStyle: "none" }}
    >
      <Modal.Body style={{ backgroundColor: "#4D455D" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#F2E3D2" }}>View Activity:</Modal.Title>
        </Modal.Header>
        <div className="container-fluid mt-3" style={{ color: "white" }}>
          <span>
            <strong>{props.task?.Activity}</strong>
          </span>
          <p>{props.task?.Description} </p>
          <span>
            <span> | </span>
            <strong>Due Date:</strong> {props.task?.Deadline}
          </span>
          <span>
            <span> | </span>
            <strong>Turned-in Date:</strong> {props.task?.TurnedInDate}
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ViewTurnedInActivity = (props) => {
  const { show, handleClose } = props;
  const updateTaskStatus = async (taskId) => {
    const taskRef = doc(firestore, "Tasks", taskId);
    try {
      // Update the Status field to "Verified"
      await updateDoc(taskRef, {
        Status: "Verified",
      });
      console.log("Task status updated to Verified");
      props.handleClose();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const fetchFileName = async (downloadURL) => {
    const storage = getStorage(); // Initialize Firebase Storage
    const fileRef = ref(storage, downloadURL); // Create a reference to the file

    try {
      const metadata = await getMetadata(fileRef); // Get the metadata of the file
      return metadata.name; // Extract the file name
    } catch (error) {
      console.error("Error fetching file name:", error);
      return "N/A"; // Return a default value in case of an error
    }
  };

  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    if (props.selectedTask?.DownloadURL) {
      fetchFileName(props.selectedTask.DownloadURL)
        .then((name) => {
          setFileName(name);
        })
        .catch((error) => {
          console.error("Error fetching file name:", error);
        });
    }
  }, [props.selectedTask?.DownloadURL]);

  useEffect(() => {
    if (!show) {
      handleClose(); // Use destructured handleClose
    }
  }, [show, handleClose]);
  const handleFileClick = () => {
    if (props.selectedTask?.DownloadURL) {
      const storage = getStorage(); // Initialize Firebase Storage
      const fileRef = ref(storage, props.selectedTask.DownloadURL); // Create a reference to the file

      // Get the file download URL
      getDownloadURL(fileRef)
        .then((url) => {
          // Open the file in a new browser window
          window.open(url, "_blank");
        })
        .catch((error) => {
          console.error("Error opening file in a new window:", error);
        });
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      className="mt-5"
      style={{ borderStyle: "none" }}
    >
      <Modal.Body style={{ backgroundColor: "#4D455D" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#F2E3D2" }}>
            View Turned-In Activity:
          </Modal.Title>
        </Modal.Header>
        <div className="container-fluid mt-3" style={{ color: "white" }}>
          <span>
            <strong>{props.selectedTask?.Activity}</strong>
          </span>
          <br></br>
          {props.selectedTask?.Description}
          <br></br>
          <span>
            <strong>Due Date:</strong> {props.selectedTask?.Deadline}
          </span>
          <br></br>
          <span>
            <strong>Turned-in Date:</strong> {props.selectedTask?.TurnedInDate}
          </span>
          <br></br>
          <strong>File : </strong>
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={handleFileClick}
          >
            {fileName || "N/A"}
          </span>
          <div className="d-flex justify-content-end"></div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ViewVerifiedActivity = (props) => {
  const { show, handleClose } = props;
  const updateTaskStatus = async (taskId) => {
    const taskRef = doc(firestore, "Tasks", taskId);

    try {
      // Update the Status field to "Verified"
      await updateDoc(taskRef, {
        Status: "turnedIn",
      });
      console.log("Task status updated to Verified");
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const fetchFileName = async (downloadURL) => {
    const storage = getStorage(); // Initialize Firebase Storage
    const fileRef = ref(storage, downloadURL); // Create a reference to the file

    try {
      const metadata = await getMetadata(fileRef); // Get the metadata of the file
      return metadata.name; // Extract the file name
    } catch (error) {
      console.error("Error fetching file name:", error);
      return "N/A"; // Return a default value in case of an error
    }
  };

  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    if (props.task?.DownloadURL) {
      fetchFileName(props.task?.DownloadURL)
        .then((name) => {
          setFileName(name);
        })
        .catch((error) => {
          console.error("Error fetching file name:", error);
        });
    }
  }, [props.task?.DownloadURL]);

  useEffect(() => {
    if (!show) {
      handleClose(); // Use destructured handleClose
    }
  }, [show, handleClose]);
  const handleFileClick = () => {
    if (props.task?.DownloadURL) {
      const storage = getStorage(); // Initialize Firebase Storage
      const fileRef = ref(storage, props.task.DownloadURL); // Create a reference to the file

      // Get the file download URL
      getDownloadURL(fileRef)
        .then((url) => {
          // Open the file in a new browser window
          window.open(url, "_blank");
        })
        .catch((error) => {
          console.error("Error opening file in a new window:", error);
        });
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      className="mt-5"
      style={{ borderStyle: "none" }}
    >
      <Modal.Body style={{ backgroundColor: "#4D455D" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#F2E3D2" }}>
            View Turned-In Activity:
          </Modal.Title>
        </Modal.Header>
        <div className="container-fluid mt-3" style={{ color: "white" }}>
          <span>
            <strong>{props.task?.Activity}</strong>
          </span>
          <br></br>
          {props.task?.Description}
          <br></br>
          <span>
            <strong>Due Date:</strong> {props.task?.Deadline}
          </span>
          <br></br>
          <span>
            <strong>Turned-in Date:</strong> {props.task?.TurnedInDate}
          </span>
          <br></br>
          <strong>File : </strong>
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={handleFileClick}
          >
            {fileName || "N/A"}
          </span>
          <div className="d-flex justify-content-end"></div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
