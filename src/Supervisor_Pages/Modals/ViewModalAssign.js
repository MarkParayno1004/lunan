import React from "react";
import { useState } from "react";
import { Modal, Pagination } from "react-bootstrap";

//!Main App Render
export const ViewModalAssign = (props) => {
  const [activeTab, setActiveTab] = useState("assigned");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [tasks, setTasks] = useState(props.tasks || []);

  React.useEffect(() => {
    // Update tasks when props.tasks changes
    console.log("Entered Use Effect");
    setTasks(props.tasks || []);
  }, [props.tasks]);

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

  //!Table style
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
        <div>
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
          <table className="table table-dark table-hover" style={tableStyle}>
            <thead>
              <tr>
                <th scope="col">Activity:</th>
                <th scope="col">Description:</th>
                {activeTab !== "assigned" && (
                  <>
                    <th scope="col">Turn-In Date</th>
                    <th scope="col">Firestore ID</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {currentTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.Activity}</td>
                  <td>{task.Description}</td>
                  {activeTab !== "assigned" && (
                    <>
                      <td>{task.TurnInDate}</td>
                      <td>{task.id}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bootstrap Pagination */}
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
        </div>
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
