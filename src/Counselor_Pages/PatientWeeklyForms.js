import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/PatientWeeklyForms.css";

export const PatientWeeklyForms = (patient) => {
  const [searchQuery, setSearchQuery] = useState("");
  //   const filteredPatients = patientsData.filter((patient) =>
  //     patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center"
      id="WeeklyBG"
    >
      <div
        className="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center"
        id="CardBG"
      >
        <div>
          <div className="row">
            <div className="col">
              <h1 className="d-flex justify-content-center mt-3">
                Patients Weekly Forms
              </h1>
            </div>
            <div className="col d-flext justify-content-center d-flex align-items-center">
              <input
                type="text"
                placeholder="Search counselors..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
          </div>
          <table className="table m" id="patient-table">
            <thead>
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Date Added</th>
                <th>Last Session</th>
              </tr>
            </thead>
            <tbody>
              <tr key={patient.id}>
                <td>
                  <img
                    src={patient.picture}
                    alt={patient.name}
                    width="50"
                    height="50"
                  />
                </td>
                <td>{patient.name}</td>
                <td>{patient.dateAdded}</td>
                <td>{patient.lastSession}</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <Link to="/View Patient List" style={{ textDecoration: "none" }}>
              <button
                className="me-2 mb-2 rounded-5 fw-semibold"
                id="casebackButton"
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
