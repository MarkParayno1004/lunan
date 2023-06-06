import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, query, getDocs, where, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import "../css/AllPatients.css";

export const AllPatients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patientsData, setPatientsData] = useState([]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const q = query(collection(firestore, "Users"), where("Role", "==", "Patient"));
        const querySnapshot = await getDocs(q);

        const patients = await Promise.all(querySnapshot.docs.map(async (doc) => {
          const patientData = doc.data();
          if (patientData.counselorUID && patientData.counselorUID !== "") {
            const counselorDoc = doc(firestore, "Counsellor", patientData.counselorUID);
            const counselorSnapshot = await getDoc(counselorDoc);
            const counselorData = counselorSnapshot.data();
            
            return {
              UID: patientData.UID,
              name: patientData.firstName,
              dateAdded: patientData.dateCreated,
              counselor: counselorData ? counselorData.counselName : "",
            };
          }
          return null;
        }));

        const filteredPatients = patients.filter((patient) => patient !== null);

        console.log("Patients Data:", filteredPatients); // Log the data

        setPatientsData(filteredPatients);
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };

    fetchPatientsData();
  }, []);

  const filteredPatients = patientsData.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid justify-content-center rounded-3 mt-3 mb-3 p-3" id="cardBG">
      <div className="row">
        <div className="col">
        </div>
        <div className="col-4">
          <h2 className="text-center mt-4 mb-4">All Patient List</h2>
        </div>
        <div className="col">
          <div className="input-group mt-4">
            <input 
              type="text" 
              placeholder="Patient Name..." 
              value={searchQuery} 
              onChange={handleSearch}
              aria-describedby="search" 
              className="w-25 form-control"
            />
            <div className="input-group-append">
              <span className="input-group-text" id="search">Search</span>
            </div>
          </div>
        </div>
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
              {filteredPatients.map(patient => (
                <tr key={patient.id}>
                  <td>
                    <img src={patient.picture} alt={patient.name} width="50" height="50" />
                  </td>
                  <td>{patient.name}</td>
                  <td>{patient.dateAdded}</td>
                  <td>{patient.counselor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-auto">
          <Link to="/Supervisor Dashboard" style={{ textDecoration: "none" }}>
            <Button
              className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
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