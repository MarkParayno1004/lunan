import { useState, useEffect } from "react";
import { collection, query, getDocs, where, doc, getDoc } from "firebase/firestore";
import "../css/AllPatients";
import { firestore } from "../firebase/firebase-config";

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
    <div className="container-fluid d-flex justify-content-center" id="apBG">
            <div className="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center" id="CardBG">
                <h1 className="d-flex justify-content-center mt-3">All Patients List</h1>
        <input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ float: 'right' }}
        />
        <table id="patient-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date Added</th>
              <th>Counselor</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.UID}>
                <td>{patient.name}</td>
                <td>{patient.dateAdded}</td>
                <td>{patient.counselor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
