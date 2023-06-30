import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore, auth } from "../firebase/firebase-config";
import "../css/CounselorDashboard.css";
import SideLogo from "../img/BLOOMFIELDS_LOGO-03.png";
import { PatientList } from "./PatientList";
import CounselorScheduler from "./CounselorScheduler";
import { DefaultCounselorPage } from "./DefaultCounselorPage";
import { AvatarCounselor } from "../SupportEngine/AvatarCounselor";
import { WellnessPage } from "./WellnessPage";

export const CounselorDashboard = (props) => {
  const [counselorName, setCounselorName] = useState("");
  const [activeComponent, setActiveComponent] = useState("default");

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
    <div className=" d-flex align-items-start" id="sdBG">
      <div class="d-flex flex-column flex-shrink-0 p-3 " id="sideBarPatient">
        <div className="d-flex justify-content-center">
          <img src={SideLogo} style={{ width: 13 + "rem" }} />
        </div>
        <h5>Welcome {counselorName} </h5>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li
            className={`d-flex justify-content-start ${
              activeComponent === "default" ? "active" : ""
            }`}
          >
            <button
              id="hoverPatientList"
              onClick={() => {
                setActiveComponent("default");
              }}
            >
              Dashboard
            </button>
          </li>
          <div className="ms-2 mt-1">
            <li
              className={`d-flex justify-content-start ${
                activeComponent === "ViewPatients" ? "active" : ""
              }`}
            >
              <button
                id="hoverPatientList"
                onClick={() => {
                  setActiveComponent("ViewPatients");
                }}
              >
                View Patients
              </button>
            </li>
            <li
              className={`d-flex justify-content-start ${
                activeComponent === "ViewWellnessGuide" ? "active" : ""
              }`}
            >
              <button
                id="hoverPatientList"
                onClick={() => {
                  setActiveComponent("ViewWellnessGuide");
                }}
              >
                Wellness Guide
              </button>
            </li>
            <li
              className={`d-flex justify-content-start ${
                activeComponent === "Schedule" ? "active" : ""
              }`}
            >
              <button
                id="hoverPatientList"
                onClick={() => {
                  setActiveComponent("Schedule");
                }}
              >
                Schedule
              </button>
            </li>
          </div>
        </ul>
        <div className="d-flex justify-content-start">
          <Link to="/Login" style={{ textDecoration: "none" }}>
            <button
              className="btn rounded-5"
              style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <div className="container-fluid">
        {activeComponent === "default" ? (
          <>
            <DefaultCounselorPage />
            <AvatarCounselor
              style={{
                position: "fixed",
                bottom: 120 + "px",
                right: 24 + "px",
              }}
            />
            <AvatarCounselor
              style={{ position: "fixed", bottom: 24 + "px", right: 24 + "px" }}
            />
          </>
        ) : activeComponent === "ViewWellnessGuide" ? (
          <>
            <WellnessPage />
            <AvatarCounselor
              style={{
                position: "fixed",
                bottom: 120 + "px",
                right: 24 + "px",
              }}
            />
            <AvatarCounselor
              style={{ position: "fixed", bottom: 24 + "px", right: 24 + "px" }}
            />
          </>
        ) : activeComponent === "ViewPatients" ? (
          <>
            <PatientList />
            <AvatarCounselor
              style={{
                position: "fixed",
                bottom: 120 + "px",
                right: 24 + "px",
              }}
            />
            <AvatarCounselor
              style={{ position: "fixed", bottom: 24 + "px", right: 24 + "px" }}
            />
          </>
        ) : (
          activeComponent === "Schedule" && <CounselorScheduler />
        )}
      </div>
    </div>
  );
};
