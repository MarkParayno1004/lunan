import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { firestore } from "../firebase/firebase-config";
import "../css/AllPatients.css";
import { collection, getDocs, query, where, updateDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL, getMetadata, setMetadata } from "firebase/storage";

export const AllPatients = () => {
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
        </div>
        <div className="col"></div>
      </div>
      <div className="d-flex flex-column">
        <div className="flex-grow-1">
          <table className="table table-dark">
            <thead>
              <tr>
              <th scope="col">Picture</th>
                <th scope="col">Name</th>
                <th scope="col">Date Added</th>
                <th scope="col">Counselor</th>
              </tr>
            </thead>
            <tbody>
  {patientsData.map(
    (patient) =>
      patient.counselorUID && (
        <tr key={patient.UID}>
          <td>
          <img
          src={fetchImageUrl(patient.ProfPic)}
          alt={patient.firstName}
          width="100"
          height="100"
        />
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
          <Link to="/Supervisor Dashboard" style={{ textDecoration: "none" }}>
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
