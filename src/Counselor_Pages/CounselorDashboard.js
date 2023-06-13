import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore, auth } from "../firebase/firebase-config";
import "../css/CounselorDashboard.css";
import assLogo from "../img/Assignment.png";
import scheduleLogo from "../img/Schedule.png";
import patientLogo from '../img/patient-list.png';

export const CounselorDashboard = () => {
    const [counselorName, setCounselorName] = useState("");

  useEffect(() => {
    const fetchCounselorName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const UID = user.uid;
          const usersCollection = collection(firestore, "Users");
          const q = query(usersCollection, where("UID", "==", UID));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const counselorData = querySnapshot.docs[0].data();
            if (counselorData && counselorData.Name) {
              setCounselorName(counselorData.Name);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching counselor name:", error);
      }
    };

    fetchCounselorName();
  }, []);
    return (
        <div className="d-flex align-items-center" id="cdBG">
            <div className="container text-center">
                <div className="row align-items-start">

                    {/* Welcome Message */}
                    <div className="col">
                        <h1>Welcome, {counselorName}</h1>
                    </div>

                    {/* View Patients */}
                    <div className="col d-flex justify-content-end">
                        <Link to="/View Patient List" style={{ textDecoration: "none" }}>
                            <div>
                                <div
                                    className="card rounded-5"
                                    style={{ width: 18 + "rem" }}
                                    id="cardBG"
                                >
                                    <p className="card-text mt-3" style={{ fontSize: 25 + "px"}}>
                                        View Patients
                                    </p>
                                    <div className="card-body">
                                        <img
                                        alt="View Patients"
                                        src={patientLogo}
                                        className="card-img-bottom"
                                        style={{ width: 130 + "px", paddingBottom: 10 + "px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* View Patients Assignments */}
                    <div className="col d-flex justify-content-end">
                        <Link to="/View Patients Assignment" style={{ textDecoration: "none" }}>
                            <div>
                                <div
                                    className="card rounded-5"
                                    style={{ width: 18 + "rem" }}
                                    id="cardBG"
                                >
                                    <p className="card-text mt-3" style={{ fontSize: 25 + "px"}}>
                                        View Patients Assignments
                                    </p>
                                    <div className="card-body">
                                        <img
                                        alt="View Patients Assignments"
                                        src={assLogo}
                                        className="card-img-bottom"
                                        style={{ width: 130 + "px", paddingBottom: 10 + "px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Schedule */}
                    <div className="col d-flex justify-content-end">
                        <Link to="/Counselor Schedule" style={{ textDecoration: "none" }}>
                            <div>
                                <div
                                    className="card rounded-5"
                                    style={{ width: 18 + "rem" }}
                                    id="cardBG"
                                >
                                    <p className="card-text mt-3" style={{ fontSize: 25 + "px"}}>
                                        Schedule
                                    </p>
                                    <div className="card-body">
                                        <img
                                        alt="Schedule"
                                        src={scheduleLogo}
                                        className="card-img-bottom"
                                        style={{ width: 130 + "px", paddingBottom: 10 + "px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}