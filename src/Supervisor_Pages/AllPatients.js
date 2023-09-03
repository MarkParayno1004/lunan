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
          query(
            collection(firestore, "Users"),
            where("counselorID", "!=", null)
          )
        );
        const patients = querySnapshot.docs.map((doc) => doc.data());
  
        console.log("Patients Data:", patients);
  
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
  
      await Promise.all(patientsData.map(async (patient) => {
        if (patient.counselorID) {
          console.log("Fetching counselor name for:", patient.counselorID);
          const counselorName = await fetchCounselorName(patient.counselorID);
          names[patient.counselorID] = counselorName;
        }
      }));
  
      console.log("Fetched Counselor Names:", names);
      setCounselorNames(names);
    };
  
    fetchCounselorNames();
  }, [patientsData]);
  
  const fetchCounselorName = async (counselorID) => {
    try {
      const counselorDocRef = doc(firestore, "Users", counselorID);
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
  
  const fetchImageUrl = (imageUrl) => {
    return imageUrl;
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
                      {patient.ProfPic ? (
                        <img
                            src={fetchImageUrl(patient.ProfPic)}
                            alt={patient.firstName}
                            width="100"
                            height="100"
                          />
                      ) : (
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/lunan-75e15.appspot.com/o/user_profile_pictures%2FProfilePic.png?alt=media&token=25b442b3-110c-4dc5-af56-4fd799b77dcc"
                          alt={patient.firstName}
                          width="100"
                          height="100"
                        />
                      )}
                      </td>
                      <td>{patient.firstName}</td>
                      <td>{patient.dateCreated}</td>
                      <td>{counselorNames[patient.counselorID] || "N/A"}</td>
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