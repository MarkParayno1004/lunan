import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore, auth } from "../firebase/firebase-config";
import "../css/CounselorDashboard.css";
import SideLogo from "../img/BLOOMFIELDS_LOGO-03.png";
import { PatientList } from "./Components/PatientList";
import CounselorScheduler from "./Components/CounselorScheduler";
import { DefaultCounselorPage } from "./Components/DefaultCounselorPage";
import { CounselorChat } from "./Components/CounselorChat";
import { Client } from "@twilio/conversations";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const CounselorDashboard = (props) => {
  const [counselorName, setCounselorName] = useState("");
  const [activeComponent, setActiveComponent] = useState("default");
  const [client, setClient] = useState(null);
  const token = useSelector((state) => state.token); // Get the Twilio token from your state

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
            if (counselorData && counselorData.firstName) {
              setCounselorName(counselorData.firstName);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching counselor name:", error);
      }
    };

    fetchCounselorName();
  }, []);

  // Initialize Twilio client with the token
  useEffect(() => {
    const initTwilioClient = async () => {
      try {
        if (token) {
          const client = new Client(token);
          setClient(client);
          console.log("Twilio Client:", client);
        }
      } catch (error) {
        console.error("Error initializing Twilio client:", error);
      }
    };

    initTwilioClient();
  }, [token]); // Make sure to include token in the dependency array

  return (
    <div className=" d-flex align-items-start" id="sdBG">
      <div class="d-flex flex-column flex-shrink-0 p-3 " id="sideBarPatient">
        <div className="d-flex justify-content-center">
          <img src={SideLogo} style={{ width: "13rem" }} alt="Side Logo" />
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
                activeComponent === "chat" ? "active" : ""
              }`}
            >
              <button
                id="hoverPatientList"
                onClick={() => {
                  setActiveComponent("chat");
                }}
              >
                Chat
              </button>
            </li>
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
            <div className="d-flex justify-content-start mt-5">
              <Link to="/Login" style={{ textDecoration: "none" }}>
                <button
                  className="btn rounded-5"
                  style={{
                    backgroundColor: "#f5e9cf",
                    color: "#4d455d",
                    height: "35px",
                  }}
                >
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </ul>
      </div>
      <div className="container-fluid">
        {activeComponent === "default" ? (
          <>
            <DefaultCounselorPage />
          </>
        ) : activeComponent === "ViewPatients" ? (
          <>
            <PatientList />
          </>
        ) : activeComponent === "chat" ? (
          <>
            <CounselorChat client={client} />
          </>
        ) : (
          activeComponent === "Schedule" && <CounselorScheduler />
        )}
      </div>
    </div>
  );
};
