import React from "react";
import "../css/PatientList.css";

export const PatientInfo = (patient) => {
  const handleBack = () => {
    // Handle back button functionality
  };

  const handleViewCaseNotes = () => {
    // Handle view case notes button functionality
  };

  const handleCreateCaseNotes = () => {
    // Handle create case notes button functionality
  };

  return (
    <div className="container-fluid d-flex justify-content-center" id="plBG">
      <div
        className="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center"
        id="CardBG"
      >
        <h1 className="d-flex justify-content-center mt-3">
          Patients Information
        </h1>
        <div className="patient-info">
          <div className="patient-details">
            <img
              src={patient.picture}
              alt={patient.name}
              className="patient-picture"
            />
            <div className="patient-text">
              <h2>{patient.name}</h2>
              <p>
                <strong>Date Added:</strong> {patient.dateAdded}
              </p>
              <p>
                <strong>Last Session:</strong> {patient.lastSession}
              </p>
              <p>
                <strong>Diagnosis:</strong> {patient.diagnosis}
              </p>
            </div>
          </div>
          <div className="button-group">
            <button onClick={handleBack}>Back</button>
            <button onClick={handleViewCaseNotes}>View Case Notes</button>
            <button onClick={handleCreateCaseNotes}>Create Case Notes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
