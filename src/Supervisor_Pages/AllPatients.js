import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { collection, getDocs, doc, getDoc } from "firebase/firestore";

import { firestore } from "../firebase/firebase-config";
import "../css/AllPatients.css";

export const AllPatients = () => {

  const [patientsData, setPatientsData] = useState([]);

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        const patients = [];

        for (const docSnapshot of querySnapshot.docs) {
          const patientData = docSnapshot.data();
          const counselorUID = patientData.counselorUID;

          if (counselorUID) {
            const counselorDocRef = doc(firestore, "Counselor", counselorUID);
            const counselorSnapshot = await getDoc(counselorDocRef);

            if (counselorSnapshot.exists()) {
              const counselorData = counselorSnapshot.data();
              const patient = {
                UID: patientData.UID,
                firstName: patientData.firstName,
                dateCreated: patientData.dateCreated,
                counselor: counselorData.counselName,
              };

              patients.push(patient);
            }
          }
        }

        setPatientsData(patients);
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };

    fetchPatientsData();
  }, []);


  return (
    <div className="container-fluid justify-content-center rounded-3 mt-3 mb-3 p-3" id="cardBG">
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


                <th scope="col">Name</th>
                <th scope="col">Date Added</th>
                <th scope="col">Counselor</th>
              </tr>
            </thead>
            <tbody>

              {patientsData.map((patient) => (
                <tr key={patient.UID}>
                  <td>{patient.firstName}</td>
                  <td>{patient.dateCreated}</td>

                  <td>{patient.counselor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-auto">
          <Link to="/Supervisor Dashboard" style={{ textDecoration: "none" }}>

            <Button className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4" id="buttonCard">

              Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

};

