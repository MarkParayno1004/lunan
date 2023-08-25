import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/firebase-config";
import "../css/AllPatients.css";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

export const AllPatients = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [counselorNames, setCounselorNames] = useState({});

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(firestore, "Users"), where("Role", "==", "Patient"))
        );
        const patients = querySnapshot.docs.map((doc) => doc.data());

        console.log("Patients Data:", patients); // Log the data

        setPatientsData(patients);
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };

    fetchPatientsData();
  }, []);

  useEffect(() => {
    const fetchCounselorNames = async () => {
      const names = {};
      for (const patient of patientsData) {
        if (patient.counselorUID) {
          const counselorName = await fetchCounselorName(patient.counselorUID);
          names[patient.counselorUID] = counselorName;
        }
      }
      setCounselorNames(names);
    };
  
    fetchCounselorNames();
  }, [patientsData]);
  
  const fetchCounselorName = async (counselorUID) => {
    try {
      const counselorDocRef = doc(firestore, "Users", counselorUID);
      const counselorDocSnapshot = await getDoc(counselorDocRef);
  
      if (counselorDocSnapshot.exists()) {
        const counselorData = counselorDocSnapshot.data();
        if (counselorData.Role === "Counselor") {
          return counselorData.firstName;
        } else {
          return "Not a Counselor";
        }
      } else {
        return "Unknown Counselor";
      }
    } catch (error) {
      console.error("Error fetching counselor name:", error);
      return "Error Fetching Name";
    }
  };

  return (
    <div className="container-lg d-flex justify-content-center rounded-5 mt-5 ms-5 pb-3" id="AllPatientForm">
      <div className="container-fluid">
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
                  (patient) => (
                    <tr key={patient.UID}>
                      <td>
                        <img
                          src={patient.ProfPic}
                          alt={patient.firstName}
                          width="100"
                          height="100"
                        />
                      </td>
                      <td>{patient.firstName}</td>
                      <td>{patient.dateCreated}</td>
                      <td>{counselorNames[patient.counselorUID] || "N/A"}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
