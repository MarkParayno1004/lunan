import React, { useState } from "react";

const AssignmentTab = () => {
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Assignment 1", status: "Pending" },
    { id: 2, title: "Assignment 2", status: "Complete" },
    { id: 3, title: "Assignment 3", status: "Pending" },
    { id: 4, title: "Assignment 4", status: "Complete" },
  ]);

  const [activeTab, setActiveTab] = useState("Pending");

  const moveAssignment = (id, newStatus) => {
    const updatedAssignments = assignments.map((assignment) => {
      if (assignment.id === id) {
        return { ...assignment, status: newStatus };
      }
      return assignment;
    });
    setAssignments(updatedAssignments);
  };

  const renderAssignments = () => {
    return assignments
      .filter((assignment) => assignment.status === activeTab)
      .map((assignment) => (
        <div key={assignment.id}>
          <span>{assignment.title}</span>
          <button
            onClick={() =>
              moveAssignment(
                assignment.id,
                activeTab === "Pending" ? "Complete" : "Pending"
              )
            }
          >
            {activeTab === "Pending" ? "Mark Complete" : "Mark Pending"}
          </button>
        </div>
      ));
  };

  return (
    <div>
      <div>
        <button
          onClick={() => setActiveTab("Pending")}
          className={activeTab === "Pending" ? "active" : ""}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab("Complete")}
          className={activeTab === "Complete" ? "active" : ""}
        >
          Complete
        </button>
      </div>

      <h2>{activeTab} Assignments</h2>
      {renderAssignments()}
    </div>
  );
};

export default AssignmentTab;
