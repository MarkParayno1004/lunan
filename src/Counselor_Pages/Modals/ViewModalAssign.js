import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { Modal, Pagination } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { firestore } from "../../firebase/firebase-config";
import {
  collection,
  doc,
  updateDoc,
  getFirestore,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

//!Main App Render
export const ViewModalAssign = (props) => {
  const [activeTab, setActiveTab] = useState("assigned");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [tasks, setTasks] = useState(props.tasks || []);
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShowCreate = (selectedPatientUID) => {
    console.log(
      `Creating assignments for patient with UID: ${selectedPatientUID}`
    );
    setShow(true);
  };

  const handleSubmit = () => {
    Swal.fire({
      background: "#4d455d",
      color: "#f5e9cf",
      position: "center",
      icon: "success",
      title: "Assignment successfully created!",
      showConfirmButton: false,
      timer: 2000,
    });
    setShow(false);
  };
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
                  <th scope="col">Edit:</th>
                  <th scope="col">Delete:</th>
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
                          onClick={handleShowAct}
                        >
                          {task.Activity}
                        </button>
                        <ViewAssignedActivity
                          show={showAct}
                          handleClose={handleCloseAct}
                          Activity={task.Activity}
                          Description={task.Description}
                          DueDate={task.Deadline}
                          TurnedInDate={""}
                        />
                      </td>
                      <td>{task.Description}</td>
                      <td>{/*Input Deadline */}</td>
                      <td>
                        <button
                          className="rounded-3"
                          style={{
                            backgroundColor: "#F2E3D2",
                            color: "#4D455D",
                            borderStyle: "none",
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="rounded-3"
                          style={{
                            backgroundColor: "#F2E3D2",
                            color: "#4D455D",
                            borderStyle: "none",
                          }}
                        >
                          Delete
                        </button>
                      </td>
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
                          onClick={handleShowVerified}
                        >
                          {task.Activity}
                        </button>
                        <ViewVerifiedActivity
                          show={showVerified}
                          handleClose={handleCloseVerified}
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
                          onClick={handleShowTurnIn}
                        >
                          {task.Activity}
                        </button>
                        <ViewTurnedInActivity
                          show={showTurnIn}
                          handleClose={handleCloseTurnIn}
                          Activity={task.Activity}
                          Description={task.Description}
                          DueDate={task.Deadline}
                          TurnedInDate={""}
                          task={task.id}
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
            onClick={() => handleShowCreate(props.selectedPatientUID)}
          >
            Create Assignment
          </button>
          <CreateAssignment
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            selectedPatientUID={props.selectedPatientUID}
          />
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
            <strong>{props.Activity}</strong>
          </span>
          <p>{props.Description} </p>
          <span>
            <span> | </span>
            <strong>Due Date:</strong> {props.DueDate}
          </span>
          <span>
            <span> | </span>
            <strong>Turned-in Date:</strong> {props.TurnedInDate}
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ViewTurnedInActivity = (props) => {
  const updateTaskStatus = async (taskId) => {
    const taskRef = doc(firestore, "Tasks", taskId); // Replace with your Firestore instance

    try {
      // Update the Status field to "Verified"
      await updateDoc(taskRef, {
        Status: "Verified",
      });
      console.log("Task status updated to Verified");
    } catch (error) {
      console.error("Error updating task status:", error);
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
            <strong>{props.Activity}</strong>
          </span>
          <p>{props.Description} </p>
          <span>
            <span> | </span>
            <strong>Due Date:</strong> {props.DueDate}
          </span>
          <span>
            <span> | </span>
            <strong>Turned-in Date:</strong> {props.TurnedInDate}
          </span>
          <div className="d-flex justify-content-end">
            <button
              className="btn mt-3"
              style={{
                backgroundColor: "#f5e9cf",
                color: "#4d455d",
              }}
              onClick={() => updateTaskStatus(props.task)}
            >
              Verify
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ViewVerifiedActivity = (props) => {
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
            View Verified Activity:
          </Modal.Title>
        </Modal.Header>
        <div className="container-fluid mt-3" style={{ color: "white" }}>
          <span>Activity Title:</span>
          <p>Description: </p>
          <div>File Attached:</div>
          <span>
            <span> | </span>
            <strong>Due Date:</strong>
          </span>
          <span>
            <span> | </span>
            <strong>Turned-in Date:</strong>
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};
const CreateAssignment = (props) => {
  const [date, setDate] = useState("");
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmitCreate = () => {
    const db = getFirestore();
    const { currentUser } = getAuth();
    console.log("currentUser:", currentUser);
    console.log("selectedPatientUID:", props.selectedPatientUID);

    if (currentUser && props.selectedPatientUID) {
      const taskData = {
        Activity: activity,
        Deadline: date,
        Description: description,
        counselorUID: currentUser.uid,
        PatientUID: props.selectedPatientUID,
        Status: null,
      };

      console.log("PatientUID:", props.selectedPatientUID);
      console.log("counselorUID:", currentUser.uid);

      addDoc(collection(db, "Tasks"), taskData)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          // Perform any other actions after successful upload
          props.handleClose();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      console.error("currentUser or selectedPatientUID is undefined.");
    }
  };

  return (
    <Modal className="mt-3" show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Create Assignment:</Modal.Title>
        </Modal.Header>
        <h5>Input Activity:</h5>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="CreateAssignment"
            aria-describedby="basic-addon1"
            onChange={handleActivityChange}
            value={activity}
          />
        </div>
        <div>
          <h5>Input Date:</h5>
          <input
            className="input-group rounded-2"
            type="date"
            onChange={handleChange}
            ref={dateInputRef}
            style={{ border: "none" }}
            value={date}
          />
        </div>
        <div className="form-floating mt-3 mb-3">
          <h5>Input Description:</h5>
          <textarea
            className="form-control"
            id="floatingTextarea2"
            style={{ height: "150px" }}
            onChange={handleDescriptionChange}
            value={description}
          ></textarea>
        </div>

        <Modal.Footer>
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            onClick={handleSubmitCreate}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};
