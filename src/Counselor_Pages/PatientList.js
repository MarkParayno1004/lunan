import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import "../css/AllPatients.css";

export const PatientList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [patientsData, setPatientsData] = useState([]);

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        const patients = querySnapshot.docs.map((doc) => doc.data());

        console.log("Patients Data:", patients); // Log the data

        setPatientsData(patients);
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };

    fetchPatientsData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchImageUrl = (imageUrl) => {
    return imageUrl;
  };

    return (
        <div
      className="container-fluid justify-content-center rounded-3 mt-3 mb-3 p-3"
      id="cardAllPatientBG"
    >
      <div className="row">
        <div className="col"></div>
        <div className="col-4">
          <h2 className="text-center mt-4 mb-4">All Patient List</h2>
            <div className="col">
                <div className="input-group mt-4">
                    <input
                    type="text"
                    placeholder="Counselor Name..."
                    value={searchQuery}
                    onChange={handleSearch}
                    aria-describedby="search"
                    className="w-25 form-control"
                    />
                    <div className="input-group-append">
                    <span className="input-group-text" id="search">
                        Search
                    </span>
                    </div>
                </div>
            </div>
        </div>
        <div className="col"></div>
      </div>
      <div className="d-flex flex-column">
        <div className="flex-grow-1">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Date Added</th>
                <th>Patients</th>
              </tr>
            </thead>
            <tbody>
              {patientsData.map(
                (patient) =>
                  patient.counselorUID && (
                    <tr key={patient.UID}>
                        <td>
                            {patient.ProfPic && (
                            <img
                            src={fetchImageUrl(patient.ProfPic)}
                            alt={patient.firstName}
                            width="100"
                            height="100"
                            />
                            )}
                        </td>  
                      <td>{patient.firstName}</td>
                      <td>{patient.dateCreated}</td>
                      <td>{patient.UID}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-auto">
          <Link to="/Counselor Dashboard" style={{ textDecoration: "none" }}>
            <Button
              className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4 fw-medium"
              id="buttonCard"
            >
              Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
    );
};